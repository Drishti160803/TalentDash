'use client';

import { useState } from 'react';
import { HeatmapCell } from '@/lib/heatmap';
import { formatINRCompact } from '@/lib/format';
import { cn } from '@/lib/utils';

const DATA_BLUE = '#0369A1';

interface HeatmapGridProps {
  locations: string[];
  levels: string[];
  levelLabels: string[];
  cells: HeatmapCell[];
  maxMedian: number;
}

function intensity(value: number, max: number): number {
  if (max === 0) return 0;
  return Math.sqrt(value / max);
}

export function HeatmapGrid({ locations, levels, levelLabels, cells, maxMedian }: HeatmapGridProps) {
  const [hovered, setHovered] = useState<{ location: string; level: string } | null>(null);

  function getCell(location: string, level: string) {
    return cells.find((c) => c.location === location && c.level === level);
  }

  return (
    <div className="overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-1">
      <div className="min-w-[760px]">
        <div className="grid gap-1 px-1 pb-1" style={{ gridTemplateColumns: `160px repeat(${levels.length}, 1fr)` }}>
          <div />
          {levelLabels.map((label) => (
            <div key={label} className="px-1 text-center text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              {label}
            </div>
          ))}
        </div>

        {locations.map((location) => (
          <div key={location} className="grid gap-1 px-1 pb-1" style={{ gridTemplateColumns: `160px repeat(${levels.length}, 1fr)` }}>
            <div className="flex items-center text-sm font-semibold text-[var(--ink)]">{location}</div>
            {levels.map((level) => {
              const cell = getCell(location, level);
              const hasData = Boolean(cell && cell.count > 0);
              const t = hasData && cell ? intensity(cell.medianTC, maxMedian) : 0;
              const isHovered = hovered?.location === location && hovered?.level === level;

              return (
                <div
                  key={level}
                  onMouseEnter={() => hasData && setHovered({ location, level })}
                  onMouseLeave={() => setHovered(null)}
                  className={cn(
                    'relative flex aspect-[5/3] cursor-default items-center justify-center rounded-md transition-transform',
                    hasData && 'hover:z-10 hover:scale-[1.08] hover:shadow-md'
                  )}
                  style={{ backgroundColor: hasData ? `rgba(3, 105, 161, ${0.08 + t * 0.72})` : 'var(--app-bg)' }}
                >
                  {hasData && cell && (
                    <span className="font-mono-data text-[11px] font-bold" style={{ color: t > 0.5 ? '#FFFFFF' : DATA_BLUE }}>
                      {formatINRCompact(cell.medianTC)}
                    </span>
                  )}

                  {isHovered && hasData && cell && (
                    <div className="absolute -top-2 left-1/2 z-20 -translate-x-1/2 -translate-y-full rounded-md bg-[var(--ink)] px-3 py-2 text-xs text-white shadow-lg">
                      <div className="font-semibold">{location} · {levelLabels[levels.indexOf(level)]}</div>
                      <div className="mt-0.5 text-gray-300">
                        Median {formatINRCompact(cell.medianTC)} · {cell.count} record{cell.count !== 1 ? 's' : ''}
                      </div>
                      <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[var(--ink)]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
