'use client';

import { SalaryRecord } from '@/types/salary';
import { LEVEL_LABELS } from '@/types/salary';
import { formatCompact } from '@/lib/format';

interface RecordSelectorProps {
  label: string;
  records: SalaryRecord[];
  selectedId: string;
  onSelect: (id: string) => void;
  excludeId?: string;
}

export function RecordSelector({ label, records, selectedId, onSelect, excludeId }: RecordSelectorProps) {
  // Top 100 records cap — documented scalability limit, would become
  // an async autocomplete endpoint at real scale.
  const options = records.filter((r) => r.id !== excludeId).slice(0, 100);

  return (
    <div>
      <label className="text-label mb-1.5 block uppercase tracking-wide">{label}</label>
      <select
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-sm font-medium text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none"
      >
        <option value="">Select a record…</option>
        {options.map((r) => (
          <option key={r.id} value={r.id}>
            {r.companyName} · {LEVEL_LABELS[r.level]} · {r.location} · {formatCompact(r.totalComp, r.currency)}
          </option>
        ))}
      </select>
    </div>
  );
}
