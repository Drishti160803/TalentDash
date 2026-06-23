import { cn } from '@/lib/utils';
import { Level, LEVEL_LABELS } from '@/types/salary';

/**
 * Tier color mapping per spec F2: L3/SDE-I = slate, L4/SDE-II = blue,
 * L5/SDE-III = indigo, L6/Staff = purple, Principal = navy.
 * These specific hues aren't in the core color table, so they're kept
 * desaturated and consistent with the "cold, analytical" brief rather
 * than introducing bright new accents.
 */
const TIER_STYLES: Record<Level, string> = {
  L3: 'bg-slate-100 text-slate-700 border-slate-200',
  SDE_I: 'bg-slate-100 text-slate-700 border-slate-200',
  L4: 'bg-blue-50 text-blue-700 border-blue-200',
  SDE_II: 'bg-blue-50 text-blue-700 border-blue-200',
  L5: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  SDE_III: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  SENIOR: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  L6: 'bg-purple-50 text-purple-700 border-purple-200',
  STAFF: 'bg-purple-50 text-purple-700 border-purple-200',
  PRINCIPAL: 'bg-[#0F1B33]/5 text-[#0F1B33] border-[#0F1B33]/15',
  DISTINGUISHED: 'bg-[#0F1B33]/5 text-[#0F1B33] border-[#0F1B33]/15',
};

export function LevelBadge({ level }: { level: Level }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold',
        TIER_STYLES[level]
      )}
    >
      {LEVEL_LABELS[level]}
    </span>
  );
}
