'use client';

import { parseArticleContent } from '@/src/features/article/lib/parseArticleContent';
import { Article } from '@/src/features/article/model/types';
import Link from 'next/link';

interface Props {
  article: Article;
}

export function ArticleChunkPage({ article }: Props) {
  const sections = parseArticleContent(article.content);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href={`/articles/${article.slug}`}
        className="text-blue-600 hover:text-blue-800 underline"
      >
        한번에 보기
      </Link>
      <h1 className="text-3xl font-bold mb-8">{article.title}</h1>

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
