import { type Bilingual, DIVISIONS, isoDate, pick } from './common';

export interface Integration {
  id: string;
  name: Bilingual;
  status: string; // live | sandbox | pending | down
  lastSync: string;
  calls24h: number;
  errorRate: string;
  apiKey: string; // masked
}

export const integrations: Integration[] = [
  {
    id: 'INT-01',
    name: { en: 'NID Verification (EC)', bn: 'এনআইডি যাচাই (নির্বাচন কমিশন)' },
    status: 'sandbox',
    lastSync: isoDate(0),
    calls24h: 18420,
    errorRate: '0.4%',
    apiKey: 'ec_live_••••••••3f9a',
  },
  {
    id: 'INT-02',
    name: { en: 'Birth Registration (BDRIS)', bn: 'জন্ম নিবন্ধন (বিডিআরআইএস)' },
    status: 'sandbox',
    lastSync: isoDate(0),
    calls24h: 9330,
    errorRate: '0.7%',
    apiKey: 'bdris_••••••••7c21',
  },
  {
    id: 'INT-03',
    name: { en: 'bKash Disbursement', bn: 'বিকাশ বিতরণ' },
    status: 'sandbox',
    lastSync: isoDate(0),
    calls24h: 52110,
    errorRate: '0.2%',
    apiKey: 'bkash_••••••••a84e',
  },
  {
    id: 'INT-04',
    name: { en: 'Nagad Disbursement', bn: 'নগদ বিতরণ' },
    status: 'sandbox',
    lastSync: isoDate(0),
    calls24h: 41980,
    errorRate: '0.3%',
    apiKey: 'nagad_••••••••1b60',
  },
  {
    id: 'INT-05',
    name: { en: 'SMS Gateway', bn: 'এসএমএস গেটওয়ে' },
    status: 'live',
    lastSync: isoDate(0),
    calls24h: 88750,
    errorRate: '0.1%',
    apiKey: 'sms_••••••••9d4c',
  },
  {
    id: 'INT-06',
    name: { en: 'a2i National Portal', bn: 'এটুআই জাতীয় পোর্টাল' },
    status: 'pending',
    lastSync: '—',
    calls24h: 0,
    errorRate: '—',
    apiKey: 'a2i_••••••••pend',
  },
  {
    id: 'INT-07',
    name: { en: 'Sonali Bank EFT', bn: 'সোনালী ব্যাংক ইএফটি' },
    status: 'down',
    lastSync: isoDate(1),
    calls24h: 1240,
    errorRate: '4.1%',
    apiKey: 'sonali_••••••••5e2f',
  },
];

export interface ReportDef {
  id: string;
  name: Bilingual;
  category: Bilingual;
  lastRun: string;
  schedule: Bilingual;
}

export const reports: ReportDef[] = [
  {
    id: 'RPT-001',
    name: { en: 'Monthly enrollment summary', bn: 'মাসিক নথিভুক্তি সারসংক্ষেপ' },
    category: { en: 'Enrollment', bn: 'নথিভুক্তি' },
    lastRun: isoDate(2),
    schedule: { en: 'Monthly', bn: 'মাসিক' },
  },
  {
    id: 'RPT-002',
    name: { en: 'Payment reconciliation report', bn: 'পেমেন্ট মিলকরণ প্রতিবেদন' },
    category: { en: 'Payments', bn: 'পেমেন্ট' },
    lastRun: isoDate(1),
    schedule: { en: 'Weekly', bn: 'সাপ্তাহিক' },
  },
  {
    id: 'RPT-003',
    name: { en: 'Grievance SLA compliance', bn: 'অভিযোগ এসএলএ সম্মতি' },
    category: { en: 'Grievance', bn: 'অভিযোগ' },
    lastRun: isoDate(3),
    schedule: { en: 'Weekly', bn: 'সাপ্তাহিক' },
  },
  {
    id: 'RPT-004',
    name: { en: 'Geographic coverage', bn: 'ভৌগোলিক কভারেজ' },
    category: { en: 'M&E', bn: 'এম অ্যান্ড ই' },
    lastRun: isoDate(5),
    schedule: { en: 'Quarterly', bn: 'ত্রৈমাসিক' },
  },
  {
    id: 'RPT-005',
    name: { en: 'Training performance', bn: 'প্রশিক্ষণ কর্মক্ষমতা' },
    category: { en: 'Training', bn: 'প্রশিক্ষণ' },
    lastRun: isoDate(4),
    schedule: { en: 'Monthly', bn: 'মাসিক' },
  },
];

export interface DivisionCoverage {
  division: Bilingual;
  beneficiaries: number;
  coverage: number; // %
}

export const divisionCoverage: DivisionCoverage[] = DIVISIONS.map((division, i) => ({
  division,
  beneficiaries: 90000 + ((i * 53171) % 160000),
  coverage: 62 + ((i * 7) % 33),
}));

export const totalBeneficiaries = divisionCoverage.reduce((s, d) => s + d.beneficiaries, 0);

export function pickDivision(i: number): Bilingual {
  return pick(DIVISIONS, i);
}
