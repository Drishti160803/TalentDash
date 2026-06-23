// ============================================
// src/lib/format.ts — NUMBER FORMATTING
// ============================================
// Indian numbering (lakh/crore) ke liye Intl.NumberFormat kaam nahi karta
// jaisa hum chahte hain for compact display, so we hand-roll it.

/** ₹42,00,000 style — full Indian digit grouping */
export function formatINRFull(amount: number): string {
  const isNegative = amount < 0;
  const abs = Math.round(Math.abs(amount));
  const str = abs.toString();

  if (str.length <= 3) return (isNegative ? '-₹' : '₹') + str;

  const last3 = str.slice(-3);
  const rest = str.slice(0, -3);
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');

  return (isNegative ? '-₹' : '₹') + grouped + ',' + last3;
}

/** ₹42L / ₹1.2Cr style — compact for tables and cards */
export function formatINRCompact(amount: number): string {
  const isNegative = amount < 0;
  const abs = Math.abs(amount);
  const sign = isNegative ? '-' : '';

  if (abs >= 1_00_00_000) {
    return `${sign}₹${(abs / 1_00_00_000).toFixed(2).replace(/\.00$/, '')}Cr`;
  }
  if (abs >= 1_00_000) {
    return `${sign}₹${(abs / 1_00_000).toFixed(1).replace(/\.0$/, '')}L`;
  }
  if (abs >= 1_000) {
    return `${sign}₹${(abs / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return `${sign}₹${abs}`;
}

export function formatUSDCompact(amount: number): string {
  const isNegative = amount < 0;
  const abs = Math.abs(amount);
  const sign = isNegative ? '-' : '';

  if (abs >= 1_000_000) {
    return `${sign}$${(abs / 1_000_000).toFixed(2).replace(/\.00$/, '')}M`;
  }
  if (abs >= 1_000) {
    return `${sign}$${(abs / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return `${sign}$${abs}`;
}

export function formatCompact(amount: number, currency: 'INR' | 'USD'): string {
  return currency === 'INR' ? formatINRCompact(amount) : formatUSDCompact(amount);
}

export function formatFull(amount: number, currency: 'INR' | 'USD'): string {
  if (currency === 'USD') {
    const isNegative = amount < 0;
    const abs = Math.round(Math.abs(amount));
    return (isNegative ? '-$' : '$') + abs.toLocaleString('en-US');
  }
  return formatINRFull(amount);
}

/** Static, hardcoded conversion — documented limitation, not a live forex call */
export const USD_TO_INR_RATE = 86.5;

export function toINR(amount: number, currency: 'INR' | 'USD'): number {
  return currency === 'USD' ? amount * USD_TO_INR_RATE : amount;
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
