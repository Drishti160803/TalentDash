'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SalaryRecord } from '@/types/salary';
import { LEVEL_ORDER, LEVEL_LABELS } from '@/types/salary';
import { median } from '@/lib/salary';
import { formatINRCompact } from '@/lib/format';

const DATA_BLUE = '#0369A1';

interface CompanyChartProps {
  records: SalaryRecord[];
}

export function CompanyChart({ records }: CompanyChartProps) {
  const inrRecords = records.filter((r) => r.currency === 'INR');

  const data = LEVEL_ORDER.filter((lvl) => inrRecords.some((r) => r.level === lvl)).map((lvl) => {
    const matching = inrRecords.filter((r) => r.level === lvl);
    return {
      level: LEVEL_LABELS[lvl],
      medianTC: median(matching.map((r) => r.totalComp)),
      count: matching.length,
    };
  });

  if (data.length === 0) {
    return (
      <p className="text-body text-sm">No INR records to chart for this company yet.</p>
    );
  }

  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <XAxis
            dataKey="level"
            tick={{ fontSize: 12, fill: 'var(--muted)' }}
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => formatINRCompact(v)}
            tick={{ fontSize: 11, fill: 'var(--muted)' }}
            axisLine={false}
            tickLine={false}
            width={50}
          />
          <Tooltip
            cursor={{ fill: 'var(--hover)' }}
            contentStyle={{
              borderRadius: 8,
              border: '1px solid var(--border)',
              fontSize: 13,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
            formatter={(value, _name, item) => {
              const num = typeof value === 'number' ? value : 0;
              const count = (item?.payload as { count?: number })?.count ?? 0;
              return [
                `${formatINRCompact(num)} median · ${count} record${count !== 1 ? 's' : ''}`,
                'Total comp',
              ];
            }}
          />
          <Bar dataKey="medianTC" radius={[6, 6, 0, 0]} maxBarSize={56}>
            {data.map((_, i) => (
              <Cell key={i} fill={DATA_BLUE} fillOpacity={0.55 + (i / data.length) * 0.45} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
