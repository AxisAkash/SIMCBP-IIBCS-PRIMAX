'use client';

import { ArrowRight, Database, Filter, Lock } from 'lucide-react';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MiniStat } from '@/components/ui/mini-stat';
import { Badge } from '@/components/ui/badge';
import { DemoBanner } from '@/components/dashboard/demo-banner';

export default function DataStorePage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const _ = bi(locale);

  return (
    <div>
      <PageHeader
        title={_({ en: 'Two-Tier Data Store', bn: 'দ্বি-স্তর ডেটা স্টোর' })}
        description={_({
          en: 'Transactional store and controlled aggregation (X4).',
          bn: 'লেনদেন স্টোর ও নিয়ন্ত্রিত সমষ্টিকরণ (X4)।',
        })}
      />
      <DemoBanner message={tc('demoData')} />
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MiniStat label={_({ en: 'OLTP tables', bn: 'ওএলটিপি টেবিল' })} value="146" tone="brand" />
        <MiniStat label={_({ en: 'Aggregated views', bn: 'সমষ্টিগত ভিউ' })} value="38" tone="info" />
        <MiniStat
          label={_({ en: 'PII in analytics', bn: 'বিশ্লেষণে পিআইআই' })}
          value="0"
          tone="success"
        />
        <MiniStat label={_({ en: 'Retention', bn: 'সংরক্ষণ' })} value="7y" tone="neutral" />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <Card>
          <CardHeader
            title={
              <span className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" aria-hidden />
                {_({ en: 'Tier 1 — Transactional (OLTP)', bn: 'স্তর ১ — লেনদেন (ওএলটিপি)' })}
              </span>
            }
          />
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              {_({
                en: 'System of record. Holds full beneficiary, payment and case data including PII.',
                bn: 'সিস্টেম অব রেকর্ড। পিআইআইসহ সম্পূর্ণ উপকারভোগী, পেমেন্ট ও কেস ডেটা ধারণ করে।',
              })}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <Badge tone="brand">
                <Lock className="h-3 w-3" />
                {_({ en: 'Encrypted', bn: 'এনক্রিপ্টেড' })}
              </Badge>
              <Badge tone="neutral">PostgreSQL</Badge>
              <Badge tone="neutral">PostGIS</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-1 rounded-md border border-border bg-surface px-3 py-2 text-center">
            <Filter className="h-4 w-4 text-primary" aria-hidden />
            <span className="text-[11px] text-muted-foreground">
              {_({ en: 'Controlled aggregation', bn: 'নিয়ন্ত্রিত সমষ্টিকরণ' })}
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground lg:block" aria-hidden />
          </div>
        </div>

        <Card>
          <CardHeader
            title={
              <span className="flex items-center gap-2">
                <Database className="h-4 w-4 text-info" aria-hidden />
                {_({ en: 'Tier 2 — Reporting / Analytics', bn: 'স্তর ২ — রিপোর্টিং / বিশ্লেষণ' })}
              </span>
            }
          />
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              {_({
                en: 'Aggregated, de-identified data for dashboards and BI. No raw PII is exposed here.',
                bn: 'ড্যাশবোর্ড ও বিআই-এর জন্য সমষ্টিগত, পরিচয়হীন ডেটা। এখানে কোনো কাঁচা পিআইআই প্রকাশ পায় না।',
              })}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <Badge tone="success">{_({ en: 'No PII', bn: 'পিআইআই নেই' })}</Badge>
              <Badge tone="neutral">{_({ en: 'Read-optimized', bn: 'রিড-অপ্টিমাইজড' })}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
