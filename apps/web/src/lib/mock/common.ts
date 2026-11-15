/**
 * CENTRALIZED MOCK DATA — illustrative only, NOT real programme data.
 *
 * Deterministic (no Math.random / Date.now at module scope) so server and client
 * renders match. Every screen that renders this is marked as demo. Replaced by
 * live API data in later phases.
 */
import type { Locale } from '@simcbp/i18n';

export interface Bilingual {
  en: string;
  bn: string;
}

export function tx(value: Bilingual, locale: Locale): string {
  return value[locale];
}

export const DIVISIONS: Bilingual[] = [
  { en: 'Dhaka', bn: 'ঢাকা' },
  { en: 'Chattogram', bn: 'চট্টগ্রাম' },
  { en: 'Rajshahi', bn: 'রাজশাহী' },
  { en: 'Khulna', bn: 'খুলনা' },
  { en: 'Barishal', bn: 'বরিশাল' },
  { en: 'Sylhet', bn: 'সিলেট' },
  { en: 'Rangpur', bn: 'রংপুর' },
  { en: 'Mymensingh', bn: 'ময়মনসিংহ' },
];

export const UPAZILAS: Bilingual[] = [
  { en: 'Savar', bn: 'সাভার' },
  { en: 'Mirsharai', bn: 'মীরসরাই' },
  { en: 'Bagha', bn: 'বাঘা' },
  { en: 'Dumuria', bn: 'ডুমুরিয়া' },
  { en: 'Banaripara', bn: 'বানারীপাড়া' },
  { en: 'Gowainghat', bn: 'গোয়াইনঘাট' },
  { en: 'Pirganj', bn: 'পীরগঞ্জ' },
  { en: 'Trishal', bn: 'ত্রিশাল' },
];

export const UNIONS: Bilingual[] = [
  { en: 'Aminbazar', bn: 'আমিনবাজার' },
  { en: 'Dhamsona', bn: 'ধামসোনা' },
  { en: 'Katachhara', bn: 'কাটাছড়া' },
  { en: 'Pakuria', bn: 'পাকুড়িয়া' },
  { en: 'Raghunathpur', bn: 'রঘুনাথপুর' },
  { en: 'Fatehpur', bn: 'ফতেহপুর' },
];

const FIRST_NAMES: Bilingual[] = [
  { en: 'Rahima', bn: 'রহিমা' },
  { en: 'Shahana', bn: 'শাহানা' },
  { en: 'Nasima', bn: 'নাসিমা' },
  { en: 'Fatema', bn: 'ফাতেমা' },
  { en: 'Ayesha', bn: 'আয়েশা' },
  { en: 'Rokeya', bn: 'রোকেয়া' },
  { en: 'Salma', bn: 'সালমা' },
  { en: 'Jharna', bn: 'ঝর্ণা' },
  { en: 'Morjina', bn: 'মর্জিনা' },
  { en: 'Taslima', bn: 'তাসলিমা' },
];

const LAST_NAMES: Bilingual[] = [
  { en: 'Begum', bn: 'বেগম' },
  { en: 'Khatun', bn: 'খাতুন' },
  { en: 'Akter', bn: 'আক্তার' },
  { en: 'Sultana', bn: 'সুলতানা' },
  { en: 'Yasmin', bn: 'ইয়াসমিন' },
];

export const STAFF_NAMES = [
  'R. Akter',
  'M. Hossain',
  'S. Chowdhury',
  'K. Rahman',
  'N. Islam',
  'T. Ahmed',
  'F. Karim',
  'A. Siddique',
];

/** Deterministic element pick. */
export function pick<T>(arr: readonly T[], i: number): T {
  return arr[i % arr.length] as T;
}

export function personName(i: number): Bilingual {
  const f = pick(FIRST_NAMES, i);
  const l = pick(LAST_NAMES, i * 3 + 1);
  return { en: `${f.en} ${l.en}`, bn: `${f.bn} ${l.bn}` };
}

/** Masked national ID (sensitive-field masking demonstration). */
export function maskedNid(i: number): string {
  const tail = String(1000 + ((i * 37) % 9000));
  return `•••• •••• ${tail}`;
}

export function phone(i: number): string {
  return `+8801${String(3 + (i % 6))}${String(10000000 + ((i * 7919) % 89999999))}`;
}

/** Fixed base date for deterministic relative dates. */
export function isoDate(daysAgo: number): string {
  const base = new Date('2026-11-15T00:00:00Z').getTime();
  return new Date(base - daysAgo * 86400000).toISOString().slice(0, 10);
}
