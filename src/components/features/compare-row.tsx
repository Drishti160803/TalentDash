import { DeltaBadge } from '@/components/ui/delta-badge';
import { formatCompact } from '@/lib/format';
import { percentDelta } from '@/lib/salary';
import { Currency } from '@/types/salary';

interface CompareRowProps {
  label: string;
  valueA: number;
  valueB: number;
  currency: Currency;
  isPrimary?: boolean;
}

export function CompareRow({ label, valueA, valueB, currency, isPrimary }: CompareRowProps) {
  const delta = valueA - valueB;
  const pct = percentDelta(valueA, valueB);

  return (
    <div className={`grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3 px-4 py-3.5 ${isPrimary ? 'bg-[var(--app-bg)]' : ''}`}>
      <span className={`font-mono-data text-right ${isPrimary ? 'text-lg font-bold text-[var(--ink)]' : 'text-sm text-[var(--body-text)]'}`}>
        {valueA === 0 ? '—' : formatCompact(valueA, currency)}
      </span>
      <span className="text-label w-28 text-center uppercase tracking-wide">{label}</span>
      <span className={`font-mono-data ${isPrimary ? 'text-lg font-bold text-[var(--ink)]' : 'text-sm text-[var(--body-text)]'}`}>
        {valueB === 0 ? '—' : formatCompact(valueB, currency)}
      </span>
      <DeltaBadge value={delta} percent={pct} size={isPrimary ? 'md' : 'sm'} />
    </div>
  );
}
