'use client';

import { useState } from 'react';
import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
import { Label } from '@/src/shared/ui/label';
import { Switch } from '@/src/shared/ui/switch';

export function ScrapeUrlForm() {
  const [url, setUrl] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/articles/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, isPublic }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      alert('아티클이 저장되었습니다');
      setUrl('');
      setIsPublic(false);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('알 수 없는 오류가 발생했습니다');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          type="url"
          placeholder="https://example.com/article"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
        <Label htmlFor="public">공개 여부</Label>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? '저장 중...' : 'URL 저장하기'}
      </Button>
    </form>
  );
}
