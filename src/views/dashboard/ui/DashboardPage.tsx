'use client';

import { Button } from '@/src/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/shared/ui/card';
import { useMyArticles } from '@/src/features/article/model/useMyArticles';
import { useQuery } from '@tanstack/react-query';
import { articleQueries } from '@/src/features/article/model/queries';
import { isSameDay, startOfWeek, addDays } from 'date-fns';

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
        {/* 목표 카드 */}
        <div className="flex gap-2">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-base">오늘도 1조각 읽어볼까요?</CardTitle>
              <CardDescription>&quot;토스, 테크니컬 라이팅 가이드 공개&quot;</CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-base">읽고 있던 글, 계속 읽어봐요!</CardTitle>
              <CardDescription>&quot;토스, 테크니컬 라이팅 가이드 공개&quot;</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* 오늘의 학습 */}
        <div className="flex items-center justify-between mt-4 mb-2">
          <span className="font-semibold">오늘의 학습</span>
          <Button variant="ghost" size="icon" aria-label="새로고침">
            ↻
          </Button>
        </div>
        <div className="mb-4 overflow-x-auto">
          <div className="flex gap-4 flex-nowrap min-h-[180px]">
            {isLoading ? (
              <div className="w-full text-center py-8 text-muted-foreground text-sm">
                불러오는 중...
              </div>
            ) : articles.length === 0 ? (
              <div className="w-full text-center py-8 text-muted-foreground text-sm">
                아직 작성한 아티클이 없습니다.
              </div>
            ) : (
              articles.slice(0, 3).map(item => (
                <Card
                  key={item.id}
                  className="min-w-[260px] max-w-[260px] flex flex-col justify-between h-[180px]"
                >
                  <CardContent className="flex flex-col h-full p-4">
                    <div className="flex-1">
                      <div className="font-bold text-lg leading-tight mb-1 line-clamp-2">
                        {item.title}
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">아티클 부제</div>
                    </div>
                    <div className="flex items-end justify-between mt-auto">
                      <span className="text-xs text-muted-foreground">0 / 12 bit</span>
                      <Button size="sm" className="bg-muted-foreground text-white">
                        Read
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Streak */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">Streak</span>
            {/* 연속 일수 계산 */}
            {isLogLoading ? null : (
              <span className="text-xs text-destructive">
                {(() => {
                  let streakCount = 0;
                  for (let i = 6; i >= 0; i--) {
                    if (weekStreak[i]) streakCount++;
                    else break;
                  }
                  return streakCount > 0 ? `${streakCount}일 연속!` : '';
                })()}
              </span>
            )}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => (
              <div key={d} className="flex flex-col items-center">
                <span className="text-xs mb-1">{d}</span>
                <div
                  className={`w-5 h-5 rounded bg-muted flex items-center justify-center ${weekStreak[i] ? 'bg-primary' : ''}`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <nav
        className="w-full fixed bottom-0 left-0 flex justify-between items-center border-t p-2 bg-background z-10"
        style={{ maxWidth: '100vw' }}
      >
        <Button variant="ghost" className="flex-1 flex flex-col items-center" size="icon">
          <span className="text-lg">🎓</span>
          <span className="text-xs mt-1">학습하기</span>
        </Button>
        <Button variant="ghost" className="flex-1 flex flex-col items-center" size="icon">
          <span className="text-lg">📁</span>
          <span className="text-xs mt-1">저장소</span>
        </Button>
        <Button variant="ghost" className="flex-1 flex flex-col items-center" size="icon">
          <span className="text-lg">⚙️</span>
          <span className="text-xs mt-1">프로필</span>
        </Button>
      </nav>
    </main>
  );
}
