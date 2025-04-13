import { parseArticleContent } from './parseArticleContent';

describe('parseArticleContent', () => {
  it('should parse content with no h2 tags into a single introduction section', () => {
    const content = `
      <p>This is a simple content.</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    `;

    const result = parseArticleContent(content);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      index: 0,
      title: '소개',
      content: [content.trim()],
    });
  });

  it('should parse content with multiple h2 sections', () => {
    const content = `
      <p>Introduction text</p>
      <h2>First Section</h2>
      <p>First section content</p>
      <h2>Second Section</h2>
      <p>Second section content</p>
    `;

    const result = parseArticleContent(content);

    expect(result).toHaveLength(3);
    expect(result[0].title).toBe('소개');
    expect(result[1].title).toBe('First Section');
    expect(result[2].title).toBe('Second Section');
  });

  it('should handle empty sections properly', () => {
    const content = `
      <h2>Empty Section</h2>
      <h2>Content Section</h2>
      <p>Some content</p>
    `;

    const result = parseArticleContent(content);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Content Section');
  });

  it('should preserve HTML in section content', () => {
    const content = `
      <h2>List Section</h2>
      <ul>
        <li><strong>Bold item</strong></li>
        <li>Normal item</li>
      </ul>
    `;

    const result = parseArticleContent(content);

    expect(result).toHaveLength(1);
    expect(result[0].content[0]).toContain('<strong>');
    expect(result[0].content[0]).toContain('</ul>');
  });

  it('should handle malformed HTML gracefully', () => {
    const content = `
      <p>Intro</p>
      <h2>Broken Section
      <p>Content</p>
      <h2>Valid Section</h2>
      <p>Valid content</p>
    `;

    const result = parseArticleContent(content);

    expect(result.length).toBeGreaterThan(0);
    expect(result.some(section => section.title === 'Valid Section')).toBe(true);
  });

  it('should handle nested content within sections', () => {
    const content = `
      <h2>Nested Content</h2>
      <div class="wrapper">
        <p>First paragraph</p>
        <div class="nested">
          <p>Nested paragraph</p>
        </div>
      </div>
    `;

    const result = parseArticleContent(content);

    expect(result).toHaveLength(1);
    expect(result[0].content[0]).toContain('wrapper');
    expect(result[0].content[0]).toContain('nested');
  });
});
