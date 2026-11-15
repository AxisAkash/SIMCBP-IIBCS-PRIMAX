import { messages, DEFAULT_LOCALE, type Locale } from '@simcbp/i18n';

export type Messages = (typeof messages)[Locale];

/** Full message bundle for a locale (all namespaces), falling back to default. */
export function getMessages(locale: Locale): Messages {
  return messages[locale] ?? messages[DEFAULT_LOCALE];
}

/** Build a namespaced translator usable in server components. */
export function createTranslator(bundle: Messages, namespace?: string): (key: string) => string {
  return (key: string) =>
    resolvePath(bundle, namespace ? `common.${namespace}.${key}` : `common.${key}`);
}

/** Resolve a dot-path (e.g. "nav.dashboard") within an object; returns the key on miss. */
export function resolvePath(source: unknown, path: string): string {
  const value = path.split('.').reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === 'object' && segment in acc) {
      return (acc as Record<string, unknown>)[segment];
    }
    return undefined;
  }, source);
  return typeof value === 'string' ? value : path;
}
