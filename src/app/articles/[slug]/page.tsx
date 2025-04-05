import { ArticleDetailPage } from '@/src/views/articles/ui/ArticleDetailPage';

export default async function ArticleDetailPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticleDetailPage slug={slug} />;
}
