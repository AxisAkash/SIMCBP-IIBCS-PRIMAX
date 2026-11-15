/**
 * Localization configuration (X5). English and Bangla are first-class; English
 * is the fallback. Bangla uses a dedicated font stack and relaxed line-height
 * (see @simcbp/design-tokens typography.bangla).
 */

export const LOCALES = ['en', 'bn'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleMeta {
  readonly code: Locale;
  readonly labelEn: string;
  readonly labelNative: string;
  readonly dir: 'ltr' | 'rtl';
  readonly numeral: 'latn' | 'beng';
}

export const LOCALE_META: Readonly<Record<Locale, LocaleMeta>> = {
  en: { code: 'en', labelEn: 'English', labelNative: 'English', dir: 'ltr', numeral: 'latn' },
  bn: { code: 'bn', labelEn: 'Bangla', labelNative: 'বাংলা', dir: 'ltr', numeral: 'beng' },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
