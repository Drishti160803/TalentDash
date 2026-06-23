# TalentDash — Frontend

A dense, filterable, level-aware compensation table for Indian tech salaries —
plus company profiles with charts, a salary heatmap, a comparison tool, and a
personal saved-items dashboard. Built against a mock data file per the trial
spec: no database, no backend, pure frontend, with production-correct
architecture (RSC, SSG, proper component separation).

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. First load fetches Inter from Google Fonts —
needs an internet connection.

## Pages

| Route | What it does |
|---|---|
| `/` | Landing page — live comparison card, animated stat strip, flywheel explanation |
| `/salaries` | The core product. Filter by company, level, location, currency. Sorted by total comp descending. 25 rows/page. URL-encoded filters. Skeleton loader during filter transitions. |
| `/salaries/heatmap` | City × level grid, color-coded by median total comp, with hover tooltips showing exact figures and record counts |
| `/companies/[slug]` | Statically generated company profile — a Recharts bar chart of median pay by level, range stats, level distribution, full record list, bookmark button |
| `/compare` | Pick any two records, see exact delta on base/bonus/stock/total comp, with a "Higher TC" winner chip. URL state via `?s1=&s2=`, pre-fillable via `?c1={slug}` from a company page |
| `/submit` | Salary submission form, validated against the same Zod schema the API route enforces |
| `/saved` | Personal dashboard — bookmarked companies and saved comparisons, persisted in this browser via `localStorage` |

## What Makes This Different From a Baseline Submission

Beyond the required filter/table/compare/submit flow, several things were
built specifically to go past "it works":

1. **The heatmap** (`/salaries/heatmap`) — mentioned once in the platform
   structure spec as a future SEO page, not required for this trial. Built
   anyway because a city × level grid answers "where should I be looking"
   faster than any filtered table can. It's also featured directly on the
   homepage as a real, working preview (`src/components/features/heatmap-preview.tsx`)
   rather than a card linking to a page you have to click into blind.
2. **Real charts, not CSS bars.** The company page's level breakdown is a
   Recharts bar chart with a proper tooltip showing median + record count
   per level — the difference between "I made some boxes" and "I built a
   chart."
3. **A complete footer**, not an afterthought — trust signals, three link
   columns, and a real sitemap of every page, matching the density and
   restraint of the rest of the design system.
4. **Motion that earns its place and is actually visible.** Numbers count
   up on mount (`src/components/ui/count-up.tsx`), filter changes show a
   skeleton loader instead of a flash of stale content
   (`src/components/features/table-skeleton.tsx`), and every card —
   feature cards, stat cards, bookmark buttons — lifts with a real shadow
   on hover rather than a barely-there color shift. All respect
   `prefers-reduced-motion`.

## Design System

Followed the brief's exact color and type values rather than inventing a
from-scratch palette:

- **Color**: `#FF5A5F` coral accent for CTAs and active states, `#222222`
  deep text, `#484848`/`#717171` body/muted text, white surfaces on a
  `#F7F7F7` app background, `#EBEBEB` borders, `#008A05`/`#D93025` for
  positive/negative deltas.
- **Type**: Inter only. H1 36px/700, H2 28px/700, H3 22px/600, salary
  figures 32–40px/700 with tabular numerals throughout, body 16px/400/1.6,
  labels 13px/500, metadata 12px/400.
- **No component libraries.** Every input, select, badge, table, and chart
  wrapper is hand-built with Tailwind utilities (Recharts is used only for
  the actual SVG chart rendering, per the spec's allowance for chart
  libraries — not as a UI kit).
- **Level tier colors** (slate → blue → indigo → purple → navy, low → high
  seniority) aren't in the core palette table, so they're a clearly-scoped,
  desaturated addition — documented in `src/components/ui/level-badge.tsx`
  — rather than invented brand hues.
- **Data blue** (`#0369A1`) is used only where the brief specifies it: the
  dominant Total Comp figure in the table, the company page, the heatmap
  cells, and the compare tool's "Higher TC" badge.

## Architecture Notes

- Data lives in `src/lib/data/` — 70 seeded salary records across 12
  companies, all levels, multiple cities, INR and USD, with the documented
  edge cases (zero bonus, zero stock, very high equity, single-level
  companies).
- Total compensation is never trusted from input. It's recomputed in the
  mock dataset, in the `/api/ingest-salary` route, and in the submit form's
  live preview.
- Company name normalisation (`src/lib/normalise.ts`) strips common legal
  suffixes and resolves known aliases (TCS, Wipro) before slugging — same
  logic a real backend would use for deduplication.
- `/saved` uses `localStorage` for persistence. This is a real standalone
  Next.js app run locally, not a sandboxed artifact, so browser storage is
  the correct and expected layer here.
- `/api/ingest-salary` validates and echoes back what a real ingestion
  endpoint would return (201 with recomputed total, 400 with a per-field
  error). Swapping in a real database means replacing the body of that one
  route — every page already reads through `src/lib/data/`, which is the
  seam to cut at.

## Known Limitations (by design, for a frontend-only pass)

- The compare page's record selectors cap at 100 options — matches the
  documented note about needing async autocomplete at real scale.
- USD→INR conversion uses a fixed reference rate, not a live forex feed.
- No real duplicate detection on submit — there's no database to check
  against, so the API route validates and computes correctly but can't
  reject a true duplicate.
- The heatmap and company chart show INR records only — mixing currencies
  in one visual grid without a per-cell conversion label would be
  misleading, so it's scoped deliberately rather than faked.

## Folder Structure

```
src/
  app/
    page.tsx                       Homepage
    salaries/page.tsx              Dashboard
    salaries/heatmap/page.tsx      Salary heatmap
    companies/[slug]/page.tsx      Company profile (SSG)
    compare/page.tsx               Compare tool
    submit/page.tsx                Submit form
    saved/page.tsx                 Personal dashboard
    api/ingest-salary/route.ts
  components/
    ui/                            Primitives: DeltaBadge, LevelBadge, CompanyMark, CountUp
    features/                      Page-level: filters, table, skeleton, heatmap grid, company chart, compare client, submit form, saved client
  lib/
    data/                          Seeded companies and salaries
    store/                         Saved-items + filter-pending contexts
    heatmap.ts                     City × level aggregation logic
    format.ts                      Lakh/crore formatting, USD, percent
    normalise.ts                   Company name normalisation
    salary.ts                      Median, stats, delta computation
    validation.ts                  Zod schemas
    utils.ts                       cn() class merge helper
  types/salary.ts                  Domain types
```
