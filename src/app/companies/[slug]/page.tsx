import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { companies, getCompanyBySlug } from '@/lib/data/companies';
import { getSalariesByCompanySlug } from '@/lib/data/salaries';
import { computeCompanyStats } from '@/lib/salary';
import { formatINRCompact, formatCompact, formatFull } from '@/lib/format';
import { CompanyMark } from '@/components/ui/company-mark';
import { LevelBadge } from '@/components/ui/level-badge';
import { LevelDistribution } from '@/components/features/level-distribution';
import { CompanyChart } from '@/components/features/company-chart';
import { BookmarkButton } from '@/components/features/bookmark-button';

const DATA_BLUE = '#0369A1';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// SSG — per spec F3: generateStaticParams() pre-generates one page per company
export function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) return { title: 'Company not found' };

  const records = getSalariesByCompanySlug(slug);
  const stats = computeCompanyStats(records);
  const description = `${records.length} real compensation data points for ${company.name}. Median total comp: ${formatINRCompact(stats.medianTotalComp)}.`;

  return {
    title: `${company.name} Salaries`,
    description,
    alternates: { canonical: `/companies/${slug}` },
    openGraph: {
      title: `${company.name} Salaries — TalentDash`,
      description,
      url: `/companies/${slug}`,
    },
  };
}

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const records = getSalariesByCompanySlug(slug);
  const stats = computeCompanyStats(records);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${company.name} Compensation Data`,
    description: `Compensation records for ${company.name} sourced from contributor submissions and public filings.`,
    creator: { '@type': 'Organization', name: 'TalentDash' },
    variableMeasured: ['base salary', 'bonus', 'stock', 'total compensation'],
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="text-meta mb-2">
        <Link href="/salaries" className="hover:text-[var(--ink)]">Dashboard</Link>
        <span className="mx-1.5">/</span>
        <span>{company.name}</span>
      </div>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <CompanyMark name={company.name} initial={company.logoInitial} size="lg" />
          <div>
            <h1 className="text-h1 sm:text-[32px]">{company.name}</h1>
            <p className="text-body mt-1 text-sm">
              {company.industry} · Founded {company.foundedYear} · {company.headquarters} · {company.headcountRange} employees
            </p>
          </div>
        </div>
        <BookmarkButton slug={company.slug} companyName={company.name} />
      </div>

      {/* Compensation overview — per spec F3 */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Data points" value={String(stats.count)} />
        <StatCard label="Median total comp" value={formatINRCompact(stats.medianTotalComp)} accent />
        <StatCard label="Range — low" value={formatINRCompact(stats.lowestTotalComp)} />
        <StatCard label="Range — high" value={formatINRCompact(stats.highestTotalComp)} />
      </div>

      {/* Lead chart — median pay by level, the visual hook of the page */}
      <div className="mb-8 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="text-h3 mb-1 text-base">Median total comp by level</h2>
        <p className="text-meta mb-4">INR records only</p>
        <CompanyChart records={records} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="text-h3 mb-4">All submissions</h2>
          <div className="overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-left">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Role</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Level</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Location</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Total comp</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} className="border-b border-l-2 border-l-transparent border-[var(--border)] transition-all duration-150 last:border-b-0 hover:border-l-[var(--accent)] hover:bg-[var(--hover)]">
                    <td className="px-4 py-3.5 text-[var(--ink)]">{r.role}</td>
                    <td className="px-4 py-3.5"><LevelBadge level={r.level} /></td>
                    <td className="px-4 py-3.5 text-[var(--body-text)]">{r.location}</td>
                    <td className="px-4 py-3.5 text-right font-mono-data font-bold" style={{ color: DATA_BLUE }} title={formatFull(r.totalComp, r.currency)}>
                      {formatCompact(r.totalComp, r.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5">
            <h3 className="text-h3 mb-4 text-base">Level distribution</h3>
            <LevelDistribution distribution={stats.levelDistribution} total={stats.count} />
          </div>

          <Link
            href={`/compare?c1=${company.slug}`}
            className="block rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:shadow-md"
          >
            <p className="text-h3 text-base">Compare a {company.name} offer</p>
            <p className="text-body mt-1 text-sm">See exactly how it stacks up against another company.</p>
            <span className="mt-3 inline-block text-sm font-semibold text-[var(--accent)]">Open compare tool →</span>
          </Link>
        </aside>
      </div>
    </main>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="text-label">{label}</div>
      <div className={`text-salary-figure mt-1 text-xl ${accent ? 'text-[var(--accent)]' : ''}`}>{value}</div>
    </div>
  );
}
