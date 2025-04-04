import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';
import { Article } from '@/src/features/article/model/types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ArticleListProps {
  articles: Article[];
  onDelete: (id: string) => void;
}

export function ArticleList({ articles, onDelete }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No articles yet</p>
        <Link href="/articles/create">
          <Button>Create Your First Article</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map(article => (
        <div key={article.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <Link
                href={`/articles/${article.slug}`}
                className="text-lg font-semibold hover:text-blue-600"
              >
                {article.title}
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                {formatDistanceToNow(new Date(article.created_at), {
                  addSuffix: true,
                  locale: ko,
                })}
              </p>
            </div>
            <div className="flex space-x-2">
              <Link href={`/articles/${article.id}/edit`}>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link>
              <Button variant="destructive" size="sm" onClick={() => onDelete(article.id)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
