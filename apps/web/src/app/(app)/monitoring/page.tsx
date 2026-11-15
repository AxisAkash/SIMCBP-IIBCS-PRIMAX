'use client';

import { FileDown } from 'lucide-react';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MiniStat } from '@/components/ui/mini-stat';
import { Button } from '@/components/ui/button';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { BarList } from '@/components/dashboard/bar-list';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ProgressBar } from '@/components/ui/feedback';
import { useToast } from '@/components/ui/toast';
import { tx } from '@/lib/mock/common';
import { formatNumber, formatCompact } from '@/lib/format';
import { divisionCoverage, reports, totalBeneficiaries, type ReportDef } from '@/lib/mock/platform';
import type { DemoBar } from '@/lib/demo-data';

export default function MonitoringPage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const toast = useToast();
  const _ = bi(locale);

  const byDivision: DemoBar[] = divisionCoverage.map((d) => ({
    label: d.division,
    value: d.beneficiaries,
    tone: 'brand',
  }));
  const avgCoverage = Math.round(
    divisionCoverage.reduce((s, d) => s + d.coverage, 0) / divisionCoverage.length,
  );

  const cols: Column<ReportDef>[] = [
    {
      key: 'id',
      header: _({ en: 'ID', bn: 'আইডি' }),
      render: (r) => <span className="font-mono text-xs">{r.id}</span>,
    },
    {
      key: 'name',
      header: _({ en: 'Report', bn: 'প্রতিবেদন' }),
      render: (r) => <span className="font-medium">{tx(r.name, locale)}</span>,
      sortValue: (r) => r.name.en,
    },
    {
      key: 'cat',
      header: _({ en: 'Category', bn: 'বিভাগ' }),
      render: (r) => <span className="text-muted-foreground">{tx(r.category, locale)}</span>,
    },
    {
      key: 'sched',
      header: _({ en: 'Schedule', bn: 'সময়সূচি' }),
      render: (r) => tx(r.schedule, locale),
    },
    {
      key: 'last',
      header: _({ en: 'Last run', bn: 'সর্বশেষ' }),
      render: (r) => <span className="tabular-nums text-muted-foreground">{r.lastRun}</span>,
      sortValue: (r) => r.lastRun,
    },
    {
      key: 'act',
      header: '',
      align: 'right',
      render: () => (
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<FileDown className="h-3.5 w-3.5" />}
          onClick={() =>
            toast.toast({
              title: _({ en: 'Export started', bn: 'রপ্তানি শুরু' }),
              description: _({ en: 'Demo only.', bn: 'শুধু ডেমো।' }),
              tone: 'info',
            })
          }
        >
          {_({ en: 'Export', bn: 'রপ্তানি' })}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title={_({ en: 'Monitoring & Reporting', bn: 'পরিবীক্ষণ ও প্রতিবেদন' })}
        description={_({
          en: 'Programme KPIs, analytics and scheduled reports (M07).',
          bn: 'কর্মসূচি কেপিআই, বিশ্লেষণ ও নির্ধারিত প্রতিবেদন (M07)।',
        })}
      />
      <DemoBanner message={tc('demoData')} />
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MiniStat
          label={_({ en: 'Total beneficiaries', bn: 'মোট উপকারভোগী' })}
          value={formatCompact(totalBeneficiaries, locale)}
          tone="brand"
        />
        <MiniStat
          label={_({ en: 'Avg. coverage', bn: 'গড় কভারেজ' })}
          value={`${avgCoverage}%`}
          tone="success"
        />
        <MiniStat
          label={_({ en: 'Active reports', bn: 'সক্রিয় প্রতিবেদন' })}
          value={formatNumber(reports.length, locale)}
          tone="info"
        />
        <MiniStat
          label={_({ en: 'Divisions', bn: 'বিভাগ' })}
          value={formatNumber(divisionCoverage.length, locale)}
          tone="neutral"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader
            title={_({ en: 'Beneficiaries by division', bn: 'বিভাগ অনুযায়ী উপকারভোগী' })}
          />
          <CardContent>
            <BarList items={byDivision} locale={locale} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title={_({ en: 'Coverage by division', bn: 'বিভাগ অনুযায়ী কভারেজ' })} />
          <CardContent className="space-y-3">
            {divisionCoverage.map((d, i) => (
              <div key={i}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{tx(d.division, locale)}</span>
                  <span className="tabular-nums text-muted-foreground">{d.coverage}%</span>
                </div>
                <ProgressBar
                  value={d.coverage}
                  tone={d.coverage >= 80 ? 'success' : d.coverage >= 70 ? 'brand' : 'warning'}
                  className="h-1.5"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader title={_({ en: 'Scheduled reports', bn: 'নির্ধারিত প্রতিবেদন' })} />
        <CardContent className="p-0">
          <DataTable columns={cols} data={reports} rowKey={(r) => r.id} />
        </CardContent>
      </Card>
    </div>
  );
}
