import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { salaries } from '@/lib/data/salaries';
import { median } from '@/lib/salary';
import { SalaryFilters } from '@/components/features/salary-filters';
import { SalaryTable } from '@/components/features/salary-table';
import { Pagination } from '@/components/features/pagination';
import { KPICards } from '@/components/features/kpi-cards';
import { FilterPendingProvider } from '@/lib/store/filter-pending';
import { TableTransitionWrapper } from '@/components/features/table-transition-wrapper';

export const metadata: Metadata = {
  title: 'Salary Dashboard',
  description: 'Filter real Indian tech salary data by company, level, location, and currency.',
};

const PAGE_SIZE = 25; // per spec F2

interface PageProps {
  searchParams: Promise<{
    company?: string;
    level?: string;
    location?: string;
    currency?: string;
    page?: string;
  }>;
}

export default async function SalariesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1);

  let filtered = salaries;

  if (params.company) {
    const q = params.company.toLowerCase();
    filtered = filtered.filter((s) => s.companyName.toLowerCase().includes(q));
  }
  if (params.level) {
    filtered = filtered.filter((s) => s.level === params.level);
  }
  if (params.location) {
    filtered = filtered.filter((s) => s.location === params.location);
  }
  if (params.currency) {
    filtered = filtered.filter((s) => s.currency === params.currency);
  }

  // Sort by Total Comp descending by default — per spec F2
  filtered = [...filtered].sort((a, b) => b.totalComp - a.totalComp);

  const tcValues = filtered.map((s) => s.totalComp);
  const stats = {
    count: filtered.length,
    medianTC: median(tcValues),
    highestTC: tcValues.length ? Math.max(...tcValues) : 0,
    lowestTC: tcValues.length ? Math.min(...tcValues) : 0,
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRecords = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <FilterPendingProvider>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-h1 sm:text-[32px]">Salary Dashboard</h1>
            <p className="text-body mt-1.5">
              {salaries.length} records across companies, levels, and cities. Filters update the URL — copy the link to share this exact view.
            </p>
          </div>
          <Link
            href="/salaries/heatmap"
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--hover)]"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1" fill="#0369A1" opacity="0.3" />
              <rect x="9" y="1" width="6" height="6" rx="1" fill="#0369A1" opacity="0.6" />
              <rect x="1" y="9" width="6" height="6" rx="1" fill="#0369A1" opacity="0.5" />
              <rect x="9" y="9" width="6" height="6" rx="1" fill="#0369A1" opacity="0.9" />
            </svg>
            View heatmap
          </Link>
        </div>

        <Suspense fallback={<div className="h-16" />}>
          <div className="mb-5">
            <SalaryFilters />
          </div>
        </Suspense>

        <div className="mb-5">
          <KPICards {...stats} total={salaries.length} />
        </div>

        <TableTransitionWrapper rowCount={pageRecords.length}>
          <SalaryTable records={pageRecords} />
        </TableTransitionWrapper>

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          totalRecords={filtered.length}
          pageSize={PAGE_SIZE}
          searchParams={params}
        />
      </FilterPendingProvider>
    </main>
  );
}
