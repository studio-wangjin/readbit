'use client';

import { CreateArticleForm } from '@/src/widgets/article/ui/CreateArticleForm';

export function CreateArticlePage() {
  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-2xl font-bold mb-6">새 아티클 작성</h1>
      <CreateArticleForm />
    </div>
  );
}
