/**
 * Module registry — the 14 principal MCBP modules (M01–M14) and 5 supporting
 * components (X1–X5) from the SRS. This registry drives navigation grouping,
 * the requirements-traceability matrix, and per-module feature flags.
 *
 * `status` reflects IMPLEMENTATION reality, not aspiration — it must be updated
 * only when a module's capability is actually built and verified.
 */

export type ModuleStatus = 'planned' | 'in_progress' | 'implemented';

export interface ModuleDefinition {
  readonly id: string; // M01..M14, X1..X5
  readonly key: string; // stable slug for routing/permissions
  readonly titleEn: string;
  readonly titleBn: string;
  readonly kind: 'principal' | 'supporting';
  readonly status: ModuleStatus;
}

export const MODULES: readonly ModuleDefinition[] = [
  {
    id: 'M01',
    key: 'beneficiary-lifecycle',
    titleEn: 'Beneficiary Application, Verification, Selection & Enrollment',
    titleBn: 'উপকারভোগী আবেদন, যাচাই, নির্বাচন ও নথিভুক্তি',
    kind: 'principal',
    status: 'planned',
  },
  {
    id: 'M02',
    key: 'beneficiary-profile',
    titleEn: 'Beneficiary Profile Management',
    titleBn: 'উপকারভোগী প্রোফাইল ব্যবস্থাপনা',
    kind: 'principal',
    status: 'planned',
  },
  {
    id: 'M03',
    key: 'payments',
    titleEn: 'Benefit Calculation, Payroll, Payment Tracking & Reconciliation',
    titleBn: 'সুবিধা হিসাব, পে-রোল, পেমেন্ট ট্র্যাকিং ও মিলকরণ',
    kind: 'principal',
    status: 'planned',
  },
  {
    id: 'M04',
    key: 'training',
    titleEn: 'Training Management',
    titleBn: 'প্রশিক্ষণ ব্যবস্থাপনা',
    kind: 'principal',
    status: 'planned',
  },
  {
    id: 'M05',
    key: 'grievance',
    titleEn: 'Grievance Redress & Feedback',
    titleBn: 'অভিযোগ নিষ্পত্তি ও মতামত',
    kind: 'principal',
    status: 'planned',
  },
  {
    id: 'M06',
    key: 'integration',
    titleEn: 'Secure Data Hub / API Bank & Integration',
    titleBn: 'সুরক্ষিত ডেটা হাব / এপিআই ব্যাংক ও ইন্টিগ্রেশন',
    kind: 'principal',
    status: 'planned',
  },
  {
    id: 'M07',
    key: 'monitoring-reporting',
    titleEn: 'Monitoring, Evaluation, Dashboards & Reporting',
    titleBn: 'পরিবীক্ষণ, মূল্যায়ন, ড্যাশবোর্ড ও প্রতিবেদন',
    kind: 'principal',
    status: 'planned',
  },
  {
    id: 'M08',
    key: 'gis',
    titleEn: 'GIS-Based Programme Intelligence',
    titleBn: 'জিআইএস-ভিত্তিক কর্মসূচি ইন্টেলিজেন্স',
    kind: 'principal',
    status: 'planned',
  },
  {
    id: 'M09',
    key: 'ai-assistant',
    titleEn: 'Agentic AI Workflow Automation & Bilingual Assistant',
    titleBn: 'এজেন্টিক এআই ওয়ার্কফ্লো অটোমেশন ও দ্বিভাষিক সহকারী',
    kind: 'principal',
    status: 'planned',
  },
  {
    id: 'M10',
    key: 'mobile-field',
    titleEn: 'Android/iOS Mobile Application & Field Operations',
    titleBn: 'অ্যান্ড্রয়েড/আইওএস মোবাইল অ্যাপ ও মাঠ কার্যক্রম',
    kind: 'principal',
    status: 'planned',
  },
  {
    id: 'M11',
    key: 'iam',
    titleEn: 'User Management, IAM & Access Control',
    titleBn: 'ব্যবহারকারী ব্যবস্থাপনা, আইএএম ও অ্যাক্সেস নিয়ন্ত্রণ',
    kind: 'principal',
    status: 'planned',
  },
  {
    id: 'M12',
    key: 'helpdesk-crm',
    titleEn: 'Helpdesk, Helpline, CRM & Referral Management',
    titleBn: 'হেল্পডেস্ক, হেল্পলাইন, সিআরএম ও রেফারেল ব্যবস্থাপনা',
    kind: 'principal',
    status: 'planned',
  },
  {
    id: 'M13',
    key: 'dynamic-modules',
    titleEn: 'Dynamic Module Creation & Governed Bulk Data Exchange',
    titleBn: 'ডাইনামিক মডিউল তৈরি ও নিয়ন্ত্রিত বাল্ক ডেটা বিনিময়',
    kind: 'principal',
    status: 'planned',
  },
  {
    id: 'M14',
    key: 'multi-scheme',
    titleEn: 'Multi-Scheme Extensibility & Programme Configuration',
    titleBn: 'মাল্টি-স্কিম সম্প্রসারণযোগ্যতা ও কর্মসূচি কনফিগারেশন',
    kind: 'principal',
    status: 'planned',
  },
  {
    id: 'X1',
    key: 'audit-log',
    titleEn: 'Audit Logging & Activity Monitoring',
    titleBn: 'অডিট লগিং ও কার্যক্রম পরিবীক্ষণ',
    kind: 'supporting',
    status: 'planned',
  },
  {
    id: 'X2',
    key: 'privacy-consent',
    titleEn: 'Consent, Privacy, Retention, Archiving & Erasure',
    titleBn: 'সম্মতি, গোপনীয়তা, সংরক্ষণ, আর্কাইভিং ও মোছা',
    kind: 'supporting',
    status: 'planned',
  },
  {
    id: 'X3',
    key: 'sysadmin',
    titleEn: 'System Administration, Monitoring & Backup',
    titleBn: 'সিস্টেম প্রশাসন, পরিবীক্ষণ ও ব্যাকআপ',
    kind: 'supporting',
    status: 'planned',
  },
  {
    id: 'X4',
    key: 'data-store',
    titleEn: 'Two-Tier Data Store & Controlled Aggregation',
    titleBn: 'দ্বি-স্তর ডেটা স্টোর ও নিয়ন্ত্রিত সমষ্টিকরণ',
    kind: 'supporting',
    status: 'planned',
  },
  {
    id: 'X5',
    key: 'localization',
    titleEn: 'Localization Framework',
    titleBn: 'স্থানীয়করণ কাঠামো',
    kind: 'supporting',
    status: 'planned',
  },
];

export const PRINCIPAL_MODULES = MODULES.filter((m) => m.kind === 'principal');
export const SUPPORTING_COMPONENTS = MODULES.filter((m) => m.kind === 'supporting');
