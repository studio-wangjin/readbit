import { ReadingLogList } from '@/src/features/article/ui/ReadingLogList';
import { FullPageCentered } from '@/src/shared/ui/layout';
import { Suspense } from 'react';

export function ReadingLogPage() {
  return (
    <FullPageCentered>
      <h1 className="text-2xl font-bold mb-8">Reading log</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ReadingLogList />
      </Suspense>
    </FullPageCentered>
  );
}
