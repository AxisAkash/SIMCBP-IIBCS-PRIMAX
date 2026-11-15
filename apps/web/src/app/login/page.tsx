'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeartHandshake, LogIn, ShieldCheck } from 'lucide-react';
import { BRAND } from '@simcbp/branding';
import { useLocale } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { Button } from '@/components/ui/button';
import { FormField, Input } from '@/components/ui/form';
import { ThemeToggle } from '@/components/shell/theme-toggle';
import { LanguageSwitcher } from '@/components/shell/language-switcher';

export default function LoginPage() {
  const router = useRouter();
  const locale = useLocale();
  const _ = bi(locale);
  const [loading, setLoading] = useState(false);

  function signIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push('/dashboard'), 500);
  }

  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/15">
            <HeartHandshake className="h-6 w-6" aria-hidden />
          </span>
          <span className="text-lg font-semibold">{BRAND.systemNameEn.split(' / ')[0]}</span>
        </div>
        <div>
          <h1 className="text-3xl font-semibold leading-tight">
            {locale === 'bn' ? BRAND.programmeNameBn : BRAND.programmeNameEn}
          </h1>
          <p className="mt-3 max-w-md text-sm text-primary-foreground/80">
            {_({
              en: 'Integrated Management Information System for the Mother and Child Benefit Programme, Ministry of Women and Children Affairs.',
              bn: 'মহিলা ও শিশু বিষয়ক মন্ত্রণালয়ের মা ও শিশু সহায়তা কর্মসূচির সমন্বিত ব্যবস্থাপনা তথ্য সিস্টেম।',
            })}
          </p>
          <p className="mt-6 text-sm text-primary-foreground/70">{BRAND.taglineBn}</p>
        </div>
        <p className="text-xs text-primary-foreground/70">
          {_({ en: 'Developed by', bn: 'ডেভেলপ করেছে' })} {BRAND.vendorEn}
        </p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="flex items-center justify-end gap-1 p-4">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
        <div className="flex flex-1 items-center justify-center px-6 pb-16">
          <div className="w-full max-w-sm">
            <div className="mb-6 lg:hidden">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <HeartHandshake className="h-6 w-6" aria-hidden />
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              {_({ en: 'Sign in', bn: 'সাইন ইন' })}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {_({
                en: 'Access the MCBP-MIS workspace.',
                bn: 'এমসিবিপি-এমআইএস ওয়ার্কস্পেসে প্রবেশ করুন।',
              })}
            </p>

            <form onSubmit={signIn} className="mt-6 space-y-4">
              <FormField label={_({ en: 'Email or username', bn: 'ইমেইল বা ইউজারনেম' })}>
                <Input type="text" autoComplete="username" defaultValue="admin@mcbp.demo" />
              </FormField>
              <FormField label={_({ en: 'Password', bn: 'পাসওয়ার্ড' })}>
                <Input type="password" autoComplete="current-password" defaultValue="demo" />
              </FormField>
              <Button
                type="submit"
                className="w-full justify-center"
                leftIcon={<LogIn className="h-4 w-4" />}
                disabled={loading}
              >
                {loading
                  ? _({ en: 'Signing in…', bn: 'সাইন ইন হচ্ছে…' })
                  : _({ en: 'Sign in', bn: 'সাইন ইন' })}
              </Button>
            </form>

            <div className="mt-4 flex items-center gap-2 rounded-md border border-border bg-surface-sunken/50 px-3 py-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
              {_({
                en: 'Demo sign-in — no real authentication. Privileged roles require MFA in production.',
                bn: 'ডেমো সাইন-ইন — প্রকৃত প্রমাণীকরণ নেই। উৎপাদনে বিশেষাধিকারপ্রাপ্ত ভূমিকায় এমএফএ প্রয়োজন।',
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
