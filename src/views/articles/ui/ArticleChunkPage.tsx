'use client';

import { parseArticleContent } from '@/src/features/article/lib/parseArticleContent';
import { Article } from '@/src/features/article/model/types';
import { ArticleChunkNavigation } from '@/src/widgets/article-chunk-navigation';
import Link from 'next/link';
import { useCallback, useState } from 'react';

interface Props {
  article: Article;
}

export function ArticleChunkPage({ article }: Props) {
  const sections = parseArticleContent(article.content);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const handlePrevSection = useCallback(() => {
    setCurrentSectionIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNextSection = useCallback(() => {
    setCurrentSectionIndex(prev => Math.min(sections.length - 1, prev + 1));
  }, [sections.length]);

  return (
    <div className="container mx-auto px-4 py-8 pb-24 relative min-h-screen">
      <Link
        href={`/articles/${article.slug}`}
        className="text-blue-600 hover:text-blue-800 underline"
      >
        한번에 보기
      </Link>
      <ArticleChunkNavigation
        currentIndex={currentSectionIndex}
        totalSections={sections.length}
        onPrevClick={handlePrevSection}
        onNextClick={handleNextSection}
      />
      <h1 className="text-3xl font-bold mb-8">{article.title}</h1>
      {/* TODO:html 파싱이 hydration error를 유발해서 sections.map 하단에 있는 컴포넌트들은 모두 hydration 에러로 잘못 잡힘. parsing에러를 isomorphic하게 수정해야하는데 일단 노운이슈로 둠.  */}
      <div className="space-y-12">
        {sections.map(section => (
          <section key={section.index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.content.map((html, idx) => (
                <div
                  key={idx}
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
