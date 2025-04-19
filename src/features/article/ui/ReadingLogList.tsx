'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { articleQueries } from '../model/queries';
import { ReadingLogsByDate } from '../model/types';
import { ReadingLogGroup } from '@/src/widgets/reading-log/ui/ReadingLogGroup';
import { ReadingContributionGraph } from '@/src/widgets/reading-log/ui/ReadingContributionGraph';

export function ReadingLogList() {
  const { data: logs, isLoading } = useQuery(articleQueries.readingLog());

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!logs?.length) {
    return <div>아직 독서 기록이 없습니다.</div>;
  }

  // Group logs by date
  const groupedLogs = logs.reduce<ReadingLogsByDate>((acc, log) => {
    const date = format(new Date(log.created_at), 'PPP', { locale: ko });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(log);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <ReadingContributionGraph logs={logs} />
      {Object.entries(groupedLogs).map(([date, logs]) => (
        <ReadingLogGroup key={date} date={date} logs={logs} />
      ))}
    </div>
  );
}
