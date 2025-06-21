import { wrapSentencesWithSpan } from './wrapSentences';

describe('wrapSentencesWithSpan', () => {
  it('단순한 문장을 올바르게 래핑한다', () => {
    const input = '<p>Hello world. This is a test.</p>';
    const result = wrapSentencesWithSpan(input);
    
    expect(result).toContain('<span class="sentence-highlight" data-sentence="Hello world.">Hello world.</span>');
    expect(result).toContain('<span class="sentence-highlight" data-sentence="This is a test.">This is a test.</span>');
  });

  it('복잡한 HTML 구조가 있는 실제 content를 처리한다', () => {
    const input = `<p>Most of the demos I've seen so far are pretty limited in scope: a simple HTML page, or a single JavaScript function. The sorts of things a single developer could do in an afternoon.</p>
<p>But these are the early days! If things continue to accelerate at the same rate, it'll be able to build entire applications in a couple years, right?</p>`;
    
    const result = wrapSentencesWithSpan(input);
    
    // 첫 번째 문장이 올바르게 래핑되는지 확인
    expect(result).toContain('data-sentence="Most of the demos I\'ve seen so far are pretty limited in scope: a simple HTML page, or a single JavaScript function."');
    
    // 두 번째 문장이 올바르게 래핑되는지 확인  
    expect(result).toContain('data-sentence="The sorts of things a single developer could do in an afternoon."');
    
    // 느낌표로 끝나는 문장 확인
    expect(result).toContain('data-sentence="But these are the early days!"');
    
    // 물음표로 끝나는 문장 확인
    expect(result).toContain('data-sentence="If things continue to accelerate at the same rate, it\'ll be able to build entire applications in a couple years, right?"');
  });

  it('중첩된 HTML 태그가 있는 문장을 처리한다', () => {
    const input = `<p>I'm far from an expert when it comes to <span data-use-adaptive-colors="true" id=":Rh7eiavfelb:" data-direction="n" role="tooltip"><span><span><span>Large Language Models, the machine learning models that power tools like GPT-4</span></span></span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="6" fill="none" viewBox="0 0 24 6" style="--origin-y:0%"><path d="
        M 0 0
        C 6 0
          7.199999999999999 6
          12 6
        C 16.8 6
          18 0
          24 0
        Z
      "></path></svg></span>, but I do understand how they work at a high level.</p>`;
    
    const result = wrapSentencesWithSpan(input);
    
    // HTML 태그가 보존되면서 문장이 래핑되는지 확인
    expect(result).toContain('sentence-highlight');
    expect(result).toContain('data-sentence=');
    expect(result).toContain('<span data-use-adaptive-colors="true"'); // 원본 HTML 태그가 보존되는지 확인
    expect(result).toContain('<svg xmlns="http://www.w3.org/2000/svg"'); // SVG 태그가 보존되는지 확인
  });

  it('코드 태그가 포함된 문장을 처리한다', () => {
    const input = `<p>For example, I recently used GPT-4 to generate a <code>&lt;Modal&gt;</code> component using React, and while the output <i>was</i> surprisingly good, it still made a few accessibility mistakes.</p>`;
    
    const result = wrapSentencesWithSpan(input);
    
    expect(result).toContain('sentence-highlight');
    expect(result).toContain('<code>&lt;Modal&gt;</code>'); // 코드 태그가 보존되는지 확인
    expect(result).toContain('<i>was</i>'); // italic 태그가 보존되는지 확인
  });

  it('빈 문자열이나 문장이 없는 경우를 처리한다', () => {
    expect(wrapSentencesWithSpan('')).toBe('');
    expect(wrapSentencesWithSpan('<p></p>')).toBe('<p></p>');
    expect(wrapSentencesWithSpan('<p>No sentence here</p>')).toBe('<p>No sentence here</p>'); // 마침표가 없으면 래핑하지 않음
  });

  it('여러 종류의 문장 부호를 처리한다', () => {
    const input = '<p>Question? Exclamation! Normal sentence. Another one.</p>';
    const result = wrapSentencesWithSpan(input);
    
    expect(result).toContain('data-sentence="Question?"');
    expect(result).toContain('data-sentence="Exclamation!"');
    expect(result).toContain('data-sentence="Normal sentence."');
    expect(result).toContain('data-sentence="Another one."');
  });
});