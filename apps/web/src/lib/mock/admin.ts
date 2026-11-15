import { ROLE_DEFINITIONS, Role } from '@simcbp/types';
import { type Bilingual, DIVISIONS, STAFF_NAMES, isoDate, pick } from './common';

/* ---------------- Users / IAM (M11) ---------------- */
export interface AppUser {
  id: string;
  name: string;
  role: Role;
  division: Bilingual;
  status: string; // active | invited | suspended | locked
  mfa: boolean;
  lastLogin: string;
}

const ROLE_POOL: Role[] = [
  Role.NATIONAL_ADMIN,
  Role.DIVISION_ADMIN,
  Role.DISTRICT_ADMIN,
  Role.UPAZILA_ADMIN,
  Role.FIELD_OFFICER,
  Role.FINANCE_OFFICER,
  Role.MNE_ANALYST,
  Role.AUDITOR,
  Role.HELPDESK_AGENT,
];
const USER_STATUS = [
  'active',
  'active',
  'active',
  'invited',
  'suspended',
  'active',
  'locked',
  'active',
];

export const users: AppUser[] = Array.from({ length: 20 }, (_, i) => ({
  id: `U-${String(1000 + i)}`,
  name: `${STAFF_NAMES[i % STAFF_NAMES.length]}`,
  role: pick(ROLE_POOL, i),
  division: pick(DIVISIONS, i),
  status: pick(USER_STATUS, i),
  mfa: ROLE_DEFINITIONS[pick(ROLE_POOL, i)].requiresMfa,
  lastLogin: isoDate(i % 14),
}));

export function roleLabel(role: Role, bn: boolean): string {
  return bn ? ROLE_DEFINITIONS[role].labelBn : ROLE_DEFINITIONS[role].labelEn;
}

/* Permission matrix — roles × capability areas. */
export const permissionAreas: Bilingual[] = [
  { en: 'Beneficiaries', bn: 'উপকারভোগী' },
  { en: 'Payments', bn: 'পেমেন্ট' },
  { en: 'Grievance', bn: 'অভিযোগ' },
  { en: 'Reports', bn: 'প্রতিবেদন' },
  { en: 'Administration', bn: 'প্রশাসন' },
];
export const matrixRoles: Role[] = [
  Role.NATIONAL_ADMIN,
  Role.DISTRICT_ADMIN,
  Role.FIELD_OFFICER,
  Role.FINANCE_OFFICER,
  Role.AUDITOR,
];
// 0 = none, 1 = view, 2 = edit, 3 = approve
export const permissionMatrix: Record<string, number[]> = {
  [Role.NATIONAL_ADMIN]: [3, 3, 3, 3, 3],
  [Role.DISTRICT_ADMIN]: [2, 1, 2, 2, 1],
  [Role.FIELD_OFFICER]: [2, 0, 2, 1, 0],
  [Role.FINANCE_OFFICER]: [1, 3, 1, 2, 0],
  [Role.AUDITOR]: [1, 1, 1, 2, 1],
};

/* ---------------- Helpdesk (M12) ---------------- */
export interface Ticket {
  id: string;
  subject: Bilingual;
  channel: string; // Helpline | Email | Portal | Field
  priority: string;
  status: string; // new | assigned | pending | resolved
  sla: string;
  assignee: string;
}
const TK_SUB: Bilingual[] = [
  { en: 'How to update bank account', bn: 'ব্যাংক হিসাব হালনাগাদ' },
  { en: 'Payment delay query', bn: 'পেমেন্ট বিলম্ব জিজ্ঞাসা' },
  { en: 'Lost beneficiary card', bn: 'উপকারভোগী কার্ড হারানো' },
  { en: 'Eligibility question', bn: 'যোগ্যতা সংক্রান্ত প্রশ্ন' },
  { en: 'Referral to health service', bn: 'স্বাস্থ্যসেবায় রেফারেল' },
];
const CHANNELS = ['Helpline', 'Portal', 'Email', 'Field'];
const TK_STATUS = [
  'new',
  'assigned',
  'pending',
  'resolved',
  'assigned',
  'resolved',
  'new',
  'pending',
];
const PRI = ['high', 'medium', 'low'];
export const tickets: Ticket[] = Array.from({ length: 26 }, (_, i) => ({
  id: `TKT-${String(5000 + i)}`,
  subject: pick(TK_SUB, i),
  channel: pick(CHANNELS, i),
  priority: pick(PRI, i),
  status: pick(TK_STATUS, i),
  sla: pick(TK_STATUS, i) === 'resolved' ? '—' : `${4 + (i % 20)}h`,
  assignee: STAFF_NAMES[i % STAFF_NAMES.length] as string,
}));

