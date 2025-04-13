import { ArticleSection } from '../types/article';

export const parseArticleContent = (content: string): ArticleSection[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const sections: ArticleSection[] = [];
  let currentSection: ArticleSection | null = null;
  let sectionIndex = 0;

  // 첫 번째 섹션 생성 (소개 부분)
  currentSection = {
    index: sectionIndex++,
    title: '소개',
    content: [],
  };

  function processElement(element: Element) {
    if (element.tagName === 'H2') {
      // 이전 섹션 저장
      if (currentSection && currentSection.content.length > 0) {
        sections.push(currentSection);
      }
      // 새 섹션 시작
      currentSection = {
        index: sectionIndex++,
        title: element.textContent?.trim() || 'Untitled Section',
        content: [],
      };
    } else if (element.tagName === 'UL' && currentSection) {
      // ul 전체를 HTML 문자열로 저장
      const tempDiv = document.createElement('div');
      tempDiv.appendChild(element.cloneNode(true));
      currentSection.content.push(tempDiv.innerHTML);
    }

    // 자식 요소들도 처리
    Array.from(element.children).forEach(child => processElement(child));
  }

  // 문서 처리 시작
  Array.from(doc.body.children).forEach(child => processElement(child));

  // 마지막 섹션 저장
  if (currentSection && currentSection.content.length > 0) {
    sections.push(currentSection);
  }

  return sections;
};
