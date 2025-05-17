'use client';

import { useEffect, useState } from 'react';

export interface ArticleSectionProps {
  title: string;
  content: string[];
}

interface Highlight {
  text: string;
  contentIndex: number;
}

export function ArticleSection({ title, content }: ArticleSectionProps) {
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {
    // sessionStorage에서 하이라이트 데이터 불러오기
    const storedHighlights = sessionStorage.getItem(`highlights-${title}`);
    if (storedHighlights) {
      setHighlights(JSON.parse(storedHighlights));
    }
  }, [title]);

  const handleSelection = () => {
    console.log('handleSelection');

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const selectedText = selection.toString().trim();
    if (!selectedText) return;

    // FIXME: content는 string 으로 와. 내가 말한건 content 안에 해당 텍스트가 3번째로 등장하는거면 그 3번을 저장하라는 말이었어.
    // 현재 선택된 텍스트가 어느 contentIndex에 속하는지 확인
    let foundInContentIndex = -1;

    // content 배열에서 선택된 텍스트가 포함된 인덱스 찾기
    for (let i = 0; i < content.length; i++) {
      // HTML 태그 제거 후 순수 텍스트로 변환
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content[i];
      const contentText = tempDiv.textContent || '';

      if (contentText.includes(selectedText)) {
        foundInContentIndex = i;
        break;
      }
    }

    if (foundInContentIndex === -1) return;

    // 이미 같은 텍스트가 하이라이트되어 있는지 확인
    const existingHighlightIndex = highlights.findIndex(
      h => h.text === selectedText && h.contentIndex === foundInContentIndex
    );

    // 이미 하이라이트된 텍스트라면 제거, 아니면 추가
    let newHighlights: Highlight[];
    if (existingHighlightIndex !== -1) {
      newHighlights = highlights.filter((_, index) => index !== existingHighlightIndex);
    } else {
      const newHighlight: Highlight = {
        text: selectedText,
        contentIndex: foundInContentIndex,
      };
      newHighlights = [...highlights, newHighlight];
    }

    // sessionStorage에 저장
    sessionStorage.setItem(`highlights-${title}`, JSON.stringify(newHighlights));
    setHighlights(newHighlights);

    // 선택 초기화
    window.getSelection()?.removeAllRanges();
  };

  // HTML 문자열에 하이라이트 적용하는 함수
  const applyHighlights = (html: string, contentIdx: number) => {
    // 현재 컨텐츠에 해당하는 하이라이트만 필터링
    const relevantHighlights = highlights.filter(h => h.contentIndex === contentIdx);

    if (relevantHighlights.length === 0) return html;

    let modifiedHtml = html;

    // HTML 태그 없는 텍스트 추출 (비교용)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const plainText = tempDiv.textContent || '';

    // 각 하이라이트 적용
    relevantHighlights.forEach(highlight => {
      const { text } = highlight;

      // 텍스트 매칭으로 위치 찾기
      if (plainText.indexOf(text) === -1) return;

      // 같은 텍스트가 여러 번 나타나는 경우 처리
      let currentIndex = 0;

      while (currentIndex !== -1 && currentIndex < modifiedHtml.length) {
        currentIndex = modifiedHtml.indexOf(text, currentIndex);

        if (currentIndex !== -1) {
          // HTML 태그 안에 있는지 확인 (매우 단순한 검사)
          const beforeChar = modifiedHtml[currentIndex - 1] || '';
          const afterChar = modifiedHtml[currentIndex + text.length] || '';
          const isInTag = beforeChar === '>' && afterChar === '<';

          if (!isInTag) {
            // 실제 하이라이트 적용
            const before = modifiedHtml.substring(0, currentIndex);
            const highlighted = `<span class="bg-yellow-200">${text}</span>`;
            const after = modifiedHtml.substring(currentIndex + text.length);
            modifiedHtml = before + highlighted + after;

            // 다음 검색을 위해 인덱스 갱신
            currentIndex += highlighted.length;
          } else {
            currentIndex += text.length;
          }
        }
      }
    });

    return modifiedHtml;
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4" onMouseUp={handleSelection}>
        {content.map((html, idx) => (
          <div
            key={idx}
            className="prose prose-lg max-w-none article-content-item"
            dangerouslySetInnerHTML={{ __html: applyHighlights(html, idx) }}
          />
        ))}
      </div>
    </section>
  );
}
