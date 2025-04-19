import { Database } from '@/src/shared/types/supabase';

export type ArticleReadingProgress =
  Database['public']['Tables']['article_reading_progress']['Row'];

export type CreateArticleReadingProgressParams = {
  articleId: string;
  sectionIndex: number;
  note: string;
};

export type GetArticleReadingProgressParams = {
  articleId: string;
};
