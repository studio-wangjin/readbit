'use client';

import { SectionNoteInput } from '@/src/features/article/ui/SectionNoteInput';
import { useLoading } from '@/src/shared/lib/hooks/useLoading';
import { useState } from 'react';

interface ArticleSectionNavigationProps {
  sectionInfo: {
    currentIndex: number;
    totalCount: number;
  };
  onSubmit: (note: string) => Promise<void>;
}

export function ArticleSectionNavigation({ sectionInfo, onSubmit }: ArticleSectionNavigationProps) {
  const [note, setNote] = useState('');
  const [loading, startTransition] = useLoading();

  const handleSubmit = async () => {
    await onSubmit(note);
    setNote(''); // 완료 후 노트 초기화
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="container mx-auto max-w-4xl space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            섹션 {sectionInfo.currentIndex + 1} / {sectionInfo.totalCount}
          </div>
        </div>

        <SectionNoteInput
          value={note}
          onChange={setNote}
          onSubmit={() => startTransition(handleSubmit())}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
