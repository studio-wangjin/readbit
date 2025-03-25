import { Article, CreateArticleDto, UpdateArticleDto } from '../model/types';

const API_URL = '/api/articles';

export const articleApi = {
  // 아티클 목록 조회
  getArticles: async (): Promise<Article[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch articles');
    return response.json();
  },

  // 내가 작성한 아티클 목록 조회
  getMyArticles: async (): Promise<Article[]> => {
    const response = await fetch(`${API_URL}/me`);
    if (!response.ok) throw new Error('Failed to fetch my articles');
    return response.json();
  },

  // 아티클 상세 조회
  getArticle: async (id: string): Promise<Article> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch article');
    return response.json();
  },

  // 아티클 생성
  createArticle: async (data: CreateArticleDto): Promise<Article> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create article');
    return response.json();
  },

  // 아티클 수정
  updateArticle: async (id: string, data: UpdateArticleDto): Promise<Article> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update article');
    return response.json();
  },

  // 아티클 삭제
  deleteArticle: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete article');
  },
};
