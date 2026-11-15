'use client';

import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MiniStat } from '@/components/ui/mini-stat';
import { Badge } from '@/components/ui/badge';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { ProgressBar } from '@/components/ui/feedback';
import { tx } from '@/lib/mock/common';
import { backups, jobs } from '@/lib/mock/admin';

export default function SystemAdminPage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const _ = bi(locale);

  const resources = [
    { label: _({ en: 'CPU', bn: 'সিপিইউ' }), value: 38, tone: 'success' as const },
    { label: _({ en: 'Memory', bn: 'মেমরি' }), value: 61, tone: 'brand' as const },
    { label: _({ en: 'Storage', bn: 'স্টোরেজ' }), value: 72, tone: 'warning' as const },
    { label: _({ en: 'DB connections', bn: 'ডিবি সংযোগ' }), value: 44, tone: 'info' as const },
  ];

  return (
    <div>
      <PageHeader
        title={_({ en: 'System Administration', bn: 'সিস্টেম প্রশাসন' })}
        description={_({
          en: 'Monitoring, scheduled jobs and backup (X3).',
          bn: 'পরিবীক্ষণ, নির্ধারিত জব ও ব্যাকআপ (X3)।',
        })}
      />
      <DemoBanner message={tc('demoData')} />
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MiniStat
          label={_({ en: 'Uptime (30d)', bn: 'আপটাইম (৩০দি)' })}
          value="99.96%"
          tone="success"
        />
        <MiniStat
          label={_({ en: 'Avg. API latency', bn: 'গড় এপিআই ল্যাটেন্সি' })}
          value="412ms"
          tone="info"
        />
        <MiniStat label={_({ en: 'RPO', bn: 'আরপিও' })} value="< 24h" tone="brand" />
        <MiniStat label={_({ en: 'RTO', bn: 'আরটিও' })} value="< 48h" tone="brand" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title={_({ en: 'Resource utilization', bn: 'রিসোর্স ব্যবহার' })} />
          <CardContent className="space-y-3">
            {resources.map((r, i) => (
              <div key={i}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{r.label}</span>
                  <span className="tabular-nums text-muted-foreground">{r.value}%</span>
                </div>
                <ProgressBar value={r.value} tone={r.tone} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={_({ en: 'Scheduled jobs', bn: 'নির্ধারিত জব' })} />
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {jobs.map((j, i) => (
                <li key={i} className="flex items-center justify-between px-5 py-3 text-sm">
                  <span>{tx(j.name, locale)}</span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{j.schedule}</span>
                    <Badge tone={j.status === 'success' ? 'success' : 'warning'}>{j.status}</Badge>
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={_({ en: 'Recent backups', bn: 'সাম্প্রতিক ব্যাকআপ' })} />
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {backups.map((b) => (
                <li key={b.id} className="flex items-center justify-between px-5 py-3 text-sm">
                  <span>
                    <span className="font-mono text-xs">{b.id}</span>
                    <span className="ml-2 text-muted-foreground">
                      {b.type} · {b.size}
                    </span>
                  </span>
                  <Badge tone={b.status === 'success' ? 'success' : 'warning'}>{b.status}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
