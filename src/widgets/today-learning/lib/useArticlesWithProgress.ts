import { parseArticleContent } from '@/src/features/article/lib';
import { articleQueries } from '@/src/features/article/model/queries';
import type { ReadingLog } from '@/src/features/article/model/types';
import { useMyArticles } from '@/src/features/article/model/useMyArticles';
import { useQuery } from '@tanstack/react-query';

export function useArticlesWithProgress() {
  const { articles, isLoading } = useMyArticles();
  const { data: logs } = useQuery<ReadingLog[]>(articleQueries.readingLog());

  const articlesWithProgress = articles.map(article => {
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

  return {
    articles: articlesWithProgress,
    isLoading,
  };
}