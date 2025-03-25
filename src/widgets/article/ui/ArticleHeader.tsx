import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';
import { Article } from '@/src/features/article/model/types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>작성자: {article.userId}</span>
          <span>
            {formatDistanceToNow(new Date(article.createdAt), {
              addSuffix: true,
              locale: ko,
            })}
          </span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Link href={`/articles/${article.id}/edit`}>
          <Button variant="outline">수정</Button>
        </Link>
        <Link href="/articles">
          <Button variant="outline">목록으로</Button>
        </Link>
      </div>
    </div>
  );
}
