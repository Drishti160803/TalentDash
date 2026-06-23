import type { Metadata } from 'next';
import { SavedClient } from '@/components/features/saved-client';

export const metadata: Metadata = {
  title: 'Saved',
  description: 'Your bookmarked companies and saved comparisons.',
};

export default function SavedPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-h1 sm:text-[32px]">Your saved items</h1>
        <p className="text-body mt-1.5">
          Bookmarked companies and saved comparisons, kept on this device. No account, no login.
        </p>
      </div>

      <SavedClient />
    </main>
  );
}
