'use client';

import { BookOpen } from 'lucide-react';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MiniStat } from '@/components/ui/mini-stat';
import { Badge } from '@/components/ui/badge';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatusCell } from '@/components/ui/status-cell';
import { ticketStatus } from '@/lib/statuses';
import type { StatusTone } from '@simcbp/design-tokens';
import { tx } from '@/lib/mock/common';
import { formatNumber } from '@/lib/format';
import { tickets, type Ticket } from '@/lib/mock/admin';

const priTone: Record<string, StatusTone> = { high: 'danger', medium: 'warning', low: 'neutral' };

export default function HelpdeskPage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const _ = bi(locale);
  const count = (s: string) => tickets.filter((t) => t.status === s).length;

  const kb = [
    { en: 'Updating beneficiary bank/MFS details', bn: 'উপকারভোগীর ব্যাংক/এমএফএস তথ্য হালনাগাদ' },
    { en: 'Resolving failed disbursements', bn: 'ব্যর্থ বিতরণ সমাধান' },
    { en: 'Grievance escalation SOP', bn: 'অভিযোগ এস্কেলেশন এসওপি' },
    { en: 'Referral to health & nutrition services', bn: 'স্বাস্থ্য ও পুষ্টি সেবায় রেফারেল' },
  ];

  const cols: Column<Ticket>[] = [
    {
      key: 'id',
      header: _({ en: 'Ticket', bn: 'টিকিট' }),
      render: (r) => <span className="font-mono text-xs">{r.id}</span>,
    },
    {
      key: 'subject',
      header: _({ en: 'Subject', bn: 'বিষয়' }),
      render: (r) => <span className="font-medium">{tx(r.subject, locale)}</span>,
      sortValue: (r) => r.subject.en,
    },
    {
      key: 'channel',
      header: _({ en: 'Channel', bn: 'চ্যানেল' }),
      render: (r) => <span className="text-muted-foreground">{r.channel}</span>,
    },
    {
      key: 'priority',
      header: _({ en: 'Priority', bn: 'অগ্রাধিকার' }),
      render: (r) => <Badge tone={priTone[r.priority]}>{r.priority}</Badge>,
      sortValue: (r) => r.priority,
    },
    {
      key: 'sla',
      header: 'SLA',
      align: 'right',
      render: (r) => <span className="tabular-nums text-muted-foreground">{r.sla}</span>,
    },
    {
      key: 'status',
      header: _({ en: 'Status', bn: 'অবস্থা' }),
      render: (r) => <StatusCell meta={ticketStatus[r.status]} locale={locale} />,
      sortValue: (r) => r.status,
    },
  ];

  return (
    <div>
      <PageHeader
        title={_({ en: 'Helpdesk & Referral', bn: 'হেল্পডেস্ক ও রেফারেল' })}
        description={_({
          en: 'Helpline, ticketing, SLA tracking and knowledge base (M12).',
          bn: 'হেল্পলাইন, টিকিটিং, এসএলএ ট্র্যাকিং ও নলেজ বেস (M12)।',
        })}
      />
      <DemoBanner message={tc('demoData')} />
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MiniStat
          label={_({ en: 'New', bn: 'নতুন' })}
          value={formatNumber(count('new'), locale)}
          tone="info"
        />
        <MiniStat
          label={_({ en: 'Assigned', bn: 'বরাদ্দকৃত' })}
          value={formatNumber(count('assigned'), locale)}
          tone="brand"
        />
        <MiniStat
          label={_({ en: 'Pending', bn: 'অপেক্ষমাণ' })}
          value={formatNumber(count('pending'), locale)}
          tone="warning"
        />
        <MiniStat
          label={_({ en: 'Resolved', bn: 'নিষ্পন্ন' })}
          value={formatNumber(count('resolved'), locale)}
          tone="success"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title={_({ en: 'Ticket directory', bn: 'টিকিট ডিরেক্টরি' })} />
          <CardContent className="p-0">
            <DataTable
              columns={cols}
              data={tickets}
              rowKey={(r) => r.id}
              searchable
              searchText={(r) => `${r.id} ${r.subject.en} ${r.channel}`}
              searchPlaceholder={_({ en: 'Search tickets…', bn: 'টিকিট খুঁজুন…' })}
              pageSize={8}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title={_({ en: 'Knowledge base', bn: 'নলেজ বেস' })} />
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {kb.map((a, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 px-5 py-3 text-sm hover:bg-surface-sunken"
                >
                  <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  {_(a)}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
