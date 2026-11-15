import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getLocale } from '@/lib/i18n/server';
import { getMessages, createTranslator } from '@/lib/i18n/messages';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { MiniStat } from '@/components/ui/mini-stat';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { buttonClasses } from '@/components/ui/button';
import { BeneficiariesTable } from '@/components/beneficiaries/beneficiaries-table';
import { applicationStatus } from '@/lib/statuses';
import { statusLabel } from '@/lib/statuses';
import { beneficiaries, beneficiaryPipeline } from '@/lib/mock/beneficiaries';
import { formatNumber } from '@/lib/format';

export const metadata = { title: 'Beneficiaries' };

export default async function BeneficiariesPage() {
  const locale = await getLocale();
  const messages = getMessages(locale);
  const tCommon = createTranslator(messages, 'common');
  const _ = bi(locale);
  const pipeline = beneficiaryPipeline();

  return (
    <div>
      <PageHeader
        title={_({ en: 'Beneficiaries', bn: 'উপকারভোগী' })}
        description={_({
          en: 'Applications, verification, selection and enrollment (M01–M02).',
          bn: 'আবেদন, যাচাই, নির্বাচন ও নথিভুক্তি (M01–M02)।',
        })}
        actions={
          <Link href="/beneficiaries/new" className={buttonClasses('primary', 'md')}>
            <Plus className="h-4 w-4" aria-hidden />
            {_({ en: 'New application', bn: 'নতুন আবেদন' })}
          </Link>
        }
      />
      <DemoBanner message={tCommon('demoData')} />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {pipeline.map((p) => (
          <MiniStat
            key={p.status}
            label={statusLabel(applicationStatus[p.status]!, locale)}
            value={formatNumber(p.count, locale)}
            tone={applicationStatus[p.status]!.tone}
          />
        ))}
      </div>

      <Card>
        <BeneficiariesTable rows={beneficiaries} locale={locale} />
      </Card>
    </div>
  );
}
