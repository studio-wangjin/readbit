import { ArticleSection } from '../../types/article';
import { extractTextFromHtml } from './extractText';

/**
 * HTML 문자열을 h2 태그를 기준으로 섹션으로 분할합니다.
 * 첫 번째 h2 태그 이전의 내용은 'Intro' 섹션으로 처리됩니다.
 *
 * @param html HTML 문자열
 * @returns 섹션 배열
 */
export const splitHtmlIntoSections = (html: string): ArticleSection[] => {
  const sections: ArticleSection[] = [];

  // HTML 문자열을 h2 태그로 분할
  const parts = html.split(/<h2[^>]*>/i);

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

    // h2 태그 내용에서 순수 텍스트만 추출
    const title = extractTextFromHtml(titleMatch[1]).trim();
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
