import type { Metadata } from 'next';
import Link from 'next/link';
import { salaries } from '@/lib/data/salaries';
import { buildHeatmap } from '@/lib/heatmap';
import { HeatmapGrid } from '@/components/features/heatmap-grid';

export const metadata: Metadata = {
  title: 'Salary Heatmap',
  description: 'Median total compensation across Indian tech, mapped by city and level — see where the money actually is.',
  alternates: { canonical: '/salaries/heatmap' },
};

export default function HeatmapPage() {
  const { locations, levels, levelLabels, cells, maxMedian } = buildHeatmap(salaries);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="text-meta mb-2">
        <Link href="/salaries" className="hover:text-[var(--ink)]">Dashboard</Link>
        <span className="mx-1.5">/</span>
        <span>Heatmap</span>
      </div>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-h1 sm:text-[32px]">Where the money actually is</h1>
          <p className="text-body mt-1.5 max-w-2xl">
            Median total compensation by city and level, INR records only.
            Darker means higher pay. Hover a cell for the exact number and
            how many records back it.
          </p>
        </div>
      </div>

      <HeatmapGrid
        locations={locations}
        levels={levels}
        levelLabels={levelLabels}
        cells={cells}
        maxMedian={maxMedian}
      />

      <div className="mt-5 flex items-center gap-3">
        <span className="text-meta">Lower median</span>
        <div className="flex h-3 flex-1 max-w-[200px] overflow-hidden rounded-full">
          {[0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1].map((t) => (
            <div key={t} className="flex-1" style={{ backgroundColor: `rgba(3, 105, 161, ${0.08 + t * 0.72})` }} />
          ))}
        </div>
        <span className="text-meta">Higher median</span>
      </div>

      <p className="text-meta mt-8 max-w-2xl">
        Built from {salaries.filter((s) => s.currency === 'INR').length} INR
        records across {locations.length} cities. Empty cells mean no
        submissions yet for that combination — a gap worth filling, not a
        zero.
      </p>
    </main>
  );
}
