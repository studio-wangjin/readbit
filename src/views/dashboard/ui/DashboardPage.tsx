'use client';

import { Button } from '@/src/shared/ui/button';
import { useMyArticles } from '@/src/features/article/model/useMyArticles';
import { BottomNav } from '@/src/widgets/bottom-nav';
import { GoalCards } from '@/src/widgets/goal-cards';
import { TodayLearning } from '@/src/widgets/today-learning';
import { ThisWeekStreak } from '@/src/widgets/this-week-streak';
import { parseArticleContent } from '@/src/features/article/lib';
import { useQuery } from '@tanstack/react-query';
import { articleQueries } from '@/src/features/article/model/queries';
import type { ReadingLog } from '@/src/features/article/model/types';

export default function DashboardPage() {
  const { articles, isLoading } = useMyArticles();
  const { data: logs } = useQuery<ReadingLog[]>(articleQueries.readingLog());

  // 각 article에 대해 sectionCount, currentSection 계산
  const todayLearningArticles = articles.map(article => {
    // sectionCount 계산
    let sectionCount = 0;
    try {
      sectionCount = parseArticleContent(article.content, { sourceUrl: article.link }).length;
    } catch {
      sectionCount = 0;
    }
    // currentSection 계산 (logs에서 articleId가 일치하는 것 중 sectionIndex 최대값)
    const articleLogs = logs?.filter((log: ReadingLog) => log.article_id === article.id) ?? [];
    const currentSection =
      articleLogs.length > 0
        ? Math.max(...articleLogs.map((l: ReadingLog) => l.section_index ?? 0)) + 1
        : 0;
    return {
      ...article,
      sectionCount,
      currentSection,
    };
  });

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
        <TodayLearning articles={todayLearningArticles} isLoading={isLoading} />
        <ThisWeekStreak />
      </div>
      <BottomNav />
    </main>
  );
}
