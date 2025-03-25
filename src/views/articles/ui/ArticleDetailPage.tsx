'use client';

import { ArticleDetail } from '@/src/widgets/article/ui/ArticleDetail';
import { ArticleLink } from '@/src/widgets/article/ui/ArticleLink';
import { useArticle } from '@/src/features/article/model/useArticle';

interface ArticleDetailPageProps {
  id: string;
}

export function ArticleDetailPage({ id }: ArticleDetailPageProps) {
  const { article, isLoading } = useArticle(id);

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
