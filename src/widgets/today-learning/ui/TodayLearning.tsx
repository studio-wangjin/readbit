import { useArticlesWithProgress } from '../lib/useArticlesWithProgress';
import { MainArticleCard } from './MainArticleCard';
import { SubArticleCard } from './SubArticleCard';

export function TodayLearning() {
  const { articles, isLoading } = useArticlesWithProgress();

  return (
    <div className="mb-4">
      {isLoading ? (
        <div className="w-full text-center py-8 text-muted-foreground text-sm">
          불러오는 중...
        </div>
      ) : articles.length === 0 ? (
        <div className="w-full text-center py-8 text-muted-foreground text-sm">
          아직 작성한 아티클이 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {/* 메인 추천 아티클 (첫 번째) */}
          {articles.length > 0 && <MainArticleCard article={articles[0]} />}

          {/* 하위 우선순위 아티클들 (2~3번째) */}
          {articles.length > 1 && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground font-medium">다음에 읽을 글</div>
              <div className="grid grid-cols-2 gap-3">
                {articles.slice(1, 3).map(article => (
                  <SubArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}