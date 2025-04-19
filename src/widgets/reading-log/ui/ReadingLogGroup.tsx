import { ReadingLog } from '@/src/features/article/model/types';
import { ReadingLogCard } from './ReadingLogCard';

interface ReadingLogGroupProps {
  date: string;
  logs: ReadingLog[];
}

export function ReadingLogGroup({ date, logs }: ReadingLogGroupProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{date}</h2>
      <div className="space-y-4">
        {logs.map(log => (
          <ReadingLogCard key={log.id} log={log} />
        ))}
      </div>
    </div>
  );
}
