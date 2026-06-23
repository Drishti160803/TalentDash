'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { salaries } from '@/lib/data/salaries';
import { computeDelta, percentDelta } from '@/lib/salary';
import { RecordSelector } from '@/components/features/record-selector';
import { CompareRow } from '@/components/features/compare-row';
import { CompanyMark } from '@/components/ui/company-mark';
import { LevelBadge } from '@/components/ui/level-badge';
import { SaveComparisonButton } from '@/components/features/save-comparison-button';
import { companies } from '@/lib/data/companies';
import { toINR, formatINRCompact } from '@/lib/format';

const DATA_BLUE = '#0369A1';

export function CompareClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // c1={slug} pre-fill from a company page — pick that company's top record
  const c1Slug = searchParams.get('c1');
  const preselectFromCompany = c1Slug
    ? salaries.find((s) => s.companySlug === c1Slug)?.id ?? ''
    : '';

  const [idA, setIdA] = useState(searchParams.get('s1') ?? preselectFromCompany);
  const [idB, setIdB] = useState(searchParams.get('s2') ?? '');

  // Keep URL in sync with selection — per spec F4: /compare?s1={id}&s2={id}
  useEffect(() => {
    const params = new URLSearchParams();
    if (idA) params.set('s1', idA);
    if (idB) params.set('s2', idB);
    const qs = params.toString();
    router.replace(qs ? `/compare?${qs}` : '/compare', { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idA, idB]);

  const recordA = salaries.find((s) => s.id === idA);
  const recordB = salaries.find((s) => s.id === idB);
  const sameIdError = Boolean(idA && idB && idA === idB);

  const result = useMemo(() => {
    if (!recordA || !recordB || sameIdError) return null;
    const delta = computeDelta(recordA, recordB);
    const tcAInINR = toINR(recordA.totalComp, recordA.currency);
    const tcBInINR = toINR(recordB.totalComp, recordB.currency);
    const overallPct = percentDelta(tcAInINR, tcBInINR);
    return { delta, overallPct, tcAInINR, tcBInINR };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordA?.id, recordB?.id, sameIdError]);

  const winner = result
    ? result.tcAInINR === result.tcBInINR ? null : result.tcAInINR > result.tcBInINR ? 'A' : 'B'
    : null;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <RecordSelector label="Record A" records={salaries} selectedId={idA} onSelect={setIdA} excludeId={idB} />
        <RecordSelector label="Record B" records={salaries} selectedId={idB} onSelect={setIdB} excludeId={idA} />
      </div>

      {sameIdError && (
        <p className="mt-4 rounded-[var(--radius-md)] border border-[var(--error)]/30 bg-[var(--error-tint)] px-4 py-3 text-sm font-medium text-[var(--error)]">
          Pick two different records to compare.
        </p>
      )}

      {recordA && recordB && !sameIdError && result && (
        <div className="mt-8">
          <div className="mb-5 grid grid-cols-2 gap-4">
            <CompanyHeader record={recordA} winner={winner === 'A'} />
            <CompanyHeader record={recordB} align="right" winner={winner === 'B'} />
          </div>

          {recordA.currency !== recordB.currency && (
            <p className="mb-4 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--app-bg)] px-4 py-2.5 text-xs text-[var(--body-text)]">
              These records use different currencies. The headline delta converts both to INR at a fixed reference rate (1 USD ≈ ₹86.5) — for an exact comparison, prefer same-currency records.
            </p>
          )}

          <div className="mb-6 flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
            <div>
              <p className="text-label uppercase tracking-wide">Total compensation gap</p>
              <p className="text-salary-figure mt-1 text-2xl" style={{ color: DATA_BLUE }}>
                {formatINRCompact(Math.abs(result.tcAInINR - result.tcBInINR))}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              {winner && (
                <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: DATA_BLUE }}>
                  {winner === 'A' ? recordA.companyName : recordB.companyName} — Higher TC
                </span>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]">
            <CompareRow label="Base" valueA={recordA.baseSalary} valueB={recordB.baseSalary} currency={recordA.currency} />
            <div className="border-t border-[var(--border)]" />
            <CompareRow label="Bonus" valueA={recordA.bonus} valueB={recordB.bonus} currency={recordA.currency} />
            <div className="border-t border-[var(--border)]" />
            <CompareRow label="Stock" valueA={recordA.stock} valueB={recordB.stock} currency={recordA.currency} />
            <div className="border-t border-[var(--border)]" />
            <CompareRow label="Total comp" valueA={recordA.totalComp} valueB={recordB.totalComp} currency={recordA.currency} isPrimary />
            {recordA.currency === recordB.currency && (
              <>
                <div className="border-t border-[var(--border)]" />
                <div className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3 px-4 py-3.5">
                  <span className="text-right font-mono-data text-sm text-[var(--body-text)]">{recordA.experienceYears}y</span>
                  <span className="text-label w-28 text-center uppercase tracking-wide">Experience</span>
                  <span className="font-mono-data text-sm text-[var(--body-text)]">{recordB.experienceYears}y</span>
                  <span className="text-meta">
                    {result.delta.experienceDelta === 0 ? '—' : `${result.delta.experienceDelta > 0 ? '+' : ''}${result.delta.experienceDelta}y`}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="mt-5 flex justify-end">
            <SaveComparisonButton recordAId={recordA.id} recordBId={recordB.id} />
          </div>
        </div>
      )}

      {(!recordA || !recordB) && !sameIdError && (
        <div className="mt-10 rounded-[var(--radius-md)] border border-dashed border-[var(--border)] px-6 py-14 text-center">
          <p className="text-h3">Select two records to compare</p>
          <p className="text-body mt-1.5 text-sm">
            Pick anything from the dropdowns above — same company, different level, or two different companies entirely.
          </p>
        </div>
      )}
    </div>
  );
}

function CompanyHeader({ record, align, winner }: { record: (typeof salaries)[number]; align?: 'right'; winner?: boolean }) {
  const company = companies.find((c) => c.slug === record.companySlug);
  return (
    <div className={`flex items-center gap-3 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}>
      <CompanyMark name={record.companyName} initial={company?.logoInitial ?? record.companyName[0]} />
      <div>
        <Link href={`/companies/${record.companySlug}`} className="font-bold text-[var(--ink)] hover:text-[var(--accent)]">
          {record.companyName}
        </Link>
        <div className={`mt-0.5 flex items-center gap-2 text-xs text-[var(--muted)] ${align === 'right' ? 'justify-end' : ''}`}>
          <LevelBadge level={record.level} />
          <span>{record.location}</span>
          {winner && <span className="font-semibold" style={{ color: DATA_BLUE }}>· Higher TC</span>}
        </div>
      </div>
    </div>
  );
}
