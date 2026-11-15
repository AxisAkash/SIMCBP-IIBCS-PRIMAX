'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Banknote,
  FileClock,
  MessageSquare,
  Users,
  Wallet,
  ShieldCheck,
  BarChart3,
  LifeBuoy,
  PackageCheck,
  MapPin,
} from 'lucide-react';
import { ROLE_DEFINITIONS, Role } from '@simcbp/types';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { EmptyState } from '@/components/ui/states';
import { Select } from '@/components/ui/form';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { BarList } from '@/components/dashboard/bar-list';
import { formatNumber } from '@/lib/format';
import { overallReadiness } from '@/lib/mock/handover';
import {
  demoActivity,
  demoApprovals,
  demoGrievances,
  demoHealth,
  demoPayments,
  demoPipeline,
  demoStats,
} from '@/lib/demo-data';

const toneDot: Record<string, string> = {
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  brand: 'bg-primary',
  neutral: 'bg-muted',
};

const VIEW_ROLES: Role[] = [
  Role.SYSTEM_ADMIN,
  Role.PROGRAMME_DIRECTOR,
  Role.FINANCE_OFFICER,
  Role.DISTRICT_ADMIN,
  Role.FIELD_OFFICER,
  Role.MNE_ANALYST,
  Role.AUDITOR,
  Role.HELPDESK_AGENT,
];

