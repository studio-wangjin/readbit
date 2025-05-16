import { Card, CardContent } from '@/src/shared/ui/card';
import { Button } from '@/src/shared/ui/button';

interface Article {
  id: string;
  title: string;
}

interface TodayLearningProps {
  articles: Article[];
  isLoading: boolean;
}

export function TodayLearning({ articles, isLoading }: TodayLearningProps) {
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
          articles.slice(0, 3).map(item => (
            <Card
              key={item.id}
              className="min-w-[260px] max-w-[260px] flex flex-col justify-between h-[180px]"
            >
              <CardContent className="flex flex-col h-full p-4">
                <div className="flex-1">
                  <div className="font-bold text-lg leading-tight mb-1 line-clamp-2">
                    {item.title}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">아티클 부제</div>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <span className="text-xs text-muted-foreground">0 / 12 bit</span>
                  <Button size="sm" className="bg-muted-foreground text-white">
                    Read
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
