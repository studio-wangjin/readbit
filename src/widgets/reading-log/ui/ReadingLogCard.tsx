import { ReadingLog } from '@/src/features/article/model/types';

interface ReadingLogCardProps {
  log: ReadingLog;
}

export function ReadingLogCard({ log }: ReadingLogCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{log.article_title}</h3>
        <span className="text-sm text-gray-500">Section {log.section_index + 1}</span>
      </div>
      {log.note && <p className="text-gray-700 whitespace-pre-wrap">{log.note}</p>}
    </div>
  );
}
