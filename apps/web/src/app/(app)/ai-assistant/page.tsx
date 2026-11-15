'use client';

import { useState } from 'react';
import { Bot, Send, ShieldAlert, Sparkles, User } from 'lucide-react';
import { useLocale } from '@/lib/i18n/provider';
import { bi } from '@/lib/i18n/bilingual';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Msg {
  role: 'user' | 'assistant';
  text: string;
  source?: string;
}

export default function AiAssistantPage() {
  const locale = useLocale();
  const _ = bi(locale);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      text: _({
        en: 'Hello — I am the MCBP advisory assistant. I can summarize programme data and guide workflows. I cannot approve applications, change eligibility, or authorize payments.',
        bn: 'হ্যালো — আমি এমসিবিপি পরামর্শক সহকারী। আমি কর্মসূচির তথ্য সারসংক্ষেপ ও ওয়ার্কফ্লো নির্দেশনা দিতে পারি। আমি আবেদন অনুমোদন, যোগ্যতা পরিবর্তন বা পেমেন্ট অনুমোদন করতে পারি না।',
      }),
    },
  ]);
  const [input, setInput] = useState('');

  const suggestions = [
    { en: 'How many applications are pending verification?', bn: 'কতটি আবেদন যাচাইয়ের অপেক্ষায়?' },
    { en: 'Summarize this month’s payment status', bn: 'এই মাসের পেমেন্ট অবস্থা সারসংক্ষেপ করুন' },
    { en: 'Which division has the lowest coverage?', bn: 'কোন বিভাগে সবচেয়ে কম কভারেজ?' },
  ];

  function reply(text: string): Msg {
    const t = text.toLowerCase();
    if (t.includes('payment') || t.includes('পেমেন্ট'))
      return {
        role: 'assistant',
        text: _({
          en: 'In the current demo cycle, most transactions are paid or reconciled, with a small number on hold pending maker–checker review. I can draft a reconciliation summary for a human to approve.',
          bn: 'বর্তমান ডেমো চক্রে, বেশিরভাগ লেনদেন পরিশোধিত বা মিলকৃত, কিছু মেকার–চেকার পর্যালোচনার জন্য স্থগিত। আমি মানুষের অনুমোদনের জন্য একটি মিলকরণ সারসংক্ষেপ তৈরি করতে পারি।',
        }),
        source: _({ en: 'Source: Payments module (demo)', bn: 'উৎস: পেমেন্ট মডিউল (ডেমো)' }),
      };
    if (t.includes('coverage') || t.includes('division') || t.includes('কভারেজ'))
      return {
        role: 'assistant',
        text: _({
          en: 'Coverage varies by division in the demo data. The GIS workspace shows the full cartogram and ranking.',
          bn: 'ডেমো ডেটায় বিভাগভেদে কভারেজ ভিন্ন। জিআইএস ওয়ার্কস্পেসে সম্পূর্ণ কার্টোগ্রাম ও র‍্যাঙ্কিং দেখানো হয়েছে।',
        }),
        source: _({ en: 'Source: GIS module (demo)', bn: 'উৎস: জিআইএস মডিউল (ডেমো)' }),
      };
    return {
      role: 'assistant',
      text: _({
        en: 'Here is an advisory summary based on demo data. Any action (approval, payment, eligibility change) must be performed and confirmed by an authorized human user.',
        bn: 'ডেমো ডেটার ভিত্তিতে একটি পরামর্শমূলক সারসংক্ষেপ। যেকোনো পদক্ষেপ (অনুমোদন, পেমেন্ট, যোগ্যতা পরিবর্তন) অনুমোদিত মানব ব্যবহারকারীকে সম্পাদন ও নিশ্চিত করতে হবে।',
      }),
      source: _({
        en: 'Advisory only · human approval required',
        bn: 'শুধু পরামর্শ · মানব অনুমোদন প্রয়োজন',
      }),
    };
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: 'user', text: trimmed }, reply(trimmed)]);
    setInput('');
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title={_({ en: 'AI Assistant', bn: 'এআই সহকারী' })}
        description={_({
          en: 'Bilingual advisory assistant and workflow guidance (M09).',
          bn: 'দ্বিভাষিক পরামর্শক সহকারী ও ওয়ার্কফ্লো নির্দেশনা (M09)।',
        })}
      />

      <div className="mb-4 flex items-start gap-2.5 rounded-md border-l-2 border-warning bg-warning-soft px-4 py-2.5 text-sm text-foreground">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden />
        <span>
          {_({
            en: 'Advisory only. The assistant never approves/rejects applications, changes eligibility, or authorizes payments — every action requires human review and is audited.',
            bn: 'শুধু পরামর্শমূলক। সহকারী কখনো আবেদন অনুমোদন/প্রত্যাখ্যান, যোগ্যতা পরিবর্তন বা পেমেন্ট অনুমোদন করে না — প্রতিটি পদক্ষেপে মানব পর্যালোচনা ও অডিট প্রয়োজন।',
          })}
        </span>
      </div>

      <Card className="flex h-[26rem] flex-col">
        <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${m.role === 'user' ? 'bg-surface-sunken text-muted-foreground' : 'bg-primary text-primary-foreground'}`}
              >
                {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </span>
              <div
                className={`max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'border border-border bg-surface-sunken/50 text-foreground'}`}
              >
                <p>{m.text}</p>
                {m.source ? <p className="mt-1.5 text-xs italic opacity-70">{m.source}</p> : null}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-3">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => send(_(s))}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted-foreground hover:border-primary hover:text-foreground"
              >
                <Sparkles className="h-3 w-3" aria-hidden />
                {_(s)}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={_({ en: 'Ask about the programme…', bn: 'কর্মসূচি সম্পর্কে জিজ্ঞাসা করুন…' })}
              className="h-9 flex-1 rounded-md border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted focus:border-primary"
            />
            <Button type="submit" size="icon" aria-label={_({ en: 'Send', bn: 'পাঠান' })}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
