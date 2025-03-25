'use client';

import { ArticleHeader } from '@/src/widgets/article/ui/ArticleHeader';
import { ArticleContent } from '@/src/widgets/article/ui/ArticleContent';
import { ArticleLink } from '@/src/widgets/article/ui/ArticleLink';
import { useArticle } from '@/src/features/article/model/useArticle';

interface ArticleDetailPageProps {
  id: string;
}

export function ArticleDetailPage({ id }: ArticleDetailPageProps) {
  const { article, isLoading } = useArticle(id);

  if (isLoading) {
    return <div className="container py-8">로딩 중...</div>;
  }

  if (!article) {
    return <div className="container py-8">아티클을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container max-w-3xl py-8">
      <ArticleHeader article={article} />
      <ArticleContent article={article} />
      <ArticleLink article={article} />
    </div>
  );
}
