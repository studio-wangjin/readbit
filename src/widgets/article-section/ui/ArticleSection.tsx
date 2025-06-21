'use client';

import parse, { domToReact, DOMNode, Element } from 'html-react-parser';
import React from 'react';

export interface ArticleSectionProps {
  title: string;
  content: string[];
}

export function ArticleSection({ title, content }: ArticleSectionProps) {
  const options = {
    replace: (domNode: DOMNode) => {
      // <p> 태그만 특별 처리하여 문장 단위로 자식들을 재구성
      if (domNode instanceof Element && domNode.name === 'p') {
        const nodes: React.ReactNode[] = [];

        // 자식 노드를 순회하며 텍스트는 문장 단위로 나누고 태그는 React 엘리먼트로 변환
        function processChildren(children: DOMNode[]) {
          children.forEach(child => {
            if (child.type === 'text') {
              // 텍스트를 문장들로 나눔 : 문장 끝 문자와 그 뒤의 공백까지 포함하여 나눔
              const sentences = child.data.match(/[^.!?]+[.!?]*\s*|[^.!?]+$/g);
              if (sentences) {
                sentences.forEach(s => {
                  if (s.trim()) nodes.push(s);
                });
              }
            } else if (child.type === 'tag') {
              nodes.push(domToReact([child], options));
            }
          });
        }

        processChildren(domNode.children as DOMNode[]);

        // 변환된 노드들을 다시 문장 단위로 그룹화
        const groupedSentences: React.ReactNode[][] = [];
        let currentSentence: React.ReactNode[] = [];

        nodes.forEach(node => {
          currentSentence.push(node);
          // 노드가 문자열이고 문장의 끝 형태를 띠면 그룹을 만듭니다.
          if (typeof node === 'string' && node.trim().match(/[.!?]$/)) {
            groupedSentences.push(currentSentence);
            currentSentence = [];
          }
        });
        
        // 마지막에 남은 노드들이 있다면 그것도 하나의 문장 그룹으로 처리
        if (currentSentence.length > 0) {
          groupedSentences.push(currentSentence);
        }

        return (
          // 원본 <p> 태그의 속성을 유지하면서 문장별로 <span>으로 감싼 새로운 자식들을 렌더링
          <p {...domNode.attribs}>
            {groupedSentences.map((sentence, index) => (
              <span key={index} className="sentence-highlight">
                {sentence}
              </span>
            ))}
          </p>
        );
      }
    },
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {content.map((html, idx) => (
          <div
            key={idx}
            className="prose prose-lg max-w-none [&_.sentence-highlight:hover]:bg-yellow-300 [&_.sentence-highlight:hover]:px-1 [&_.sentence-highlight:hover]:py-0.5 [&_.sentence-highlight:hover]:rounded-sm [&_.sentence-highlight:active]:bg-yellow-300 [&_.sentence-highlight:active]:px-1 [&_.sentence-highlight:active]:py-0.5 [&_.sentence-highlight:active]:rounded-sm"
          >
            {parse(html, options)}
          </div>
        ))}
      </div>
    </section>
  );
}
