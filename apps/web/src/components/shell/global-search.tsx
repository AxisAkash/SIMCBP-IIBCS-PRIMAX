'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { ALL_NAV_ITEMS } from './nav-config';
import { useTranslations } from '@/lib/i18n/provider';

export function GlobalSearch() {
  const router = useRouter();
  const tNav = useTranslations('nav');
  const tShell = useTranslations('shell');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);

  const items = useMemo(() => ALL_NAV_ITEMS.map((i) => ({ ...i, label: tNav(i.key) })), [tNav]);
  const results = q
    ? items.filter((i) => i.label.toLowerCase().includes(q.trim().toLowerCase()))
    : [];

  function go(href: string) {
    router.push(href);
    setQ('');
    setOpen(false);
  }

  return (
    <form
      className="relative w-full max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        if (results[0]) go(results[0].href);
      }}
    >
      <Search
        className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden
      />
      <input
        type="search"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        placeholder={tShell('searchPlaceholder')}
        aria-label={tShell('searchPlaceholder')}
        className="h-9 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
      />
      {open && q ? (
        <div className="absolute left-0 right-0 z-dropdown mt-1.5 overflow-hidden rounded-md border border-border bg-surface-raised shadow-overlay">
          {results.length ? (
            results.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.key}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => go(r.href)}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-surface-sunken"
                >
                  <Icon className="h-4 w-4 text-muted" aria-hidden />
                  {r.label}
                </button>
              );
            })
          ) : (
            <p className="px-3 py-3 text-sm text-muted">{tShell('noResults')}</p>
          )}
        </div>
      ) : null}
    </form>
  );
}
