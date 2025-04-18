import { getArticleBySlugServerSide } from '@/src/features/article/api/serverSideArticleApi';
import { ArticleDetailPage } from '@/src/views/articles/ui/ArticleDetailPage';
import { notFound } from 'next/navigation';

export default async function ArticleDetailPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlugServerSide(slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetailPage article={article} />;
}
