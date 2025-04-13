import { ArticleSection } from '../types/article';

export const parseArticleContent = (content: string): ArticleSection[] => {
  const sections: ArticleSection[] = [];

  // HTML 문자열을 h2 태그로 분할
  const parts = content.split(/<h2[^>]*>/i);

  // 첫 번째 부분은 소개 섹션
  if (parts[0].trim()) {
    sections.push({
      index: 0,
      title: 'Intro',
      content: [parts[0].trim()],
    });
  }

  // 나머지 부분들을 섹션으로 처리
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    // h2 태그 닫는 부분까지의 텍스트를 제목으로 추출
    const titleMatch = part.match(/(.*?)<\/h2>/i);
    if (!titleMatch) continue;

    const title = titleMatch[1].trim();
    const content = [part.replace(/(.*?)<\/h2>/i, '').trim()];

    if (content[0]) {
      sections.push({
        index: sections.length,
        title: title || 'Untitled Section',
        content,
      });
    }
  }

  return sections;
};
