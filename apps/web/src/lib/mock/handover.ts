import { HANDOVER_CATEGORIES, type HandoverCategoryKey } from '@simcbp/types';
import { type Bilingual, STAFF_NAMES, isoDate, pick } from './common';

export interface Deliverable {
  id: string;
  category: HandoverCategoryKey;
  title: Bilingual;
  required: boolean;
  status: string; // pending | submitted | under_review | approved | rejected | blocked
  owner: string;
  receiver: string;
  due: string;
  evidence: number;
  version: string;
}

const TITLES: Record<HandoverCategoryKey, Bilingual[]> = {
  build_release_deployment: [
    { en: 'Dependency manifests', bn: 'ডিপেনডেন্সি ম্যানিফেস্ট' },
    { en: 'Software Bill of Materials (SBOM)', bn: 'সফটওয়্যার বিল অব মেটেরিয়ালস (এসবিওএম)' },
    { en: 'Build scripts', bn: 'বিল্ড স্ক্রিপ্ট' },
    { en: 'CI/CD pipelines', bn: 'সিআই/সিডি পাইপলাইন' },
    { en: 'Container configurations', bn: 'কন্টেইনার কনফিগারেশন' },
    { en: 'Android/iOS signing materials', bn: 'অ্যান্ড্রয়েড/আইওএস সাইনিং উপকরণ' },
    { en: 'Rollback procedures', bn: 'রোলব্যাক পদ্ধতি' },
    { en: 'Proof of clean build', bn: 'ক্লিন বিল্ড প্রমাণ' },
  ],
  applications_configuration: [
    { en: 'Production configuration', bn: 'প্রোডাকশন কনফিগারেশন' },
    { en: 'Non-production configuration', bn: 'নন-প্রোডাকশন কনফিগারেশন' },
    { en: 'Business-rule settings', bn: 'ব্যবসায়িক নিয়ম সেটিংস' },
    { en: 'Notification templates', bn: 'বিজ্ঞপ্তি টেমপ্লেট' },
    { en: 'Scheduled jobs', bn: 'নির্ধারিত জব' },
    { en: 'Localization resources', bn: 'স্থানীয়করণ রিসোর্স' },
    { en: 'Secure secret-transfer record', bn: 'সুরক্ষিত সিক্রেট-ট্রান্সফার রেকর্ড' },
  ],
  database_data_assets: [
    { en: 'Current database schema', bn: 'বর্তমান ডেটাবেস স্কিমা' },
    { en: 'Data dictionary', bn: 'ডেটা ডিকশনারি' },
    { en: 'ER diagrams', bn: 'ইআর ডায়াগ্রাম' },
    { en: 'Migration scripts', bn: 'মাইগ্রেশন স্ক্রিপ্ট' },
    { en: 'Reconciliation evidence', bn: 'মিলকরণ প্রমাণ' },
    { en: 'Retention & archival rules', bn: 'সংরক্ষণ ও আর্কাইভ নিয়ম' },
    { en: 'Backup & recovery evidence', bn: 'ব্যাকআপ ও পুনরুদ্ধার প্রমাণ' },
  ],
  apis_integrations: [
    { en: 'API specifications', bn: 'এপিআই স্পেসিফিকেশন' },
    { en: 'Endpoint & field mappings', bn: 'এন্ডপয়েন্ট ও ফিল্ড ম্যাপিং' },
    { en: 'Authentication flows', bn: 'প্রমাণীকরণ ফ্লো' },
    { en: 'Test collections', bn: 'টেস্ট কালেকশন' },
    { en: 'Interface-control documents', bn: 'ইন্টারফেস-কন্ট্রোল নথি' },
    { en: 'Error codes', bn: 'ত্রুটি কোড' },
    { en: 'Integration test evidence', bn: 'ইন্টিগ্রেশন টেস্ট প্রমাণ' },
  ],
  infrastructure_security: [
    { en: 'Logical & physical architecture', bn: 'লজিক্যাল ও ফিজিক্যাল আর্কিটেকচার' },
    { en: 'Server & network inventory', bn: 'সার্ভার ও নেটওয়ার্ক ইনভেন্টরি' },
    { en: 'TLS/certificate inventory', bn: 'টিএলএস/সার্টিফিকেট ইনভেন্টরি' },
    { en: 'Hardening configuration', bn: 'হার্ডেনিং কনফিগারেশন' },
    { en: 'Latest VAPT/SQTC results', bn: 'সর্বশেষ ভিএপিটি/এসকিউটিসি ফলাফল' },
    { en: 'Remediation evidence', bn: 'প্রতিকার প্রমাণ' },
    { en: 'Security incident records', bn: 'নিরাপত্তা ঘটনা রেকর্ড' },
  ],
  operations_backup_dr: [
    { en: 'Administrator & operator manuals', bn: 'প্রশাসক ও অপারেটর ম্যানুয়াল' },
    { en: 'SOPs', bn: 'এসওপি' },
    { en: 'SLA & escalation matrix', bn: 'এসএলএ ও এস্কেলেশন ম্যাট্রিক্স' },
    { en: 'Backup/restore procedures', bn: 'ব্যাকআপ/রিস্টোর পদ্ধতি' },
    { en: 'RPO/RTO documentation', bn: 'আরপিও/আরটিও ডকুমেন্টেশন' },
    { en: 'DR/BCP documentation', bn: 'ডিআর/বিসিপি ডকুমেন্টেশন' },
    { en: 'Restore-test & DR-test evidence', bn: 'রিস্টোর-টেস্ট ও ডিআর-টেস্ট প্রমাণ' },
  ],
  user_technical_documentation: [
    { en: 'Approved SRS', bn: 'অনুমোদিত এসআরএস' },
    { en: 'Business-process maps', bn: 'ব্যবসায়িক-প্রক্রিয়া ম্যাপ' },
    { en: 'Test plans & results', bn: 'টেস্ট পরিকল্পনা ও ফলাফল' },
    { en: 'UAT sign-off', bn: 'ইউএটি সাইন-অফ' },
    { en: 'Deployment manual', bn: 'ডিপ্লয়মেন্ট ম্যানুয়াল' },
    { en: 'User manuals (EN/BN)', bn: 'ব্যবহারকারী ম্যানুয়াল (ইং/বাং)' },
    { en: 'Training materials & videos', bn: 'প্রশিক্ষণ উপকরণ ও ভিডিও' },
    { en: 'Release notes', bn: 'রিলিজ নোট' },
  ],
};

