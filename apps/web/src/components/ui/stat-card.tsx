import type { ComponentType } from 'react';
import { ArrowDownRight, ArrowUpRight, type LucideProps } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Card } from './card';

export function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  hint,
}: {
  label: string;
  value: string;
  icon?: ComponentType<LucideProps>;
  delta?: { value: string; direction: 'up' | 'down'; positive?: boolean };
  hint?: string;
}) {
  const deltaPositive = delta?.positive ?? delta?.direction === 'up';
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {Icon ? (
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-subtle text-primary">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground tabular-nums">
        {value}
      </p>
      <div className="mt-1 flex items-center gap-2">
        {delta ? (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 text-xs font-medium',
              deltaPositive ? 'text-success' : 'text-danger',
            )}
          >
            {delta.direction === 'up' ? (
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" aria-hidden />
            )}
            {delta.value}
          </span>
        ) : null}
        {hint ? <span className="text-xs text-muted">{hint}</span> : null}
      </div>
    </Card>
  );
}
