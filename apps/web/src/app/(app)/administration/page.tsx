'use client';

import { useState } from 'react';
import { Check, Minus, Plus, ShieldCheck } from 'lucide-react';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MiniStat } from '@/components/ui/mini-stat';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatusCell } from '@/components/ui/status-cell';
import { Tabs } from '@/components/ui/tabs';
import { Drawer } from '@/components/ui/overlay';
import { FormField, Input, Select, Switch } from '@/components/ui/form';
import { useToast } from '@/components/ui/toast';
import { userStatus } from '@/lib/statuses';
import { tx } from '@/lib/mock/common';
import { formatNumber } from '@/lib/format';
import {
  users,
  roleLabel,
  matrixRoles,
  permissionAreas,
  permissionMatrix,
  type AppUser,
} from '@/lib/mock/admin';

const LEVELS = ['—', 'View', 'Edit', 'Approve'];
const LEVEL_TONE = ['neutral', 'info', 'brand', 'success'] as const;

export default function AdministrationPage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const toast = useToast();
  const _ = bi(locale);
  const bn = locale === 'bn';
  const [addOpen, setAddOpen] = useState(false);
  const [mfa, setMfa] = useState(true);

  const cols: Column<AppUser>[] = [
    {
      key: 'name',
      header: _({ en: 'User', bn: 'ব্যবহারকারী' }),
      render: (r) => <span className="font-medium">{r.name}</span>,
      sortValue: (r) => r.name,
    },
    {
      key: 'role',
      header: _({ en: 'Role', bn: 'ভূমিকা' }),
      render: (r) => <span className="text-muted-foreground">{roleLabel(r.role, bn)}</span>,
      sortValue: (r) => r.role,
    },
    {
      key: 'division',
      header: _({ en: 'Jurisdiction', bn: 'অধিক্ষেত্র' }),
      render: (r) => tx(r.division, locale),
    },
    {
      key: 'mfa',
      header: 'MFA',
      render: (r) => (r.mfa ? <Badge tone="success">On</Badge> : <Badge tone="neutral">Off</Badge>),
    },
    {
      key: 'status',
      header: _({ en: 'Status', bn: 'অবস্থা' }),
      render: (r) => <StatusCell meta={userStatus[r.status]} locale={locale} />,
      sortValue: (r) => r.status,
    },
    {
      key: 'last',
      header: _({ en: 'Last login', bn: 'সর্বশেষ লগইন' }),
      render: (r) => <span className="tabular-nums text-muted-foreground">{r.lastLogin}</span>,
      sortValue: (r) => r.lastLogin,
    },
  ];

  const active = users.filter((u) => u.status === 'active').length;
  const mfaOn = users.filter((u) => u.mfa).length;

  const usersTab = (
    <Card>
      <DataTable
        columns={cols}
        data={users}
        rowKey={(r) => r.id}
        searchable
        searchText={(r) => `${r.name} ${r.id}`}
        searchPlaceholder={_({ en: 'Search users…', bn: 'ব্যবহারকারী খুঁজুন…' })}
      />
    </Card>
  );

  const matrixTab = (
    <Card>
      <CardHeader
        title={_({ en: 'Role permission matrix', bn: 'রোল অনুমতি ম্যাট্রিক্স' })}
        description={_({
          en: 'Effective access is also constrained by geographic jurisdiction.',
          bn: 'কার্যকর অ্যাক্সেস ভৌগোলিক অধিক্ষেত্র দ্বারাও সীমাবদ্ধ।',
        })}
      />
      <CardContent className="scrollbar-thin overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-sunken/50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase text-muted-foreground">
                {_({ en: 'Role', bn: 'ভূমিকা' })}
              </th>
              {permissionAreas.map((a, i) => (
                <th
                  key={i}
                  className="px-4 py-2.5 text-center text-xs font-semibold uppercase text-muted-foreground"
                >
                  {tx(a, locale)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrixRoles.map((role) => (
              <tr key={role} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium">{roleLabel(role, bn)}</td>
                {permissionMatrix[role]!.map((lvl, i) => (
                  <td key={i} className="px-4 py-3 text-center">
                    <Badge tone={LEVEL_TONE[lvl]}>
                      {lvl === 0 ? (
                        <Minus className="h-3 w-3" />
                      ) : lvl === 3 ? (
                        <Check className="h-3 w-3" />
                      ) : null}
                      {LEVELS[lvl]}
                    </Badge>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <PageHeader
        title={_({
          en: 'User Management & Access Control',
          bn: 'ব্যবহারকারী ব্যবস্থাপনা ও অ্যাক্সেস নিয়ন্ত্রণ',
        })}
        description={_({
          en: 'Users, roles, jurisdiction and MFA (M11 / IAM).',
          bn: 'ব্যবহারকারী, ভূমিকা, অধিক্ষেত্র ও এমএফএ (M11 / IAM)।',
        })}
        actions={
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setAddOpen(true)}>
            {_({ en: 'Add user', bn: 'ব্যবহারকারী যোগ' })}
          </Button>
        }
      />
      <DemoBanner message={tc('demoData')} />
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MiniStat
          label={_({ en: 'Total users', bn: 'মোট ব্যবহারকারী' })}
          value={formatNumber(users.length, locale)}
          tone="brand"
        />
        <MiniStat
          label={_({ en: 'Active', bn: 'সক্রিয়' })}
          value={formatNumber(active, locale)}
          tone="success"
        />
        <MiniStat
          label={_({ en: 'MFA enabled', bn: 'এমএফএ সক্রিয়' })}
          value={formatNumber(mfaOn, locale)}
          tone="info"
        />
        <MiniStat label={_({ en: 'Roles', bn: 'ভূমিকা' })} value="14" tone="neutral" />
      </div>

      <Tabs
        items={[
          { key: 'users', label: _({ en: 'Users', bn: 'ব্যবহারকারী' }), content: usersTab },
          { key: 'matrix', label: _({ en: 'Permissions', bn: 'অনুমতি' }), content: matrixTab },
        ]}
      />

      <Drawer
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title={_({ en: 'Add user', bn: 'ব্যবহারকারী যোগ' })}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setAddOpen(false)}>
              {_({ en: 'Cancel', bn: 'বাতিল' })}
            </Button>
            <Button
              size="sm"
              leftIcon={<ShieldCheck className="h-4 w-4" />}
              onClick={() => {
                toast.toast({
                  title: _({ en: 'Invitation sent', bn: 'আমন্ত্রণ পাঠানো হয়েছে' }),
                  description: _({ en: 'Demo only.', bn: 'শুধু ডেমো।' }),
                  tone: 'success',
                });
                setAddOpen(false);
              }}
            >
              {_({ en: 'Invite', bn: 'আমন্ত্রণ' })}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label={_({ en: 'Full name', bn: 'পূর্ণ নাম' })} required>
            <Input placeholder={_({ en: 'e.g. A. Rahman', bn: 'যেমন এ. রহমান' })} />
          </FormField>
          <FormField label={_({ en: 'Email', bn: 'ইমেইল' })} required>
            <Input type="email" />
          </FormField>
          <FormField label={_({ en: 'Role', bn: 'ভূমিকা' })} required>
            <Select
              options={matrixRoles.map((r) => ({ value: r, label: roleLabel(r, bn) }))}
              placeholder={_({ en: 'Select role…', bn: 'ভূমিকা নির্বাচন…' })}
            />
          </FormField>
          <FormField label={_({ en: 'Jurisdiction (division)', bn: 'অধিক্ষেত্র (বিভাগ)' })}>
            <Input placeholder={_({ en: 'e.g. Dhaka', bn: 'যেমন ঢাকা' })} />
          </FormField>
          <Switch
            checked={mfa}
            onChange={setMfa}
            label={_({
              en: 'Require multi-factor authentication',
              bn: 'মাল্টি-ফ্যাক্টর প্রমাণীকরণ আবশ্যক',
            })}
          />
        </div>
      </Drawer>
    </div>
  );
}
