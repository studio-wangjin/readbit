import { ArticleSection } from '../types/article';
import { convertToAbsoluteImageUrls } from './convertToAbsoluteImageUrls';
import { splitHtmlIntoSections } from './splitHtmlIntoSections';
import { getBaseUrl } from '@/src/shared/lib/url';

export const parseArticleContent = (
  content: string,
  options?: { sourceUrl?: string }
): ArticleSection[] => {
  let processedContent = content;

  if (options?.sourceUrl) {
    const baseUrl = getBaseUrl(options.sourceUrl);
    processedContent = convertToAbsoluteImageUrls(content, baseUrl);
  }

  return splitHtmlIntoSections(processedContent);
};
