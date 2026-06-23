import Link from 'next/link';
import { SalaryRecord } from '@/types/salary';
import { LevelBadge } from '@/components/ui/level-badge';
import { CompanyMark } from '@/components/ui/company-mark';
import { formatCompact, formatFull } from '@/lib/format';
import { companies } from '@/lib/data/companies';

// Spec F2: Total Comp is the dominant number on each row — data blue.
const DATA_BLUE = '#0369A1';

export function SalaryTable({ records }: { records: SalaryRecord[] }) {
  if (records.length === 0) {
    return (
      <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
        <p className="text-h3">No records found for these filters</p>
        <p className="text-body mt-1.5">Try removing a filter.</p>
        <Link href="/salaries" className="mt-4 inline-block text-sm font-semibold text-[var(--accent)] hover:underline">
          Clear all filters
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]">
      <table className="w-full min-w-[860px] border-collapse text-sm">
        <thead className="sticky top-0 z-10 bg-[var(--surface)]">
          <tr className="border-b border-[var(--border)] text-left">
            <Th>Company</Th>
            <Th>Role</Th>
            <Th>Level</Th>
            <Th>Location</Th>
            <Th>Experience</Th>
            <Th align="right">Base Salary</Th>
            <Th align="right">Bonus</Th>
            <Th align="right">Stock</Th>
            <Th align="right">Total Comp</Th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => {
            const company = companies.find((c) => c.slug === r.companySlug);
            return (
              <tr
                key={r.id}
                className="group border-b border-l-2 border-l-transparent border-[var(--border)] transition-all duration-150 last:border-b-0 hover:border-l-[var(--accent)] hover:bg-[var(--hover)]"
              >
                <td className="max-w-[220px] truncate px-4 py-3.5">
                  <Link
                    href={`/companies/${r.companySlug}`}
                    className="flex items-center gap-2.5 hover:opacity-80"
                  >
                    <CompanyMark name={r.companyName} initial={company?.logoInitial ?? r.companyName[0]} size="sm" />
                    <span className="truncate font-semibold text-[var(--ink)]">{r.companyName}</span>
                  </Link>
                </td>
                <td className="max-w-[180px] truncate px-4 py-3.5 text-[var(--body-text)]">{r.role}</td>
                <td className="px-4 py-3.5"><LevelBadge level={r.level} /></td>
                <td className="px-4 py-3.5 text-[var(--body-text)]">{r.location}</td>
                <td className="px-4 py-3.5 font-mono-data text-[var(--body-text)]">{r.experienceYears}y</td>
                <td className="px-4 py-3.5 text-right font-mono-data text-[var(--body-text)]" title={formatFull(r.baseSalary, r.currency)}>
                  {formatCompact(r.baseSalary, r.currency)}
                </td>
                <td className="px-4 py-3.5 text-right font-mono-data text-[var(--body-text)]" title={formatFull(r.bonus, r.currency)}>
                  {r.bonus === 0 ? '—' : formatCompact(r.bonus, r.currency)}
                </td>
                <td className="px-4 py-3.5 text-right font-mono-data text-[var(--body-text)]" title={formatFull(r.stock, r.currency)}>
                  {r.stock === 0 ? '—' : formatCompact(r.stock, r.currency)}
                </td>
                <td
                  className="px-4 py-3.5 text-right font-mono-data text-base font-bold"
                  style={{ color: DATA_BLUE }}
                  title={formatFull(r.totalComp, r.currency)}
                >
                  {formatCompact(r.totalComp, r.currency)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, align }: { children: React.ReactNode; align?: 'right' }) {
  return (
    <th className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted)] ${align === 'right' ? 'text-right' : ''}`}>
      {children}
    </th>
  );
}
