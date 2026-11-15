'use client';

import { CheckCircle2, CloudOff, RefreshCw, Signal, Smartphone } from 'lucide-react';
import { useLocale } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MiniStat } from '@/components/ui/mini-stat';
import { Badge } from '@/components/ui/badge';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { personName, tx } from '@/lib/mock/common';

export default function MobilePage() {
  const locale = useLocale();
  const _ = bi(locale);

  const tasks = [0, 1, 2, 3].map((i) => ({ name: personName(i + 20), done: i < 2 }));

  return (
    <div>
      <PageHeader
        title={_({ en: 'Mobile & Field Operations', bn: 'মোবাইল ও মাঠ কার্যক্রম' })}
        description={_({
          en: 'Android/iOS field app showcase and offline sync (M10).',
          bn: 'অ্যান্ড্রয়েড/আইওএস ফিল্ড অ্যাপ প্রদর্শন ও অফলাইন সিঙ্ক (M10)।',
        })}
      />
      <DemoBanner
        message={_({
          en: 'Showcase — the native app is represented here as a responsive preview; no device is connected.',
          bn: 'প্রদর্শন — নেটিভ অ্যাপ এখানে রেসপন্সিভ প্রিভিউ হিসেবে উপস্থাপিত; কোনো ডিভাইস সংযুক্ত নয়।',
        })}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Phone preview */}
        <div className="flex justify-center">
          <div className="w-[260px] rounded-[2rem] border-4 border-neutral-800 bg-surface p-3 shadow-overlay">
            <div className="mb-2 flex items-center justify-between px-1 text-[11px] text-muted-foreground">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <Signal className="h-3 w-3" /> MCBP Field
              </span>
            </div>
            <div className="rounded-xl bg-primary px-3 py-2.5 text-primary-foreground">
              <p className="text-xs opacity-80">
                {_({ en: 'Verification queue', bn: 'যাচাই সারি' })}
              </p>
              <p className="text-lg font-semibold">
                {_({ en: 'Savar Union', bn: 'সাভার ইউনিয়ন' })}
              </p>
            </div>
            <ul className="mt-2 space-y-1.5">
              {tasks.map((t, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border px-2.5 py-2 text-xs"
                >
                  <span className="truncate">{tx(t.name, locale)}</span>
                  {t.done ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <span className="rounded-full bg-warning-soft px-1.5 py-0.5 text-[10px] text-warning">
                      {_({ en: 'Pending', bn: 'বাকি' })}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <button
              className="mt-2 w-full rounded-lg bg-primary py-2 text-xs font-medium text-primary-foreground"
              type="button"
            >
              {_({ en: 'Start verification', bn: 'যাচাই শুরু' })}
            </button>
          </div>
        </div>

        {/* Field dashboard */}
        <div className="space-y-4 lg:col-span-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MiniStat label={_({ en: 'Assigned today', bn: 'আজ বরাদ্দ' })} value="24" tone="brand" />
            <MiniStat label={_({ en: 'Completed', bn: 'সম্পন্ন' })} value="17" tone="success" />
            <MiniStat
              label={_({ en: 'Offline queue', bn: 'অফলাইন সারি' })}
              value="3"
              tone="warning"
            />
            <MiniStat label={_({ en: 'Conflicts', bn: 'দ্বন্দ্ব' })} value="1" tone="danger" />
          </div>

          <Card>
            <CardHeader title={_({ en: 'Synchronization status', bn: 'সিঙ্ক্রোনাইজেশন অবস্থা' })} />
            <CardContent className="space-y-3">
              {[
                {
                  icon: RefreshCw,
                  label: _({ en: 'Last successful sync', bn: 'সর্বশেষ সফল সিঙ্ক' }),
                  value: _({ en: '8 min ago', bn: '৮ মিনিট আগে' }),
                  tone: 'success' as const,
                },
                {
                  icon: CloudOff,
                  label: _({ en: 'Records queued offline', bn: 'অফলাইনে সারিবদ্ধ রেকর্ড' }),
                  value: '3',
                  tone: 'warning' as const,
                },
                {
                  icon: Smartphone,
                  label: _({ en: 'Active field devices', bn: 'সক্রিয় ফিল্ড ডিভাইস' }),
                  value: '142',
                  tone: 'info' as const,
                },
              ].map((r, i) => {
                const Icon = r.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-border pb-2.5 last:border-0 last:pb-0"
                  >
                    <span className="flex items-center gap-2 text-sm text-foreground">
                      <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
                      {r.label}
                    </span>
                    <Badge tone={r.tone}>{r.value}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
