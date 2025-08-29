'use client';

import { useState, useCallback } from 'react';
import SwipeCard from './SwipeCard';
import { CardData } from '../types/article';
import { DUMMY_ARTICLES } from '../data/articles';

export default function CardStack() {
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);

  const getCardsToShow = (): CardData[] => {
    const cards: CardData[] = [];
    
    // 현재 카드
    const currentArticle = DUMMY_ARTICLES[currentArticleIndex];
    const currentPart = currentArticle.parts[currentPartIndex];
    cards.push({
      id: `${currentArticle.id}-${currentPart.partNumber}`,
      articleId: currentArticle.id,
      articleTitle: currentArticle.title,
      part: currentPart,
      currentPart: currentPartIndex + 1,
      totalParts: 3,
      category: currentArticle.category
    });

    // 다음 카드들 (미리보기용)
    for (let i = 1; i <= 2; i++) {
      let nextArticleIndex = currentArticleIndex;
      let nextPartIndex = currentPartIndex + i;
      
      // 다음 파트가 현재 아티클을 넘어가면 다음 아티클로
      if (nextPartIndex > 2) {
        nextArticleIndex = (currentArticleIndex + Math.floor(nextPartIndex / 3)) % DUMMY_ARTICLES.length;
        nextPartIndex = nextPartIndex % 3;
      }
      
      const nextArticle = DUMMY_ARTICLES[nextArticleIndex];
      const nextPart = nextArticle.parts[nextPartIndex];
      
      cards.push({
        id: `${nextArticle.id}-${nextPart.partNumber}`,
        articleId: nextArticle.id,
        articleTitle: nextArticle.title,
        part: nextPart,
        currentPart: nextPartIndex + 1,
        totalParts: 3,
        category: nextArticle.category
      });
    }
    
    return cards;
  };

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (direction === 'right') {
      // 계속 읽기 - 다음 파트로
      if (currentPartIndex < 2) {
        setCurrentPartIndex(prev => prev + 1);
      } else {
        // 3번째 파트 완료 - 다음 아티클로
        setCurrentArticleIndex(prev => (prev + 1) % DUMMY_ARTICLES.length);
        setCurrentPartIndex(0);
      }
    } else {
      // 아티클 건너뛰기 - 다음 아티클의 첫 파트로
      setCurrentArticleIndex(prev => (prev + 1) % DUMMY_ARTICLES.length);
      setCurrentPartIndex(0);
    }
  }, [currentPartIndex]);

  const cardsToShow = getCardsToShow();

  const handleActionClick = useCallback((action: 'dislike' | 'bookmark' | 'like') => {
    switch (action) {
      case 'dislike':
        handleSwipe('left');
        break;
      case 'like':
        handleSwipe('right');
        break;
      case 'bookmark':
        // TODO: 북마크 기능 구현
        console.log('Bookmark clicked');
        break;
    }
  }, [handleSwipe]);

  return (
    <div className="relative w-full h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="pt-14 pb-6 px-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Discover</h1>
      </div>

      {/* Card Stack Container */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="relative w-80 h-[500px]">
          {cardsToShow.map((card, index) => {
            const zIndex = cardsToShow.length - index;
            const scale = index === 0 ? 1 : 0.95;
            const yOffset = index === 0 ? 0 : -20;
            const opacity = index === 0 ? 1 : 0.6;
            const isTop = index === 0;

            return (
              <SwipeCard
                key={card.id}
                cardData={card}
                onSwipe={handleSwipe}
                zIndex={zIndex}
                scale={scale}
                yOffset={yOffset}
                opacity={opacity}
                isTop={isTop}
              />
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pb-8 px-6">
        <div className="flex justify-center items-center space-x-6">
          {/* Dislike Button */}
          <button
            onClick={() => handleActionClick('dislike')}
            className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => handleActionClick('bookmark')}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>

          {/* Like Button */}
          <button
            onClick={() => handleActionClick('like')}
            className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}