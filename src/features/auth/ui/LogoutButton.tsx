'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/shared/ui/button';
import { supabase } from '@/src/shared/lib/supabase/browser';

interface LogoutButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function LogoutButton({
  children,
  className,
  variant = 'default',
  size = 'default',
}: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await supabase.auth.signOut();

      router.refresh();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      loading={isLoading}
      className={className}
      variant={variant}
      size={size}
    >
      {children || 'Logout'}
    </Button>
  );
}
