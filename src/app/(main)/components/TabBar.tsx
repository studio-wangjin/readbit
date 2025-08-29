'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BookOpen, LayoutDashboard } from 'lucide-react';
import { useUser } from '@/src/shared/remote/auth/hooks';

export default function TabBar() {
  const pathname = usePathname();
  const { user } = useUser();

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
          
          <Link
            href="/profile"
            className={`flex flex-col items-center py-3 px-4 flex-1 transition-colors ${
              pathname === '/profile'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {user?.user_metadata?.avatar_url ? (
              <Image
                src={user.user_metadata.avatar_url}
                alt="Profile"
                width={24}
                height={24}
                className="rounded-full mb-1 object-cover"
              />
            ) : (
              <div className="w-6 h-6 bg-gray-300 rounded-full mb-1 flex items-center justify-center">
                <span className="text-xs text-gray-600">
                  {user?.email?.[0]?.toUpperCase() || '?'}
                </span>
              </div>
            )}
            <span className="text-xs font-medium">프로필</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}