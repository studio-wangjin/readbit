import { supabase } from '@/src/shared/lib/supabase/browser';
import { Article, CreateArticleDto, UpdateArticleDto } from '../model/types';

export const articleApi = {
  // 아티클 목록 조회
  getArticles: async (): Promise<Article[]> => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as unknown as Article[];
  },

  // 내가 작성한 아티클 목록 조회
  getMyArticles: async (): Promise<Article[]> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as unknown as Article[];
  },

  // 아티클 상세 조회
  getArticle: async (id: string): Promise<Article> => {
    const { data, error } = await supabase.from('articles').select('*').eq('id', id).single();

    if (error) throw error;
    return data as unknown as Article;
  },

  // 아티클 생성
  createArticle: async (data: CreateArticleDto): Promise<Article> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: article, error } = await supabase
      .from('articles')
      .insert([
        {
          ...data,
          user_id: user.id,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return article as unknown as Article;
  },

  // 아티클 수정
  updateArticle: async (id: string, data: UpdateArticleDto): Promise<Article> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: article, error } = await supabase
      .from('articles')
      .update(data)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return article as unknown as Article;
  },

  // 아티클 삭제
  deleteArticle: async (id: string): Promise<void> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase.from('articles').delete().eq('id', id).eq('user_id', user.id);

    if (error) throw error;
  },
};
