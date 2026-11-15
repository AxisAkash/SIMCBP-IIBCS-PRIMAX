'use client';

import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { DescriptionList } from '@/components/ui/feedback';
import { useToast } from '@/components/ui/toast';
import { tx } from '@/lib/mock/common';
import { formatNumber } from '@/lib/format';
import { schemes } from '@/lib/mock/admin';

export default function SchemesPage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const toast = useToast();
  const _ = bi(locale);

  return (
    <div>
      <PageHeader
        title={_({ en: 'Multi-Scheme Configuration', bn: 'মাল্টি-স্কিম কনফিগারেশন' })}
        description={_({
          en: 'Programme directory, scheme settings and extensibility (M14).',
          bn: 'কর্মসূচি ডিরেক্টরি, স্কিম সেটিংস ও সম্প্রসারণযোগ্যতা (M14)।',
        })}
      />
      <DemoBanner message={tc('demoData')} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {schemes.map((s) => (
          <Card key={s.id}>
            <CardContent>
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-md font-semibold text-foreground">{tx(s.name, locale)}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{s.id}</span>
                </div>
                <Badge tone={s.status === 'active' ? 'success' : 'neutral'}>
                  {s.status === 'active'
                    ? _({ en: 'Active', bn: 'সক্রিয়' })
                    : _({ en: 'Planned', bn: 'পরিকল্পিত' })}
                </Badge>
              </div>
              <DescriptionList
                items={[
                  {
                    label: _({ en: 'Beneficiaries', bn: 'উপকারভোগী' }),
                    value: (
                      <span className="tabular-nums">{formatNumber(s.beneficiaries, locale)}</span>
                    ),
                  },
                  {
                    label: _({ en: 'Benefit rate', bn: 'সুবিধার হার' }),
                    value: `৳ ${formatNumber(s.benefitRate, locale)}/mo`,
                  },
                ]}
              />
              <div className="mt-4 flex justify-end">
                <Button
                  variant={s.status === 'active' ? 'outline' : 'primary'}
                  size="sm"
                  onClick={() =>
                    toast.toast({
                      title: _({ en: 'Scheme configuration', bn: 'স্কিম কনফিগারেশন' }),
                      description: _({ en: 'Demo only.', bn: 'শুধু ডেমো।' }),
                      tone: 'info',
                    })
                  }
                >
                  {s.status === 'active'
                    ? _({ en: 'Configure', bn: 'কনফিগার' })
                    : _({ en: 'Activate', bn: 'সক্রিয় করুন' })}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
