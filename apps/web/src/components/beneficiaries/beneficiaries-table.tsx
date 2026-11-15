'use client';

import { useRouter } from 'next/navigation';
import type { Locale } from '@simcbp/i18n';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatusCell } from '@/components/ui/status-cell';
import { applicationStatus } from '@/lib/statuses';
import { tx } from '@/lib/mock/common';
import { bi } from '@/lib/i18n/bilingual';
import type { Beneficiary } from '@/lib/mock/beneficiaries';

export function BeneficiariesTable({ rows, locale }: { rows: Beneficiary[]; locale: Locale }) {
  const router = useRouter();
  const _ = bi(locale);

  const columns: Column<Beneficiary>[] = [
    {
      key: 'id',
      header: _({ en: 'ID', bn: 'আইডি' }),
      render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.id}</span>,
      sortValue: (r) => r.serial,
    },
    {
      key: 'name',
      header: _({ en: 'Name', bn: 'নাম' }),
      render: (r) => <span className="font-medium">{tx(r.name, locale)}</span>,
      sortValue: (r) => r.name.en,
    },
    {
      key: 'nid',
      header: _({ en: 'NID', bn: 'এনআইডি' }),
      render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.nid}</span>,
    },
    {
      key: 'location',
      header: _({ en: 'Location', bn: 'অবস্থান' }),
      render: (r) => (
        <span className="text-muted-foreground">
          {tx(r.upazila, locale)}, {tx(r.division, locale)}
        </span>
      ),
      sortValue: (r) => r.division.en,
    },
    {
      key: 'status',
      header: _({ en: 'Status', bn: 'অবস্থা' }),
      render: (r) => <StatusCell meta={applicationStatus[r.status]} locale={locale} />,
      sortValue: (r) => r.status,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={rows}
      rowKey={(r) => r.id}
      searchable
      searchText={(r) => `${r.id} ${r.name.en} ${r.name.bn} ${r.union.en}`}
      searchPlaceholder={_({ en: 'Search by name or ID…', bn: 'নাম বা আইডি দিয়ে খুঁজুন…' })}
      onRowClick={(r) => router.push(`/beneficiaries/${r.id}`)}
      emptyTitle={_({ en: 'No beneficiaries', bn: 'কোনো উপকারভোগী নেই' })}
      labels={{
        page: _({ en: 'Page', bn: 'পৃষ্ঠা' }),
        of: _({ en: 'of', bn: '/' }),
        prev: _({ en: 'Prev', bn: 'পূর্ববর্তী' }),
        next: _({ en: 'Next', bn: 'পরবর্তী' }),
      }}
    />
  );
}
