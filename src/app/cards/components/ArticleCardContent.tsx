'use client';

import { CardData } from '@/src/domains/article/schema';

const getArticleColors = (articleId: number) => {
  const colorSchemes = [
    'from-blue-500 to-purple-600', // 기술 - 파란색/보라색
    'from-green-500 to-teal-600', // 환경 - 초록색/청록색
    'from-pink-500 to-rose-600', // 비즈니스 - 핑크색/장미색
    'from-orange-500 to-red-600', // 추가 색상
    'from-indigo-500 to-blue-600', // 추가 색상
  ];

  return colorSchemes[(articleId - 1) % colorSchemes.length];
};

interface ArticleCardContentProps {
  cardData: CardData;
}

export default function ArticleCardContent({ cardData }: ArticleCardContentProps) {
  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${getArticleColors(cardData.articleId)} rounded-2xl p-6 text-white flex flex-col`}
    >
      {/* 상단: 아티클 제목 + 진행도 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
            {cardData.category}
          </span>
          <span className="text-sm font-bold">
            {cardData.currentPart}/{cardData.totalParts}
          </span>
        </div>
        <h1 className="text-lg font-bold leading-tight opacity-90">{cardData.articleTitle}</h1>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-xl font-bold mb-4">{cardData.part.title}</h2>
        <p className="text-sm leading-relaxed opacity-90 flex-1">{cardData.part.summary}</p>
      </div>
    </div>
  );
}