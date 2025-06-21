/**
 * HTML 문자열에서 문장을 찾아 span으로 래핑하는 함수
 * 문장은 마침표(.), 느낌표(!), 물음표(?)로 끝나는 단위로 간주
 */
export function wrapSentencesWithSpan(html: string): string {
  if (!html.trim()) return html;

  // HTML 구조를 유지하면서 텍스트 노드만 처리하는 방법
  // 각 HTML 요소 내부의 텍스트를 개별적으로 처리
  return html.replace(/>([^<]+)</g, (_, textContent) => {
    // 텍스트 노드에서 문장 찾기
    const wrappedText = textContent.replace(
      /([^.!?]*[.!?]+)(\s+|$)/g,
      (sentenceMatch: string, sentence: string, trailing: string) => {
        const trimmedSentence = sentence.trim();
        if (trimmedSentence) {
          return `<span class="sentence-highlight cursor-pointer transition-colors" data-sentence="${trimmedSentence}">${sentence}</span>${trailing}`;
        }
        return sentenceMatch;
      }
    );
    
    return `>${wrappedText}<`;
  });
}