export interface ArticleChunkNavigationProps {
  currentIndex: number;
  totalSections: number;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export function ArticleChunkNavigation({
  currentIndex,
  totalSections,
  onPrevClick,
  onNextClick,
}: ArticleChunkNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={onPrevClick}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          이전 섹션
        </button>
        <span className="text-gray-600">
          {currentIndex + 1} / {totalSections}
        </span>
        <button
          onClick={onNextClick}
          disabled={currentIndex === totalSections - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          다음 섹션
        </button>
      </div>
    </div>
  );
}
