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

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <div className="relative w-80 h-96">
        {cardsToShow.map((card, index) => {
          const zIndex = cardsToShow.length - index;
          const scale = 1 - (index * 0.05);
          const isTop = index === 0;

          return (
            <SwipeCard
              key={card.id}
              cardData={card}
              onSwipe={handleSwipe}
              zIndex={zIndex}
              scale={scale}
              isTop={isTop}
            />
          );
        })}
      </div>
    </div>
  );
}