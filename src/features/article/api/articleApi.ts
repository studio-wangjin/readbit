'use client';

import { supabase } from '@/src/shared/lib/supabase/browser';
import { Article, CreateArticleDto, UpdateArticleDto } from '../model/types';
import { ensureUniqueSlug } from '../lib/url/slug';
import { ArticleReadingProgress } from '../types/articleReadingProgress';

export const articleApi = {
  // 아티클 목록 조회
  getArticles: async (): Promise<Article[]> => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Article[];
  },

  // 내가 작성한 아티클 목록 조회
  getMyArticles: async (): Promise<Article[]> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Article[];
  },

  // 아티클 상세 조회
  getArticle: async (id: string): Promise<Article> => {
    const { data, error } = await supabase.from('articles').select('*').eq('id', id).single();

    if (error) throw error;
    if (!data) throw new Error('Article not found');
    return data as Article;
  },

  getArticleBySlug: async (slug: string): Promise<Article> => {
    const decodedSlug = decodeURIComponent(slug);

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', decodedSlug)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Article not found');
    return data as Article;
  },

  // 아티클 생성
  createArticle: async (data: CreateArticleDto): Promise<Article> => {
    // 1. 현재 유저 확인
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('로그인이 필요합니다.');
    }

    // 2. slug 생성 및 중복 체크
    const checkSlugExists = async (slug: string) => {
      const { count } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('slug', slug);
      return count !== null && count > 0;
    };

    const slug = await ensureUniqueSlug(data.title, checkSlugExists);

    // 3. 게시물 생성
    const { data: article, error } = await supabase
      .from('articles')
      .insert([
        {
          ...data,
          user_id: user.id,
          slug,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return article as Article;
  },

  // 아티클 수정
  updateArticle: async (id: string, data: UpdateArticleDto): Promise<Article> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // slug 업데이트가 포함된 경우 중복 체크
    if (data.slug) {
      const checkSlugExists = async (slug: string) => {
        const { count } = await supabase
          .from('articles')
          .select('*', { count: 'exact', head: true })
          .eq('slug', slug)
          .neq('id', id); // 현재 글 제외
        return count !== null && count > 0;
      };

      data.slug = await ensureUniqueSlug(data.slug, checkSlugExists);
    }

    const { data: article, error } = await supabase
      .from('articles')
      .update(data)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return article as Article;
  },

  // 아티클 삭제
  deleteArticle: async (id: string): Promise<void> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase.from('articles').delete().eq('id', id).eq('user_id', user.id);

    if (error) throw error;
  },

  // 독서 진행상황 저장
  saveReadingProgress: async (data: {
    articleId: string;
    sectionIndex: number;
    note: string;
    isNotePublic?: boolean;
  }): Promise<void> => {
    const { error } = await supabase.from('article_reading_progress').upsert({
      article_id: data.articleId,
      section_index: data.sectionIndex,
      note: data.note,
      is_note_public: data.isNotePublic ?? true,
    });

    if (error) throw error;
  },

  // 아티클의 독서 진행상황 조회
  getReadingProgress: async (articleId: string): Promise<ArticleReadingProgress[]> => {
    const { data, error } = await supabase
      .from('article_reading_progress')
      .select('*')
      .eq('article_id', articleId)
      .order('section_index', { ascending: true });

    if (error) throw error;
    return data as ArticleReadingProgress[];
  },

  // 내 독서 진행상황 조회
  getMyReadingProgress: async (): Promise<ArticleReadingProgress[]> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('article_reading_progress')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as ArticleReadingProgress[];
  },

  // 특정 유저의 독서 진행상황 조회 (노트 내용은 public인 것만)
  getUserReadingProgress: async (userId: string): Promise<ArticleReadingProgress[]> => {
    const { data, error } = await supabase
      .from('article_reading_progress')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as ArticleReadingProgress[];
  },
};
