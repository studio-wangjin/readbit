import { ArticleSection } from '../../types/article';
import { convertToAbsoluteImageUrls } from './convertImages';
import { splitHtmlIntoSections } from './splitSections';
import { getBaseUrl } from '@/src/shared/lib/url';

/**
 * HTML 컨텐츠를 파싱하고 필요한 변환을 수행합니다.
 * 1. 이미지 URL을 절대 경로로 변환 (sourceUrl이 제공된 경우)
 * 2. HTML을 섹션으로 분할
 */
export const parseArticleContent = (
  content: string,
  options?: { sourceUrl?: string }
): ArticleSection[] => {
  let processedContent = content;
  if (options?.sourceUrl) {
    try {
      const baseUrl = getBaseUrl(options.sourceUrl);
      processedContent = convertToAbsoluteImageUrls(content, baseUrl);
    } catch (e) {
      console.error('Invalid source URL:', e);
    }
  }

  return splitHtmlIntoSections(processedContent);
};
