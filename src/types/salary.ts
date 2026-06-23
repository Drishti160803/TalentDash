// ============================================
// src/types/salary.ts — DOMAIN TYPES
// ============================================
// Yeh poore app ke "shape" define karta hai — kya data kaisa dikhega.

export type Level =
  | 'L3'
  | 'L4'
  | 'L5'
  | 'L6'
  | 'SDE_I'
  | 'SDE_II'
  | 'SDE_III'
  | 'SENIOR'
  | 'STAFF'
  | 'PRINCIPAL'
  | 'DISTINGUISHED';

export type Currency = 'INR' | 'USD';

export type Source = 'CONTRIBUTOR' | 'VERIFIED' | 'PUBLIC_FILING';

export interface Company {
  id: string;
  slug: string;
  name: string;
  industry: string;
  foundedYear: number;
  headquarters: string;
  headcountRange: string;
  logoInitial: string; // fallback "logo" — first letter, styled
}

export interface SalaryRecord {
  id: string;
  companyId: string;
  companySlug: string;
  companyName: string;
  role: string;
  level: Level;
  location: string;
  currency: Currency;
  experienceYears: number;
  baseSalary: number; // in smallest unit display (we keep as rupees/dollars, not paise, for simplicity in mock)
  bonus: number;
  stock: number;
  totalComp: number; // always base + bonus + stock, recomputed
  source: Source;
  confidenceScore: number; // 0–1
  submittedAt: string; // ISO date
}

export interface CompanyStats {
  medianTotalComp: number;
  highestTotalComp: number;
  lowestTotalComp: number;
  count: number;
  levelDistribution: Record<string, number>;
}

export interface DeltaResult {
  baseDelta: number;
  bonusDelta: number;
  stockDelta: number;
  tcDelta: number;
  experienceDelta: number;
}

export const LEVEL_ORDER: Level[] = [
  'L3', 'SDE_I', 'L4', 'SDE_II', 'L5', 'SENIOR',
  'SDE_III', 'L6', 'STAFF', 'PRINCIPAL', 'DISTINGUISHED',
];

export const LEVEL_LABELS: Record<Level, string> = {
  L3: 'L3',
  L4: 'L4',
  L5: 'L5',
  L6: 'L6',
  SDE_I: 'SDE I',
  SDE_II: 'SDE II',
  SDE_III: 'SDE III',
  SENIOR: 'Senior',
  STAFF: 'Staff',
  PRINCIPAL: 'Principal',
  DISTINGUISHED: 'Distinguished',
};
