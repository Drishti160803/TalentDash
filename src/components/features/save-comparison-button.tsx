'use client';

import { useState } from 'react';
import { useSavedItems } from '@/lib/store/saved-items';
import { cn } from '@/lib/utils';

export function SaveComparisonButton({ recordAId, recordBId }: { recordAId: string; recordBId: string }) {
  const { savedComparisons, saveComparison, hydrated } = useSavedItems();
  const [justSaved, setJustSaved] = useState(false);

  const alreadySaved =
    hydrated &&
    savedComparisons.some(
      (c) =>
        (c.recordAId === recordAId && c.recordBId === recordBId) ||
        (c.recordAId === recordBId && c.recordBId === recordAId)
    );

  function handleClick() {
    if (alreadySaved) return;
    saveComparison(recordAId, recordBId);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <button
      onClick={handleClick}
      disabled={alreadySaved}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors',
        alreadySaved
          ? 'border-[var(--success)]/25 bg-[var(--success-tint)] text-[var(--success)]'
          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--body-text)] hover:bg-[var(--hover)]'
      )}
    >
      {alreadySaved ? 'Saved to your dashboard' : justSaved ? 'Saved!' : 'Save this comparison'}
    </button>
  );
}
