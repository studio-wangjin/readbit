'use client';

export interface ArticleSectionProps {
  title: string;
  content: string[];
}

export function ArticleSection({ title, content }: ArticleSectionProps) {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {content.map((html, idx) => (
          <div
            key={idx}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))}
      </div>
    </section>
  );
}
