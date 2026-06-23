import Link from 'next/link';
import { HeroTicker } from '@/components/features/hero-ticker';
import { HeatmapPreview } from '@/components/features/heatmap-preview';
import { CountUp } from '@/components/ui/count-up';
import { salaries } from '@/lib/data/salaries';
import { companies } from '@/lib/data/companies';
import { median } from '@/lib/salary';

export default function Home() {
  const inrRecords = salaries.filter((s) => s.currency === 'INR');
  const medianTC = median(inrRecords.map((s) => s.totalComp));

  return (
    <main>
      {/* Hero — subtle radial glow backdrop so it doesn't read as flat white */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full opacity-[0.10] blur-3xl"
          style={{ background: 'radial-gradient(circle, #FF5A5F, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full opacity-[0.08] blur-3xl"
          style={{ background: 'radial-gradient(circle, #0369A1, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div className="fade-in-up">
            <p className="text-label mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--app-bg)] px-3 py-1.5 uppercase tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
              {salaries.length} verified records · {companies.length} companies
            </p>

            <h1 className="text-h1 sm:text-[44px]">
              Know what India&apos;s tech industry actually pays.
            </h1>

            <p className="text-body mt-5 max-w-lg">
              Real compensation data, broken down by company, level, and city.
              No recruiter spin, no inflated screenshots — just comparable
              numbers you can act on.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/salaries"
                className="rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-hover)] hover:shadow-lg active:translate-y-0"
              >
                Browse the dashboard
              </Link>
              <Link
                href="/submit"
                className="rounded-full border border-[var(--ink)] px-6 py-3.5 text-sm font-semibold text-[var(--ink)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--ink)] hover:text-white hover:shadow-lg active:translate-y-0"
              >
                Submit your data
              </Link>
            </div>
          </div>

          <div className="fade-in-up flex justify-center lg:justify-end" style={{ animationDelay: '0.1s' }}>
            <HeroTicker />
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-b border-[var(--border)] bg-[var(--app-bg)]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-4 sm:px-6">
          <Stat label="Median total comp (INR)" value={medianTC} formatKind="inr-compact" accent />
          <Stat label="Companies tracked" value={companies.length} formatKind="plain" />
          <Stat label="Cities represented" value={11} formatKind="plain" />
          <StatText label="Levels covered" value="L3 → Distinguished" />
        </div>
      </section>

      {/* Heatmap — featured, full-width, the visual centerpiece of the page */}
      <section id="heatmap" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-label mb-2 uppercase tracking-wide">Featured</p>
            <h2 className="text-h2">See where the money actually is</h2>
            <p className="text-body mt-2 max-w-xl">
              Every city, every level, color-coded by median pay. This is a
              live slice of the real thing — click through for the full grid.
            </p>
          </div>
        </div>

        <HeatmapPreview />
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-[var(--border)] bg-[var(--app-bg)] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-h2">Three more ways to use it</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <FeatureCard
              title="Filter the dashboard"
              body="Slice every record by company, level, location, and currency. Filters sync to the URL."
              href="/salaries"
              cta="Open dashboard"
            />
            <FeatureCard
              title="Compare two offers"
              body="Drop in two records and see the exact rupee and percentage delta on total comp."
              href="/compare"
              cta="Compare now"
            />
            <FeatureCard
              title="Keep a personal list"
              body="Bookmark companies and save comparisons — stays on this device, no account needed."
              href="/saved"
              cta="View saved"
            />
          </div>
        </div>
      </section>

      {/* Flywheel strip */}
      <section id="flywheel" className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="text-label mb-2 uppercase tracking-wide">Why this gets better over time</p>
          <p className="text-body max-w-3xl">
            More pages indexed by search → more people find this data → more
            people submit their own numbers → the data gets better → the
            pages get better → more pages get indexed. Every part of this
            site is built to keep that loop turning.
          </p>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value, formatKind, accent }: { label: string; value: number; formatKind: 'inr-compact' | 'plain'; accent?: boolean }) {
  return (
    <div className="rounded-[var(--radius-md)] bg-[var(--surface)] px-4 py-5 transition-shadow duration-200 hover:shadow-sm sm:px-5">
      <div className={`text-salary-figure text-2xl sm:text-[28px] ${accent ? 'text-[var(--accent)]' : ''}`}>
        <CountUp value={value} formatKind={formatKind} />
      </div>
      <div className="text-label mt-1">{label}</div>
    </div>
  );
}

function StatText({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-md)] bg-[var(--surface)] px-4 py-5 transition-shadow duration-200 hover:shadow-sm sm:px-5">
      <div className="text-salary-figure text-2xl sm:text-[28px]">{value}</div>
      <div className="text-label mt-1">{label}</div>
    </div>
  );
}

function FeatureCard({ title, body, href, cta }: { title: string; body: string; href: string; cta: string }) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-transparent hover:shadow-[0_20px_40px_-12px_rgba(34,34,34,0.22)]"
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-x-100"
        aria-hidden="true"
      />
      <h3 className="text-h3">{title}</h3>
      <p className="text-body mt-2 flex-1 text-[15px]">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)]">
        {cta}
        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
