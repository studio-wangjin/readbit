export interface ArticlePart {
  id: number;
  title: string;
  summary: string;
  partNumber: 1 | 2 | 3;
  readingTime: number; // minutes
}

export interface Article {
  id: number;
  title: string;
  totalReadingTime: number; // minutes
  parts: [ArticlePart, ArticlePart, ArticlePart];
  category: string;
  publishedAt: string;
}

export interface CardData {
  id: string;
  articleId: number;
  articleTitle: string;
  part: ArticlePart;
  currentPart: number;
  totalParts: number;
  category: string;
}