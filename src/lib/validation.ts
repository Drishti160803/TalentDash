// ============================================
// src/lib/validation.ts — ZOD SCHEMAS
// ============================================
// Server-side validation contract. The form below mirrors this exactly
// so client-side errors match what a real API would reject.

import { z } from 'zod';

export const LEVELS = [
  'L3', 'L4', 'L5', 'L6',
  'SDE_I', 'SDE_II', 'SDE_III',
  'SENIOR', 'STAFF', 'PRINCIPAL', 'DISTINGUISHED',
] as const;

export const CURRENCIES = ['INR', 'USD'] as const;
export const SOURCES = ['CONTRIBUTOR', 'VERIFIED', 'PUBLIC_FILING'] as const;

export const salarySubmissionSchema = z.object({
  company: z.string().trim().min(2, 'Company name is too short').max(120),
  role: z.string().trim().min(2, 'Role is too short').max(120),
  level: z.enum(LEVELS, { message: 'Select a valid level' }),
  location: z.string().trim().min(2, 'Location is required').max(80),
  currency: z.enum(CURRENCIES),
  experience_years: z
    .number({ message: 'Experience must be a number' })
    .min(0, 'Experience cannot be negative')
    .max(45, 'That experience value looks too high'),
  base_salary: z
    .number({ message: 'Base salary must be a number' })
    .positive('Base salary must be greater than zero'),
  bonus: z.number().min(0, 'Bonus cannot be negative').default(0),
  stock: z.number().min(0, 'Stock cannot be negative').default(0),
  source: z.enum(SOURCES).default('CONTRIBUTOR'),
  confidence_score: z
    .number()
    .min(0)
    .max(1)
    .default(0.7),
});

export type SalarySubmissionInput = z.infer<typeof salarySubmissionSchema>;

export type FieldErrors = Partial<Record<keyof SalarySubmissionInput, string>>;

export function validateSubmission(data: unknown):
  | { success: true; data: SalarySubmissionInput }
  | { success: false; errors: FieldErrors } {
  const result = salarySubmissionSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof SalarySubmissionInput;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { success: false, errors };
}
