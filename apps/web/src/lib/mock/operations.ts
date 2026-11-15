import { type Bilingual, UPAZILAS, isoDate, personName, pick } from './common';

export interface TrainingProgramme {
  id: string;
  title: Bilingual;
  venue: Bilingual;
  date: string;
  participants: number;
  capacity: number;
  status: string; // planned | ongoing | completed | cancelled
}

const COURSES: Bilingual[] = [
  { en: 'Maternal nutrition & care', bn: 'মাতৃ পুষ্টি ও যত্ন' },
  { en: 'Early childhood development', bn: 'শিশু বিকাশ' },
  { en: 'Breastfeeding guidance', bn: 'স্তন্যদান নির্দেশনা' },
  { en: 'Financial literacy', bn: 'আর্থিক সাক্ষরতা' },
  { en: 'Immunization awareness', bn: 'টিকাদান সচেতনতা' },
];
const TR_STATUS = ['completed', 'ongoing', 'planned', 'completed', 'planned', 'cancelled'];

export const trainings: TrainingProgramme[] = Array.from({ length: 18 }, (_, i) => {
  const cap = 40 + (i % 3) * 10;
  const status = pick(TR_STATUS, i);
  return {
    id: `TR-2026-${String(i + 1).padStart(3, '0')}`,
    title: pick(COURSES, i),
    venue: pick(UPAZILAS, i),
    date: isoDate(30 - i),
    participants: status === 'planned' ? 0 : Math.round(cap * (0.6 + (i % 4) * 0.1)),
    capacity: cap,
    status,
  };
});

export interface Grievance {
  id: string;
  subject: Bilingual;
  beneficiary: Bilingual;
  category: Bilingual;
  status: string; // open | in_progress | resolved | escalated | closed
  priority: string; // low | medium | high
  filedOn: string;
  assignee: string;
}

const SUBJECTS: Bilingual[] = [
  { en: 'Payment not received', bn: 'পেমেন্ট পাইনি' },
  { en: 'Incorrect bank details', bn: 'ভুল ব্যাংক তথ্য' },
  { en: 'Enrollment delay', bn: 'নথিভুক্তিতে বিলম্ব' },
  { en: 'Document rejected', bn: 'নথি প্রত্যাখ্যাত' },
  { en: 'Duplicate record', bn: 'ডুপ্লিকেট রেকর্ড' },
];
const CATEGORIES: Bilingual[] = [
  { en: 'Payment', bn: 'পেমেন্ট' },
  { en: 'Enrollment', bn: 'নথিভুক্তি' },
  { en: 'Data', bn: 'ডেটা' },
  { en: 'Other', bn: 'অন্যান্য' },
];
const GR_STATUS = [
  'open',
  'in_progress',
  'resolved',
  'escalated',
  'resolved',
  'open',
  'closed',
  'in_progress',
];
const PRIORITY = ['high', 'medium', 'low'];

export const grievances: Grievance[] = Array.from({ length: 34 }, (_, i) => ({
  id: `G-${String(10400 + i).padStart(5, '0')}`,
  subject: pick(SUBJECTS, i),
  beneficiary: personName(i + 11),
  category: pick(CATEGORIES, i),
  status: pick(GR_STATUS, i),
  priority: pick(PRIORITY, i),
  filedOn: isoDate(i % 25),
  assignee: ['R. Akter', 'M. Hossain', 'S. Chowdhury', 'Unassigned'][i % 4] as string,
}));
