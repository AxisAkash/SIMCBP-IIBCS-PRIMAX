import type { ReactNode } from 'react';
import type { StatusTone } from '@simcbp/design-tokens';

const dot: Record<StatusTone, string> = {
  neutral: 'bg-muted',
  info: 'bg-info',
  brand: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

export function MiniStat({
  label,
  value,
  tone,
}: {
  label: ReactNode;
  value: ReactNode;
  tone?: StatusTone;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface px-4 py-3">
      <div className="flex items-center gap-1.5">
        {tone ? <span className={`h-2 w-2 rounded-full ${dot[tone]}`} aria-hidden /> : null}
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">{value}</p>
    </div>
  );
}
