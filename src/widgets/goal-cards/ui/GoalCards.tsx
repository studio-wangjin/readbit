import { Card, CardHeader, CardTitle, CardDescription } from '@/src/shared/ui/card';

interface GoalCardData {
  title: string;
  description: string;
}

interface GoalCardsProps {
  cards?: GoalCardData[];
}

const defaultCards: GoalCardData[] = [
  {
    title: '오늘도 1조각 읽어볼까요?',
    description: '"토스, 테크니컬 라이팅 가이드 공개"',
  },
  {
    title: '읽고 있던 글, 계속 읽어봐요!',
    description: '"토스, 테크니컬 라이팅 가이드 공개"',
  },
];

export function GoalCards({ cards = defaultCards }: GoalCardsProps) {
  return (
    <div className="flex gap-2">
      {cards.map((card, i) => (
        <Card className="flex-1" key={i}>
          <CardHeader>
            <CardTitle className="text-base">{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
