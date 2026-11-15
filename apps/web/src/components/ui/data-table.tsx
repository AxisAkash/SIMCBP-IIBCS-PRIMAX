'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUp, ChevronsUpDown, Search } from 'lucide-react';
import { cn } from '@/lib/cn';
import { EmptyState } from './states';

export interface Column<T> {
  key: string;
  header: ReactNode;
  /** Cell renderer. */
  render: (row: T) => ReactNode;
  /** Value used for sorting; enables the sort control when provided. */
  sortValue?: (row: T) => string | number;
  align?: 'left' | 'right' | 'center';
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  /** Enables the client-side search box; matches against searchText(row). */
  searchable?: boolean;
  searchText?: (row: T) => string;
  searchPlaceholder?: string;
  pageSize?: number;
  emptyTitle?: string;
  toolbar?: ReactNode;
  labels?: { page?: string; of?: string; prev?: string; next?: string };
}

export function DataTable<T>({
  columns,
  data,
  rowKey,
  onRowClick,
  searchable = false,
  searchText,
  searchPlaceholder = 'Search…',
  pageSize = 10,
  emptyTitle = 'No records found',
  toolbar,
  labels,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (!query || !searchText) return data;
    const q = query.trim().toLowerCase();
    return data.filter((r) => searchText(r).toLowerCase().includes(q));
  }, [data, query, searchText]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortValue) return filtered;
    const getVal = col.sortValue;
    return [...filtered].sort((a, b) => {
      const av = getVal(a);
      const bv = getVal(b);
      if (av < bv) return sort.dir === 'asc' ? -1 : 1;
      if (av > bv) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filtered, sort, columns]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = Math.min(page, pageCount - 1);
  const rows = sorted.slice(current * pageSize, current * pageSize + pageSize);

  function toggleSort(key: string) {
    setPage(0);
    setSort((s) =>
      s?.key === key ? (s.dir === 'asc' ? { key, dir: 'desc' } : null) : { key, dir: 'asc' },
    );
  }

  const alignClass = { left: 'text-left', right: 'text-right', center: 'text-center' } as const;

  return (
    <div>
      {(searchable || toolbar) && (
        <div className="flex flex-col gap-2 border-b border-border p-3 sm:flex-row sm:items-center sm:justify-between">
          {searchable ? (
            <div className="relative w-full sm:max-w-xs">
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(0);
                }}
                placeholder={searchPlaceholder}
                className="h-9 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-primary"
              />
            </div>
          ) : (
            <span />
          )}
          {toolbar ? <div className="flex items-center gap-2">{toolbar}</div> : null}
        </div>
      )}

      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-sunken/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'whitespace-nowrap px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground',
                    alignClass[col.align ?? 'left'],
                  )}
                >
                  {col.sortValue ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      {col.header}
                      {sort?.key === col.key ? (
                        sort.dir === 'asc' ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-3 w-3 opacity-40" />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  'border-b border-border last:border-0',
                  onRowClick && 'cursor-pointer hover:bg-surface-sunken',
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-4 py-3 text-foreground',
                      alignClass[col.align ?? 'left'],
                      col.className,
                    )}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 ? <EmptyState title={emptyTitle} /> : null}

      {pageCount > 1 ? (
        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-sm">
          <span className="text-muted-foreground">
            {labels?.page ?? 'Page'} {current + 1} {labels?.of ?? 'of'} {pageCount}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              disabled={current === 0}
              onClick={() => setPage(current - 1)}
              className="rounded-md border border-border px-2.5 py-1 text-sm text-foreground disabled:opacity-40 enabled:hover:bg-surface-sunken"
            >
              {labels?.prev ?? 'Previous'}
            </button>
            <button
              type="button"
              disabled={current >= pageCount - 1}
              onClick={() => setPage(current + 1)}
              className="rounded-md border border-border px-2.5 py-1 text-sm text-foreground disabled:opacity-40 enabled:hover:bg-surface-sunken"
            >
              {labels?.next ?? 'Next'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
