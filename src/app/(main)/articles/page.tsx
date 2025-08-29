'use client';

import { useState } from 'react';
import { MY_ARTICLES } from '@/src/domains/article/mock-data';
import { MyArticle } from '@/src/domains/article/schema';
import ArticleUrlInput from './components/ArticleUrlInput';
import ArticleTabs from './components/ArticleTabs';
import ArticleList from './components/ArticleList';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<MyArticle[]>(MY_ARTICLES);
  const [activeTab, setActiveTab] = useState<'unread' | 'read'>('unread');

  const handleAddArticle = (url: string) => {
    console.log('아티클 추가:', url);
  };

  const handleToggleRead = (articleId: number) => {
    setArticles(prev =>
      prev.map(article =>
        article.id === articleId ? { ...article, isRead: !article.isRead } : article
      )
    );
  };

  const unreadArticles = articles.filter(article => !article.isRead);
  const readArticles = articles.filter(article => article.isRead);
  const currentArticles = activeTab === 'unread' ? unreadArticles : readArticles;

  return (
    <div className="min-h-screen bg-gray-50">
      <ArticleUrlInput onAddArticle={handleAddArticle} />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white">
          <ArticleTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            unreadCount={unreadArticles.length}
            readCount={readArticles.length}
          />

          <div className="p-6">
            <ArticleList
              articles={currentArticles}
              onToggleRead={handleToggleRead}
              emptyMessage={
                activeTab === 'unread'
                  ? '읽을 아티클이 없습니다. URL을 추가해보세요!'
                  : '아직 읽은 아티클이 없습니다.'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
