import { getArticleBySlugServerSide } from '@/src/features/article/api/serverSideArticleApi';
import { ArticleSectionPage } from '@/src/views/articles/ui/ArticleSectionPage';
import { notFound } from 'next/navigation';

export default async function ArticleSectionPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlugServerSide(slug);

  if (!article) {
    notFound();
  }

  return <ArticleSectionPage article={article} />;
}
