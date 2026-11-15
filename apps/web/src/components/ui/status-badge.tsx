import type { StatusTone } from '@simcbp/design-tokens';
import { Badge } from './badge';

const dotClasses: Record<StatusTone, string> = {
  neutral: 'bg-muted',
  info: 'bg-info',
  brand: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

/** Status pill with a tone dot. `label` is expected to be already localized. */
export function StatusBadge({ tone, label }: { tone: StatusTone; label: string }) {
  return (
    <Badge tone={tone}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[tone]}`} aria-hidden />
      {label}
    </Badge>
  );
}