export default function DashboardPage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const _ = bi(locale);
  const [role, setRole] = useState<Role>(Role.SYSTEM_ADMIN);
  const bn = locale === 'bn';
  const fmt = (n: number) => formatNumber(n, locale);

  // Role-tailored KPI strip.
  const kpiByRole: Partial<
    Record<Role, { label: string; value: string; icon: typeof Users; tone?: string }[]>
  > = {
    [Role.FINANCE_OFFICER]: [
      {
        label: _({ en: 'Payments this cycle', bn: 'এই চক্রের পেমেন্ট' }),
        value: fmt(demoStats.paymentsThisCycle),
        icon: Banknote,
      },
      {
        label: _({ en: 'Disbursed (৳)', bn: 'বিতরণকৃত (৳)' }),
        value: `৳ ${fmt(673160000)}`,
        icon: Wallet,
      },
      { label: _({ en: 'On hold', bn: 'স্থগিত' }), value: fmt(14300), icon: FileClock },
      { label: _({ en: 'Failed', bn: 'ব্যর্থ' }), value: fmt(4380), icon: MessageSquare },
    ],
    [Role.FIELD_OFFICER]: [
      { label: _({ en: 'Assigned today', bn: 'আজ বরাদ্দ' }), value: '24', icon: FileClock },
      { label: _({ en: 'Verified', bn: 'যাচাইকৃত' }), value: '17', icon: ShieldCheck },
      { label: _({ en: 'Offline queue', bn: 'অফলাইন সারি' }), value: '3', icon: MapPin },
      { label: _({ en: 'Pending', bn: 'বাকি' }), value: '7', icon: Users },
    ],
    [Role.AUDITOR]: [
      {
        label: _({ en: 'Audit events (24h)', bn: 'অডিট ইভেন্ট (২৪ঘ)' }),
        value: fmt(1284),
        icon: ShieldCheck,
      },
      { label: _({ en: 'Flagged items', bn: 'ফ্ল্যাগড আইটেম' }), value: '9', icon: FileClock },
      {
        label: _({ en: 'Open approvals', bn: 'চলমান অনুমোদন' }),
        value: fmt(demoApprovals.length),
        icon: PackageCheck,
      },
      {
        label: _({ en: 'Handover readiness', bn: 'হ্যান্ডওভার প্রস্তুতি' }),
        value: `${overallReadiness()}%`,
        icon: PackageCheck,
      },
    ],
    [Role.HELPDESK_AGENT]: [
      { label: _({ en: 'Open tickets', bn: 'চলমান টিকিট' }), value: '46', icon: LifeBuoy },
      { label: _({ en: 'Breaching SLA', bn: 'এসএলএ লঙ্ঘন' }), value: '5', icon: FileClock },
      { label: _({ en: 'Resolved today', bn: 'আজ নিষ্পন্ন' }), value: '38', icon: ShieldCheck },
      { label: _({ en: 'Referrals', bn: 'রেফারেল' }), value: '12', icon: MessageSquare },
    ],
    [Role.MNE_ANALYST]: [
      { label: _({ en: 'Avg. coverage', bn: 'গড় কভারেজ' }), value: '78%', icon: BarChart3 },
      { label: _({ en: 'Active reports', bn: 'সক্রিয় প্রতিবেদন' }), value: '5', icon: BarChart3 },
      { label: _({ en: 'Enrolled (cycle)', bn: 'নথিভুক্ত (চক্র)' }), value: fmt(3598), icon: Users },
      { label: _({ en: 'Grievance rate', bn: 'অভিযোগ হার' }), value: '0.4%', icon: MessageSquare },
    ],
  };

  const defaultKpi = [
    {
      label: _({ en: 'Active beneficiaries', bn: 'সক্রিয় উপকারভোগী' }),
      value: fmt(demoStats.activeBeneficiaries),
      icon: Users,
    },
    {
      label: _({ en: 'Pending applications', bn: 'অপেক্ষমাণ আবেদন' }),
      value: fmt(demoStats.pendingApplications),
      icon: FileClock,
    },
    {
      label: _({ en: 'Payments this cycle', bn: 'এই চক্রের পেমেন্ট' }),
      value: fmt(demoStats.paymentsThisCycle),
      icon: Banknote,
    },
    {
      label: _({ en: 'Open grievances', bn: 'চলমান অভিযোগ' }),
      value: fmt(demoStats.openGrievances),
      icon: MessageSquare,
    },
  ];

  const kpis = kpiByRole[role] ?? defaultKpi;

  return (
    <div>
      <PageHeader
        title={_({ en: 'Executive Dashboard', bn: 'নির্বাহী ড্যাশবোর্ড' })}
        description={`${_({ en: 'Viewing as', bn: 'দেখছেন' })}: ${bn ? ROLE_DEFINITIONS[role].labelBn : ROLE_DEFINITIONS[role].labelEn}`}
        actions={
          <div className="w-56">
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              options={VIEW_ROLES.map((r) => ({
                value: r,
                label: bn ? ROLE_DEFINITIONS[r].labelBn : ROLE_DEFINITIONS[r].labelEn,
              }))}
            />
          </div>
        }
      />
      <DemoBanner message={tc('demoData')} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k, i) => (
          <StatCard key={i} label={k.label} value={k.value} icon={k.icon} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title={_({ en: 'Application pipeline', bn: 'আবেদন পাইপলাইন' })} />
          <CardContent>
            <BarList items={demoPipeline} locale={locale} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title={_({ en: 'Payment overview', bn: 'পেমেন্ট সারসংক্ষেপ' })} />
          <CardContent>
            <BarList items={demoPayments} locale={locale} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title={_({ en: 'Grievance status', bn: 'অভিযোগের অবস্থা' })} />
          <CardContent>
            <BarList items={demoGrievances} locale={locale} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader
            title={_({ en: 'Pending approvals', bn: 'অপেক্ষমাণ অনুমোদন' })}
            action={
              <Link href="/handover" className="text-xs text-primary hover:underline">
                {_({ en: 'View', bn: 'দেখুন' })}
              </Link>
            }
          />
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
              <EmptyState
                title={_({ en: 'No pending approvals', bn: 'কোনো অপেক্ষমাণ অনুমোদন নেই' })}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={_({ en: 'Recent activity', bn: 'সাম্প্রতিক কার্যক্রম' })} />
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {demoActivity.map((a) => (
                <li key={a.id} className="flex items-baseline justify-between gap-3 px-5 py-3">
                  <p className="min-w-0 text-sm text-foreground">
                    <span className="font-medium">{a.actor}</span>{' '}
                    <span className="text-muted-foreground">{a.action[locale]}</span>
                  </p>
                  <span className="shrink-0 text-xs tabular-nums text-muted">{a.time[locale]}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={_({ en: 'System health', bn: 'সিস্টেম স্বাস্থ্য' })} />
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
