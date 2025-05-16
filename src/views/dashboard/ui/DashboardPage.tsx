'use client';

import { Button } from '@/src/shared/ui/button';
import { BottomNav } from '@/src/widgets/bottom-nav';
import { GoalCards } from '@/src/widgets/goal-cards';
import { ThisWeekStreak } from '@/src/widgets/this-week-streak';
import { TodayLearning } from '@/src/widgets/today-learning';

export default function DashboardPage() {
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
        <TodayLearning />
        <ThisWeekStreak />
      </div>
      <BottomNav />
    </main>
  );
}
