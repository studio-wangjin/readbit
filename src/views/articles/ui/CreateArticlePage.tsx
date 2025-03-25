'use client';

import { CreateArticleForm } from '@/src/widgets/article/ui/CreateArticleForm';

export function CreateArticlePage() {
  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
      <CreateArticleForm />
    </div>
  );
}
