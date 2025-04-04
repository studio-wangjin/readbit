import { useState, useEffect } from 'react';
import { Article } from './types';
import { articleApi } from '../api/articleApi';

export function useArticle({ slug }: { slug: string }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await articleApi.getArticleBySlug(slug);
        setArticle(data);
      } catch (error) {
        console.error('Failed to fetch article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  return { article, isLoading };
}
