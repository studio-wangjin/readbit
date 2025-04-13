'use client';

import { Article } from '@/src/features/article/model/types';
import { ArticleDetail } from '@/src/widgets/article/ui/ArticleDetail';
import { OriginalArticleLink } from '@/src/widgets/article/ui/OriginalArticleLink';
import Link from 'next/link';

interface ArticleDetailPageProps {
  article: Article;
}

export function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  return (
    <div className="container max-w-3xl py-8">
      <Link
        href={`/articles/${article.slug}/sections`}
        className="text-blue-600 hover:text-blue-800 underline"
      >
        섹션별로 보기
      </Link>
      <ArticleDetail article={article} />
      <OriginalArticleLink link={article.link} />
    </div>
  );
}
