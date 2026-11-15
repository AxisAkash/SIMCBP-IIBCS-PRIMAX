import type { StatusTone } from '@simcbp/design-tokens';
import type { Locale } from '@simcbp/i18n';
import type { DemoBar } from '@/lib/demo-data';
import { formatNumber } from '@/lib/format';
import { cn } from '@/lib/cn';

const barTone: Record<StatusTone, string> = {
  neutral: 'bg-muted',
  info: 'bg-info',
  brand: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

export function BarList({ items, locale }: { items: DemoBar[]; locale: Locale }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <ul className="space-y-3.5">
      {items.map((item, i) => {
        const pct = Math.max(2, Math.round((item.value / max) * 100));
        return (
          <li key={i}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-foreground">{item.label[locale]}</span>
              <span className="tabular-nums font-medium text-muted-foreground">
                {formatNumber(item.value, locale)}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
              <div
                className={cn('h-full rounded-full', barTone[item.tone])}
                style={{ width: `${pct}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
