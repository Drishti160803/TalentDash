'use client';

import Link from 'next/link';
import { useSavedItems } from '@/lib/store/saved-items';
import { getCompanyBySlug } from '@/lib/data/companies';
import { salaries } from '@/lib/data/salaries';
import { CompanyMark } from '@/components/ui/company-mark';
import { LevelBadge } from '@/components/ui/level-badge';
import { formatCompact, formatDate } from '@/lib/format';

const DATA_BLUE = '#0369A1';

export function SavedClient() {
  const { bookmarkedCompanies, savedComparisons, toggleBookmark, removeComparison, hydrated } = useSavedItems();

  if (!hydrated) {
    return <div className="h-40" />;
  }

  const hasNothing = bookmarkedCompanies.length === 0 && savedComparisons.length === 0;

  if (hasNothing) {
    return (
      <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--border)] px-6 py-16 text-center">
        <p className="text-h3">Nothing saved yet</p>
        <p className="text-body mt-1.5 text-sm">
          Bookmark a company from its profile page, or save a comparison from the compare tool.
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <Link href="/salaries" className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white">
            Browse companies
          </Link>
          <Link href="/compare" className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--hover)]">
            Try compare
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {bookmarkedCompanies.length > 0 && (
        <section>
          <h2 className="text-h3 mb-4">Bookmarked companies</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarkedCompanies.map((slug) => {
              const company = getCompanyBySlug(slug);
              if (!company) return null;
              return (
                <div key={slug} className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4 transition-shadow duration-200 hover:shadow-md">
                  <Link href={`/companies/${slug}`} className="flex items-center gap-3">
                    <CompanyMark name={company.name} initial={company.logoInitial} />
                    <div>
                      <div className="font-semibold text-[var(--ink)]">{company.name}</div>
                      <div className="text-meta">{company.industry}</div>
                    </div>
                  </Link>
                  <button
                    onClick={() => toggleBookmark(slug)}
                    aria-label={`Remove ${company.name} bookmark`}
                    className="text-meta hover:text-[var(--error)]"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {savedComparisons.length > 0 && (
        <section>
          <h2 className="text-h3 mb-4">Saved comparisons</h2>
          <div className="space-y-3">
            {savedComparisons.map((c) => {
              const recordA = salaries.find((s) => s.id === c.recordAId);
              const recordB = salaries.find((s) => s.id === c.recordBId);
              if (!recordA || !recordB) return null;
              return (
                <div key={c.id} className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4 transition-shadow duration-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
                  <Link href={`/compare?s1=${recordA.id}&s2=${recordB.id}`} className="flex flex-1 flex-wrap items-center gap-4">
                    <RecordSummary record={recordA} />
                    <span className="text-meta">vs</span>
                    <RecordSummary record={recordB} />
                  </Link>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-1">
                    <span className="text-meta">{formatDate(c.savedAt)}</span>
                    <button onClick={() => removeComparison(c.id)} className="text-meta hover:text-[var(--error)]">
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function RecordSummary({ record }: { record: (typeof salaries)[number] }) {
  return (
    <div className="flex items-center gap-2.5">
      <CompanyMark name={record.companyName} initial={record.companyName[0]} size="sm" />
      <div>
        <div className="text-sm font-semibold text-[var(--ink)]">{record.companyName}</div>
        <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
          <LevelBadge level={record.level} />
          <span className="font-mono-data font-bold" style={{ color: DATA_BLUE }}>
            {formatCompact(record.totalComp, record.currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
