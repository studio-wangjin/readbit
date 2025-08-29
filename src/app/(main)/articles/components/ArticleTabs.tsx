'use client';

interface ArticleTabsProps {
  activeTab: 'unread' | 'read';
  onTabChange: (tab: 'unread' | 'read') => void;
  unreadCount: number;
  readCount: number;
}

export default function ArticleTabs({ 
  activeTab, 
  onTabChange, 
  unreadCount, 
  readCount 
}: ArticleTabsProps) {
  return (
    <div className="flex border-b border-gray-200">
      <button
        onClick={() => onTabChange('unread')}
        className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 transition-colors ${
          activeTab === 'unread'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
      >
        읽을 아티클 ({unreadCount})
      </button>
      <button
        onClick={() => onTabChange('read')}
        className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 transition-colors ${
          activeTab === 'read'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
      >
        읽은 아티클 ({readCount})
      </button>
    </div>
  );
}