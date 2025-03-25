import { ArticleDetailPage } from '@/src/views/articles/ui/ArticleDetailPage';

interface ArticleDetailPageProps {
  params: {
    id: string;
  };
}

export default function ArticleDetailPageRoute({ params }: ArticleDetailPageProps) {
  return <ArticleDetailPage id={params.id} />;
}
