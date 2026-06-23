interface LevelDistributionProps {
  distribution: Record<string, number>;
  total: number;
}

export function LevelDistribution({ distribution, total }: LevelDistributionProps) {
  const entries = Object.entries(distribution).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    return <p className="text-body text-sm">No level data yet.</p>;
  }

  return (
    <div className="space-y-2.5">
      {entries.map(([label, count]) => {
        const pct = total > 0 ? (count / total) * 100 : 0;
        return (
          <div key={label} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-xs font-medium text-[var(--body-text)]">{label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--hover)]">
              <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${pct}%` }} />
            </div>
            <span className="w-8 shrink-0 text-right font-mono-data text-xs text-[var(--muted)]">{count}</span>
          </div>
        );
      })}
    </div>
  );
}
