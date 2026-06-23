import Link from 'next/link';

export default function CompanyNotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-meta">404</p>
      <h1 className="text-h2 mt-2">We don&apos;t have this company yet</h1>
      <p className="text-body mt-3">It hasn&apos;t been submitted to TalentDash, or the link is mistyped.</p>
      <Link href="/salaries" className="mt-6 inline-block rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white">
        Back to dashboard
      </Link>
    </main>
  );
}
