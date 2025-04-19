import { articleApi } from '../api/articleApi';

export const articleQueries = {
  sectionNote: (options: { articleId: string; sectionIndex: number }) => ({
    queryKey: [...Object.values(options), 'articleQueries.sectionNote'],
    queryFn: () => articleApi.getSectionNote(options.articleId, options.sectionIndex),
  }),
  readingLog: () => ({
    queryKey: ['article', 'reading-log'],
    queryFn: () => articleApi.getReadingLogs(),
  }),
} as const;
