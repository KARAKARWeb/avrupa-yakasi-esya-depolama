import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({ className, hover = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border-2 border-gray-100 p-6',
        hover && 'hover:border-orange-500 transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
