import { useQuery } from '@tanstack/react-query';
import { articleQueries } from '@/src/features/article/model/queries';
import { isSameDay, startOfWeek, addDays } from 'date-fns';
import { Streak } from '@/src/features/streak';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function ThisWeekStreak() {
  const { data: logs, isLoading } = useQuery(articleQueries.readingLog());
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const weekStreak = weekDates.map(
    date => logs?.some(log => isSameDay(new Date(log.created_at), date)) ?? false
  );
  let streakCount = 0;
  for (let i = 6; i >= 0; i--) {
    if (weekStreak[i]) streakCount++;
    else break;
  }
  return (
    <Streak days={days} weekStreak={weekStreak} isLoading={isLoading} streakCount={streakCount} />
  );
}
