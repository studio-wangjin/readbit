import { convertToAbsoluteImageUrls } from './convertToAbsoluteImageUrls';

describe('convertToAbsoluteImageUrls', () => {
  const baseUrl = 'https://example.com';

  it('Next.js 이미지 URL을 원본 URL로 변환해야 함', () => {
    const html = '<img src="/_next/image/?url=%2Fimages%2Ftest.png&w=828&q=75" alt="test">';
    const expected = '<img src="https://example.com/images/test.png" alt="test">';
    expect(convertToAbsoluteImageUrls(html, baseUrl)).toBe(expected);
  });

  it('상대 경로를 절대 경로로 변환해야 함', () => {
    const html = '<img src="/images/test.jpg" alt="test">';
    const expected = '<img src="https://example.com/images/test.jpg" alt="test">';
    expect(convertToAbsoluteImageUrls(html, baseUrl)).toBe(expected);
  });

  it('이미 절대 경로인 URL은 변환하지 않아야 함', () => {
    const html = '<img src="https://other-domain.com/image.jpg" alt="test">';
    expect(convertToAbsoluteImageUrls(html, baseUrl)).toBe(html);
  });

  it('여러 이미지가 있는 HTML을 올바르게 처리해야 함', () => {
    const html = `
      <div>
        <img src="/_next/image/?url=%2Fimages%2Ftest1.png&w=828&q=75" alt="test1">
        <p>Some text</p>
        <img src="/images/test2.jpg" alt="test2">
        <img src="https://other-domain.com/test3.jpg" alt="test3">
      </div>
    `;
    const expected = `
      <div>
        <img src="https://example.com/images/test1.png" alt="test1">
        <p>Some text</p>
        <img src="https://example.com/images/test2.jpg" alt="test2">
        <img src="https://other-domain.com/test3.jpg" alt="test3">
      </div>
    `;
    expect(convertToAbsoluteImageUrls(html, baseUrl)).toBe(expected);
  });

  it('이미지가 없는 HTML은 변경하지 않아야 함', () => {
    const html = '<p>Text without images</p>';
    expect(convertToAbsoluteImageUrls(html, baseUrl)).toBe(html);
  });

  it('잘못된 이미지 태그는 무시하고 나머지는 처리해야 함', () => {
    const html = `
      <img src="/_next/image/?url=%2Fimages%2Ftest1.png&w=828&q=75" alt="test1">
      <img alt="no src">
      <img src="/images/test2.jpg" alt="test2">
    `;
    const expected = `
      <img src="https://example.com/images/test1.png" alt="test1">
      <img alt="no src">
      <img src="https://example.com/images/test2.jpg" alt="test2">
    `;
    expect(convertToAbsoluteImageUrls(html, baseUrl)).toBe(expected);
  });

  it('이미지 태그의 다른 속성들은 유지되어야 함', () => {
    const html = '<img src="/test.jpg" alt="test" class="w-full" loading="lazy" width="100">';
    const expected =
      '<img src="https://example.com/test.jpg" alt="test" class="w-full" loading="lazy" width="100">';
    expect(convertToAbsoluteImageUrls(html, baseUrl)).toBe(expected);
  });
});
