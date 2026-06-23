import Link from 'next/link';

const EXPLORE_LINKS = [
  { href: '/salaries', label: 'Salary dashboard' },
  { href: '/salaries/heatmap', label: 'Heatmap' },
  { href: '/compare', label: 'Compare' },
  { href: '/submit', label: 'Submit data' },
];

const COMPANY_LINKS = [
  { href: '/companies/google', label: 'Google' },
  { href: '/companies/amazon', label: 'Amazon' },
  { href: '/companies/flipkart', label: 'Flipkart' },
  { href: '/companies/tcs', label: 'TCS' },
];

const ACCOUNT_LINKS = [
  { href: '/saved', label: 'Saved items' },
  { href: '/submit', label: 'Add a salary' },
];

const TRUST_BADGES = [
  { label: 'Recomputed, never trusted', body: 'Total compensation is always recalculated from base, bonus, and stock — server-side, on every submission.' },
  { label: 'Anonymous by default', body: 'No name or email collected on submission. Nothing here requires an account.' },
  { label: 'India-first data', body: 'Built around Indian cities, levels, and lakh/crore formatting — not a US product with rupees bolted on.' },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      {/* Trust badges */}
      <div className="border-b border-[var(--border)] bg-[var(--app-bg)]">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className="flex gap-3">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{ backgroundColor: 'var(--success)' }}
                aria-hidden="true"
              >
                ✓
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--ink)]">{badge.label}</p>
                <p className="text-meta mt-0.5">{badge.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-bold text-white">
                T
              </span>
              <span className="text-[17px] font-bold tracking-tight text-[var(--ink)]">TalentDash</span>
            </Link>
            <p className="text-body mt-3 max-w-xs text-sm">
              Real compensation data for India&apos;s tech industry. Built so the
              next person can negotiate from a place of knowing, not guessing.
            </p>
          </div>

          <FooterColumn title="Explore" links={EXPLORE_LINKS} />
          <FooterColumn title="Popular companies" links={COMPANY_LINKS} />
          <FooterColumn title="Your account" links={ACCOUNT_LINKS} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-meta">© {year} TalentDash. Built as a frontend trial submission.</p>
          <p className="text-meta">Mock data — not connected to a live database. See README for scope.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-label mb-3 uppercase tracking-wide">{title}</p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-[var(--body-text)] transition-colors hover:text-[var(--accent)]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
