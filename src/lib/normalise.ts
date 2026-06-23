// ============================================
// src/lib/normalise.ts — COMPANY NAME NORMALISATION
// ============================================
// "Google India Pvt. Ltd." / "GOOGLE" / "google " sab → "google"

const SUFFIXES = [
  'pvt. ltd.', 'pvt ltd', 'private limited', 'limited', 'ltd.', 'ltd',
  'inc.', 'inc', 'corporation', 'corp.', 'corp',
  'technologies', 'technology', 'india', '.com',
];

export function normaliseCompanyName(raw: string): string {
  let value = raw.trim().toLowerCase();

  for (const suffix of SUFFIXES) {
    const pattern = new RegExp(`\\s*${suffix.replace('.', '\\.')}\\s*$`, 'i');
    value = value.replace(pattern, '');
  }

  value = value.trim().replace(/\s+/g, ' ');

  // Known aliases for common abbreviations
  const ALIASES: Record<string, string> = {
    'tata consultancy services': 'tcs',
    'wipro technologies': 'wipro',
    'flipkart internet': 'flipkart',
  };

  return ALIASES[value] ?? value.replace(/\s+/g, '-');
}

export function slugify(name: string): string {
  return normaliseCompanyName(name);
}
