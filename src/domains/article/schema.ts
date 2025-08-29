import { z } from 'zod';

export const ArticlePartSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1, '제목은 필수입니다'),
  summary: z.string().min(10, '요약은 최소 10자 이상이어야 합니다'),
  partNumber: z.literal(1).or(z.literal(2)).or(z.literal(3)),
  readingTime: z.number().positive('읽기 시간은 양수여야 합니다'),
});

export const ArticleSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1, '제목은 필수입니다'),
  totalReadingTime: z.number().positive('총 읽기 시간은 양수여야 합니다'),
  parts: z.tuple([ArticlePartSchema, ArticlePartSchema, ArticlePartSchema]),
  category: z.string().min(1, '카테고리는 필수입니다'),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '날짜는 YYYY-MM-DD 형식이어야 합니다'),
});

export const CardDataSchema = z.object({
  id: z.string().min(1, 'ID는 필수입니다'),
  articleId: z.number().positive(),
  articleTitle: z.string().min(1, '아티클 제목은 필수입니다'),
  part: ArticlePartSchema,
  currentPart: z.number().min(1).max(3),
  totalParts: z.number().min(1).max(3),
  category: z.string().min(1, '카테고리는 필수입니다'),
});

// Inferred types
export type Article = z.infer<typeof ArticleSchema>;
export type ArticlePart = z.infer<typeof ArticlePartSchema>;
export type CardData = z.infer<typeof CardDataSchema>;