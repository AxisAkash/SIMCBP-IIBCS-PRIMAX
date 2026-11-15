'use client';

import { HeartHandshake } from 'lucide-react';
import { BRAND, COMPANY_LOGO, PROJECT_LOGO, useOfficialAssets } from '@simcbp/branding';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { cn } from '@/lib/cn';

/**
 * Product identity for the sidebar header. Renders the official project logo
 * when supplied (drop `mcbp-project-logo.png` into `public/branding/` and set
 * `useOfficialAssets` in @simcbp/branding); otherwise a neutral placeholder mark.
 */
export function ProductIdentity({ collapsed = false }: { collapsed?: boolean }) {
  const locale = useLocale();
  const programme = locale === 'bn' ? BRAND.programmeNameBn : BRAND.programmeNameEn;

  if (useOfficialAssets) {
    return (
      <img
        src={`/branding/${PROJECT_LOGO.officialFileName}`}
        alt={locale === 'bn' ? PROJECT_LOGO.altBn : PROJECT_LOGO.altEn}
        className={cn('h-9 w-auto object-contain', collapsed && 'mx-auto')}
      />
    );
  }

  return (
    <div className={cn('flex items-center gap-2.5', collapsed && 'justify-center')}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <HeartHandshake className="h-5 w-5" aria-hidden />
      </span>
      {!collapsed ? (
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold leading-tight text-foreground">
            {BRAND.systemNameEn.split(' / ')[0]}
          </span>
          <span className="block truncate text-xs leading-tight text-muted-foreground">
            {programme}
          </span>
        </span>
      ) : null}
    </div>
  );
}

/** Vendor credit for the sidebar footer ("who made this"). */
export function VendorCredit({ collapsed = false }: { collapsed?: boolean }) {
  const locale = useLocale();
  const t = useTranslations('shell');
  if (collapsed) return null;

  if (useOfficialAssets) {
    return (
      <div className="px-1">
        <span className="mb-1 block text-[10px] uppercase tracking-wide text-muted">
          {t('developedBy')}
        </span>
        <img
          src={`/branding/${COMPANY_LOGO.officialFileName}`}
          alt={locale === 'bn' ? COMPANY_LOGO.altBn : COMPANY_LOGO.altEn}
          className="h-5 w-auto object-contain opacity-80"
        />
      </div>
    );
  }

  return (
    <div className="px-1">
      <span className="block text-[10px] uppercase tracking-wide text-muted">
        {t('developedBy')}
      </span>
      <span className="block text-xs font-medium text-muted-foreground">{BRAND.vendorEn}</span>
    </div>
  );
}
