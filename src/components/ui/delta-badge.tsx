import { cn } from '@/lib/utils';
import { formatPercent } from '@/lib/format';

interface DeltaBadgeProps {
  value: number;
  percent: number;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Per spec: positive deltas in Success Green, negative in Error Red.
 * Airbnb-style restraint — a pill, not a loud chip.
 */
export function DeltaBadge({ value, percent, size = 'md' }: DeltaBadgeProps) {
  const isPositive = value > 0;
  const isZero = value === 0;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3.5 py-1.5 gap-2',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-mono-data font-semibold tick-flash',
        sizeClasses[size],
        isZero && 'bg-[var(--hover)] text-[var(--muted)]',
        isPositive && !isZero && 'bg-[var(--success-tint)] text-[var(--success)]',
        !isPositive && !isZero && 'bg-[var(--error-tint)] text-[var(--error)]'
      )}
    >
      <svg
        width="9"
        height="9"
        viewBox="0 0 10 10"
        className={cn('shrink-0', !isPositive && !isZero && 'rotate-180')}
        aria-hidden="true"
      >
        <path d="M5 1L9 7H1L5 1Z" fill="currentColor" />
      </svg>
      {formatPercent(percent)}
    </span>
  );
}
