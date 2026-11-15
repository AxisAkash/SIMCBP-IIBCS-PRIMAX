import type { ReactNode } from 'react';
import type { StatusTone } from '@simcbp/design-tokens';
import { cn } from '@/lib/cn';

const toneClasses: Record<StatusTone, string> = {
  neutral: 'bg-surface-sunken text-muted-foreground',
  info: 'bg-info-soft text-info',
  brand: 'bg-primary-subtle text-primary',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
};

export function Badge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: StatusTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
