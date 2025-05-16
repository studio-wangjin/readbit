import { ReadingLogList } from '@/src/features/article/ui/ReadingLogList';
import { BottomNav } from '@/src/widgets/bottom-nav';
import { Suspense } from 'react';

export function ReadingLogPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Reading log</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ReadingLogList />
      </Suspense>
      <BottomNav />
    </>
  );
}
