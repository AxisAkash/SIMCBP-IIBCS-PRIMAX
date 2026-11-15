'use client';

import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTranslations } from '@/lib/i18n/provider';

type Theme = 'light' | 'dark' | 'system';
const ORDER: Theme[] = ['light', 'dark', 'system'];

function applyTheme(theme: Theme) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = theme === 'dark' || (theme === 'system' && prefersDark);
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
}

export function ThemeToggle() {
  const t = useTranslations('shell');
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored && ORDER.includes(stored)) setTheme(stored);
  }, []);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]!;
    localStorage.setItem('theme', next);
    applyTheme(next);
    setTheme(next);
  }

  const label =
    theme === 'light' ? t('themeLight') : theme === 'dark' ? t('themeDark') : t('themeSystem');

  return (
    <button
      type="button"
      onClick={cycle}
      title={`${t('theme')}: ${label}`}
      aria-label={`${t('theme')}: ${label}`}
      className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-sunken hover:text-foreground"
    >
      {theme === 'light' ? (
        <Sun className="h-5 w-5" aria-hidden />
      ) : theme === 'dark' ? (
        <Moon className="h-5 w-5" aria-hidden />
      ) : (
        <Monitor className="h-5 w-5" aria-hidden />
      )}
    </button>
  );
}
