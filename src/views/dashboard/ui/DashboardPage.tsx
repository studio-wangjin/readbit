import { requireAuth } from '@/src/shared/lib/auth';
import { Button } from '@/src/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/shared/ui/card';

const todayLearning = [
  {
    title: 'You might not need Websockets',
    tag: 'Javascript',
    time: '5분',
  },
  {
    title: 'What Really Happens When You Drop a Column in Postgres',
    tag: 'React',
    time: '5분',
  },
  {
    title: 'You might not need Websockets',
    tag: 'Python',
    time: '5분',
  },
];

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const streak = [true, true, true, true, true, false, false];

export default async function DashboardPage() {
  await requireAuth();

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div className="max-w-md mx-auto w-full p-4 flex flex-col gap-4">
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
        <div className="flex gap-2 mb-4">
          {todayLearning.map((item, i) => (
            <Card key={i} className="flex-1 min-w-0">
              <CardContent className="pt-4 pb-2 px-4">
                <div className="font-medium text-sm mb-2">{item.title}</div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs px-2 py-0.5 rounded bg-muted">{item.tag}</span>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Streak */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">Streak</span>
            <span className="text-xs text-destructive">5일 연속!</span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => (
              <div key={d} className="flex flex-col items-center">
                <span className="text-xs mb-1">{d}</span>
                <div
                  className={`w-5 h-5 rounded bg-muted flex items-center justify-center ${streak[i] ? 'bg-primary' : ''}`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <nav className="w-full max-w-md mx-auto flex justify-between items-center border-t p-2 bg-background">
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
