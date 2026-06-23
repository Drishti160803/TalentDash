import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="text-meta">404</p>
      <h1 className="text-h2 mt-2">Page not found</h1>
      <p className="text-body mt-3">The page you&apos;re looking for doesn&apos;t exist or moved.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white">
        Back to home
      </Link>
    </main>
  );
}
