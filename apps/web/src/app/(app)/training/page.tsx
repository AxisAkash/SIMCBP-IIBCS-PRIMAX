'use client';

import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { MiniStat } from '@/components/ui/mini-stat';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatusCell } from '@/components/ui/status-cell';
import { ProgressBar } from '@/components/ui/feedback';
import { trainingStatus } from '@/lib/statuses';
import { tx } from '@/lib/mock/common';
import { formatNumber } from '@/lib/format';
import { trainings, type TrainingProgramme } from '@/lib/mock/operations';

export default function TrainingPage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const _ = bi(locale);

  const completed = trainings.filter((t) => t.status === 'completed').length;
  const ongoing = trainings.filter((t) => t.status === 'ongoing').length;
  const planned = trainings.filter((t) => t.status === 'planned').length;
  const totalParticipants = trainings.reduce((s, t) => s + t.participants, 0);

  const cols: Column<TrainingProgramme>[] = [
    {
      key: 'id',
      header: _({ en: 'Code', bn: 'কোড' }),
      render: (r) => <span className="font-mono text-xs">{r.id}</span>,
    },
    {
      key: 'title',
      header: _({ en: 'Programme', bn: 'প্রোগ্রাম' }),
      render: (r) => <span className="font-medium">{tx(r.title, locale)}</span>,
      sortValue: (r) => r.title.en,
    },
    { key: 'venue', header: _({ en: 'Venue', bn: 'ভেন্যু' }), render: (r) => tx(r.venue, locale) },
    {
      key: 'date',
      header: _({ en: 'Date', bn: 'তারিখ' }),
      render: (r) => <span className="tabular-nums text-muted-foreground">{r.date}</span>,
      sortValue: (r) => r.date,
    },
    {
      key: 'fill',
      header: _({ en: 'Participants', bn: 'অংশগ্রহণকারী' }),
      render: (r) => (
        <div className="min-w-[120px]">
          <div className="mb-1 flex justify-between text-xs">
            <span className="tabular-nums">
              {formatNumber(r.participants, locale)}/{formatNumber(r.capacity, locale)}
            </span>
          </div>
          <ProgressBar value={(r.participants / r.capacity) * 100} tone="brand" className="h-1.5" />
        </div>
      ),
      sortValue: (r) => r.participants,
    },
    {
      key: 'status',
      header: _({ en: 'Status', bn: 'অবস্থা' }),
      render: (r) => <StatusCell meta={trainingStatus[r.status]} locale={locale} />,
      sortValue: (r) => r.status,
    },
  ];

  return (
    <div>
      <PageHeader
        title={_({ en: 'Training Management', bn: 'প্রশিক্ষণ ব্যবস্থাপনা' })}
        description={_({
          en: 'Programmes, scheduling, participation and certification (M04).',
          bn: 'প্রোগ্রাম, সময়সূচি, অংশগ্রহণ ও সনদায়ন (M04)।',
        })}
      />
      <DemoBanner message={tc('demoData')} />
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MiniStat
          label={_({ en: 'Completed', bn: 'সম্পন্ন' })}
          value={formatNumber(completed, locale)}
          tone="success"
        />
        <MiniStat
          label={_({ en: 'Ongoing', bn: 'চলমান' })}
          value={formatNumber(ongoing, locale)}
          tone="info"
        />
        <MiniStat
          label={_({ en: 'Planned', bn: 'পরিকল্পিত' })}
          value={formatNumber(planned, locale)}
          tone="neutral"
        />
        <MiniStat
          label={_({ en: 'Participants', bn: 'অংশগ্রহণকারী' })}
          value={formatNumber(totalParticipants, locale)}
          tone="brand"
        />
      </div>
      <Card>
        <DataTable
          columns={cols}
          data={trainings}
          rowKey={(r) => r.id}
          searchable
          searchText={(r) => `${r.id} ${r.title.en} ${r.venue.en}`}
          searchPlaceholder={_({ en: 'Search programmes…', bn: 'প্রোগ্রাম খুঁজুন…' })}
        />
      </Card>
    </div>
  );
}
