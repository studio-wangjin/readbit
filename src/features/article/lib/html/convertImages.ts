/**
 * 스크래핑된 아티클의 상대 경로 이미지 URL을 절대 경로로 변환합니다.
 * Next.js 이미지 URL과 일반 상대 경로를 모두 처리합니다.
 *
 * @param html HTML 문자열
 * @param baseUrl 원본 사이트의 기본 URL (예: https://example.com)
 * @returns 이미지 URL이 절대 경로로 변환된 HTML 문자열
 */
export const convertToAbsoluteImageUrls = (html: string, baseUrl: string): string => {
  // Next.js 이미지 URL 패턴 확인 및 변환
  return html.replace(/<img[^>]*src="([^"]*)"[^>]*>/g, (match, src) => {
    // Next.js 이미지 URL 패턴 확인
    const nextImagePattern = /\/_next\/image\/\?url=(.*?)&/;
    const nextImageMatch = src.match(nextImagePattern);

    if (nextImageMatch) {
      // URL 디코딩 후 baseUrl과 결합
      const decodedPath = decodeURIComponent(nextImageMatch[1]);
      return match.replace(src, `${baseUrl}${decodedPath}`);
    }

    // 일반 상대 경로인 경우
    if (src.startsWith('/')) {
      return match.replace(src, `${baseUrl}${src}`);
    }

    return match;
  });
};
