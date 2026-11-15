'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface TabItem {
  key: string;
  label: ReactNode;
  content: ReactNode;
}

export function Tabs({ items, defaultKey }: { items: TabItem[]; defaultKey?: string }) {
  const [active, setActive] = useState(defaultKey ?? items[0]?.key ?? '');
  const current = items.find((i) => i.key === active) ?? items[0];

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-border" role="tablist">
        {items.map((it) => {
          const isActive = it.key === active;
          return (
            <button
              key={it.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(it.key)}
              className={cn(
                '-mb-px whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {it.label}
            </button>
          );
        })}
      </div>
      <div className="pt-5">{current?.content}</div>
    </div>
  );
}
