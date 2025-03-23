import { cn } from '@/src/shared/lib/style-helpers';

interface DividerProps {
  children?: React.ReactNode;
  className?: string;
  contentPosition?: 'center' | 'left' | 'right';
}

export function Divider({ children, className, contentPosition = 'center' }: DividerProps) {
  const contentPositionClasses = {
    center: 'justify-center',
    left: 'justify-start',
    right: 'justify-end',
  };

  return (
    <div className={cn('relative my-4', className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      {children && (
        <div className={`relative flex ${contentPositionClasses[contentPosition]} text-sm`}>
          <span className="px-2 bg-white text-gray-500">{children}</span>
        </div>
      )}
    </div>
  );
}
