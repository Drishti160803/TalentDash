import { Suspense } from 'react';
import type { Metadata } from 'next';
import { CompareClient } from '@/components/features/compare-client';

export const metadata: Metadata = {
  title: 'Compare Salaries',
  description: 'Compare two real compensation packages side by side — exact rupee and percentage deltas on base, bonus, stock, and total comp.',
  alternates: { canonical: '/compare' },
};

export default function ComparePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-h1 sm:text-[32px]">Compare two offers</h1>
        <p className="text-body mt-1.5">
          Select any two records. Every delta — base, bonus, stock, and total comp — is recomputed exactly, not estimated.
        </p>
      </div>

      <Suspense fallback={<div className="h-24" />}>
        <CompareClient />
      </Suspense>
    </main>
  );
}
