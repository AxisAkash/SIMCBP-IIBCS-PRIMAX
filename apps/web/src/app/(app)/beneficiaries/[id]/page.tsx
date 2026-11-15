import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getLocale } from '@/lib/i18n/server';
import { bi } from '@/lib/i18n/bilingual';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import { DescriptionList, Avatar } from '@/components/ui/feedback';
import { StatusCell } from '@/components/ui/status-cell';
import { EmptyState } from '@/components/ui/states';
import { applicationStatus } from '@/lib/statuses';
import { getBeneficiary } from '@/lib/mock/beneficiaries';
import { tx } from '@/lib/mock/common';
import { formatNumber } from '@/lib/format';

export default async function BeneficiaryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  const b = getBeneficiary(id);
  if (!b) notFound();
  const _ = bi(locale);

  const profile = (
    <Card>
      <CardContent>
        <DescriptionList
          items={[
            {
              label: _({ en: 'Beneficiary ID', bn: 'উপকারভোগী আইডি' }),
              value: <span className="font-mono">{b.id}</span>,
            },
            { label: _({ en: 'Full name', bn: 'পূর্ণ নাম' }), value: tx(b.name, locale) },
            {
              label: _({ en: 'National ID', bn: 'জাতীয় পরিচয়পত্র' }),
              value: <span className="font-mono">{b.nid}</span>,
            },
            {
              label: _({ en: 'Phone', bn: 'ফোন' }),
              value: <span className="font-mono">{b.phone}</span>,
            },
            { label: _({ en: 'Division', bn: 'বিভাগ' }), value: tx(b.division, locale) },
            { label: _({ en: 'Upazila', bn: 'উপজেলা' }), value: tx(b.upazila, locale) },
            { label: _({ en: 'Union', bn: 'ইউনিয়ন' }), value: tx(b.union, locale) },
            { label: _({ en: 'Stage', bn: 'পর্যায়' }), value: tx(b.stage, locale) },
            {
              label: _({ en: 'Monthly benefit', bn: 'মাসিক সুবিধা' }),
              value: `৳ ${formatNumber(b.monthlyBenefit, locale)}`,
            },
            { label: _({ en: 'Applied on', bn: 'আবেদনের তারিখ' }), value: b.appliedOn },
            { label: _({ en: 'Enrolled on', bn: 'নথিভুক্তির তারিখ' }), value: b.enrolledOn ?? '—' },
          ]}
        />
      </CardContent>
    </Card>
  );

  const application = (
    <Card>
      <CardHeader title={_({ en: 'Verification & selection', bn: 'যাচাই ও নির্বাচন' })} />
      <CardContent>
        <ul className="space-y-3 text-sm">
          {[
            { en: 'Application submitted', bn: 'আবেদন জমা', date: b.appliedOn, done: true },
            {
              en: 'Field verification',
              bn: 'মাঠ যাচাই',
              date: b.appliedOn,
              done: b.status !== 'submitted',
            },
            {
              en: 'Eligibility assessment',
              bn: 'যোগ্যতা মূল্যায়ন',
              date: '—',
              done: ['eligible', 'selected', 'enrolled'].includes(b.status),
            },
            {
              en: 'Enrollment',
              bn: 'নথিভুক্তি',
              date: b.enrolledOn ?? '—',
              done: b.status === 'enrolled',
            },
          ].map((s, i) => (
            <li
              key={i}
              className="flex items-center justify-between border-b border-border pb-2 last:border-0"
            >
              <span className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${s.done ? 'bg-success' : 'bg-border-strong'}`}
                />
                {tx({ en: s.en, bn: s.bn }, locale)}
              </span>
              <span className="tabular-nums text-muted-foreground">{s.date}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  const payments =
    b.status === 'enrolled' ? (
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {[0, 1, 2].map((m) => (
              <li key={m} className="flex items-center justify-between px-5 py-3 text-sm">
                <span>{_({ en: 'Monthly disbursement', bn: 'মাসিক বিতরণ' })}</span>
                <span className="tabular-nums font-medium">
                  ৳ {formatNumber(b.monthlyBenefit, locale)}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    ) : (
      <Card>
        <CardContent className="p-0">
          <EmptyState title={_({ en: 'No payments yet', bn: 'এখনও কোনো পেমেন্ট নেই' })} />
        </CardContent>
      </Card>
    );

  return (
    <div>
      <Link
        href="/beneficiaries"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {_({ en: 'Back to beneficiaries', bn: 'উপকারভোগী তালিকায় ফিরুন' })}
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <Avatar name={b.name.en} className="h-12 w-12 text-base" />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {tx(b.name, locale)}
          </h1>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">{b.id}</span>
            <StatusCell meta={applicationStatus[b.status]} locale={locale} />
          </div>
        </div>
      </div>

      <Tabs
        items={[
          { key: 'profile', label: _({ en: 'Profile', bn: 'প্রোফাইল' }), content: profile },
          {
            key: 'application',
            label: _({ en: 'Application', bn: 'আবেদন' }),
            content: application,
          },
          { key: 'payments', label: _({ en: 'Payments', bn: 'পেমেন্ট' }), content: payments },
        ]}
      />
    </div>
  );
}
