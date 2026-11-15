import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import type { StatusTone } from '@simcbp/design-tokens';
import { cn } from '@/lib/cn';

const barTone: Record<StatusTone, string> = {
  neutral: 'bg-muted',
  info: 'bg-info',
  brand: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

export function ProgressBar({
  value,
  tone = 'brand',
  className,
}: {
  value: number;
  tone?: StatusTone;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn('h-2 w-full overflow-hidden rounded-full bg-surface-sunken', className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn('h-full rounded-full transition-all', barTone[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/** Circular progress — used for handover readiness. */
export function RadialProgress({
  value,
  size = 120,
  tone = 'brand',
  label,
}: {
  value: number;
  size?: number;
  tone?: StatusTone;
  label?: ReactNode;
}) {
  const pct = Math.max(0, Math.min(100, value));
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const strokeColor: Record<StatusTone, string> = {
    neutral: 'var(--color-muted)',
    info: 'var(--color-info)',
    brand: 'var(--color-primary)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    danger: 'var(--color-danger)',
  };
  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-surface-sunken)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={strokeColor[tone]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (pct / 100) * c}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold tabular-nums text-foreground">
          {Math.round(pct)}%
        </span>
        {label ? <span className="text-xs text-muted-foreground">{label}</span> : null}
      </div>
    </div>
  );
}

export interface Step {
  key: string;
  label: ReactNode;
}

export function Stepper({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <ol className="flex items-center">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step.key} className={cn('flex items-center', i < steps.length - 1 && 'flex-1')}>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold',
                  done && 'border-primary bg-primary text-primary-foreground',
                  active && 'border-primary text-primary',
                  !done && !active && 'border-border-strong text-muted',
                )}
              >
                {done ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
              </span>
              <span
                className={cn(
                  'hidden text-sm sm:block',
                  active ? 'font-medium text-foreground' : 'text-muted-foreground',
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 ? (
              <span className={cn('mx-3 h-px flex-1', done ? 'bg-primary' : 'bg-border')} />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <span
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-xs font-semibold text-primary',
        className,
      )}
    >
      {initials}
    </span>
  );
}

export function DescriptionList({ items }: { items: { label: ReactNode; value: ReactNode }[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
      {items.map((item, i) => (
        <div key={i}>
          <dt className="text-xs uppercase tracking-wide text-muted">{item.label}</dt>
          <dd className="mt-0.5 text-sm text-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
