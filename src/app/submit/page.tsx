import type { Metadata } from 'next';
import { SubmitForm } from '@/components/features/submit-form';

export const metadata: Metadata = {
  title: 'Submit Salary Data',
  description: 'Contribute your compensation data anonymously. Validated and recomputed server-side.',
};

export default function SubmitPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-h1 sm:text-[32px]">Submit your compensation</h1>
        <p className="text-body mt-1.5">Helps the next person negotiate better. Takes about a minute.</p>
      </div>

      <SubmitForm />
    </main>
  );
}
