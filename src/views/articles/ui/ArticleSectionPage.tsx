'use client';

import { articleApi } from '@/src/features/article/api/articleApi';
import { parseArticleContent } from '@/src/features/article/lib';
import { Article } from '@/src/features/article/model/types';
import { ArticleSection } from '@/src/widgets/article-section';
import { ArticleSectionNavigation } from '@/src/widgets/article-section-navigation';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  article: Article;
}

export function ArticleSectionPage({ article }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sections = parseArticleContent(article.content, { sourceUrl: article.link });

  // URL의 index 파라미터를 읽어서 초기값 설정 (1-based to 0-based)
  const initialSection = Math.max(1, Number(searchParams.get('index')) || 1) - 1;
  const [currentSectionIndex, setCurrentSectionIndex] = useState(
    Math.min(initialSection, sections.length - 1)
  );

  // URL 업데이트 함수 (0-based to 1-based)
  const handleSectionChange = useCallback(
    (sectionIndex: number) => {
      setCurrentSectionIndex(sectionIndex);
      const params = new URLSearchParams(searchParams);
      params.set('index', (sectionIndex + 1).toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // URL이 변경될 때 섹션 인덱스 업데이트 (1-based to 0-based)
  useEffect(() => {
    const sectionFromUrl = Math.max(1, Number(searchParams.get('index')) || 1) - 1;
    if (sectionFromUrl >= 0 && sectionFromUrl < sections.length) {
      setCurrentSectionIndex(sectionFromUrl);
    }
  }, [searchParams, sections.length]);

  const currentSection = sections[currentSectionIndex];

  return (
    <div className="container mx-auto px-4 py-8 pb-[calc(2rem+12rem)] relative min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <Link
          href={`/articles/${article.slug}`}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          한번에 보기
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">{article.title}</h1>

      <div className="space-y-12">
        <ArticleSection title={currentSection.title} content={currentSection.content} />
      </div>

      <ArticleSectionNavigation
        sectionInfo={{
          currentIndex: currentSectionIndex,
          totalCount: sections.length,
        }}
        articleId={article.id}
        onSubmit={async (note: string) => {
          try {
            await articleApi.saveReadingProgress({
              articleId: article.id,
              sectionIndex: currentSectionIndex,
              note,
              isNotePublic: true,
            });
            handleSectionChange(currentSectionIndex + 1);
          } catch (err) {
            console.error('Failed to save note:', err);
          }
        }}
      />
    </div>
  );
}
