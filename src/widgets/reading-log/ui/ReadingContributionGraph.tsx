'use client';

import { useMemo } from 'react';
import { eachDayOfInterval, format, isSameDay, setYear, startOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ReadingLog } from '@/src/features/article/model/types';

interface ReadingContributionGraphProps {
  logs: ReadingLog[];
}

interface ContributionDay {
  date: Date;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const DAYS_IN_WEEK = 7;
const CELL_SIZE = 10; // px
const CELL_GAP = 2; // px

function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}

export function ReadingContributionGraph({ logs }: ReadingContributionGraphProps) {
  const { contributions, firstDate, totalWeeks } = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1); // 1월 1일
    const endDate = new Date(currentYear, 11, 31); // 12월 31일

    // 첫 주의 시작일로 조정
    const firstDate = startOfWeek(startDate, { weekStartsOn: 1 }); // 월요일부터 시작
    const days = eachDayOfInterval({ start: firstDate, end: endDate });
    const totalWeeks = Math.ceil(days.length / DAYS_IN_WEEK);

    // 로그의 날짜를 현재 연도로 정규화
    const normalizedLogs = logs.map(log => ({
      ...log,
      created_at: setYear(new Date(log.created_at), currentYear).toISOString(),
    }));

    const contributions = days.map(date => {
      const dayLogs = normalizedLogs.filter(log => isSameDay(new Date(log.created_at), date));
      const count = dayLogs.length;
      return {
        date,
        count,
        level: getContributionLevel(count),
      };
    });

    return { contributions, firstDate, totalWeeks };
  }, [logs]);

  const weeks = useMemo(() => {
    const result: ContributionDay[][] = Array.from({ length: totalWeeks }, () => []);

    contributions.forEach((day, index) => {
      const weekIndex = Math.floor(index / DAYS_IN_WEEK);
      if (weekIndex < totalWeeks) {
        result[weekIndex].push(day);
      }
    });

    return result;
  }, [contributions, totalWeeks]);

  const months = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 12 }, (_, i) => new Date(currentYear, i, 1));
  }, []);

  // 그래프의 전체 너비 계산
  const graphWidth = totalWeeks * (CELL_SIZE + CELL_GAP);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex gap-2 items-end mb-2">
        <div className="text-sm text-gray-600">Reading log</div>
        <div className="flex gap-1 text-xs text-gray-400 ml-auto">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={`w-2.5 h-2.5 rounded-sm ${
                  level === 0
                    ? 'bg-gray-100'
                    : level === 1
                      ? 'bg-emerald-100'
                      : level === 2
                        ? 'bg-emerald-300'
                        : level === 3
                          ? 'bg-emerald-500'
                          : 'bg-emerald-700'
                }`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div style={{ width: graphWidth + 40, minWidth: 'min-content' }}>
          <div className="flex text-xs text-gray-400 h-5 mb-1 relative">
            <div className="w-8" /> {/* 요일 라벨 공간 */}
            {months.map((month, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.floor((month.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 7)) * (CELL_SIZE + CELL_GAP) + 32}px`,
                }}
              >
                {format(month, 'M월')}
              </div>
            ))}
          </div>
          <div className="flex">
            <div className="grid grid-rows-7 grid-flow-row gap-[2px] text-xs text-gray-400 pr-2 w-8">
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
            <div className="flex gap-[2px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-rows-7 gap-[2px]">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-2.5 h-2.5 rounded-sm ${
                        day.level === 0
                          ? 'bg-gray-100'
                          : day.level === 1
                            ? 'bg-emerald-100'
                            : day.level === 2
                              ? 'bg-emerald-300'
                              : day.level === 3
                                ? 'bg-emerald-500'
                                : 'bg-emerald-700'
                      }`}
                      title={`${format(day.date, 'PPP', { locale: ko })} - ${day.count}개의 노트`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
