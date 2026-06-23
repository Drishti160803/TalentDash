import { cn } from '@/lib/utils';

interface FieldWrapperProps {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  htmlFor: string;
}

export function FieldWrapper({ label, error, hint, children, htmlFor }: FieldWrapperProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-meta mt-1.5">{hint}</p>}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[var(--error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass = (hasError?: boolean) =>
  cn(
    'w-full rounded-[var(--radius-md)] border bg-[var(--surface)] px-3.5 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none',
    hasError ? 'border-[var(--error)] focus:border-[var(--error)]' : 'border-[var(--border)] focus:border-[var(--ink)]'
  );
