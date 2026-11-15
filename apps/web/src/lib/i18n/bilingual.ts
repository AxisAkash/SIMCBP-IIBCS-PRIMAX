import type { Locale } from '@simcbp/i18n';

export interface BiText {
  en: string;
  bn: string;
}

/**
 * Curried bilingual picker for feature-local labels:
 *   const _ = bi(locale);
 *   _({ en: 'Beneficiaries', bn: 'উপকারভোগী' })
 *
 * Shared/navigation strings live in @simcbp/i18n catalogs; screen-specific
 * labels are co-located with their screen and still fully bilingual.
 */
export function bi(locale: Locale): (text: BiText) => string {
  return (text: BiText) => text[locale];
}
