/**
 * ILLUSTRATIVE DEMO DATA — NOT real programme figures.
 *
 * Every surface that renders this must show the demo banner. These values exist
 * only to exercise the UI during development and must never be presented as
 * actual government statistics. Replace with live data via the API in later phases.
 */
import type { StatusTone } from '@simcbp/design-tokens';

export interface Bilingual {
  en: string;
  bn: string;
}

export interface DemoNotification {
  id: string;
  title: Bilingual;
  time: Bilingual;
  tone: StatusTone;
}

export const demoNotifications: DemoNotification[] = [
  {
    id: 'n1',
    title: {
      en: 'Payroll cycle 2026-11 ready for review',
      bn: 'পে-রোল চক্র ২০২৬-১১ পর্যালোচনার জন্য প্রস্তুত',
    },
    time: { en: '12 min ago', bn: '১২ মিনিট আগে' },
    tone: 'warning',
  },
  {
    id: 'n2',
    title: { en: '1,204 applications passed verification', bn: '১,২০৪টি আবেদন যাচাই উত্তীর্ণ' },
    time: { en: '1 hour ago', bn: '১ ঘণ্টা আগে' },
    tone: 'success',
  },
  {
    id: 'n3',
    title: { en: 'Nightly backup completed', bn: 'রাত্রিকালীন ব্যাকআপ সম্পন্ন' },
    time: { en: '6 hours ago', bn: '৬ ঘণ্টা আগে' },
    tone: 'info',
  },
];

export const demoStats = {
  activeBeneficiaries: 1248930,
  pendingApplications: 8742,
  paymentsThisCycle: 842310,
  openGrievances: 312,
};

export interface DemoBar {
  label: Bilingual;
  value: number;
  tone: StatusTone;
}

export const demoPipeline: DemoBar[] = [
  { label: { en: 'Submitted', bn: 'জমাকৃত' }, value: 8742, tone: 'info' },
  { label: { en: 'Under verification', bn: 'যাচাইয়াধীন' }, value: 5310, tone: 'warning' },
  { label: { en: 'Eligible', bn: 'যোগ্য' }, value: 4120, tone: 'brand' },
  { label: { en: 'Selected', bn: 'নির্বাচিত' }, value: 3860, tone: 'success' },
  { label: { en: 'Enrolled', bn: 'নথিভুক্ত' }, value: 3598, tone: 'success' },
];

export const demoPayments: DemoBar[] = [
  { label: { en: 'Paid', bn: 'পরিশোধিত' }, value: 781450, tone: 'success' },
  { label: { en: 'Processing', bn: 'প্রক্রিয়াধীন' }, value: 42180, tone: 'info' },
  { label: { en: 'Reconciled', bn: 'মিলকৃত' }, value: 769900, tone: 'brand' },
  { label: { en: 'On hold', bn: 'স্থগিত' }, value: 14300, tone: 'warning' },
  { label: { en: 'Failed', bn: 'ব্যর্থ' }, value: 4380, tone: 'danger' },
];

export const demoGrievances: DemoBar[] = [
  { label: { en: 'Open', bn: 'চলমান' }, value: 312, tone: 'warning' },
  { label: { en: 'In progress', bn: 'প্রক্রিয়াধীন' }, value: 189, tone: 'info' },
  { label: { en: 'Resolved', bn: 'নিষ্পন্ন' }, value: 2471, tone: 'success' },
  { label: { en: 'Escalated', bn: 'ঊর্ধ্বমুখী' }, value: 37, tone: 'danger' },
];

export interface DemoApproval {
  id: string;
  title: Bilingual;
  meta: Bilingual;
  tone: StatusTone;
}

export const demoApprovals: DemoApproval[] = [
  {
    id: 'a1',
    title: { en: 'Payroll cycle 2026-11 authorization', bn: 'পে-রোল চক্র ২০২৬-১১ অনুমোদন' },
    meta: { en: 'Finance · maker–checker', bn: 'অর্থ · মেকার–চেকার' },
    tone: 'warning',
  },
  {
    id: 'a2',
    title: { en: '312 selection decisions — Rangpur', bn: '৩১২টি নির্বাচন সিদ্ধান্ত — রংপুর' },
    meta: { en: 'District review', bn: 'জেলা পর্যালোচনা' },
    tone: 'info',
  },
  {
    id: 'a3',
    title: { en: 'Master-data change: benefit rate', bn: 'মাস্টার-ডেটা পরিবর্তন: সুবিধার হার' },
    meta: { en: 'Requires Programme Director', bn: 'কর্মসূচি পরিচালক প্রয়োজন' },
    tone: 'danger',
  },
];

export interface DemoActivity {
  id: string;
  actor: string;
  action: Bilingual;
  time: Bilingual;
}

export const demoActivity: DemoActivity[] = [
  {
    id: 'ac1',
    actor: 'R. Akter',
    action: { en: 'approved 54 enrollments', bn: '৫৪টি নথিভুক্তি অনুমোদন করেছেন' },
    time: { en: '09:42', bn: '০৯:৪২' },
  },
  {
    id: 'ac2',
    actor: 'System',
    action: { en: 'generated payroll cycle 2026-11', bn: 'পে-রোল চক্র ২০২৬-১১ তৈরি করেছে' },
    time: { en: '08:00', bn: '০৮:০০' },
  },
  {
    id: 'ac3',
    actor: 'M. Hossain',
    action: { en: 'resolved grievance #G-10482', bn: 'অভিযোগ #G-10482 নিষ্পন্ন করেছেন' },
    time: { en: 'Yesterday', bn: 'গতকাল' },
  },
];

export interface DemoHealth {
  label: Bilingual;
  value: Bilingual;
  tone: StatusTone;
}

export const demoHealth: DemoHealth[] = [
  { label: { en: 'API', bn: 'এপিআই' }, value: { en: 'Operational', bn: 'সচল' }, tone: 'success' },
  {
    label: { en: 'Database', bn: 'ডেটাবেস' },
    value: { en: 'Operational', bn: 'সচল' },
    tone: 'success',
  },
  {
    label: { en: 'Payment gateway', bn: 'পেমেন্ট গেটওয়ে' },
    value: { en: 'Sandbox', bn: 'স্যান্ডবক্স' },
    tone: 'warning',
  },
  {
    label: { en: 'Last backup', bn: 'সর্বশেষ ব্যাকআপ' },
    value: { en: '6h ago', bn: '৬ ঘণ্টা আগে' },
    tone: 'info',
  },
];
