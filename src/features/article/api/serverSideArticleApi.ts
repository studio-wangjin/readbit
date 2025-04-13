import { createServerSupabaseClient } from '@/src/shared/lib/supabase/server';
import { Article } from '../model/types';

// REFACTOR: isomorphic 코드로 변경
export async function getArticleBySlugServerSide(slug: string): Promise<Article> {
  const decodedSlug = decodeURIComponent(slug);
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', decodedSlug)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Article not found');
  return data as Article;
}
