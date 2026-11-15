'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useLocale } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { DescriptionList } from '@/components/ui/feedback';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { tx } from '@/lib/mock/common';
import { formatNumber } from '@/lib/format';
import { divisionCoverage } from '@/lib/mock/platform';

export default function GisPage() {
  const locale = useLocale();
  const _ = bi(locale);
  const [sel, setSel] = useState(0);
  const selected = divisionCoverage[sel]!;

  return (
    <div>
      <PageHeader
        title={_({ en: 'GIS Programme Intelligence', bn: 'জিআইএস কর্মসূচি ইন্টেলিজেন্স' })}
        description={_({
          en: 'Geographic distribution, coverage and map-based indicators (M08).',
          bn: 'ভৌগোলিক বণ্টন, কভারেজ ও মানচিত্র-ভিত্তিক সূচক (M08)।',
        })}
      />
      <DemoBanner
        message={_({
          en: 'Demo map — a simplified division cartogram. A full interactive basemap (PostGIS) arrives with the backend.',
          bn: 'ডেমো মানচিত্র — সরলীকৃত বিভাগীয় কার্টোগ্রাম। সম্পূর্ণ ইন্টারঅ্যাক্টিভ বেসম্যাপ (PostGIS) ব্যাকএন্ডের সাথে আসবে।',
        })}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title={_({ en: 'Coverage by division', bn: 'বিভাগ অনুযায়ী কভারেজ' })}
            description={_({
              en: 'Darker = higher programme coverage. Select a division.',
              bn: 'গাঢ় = বেশি কভারেজ। একটি বিভাগ নির্বাচন করুন।',
            })}
          />
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {divisionCoverage.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSel(i)}
                  className={`flex aspect-square flex-col items-center justify-center rounded-lg border p-2 text-center transition-all ${
                    i === sel ? 'border-primary ring-2 ring-[var(--color-ring)]' : 'border-border'
                  }`}
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--color-primary) ${d.coverage}%, var(--color-surface))`,
                  }}
                >
                  <MapPin
                    className="mb-1 h-4 w-4 text-primary-foreground mix-blend-difference"
                    aria-hidden
                  />
                  <span className="text-xs font-semibold text-primary-foreground mix-blend-difference">
                    {tx(d.division, locale)}
                  </span>
                  <span className="text-[11px] font-medium text-primary-foreground mix-blend-difference">
                    {d.coverage}%
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{_({ en: 'Low', bn: 'কম' })}</span>
              <span
                className="h-2 flex-1 rounded-full"
                style={{
                  background:
                    'linear-gradient(to right, var(--color-surface-sunken), var(--color-primary))',
                }}
              />
              <span>{_({ en: 'High', bn: 'বেশি' })}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title={tx(selected.division, locale)}
            description={_({ en: 'Division snapshot', bn: 'বিভাগীয় সারসংক্ষেপ' })}
          />
          <CardContent>
            <DescriptionList
              items={[
                {
                  label: _({ en: 'Beneficiaries', bn: 'উপকারভোগী' }),
                  value: (
                    <span className="tabular-nums">
                      {formatNumber(selected.beneficiaries, locale)}
                    </span>
                  ),
                },
                { label: _({ en: 'Coverage', bn: 'কভারেজ' }), value: `${selected.coverage}%` },
                {
                  label: _({ en: 'Rank', bn: 'র‍্যাঙ্ক' }),
                  value: `#${[...divisionCoverage].sort((a, b) => b.coverage - a.coverage).findIndex((d) => d.division.en === selected.division.en) + 1}`,
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
