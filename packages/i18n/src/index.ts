/**
 * @simcbp/i18n — localization framework (X5).
 *
 * Message catalogs are plain JSON namespaces under `src/locales/<locale>/`.
 * The web app wires these into its i18n runtime; this package owns the catalog
 * source-of-truth, locale metadata, and parity tooling.
 */

export { LOCALES, DEFAULT_LOCALE, LOCALE_META, isLocale } from './config';
export type { Locale, LocaleMeta } from './config';

import enCommon from './locales/en/common.json' with { type: 'json' };
import bnCommon from './locales/bn/common.json' with { type: 'json' };
import type { Locale } from './config';

/** Flat registry of bundled namespaces per locale. */
export const messages = {
  en: { common: enCommon },
  bn: { common: bnCommon },
} as const satisfies Record<Locale, Record<string, unknown>>;

export type MessageNamespace = keyof (typeof messages)['en'];
