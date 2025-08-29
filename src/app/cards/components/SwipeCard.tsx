'use client';

import { useRef, useState } from 'react';

interface SwipeCardProps {
  id: number;
  title: string;
  content: string;
  onSwipe: (direction: 'left' | 'right', id: number) => void;
  zIndex: number;
  scale: number;
  isTop: boolean;
}

export default function SwipeCard({
  id,
  title,
  content,
  onSwipe,
  zIndex,
  scale,
  isTop,
}: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleStart = (clientX: number, clientY: number) => {
    if (!isTop) return;
    
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !isTop) return;

    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging || !isTop) return;

    const threshold = 100;
    const { x } = position;

    if (Math.abs(x) > threshold) {
      const direction = x > 0 ? 'right' : 'left';
      onSwipe(direction, id);
    } else {
      setPosition({ x: 0, y: 0 });
    }

    setIsDragging(false);
  };

  const rotation = position.x * 0.1;
  const opacity = Math.max(0.3, 1 - Math.abs(position.x) / 300);

  return (
    <div
      ref={cardRef}
      className={`absolute w-80 h-96 rounded-2xl shadow-2xl cursor-grab transition-transform ${
        isDragging ? 'cursor-grabbing' : ''
      } ${isTop ? '' : 'pointer-events-none'}`}
      style={{
        transform: `translateX(${position.x}px) translateY(${position.y}px) rotate(${rotation}deg) scale(${scale})`,
        zIndex: zIndex,
        opacity: isTop ? opacity : 1,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
      }}
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        handleStart(touch.clientX, touch.clientY);
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }}
      onTouchEnd={handleEnd}
    >
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-lg opacity-90 leading-relaxed">{content}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            ❤️
          </div>
          <div className="text-sm opacity-70">#{id}</div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            🗑️
          </div>
        </div>
      </div>
      
      {isTop && Math.abs(position.x) > 50 && (
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold ${
            position.x > 0 ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {position.x > 0 ? 'LIKE' : 'NOPE'}
        </div>
      )}
    </div>
  );
}