'use client';

import { useRef, useState, useCallback } from 'react';

interface SwipeCardProps {
  children: React.ReactNode;
  onSwipe: (direction: 'left' | 'right') => void;
  zIndex: number;
  scale: number;
  yOffset?: number;
  opacity?: number;
  isTop: boolean;
  className?: string;
}

export default function SwipeCard({
  children,
  onSwipe,
  zIndex,
  scale,
  yOffset = 0,
  opacity: cardOpacity = 1,
  isTop,
  className = '',
}: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleStart = useCallback(
    (clientX: number, clientY: number) => {
      if (!isTop) return;

      setIsDragging(true);
      setStartPos({ x: clientX, y: clientY });
    },
    [isTop]
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging || !isTop) return;

      const deltaX = clientX - startPos.x;
      const deltaY = clientY - startPos.y;

      setPosition({ x: deltaX, y: deltaY });
    },
    [isDragging, isTop, startPos.x, startPos.y]
  );

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
    <>
      <div
        ref={cardRef}
        className={`absolute w-80 h-96 rounded-2xl shadow-2xl cursor-grab transition-transform ${
          isDragging ? 'cursor-grabbing' : ''
        } ${isTop ? '' : 'pointer-events-none'} ${className}`}
        style={{
          transform: `translateX(${position.x}px) translateY(${position.y + yOffset}px) rotate(${rotation}deg) scale(${scale})`,
          zIndex: zIndex,
          opacity: finalOpacity,
          transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
        {...(isTop
          ? {
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
            }
          : {})}
      >
        {children}
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
    </>
  );
}