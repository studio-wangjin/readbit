import { Article } from '@/src/features/article/model/types';

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div className="prose max-w-none mb-8">
      <div className="whitespace-pre-wrap">{article.content}</div>
    </div>
  );
}
