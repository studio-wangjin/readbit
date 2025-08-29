import { MyArticle } from '@/src/domains/article/schema';

interface ArticleCardProps {
  article: MyArticle;
  onToggleRead: (articleId: number) => void;
}

export default function ArticleCard({ article, onToggleRead }: ArticleCardProps) {
  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onToggleRead(article.id)}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
          {article.category}
        </span>
        <span className="text-xs text-gray-400">{article.addedAt}</span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
        {article.title}
      </h3>
      
      {article.isRead && (
        <div className="mt-2">
          <span className="inline-flex items-center text-xs text-green-600">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            읽음
          </span>
        </div>
      )}
    </div>
  );
}