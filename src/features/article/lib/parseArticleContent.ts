import { ArticleSection } from '../types/article';
import { convertToAbsoluteImageUrls } from './convertToAbsoluteImageUrls';
import { splitHtmlIntoSections } from './splitHtmlIntoSections';

export const parseArticleContent = (content: string, sourceUrl?: string): ArticleSection[] => {
  // 1. HTML을 섹션으로 파싱
  const sections = splitHtmlIntoSections(content);

  // 2. sourceUrl이 없으면 파싱된 섹션 그대로 반환
  if (!sourceUrl) {
    return sections;
  }

  // 3. baseUrl 추출
  let baseUrl = '';
  try {
    const url = new URL(sourceUrl);
    baseUrl = `${url.protocol}//${url.host}`;
  } catch (e) {
    console.error('Invalid source URL:', e);
    return sections;
  }

  // 4. 각 섹션의 컨텐츠에 대해 이미지 URL 변환
  return sections.map(section => ({
    ...section,
    content: section.content.map(html => convertToAbsoluteImageUrls(html, baseUrl)),
  }));
};
