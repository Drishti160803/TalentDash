// ============================================
// src/lib/salary.ts — STATS COMPUTATION
// ============================================

import { SalaryRecord, CompanyStats, DeltaResult, LEVEL_LABELS } from '@/types/salary';

/** Total comp is NEVER trusted from input — always recomputed */
export function computeTotalComp(base: number, bonus: number, stock: number): number {
  return base + bonus + stock;
}

/** True statistical median, not average */
export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function computeCompanyStats(records: SalaryRecord[]): CompanyStats {
  const tcValues = records.map((r) => r.totalComp);
  const levelDistribution: Record<string, number> = {};

  for (const record of records) {
    const label = LEVEL_LABELS[record.level];
    levelDistribution[label] = (levelDistribution[label] ?? 0) + 1;
  }

  return {
    medianTotalComp: median(tcValues),
    highestTotalComp: tcValues.length ? Math.max(...tcValues) : 0,
    lowestTotalComp: tcValues.length ? Math.min(...tcValues) : 0,
    count: records.length,
    levelDistribution,
  };
}

export function computeDelta(a: SalaryRecord, b: SalaryRecord): DeltaResult {
  return {
    baseDelta: a.baseSalary - b.baseSalary,
    bonusDelta: a.bonus - b.bonus,
    stockDelta: a.stock - b.stock,
    tcDelta: a.totalComp - b.totalComp,
    experienceDelta: a.experienceYears - b.experienceYears,
  };
}

export function percentDelta(a: number, b: number): number {
  if (b === 0) return a === 0 ? 0 : 100;
  return ((a - b) / Math.abs(b)) * 100;
}
