import { useState } from 'react';
import { CreateArticleDto } from './types';
import { articleApi } from '../api/articleApi';

export function useCreateArticle() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createArticle = async (data: CreateArticleDto) => {
    try {
      setIsSubmitting(true);
      await articleApi.createArticle(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createArticle, isSubmitting };
}
