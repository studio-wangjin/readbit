import { useState, useEffect } from 'react';
import { Article } from './types';
import { articleApi } from '../api/articleApi';

export function useMyArticles() {
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

  const deleteArticle = async (id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await articleApi.deleteArticle(id);
      setArticles(articles.filter(article => article.id !== id));
    } catch (error) {
      console.error('Failed to delete article:', error);
    }
  };

  return { articles, isLoading, deleteArticle };
}
