import { cookies } from 'next/headers';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@simcbp/i18n';
import { LOCALE_COOKIE } from './constants';

/** Read the active locale from the request cookie (server components only). */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return value && isLocale(value) ? value : DEFAULT_LOCALE;
}
