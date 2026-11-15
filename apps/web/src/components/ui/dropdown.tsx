'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Dropdown({
  trigger,
  children,
  align = 'end',
  contentClassName,
}: {
  trigger: ReactNode;
  /** Render-prop receives a `close` callback for menu items. */
  children: (api: { close: () => void }) => ReactNode;
  align?: 'start' | 'end';
  contentClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open ? (
        <div
          role="menu"
          className={cn(
            'absolute z-dropdown mt-1.5 min-w-[13rem] overflow-hidden rounded-md border border-border bg-surface-raised shadow-overlay',
            align === 'end' ? 'right-0' : 'left-0',
            contentClassName,
          )}
        >
          {children({ close: () => setOpen(false) })}
        </div>
      ) : null}
    </div>
  );
}

export function DropdownItem({
  children,
  onClick,
  active,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-surface-sunken',
        active ? 'font-medium text-primary' : 'text-foreground',
        className,
      )}
    >
      {children}
    </button>
  );
}
