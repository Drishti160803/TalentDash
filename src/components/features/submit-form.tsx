'use client';

import { useMemo, useState } from 'react';
import { FieldWrapper, inputClass } from '@/components/features/form-field';
import { LEVELS, CURRENCIES } from '@/lib/validation';
import { LEVEL_LABELS, Level, Currency } from '@/types/salary';
import { formatCompact } from '@/lib/format';

interface FormState {
  company: string;
  role: string;
  level: Level | '';
  location: string;
  currency: Currency;
  experience_years: string;
  base_salary: string;
  bonus: string;
  stock: string;
}

const initialState: FormState = {
  company: '',
  role: '',
  level: '',
  location: '',
  currency: 'INR',
  experience_years: '',
  base_salary: '',
  bonus: '',
  stock: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function SubmitForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const totalCompPreview = useMemo(() => {
    const base = parseFloat(form.base_salary) || 0;
    const bonus = parseFloat(form.bonus) || 0;
    const stock = parseFloat(form.stock) || 0;
    return base + bonus + stock;
  }, [form.base_salary, form.bonus, form.stock]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});
    setServerMessage('');

    const payload = {
      company: form.company,
      role: form.role,
      level: form.level,
      location: form.location,
      currency: form.currency,
      experience_years: Number(form.experience_years),
      base_salary: Number(form.base_salary),
      bonus: form.bonus ? Number(form.bonus) : 0,
      stock: form.stock ? Number(form.stock) : 0,
      source: 'CONTRIBUTOR',
      confidence_score: 0.7,
    };

    try {
      const res = await fetch('/api/ingest-salary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors({ [data.field ?? 'form']: data.message ?? 'Something went wrong' });
        setStatus('error');
        return;
      }

      setStatus('success');
      setServerMessage(
        `Recorded. Total compensation: ${formatCompact(data.total_compensation, form.currency)}.`
      );
      setForm(initialState);
    } catch {
      setStatus('error');
      setErrors({ form: 'Could not reach the server. Try again in a moment.' });
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-[var(--radius-md)] border border-[var(--success)]/25 bg-[var(--success-tint)] px-6 py-8 text-center">
        <p className="text-h3" style={{ color: 'var(--success)' }}>Submitted</p>
        <p className="text-body mt-2 text-sm">{serverMessage}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--hover)]"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.form && (
        <p className="rounded-[var(--radius-md)] border border-[var(--error)]/25 bg-[var(--error-tint)] px-4 py-3 text-sm font-medium text-[var(--error)]">
          {errors.form}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="Company" htmlFor="company" error={errors.company}>
          <input
            id="company"
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder="e.g. Amazon"
            className={inputClass(!!errors.company)}
            required
          />
        </FieldWrapper>

        <FieldWrapper label="Role" htmlFor="role" error={errors.role}>
          <input
            id="role"
            value={form.role}
            onChange={(e) => update('role', e.target.value)}
            placeholder="e.g. Software Development Engineer"
            className={inputClass(!!errors.role)}
            required
          />
        </FieldWrapper>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <FieldWrapper label="Level" htmlFor="level" error={errors.level}>
          <select
            id="level"
            value={form.level}
            onChange={(e) => update('level', e.target.value as Level)}
            className={inputClass(!!errors.level)}
            required
          >
            <option value="">Select…</option>
            {LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>{LEVEL_LABELS[lvl]}</option>
            ))}
          </select>
        </FieldWrapper>

        <FieldWrapper label="Location" htmlFor="location" error={errors.location}>
          <input
            id="location"
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
            placeholder="e.g. Bengaluru"
            className={inputClass(!!errors.location)}
            required
          />
        </FieldWrapper>

        <FieldWrapper label="Currency" htmlFor="currency" error={errors.currency}>
          <select
            id="currency"
            value={form.currency}
            onChange={(e) => update('currency', e.target.value as Currency)}
            className={inputClass(!!errors.currency)}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FieldWrapper>
      </div>

      <FieldWrapper label="Years of experience" htmlFor="experience" error={errors.experience_years}>
        <input
          id="experience"
          type="number"
          min={0}
          max={45}
          step={0.5}
          value={form.experience_years}
          onChange={(e) => update('experience_years', e.target.value)}
          placeholder="e.g. 4"
          className={inputClass(!!errors.experience_years)}
          required
        />
      </FieldWrapper>

      <div className="grid gap-4 sm:grid-cols-3">
        <FieldWrapper
          label={`Base salary (${form.currency})`}
          htmlFor="base"
          error={errors.base_salary}
          hint="Annual, before tax"
        >
          <input
            id="base"
            type="number"
            min={0}
            value={form.base_salary}
            onChange={(e) => update('base_salary', e.target.value)}
            placeholder={form.currency === 'INR' ? 'e.g. 2500000' : 'e.g. 140000'}
            className={inputClass(!!errors.base_salary)}
            required
          />
        </FieldWrapper>

        <FieldWrapper
          label="Annual bonus"
          htmlFor="bonus"
          error={errors.bonus}
          hint="Leave 0 if none"
        >
          <input
            id="bonus"
            type="number"
            min={0}
            value={form.bonus}
            onChange={(e) => update('bonus', e.target.value)}
            placeholder="0"
            className={inputClass(!!errors.bonus)}
          />
        </FieldWrapper>

        <FieldWrapper
          label="Stock (annualised)"
          htmlFor="stock"
          error={errors.stock}
          hint="Vesting value per year"
        >
          <input
            id="stock"
            type="number"
            min={0}
            value={form.stock}
            onChange={(e) => update('stock', e.target.value)}
            placeholder="0"
            className={inputClass(!!errors.stock)}
          />
        </FieldWrapper>
      </div>

      {/* Live total comp preview */}
      <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--app-bg)] px-4 py-3.5">
        <span className="text-sm font-medium text-[var(--body-text)]">Total compensation (computed)</span>
        <span className="text-salary-figure text-lg" style={{ color: '#0369A1' }}>
          {formatCompact(totalCompPreview, form.currency)}
        </span>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-full bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-[var(--accent-hover)] hover:shadow-md disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none"
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit anonymously'}
      </button>

      <p className="text-meta text-center">
        No name or email collected. Total compensation is always recalculated from base, bonus, and stock — never taken as-is.
      </p>
    </form>
  );
}
