'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { useLocale } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stepper } from '@/components/ui/feedback';
import { FormField, Input, Select, Checkbox } from '@/components/ui/form';
import { useToast } from '@/components/ui/toast';
import { DIVISIONS, UPAZILAS, UNIONS, tx } from '@/lib/mock/common';

interface FormState {
  name: string;
  nid: string;
  phone: string;
  division: string;
  upazila: string;
  union: string;
  stage: string;
  consent: boolean;
}

const EMPTY: FormState = {
  name: '',
  nid: '',
  phone: '',
  division: '',
  upazila: '',
  union: '',
  stage: '',
  consent: false,
};

export default function NewApplicationPage() {
  const router = useRouter();
  const locale = useLocale();
  const toast = useToast();
  const _ = bi(locale);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof FormState, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));
  const opt = (arr: { en: string; bn: string }[]) =>
    arr.map((x) => ({ value: x.en, label: tx(x, locale) }));

  const stages = [
    { en: 'Pregnancy — 2nd trimester', bn: 'গর্ভাবস্থা — ২য় ত্রৈমাসিক' },
    { en: 'Pregnancy — 3rd trimester', bn: 'গর্ভাবস্থা — ৩য় ত্রৈমাসিক' },
    { en: 'Lactating mother', bn: 'স্তন্যদানকারী মা' },
  ];

  function validateStep(s: number): boolean {
    const e: Record<string, string> = {};
    const req = _({ en: 'Required', bn: 'আবশ্যক' });
    if (s === 0) {
      if (!form.name.trim()) e.name = req;
      if (!/^[•\d\s]{6,}$/.test(form.nid) && form.nid.trim().length < 6)
        e.nid = _({ en: 'Enter a valid NID', bn: 'সঠিক এনআইডি দিন' });
      if (!form.phone.trim()) e.phone = req;
    }
    if (s === 1) {
      if (!form.division) e.division = req;
      if (!form.upazila) e.upazila = req;
      if (!form.union) e.union = req;
      if (!form.stage) e.stage = req;
    }
    if (s === 2 && !form.consent) e.consent = _({ en: 'Consent is required', bn: 'সম্মতি আবশ্যক' });
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 2));
  }

  function submit() {
    if (!validateStep(2)) return;
    toast.toast({
      title: _({ en: 'Application saved', bn: 'আবেদন সংরক্ষিত' }),
      description: _({
        en: 'Demo only — not persisted to a server.',
        bn: 'শুধু ডেমো — সার্ভারে সংরক্ষিত নয়।',
      }),
      tone: 'success',
    });
    router.push('/beneficiaries');
  }

  const steps = [
    { key: 's1', label: _({ en: 'Applicant', bn: 'আবেদনকারী' }) },
    { key: 's2', label: _({ en: 'Location & eligibility', bn: 'অবস্থান ও যোগ্যতা' }) },
    { key: 's3', label: _({ en: 'Review & consent', bn: 'পর্যালোচনা ও সম্মতি' }) },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/beneficiaries"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {_({ en: 'Back to beneficiaries', bn: 'উপকারভোগী তালিকায় ফিরুন' })}
      </Link>
      <PageHeader title={_({ en: 'New application', bn: 'নতুন আবেদন' })} />

      <Card>
        <CardContent className="pb-2 pt-5">
          <Stepper steps={steps} current={step} />
        </CardContent>
        <CardContent className="space-y-4 border-t border-border">
          {step === 0 ? (
            <>
              <FormField label={_({ en: 'Full name', bn: 'পূর্ণ নাম' })} required error={errors.name}>
                <Input value={form.name} onChange={(e) => set('name', e.target.value)} />
              </FormField>
              <FormField
                label={_({ en: 'National ID', bn: 'জাতীয় পরিচয়পত্র' })}
                required
                error={errors.nid}
              >
                <Input
                  value={form.nid}
                  onChange={(e) => set('nid', e.target.value)}
                  inputMode="numeric"
                />
              </FormField>
              <FormField label={_({ en: 'Phone', bn: 'ফোন' })} required error={errors.phone}>
                <Input
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  inputMode="tel"
                />
              </FormField>
            </>
          ) : null}

          {step === 1 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                label={_({ en: 'Division', bn: 'বিভাগ' })}
                required
                error={errors.division}
              >
                <Select
                  options={opt(DIVISIONS)}
                  value={form.division}
                  placeholder={_({ en: 'Select…', bn: 'নির্বাচন…' })}
                  onChange={(e) => set('division', e.target.value)}
                />
              </FormField>
              <FormField label={_({ en: 'Upazila', bn: 'উপজেলা' })} required error={errors.upazila}>
                <Select
                  options={opt(UPAZILAS)}
                  value={form.upazila}
                  placeholder={_({ en: 'Select…', bn: 'নির্বাচন…' })}
                  onChange={(e) => set('upazila', e.target.value)}
                />
              </FormField>
              <FormField label={_({ en: 'Union', bn: 'ইউনিয়ন' })} required error={errors.union}>
                <Select
                  options={opt(UNIONS)}
                  value={form.union}
                  placeholder={_({ en: 'Select…', bn: 'নির্বাচন…' })}
                  onChange={(e) => set('union', e.target.value)}
                />
              </FormField>
              <FormField label={_({ en: 'Stage', bn: 'পর্যায়' })} required error={errors.stage}>
                <Select
                  options={opt(stages)}
                  value={form.stage}
                  placeholder={_({ en: 'Select…', bn: 'নির্বাচন…' })}
                  onChange={(e) => set('stage', e.target.value)}
                />
              </FormField>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <div className="rounded-md border border-border bg-surface-sunken/40 p-4 text-sm">
                <dl className="grid grid-cols-2 gap-y-2">
                  <dt className="text-muted">{_({ en: 'Name', bn: 'নাম' })}</dt>
                  <dd className="text-foreground">{form.name || '—'}</dd>
                  <dt className="text-muted">{_({ en: 'NID', bn: 'এনআইডি' })}</dt>
                  <dd className="font-mono text-foreground">{form.nid || '—'}</dd>
                  <dt className="text-muted">{_({ en: 'Location', bn: 'অবস্থান' })}</dt>
                  <dd className="text-foreground">
                    {[form.union, form.upazila, form.division].filter(Boolean).join(', ') || '—'}
                  </dd>
                  <dt className="text-muted">{_({ en: 'Stage', bn: 'পর্যায়' })}</dt>
                  <dd className="text-foreground">{form.stage || '—'}</dd>
                </dl>
              </div>
              <FormField error={errors.consent}>
                <Checkbox
                  checked={form.consent}
                  onChange={(e) => set('consent', e.target.checked)}
                  label={_({
                    en: 'The applicant consents to data collection and processing for the programme.',
                    bn: 'আবেদনকারী কর্মসূচির জন্য তথ্য সংগ্রহ ও প্রক্রিয়াকরণে সম্মতি দিয়েছেন।',
                  })}
                />
              </FormField>
            </div>
          ) : null}
        </CardContent>
        <CardContent className="flex items-center justify-between border-t border-border">
          <Button
            variant="outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            {_({ en: 'Back', bn: 'পূর্ববর্তী' })}
          </Button>
          {step < 2 ? (
            <Button onClick={next}>{_({ en: 'Continue', bn: 'পরবর্তী' })}</Button>
          ) : (
            <Button leftIcon={<Check className="h-4 w-4" />} onClick={submit}>
              {_({ en: 'Submit application', bn: 'আবেদন জমা দিন' })}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
