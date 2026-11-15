'use client';

import Link from 'next/link';
import { LogOut, Settings as SettingsIcon, UserRound } from 'lucide-react';
import { ROLE_DEFINITIONS, Role } from '@simcbp/types';
import { Dropdown } from '@/components/ui/dropdown';
import { useLocale, useTranslations } from '@/lib/i18n/provider';

const itemClass =
  'flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-surface-sunken';

// Demo identity only — real authenticated users arrive in Phase 2 (M11/IAM).
const DEMO_USER = { name: 'Demo Administrator', initials: 'DA', role: Role.SYSTEM_ADMIN };

export function UserMenu() {
  const locale = useLocale();
  const tShell = useTranslations('shell');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const roleDef = ROLE_DEFINITIONS[DEMO_USER.role];
  const roleLabel = locale === 'bn' ? roleDef.labelBn : roleDef.labelEn;

  return (
    <Dropdown
      trigger={
        <button
          type="button"
          className="flex items-center gap-2 rounded-md py-1 pl-1 pr-2 transition-colors hover:bg-surface-sunken"
          aria-label={DEMO_USER.name}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {DEMO_USER.initials}
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-medium leading-tight text-foreground">
              {DEMO_USER.name}
            </span>
            <span className="block text-xs leading-tight text-muted-foreground">{roleLabel}</span>
          </span>
        </button>
      }
    >
      {({ close }) => (
        <div>
          <div className="border-b border-border px-3 py-2.5">
            <p className="text-sm font-medium text-foreground">{DEMO_USER.name}</p>
            <p className="text-xs text-muted-foreground">{roleLabel}</p>
          </div>
          <Link href="/administration" onClick={close} className={itemClass}>
            <UserRound className="h-4 w-4" aria-hidden />
            {tNav('administration')}
          </Link>
          <Link href="/settings" onClick={close} className={itemClass}>
            <SettingsIcon className="h-4 w-4" aria-hidden />
            {tNav('settings')}
          </Link>
          <Link href="/login" onClick={close} className={`${itemClass} border-t border-border`}>
            <LogOut className="h-4 w-4" aria-hidden />
            {tCommon('signOut')}
          </Link>
          <div className="border-t border-border px-3 py-2 text-xs text-muted">
            {tShell('demoSession')}
          </div>
        </div>
      )}
    </Dropdown>
  );
}
