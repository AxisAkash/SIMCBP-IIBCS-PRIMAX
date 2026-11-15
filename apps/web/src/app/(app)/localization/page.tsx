'use client';

import { CheckCircle2, Globe } from 'lucide-react';
import { LOCALES, LOCALE_META, messages } from '@simcbp/i18n';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MiniStat } from '@/components/ui/mini-stat';
import { Badge } from '@/components/ui/badge';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { ProgressBar } from '@/components/ui/feedback';
import { formatNumber } from '@/lib/format';

function countKeys(obj: unknown): number {
  if (!obj || typeof obj !== 'object') return 1;
  return Object.values(obj as Record<string, unknown>).reduce<number>(
    (n, v) => n + countKeys(v),
    0,
  );
}

export default function LocalizationPage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const _ = bi(locale);

  const enKeys = countKeys(messages.en);

  return (
    <div>
      <PageHeader
        title={_({ en: 'Localization Framework', bn: 'স্থানীয়করণ কাঠামো' })}
        description={_({
          en: 'Bilingual catalogs, coverage and parity (X5).',
          bn: 'দ্বিভাষিক ক্যাটালগ, কভারেজ ও প্যারিটি (X5)।',
        })}
      />
      <DemoBanner message={tc('demoData')} />
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MiniStat
          label={_({ en: 'Locales', bn: 'লোকেল' })}
          value={formatNumber(LOCALES.length, locale)}
          tone="brand"
        />
        <MiniStat
          label={_({ en: 'Translation keys', bn: 'অনুবাদ কী' })}
          value={formatNumber(enKeys, locale)}
          tone="info"
        />
        <MiniStat label={_({ en: 'Parity', bn: 'প্যারিটি' })} value="100%" tone="success" />
        <MiniStat
          label={_({ en: 'Namespaces', bn: 'নেমস্পেস' })}
          value={formatNumber(Object.keys(messages.en).length, locale)}
          tone="neutral"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {LOCALES.map((loc) => {
          const keys = countKeys(messages[loc]);
          const pct = Math.round((keys / enKeys) * 100);
          return (
            <Card key={loc}>
              <CardHeader
                title={
                  <span className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" aria-hidden />
                    {LOCALE_META[loc].labelNative}
                    <span className="text-xs text-muted-foreground">({loc})</span>
                  </span>
                }
                action={
                  <Badge tone="success">
                    <CheckCircle2 className="h-3 w-3" />
                    {pct}%
                  </Badge>
                }
              />
              <CardContent className="space-y-3">
                <ProgressBar value={pct} tone="success" className="h-1.5" />
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="text-muted-foreground">{_({ en: 'Keys', bn: 'কী' })}</dt>
                  <dd className="text-right tabular-nums">{formatNumber(keys, locale)}</dd>
                  <dt className="text-muted-foreground">{_({ en: 'Numerals', bn: 'সংখ্যা' })}</dt>
                  <dd className="text-right">{LOCALE_META[loc].numeral}</dd>
                  <dt className="text-muted-foreground">{_({ en: 'Direction', bn: 'দিক' })}</dt>
                  <dd className="text-right uppercase">{LOCALE_META[loc].dir}</dd>
                </dl>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        {_({
          en: 'Parity is enforced in CI — any key missing from a locale fails the build.',
          bn: 'প্যারিটি সিআই-তে প্রয়োগ করা হয় — কোনো লোকেলে কী অনুপস্থিত থাকলে বিল্ড ব্যর্থ হয়।',
        })}
      </p>
    </div>
  );
}
