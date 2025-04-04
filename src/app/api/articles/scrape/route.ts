import { createServerSupabaseClient } from '@/src/shared/lib/supabase/server';
import { Readability } from '@mozilla/readability';
import * as cheerio from 'cheerio';
import { JSDOM } from 'jsdom';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ensureUniqueSlug } from '@/src/shared/lib/utils/slug';

const schema = z.object({
  url: z.string().url('유효한 URL을 입력해주세요.'),
  isPublic: z.boolean().default(false),
});

async function fetchArticleContent(url: string) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15초 타임아웃

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ReadbitBot/1.0; +https://readbit.app)',
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error('페이지를 불러올 수 없습니다.');
    }

    const html = await response.text();

    // Parse article content using Readability
    const dom = new JSDOM(html);
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article) {
      throw new Error('콘텐츠를 추출할 수 없습니다.');
    }

    // Parse meta data using cheerio
    const $ = cheerio.load(html);
    const title =
      article.title || $('meta[property="og:title"]').attr('content') || $('title').text();

    return {
      title: title.trim(),
      content: article.content,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`콘텐츠 추출 실패: ${error.message}`);
    }
    throw new Error('콘텐츠 추출 중 알 수 없는 오류가 발생했습니다.');
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { url, isPublic } = result.data;

    // 1. URL 정규화
    const urlObj = new URL(url);
    const normalizedUrl = urlObj.toString();

    // 2. Supabase 클라이언트 생성
    const supabase = await createServerSupabaseClient();

    // 3. 현재 유저 확인
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    // 4. URL 중복 체크
    const { data: existingArticle } = await supabase
      .from('articles')
      .select('id')
      .eq('link', normalizedUrl)
      .eq('user_id', user.id)
      .single();

    if (existingArticle) {
      return NextResponse.json({ error: '이미 저장된 URL입니다.' }, { status: 400 });
    }

    // 5. 콘텐츠 스크래핑
    const { title, content } = await fetchArticleContent(normalizedUrl);

    // 5-1. slug 생성 및 중복 체크
    const checkSlugExists = async (slug: string) => {
      const { count } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('slug', slug);
      return count !== null && count > 0;
    };

    const slug = await ensureUniqueSlug(title, checkSlugExists);

    // 6. Supabase에 저장
    const { data: article, error: insertError } = await supabase
      .from('articles')
      .insert([
        {
          title,
          content,
          link: normalizedUrl,
          user_id: user.id,
          public: isPublic,
          slug,
        },
      ])
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: '아티클 저장에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ data: article });
  } catch (error) {
    console.error('Article scraping error:', error);
    return NextResponse.json({ error: '알 수 없는 오류가 발생했습니다.' }, { status: 500 });
  }
}
