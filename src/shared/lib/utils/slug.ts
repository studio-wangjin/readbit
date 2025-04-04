/**
 * 제목으로부터 URL에 사용할 수 있는 slug를 생성합니다.
 * 한글은 그대로 유지하고, 공백은 하이픈으로 변환합니다.
 */
export function generateSlug(title: string): string {
  // 1. 공백을 하이픈으로 변환
  const base = title
    .trim()
    .replace(/\s+/g, '-')
    // 2. URL에 안전하지 않은 특수문자 제거 (한글, 영문, 숫자, 하이픈만 허용)
    .replace(/[^\p{L}\p{N}-]/gu, '')
    // 3. 연속된 하이픈을 하나로
    .replace(/-+/g, '-')
    // 4. 시작과 끝의 하이픈 제거
    .replace(/^-+|-+$/g, '');

  // 5. 랜덤 문자열 추가 (충돌 방지)
  const random = Math.random().toString(36).substring(2, 6);

  return `${base}-${random}`;
}

/**
 * 주어진 slug가 이미 존재하는지 확인하고,
 * 존재한다면 새로운 slug를 생성합니다.
 */
export async function ensureUniqueSlug(
  title: string,
  checkExists: (slug: string) => Promise<boolean>
): Promise<string> {
  let slug = generateSlug(title);
  let attempts = 0;
  const maxAttempts = 5;

  while ((await checkExists(slug)) && attempts < maxAttempts) {
    slug = generateSlug(title); // 새로운 랜덤 문자열로 재시도
    attempts++;
  }

  if (attempts >= maxAttempts) {
    // 마지막 시도로 타임스탬프 추가
    const timestamp = Date.now();
    slug = `${slug}-${timestamp}`;
  }

  return slug;
}
