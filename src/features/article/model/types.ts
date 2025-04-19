import { Database } from '@/src/shared/types/supabase';

export interface Article {
  id: string;
  title: string;
  content: string;
  link: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  public: boolean;
  slug: string;
}

export interface CreateArticleDto {
  title: string;
  content: string;
  link: string;
  public: boolean;
  slug?: string;
}

export interface UpdateArticleDto {
  title?: string;
  content?: string;
  link?: string;
  public?: boolean;
  slug?: string;
}

export type ReadingLog = Database['public']['Tables']['article_reading_progress']['Row'] & {
  article_title: string;
};

export type ReadingLogsByDate = {
  [date: string]: ReadingLog[];
};
