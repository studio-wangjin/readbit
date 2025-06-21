import { Button } from '@/src/shared/ui/button';
import { Card, CardContent } from '@/src/shared/ui/card';
import Link from 'next/link';
import { renderProgressBar } from '../lib/progressBar';

interface SubArticleCardProps {
  article: {
    id: string;
    slug: string;
    title: string;
    currentSection: number;
    sectionCount: number;
  };
}

export function SubArticleCard({ article }: SubArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.slug}/sections?index=${article.currentSection}`}
      className="block hover:shadow-md transition-shadow cursor-pointer rounded-lg"
      style={{ textDecoration: 'none' }}
    >
      <Card className="border border-border/50">
        <CardContent className="p-3">
          <div className="space-y-2">
            <div className="font-semibold text-sm leading-tight line-clamp-2">
              {article.title}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="text-xs">
                  {renderProgressBar(article.currentSection ?? 0, article.sectionCount ?? 0)}
                </div>
                <span className="text-xs text-muted-foreground">
                  {article.currentSection ?? 0}/{article.sectionCount ?? 0}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                tabIndex={-1}
                type="button"
                className="text-xs px-2"
              >
                Read
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}