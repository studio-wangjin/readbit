'use client';

import { SectionNoteInput } from '@/src/features/article/ui/SectionNoteInput';
import { useLoading } from '@/src/shared/lib/hooks/useLoading';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { articleQueries } from '@/src/features/article/model/queries';

interface ArticleSectionNavigationProps {
  sectionInfo: {
    currentIndex: number;
    totalCount: number;
  };
  articleId: string;
  onSubmit: (note: string) => Promise<void>;
}

export function ArticleSectionNavigation({
  sectionInfo,
  articleId,
  onSubmit,
}: ArticleSectionNavigationProps) {
  const [note, setNote] = useState('');
  const [loading, startTransition] = useLoading();

  const { data: noteFromServer } = useQuery(
    articleQueries.sectionNote({ articleId, sectionIndex: sectionInfo.currentIndex })
  );

  useEffect(() => {
    if (noteFromServer) {
      setNote(noteFromServer.note);
    } else {
      setNote('');
    }
  }, [noteFromServer]);

  const handleSubmit = async () => {
    await onSubmit(note);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="container mx-auto max-w-4xl space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            {sectionInfo.currentIndex + 1} / {sectionInfo.totalCount} Bits
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
