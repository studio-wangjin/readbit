'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
import { Label } from '@/src/shared/ui/label';
import { Switch } from '@/src/shared/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/src/shared/ui/tabs';
import { Textarea } from '@/src/shared/ui/textarea';
import { useCreateArticle } from '@/src/features/article/model/useCreateArticle';

type InputMode = 'url' | 'manual';

export function CreateArticleForm() {
  const router = useRouter();
  const { createArticle, isSubmitting } = useCreateArticle();
  const [mode, setMode] = useState<InputMode>('url');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [manualUrl, setManualUrl] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlSubmit = async (e: React.FormEvent) => {
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
      router.push(`/articles/${data.data.slug}`);
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

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const article = await createArticle({
        title,
        content,
        link: manualUrl || '',
        public: isPublic,
      });

      setTitle('');
      setContent('');
      setManualUrl('');
      setIsPublic(false);
      router.push(`/articles/${article.slug}`);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('알 수 없는 오류가 발생했습니다');
      }
    }
  };

  return (
    <Tabs value={mode} onValueChange={value => setMode(value as InputMode)}>
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="url">URL로 추가하기</TabsTrigger>
        <TabsTrigger value="manual">직접 입력하기</TabsTrigger>
      </TabsList>

      <TabsContent value="url">
        <form onSubmit={handleUrlSubmit} className="space-y-4">
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
            <Switch id="public-url" checked={isPublic} onCheckedChange={setIsPublic} />
            <Label htmlFor="public-url">공개 여부</Label>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? '저장 중...' : 'URL 저장하기'}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="manual">
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              type="text"
              placeholder="아티클 제목을 입력하세요"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">내용</Label>
            <Textarea
              id="content"
              placeholder="아티클 내용을 입력하세요"
              value={content}
              onChange={e => setContent(e.target.value)}
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="manual-url">링크 (선택사항)</Label>
            <Input
              id="manual-url"
              type="url"
              placeholder="https://example.com/article"
              value={manualUrl}
              onChange={e => setManualUrl(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="public-manual" checked={isPublic} onCheckedChange={setIsPublic} />
            <Label htmlFor="public-manual">공개 여부</Label>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '저장 중...' : '직접 저장하기'}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
