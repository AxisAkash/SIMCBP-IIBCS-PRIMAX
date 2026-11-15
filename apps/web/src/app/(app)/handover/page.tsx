'use client';

import Link from 'next/link';
import { ArrowRight, FileDown, PackageCheck } from 'lucide-react';
import { HANDOVER_CATEGORIES } from '@simcbp/types';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadialProgress, ProgressBar } from '@/components/ui/feedback';
import { StatusBadge } from '@/components/ui/status-badge';
import { useToast } from '@/components/ui/toast';
import { handoverStatus, statusLabel } from '@/lib/statuses';
import { categoryProgress, overallReadiness, statusCounts } from '@/lib/mock/handover';

export default function HandoverPage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const toast = useToast();
  const _ = bi(locale);

  const overall = overallReadiness();
  const counts = statusCounts();

  return (
    <div>
      <PageHeader
        title={_({ en: 'Software Handover & Transition', bn: 'সফটওয়্যার হ্যান্ডওভার ও ট্রানজিশন' })}
        description={_({
          en: 'Seven-category deliverable tracking, evidence and approval.',
          bn: 'সাত-শ্রেণির ডেলিভারেবল ট্র্যাকিং, প্রমাণ ও অনুমোদন।',
        })}
        actions={
          <Button
            leftIcon={<FileDown className="h-4 w-4" />}
            onClick={() =>
              toast.toast({
                title: _({ en: 'Handover report generated', bn: 'হ্যান্ডওভার প্রতিবেদন তৈরি' }),
                description: _({ en: 'Demo only.', bn: 'শুধু ডেমো।' }),
                tone: 'info',
              })
            }
          >
            {_({ en: 'Export report', bn: 'প্রতিবেদন রপ্তানি' })}
          </Button>
        }
      />
      <DemoNote message={tc('demoData')} />

      {/* Readiness summary */}
      <Card className="mb-6">
        <CardContent className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          <RadialProgress
            value={overall}
            tone={overall >= 80 ? 'success' : overall >= 50 ? 'brand' : 'warning'}
            label={_({ en: 'Readiness', bn: 'প্রস্তুতি' })}
          />
          <div className="flex-1">
            <h3 className="text-md font-semibold text-foreground">
              {_({ en: 'Overall handover readiness', bn: 'সামগ্রিক হ্যান্ডওভার প্রস্তুতি' })}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {_({
                en: 'Readiness counts required deliverables that are approved WITH evidence. A ticked checklist alone does not count.',
                bn: 'প্রস্তুতি কেবল প্রমাণসহ অনুমোদিত আবশ্যক ডেলিভারেবল গণনা করে। শুধু চেকলিস্ট টিক গণনা হয় না।',
              })}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.keys(handoverStatus).map((s) =>
                counts[s] ? (
                  <StatusBadge
                    key={s}
                    tone={handoverStatus[s]!.tone}
                    label={`${statusLabel(handoverStatus[s]!, locale)} · ${counts[s]}`}
                  />
                ) : null,
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {HANDOVER_CATEGORIES.map((cat) => {
          const p = categoryProgress(cat.key);
          const missing = p.requiredTotal - p.approvedRequired;
          return (
            <Link key={cat.key} href={`/handover/${cat.key}`} className="group">
              <Card className="h-full transition-colors group-hover:border-primary">
                <CardContent>
                  <div className="mb-3 flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-subtle font-mono text-sm font-semibold text-primary">
                      {cat.id}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold leading-snug text-foreground">
                        {locale === 'bn' ? cat.titleBn : cat.titleEn}
                      </h3>
                    </div>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </div>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {_({ en: 'Readiness', bn: 'প্রস্তুতি' })}
                    </span>
                    <span className="tabular-nums font-medium">{p.readiness}%</span>
                  </div>
                  <ProgressBar
                    value={p.readiness}
                    tone={p.readiness >= 80 ? 'success' : p.readiness >= 50 ? 'brand' : 'warning'}
                    className="h-1.5"
                  />
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {p.approvedRequired}/{p.requiredTotal}{' '}
                      {_({ en: 'required approved', bn: 'আবশ্যক অনুমোদিত' })}
                    </span>
                    {missing > 0 ? (
                      <Badge tone="warning">
                        {missing} {_({ en: 'missing', bn: 'অনুপস্থিত' })}
                      </Badge>
                    ) : (
                      <Badge tone="success">{_({ en: 'Complete', bn: 'সম্পূর্ণ' })}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Final acceptance */}
      <Card className="mt-6">
        <CardContent className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <PackageCheck
              className={`h-6 w-6 ${overall >= 100 ? 'text-success' : 'text-muted'}`}
              aria-hidden
            />
            <div>
              <p className="text-sm font-medium text-foreground">
                {_({ en: 'Final handover acceptance', bn: 'চূড়ান্ত হ্যান্ডওভার গ্রহণ' })}
              </p>
              <p className="text-xs text-muted-foreground">
                {_({
                  en: 'Issued only when all required deliverables across all seven categories are approved with evidence.',
                  bn: 'সাতটি শ্রেণির সকল আবশ্যক ডেলিভারেবল প্রমাণসহ অনুমোদিত হলেই কেবল ইস্যু করা হয়।',
                })}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" disabled={overall < 100}>
            {_({ en: 'Issue acceptance', bn: 'গ্রহণ ইস্যু' })}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function DemoNote({ message }: { message: string }) {
  return (
    <div className="mb-6 flex items-center gap-2.5 rounded-md border-l-2 border-warning bg-warning-soft px-4 py-2.5 text-sm text-foreground">
      <span>{message}</span>
    </div>
  );
}
