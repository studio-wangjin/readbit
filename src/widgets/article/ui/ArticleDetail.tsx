import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';
import { Article } from '@/src/features/article/model/types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Author: {article.user_id}</span>
            <span>
              {formatDistanceToNow(new Date(article.created_at), {
                addSuffix: true,
                locale: ko,
              })}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href={`/articles/${article.id}/edit`}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Link href="/articles/my">
            <Button variant="outline">Back to List</Button>
          </Link>
        </div>
      </div>

      <article className="prose lg:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </div>
  );
}
