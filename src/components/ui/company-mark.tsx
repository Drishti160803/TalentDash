import { cn } from '@/lib/utils';

/**
 * Per Airbnb discipline: every element earns its place, nothing decorative.
 * A plain initial mark in the deep-text color, not a rainbow of brand hues.
 */
interface CompanyMarkProps {
  name: string;
  initial: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CompanyMark({ initial, size = 'md' }: CompanyMarkProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-14 w-14 text-xl',
  };

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full font-bold',
        sizeClasses[size]
      )}
      style={{
        backgroundColor: 'var(--app-bg)',
        color: 'var(--ink)',
        border: '1px solid var(--border)',
      }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}
