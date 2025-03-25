export interface Article {
  id: string;
  title: string;
  content: string;
  link: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateArticleDto {
  title: string;
  content: string;
  link: string;
}

export interface UpdateArticleDto {
  title?: string;
  content?: string;
  link?: string;
}
