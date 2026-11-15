'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MiniStat } from '@/components/ui/mini-stat';
import { Button } from '@/components/ui/button';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatusCell } from '@/components/ui/status-cell';
import { ConfirmDialog } from '@/components/ui/overlay';
import { Tabs } from '@/components/ui/tabs';
import { ProgressBar } from '@/components/ui/feedback';
import { useToast } from '@/components/ui/toast';
import { paymentStatus } from '@/lib/statuses';
import { tx } from '@/lib/mock/common';
import { formatNumber } from '@/lib/format';
import {
  payrollCycles,
  payments,
  paymentTotals,
  type PayrollCycle,
  type Payment,
} from '@/lib/mock/payments';

export default function PaymentsPage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const toast = useToast();
  const _ = bi(locale);
  const [confirm, setConfirm] = useState(false);
  const totals = paymentTotals();

  const bdt = (n: number) => `৳ ${formatNumber(n, locale)}`;

  const cycleCols: Column<PayrollCycle>[] = [
    {
      key: 'id',
      header: _({ en: 'Cycle', bn: 'চক্র' }),
      render: (r) => <span className="font-mono text-xs">{r.id}</span>,
      sortValue: (r) => r.id,
    },
    {
      key: 'division',
      header: _({ en: 'Division', bn: 'বিভাগ' }),
      render: (r) => tx(r.division, locale),
    },
    {
      key: 'ben',
      header: _({ en: 'Beneficiaries', bn: 'উপকারভোগী' }),
      align: 'right',
      render: (r) => <span className="tabular-nums">{formatNumber(r.beneficiaries, locale)}</span>,
      sortValue: (r) => r.beneficiaries,
    },
    {
      key: 'amount',
      header: _({ en: 'Amount', bn: 'পরিমাণ' }),
      align: 'right',
      render: (r) => <span className="tabular-nums font-medium">{bdt(r.amount)}</span>,
      sortValue: (r) => r.amount,
    },
    {
      key: 'status',
      header: _({ en: 'Status', bn: 'অবস্থা' }),
      render: (r) => <StatusCell meta={paymentStatus[r.status]} locale={locale} />,
      sortValue: (r) => r.status,
    },
  ];

  const payCols: Column<Payment>[] = [
    {
      key: 'id',
      header: _({ en: 'Transaction', bn: 'লেনদেন' }),
      render: (r) => <span className="font-mono text-xs">{r.id}</span>,
    },
    {
      key: 'ben',
      header: _({ en: 'Beneficiary', bn: 'উপকারভোগী' }),
      render: (r) => tx(r.beneficiary, locale),
      sortValue: (r) => r.beneficiary.en,
    },
    { key: 'method', header: _({ en: 'Method', bn: 'মাধ্যম' }), render: (r) => r.method },
    {
      key: 'amount',
      header: _({ en: 'Amount', bn: 'পরিমাণ' }),
      align: 'right',
      render: (r) => <span className="tabular-nums">{bdt(r.amount)}</span>,
    },
    {
      key: 'status',
      header: _({ en: 'Status', bn: 'অবস্থা' }),
      render: (r) => <StatusCell meta={paymentStatus[r.status]} locale={locale} />,
      sortValue: (r) => r.status,
    },
    {
      key: 'date',
      header: _({ en: 'Date', bn: 'তারিখ' }),
      render: (r) => <span className="tabular-nums text-muted-foreground">{r.date}</span>,
      sortValue: (r) => r.date,
    },
  ];

  const reconciledPct = Math.round((totals.reconciled / payments.length) * 100);

  return (
    <div>
      <PageHeader
        title={_({ en: 'Payments & Payroll', bn: 'পেমেন্ট ও পে-রোল' })}
        description={_({
          en: 'Benefit calculation, payroll, tracking and reconciliation (M03).',
          bn: 'সুবিধা হিসাব, পে-রোল, ট্র্যাকিং ও মিলকরণ (M03)।',
        })}
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setConfirm(true)}>
            {_({ en: 'Generate payroll', bn: 'পে-রোল তৈরি' })}
          </Button>
        }
      />
      <DemoBanner message={tc('demoData')} />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <MiniStat
          label={_({ en: 'Disbursed', bn: 'বিতরণকৃত' })}
          value={bdt(totals.disbursed)}
          tone="brand"
        />
        <MiniStat
          label={_({ en: 'Paid', bn: 'পরিশোধিত' })}
          value={formatNumber(totals.paid, locale)}
          tone="success"
        />
        <MiniStat
          label={_({ en: 'Processing', bn: 'প্রক্রিয়াধীন' })}
          value={formatNumber(totals.processing, locale)}
          tone="info"
        />
        <MiniStat
          label={_({ en: 'On hold', bn: 'স্থগিত' })}
          value={formatNumber(totals.onHold, locale)}
          tone="warning"
        />
        <MiniStat
          label={_({ en: 'Failed', bn: 'ব্যর্থ' })}
          value={formatNumber(totals.failed, locale)}
          tone="danger"
        />
      </div>

      <Tabs
        items={[
          {
            key: 'cycles',
            label: _({ en: 'Payroll cycles', bn: 'পে-রোল চক্র' }),
            content: (
              <Card>
                <DataTable
                  columns={cycleCols}
                  data={payrollCycles}
                  rowKey={(r) => r.id}
                  searchable
                  searchText={(r) => `${r.id} ${r.division.en}`}
                  searchPlaceholder={_({ en: 'Search cycles…', bn: 'চক্র খুঁজুন…' })}
                />
              </Card>
            ),
          },
          {
            key: 'txns',
            label: _({ en: 'Transactions', bn: 'লেনদেন' }),
            content: (
              <Card>
                <DataTable
                  columns={payCols}
                  data={payments}
                  rowKey={(r) => r.id}
                  searchable
                  searchText={(r) => `${r.id} ${r.beneficiary.en} ${r.method}`}
                  searchPlaceholder={_({ en: 'Search transactions…', bn: 'লেনদেন খুঁজুন…' })}
                />
              </Card>
            ),
          },
          {
            key: 'recon',
            label: _({ en: 'Reconciliation', bn: 'মিলকরণ' }),
            content: (
              <Card>
                <CardHeader title={_({ en: 'Reconciliation status', bn: 'মিলকরণের অবস্থা' })} />
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span>{_({ en: 'Reconciled transactions', bn: 'মিলকৃত লেনদেন' })}</span>
                      <span className="tabular-nums font-medium">{reconciledPct}%</span>
                    </div>
                    <ProgressBar value={reconciledPct} tone="brand" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {_({
                      en: 'Exceptions are routed to Finance for maker–checker review before release.',
                      bn: 'ব্যতিক্রমগুলো ছাড়ের আগে মেকার–চেকার পর্যালোচনার জন্য অর্থ বিভাগে পাঠানো হয়।',
                    })}
                  </p>
                </CardContent>
              </Card>
            ),
          },
        ]}
      />

      <ConfirmDialog
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={() =>
          toast.toast({
            title: _({ en: 'Payroll generation queued', bn: 'পে-রোল তৈরি সারিবদ্ধ' }),
            description: _({
              en: 'Demo only — requires maker–checker approval.',
              bn: 'শুধু ডেমো — মেকার–চেকার অনুমোদন প্রয়োজন।',
            }),
            tone: 'info',
          })
        }
        title={_({ en: 'Generate new payroll cycle?', bn: 'নতুন পে-রোল চক্র তৈরি করবেন?' })}
        message={_({
          en: 'This creates a draft payroll cycle for review. No payment is released without approval.',
          bn: 'এটি পর্যালোচনার জন্য একটি খসড়া পে-রোল চক্র তৈরি করে। অনুমোদন ছাড়া কোনো পেমেন্ট ছাড়া হয় না।',
        })}
        confirmLabel={_({ en: 'Generate', bn: 'তৈরি করুন' })}
        cancelLabel={_({ en: 'Cancel', bn: 'বাতিল' })}
      />
    </div>
  );
}
