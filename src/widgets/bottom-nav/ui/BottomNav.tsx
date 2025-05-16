import { Button } from '@/src/shared/ui/button';
import Link from 'next/link';

interface BottomNavItem {
  label: string;
  icon: React.ReactNode;
  link: string;
}

interface BottomNavProps {
  items?: BottomNavItem[];
}

const defaultItems: BottomNavItem[] = [
  { label: '학습하기', icon: <span className="text-lg">🎓</span>, link: '/dashboard' },
  { label: '저장소', icon: <span className="text-lg">📁</span>, link: '/articles/my' },
  { label: '프로필', icon: <span className="text-lg">⚙️</span>, link: '/dashboard/reading-log' },
];

export function BottomNav({ items = defaultItems }: BottomNavProps) {
  return (
    <nav
      className="w-full fixed bottom-0 left-0 flex justify-between items-center border-t p-2 bg-background z-10"
      style={{ maxWidth: '100vw' }}
    >
      {items.map(item => (
        <Link key={item.label} href={item.link} className="flex-1">
          <Button variant="ghost" className="w-full flex flex-col items-center" size="icon">
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Button>
        </Link>
      ))}
    </nav>
  );
}
