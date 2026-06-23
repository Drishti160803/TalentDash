'use client';

import { useEffect, useRef, useState } from 'react';
import { formatINRCompact } from '@/lib/format';

type FormatKind = 'inr-compact' | 'plain';

interface CountUpProps {
  value: number;
  formatKind?: FormatKind;
  durationMs?: number;
}

function applyFormat(n: number, kind: FormatKind): string {
  return kind === 'inr-compact' ? formatINRCompact(n) : String(n);
}

/**
 * Animates a number from 0 to its target on mount/value change. Takes a
 * format *kind* string rather than a function — functions can't cross the
 * server/client component boundary as props, so this stays serializable
 * when used from a server component like the homepage.
 */
export function CountUp({ value, formatKind = 'plain', durationMs = 700 }: CountUpProps) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(0);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = null;

    function tick(timestamp: number) {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = fromRef.current + (value - fromRef.current) * eased;
      setDisplay(current);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, durationMs]);

  return <span className="font-mono-data tabular-nums">{applyFormat(Math.round(display), formatKind)}</span>;
}
