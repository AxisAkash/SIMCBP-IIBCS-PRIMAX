'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { MiniStat } from '@/components/ui/mini-stat';
import { Badge } from '@/components/ui/badge';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatusCell } from '@/components/ui/status-cell';
import { Drawer } from '@/components/ui/overlay';
import { Button } from '@/components/ui/button';
import { FormField, Select } from '@/components/ui/form';
import { DescriptionList } from '@/components/ui/feedback';
import { useToast } from '@/components/ui/toast';
import { grievanceStatus } from '@/lib/statuses';
import type { StatusTone } from '@simcbp/design-tokens';
import { tx } from '@/lib/mock/common';
import { formatNumber } from '@/lib/format';
import { grievances, type Grievance } from '@/lib/mock/operations';

const priorityTone: Record<string, StatusTone> = {
  high: 'danger',
  medium: 'warning',
  low: 'neutral',
};

export default function GrievancePage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const toast = useToast();
  const _ = bi(locale);
  const [selected, setSelected] = useState<Grievance | null>(null);

  const count = (s: string) => grievances.filter((g) => g.status === s).length;

  const cols: Column<Grievance>[] = [
    {
      key: 'id',
      header: _({ en: 'Case', bn: 'কেস' }),
      render: (r) => <span className="font-mono text-xs">{r.id}</span>,
    },
    {
      key: 'subject',
      header: _({ en: 'Subject', bn: 'বিষয়' }),
      render: (r) => <span className="font-medium">{tx(r.subject, locale)}</span>,
      sortValue: (r) => r.subject.en,
    },
    {
      key: 'category',
      header: _({ en: 'Category', bn: 'বিভাগ' }),
      render: (r) => <span className="text-muted-foreground">{tx(r.category, locale)}</span>,
    },
    {
      key: 'priority',
      header: _({ en: 'Priority', bn: 'অগ্রাধিকার' }),
      render: (r) => <Badge tone={priorityTone[r.priority]}>{r.priority}</Badge>,
      sortValue: (r) => r.priority,
    },
    {
      key: 'status',
      header: _({ en: 'Status', bn: 'অবস্থা' }),
      render: (r) => <StatusCell meta={grievanceStatus[r.status]} locale={locale} />,
      sortValue: (r) => r.status,
    },
    {
      key: 'date',
      header: _({ en: 'Filed', bn: 'দাখিল' }),
      render: (r) => <span className="tabular-nums text-muted-foreground">{r.filedOn}</span>,
      sortValue: (r) => r.filedOn,
    },
  ];

  return (
    <div>
      <PageHeader
        title={_({ en: 'Grievance Redress', bn: 'অভিযোগ নিষ্পত্তি' })}
        description={_({
          en: 'Complaint registration, case handling and feedback (M05).',
          bn: 'অভিযোগ নিবন্ধন, কেস পরিচালনা ও মতামত (M05)।',
        })}
      />
      <DemoBanner message={tc('demoData')} />
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MiniStat
          label={_({ en: 'Open', bn: 'চলমান' })}
          value={formatNumber(count('open'), locale)}
          tone="warning"
        />
        <MiniStat
          label={_({ en: 'In progress', bn: 'প্রক্রিয়াধীন' })}
          value={formatNumber(count('in_progress'), locale)}
          tone="info"
        />
        <MiniStat
          label={_({ en: 'Resolved', bn: 'নিষ্পন্ন' })}
          value={formatNumber(count('resolved'), locale)}
          tone="success"
        />
        <MiniStat
          label={_({ en: 'Escalated', bn: 'ঊর্ধ্বমুখী' })}
          value={formatNumber(count('escalated'), locale)}
          tone="danger"
        />
      </div>
      <Card>
        <DataTable
          columns={cols}
          data={grievances}
          rowKey={(r) => r.id}
          onRowClick={(r) => setSelected(r)}
          searchable
          searchText={(r) => `${r.id} ${r.subject.en} ${r.beneficiary.en}`}
          searchPlaceholder={_({ en: 'Search cases…', bn: 'কেস খুঁজুন…' })}
        />
      </Card>

      <Drawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? `${_({ en: 'Case', bn: 'কেস' })} ${selected.id}` : ''}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setSelected(null)}>
              {_({ en: 'Close', bn: 'বন্ধ' })}
            </Button>
            <Button
              size="sm"
              onClick={() => {
                toast.toast({
                  title: _({ en: 'Case updated', bn: 'কেস হালনাগাদ' }),
                  description: _({ en: 'Demo only.', bn: 'শুধু ডেমো।' }),
                  tone: 'success',
                });
                setSelected(null);
              }}
            >
              {_({ en: 'Save', bn: 'সংরক্ষণ' })}
            </Button>
          </>
        }
      >
        {selected ? (
          <div className="space-y-5">
            <DescriptionList
              items={[
                { label: _({ en: 'Subject', bn: 'বিষয়' }), value: tx(selected.subject, locale) },
                {
                  label: _({ en: 'Beneficiary', bn: 'উপকারভোগী' }),
                  value: tx(selected.beneficiary, locale),
                },
                { label: _({ en: 'Category', bn: 'বিভাগ' }), value: tx(selected.category, locale) },
                { label: _({ en: 'Assignee', bn: 'দায়িত্বপ্রাপ্ত' }), value: selected.assignee },
                { label: _({ en: 'Filed on', bn: 'দাখিলের তারিখ' }), value: selected.filedOn },
              ]}
            />
            <FormField label={_({ en: 'Update status', bn: 'অবস্থা হালনাগাদ' })}>
              <Select
                defaultValue={selected.status}
                options={Object.keys(grievanceStatus).map((k) => ({
                  value: k,
                  label: grievanceStatus[k]![locale === 'bn' ? 'bn' : 'en'],
                }))}
              />
            </FormField>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
