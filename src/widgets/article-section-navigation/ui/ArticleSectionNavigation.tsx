'use client';

interface Props {
  currentIndex: number;
  totalSections: number;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export function ArticleSectionNavigation({
  currentIndex,
  totalSections,
  onPrevClick,
  onNextClick,
}: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={onPrevClick}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          이전
        </button>
        <div className="text-gray-600">
          섹션 {currentIndex + 1} / {totalSections}
        </div>
        <button
          onClick={onNextClick}
          disabled={currentIndex === totalSections - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          다음
        </button>
      </div>
    </div>
  );
}
