/**
 * HTML 문자열에서 태그를 제거하고 순수 텍스트만 추출합니다.
 * 서버와 클라이언트 환경 모두에서 동작합니다.
 *
 * @example
 * const html = '<p>Hello <strong>World</strong></p>';
 * extractTextFromHtml(html); // 'Hello World'
 *
 * @param html HTML 문자열
 * @returns 태그가 제거된 순수 텍스트
 */
export const extractTextFromHtml = (html: string): string => {
  return html
    .replace(/<a[^>]*>[\s\S]*?<\/a>/g, '') // 모든 <a> 태그와 그 내용 제거
    .replace(/<[^>]*>/g, ' ') // 나머지 HTML 태그 제거
    .replace(/\s+/g, ' ') // 연속된 공백을 하나로
    .trim(); // 앞뒤 공백 제거
};
