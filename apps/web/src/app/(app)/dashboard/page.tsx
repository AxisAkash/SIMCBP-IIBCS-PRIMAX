import { Banknote, FileClock, MessageSquare, Users } from 'lucide-react';
import { getLocale } from '@/lib/i18n/server';
import { getMessages, createTranslator } from '@/lib/i18n/messages';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { EmptyState } from '@/components/ui/states';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { BarList } from '@/components/dashboard/bar-list';
import { formatNumber } from '@/lib/format';
import {
  demoActivity,
  demoApprovals,
  demoGrievances,
  demoHealth,
  demoPayments,
  demoPipeline,
  demoStats,
} from '@/lib/demo-data';

export const metadata = { title: 'Dashboard' };

const toneDot: Record<string, string> = {
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  brand: 'bg-primary',
  neutral: 'bg-muted',
};

export default async function DashboardPage() {
  const locale = await getLocale();
  const messages = getMessages(locale);
  const t = createTranslator(messages, 'dashboard');
  const tStats = createTranslator(messages, 'dashboard.stats');
  const tSec = createTranslator(messages, 'dashboard.sections');
  const tEmpty = createTranslator(messages, 'dashboard.empty');

  return (
    <div>
      <PageHeader title={t('title')} description={t('subtitle')} />
      <DemoBanner message={t('demoBanner')} />

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={tStats('activeBeneficiaries')}
          value={formatNumber(demoStats.activeBeneficiaries, locale)}
          icon={Users}
          delta={{ value: '2.1%', direction: 'up' }}
        />
        <StatCard
          label={tStats('pendingApplications')}
          value={formatNumber(demoStats.pendingApplications, locale)}
          icon={FileClock}
          delta={{ value: '340', direction: 'up', positive: false }}
        />
        <StatCard
          label={tStats('paymentsThisCycle')}
          value={formatNumber(demoStats.paymentsThisCycle, locale)}
          icon={Banknote}
          delta={{ value: '12.4%', direction: 'up' }}
        />
        <StatCard
          label={tStats('openGrievances')}
          value={formatNumber(demoStats.openGrievances, locale)}
          icon={MessageSquare}
          delta={{ value: '18', direction: 'down' }}
        />
      </div>

      {/* Distribution cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title={tSec('applicationPipeline')} />
          <CardContent>
            <BarList items={demoPipeline} locale={locale} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title={tSec('paymentOverview')} />
          <CardContent>
            <BarList items={demoPayments} locale={locale} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title={tSec('grievanceStatus')} />
          <CardContent>
            <BarList items={demoGrievances} locale={locale} />
          </CardContent>
        </Card>
      </div>

      {/* Operational row */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title={tSec('pendingApprovals')} />
          <CardContent className="p-0">
            {demoApprovals.length ? (
              <ul className="divide-y divide-border">
                {demoApprovals.map((a) => (
                  <li key={a.id} className="flex items-start gap-2.5 px-5 py-3">
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${toneDot[a.tone]}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{a.title[locale]}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{a.meta[locale]}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title={tEmpty('approvals')} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={tSec('recentActivity')} />
          <CardContent className="p-0">
            {demoActivity.length ? (
              <ul className="divide-y divide-border">
                {demoActivity.map((a) => (
                  <li key={a.id} className="flex items-baseline justify-between gap-3 px-5 py-3">
                    <p className="min-w-0 text-sm text-foreground">
                      <span className="font-medium">{a.actor}</span>{' '}
                      <span className="text-muted-foreground">{a.action[locale]}</span>
                    </p>
                    <span className="shrink-0 text-xs tabular-nums text-muted">
                      {a.time[locale]}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title={tEmpty('activity')} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={tSec('systemHealth')} />
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {demoHealth.map((h, i) => (
                <li key={i} className="flex items-center justify-between px-5 py-3">
                  <span className="text-sm text-foreground">{h.label[locale]}</span>
                  <StatusBadge tone={h.tone} label={h.value[locale]} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
