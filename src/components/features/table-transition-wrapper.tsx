'use client';

import { useFilterPending } from '@/lib/store/filter-pending';
import { TableSkeleton } from '@/components/features/table-skeleton';
import { cn } from '@/lib/utils';

export function TableTransitionWrapper({ children, rowCount }: { children: React.ReactNode; rowCount: number }) {
  const { isPending } = useFilterPending();

  return (
    <div className="relative">
      <div className={cn('transition-opacity duration-150', isPending ? 'opacity-0' : 'opacity-100')}>
        {children}
      </div>
      {isPending && (
        <div className="absolute inset-0">
          <TableSkeleton rows={Math.min(rowCount, 10) || 6} />
        </div>
      )}
    </div>
  );
}