/* ---------------- Schemes (M14) ---------------- */
export interface Scheme {
  id: string;
  name: Bilingual;
  status: string; // active | planned
  beneficiaries: number;
  benefitRate: number;
}
export const schemes: Scheme[] = [
  {
    id: 'SCH-01',
    name: { en: 'Mother & Child Benefit (MCBP)', bn: 'মা ও শিশু সহায়তা (এমসিবিপি)' },
    status: 'active',
    beneficiaries: 1248930,
    benefitRate: 800,
  },
  {
    id: 'SCH-02',
    name: { en: 'Lactating Mother Allowance', bn: 'ল্যাক্টেটিং মাদার ভাতা' },
    status: 'active',
    beneficiaries: 412300,
    benefitRate: 800,
  },
  {
    id: 'SCH-03',
    name: { en: 'Working Mother Support', bn: 'কর্মজীবী মা সহায়তা' },
    status: 'planned',
    beneficiaries: 0,
    benefitRate: 1000,
  },
  {
    id: 'SCH-04',
    name: { en: 'Adolescent Nutrition Pilot', bn: 'কিশোরী পুষ্টি পাইলট' },
    status: 'planned',
    beneficiaries: 0,
    benefitRate: 600,
  },
];

/* ---------------- Audit log (X1) ---------------- */
export interface AuditEntry {
  id: string;
  actor: string;
  action: Bilingual;
  entity: string;
  ip: string;
  time: string;
}
const ACTIONS: Bilingual[] = [
  { en: 'Approved enrollment', bn: 'নথিভুক্তি অনুমোদন' },
  { en: 'Updated beneficiary profile', bn: 'উপকারভোগী প্রোফাইল হালনাগাদ' },
  { en: 'Generated payroll cycle', bn: 'পে-রোল চক্র তৈরি' },
  { en: 'Unmasked NID (authorized)', bn: 'এনআইডি আনমাস্ক (অনুমোদিত)' },
  { en: 'Changed role permission', bn: 'রোল অনুমতি পরিবর্তন' },
  { en: 'Exported report', bn: 'প্রতিবেদন রপ্তানি' },
];
export const auditLog: AuditEntry[] = Array.from({ length: 30 }, (_, i) => ({
  id: `A-${String(90000 + i * 3)}`,
  actor: STAFF_NAMES[i % STAFF_NAMES.length] as string,
  action: pick(ACTIONS, i),
  entity: ['MCBP-2026-00012', 'PR-2026-11-01', 'U-1004', 'G-10418'][i % 4] as string,
  ip: `10.0.${i % 6}.${20 + (i % 40)}`,
  time: `${isoDate(i % 7)} ${String(8 + (i % 10)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`,
}));

/* ---------------- System admin (X3) ---------------- */
export const backups = [
  { id: 'BK-2026-11-15', type: 'Full', size: '42.1 GB', status: 'success', time: isoDate(0) },
  { id: 'BK-2026-11-14', type: 'Incremental', size: '3.4 GB', status: 'success', time: isoDate(1) },
  { id: 'BK-2026-11-13', type: 'Incremental', size: '3.1 GB', status: 'success', time: isoDate(2) },
  { id: 'BK-2026-11-12', type: 'Incremental', size: '2.9 GB', status: 'warning', time: isoDate(3) },
];
export const jobs: { name: Bilingual; schedule: string; last: string; status: string }[] = [
  {
    name: { en: 'Nightly backup', bn: 'রাত্রিকালীন ব্যাকআপ' },
    schedule: '02:00',
    last: isoDate(0),
    status: 'success',
  },
  {
    name: { en: 'Reconciliation sync', bn: 'মিলকরণ সিঙ্ক' },
    schedule: '06:00',
    last: isoDate(0),
    status: 'success',
  },
  {
    name: { en: 'Notification digest', bn: 'বিজ্ঞপ্তি ডাইজেস্ট' },
    schedule: '08:00',
    last: isoDate(0),
    status: 'success',
  },
  {
    name: { en: 'Data warehouse ETL', bn: 'ডেটা ওয়্যারহাউস ইটিএল' },
    schedule: '03:30',
    last: isoDate(0),
    status: 'warning',
  },
];
