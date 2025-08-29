'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, LayoutDashboard, User } from 'lucide-react';

export default function TabBar() {
  const pathname = usePathname();

  const tabs = [
    {
      name: '아티클',
      href: '/articles',
      icon: BookOpen,
    },
    {
      name: '대시보드',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: '프로필',
      href: '/profile',
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <nav className="flex justify-around">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex flex-col items-center py-3 px-4 flex-1 transition-colors ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{tab.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}