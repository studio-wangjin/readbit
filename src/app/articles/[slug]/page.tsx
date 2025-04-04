import { ArticleDetailPage } from '@/src/views/articles/ui/ArticleDetailPage';

interface ArticleDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ArticleDetailPageRoute({ params }: ArticleDetailPageProps) {
  console.log('params', params);
  return <ArticleDetailPage slug={params.slug} />;
}
