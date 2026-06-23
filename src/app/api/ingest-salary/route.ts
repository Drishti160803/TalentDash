// ============================================
// src/app/api/ingest-salary/route.ts
// ============================================
// Mirrors the spec's contract: 201 on success, 409 on duplicate,
// 400 with { error, field, message } on validation failure.
// total_compensation is always recomputed server-side, never trusted from input.
// No persistent DB in this frontend-focused build — validated and echoed back.

import { NextRequest, NextResponse } from 'next/server';
import { validateSubmission } from '@/lib/validation';
import { normaliseCompanyName } from '@/lib/normalise';
import { computeTotalComp } from '@/lib/salary';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: true, field: null, message: 'Request body must be valid JSON' },
      { status: 400 }
    );
  }

  const result = validateSubmission(body);

  if (!result.success) {
    const [field, message] = Object.entries(result.errors)[0] ?? ['unknown', 'Invalid submission'];
    return NextResponse.json({ error: true, field, message }, { status: 400 });
  }

  const data = result.data;
  const normalisedSlug = normaliseCompanyName(data.company);
  const totalComp = computeTotalComp(data.base_salary, data.bonus, data.stock);

  // Note: without a database, true duplicate detection isn't possible here.
  // The shape below is what a real conflict-checked response looks like.
  return NextResponse.json(
    {
      id: `sal_${Date.now()}`,
      company: data.company,
      companySlug: normalisedSlug,
      role: data.role,
      level: data.level,
      location: data.location,
      currency: data.currency,
      experience_years: data.experience_years,
      base_salary: data.base_salary,
      bonus: data.bonus,
      stock: data.stock,
      total_compensation: totalComp,
      source: data.source,
      confidence_score: data.confidence_score,
      created_at: new Date().toISOString(),
    },
    { status: 201 }
  );
}
