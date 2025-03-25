'use client';

import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';
import { ArticleList } from '@/src/widgets/article/ui/ArticleList';
import { useMyArticles } from '@/src/features/article/model/useMyArticles';

export function MyArticlesPage() {
  const { articles, isLoading, deleteArticle } = useMyArticles();

  if (isLoading) {
    return <div className="container py-8">로딩 중...</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">내가 작성한 아티클</h1>
        <Link href="/articles/create">
          <Button>새 아티클 작성</Button>
        </Link>
      </div>

      <ArticleList articles={articles} onDelete={deleteArticle} />
    </div>
  );
}
