'use client';

import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { findActiveItem } from './nav-config';
import { GlobalSearch } from './global-search';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';
import { NotificationsMenu } from './notifications-menu';
import { UserMenu } from './user-menu';
import { Breadcrumbs, type Crumb } from '@/components/ui/breadcrumbs';
import { useTranslations } from '@/lib/i18n/provider';

function titleCase(slug: string): string {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

export function Topbar({ onOpenMobile }: { onOpenMobile: () => void }) {
  const pathname = usePathname();
  const tNav = useTranslations('nav');
  const tShell = useTranslations('shell');
  const active = findActiveItem(pathname);

  const crumbs: Crumb[] = [{ label: tNav('dashboard'), href: '/dashboard' }];
  if (active && active.href !== '/dashboard') {
    crumbs.push({ label: tNav(active.key) });
  } else if (!active) {
    const slug = pathname.split('/').filter(Boolean)[0] ?? '';
    if (slug) crumbs.push({ label: titleCase(slug) });
  }

  return (
    <header className="sticky top-0 z-header flex h-14 items-center gap-3 border-b border-border bg-surface px-3 sm:px-4">
      <button
        type="button"
        onClick={onOpenMobile}
        aria-label={tShell('openMenu')}
        className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-surface-sunken hover:text-foreground lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      <div className="hidden min-w-0 md:block">
        <Breadcrumbs items={crumbs} />
      </div>

      <div className="flex flex-1 justify-center px-2">
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <LanguageSwitcher />
        <NotificationsMenu />
        <div className="mx-1 hidden h-6 w-px bg-border sm:block" />
        <UserMenu />
      </div>
    </header>
  );
}
