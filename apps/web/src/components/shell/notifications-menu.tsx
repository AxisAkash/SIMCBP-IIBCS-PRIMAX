'use client';

import { Bell } from 'lucide-react';
import { Dropdown } from '@/components/ui/dropdown';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { demoNotifications } from '@/lib/demo-data';

const dotTone: Record<string, string> = {
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  brand: 'bg-primary',
  neutral: 'bg-muted',
};

export function NotificationsMenu() {
  const locale = useLocale();
  const tCommon = useTranslations('common');
  const tShell = useTranslations('shell');
  const count = demoNotifications.length;

  return (
    <Dropdown
      contentClassName="w-80"
      trigger={
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-sunken hover:text-foreground"
          aria-label={tCommon('notifications')}
        >
          <Bell className="h-5 w-5" aria-hidden />
          {count > 0 ? (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-surface" />
          ) : null}
        </button>
      }
    >
      {() => (
        <div>
          <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
            <span className="text-sm font-semibold text-foreground">
              {tCommon('notifications')}
            </span>
            <span className="rounded-full bg-surface-sunken px-1.5 py-0.5 text-xs text-muted-foreground">
              {count}
            </span>
          </div>
          <ul className="max-h-80 overflow-auto">
            {demoNotifications.map((n) => (
              <li key={n.id} className="flex gap-2.5 px-3 py-2.5 hover:bg-surface-sunken">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotTone[n.tone]}`} />
                <div className="min-w-0">
                  <p className="text-sm text-foreground">{n.title[locale]}</p>
                  <p className="mt-0.5 text-xs text-muted">{n.time[locale]}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-border px-3 py-2 text-center text-xs text-muted">
            {tShell('demoSession')}
          </div>
        </div>
      )}
    </Dropdown>
  );
}
