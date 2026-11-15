'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { NAV_GROUPS, findActiveItem } from './nav-config';
import { ProductIdentity, VendorCredit } from './logo';
import { useTranslations } from '@/lib/i18n/provider';
import { cn } from '@/lib/cn';

export function Sidebar({
  collapsed = false,
  onToggleCollapse,
  onNavigate,
}: {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const tNav = useTranslations('nav');
  const tGroups = useTranslations('navGroups');
  const tShell = useTranslations('shell');
  const active = findActiveItem(pathname);

  return (
    <aside className="flex h-full w-full flex-col bg-surface">
      {/* Header: product identity + desktop collapse toggle */}
      <div
        className={cn(
          'flex h-14 items-center border-b border-border px-3',
          collapsed ? 'justify-center' : 'justify-between',
        )}
      >
        <ProductIdentity collapsed={collapsed} />
        {onToggleCollapse && !collapsed ? (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={tShell('collapseSidebar')}
            className="hidden h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-surface-sunken hover:text-foreground lg:flex"
          >
            <PanelLeftClose className="h-4 w-4" aria-hidden />
          </button>
        ) : null}
      </div>

      {/* Navigation */}
      <nav className="scrollbar-thin flex-1 overflow-y-auto px-2 py-3">
        {collapsed && onToggleCollapse ? (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={tShell('expandSidebar')}
            className="mx-auto mb-2 hidden h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-surface-sunken hover:text-foreground lg:flex"
          >
            <PanelLeftOpen className="h-4 w-4" aria-hidden />
          </button>
        ) : null}

        {NAV_GROUPS.map((group) => (
          <div key={group.key} className="mb-4 last:mb-0">
            {!collapsed ? (
              <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
                {tGroups(group.key)}
              </p>
            ) : (
              <div className="mx-auto mb-1.5 h-px w-6 bg-border" aria-hidden />
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = active?.href === item.href;
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      title={collapsed ? tNav(item.key) : undefined}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'group flex items-center gap-2.5 rounded-md px-2 py-2 text-sm font-medium transition-colors',
                        collapsed && 'justify-center',
                        isActive
                          ? 'bg-primary-subtle text-primary'
                          : 'text-muted-foreground hover:bg-surface-sunken hover:text-foreground',
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" aria-hidden />
                      {!collapsed ? <span className="truncate">{tNav(item.key)}</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer: vendor credit */}
      <div className="border-t border-border p-3">
        <VendorCredit collapsed={collapsed} />
      </div>
    </aside>
  );
}
