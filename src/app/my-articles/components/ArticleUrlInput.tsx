'use client';

import { useState } from 'react';

interface ArticleUrlInputProps {
  onAddArticle: (url: string) => void;
}

export default function ArticleUrlInput({ onAddArticle }: ArticleUrlInputProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    try {
      onAddArticle(url.trim());
      setUrl('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="아티클 URL을 붙여넣어주세요"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? '추가 중...' : '추가'}
        </button>
      </form>
    </div>
  );
}