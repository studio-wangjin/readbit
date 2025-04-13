import { getArticleBySlugServerSide } from '@/src/features/article/api/serverSideArticleApi';
import { ArticleChunkPage } from '@/src/views/articles/ui/ArticleChunkPage';
import { notFound } from 'next/navigation';

export default async function ArticleChunkPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlugServerSide(slug);

  if (!article) {
    notFound();
  }

  return <ArticleChunkPage article={article} />;
}
