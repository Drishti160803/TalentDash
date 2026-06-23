'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { companies } from '@/lib/data/companies';
import { LEVEL_ORDER, LEVEL_LABELS } from '@/types/salary';
import { useFilterPending } from '@/lib/store/filter-pending';

const LOCATIONS = [
  'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Mumbai', 'Noida', 'Gurugram',
  'Delhi', 'Mountain View', 'Seattle', 'Redmond', 'Menlo Park', 'London', 'San Francisco',
];

export function SalaryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { setIsPending } = useFilterPending();

  useEffect(() => {
    setIsPending(isPending);
  }, [isPending, setIsPending]);

  const [company, setCompany] = useState(searchParams.get('company') ?? '');
  const [level, setLevel] = useState(searchParams.get('level') ?? '');
  const [location, setLocation] = useState(searchParams.get('location') ?? '');
  const [currency, setCurrency] = useState(searchParams.get('currency') ?? '');

  useEffect(() => {
    const handle = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (company) params.set('company', company); else params.delete('company');
      params.delete('page');
      startTransition(() => {
        router.push(`/salaries?${params.toString()}`, { scroll: false });
      });
    }, 300);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value); else params.delete(key);
      params.delete('page');
      startTransition(() => {
        router.push(`/salaries?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Search input — Airbnb-style affordance: icon, rounded-full, clear focus ring */}
        <div className="relative flex-1 min-w-[200px] sm:flex-none sm:w-64">
          <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="5" />
            <path d="M11 11L14.5 14.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Search company…"
            list="company-suggestions"
            className="w-full rounded-full border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-9 pr-3 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--ink)] focus:outline-none"
          />
          <datalist id="company-suggestions">
            {companies.map((c) => (
              <option key={c.id} value={c.name} />
            ))}
          </datalist>
        </div>

        <select
          value={level}
          onChange={(e) => { setLevel(e.target.value); updateParam('level', e.target.value); }}
          className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none"
        >
          <option value="">All levels</option>
          {LEVEL_ORDER.map((lvl) => (
            <option key={lvl} value={lvl}>{LEVEL_LABELS[lvl]}</option>
          ))}
        </select>

        <select
          value={location}
          onChange={(e) => { setLocation(e.target.value); updateParam('location', e.target.value); }}
          className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none"
        >
          <option value="">All locations</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <div className="flex rounded-full border border-[var(--border)] bg-[var(--app-bg)] p-0.5">
          {['', 'INR', 'USD'].map((cur) => (
            <button
              key={cur || 'all'}
              onClick={() => { setCurrency(cur); updateParam('currency', cur); }}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                currency === cur
                  ? 'bg-[var(--ink)] text-white'
                  : 'text-[var(--body-text)] hover:text-[var(--ink)]'
              }`}
            >
              {cur || 'All'}
            </button>
          ))}
        </div>

        {(company || level || location || currency) && (
          <button
            onClick={() => {
              setCompany(''); setLevel(''); setLocation(''); setCurrency('');
              startTransition(() => router.push('/salaries', { scroll: false }));
            }}
            className="text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            Clear all
          </button>
        )}

        {isPending && (
          <span className="text-meta" aria-live="polite">updating…</span>
        )}
      </div>
    </div>
  );
}
