'use client';

import { Archive, FileLock2, ShieldCheck, Trash2, UserCheck } from 'lucide-react';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MiniStat } from '@/components/ui/mini-stat';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { FormField, Input, Select } from '@/components/ui/form';
import { useToast } from '@/components/ui/toast';

export default function PrivacyPage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const toast = useToast();
  const _ = bi(locale);

  const controls = [
    {
      icon: UserCheck,
      en: 'Consent capture',
      bn: 'সম্মতি সংগ্রহ',
      status: _({ en: 'Enabled', bn: 'সক্রিয়' }),
      tone: 'success' as const,
    },
    {
      icon: Archive,
      en: 'Retention schedule',
      bn: 'সংরক্ষণ সময়সূচি',
      status: _({ en: '7 years', bn: '৭ বছর' }),
      tone: 'info' as const,
    },
    {
      icon: FileLock2,
      en: 'Field-level masking',
      bn: 'ফিল্ড-লেভেল মাস্কিং',
      status: _({ en: 'NID, phone, bank', bn: 'এনআইডি, ফোন, ব্যাংক' }),
      tone: 'brand' as const,
    },
    {
      icon: Trash2,
      en: 'Controlled erasure',
      bn: 'নিয়ন্ত্রিত মোছা',
      status: _({ en: 'Approval required', bn: 'অনুমোদন প্রয়োজন' }),
      tone: 'warning' as const,
    },
  ];

  return (
    <div>
      <PageHeader
        title={_({ en: 'Privacy, Consent & Retention', bn: 'গোপনীয়তা, সম্মতি ও সংরক্ষণ' })}
        description={_({
          en: 'Consent, retention, archival and erasure controls (X2).',
          bn: 'সম্মতি, সংরক্ষণ, আর্কাইভ ও মোছার নিয়ন্ত্রণ (X2)।',
        })}
      />
      <DemoBanner message={tc('demoData')} />
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MiniStat
          label={_({ en: 'Consent coverage', bn: 'সম্মতি কভারেজ' })}
          value="99.4%"
          tone="success"
        />
        <MiniStat
          label={_({ en: 'Pending DSR', bn: 'অপেক্ষমাণ ডিএসআর' })}
          value="6"
          tone="warning"
        />
        <MiniStat
          label={_({ en: 'Archived records', bn: 'আর্কাইভড রেকর্ড' })}
          value="12.4k"
          tone="info"
        />
        <MiniStat
          label={_({ en: 'Erasure requests', bn: 'মোছার অনুরোধ' })}
          value="3"
          tone="danger"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title={_({ en: 'Privacy controls', bn: 'গোপনীয়তা নিয়ন্ত্রণ' })} />
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {controls.map((c, i) => {
                const Icon = c.icon;
                return (
                  <li key={i} className="flex items-center justify-between px-5 py-3.5">
                    <span className="flex items-center gap-2.5 text-sm">
                      <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
                      {_({ en: c.en, bn: c.bn })}
                    </span>
                    <Badge tone={c.tone}>{c.status}</Badge>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={_({ en: 'Data-subject request', bn: 'ডেটা-সাবজেক্ট অনুরোধ' })} />
          <CardContent className="space-y-4">
            <FormField label={_({ en: 'Beneficiary ID / NID', bn: 'উপকারভোগী আইডি / এনআইডি' })}>
              <Input placeholder="MCBP-2026-…" />
            </FormField>
            <FormField label={_({ en: 'Request type', bn: 'অনুরোধের ধরন' })}>
              <Select
                placeholder={_({ en: 'Select…', bn: 'নির্বাচন…' })}
                options={[
                  { value: 'access', label: _({ en: 'Access data', bn: 'ডেটা অ্যাক্সেস' }) },
                  { value: 'rectify', label: _({ en: 'Rectify data', bn: 'ডেটা সংশোধন' }) },
                  { value: 'erase', label: _({ en: 'Erase data', bn: 'ডেটা মোছা' }) },
                ]}
              />
            </FormField>
            <Button
              className="w-full justify-center"
              leftIcon={<ShieldCheck className="h-4 w-4" />}
              onClick={() =>
                toast.toast({
                  title: _({ en: 'Request logged', bn: 'অনুরোধ লগ হয়েছে' }),
                  description: _({
                    en: 'Demo — routed for approval & audited.',
                    bn: 'ডেমো — অনুমোদনের জন্য পাঠানো ও অডিটকৃত।',
                  }),
                  tone: 'info',
                })
              }
            >
              {_({ en: 'Submit request', bn: 'অনুরোধ জমা' })}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
