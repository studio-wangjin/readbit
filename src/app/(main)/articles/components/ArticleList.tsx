import { MyArticle } from '@/src/domains/article/schema';
import ArticleCard from './ArticleCard';

interface ArticleListProps {
  articles: MyArticle[];
  onToggleRead: (articleId: number) => void;
  emptyMessage: string;
}

export default function ArticleList({ articles, onToggleRead, emptyMessage }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-lg">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onToggleRead={onToggleRead}
        />
      ))}
    </div>
  );
}