'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSavedItems } from '@/lib/store/saved-items';

const NAV_LINKS = [
  { href: '/salaries', label: 'Dashboard' },
  { href: '/compare', label: 'Compare' },
  { href: '/submit', label: 'Submit data' },
  { href: '/saved', label: 'Saved' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { bookmarkedCompanies, savedComparisons, hydrated } = useSavedItems();
  const savedCount = bookmarkedCompanies.length + savedComparisons.length;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-base font-bold text-white">
            T
          </span>
          <span className="text-[19px] font-bold tracking-tight text-[var(--ink)]">
            TalentDash
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-full px-4 py-2.5 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-[var(--hover)] text-[var(--ink)]'
                    : 'text-[var(--body-text)] hover:bg-[var(--hover)]'
                )}
              >
                {link.label}
                {link.href === '/saved' && hydrated && savedCount > 0 && (
                  <span className="ml-1.5 rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {savedCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/submit"
          className="hidden rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-[var(--accent-hover)] hover:shadow-md sm:block"
        >
          Add a data point
        </Link>

        <nav className="flex items-center gap-3 sm:hidden" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-xs font-semibold',
                  isActive ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