const STATUS_CYCLE = [
  'approved',
  'approved',
  'under_review',
  'submitted',
  'approved',
  'pending',
  'rejected',
  'approved',
];

let counter = 0;
function makeDeliverable(
  category: HandoverCategoryKey,
  title: Bilingual,
  idx: number,
): Deliverable {
  counter += 1;
  const status = idx === 0 ? 'approved' : pick(STATUS_CYCLE, counter);
  return {
    id: `HD-${String(counter).padStart(3, '0')}`,
    category,
    title,
    required: idx < 5,
    status,
    owner: STAFF_NAMES[counter % STAFF_NAMES.length] as string,
    receiver: 'MoWCA PMU',
    due: isoDate(-(7 + (idx % 14))),
    evidence: status === 'pending' ? 0 : 1 + (idx % 3),
    version: `v${1 + (idx % 3)}.${idx % 5}`,
  };
}

export const deliverables: Deliverable[] = HANDOVER_CATEGORIES.flatMap((cat) =>
  TITLES[cat.key].map((title, idx) => makeDeliverable(cat.key, title, idx)),
);

export function deliverablesByCategory(key: HandoverCategoryKey): Deliverable[] {
  return deliverables.filter((d) => d.category === key);
}

export interface CategoryProgress {
  key: HandoverCategoryKey;
  total: number;
  requiredTotal: number;
  approvedRequired: number;
  readiness: number; // % of required deliverables approved
}

export function categoryProgress(key: HandoverCategoryKey): CategoryProgress {
  const items = deliverablesByCategory(key);
  const req = items.filter((d) => d.required);
  const approvedReq = req.filter((d) => d.status === 'approved').length;
  return {
    key,
    total: items.length,
    requiredTotal: req.length,
    approvedRequired: approvedReq,
    readiness: req.length ? Math.round((approvedReq / req.length) * 100) : 100,
  };
}

export function overallReadiness(): number {
  const req = deliverables.filter((d) => d.required);
  const approved = req.filter((d) => d.status === 'approved').length;
  return req.length ? Math.round((approved / req.length) * 100) : 0;
}

export function statusCounts(): Record<string, number> {
  return deliverables.reduce<Record<string, number>>((acc, d) => {
    acc[d.status] = (acc[d.status] ?? 0) + 1;
    return acc;
  }, {});
}
