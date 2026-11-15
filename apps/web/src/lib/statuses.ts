import type { StatusTone } from '@simcbp/design-tokens';
import type { Locale } from '@simcbp/i18n';

export interface StatusMeta {
  tone: StatusTone;
  en: string;
  bn: string;
}

export function statusLabel(meta: StatusMeta, locale: Locale): string {
  return locale === 'bn' ? meta.bn : meta.en;
}

export const applicationStatus: Record<string, StatusMeta> = {
  draft: { tone: 'neutral', en: 'Draft', bn: 'খসড়া' },
  submitted: { tone: 'info', en: 'Submitted', bn: 'জমাকৃত' },
  under_verification: { tone: 'warning', en: 'Under verification', bn: 'যাচাইয়াধীন' },
  eligible: { tone: 'brand', en: 'Eligible', bn: 'যোগ্য' },
  ineligible: { tone: 'danger', en: 'Ineligible', bn: 'অযোগ্য' },
  selected: { tone: 'success', en: 'Selected', bn: 'নির্বাচিত' },
  enrolled: { tone: 'success', en: 'Enrolled', bn: 'নথিভুক্ত' },
  rejected: { tone: 'danger', en: 'Rejected', bn: 'প্রত্যাখ্যাত' },
};

export const paymentStatus: Record<string, StatusMeta> = {
  scheduled: { tone: 'neutral', en: 'Scheduled', bn: 'নির্ধারিত' },
  processing: { tone: 'info', en: 'Processing', bn: 'প্রক্রিয়াধীন' },
  paid: { tone: 'success', en: 'Paid', bn: 'পরিশোধিত' },
  reconciled: { tone: 'brand', en: 'Reconciled', bn: 'মিলকৃত' },
  on_hold: { tone: 'warning', en: 'On hold', bn: 'স্থগিত' },
  failed: { tone: 'danger', en: 'Failed', bn: 'ব্যর্থ' },
};

export const grievanceStatus: Record<string, StatusMeta> = {
  open: { tone: 'warning', en: 'Open', bn: 'চলমান' },
  in_progress: { tone: 'info', en: 'In progress', bn: 'প্রক্রিয়াধীন' },
  resolved: { tone: 'success', en: 'Resolved', bn: 'নিষ্পন্ন' },
  escalated: { tone: 'danger', en: 'Escalated', bn: 'ঊর্ধ্বমুখী' },
  closed: { tone: 'neutral', en: 'Closed', bn: 'বন্ধ' },
};

export const ticketStatus: Record<string, StatusMeta> = {
  new: { tone: 'info', en: 'New', bn: 'নতুন' },
  assigned: { tone: 'brand', en: 'Assigned', bn: 'বরাদ্দকৃত' },
  pending: { tone: 'warning', en: 'Pending', bn: 'অপেক্ষমাণ' },
  resolved: { tone: 'success', en: 'Resolved', bn: 'নিষ্পন্ন' },
};

export const trainingStatus: Record<string, StatusMeta> = {
  planned: { tone: 'neutral', en: 'Planned', bn: 'পরিকল্পিত' },
  ongoing: { tone: 'info', en: 'Ongoing', bn: 'চলমান' },
  completed: { tone: 'success', en: 'Completed', bn: 'সম্পন্ন' },
  cancelled: { tone: 'danger', en: 'Cancelled', bn: 'বাতিল' },
};

export const userStatus: Record<string, StatusMeta> = {
  active: { tone: 'success', en: 'Active', bn: 'সক্রিয়' },
  invited: { tone: 'info', en: 'Invited', bn: 'আমন্ত্রিত' },
  suspended: { tone: 'danger', en: 'Suspended', bn: 'স্থগিত' },
  locked: { tone: 'warning', en: 'Locked', bn: 'লকড' },
};

export const integrationStatus: Record<string, StatusMeta> = {
  live: { tone: 'success', en: 'Live', bn: 'সচল' },
  sandbox: { tone: 'warning', en: 'Sandbox', bn: 'স্যান্ডবক্স' },
  pending: { tone: 'info', en: 'Pending access', bn: 'অ্যাক্সেস অপেক্ষমাণ' },
  down: { tone: 'danger', en: 'Down', bn: 'বন্ধ' },
};

export const handoverStatus: Record<string, StatusMeta> = {
  pending: { tone: 'neutral', en: 'Pending', bn: 'অপেক্ষমাণ' },
  submitted: { tone: 'info', en: 'Submitted', bn: 'জমাকৃত' },
  under_review: { tone: 'warning', en: 'Under review', bn: 'পর্যালোচনাধীন' },
  approved: { tone: 'success', en: 'Approved', bn: 'অনুমোদিত' },
  rejected: { tone: 'danger', en: 'Rejected', bn: 'প্রত্যাখ্যাত' },
  blocked: { tone: 'danger', en: 'Blocked', bn: 'অবরুদ্ধ' },
};
