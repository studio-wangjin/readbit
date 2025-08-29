'use client';

import { useRef, useState, useCallback } from 'react';
import { CardData } from '../types/article';

const getArticleColors = (articleId: number) => {
  const colorSchemes = [
    'from-blue-500 to-purple-600',      // 기술 - 파란색/보라색
    'from-green-500 to-teal-600',       // 환경 - 초록색/청록색  
    'from-pink-500 to-rose-600',        // 비즈니스 - 핑크색/장미색
    'from-orange-500 to-red-600',       // 추가 색상
    'from-indigo-500 to-blue-600',      // 추가 색상
  ];
  
  return colorSchemes[(articleId - 1) % colorSchemes.length];
};

interface SwipeCardProps {
  cardData: CardData;
  onSwipe: (direction: 'left' | 'right') => void;
  zIndex: number;
  scale: number;
  yOffset?: number;
  opacity?: number;
  isTop: boolean;
}

export default function SwipeCard({
  cardData,
  onSwipe,
  zIndex,
  scale,
  yOffset = 0,
  opacity: cardOpacity = 1,
  isTop,
}: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    if (!isTop) return;
    
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
  }, [isTop]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging || !isTop) return;

    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    
    setPosition({ x: deltaX, y: deltaY });
  }, [isDragging, isTop, startPos.x, startPos.y]);

  const handleEnd = useCallback(() => {
    if (!isDragging || !isTop) return;

    const threshold = 100;
    const { x } = position;

    if (Math.abs(x) > threshold) {
      const direction = x > 0 ? 'right' : 'left';
      onSwipe(direction);
    } else {
      setPosition({ x: 0, y: 0 });
    }

    setIsDragging(false);
  }, [isDragging, isTop, position, onSwipe]);

  const rotation = position.x * 0.1;
  const swipeOpacity = isTop ? Math.max(0.3, 1 - Math.abs(position.x) / 300) : 1;
  const finalOpacity = isTop ? swipeOpacity : cardOpacity;

  return (
    <div
      ref={cardRef}
      className={`absolute w-80 h-96 rounded-2xl shadow-2xl cursor-grab transition-transform ${
        isDragging ? 'cursor-grabbing' : ''
      } ${isTop ? '' : 'pointer-events-none'}`}
      style={{
        transform: `translateX(${position.x}px) translateY(${position.y + yOffset}px) rotate(${rotation}deg) scale(${scale})`,
        zIndex: zIndex,
        opacity: finalOpacity,
        transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
{...(isTop ? {
        onMouseDown: (e: React.MouseEvent) => handleStart(e.clientX, e.clientY),
        onMouseMove: (e: React.MouseEvent) => handleMove(e.clientX, e.clientY),
        onMouseUp: handleEnd,
        onMouseLeave: handleEnd,
        onTouchStart: (e: React.TouchEvent) => {
          const touch = e.touches[0];
          handleStart(touch.clientX, touch.clientY);
        },
        onTouchMove: (e: React.TouchEvent) => {
          const touch = e.touches[0];
          handleMove(touch.clientX, touch.clientY);
        },
        onTouchEnd: handleEnd,
      } : {})}
    >
      <div className={`w-full h-full bg-gradient-to-br ${getArticleColors(cardData.articleId)} rounded-2xl p-6 text-white flex flex-col`}>
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
          <h1 className="text-lg font-bold leading-tight opacity-90">
            {cardData.articleTitle}
          </h1>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-xl font-bold mb-4">{cardData.part.title}</h2>
          <p className="text-sm leading-relaxed opacity-90 flex-1">
            {cardData.part.summary}
          </p>
        </div>

      </div>
      
      {isTop && Math.abs(position.x) > 50 && (
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold ${
            position.x > 0 ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {position.x > 0 ? '계속 읽기' : '다른 글 읽기'}
        </div>
      )}
    </div>
  );
}