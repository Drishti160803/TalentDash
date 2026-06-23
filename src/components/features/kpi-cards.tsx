import { CountUp } from '@/components/ui/count-up';

interface KPICardsProps {
  count: number;
  medianTC: number;
  highestTC: number;
  lowestTC: number;
  total: number;
}

export function KPICards({ count, medianTC, highestTC, lowestTC, total }: KPICardsProps) {
  return (
    <div>
      <p className="text-meta mb-3">
        Showing <CountUp value={count} formatKind="plain" durationMs={400} /> of {total} records
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Card label="Median total comp" value={medianTC} accent />
        <Card label="Highest" value={highestTC} />
        <Card label="Lowest" value={lowestTC} />
      </div>
    </div>
  );
}

function Card({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="text-label">{label}</div>
      <div className={`text-salary-figure mt-1 text-xl ${accent ? 'text-[var(--accent)]' : ''}`}>
        <CountUp value={value} formatKind="inr-compact" durationMs={500} />
      </div>
    </div>
  );
}
