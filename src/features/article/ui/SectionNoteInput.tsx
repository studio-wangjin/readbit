'use client';

import { Button } from '@/src/shared/ui/button';
import { Textarea } from '@/src/shared/ui/textarea';

interface SectionNoteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => Promise<void>;
  isLoading: boolean;
}

export function SectionNoteInput({ value, onChange, onSubmit, isLoading }: SectionNoteInputProps) {
  return (
    <div className="space-y-2">
      <Textarea
        placeholder="이 섹션에 대한 노트를 작성해주세요..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <div className="flex justify-end">
        <Button onClick={onSubmit} disabled={isLoading || !value.trim()}>
          {isLoading ? '저장 중...' : '다음 섹션으로'}
        </Button>
      </div>
    </div>
  );
}
