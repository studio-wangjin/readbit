import { Button } from '@/src/shared/ui/button';
import { Card, CardContent } from '@/src/shared/ui/card';
import Link from 'next/link';
import { parseArticleContent } from '@/src/features/article/lib';
import { articleQueries } from '@/src/features/article/model/queries';
import type { ReadingLog } from '@/src/features/article/model/types';
import { useMyArticles } from '@/src/features/article/model/useMyArticles';
import { useQuery } from '@tanstack/react-query';

export function TodayLearning() {
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
          todayLearningArticles.slice(0, 3).map(item => (
            <Link
              key={item.id}
              href={`/articles/${item.slug}/sections?index=${item.currentSection}`}
              className="min-w-[260px] max-w-[260px] flex flex-col justify-between h-[180px] hover:shadow-lg transition-shadow cursor-pointer rounded-lg"
              style={{ textDecoration: 'none' }}
            >
              <Card className="flex-1 h-full">
                <CardContent className="flex flex-col h-full p-4">
                  <div className="flex-1">
                    <div className="font-bold text-lg leading-tight mb-1 line-clamp-2">
                      {item.title}
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">아티클 부제</div>
                  </div>
                  <div className="flex items-end justify-between mt-auto">
                    <span className="text-xs text-muted-foreground">
                      {item.currentSection ?? 0} / {item.sectionCount ?? 0} Bits
                    </span>
                    <Button
                      size="sm"
                      className="bg-muted-foreground text-white"
                      tabIndex={-1}
                      type="button"
                    >
                      Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
