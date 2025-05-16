interface StreakProps {
  days: string[];
  weekStreak: boolean[];
  isLoading: boolean;
  streakCount: number;
}

export function Streak({ days, weekStreak, isLoading, streakCount }: StreakProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold">Streak</span>
        {!isLoading && streakCount > 0 && (
          <span className="text-xs text-destructive">{streakCount}일 연속!</span>
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
  );
}
