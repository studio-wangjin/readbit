import { Button } from '@/src/shared/ui/button';
import { Card, CardContent } from '@/src/shared/ui/card';
import Link from 'next/link';
import { renderProgressBar } from '../lib/progressBar';

interface MainArticleCardProps {
  article: {
    id: string;
    slug: string;
    title: string;
    currentSection: number;
    sectionCount: number;
  };
}

export function MainArticleCard({ article }: MainArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.slug}/sections?index=${article.currentSection}`}
      className="block hover:shadow-lg transition-shadow cursor-pointer rounded-lg"
      style={{ textDecoration: 'none' }}
    >
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-xs text-primary font-medium mb-1">📚 Today&apos;s Pick</div>
              <div className="font-bold text-xl leading-tight mb-2 line-clamp-2">
                {article.title}
              </div>
              <div className="text-sm text-muted-foreground">아티클 부제</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="text-lg">
                  {renderProgressBar(article.currentSection ?? 0, article.sectionCount ?? 0)}
                </div>
                <span className="text-xs text-muted-foreground">
                  {article.currentSection ?? 0} / {article.sectionCount ?? 0} Bits
                </span>
              </div>
              <Button className="bg-primary text-white px-6">
                지금 읽기 →
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}