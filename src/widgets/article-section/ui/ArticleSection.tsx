'use client';

import { wrapSentencesWithSpan } from '../lib/wrapSentences';

export interface ArticleSectionProps {
  title: string;
  content: string[];
}

export function ArticleSection({ title, content }: ArticleSectionProps) {
  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('sentence-highlight')) {
      // 이전 하이라이트 제거
      const prevHighlighted = e.currentTarget.querySelector('.sentence-highlighted');
      if (prevHighlighted) {
        prevHighlighted.classList.remove('sentence-highlighted');
      }

      // 현재 문장 하이라이트
      target.classList.add('sentence-highlighted');

      // 문장 텍스트 콘솔에 출력
      const sentence = target.getAttribute('data-sentence');
      if (sentence) {
        console.log(sentence.trim());
      }
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('sentence-highlight')) {
      target.classList.remove('sentence-highlighted');
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {content.map((html, idx) => (
          <div
            key={idx}
            className="prose prose-lg max-w-none"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            dangerouslySetInnerHTML={{ __html: wrapSentencesWithSpan(html) }}
          />
        ))}
      </div>
      <style jsx>{`
        .sentence-highlight {
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .sentence-highlighted {
          background-color: yellow;
          padding: 2px 4px;
          border-radius: 2px;
        }
      `}</style>
    </section>
  );
}
