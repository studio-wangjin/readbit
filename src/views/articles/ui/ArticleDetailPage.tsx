'use client';

import { ArticleDetail } from '@/src/widgets/article/ui/ArticleDetail';
import { ArticleLink } from '@/src/widgets/article/ui/ArticleLink';
import { useArticle } from '@/src/features/article/model/useArticle';

interface ArticleDetailPageProps {
  slug: string;
}

export function ArticleDetailPage({ slug }: ArticleDetailPageProps) {
  const { article, isLoading } = useArticle({ slug });

  if (isLoading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (!article) {
    return <div className="container py-8">Article not found</div>;
  }

  return (
    <div className="container max-w-3xl py-8">
      <ArticleDetail article={article} />
      <ArticleLink article={article} />
    </div>
  );
}
