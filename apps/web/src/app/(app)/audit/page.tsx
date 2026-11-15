'use client';

import { ShieldCheck } from 'lucide-react';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { DataTable, type Column } from '@/components/ui/data-table';
import { tx } from '@/lib/mock/common';
import { auditLog, type AuditEntry } from '@/lib/mock/admin';

export default function AuditPage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const _ = bi(locale);

  const cols: Column<AuditEntry>[] = [
    {
      key: 'time',
      header: _({ en: 'Timestamp', bn: 'সময়' }),
      render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.time}</span>,
      sortValue: (r) => r.time,
    },
    {
      key: 'actor',
      header: _({ en: 'Actor', bn: 'ব্যবহারকারী' }),
      render: (r) => <span className="font-medium">{r.actor}</span>,
      sortValue: (r) => r.actor,
    },
    {
      key: 'action',
      header: _({ en: 'Action', bn: 'পদক্ষেপ' }),
      render: (r) => tx(r.action, locale),
    },
    {
      key: 'entity',
      header: _({ en: 'Entity', bn: 'সত্তা' }),
      render: (r) => <span className="font-mono text-xs">{r.entity}</span>,
    },
    {
      key: 'ip',
      header: 'IP',
      render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.ip}</span>,
    },
  ];

  return (
    <div>
      <PageHeader
        title={_({ en: 'Audit Log & Activity Monitoring', bn: 'অডিট লগ ও কার্যক্রম পরিবীক্ষণ' })}
        description={_({
          en: 'Tamper-evident record of privileged actions (X1).',
          bn: 'বিশেষাধিকারপ্রাপ্ত পদক্ষেপের টেম্পার-এভিডেন্ট রেকর্ড (X1)।',
        })}
      />
      <DemoBanner message={tc('demoData')} />
      <div className="mb-4 flex items-center gap-2 rounded-md border-l-2 border-success bg-success-soft px-4 py-2.5 text-sm text-foreground">
        <ShieldCheck className="h-4 w-4 shrink-0 text-success" aria-hidden />
        {_({
          en: 'Audit records are append-only and hash-chained; entries cannot be edited or deleted.',
          bn: 'অডিট রেকর্ড শুধু-সংযোজন ও হ্যাশ-চেইনড; এন্ট্রি সম্পাদন বা মোছা যায় না।',
        })}
      </div>
      <Card>
        <DataTable
          columns={cols}
          data={auditLog}
          rowKey={(r) => r.id}
          searchable
          searchText={(r) => `${r.actor} ${r.action.en} ${r.entity}`}
          searchPlaceholder={_({ en: 'Search audit log…', bn: 'অডিট লগ খুঁজুন…' })}
          pageSize={12}
        />
      </Card>
    </div>
  );
}
