'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';
import { articleApi } from '@/src/features/article/api/articleApi';
import { Article } from '@/src/features/article/model/types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ExternalLink } from 'lucide-react';

interface ArticleDetailPageProps {
  id: string;
}

export function ArticleDetailPage({ id }: ArticleDetailPageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await articleApi.getArticle(id);
        setArticle(data);
      } catch (error) {
        console.error('Failed to fetch article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return <div className="container py-8">로딩 중...</div>;
  }

  if (!article) {
    return <div className="container py-8">아티클을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container max-w-3xl py-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>작성자: {article.userId}</span>
            <span>
              {formatDistanceToNow(new Date(article.createdAt), {
                addSuffix: true,
                locale: ko,
              })}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href={`/articles/${article.id}/edit`}>
            <Button variant="outline">수정</Button>
          </Link>
          <Link href="/articles">
            <Button variant="outline">목록으로</Button>
          </Link>
        </div>
      </div>

      <div className="prose max-w-none mb-8">
        <div className="whitespace-pre-wrap">{article.content}</div>
      </div>

      <div className="border-t pt-4">
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          원본 링크
          <ExternalLink className="ml-1 w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
