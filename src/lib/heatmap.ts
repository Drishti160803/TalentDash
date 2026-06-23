import { SalaryRecord, LEVEL_ORDER, LEVEL_LABELS } from '@/types/salary';
import { median } from '@/lib/salary';

export interface HeatmapCell {
  location: string;
  level: string;
  medianTC: number;
  count: number;
}

/**
 * Builds a location × level grid of median total comp, INR records only
 * (mixing currencies in one grid would be misleading without a clear
 * per-cell conversion label, so this view stays single-currency by design).
 */
export function buildHeatmap(records: SalaryRecord[]) {
  const inrRecords = records.filter((r) => r.currency === 'INR');

  const locations = Array.from(new Set(inrRecords.map((r) => r.location))).sort(
    (a, b) => {
      const countA = inrRecords.filter((r) => r.location === a).length;
      const countB = inrRecords.filter((r) => r.location === b).length;
      return countB - countA;
    }
  );

  const levels = LEVEL_ORDER.filter((lvl) => inrRecords.some((r) => r.level === lvl));

  const cells: HeatmapCell[] = [];
  let maxMedian = 0;

  for (const location of locations) {
    for (const level of levels) {
      const matching = inrRecords.filter((r) => r.location === location && r.level === level);
      const medianTC = matching.length ? median(matching.map((r) => r.totalComp)) : 0;
      if (medianTC > maxMedian) maxMedian = medianTC;
      cells.push({ location, level, medianTC, count: matching.length });
    }
  }

  return {
    locations,
    levels,
    levelLabels: levels.map((l) => LEVEL_LABELS[l]),
    cells,
    maxMedian,
  };
}

export function cellAt(cells: HeatmapCell[], location: string, level: string): HeatmapCell | undefined {
  return cells.find((c) => c.location === location && c.level === level);
}
