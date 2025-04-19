import { splitHtmlIntoSections } from './splitSections';

describe('splitHtmlIntoSections', () => {
  it('h2 태그가 없는 HTML을 하나의 Intro 섹션으로 처리해야 함', () => {
    const html = `
      <p>This is a simple content.</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    `;

    const result = splitHtmlIntoSections(html);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      index: 0,
      title: 'Intro',
      content: [html.trim()],
    });
  });

  it('여러 h2 섹션이 있는 HTML을 올바르게 분할해야 함', () => {
    const html = `
      <p>Introduction text</p>
      <h2>First Section</h2>
      <p>First section content</p>
      <h2>Second Section</h2>
      <p>Second section content</p>
    `;

    const result = splitHtmlIntoSections(html);

    expect(result).toHaveLength(3);
    expect(result[0].title).toBe('Intro');
    expect(result[1].title).toBe('First Section');
    expect(result[2].title).toBe('Second Section');
  });

  it('빈 섹션은 무시해야 함', () => {
    const html = `
      <h2>Empty Section</h2>
      <h2>Content Section</h2>
      <p>Some content</p>
    `;

    const result = splitHtmlIntoSections(html);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Content Section');
  });

  it('섹션 내의 HTML을 보존해야 함', () => {
    const html = `
      <h2>List Section</h2>
      <ul>
        <li><strong>Bold item</strong></li>
        <li>Normal item</li>
      </ul>
    `;

    const result = splitHtmlIntoSections(html);

    expect(result).toHaveLength(1);
    expect(result[0].content[0]).toContain('<strong>');
    expect(result[0].content[0]).toContain('</ul>');
  });

  it('잘못된 HTML을 적절히 처리해야 함', () => {
    const html = `
      <p>Intro</p>
      <h2>Broken Section
      <p>Content</p>
      <h2>Valid Section</h2>
      <p>Valid content</p>
    `;

    const result = splitHtmlIntoSections(html);

    expect(result.length).toBeGreaterThan(0);
    expect(result.some(section => section.title === 'Valid Section')).toBe(true);
  });

  it('중첩된 컨텐츠를 올바르게 처리해야 함', () => {
    const html = `
      <h2>Nested Content</h2>
      <div class="wrapper">
        <p>First paragraph</p>
        <div class="nested">
          <p>Nested paragraph</p>
        </div>
      </div>
    `;

    const result = splitHtmlIntoSections(html);

    expect(result).toHaveLength(1);
    expect(result[0].content[0]).toContain('wrapper');
    expect(result[0].content[0]).toContain('nested');
  });
});
