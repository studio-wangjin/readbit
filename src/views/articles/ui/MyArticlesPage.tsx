'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';
import { articleApi } from '@/src/features/article/api/articleApi';
import { Article } from '@/src/features/article/model/types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export function MyArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await articleApi.getMyArticles();
        setArticles(data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await articleApi.deleteArticle(id);
      setArticles(articles.filter(article => article.id !== id));
    } catch (error) {
      console.error('Failed to delete article:', error);
    }
  };

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

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">아직 작성한 아티클이 없습니다.</p>
          <Link href="/articles/create">
            <Button>첫 아티클 작성하기</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map(article => (
            <div
              key={article.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <Link
                    href={`/articles/${article.id}`}
                    className="text-lg font-semibold hover:text-blue-600"
                  >
                    {article.title}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(article.createdAt), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link href={`/articles/${article.id}/edit`}>
                    <Button variant="outline" size="sm">
                      수정
                    </Button>
                  </Link>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(article.id)}>
                    삭제
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
