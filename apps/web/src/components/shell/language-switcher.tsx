'use client';

import { useRouter } from 'next/navigation';
import { Check, Languages } from 'lucide-react';
import { LOCALES, LOCALE_META } from '@simcbp/i18n';
import { LOCALE_COOKIE } from '@/lib/i18n/constants';
import { useLocale } from '@/lib/i18n/provider';
import { Dropdown, DropdownItem } from '@/components/ui/dropdown';

export function LanguageSwitcher() {
  const router = useRouter();
  const current = useLocale();

  function choose(locale: string) {
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
    router.refresh();
  }

  return (
    <Dropdown
      trigger={
        <button
          type="button"
          className="flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-surface-sunken hover:text-foreground"
          aria-label="Language"
        >
          <Languages className="h-4 w-4" aria-hidden />
          <span className="font-medium uppercase">{current}</span>
        </button>
      }
    >
      {({ close }) =>
        LOCALES.map((locale) => (
          <DropdownItem
            key={locale}
            active={locale === current}
            onClick={() => {
              choose(locale);
              close();
            }}
          >
            <span className="flex-1">{LOCALE_META[locale].labelNative}</span>
            {locale === current ? <Check className="h-4 w-4" aria-hidden /> : null}
          </DropdownItem>
        ))
      }
    </Dropdown>
  );
}
