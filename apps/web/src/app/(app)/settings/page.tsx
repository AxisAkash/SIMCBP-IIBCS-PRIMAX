'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { LOCALE_META, LOCALES } from '@simcbp/i18n';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormField, Input, Select, Switch } from '@/components/ui/form';
import { useToast } from '@/components/ui/toast';

export default function SettingsPage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const toast = useToast();
  const _ = bi(locale);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title={tc('profile')}
        description={_({ en: 'Account profile and preferences.', bn: 'অ্যাকাউন্ট প্রোফাইল ও পছন্দ।' })}
      />

      <Card className="mb-4">
        <CardHeader title={_({ en: 'Profile', bn: 'প্রোফাইল' })} />
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label={_({ en: 'Full name', bn: 'পূর্ণ নাম' })}>
            <Input defaultValue="Demo Administrator" />
          </FormField>
          <FormField label={_({ en: 'Email', bn: 'ইমেইল' })}>
            <Input type="email" defaultValue="admin@mcbp.demo" />
          </FormField>
          <FormField label={_({ en: 'Preferred language', bn: 'পছন্দের ভাষা' })}>
            <Select
              defaultValue={locale}
              options={LOCALES.map((l) => ({ value: l, label: LOCALE_META[l].labelNative }))}
            />
          </FormField>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader title={_({ en: 'Notifications', bn: 'বিজ্ঞপ্তি' })} />
        <CardContent className="space-y-3">
          <Switch
            checked={emailNotif}
            onChange={setEmailNotif}
            label={_({ en: 'Email notifications', bn: 'ইমেইল বিজ্ঞপ্তি' })}
          />
          <Switch
            checked={smsNotif}
            onChange={setSmsNotif}
            label={_({ en: 'SMS notifications', bn: 'এসএমএস বিজ্ঞপ্তি' })}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={() =>
            toast.toast({
              title: _({ en: 'Settings saved', bn: 'সেটিংস সংরক্ষিত' }),
              description: _({ en: 'Demo only.', bn: 'শুধু ডেমো।' }),
              tone: 'success',
            })
          }
        >
          {_({ en: 'Save changes', bn: 'পরিবর্তন সংরক্ষণ' })}
        </Button>
      </div>
    </div>
  );
}
