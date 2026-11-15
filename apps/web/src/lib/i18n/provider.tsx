'use client';

import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { LOCALE_META, type Locale } from '@simcbp/i18n';
import { resolvePath, type Messages } from './messages';

interface I18nContextValue {
  locale: Locale;
  messages: Messages;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider(props: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}): ReactNode {
  const value = useMemo(
    () => ({ locale: props.locale, messages: props.messages }),
    [props.locale, props.messages],
  );
  return <I18nContext.Provider value={value}>{props.children}</I18nContext.Provider>;
}

function useI18nContext(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslations must be used within <I18nProvider>');
  return ctx;
}

/** Translate within a namespace: `const t = useTranslations('nav'); t('dashboard')`. */
export function useTranslations(namespace?: string): (key: string) => string {
  const { messages } = useI18nContext();
  return useCallback(
    (key: string) => {
      const path = namespace ? `common.${namespace}.${key}` : `common.${key}`;
      return resolvePath(messages, path);
    },
    [messages, namespace],
  );
}

export function useLocale(): Locale {
  return useI18nContext().locale;
}

export function useLocaleMeta() {
  return LOCALE_META[useI18nContext().locale];
}
