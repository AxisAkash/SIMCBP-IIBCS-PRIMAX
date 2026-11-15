'use client';

import { useLocale } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MiniStat } from '@/components/ui/mini-stat';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatusCell } from '@/components/ui/status-cell';
import { integrationStatus } from '@/lib/statuses';
import { tx } from '@/lib/mock/common';
import { formatNumber } from '@/lib/format';
import { integrations, type Integration } from '@/lib/mock/platform';

export default function IntegrationPage() {
  const locale = useLocale();
  const _ = bi(locale);
  const count = (s: string) => integrations.filter((i) => i.status === s).length;

  const cols: Column<Integration>[] = [
    {
      key: 'name',
      header: _({ en: 'External system', bn: 'বহিঃসিস্টেম' }),
      render: (r) => <span className="font-medium">{tx(r.name, locale)}</span>,
      sortValue: (r) => r.name.en,
    },
    {
      key: 'key',
      header: _({ en: 'API key', bn: 'এপিআই কী' }),
      render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.apiKey}</span>,
    },
    {
      key: 'calls',
      header: _({ en: 'Calls (24h)', bn: 'কল (২৪ঘ)' }),
      align: 'right',
      render: (r) => <span className="tabular-nums">{formatNumber(r.calls24h, locale)}</span>,
      sortValue: (r) => r.calls24h,
    },
    {
      key: 'err',
      header: _({ en: 'Error rate', bn: 'ত্রুটির হার' }),
      align: 'right',
      render: (r) => <span className="tabular-nums text-muted-foreground">{r.errorRate}</span>,
    },
    {
      key: 'status',
      header: _({ en: 'Status', bn: 'অবস্থা' }),
      render: (r) => <StatusCell meta={integrationStatus[r.status]} locale={locale} />,
      sortValue: (r) => r.status,
    },
  ];

  return (
    <div>
      <PageHeader
        title={_({ en: 'Secure Data Hub & API Bank', bn: 'সুরক্ষিত ডেটা হাব ও এপিআই ব্যাংক' })}
        description={_({
          en: 'External system directory, integration status and monitoring (M06).',
          bn: 'বহিঃসিস্টেম ডিরেক্টরি, ইন্টিগ্রেশন অবস্থা ও পরিবীক্ষণ (M06)।',
        })}
      />
      <DemoBanner
        message={_({
          en: 'Demo — integrations run against sandbox/mock providers; no live government API is connected. Keys are masked.',
          bn: 'ডেমো — ইন্টিগ্রেশন স্যান্ডবক্স/মক প্রোভাইডারে চলে; কোনো লাইভ সরকারি এপিআই সংযুক্ত নয়। কী মাস্ক করা।',
        })}
      />
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MiniStat
          label={_({ en: 'Live', bn: 'সচল' })}
          value={formatNumber(count('live'), locale)}
          tone="success"
        />
        <MiniStat
          label={_({ en: 'Sandbox', bn: 'স্যান্ডবক্স' })}
          value={formatNumber(count('sandbox'), locale)}
          tone="warning"
        />
        <MiniStat
          label={_({ en: 'Pending access', bn: 'অ্যাক্সেস অপেক্ষমাণ' })}
          value={formatNumber(count('pending'), locale)}
          tone="info"
        />
        <MiniStat
          label={_({ en: 'Down', bn: 'বন্ধ' })}
          value={formatNumber(count('down'), locale)}
          tone="danger"
        />
      </div>
      <Card>
        <CardHeader
          title={_({ en: 'Integration directory', bn: 'ইন্টিগ্রেশন ডিরেক্টরি' })}
          description={_({
            en: 'Adapters with documented interfaces, retry and fallback.',
            bn: 'নথিভুক্ত ইন্টারফেস, রিট্রাই ও ফলব্যাকসহ অ্যাডাপ্টার।',
          })}
        />
        <CardContent className="p-0">
          <DataTable
            columns={cols}
            data={integrations}
            rowKey={(r) => r.id}
            searchable
            searchText={(r) => `${r.name.en} ${r.id}`}
            searchPlaceholder={_({ en: 'Search systems…', bn: 'সিস্টেম খুঁজুন…' })}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
