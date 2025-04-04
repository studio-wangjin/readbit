import { useState } from 'react';
import { CreateArticleDto, Article } from './types';
import { articleApi } from '../api/articleApi';

export function useCreateArticle() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createArticle = async (data: CreateArticleDto): Promise<Article> => {
    try {
      setIsSubmitting(true);
      const article = await articleApi.createArticle(data);
      return article;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createArticle, isSubmitting };
}
