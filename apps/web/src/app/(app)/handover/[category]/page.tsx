'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, FileText, Paperclip, Upload } from 'lucide-react';
import {
  HANDOVER_CATEGORIES,
  HANDOVER_TRANSITIONS,
  canTransition,
  type HandoverStatusKey,
} from '@simcbp/types';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatusCell } from '@/components/ui/status-cell';
import { Drawer } from '@/components/ui/overlay';
import { DescriptionList } from '@/components/ui/feedback';
import { Textarea } from '@/components/ui/form';
import { useToast } from '@/components/ui/toast';
import { handoverStatus, statusLabel } from '@/lib/statuses';
import { tx } from '@/lib/mock/common';
import { deliverablesByCategory, type Deliverable } from '@/lib/mock/handover';

export default function HandoverCategoryPage() {
  const params = useParams();
  const key = String(params.category);
  const locale = useLocale();
  const tc = useTranslations('common');
  const toast = useToast();
  const _ = bi(locale);

  const category = HANDOVER_CATEGORIES.find((c) => c.key === key);
  const [rows, setRows] = useState<Deliverable[]>(() => deliverablesByCategory(key as never));
  const [sel, setSel] = useState<Deliverable | null>(null);

  const selected = useMemo(() => rows.find((r) => r.id === sel?.id) ?? null, [rows, sel]);

  if (!category) {
    return (
      <div>
        <PageHeader title={_({ en: 'Category not found', bn: 'শ্রেণি পাওয়া যায়নি' })} />
        <Link href="/handover" className="text-sm text-primary hover:underline">
          {_({ en: 'Back to handover', bn: 'হ্যান্ডওভারে ফিরুন' })}
        </Link>
      </div>
    );
  }

  function transition(id: string, to: HandoverStatusKey) {
    setRows((arr) => arr.map((r) => (r.id === id ? { ...r, status: to } : r)));
    toast.toast({
      title: `${_({ en: 'Status', bn: 'অবস্থা' })}: ${statusLabel(handoverStatus[to]!, locale)}`,
      description: _({
        en: 'Demo only — recorded with audit history.',
        bn: 'শুধু ডেমো — অডিট ইতিহাসসহ রেকর্ডকৃত।',
      }),
      tone: to === 'approved' ? 'success' : to === 'rejected' ? 'danger' : 'info',
    });
  }

  const cols: Column<Deliverable>[] = [
    {
      key: 'id',
      header: _({ en: 'ID', bn: 'আইডি' }),
      render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.id}</span>,
    },
    {
      key: 'title',
      header: _({ en: 'Deliverable', bn: 'ডেলিভারেবল' }),
      render: (r) => <span className="font-medium">{tx(r.title, locale)}</span>,
      sortValue: (r) => r.title.en,
    },
    {
      key: 'req',
      header: _({ en: 'Class', bn: 'শ্রেণি' }),
      render: (r) => (
        <Badge tone={r.required ? 'brand' : 'neutral'}>
          {r.required ? _({ en: 'Required', bn: 'আবশ্যক' }) : _({ en: 'Optional', bn: 'ঐচ্ছিক' })}
        </Badge>
      ),
      sortValue: (r) => (r.required ? 0 : 1),
    },
    {
      key: 'owner',
      header: _({ en: 'Owner', bn: 'দায়িত্ব' }),
      render: (r) => <span className="text-muted-foreground">{r.owner}</span>,
    },
    {
      key: 'evidence',
      header: _({ en: 'Evidence', bn: 'প্রমাণ' }),
      align: 'center',
      render: (r) =>
        r.evidence > 0 ? (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Paperclip className="h-3 w-3" />
            {r.evidence}
          </span>
        ) : (
          <span className="text-xs text-danger">0</span>
        ),
    },
    {
      key: 'status',
      header: _({ en: 'Status', bn: 'অবস্থা' }),
      render: (r) => <StatusCell meta={handoverStatus[r.status]} locale={locale} />,
      sortValue: (r) => r.status,
    },
  ];

  const allowedNext = selected ? HANDOVER_TRANSITIONS[selected.status as HandoverStatusKey] : [];

  return (
    <div>
      <Link
        href="/handover"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {_({ en: 'Back to handover', bn: 'হ্যান্ডওভারে ফিরুন' })}
      </Link>
      <PageHeader
        title={`${category.id} · ${locale === 'bn' ? category.titleBn : category.titleEn}`}
        description={`${rows.length} ${_({ en: 'deliverables', bn: 'ডেলিভারেবল' })} · ${rows.filter((r) => r.required).length} ${_({ en: 'required', bn: 'আবশ্যক' })}`}
      />
      <div className="mb-4 flex items-center gap-2.5 rounded-md border-l-2 border-warning bg-warning-soft px-4 py-2.5 text-sm text-foreground">
        <span>{tc('demoData')}</span>
      </div>

      <Card>
        <DataTable
          columns={cols}
          data={rows}
          rowKey={(r) => r.id}
          onRowClick={(r) => setSel(r)}
          searchable
          searchText={(r) => `${r.id} ${r.title.en}`}
          searchPlaceholder={_({ en: 'Search deliverables…', bn: 'ডেলিভারেবল খুঁজুন…' })}
          pageSize={10}
        />
      </Card>

      <Drawer
        open={selected !== null}
        onClose={() => setSel(null)}
        title={selected ? tx(selected.title, locale) : ''}
        footer={
          <div className="flex w-full flex-wrap items-center justify-end gap-2">
            {selected && allowedNext.length ? (
              allowedNext
                .filter((s) => s !== 'blocked')
                .map((to) => (
                  <Button
                    key={to}
                    size="sm"
                    variant={
                      to === 'approved' ? 'primary' : to === 'rejected' ? 'danger' : 'outline'
                    }
                    onClick={() =>
                      canTransition(selected.status as HandoverStatusKey, to) &&
                      transition(selected.id, to)
                    }
                  >
                    {statusLabel(handoverStatus[to]!, locale)}
                  </Button>
                ))
            ) : (
              <span className="text-xs text-muted-foreground">
                {_({ en: 'No further action', bn: 'আর কোনো পদক্ষেপ নেই' })}
              </span>
            )}
          </div>
        }
      >
        {selected ? (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <StatusCell meta={handoverStatus[selected.status]} locale={locale} />
              <Badge tone={selected.required ? 'brand' : 'neutral'}>
                {selected.required
                  ? _({ en: 'Required', bn: 'আবশ্যক' })
                  : _({ en: 'Optional', bn: 'ঐচ্ছিক' })}
              </Badge>
            </div>

            <DescriptionList
              items={[
                {
                  label: _({ en: 'Deliverable ID', bn: 'ডেলিভারেবল আইডি' }),
                  value: <span className="font-mono">{selected.id}</span>,
                },
                { label: _({ en: 'Responsible', bn: 'দায়িত্বপ্রাপ্ত' }), value: selected.owner },
                { label: _({ en: 'Receiving party', bn: 'গ্রহীতা' }), value: selected.receiver },
                { label: _({ en: 'Due date', bn: 'শেষ তারিখ' }), value: selected.due },
                { label: _({ en: 'Version', bn: 'সংস্করণ' }), value: selected.version },
              ]}
            />

            {/* Evidence */}
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">
                {_({ en: 'Evidence attachments', bn: 'প্রমাণ সংযুক্তি' })}
              </p>
              {selected.evidence > 0 ? (
                <ul className="space-y-1.5">
                  {Array.from({ length: selected.evidence }, (_u, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"
                    >
                      <FileText className="h-4 w-4 text-muted-foreground" aria-hidden />
                      {selected.id}-evidence-{i + 1}.pdf
                      <span className="ml-auto text-xs text-muted">{selected.version}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-md border border-dashed border-border px-3 py-3 text-sm text-danger">
                  {_({
                    en: 'No evidence uploaded — required before approval.',
                    bn: 'কোনো প্রমাণ আপলোড হয়নি — অনুমোদনের আগে আবশ্যক।',
                  })}
                </p>
              )}
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                leftIcon={<Upload className="h-3.5 w-3.5" />}
                onClick={() =>
                  toast.toast({
                    title: _({ en: 'Upload (demo)', bn: 'আপলোড (ডেমো)' }),
                    description: _({
                      en: 'File selection is a demo.',
                      bn: 'ফাইল নির্বাচন একটি ডেমো।',
                    }),
                    tone: 'info',
                  })
                }
              >
                {_({ en: 'Upload evidence', bn: 'প্রমাণ আপলোড' })}
              </Button>
            </div>

            {/* Review comment */}
            <div>
              <p className="mb-1.5 text-sm font-medium text-foreground">
                {_({ en: 'Review comment', bn: 'পর্যালোচনা মন্তব্য' })}
              </p>
              <Textarea
                rows={3}
                placeholder={_({ en: 'Add a review note…', bn: 'পর্যালোচনা নোট যোগ করুন…' })}
              />
            </div>

            {/* Audit history */}
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">
                {_({ en: 'Activity history', bn: 'কার্যক্রম ইতিহাস' })}
              </p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex justify-between">
                  <span>
                    {selected.owner} · {_({ en: 'created deliverable', bn: 'ডেলিভারেবল তৈরি' })}
                  </span>
                  <span>{selected.due}</span>
                </li>
                <li className="flex justify-between">
                  <span>
                    {selected.owner} · {_({ en: 'uploaded evidence', bn: 'প্রমাণ আপলোড' })}
                  </span>
                  <span>{selected.version}</span>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
