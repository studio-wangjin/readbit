'use client';

import { Article } from '@/src/features/article/model/types';
import { ArticleDetail } from '@/src/widgets/article/ui/ArticleDetail';
import { ArticleLink } from '@/src/widgets/article/ui/ArticleLink';
import Link from 'next/link';

interface ArticleDetailPageProps {
  article: Article;
}

export function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  return (
    <div className="container max-w-3xl py-8">
      <Link
        href={`/articles/chunk/${article.slug}`}
        className="text-blue-600 hover:text-blue-800 underline"
      >
        섹션별로 보기
      </Link>
      <ArticleDetail article={article} />
      <ArticleLink article={article} />
    </div>
  );
}
