'use client';

import { useState } from 'react';
import SwipeCard from './SwipeCard';

interface Card {
  id: number;
  title: string;
  content: string;
}

const initialCards: Card[] = [
  { id: 1, title: "첫 번째 카드", content: "이것은 첫 번째 카드입니다. 좌우로 스와이프해서 다음 카드를 볼 수 있습니다." },
  { id: 2, title: "두 번째 카드", content: "멋진 Tinder 스타일 UI입니다. 드래그해서 카드를 움직여보세요." },
  { id: 3, title: "세 번째 카드", content: "React와 Tailwind로 만든 스와이프 카드 컴포넌트입니다." },
  { id: 4, title: "네 번째 카드", content: "무한 스크롤링이 가능한 카드 스택입니다." },
  { id: 5, title: "다섯 번째 카드", content: "좋아요는 오른쪽, 싫어요는 왼쪽으로 스와이프하세요." },
];

export default function CardStack() {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [removedCards, setRemovedCards] = useState<Card[]>([]);

  const handleSwipe = (direction: 'left' | 'right', cardId: number) => {
    const cardToRemove = cards.find(card => card.id === cardId);
    if (!cardToRemove) return;

    setRemovedCards(prev => [...prev, cardToRemove]);
    setCards(prev => prev.filter(card => card.id !== cardId));

    setTimeout(() => {
      if (cards.length <= 2) {
        const newCards = Array.from({ length: 5 }, (_, i) => ({
          id: Math.max(...cards.map(c => c.id), ...removedCards.map(c => c.id)) + i + 1,
          title: `새로운 카드 ${i + 1}`,
          content: `무한히 생성되는 카드 ${i + 1}번입니다. 계속 스와이프해보세요!`
        }));
        setCards(prev => [...prev, ...newCards]);
      }
    }, 300);
  };

  const handleReset = () => {
    setCards(initialCards);
    setRemovedCards([]);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <div className="relative w-80 h-96">
        {cards.slice(0, 3).map((card, index) => {
          const zIndex = cards.length - index;
          const scale = 1 - (index * 0.05);
          const isTop = index === 0;

          return (
            <SwipeCard
              key={card.id}
              id={card.id}
              title={card.title}
              content={card.content}
              onSwipe={handleSwipe}
              zIndex={zIndex}
              scale={scale}
              isTop={isTop}
            />
          );
        })}
      </div>

      <div className="absolute bottom-10 flex gap-4">
        <button
          onClick={() => handleSwipe('left', cards[0]?.id)}
          className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl hover:bg-red-600 transition-colors"
          disabled={cards.length === 0}
        >
          ❌
        </button>
        
        <button
          onClick={handleReset}
          className="w-14 h-14 bg-gray-500 rounded-full flex items-center justify-center text-white text-xl hover:bg-gray-600 transition-colors"
        >
          🔄
        </button>
        
        <button
          onClick={() => handleSwipe('right', cards[0]?.id)}
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl hover:bg-green-600 transition-colors"
          disabled={cards.length === 0}
        >
          ❤️
        </button>
      </div>

      {cards.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl text-gray-500 mb-4">모든 카드를 확인했습니다!</p>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              다시 시작하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}