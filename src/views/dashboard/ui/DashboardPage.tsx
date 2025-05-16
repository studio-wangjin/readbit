'use client';

import { Button } from '@/src/shared/ui/button';
import { useMyArticles } from '@/src/features/article/model/useMyArticles';
import { useQuery } from '@tanstack/react-query';
import { articleQueries } from '@/src/features/article/model/queries';
import { isSameDay, startOfWeek, addDays } from 'date-fns';
import { BottomNav } from '@/src/widgets/bottom-nav';
import { GoalCards } from '@/src/widgets/goal-cards';
import { TodayLearning } from '@/src/widgets/today-learning';
import { Streak } from '@/src/widgets/streak';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function DashboardPage() {
  const { articles, isLoading } = useMyArticles();
  const { data: logs, isLoading: isLogLoading } = useQuery(articleQueries.readingLog());

  // 이번주(월~일) 각 요일별로 로그가 있는지 계산
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // 월요일 시작
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const weekStreak = weekDates.map(
    date => logs?.some(log => isSameDay(new Date(log.created_at), date)) ?? false
  );

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
        <Streak
          days={days}
          weekStreak={weekStreak}
          isLoading={isLogLoading}
          streakCount={(() => {
            let streakCount = 0;
            for (let i = 6; i >= 0; i--) {
              if (weekStreak[i]) streakCount++;
              else break;
            }
            return streakCount;
          })()}
        />
      </div>
      <BottomNav />
    </main>
  );
}
