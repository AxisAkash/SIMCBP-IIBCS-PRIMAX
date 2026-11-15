'use client';

import { useState } from 'react';
import {
  Calendar,
  CheckSquare,
  ChevronDown,
  FileUp,
  Hash,
  Plus,
  Trash2,
  Type,
  Upload,
} from 'lucide-react';
import { useLocale, useTranslations } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DemoBanner } from '@/components/dashboard/demo-banner';
import { useToast } from '@/components/ui/toast';
import { isoDate } from '@/lib/mock/common';

interface Field {
  id: number;
  type: string;
  label: string;
}

export default function DynamicModulesPage() {
  const locale = useLocale();
  const tc = useTranslations('common');
  const toast = useToast();
  const _ = bi(locale);

  const palette = [
    { type: 'text', icon: Type, en: 'Text', bn: 'টেক্সট' },
    { type: 'number', icon: Hash, en: 'Number', bn: 'সংখ্যা' },
    { type: 'date', icon: Calendar, en: 'Date', bn: 'তারিখ' },
    { type: 'select', icon: ChevronDown, en: 'Dropdown', bn: 'ড্রপডাউন' },
    { type: 'checkbox', icon: CheckSquare, en: 'Checkbox', bn: 'চেকবক্স' },
    { type: 'file', icon: FileUp, en: 'File', bn: 'ফাইল' },
  ];

  const [fields, setFields] = useState<Field[]>([
    { id: 1, type: 'text', label: 'Beneficiary name' },
    { id: 2, type: 'number', label: 'Household size' },
  ]);
  const [seq, setSeq] = useState(3);

  const add = (type: string, label: string) => {
    setFields((f) => [...f, { id: seq, type, label }]);
    setSeq((s) => s + 1);
  };

  const versions = [
    {
      v: 'v1.3',
      date: isoDate(2),
      by: 'R. Akter',
      note: _({ en: 'Added household fields', bn: 'পরিবার ক্ষেত্র যোগ' }),
    },
    {
      v: 'v1.2',
      date: isoDate(9),
      by: 'S. Chowdhury',
      note: _({ en: 'Workflow rules update', bn: 'ওয়ার্কফ্লো নিয়ম হালনাগাদ' }),
    },
    {
      v: 'v1.1',
      date: isoDate(20),
      by: 'K. Rahman',
      note: _({ en: 'Initial draft', bn: 'প্রাথমিক খসড়া' }),
    },
  ];

  return (
    <div>
      <PageHeader
        title={_({ en: 'Dynamic Module Builder', bn: 'ডাইনামিক মডিউল বিল্ডার' })}
        description={_({
          en: 'Form builder, business rules and governed bulk exchange (M13).',
          bn: 'ফর্ম বিল্ডার, ব্যবসায়িক নিয়ম ও নিয়ন্ত্রিত বাল্ক বিনিময় (M13)।',
        })}
        actions={
          <Button
            leftIcon={<Upload className="h-4 w-4" />}
            onClick={() =>
              toast.toast({
                title: _({ en: 'Submitted for approval', bn: 'অনুমোদনের জন্য জমা' }),
                description: _({
                  en: 'Demo only — publish requires approval.',
                  bn: 'শুধু ডেমো — প্রকাশে অনুমোদন প্রয়োজন।',
                }),
                tone: 'info',
              })
            }
          >
            {_({ en: 'Publish', bn: 'প্রকাশ' })}
          </Button>
        }
      />
      <DemoBanner message={tc('demoData')} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader
            title={_({ en: 'Field palette', bn: 'ফিল্ড প্যালেট' })}
            description={_({ en: 'Click to add a field.', bn: 'যোগ করতে ক্লিক করুন।' })}
          />
          <CardContent className="grid grid-cols-2 gap-2">
            {palette.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.type}
                  type="button"
                  onClick={() => add(p.type, _(p))}
                  className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:border-primary hover:bg-surface-sunken"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
                  {_(p)}
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader
            title={_({ en: 'Form canvas', bn: 'ফর্ম ক্যানভাস' })}
            description={`${fields.length} ${_({ en: 'fields', bn: 'ফিল্ড' })}`}
          />
          <CardContent className="space-y-2">
            {fields.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted">
                {_({
                  en: 'No fields yet — add from the palette.',
                  bn: 'এখনও কোনো ফিল্ড নেই — প্যালেট থেকে যোগ করুন।',
                })}
              </p>
            ) : (
              fields.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between rounded-md border border-border px-3 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <Plus className="h-3.5 w-3.5 text-muted" aria-hidden />
                    <span className="text-sm font-medium">{f.label}</span>
                    <Badge tone="neutral">{f.type}</Badge>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove"
                    onClick={() => setFields((arr) => arr.filter((x) => x.id !== f.id))}
                    className="text-muted-foreground hover:text-danger"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader
          title={_({ en: 'Configuration version history', bn: 'কনফিগারেশন সংস্করণ ইতিহাস' })}
        />
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {versions.map((v, i) => (
              <li key={i} className="flex items-center justify-between px-5 py-3 text-sm">
                <span className="flex items-center gap-3">
                  <Badge tone={i === 0 ? 'success' : 'neutral'}>{v.v}</Badge>
                  <span>{v.note}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {v.by} · {v.date}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
