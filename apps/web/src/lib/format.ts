import type { Locale } from '@simcbp/i18n';

const intlLocale: Record<Locale, string> = { en: 'en-US', bn: 'bn-BD' };

/** Locale-aware integer formatting (Bangla renders Bengali numerals). */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale]).format(value);
}

/** Compact form for large counts (e.g. 1.2M / ১.২M-equivalent). */
export function formatCompact(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale], {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}
