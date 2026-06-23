'use client';

import { useSavedItems } from '@/lib/store/saved-items';
import { cn } from '@/lib/utils';

export function BookmarkButton({ slug, companyName }: { slug: string; companyName: string }) {
  const { isBookmarked, toggleBookmark, hydrated } = useSavedItems();
  const saved = hydrated && isBookmarked(slug);

  return (
    <button
      onClick={() => toggleBookmark(slug)}
      aria-pressed={saved}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0',
        saved
          ? 'border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)]'
          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--body-text)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
      )}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
        <path d="M3.5 2.5h9a.5.5 0 0 1 .5.5v11.5l-5-3-5 3V3a.5.5 0 0 1 .5-.5Z" strokeLinejoin="round" />
      </svg>
      {saved ? 'Saved' : `Save ${companyName}`}
    </button>
  );
}
