import { type Bilingual, DIVISIONS, isoDate, personName, pick } from './common';

export interface PayrollCycle {
  id: string;
  period: string;
  division: Bilingual;
  beneficiaries: number;
  amount: number;
  status: string; // paid | processing | reconciled | on_hold | scheduled
  createdOn: string;
}

export interface Payment {
  id: string;
  beneficiary: Bilingual;
  method: string; // bKash | Nagad | Bank
  amount: number;
  status: string;
  date: string;
}

const CYCLE_STATUS = [
  'reconciled',
  'paid',
  'processing',
  'on_hold',
  'scheduled',
  'paid',
  'reconciled',
  'processing',
];

export const payrollCycles: PayrollCycle[] = Array.from({ length: 8 }, (_, i) => ({
  id: `PR-2026-${String(11 - (i % 4)).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`,
  period: `2026-${String(11 - (i % 4)).padStart(2, '0')}`,
  division: pick(DIVISIONS, i),
  beneficiaries: 24000 + ((i * 3137) % 18000),
  amount: (24000 + ((i * 3137) % 18000)) * 800,
  status: pick(CYCLE_STATUS, i),
  createdOn: isoDate(i * 7 + 2),
}));

const METHODS = ['bKash', 'Nagad', 'Rocket', 'Bank (Sonali)'];
const PAY_STATUS = [
  'paid',
  'paid',
  'reconciled',
  'processing',
  'on_hold',
  'failed',
  'paid',
  'reconciled',
];

export const payments: Payment[] = Array.from({ length: 42 }, (_, i) => ({
  id: `TXN-${String(100000 + i * 7).padStart(6, '0')}`,
  beneficiary: personName(i + 5),
  method: pick(METHODS, i),
  amount: 800,
  status: pick(PAY_STATUS, i),
  date: isoDate(i % 30),
}));

export function paymentTotals() {
  const by = (s: string) => payments.filter((p) => p.status === s).length;
  return {
    disbursed: payments.filter((p) => ['paid', 'reconciled'].includes(p.status)).length * 800,
    paid: by('paid'),
    reconciled: by('reconciled'),
    onHold: by('on_hold'),
    failed: by('failed'),
    processing: by('processing'),
  };
}
