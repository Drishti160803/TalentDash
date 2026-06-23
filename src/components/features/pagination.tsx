import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
  searchParams: Record<string, string | undefined>;
}

export function Pagination({ currentPage, totalPages, totalRecords, pageSize, searchParams }: PaginationProps) {
  if (totalPages <= 1) return null;

  function pageHref(page: number) {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v && k !== 'page') params.set(k, v);
    });
    if (page > 1) params.set('page', String(page));
    const qs = params.toString();
    return `/salaries${qs ? `?${qs}` : ''}`;
  }

  const rangeStart = (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalRecords);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <nav className="flex flex-col items-center justify-between gap-3 border-t border-[var(--border)] px-1 py-4 sm:flex-row" aria-label="Pagination">
      <p className="text-meta">
        Showing {rangeStart}–{rangeEnd} of {totalRecords} records
      </p>
      <div className="flex items-center gap-1">
        <PageLink href={pageHref(Math.max(1, currentPage - 1))} disabled={currentPage === 1} label="Previous" />
        {pages.map((p, i) => (
          <span key={p} className="flex items-center">
            {i > 0 && pages[i - 1] !== p - 1 && <span className="px-1.5 text-[var(--muted)]">···</span>}
            <Link
              href={pageHref(p)}
              className={cn(
                'flex h-8 min-w-[32px] items-center justify-center rounded-full px-2 text-center text-sm font-semibold',
                p === currentPage
                  ? 'bg-[var(--ink)] text-white'
                  : 'text-[var(--body-text)] hover:bg-[var(--hover)]'
              )}
            >
              {p}
            </Link>
          </span>
        ))}
        <PageLink href={pageHref(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} label="Next" />
      </div>
    </nav>
  );
}

function PageLink({ href, disabled, label }: { href: string; disabled: boolean; label: string }) {
  if (disabled) {
    return <span className="cursor-not-allowed rounded-full px-3 py-1.5 text-sm text-[var(--muted)]/50">{label}</span>;
  }
  return (
    <Link href={href} className="rounded-full px-3 py-1.5 text-sm font-semibold text-[var(--body-text)] hover:bg-[var(--hover)]">
      {label}
    </Link>
  );
}
