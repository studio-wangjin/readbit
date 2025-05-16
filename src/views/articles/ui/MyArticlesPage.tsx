'use client';

import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';
import { ArticleList } from '@/src/widgets/article/ui/ArticleList';
import { useMyArticles } from '@/src/features/article/model/useMyArticles';
import { BottomNav } from '@/src/widgets/bottom-nav';

export function MyArticlesPage() {
  const { articles, isLoading, deleteArticle } = useMyArticles();

  if (isLoading) {
    return <div className="container py-8">Loading...</div>;
  }

  return (
    <>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Articles</h1>
          <Link href="/articles/create">
            <Button>Create New Article</Button>
          </Link>
        </div>

        <ArticleList articles={articles} onDelete={deleteArticle} />
      </div>
      <BottomNav />
    </>
  );
}
