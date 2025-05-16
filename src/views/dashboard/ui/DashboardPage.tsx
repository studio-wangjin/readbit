'use client';

import { Button } from '@/src/shared/ui/button';
import { useMyArticles } from '@/src/features/article/model/useMyArticles';
import { BottomNav } from '@/src/widgets/bottom-nav';
import { GoalCards } from '@/src/widgets/goal-cards';
import { TodayLearning } from '@/src/widgets/today-learning';
import { ThisWeekStreak } from '@/src/widgets/this-week-streak';

export default function DashboardPage() {
  const { articles, isLoading } = useMyArticles();

  return (
    <main>
      <div className="mx-auto p-4 flex flex-col gap-4">
        <GoalCards />

        <div className="flex items-center justify-between mt-4 mb-2">
          <span className="font-semibold">오늘의 학습</span>
          <Button variant="ghost" size="icon" aria-label="새로고침">
            ↻
          </Button>
        </div>
        <TodayLearning articles={articles} isLoading={isLoading} />
        <ThisWeekStreak />
      </div>
      <BottomNav />
    </main>
  );
}
