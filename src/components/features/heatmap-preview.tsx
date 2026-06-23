import Link from 'next/link';
import { salaries } from '@/lib/data/salaries';
import { buildHeatmap } from '@/lib/heatmap';
import { formatINRCompact } from '@/lib/format';

const DATA_BLUE = '#0369A1';

function intensity(value: number, max: number): number {
  if (max === 0) return 0;
  return Math.sqrt(value / max);
}

/**
 * A real, working slice of the heatmap rendered inline on the homepage —
 * top 5 cities only — so visitors see the actual product before clicking,
 * not just a card promising one. Static (no JS) since it's just a preview.
 */
export function HeatmapPreview() {
  const { locations, levels, levelLabels, cells, maxMedian } = buildHeatmap(salaries);
  const topLocations = locations.slice(0, 5);
  const previewLevels = levels.slice(0, 6);
  const previewLabels = levelLabels.slice(0, 6);

  return (
    <Link
      href="/salaries/heatmap"
      className="group block overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:border-transparent hover:shadow-[0_20px_40px_-12px_rgba(3,105,161,0.25)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
        <div>
          <p className="text-sm font-bold text-[var(--ink)]">Salary heatmap</p>
          <p className="text-meta mt-0.5">Median total comp by city and level</p>
        </div>
        <span className="flex items-center gap-1 text-sm font-semibold text-[var(--accent)] transition-transform group-hover:translate-x-1">
          Explore
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div className="p-5">
        <div className="grid gap-1" style={{ gridTemplateColumns: `100px repeat(${previewLevels.length}, 1fr)` }}>
          <div />
          {previewLabels.map((label) => (
            <div key={label} className="px-1 pb-1.5 text-center text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
              {label}
            </div>
          ))}

          {topLocations.map((location) => (
            <div key={location} className="contents">
              <div className="flex items-center pr-2 text-xs font-semibold text-[var(--ink)]">{location}</div>
              {previewLevels.map((level) => {
                const cell = cells.find((c) => c.location === location && c.level === level);
                const hasData = Boolean(cell && cell.count > 0);
                const t = hasData && cell ? intensity(cell.medianTC, maxMedian) : 0;
                return (
                  <div
                    key={level}
                    className="m-0.5 flex aspect-[5/3] items-center justify-center rounded transition-transform duration-200 group-hover:scale-[1.03]"
                    style={{ backgroundColor: hasData ? `rgba(3, 105, 161, ${0.08 + t * 0.72})` : 'var(--app-bg)' }}
                  >
                    {hasData && cell && (
                      <span className="font-mono-data text-[9px] font-bold" style={{ color: t > 0.5 ? '#FFFFFF' : DATA_BLUE }}>
                        {formatINRCompact(cell.medianTC)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
