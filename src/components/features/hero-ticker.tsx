'use client';

import { useEffect, useState } from 'react';
import { formatINRCompact } from '@/lib/format';
import { cn } from '@/lib/utils';

interface TickerPair {
  companyA: string;
  levelA: string;
  tcA: number;
  companyB: string;
  levelB: string;
  tcB: number;
}

const PAIRS: TickerPair[] = [
  { companyA: 'Google', levelA: 'L5 · Bengaluru', tcA: 12300000, companyB: 'Flipkart', levelB: 'Staff · Bengaluru', tcB: 6500000 },
  { companyA: 'Amazon', levelA: 'SDE III · Chennai', tcA: 12800000, companyB: 'Swiggy', levelB: 'SDE III · Bengaluru', tcB: 5280000 },
  { companyA: 'Meta', levelA: 'L4 · Bengaluru', tcA: 8400000, companyB: 'Razorpay', levelB: 'SDE II · Bengaluru', tcB: 4920000 },
  { companyA: 'Microsoft', levelA: 'Principal · Hyderabad', tcA: 13200000, companyB: 'TCS', levelB: 'Senior Analyst · Chennai', tcB: 1950000 },
];

/**
 * A live, comparable pair — the product's core idea (real numbers,
 * side by side) made visible before anything is read. Restrained,
 * card-based, no motion gimmicks beyond a soft crossfade.
 */
export function HeroTicker() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % PAIRS.length);
        setFading(false);
      }, 220);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const pair = PAIRS[index];
  const diffPercent = (((pair.tcA - pair.tcB) / pair.tcB) * 100).toFixed(0);

  return (
    <div className="w-full max-w-sm rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <p className="text-meta mb-4 uppercase tracking-wide">Real comparison</p>

      <div className={cn('space-y-4 transition-opacity duration-200', fading ? 'opacity-0' : 'opacity-100')}>
        <Row name={pair.companyA} sub={pair.levelA} value={pair.tcA} highlight />
        <div className="border-t border-[var(--border)]" />
        <Row name={pair.companyB} sub={pair.levelB} value={pair.tcB} />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
        <span className="text-label">Total comp gap</span>
        <span className="font-mono-data text-sm font-bold text-[var(--success)]">
          +{diffPercent}%
        </span>
      </div>
    </div>
  );
}

function Row({ name, sub, value, highlight }: { name: string; sub: string; value: number; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-[15px] font-semibold text-[var(--ink)]">{name}</div>
        <div className="text-meta">{sub}</div>
      </div>
      <div className={cn('font-mono-data text-lg font-bold', highlight ? 'text-[var(--accent)]' : 'text-[var(--ink)]')}>
        {formatINRCompact(value)}
      </div>
    </div>
  );
}
