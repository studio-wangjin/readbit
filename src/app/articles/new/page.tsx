import { ScrapeUrlForm } from '@/src/features/articles/components/scrape-url-form';

export default function NewArticlePage() {
  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-2xl font-bold mb-6">새 아티클 추가하기</h1>
      <ScrapeUrlForm />
    </div>
  );
}
