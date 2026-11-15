import {
  type Bilingual,
  DIVISIONS,
  UNIONS,
  UPAZILAS,
  isoDate,
  maskedNid,
  personName,
  phone,
  pick,
} from './common';

export interface Beneficiary {
  id: string;
  serial: number;
  name: Bilingual;
  nid: string;
  phone: string;
  division: Bilingual;
  upazila: Bilingual;
  union: Bilingual;
  status: string;
  stage: Bilingual;
  monthlyBenefit: number;
  appliedOn: string;
  enrolledOn?: string;
}

const STATUSES = [
  'enrolled',
  'selected',
  'eligible',
  'under_verification',
  'submitted',
  'enrolled',
  'enrolled',
  'rejected',
] as const;

const STAGES: Bilingual[] = [
  { en: 'Pregnancy — 2nd trimester', bn: 'গর্ভাবস্থা — ২য় ত্রৈমাসিক' },
  { en: 'Pregnancy — 3rd trimester', bn: 'গর্ভাবস্থা — ৩য় ত্রৈমাসিক' },
  { en: 'Lactating — child < 1yr', bn: 'স্তন্যদান — শিশু < ১ বছর' },
  { en: 'Lactating — child 1–2yr', bn: 'স্তন্যদান — শিশু ১–২ বছর' },
];

function makeBeneficiary(i: number): Beneficiary {
  const serial = i + 1;
  const status = pick(STATUSES, i);
  const enrolled = status === 'enrolled';
  return {
    id: `MCBP-2026-${String(serial).padStart(5, '0')}`,
    serial,
    name: personName(i),
    nid: maskedNid(i),
    phone: phone(i),
    division: pick(DIVISIONS, i),
    upazila: pick(UPAZILAS, i),
    union: pick(UNIONS, i + 2),
    status,
    stage: pick(STAGES, i),
    monthlyBenefit: 800,
    appliedOn: isoDate(60 + (i % 40)),
    enrolledOn: enrolled ? isoDate(20 + (i % 30)) : undefined,
  };
}

export const beneficiaries: Beneficiary[] = Array.from({ length: 48 }, (_, i) =>
  makeBeneficiary(i),
);

export function getBeneficiary(id: string): Beneficiary | undefined {
  return beneficiaries.find((b) => b.id === id);
}

/** Pipeline tallies for the beneficiary overview. */
export function beneficiaryPipeline(): { status: string; count: number }[] {
  const order = ['submitted', 'under_verification', 'eligible', 'selected', 'enrolled', 'rejected'];
  return order.map((status) => ({
    status,
    count: beneficiaries.filter((b) => b.status === status).length,
  }));
}
