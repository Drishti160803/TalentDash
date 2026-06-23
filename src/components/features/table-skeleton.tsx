export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]">
      <div className="border-b border-[var(--border)] px-4 py-3">
        <div className="flex gap-6">
          {[18, 14, 10, 14, 8, 10, 10, 10].map((w, i) => (
            <div key={i} className="h-3 rounded bg-[var(--hover)]" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-6 border-b border-[var(--border)] px-4 py-4 last:border-b-0">
          <div className="flex items-center gap-2.5" style={{ width: '18%' }}>
            <div className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-[var(--hover)]" />
            <div className="h-3.5 flex-1 animate-pulse rounded bg-[var(--hover)]" />
          </div>
          <div className="h-3.5 animate-pulse rounded bg-[var(--hover)]" style={{ width: '14%' }} />
          <div className="h-5 w-14 animate-pulse rounded-md bg-[var(--hover)]" />
          <div className="h-3.5 animate-pulse rounded bg-[var(--hover)]" style={{ width: '8%' }} />
          <div className="h-3.5 animate-pulse rounded bg-[var(--hover)]" style={{ width: '6%' }} />
          <div className="ml-auto h-3.5 w-16 animate-pulse rounded bg-[var(--hover)]" />
          <div className="h-3.5 w-16 animate-pulse rounded bg-[var(--hover)]" />
          <div className="h-4 w-20 animate-pulse rounded bg-[var(--hover)]" />
        </div>
      ))}
    </div>
  );
}
