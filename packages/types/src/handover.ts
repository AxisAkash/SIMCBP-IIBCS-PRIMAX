/**
 * Software Handover & Transition Management domain model (SRS §4).
 *
 * Seven mandated categories, each with deliverables that move through a
 * submission/review workflow. A handover is NEVER "complete" merely because a
 * checklist box is ticked — a deliverable reaches `approved` only with attached
 * evidence and a recorded approval (enforced in the API, modelled here).
 */

export const HandoverCategory = {
  BUILD_RELEASE_DEPLOYMENT: 'build_release_deployment',
  APPLICATIONS_CONFIGURATION: 'applications_configuration',
  DATABASE_DATA_ASSETS: 'database_data_assets',
  APIS_INTEGRATIONS: 'apis_integrations',
  INFRASTRUCTURE_SECURITY: 'infrastructure_security',
  OPERATIONS_BACKUP_DR: 'operations_backup_dr',
  USER_TECHNICAL_DOCUMENTATION: 'user_technical_documentation',
} as const;

export type HandoverCategoryKey = (typeof HandoverCategory)[keyof typeof HandoverCategory];

export interface HandoverCategoryDefinition {
  readonly id: '01' | '02' | '03' | '04' | '05' | '06' | '07';
  readonly key: HandoverCategoryKey;
  readonly titleEn: string;
  readonly titleBn: string;
}

export const HANDOVER_CATEGORIES: readonly HandoverCategoryDefinition[] = [
  {
    id: '01',
    key: HandoverCategory.BUILD_RELEASE_DEPLOYMENT,
    titleEn: 'Build, Release & Deployment',
    titleBn: 'বিল্ড, রিলিজ ও ডিপ্লয়মেন্ট',
  },
  {
    id: '02',
    key: HandoverCategory.APPLICATIONS_CONFIGURATION,
    titleEn: 'Applications & Configuration',
    titleBn: 'অ্যাপ্লিকেশন ও কনফিগারেশন',
  },
  {
    id: '03',
    key: HandoverCategory.DATABASE_DATA_ASSETS,
    titleEn: 'Database & Data Assets',
    titleBn: 'ডেটাবেস ও ডেটা সম্পদ',
  },
  {
    id: '04',
    key: HandoverCategory.APIS_INTEGRATIONS,
    titleEn: 'APIs & Integrations',
    titleBn: 'এপিআই ও ইন্টিগ্রেশন',
  },
  {
    id: '05',
    key: HandoverCategory.INFRASTRUCTURE_SECURITY,
    titleEn: 'Infrastructure & Security',
    titleBn: 'অবকাঠামো ও নিরাপত্তা',
  },
  {
    id: '06',
    key: HandoverCategory.OPERATIONS_BACKUP_DR,
    titleEn: 'Operations, Backup & Disaster Recovery',
    titleBn: 'পরিচালন, ব্যাকআপ ও দুর্যোগ পুনরুদ্ধার',
  },
  {
    id: '07',
    key: HandoverCategory.USER_TECHNICAL_DOCUMENTATION,
    titleEn: 'User & Technical Documentation',
    titleBn: 'ব্যবহারকারী ও কারিগরি ডকুমেন্টেশন',
  },
];

/** Deliverable lifecycle. */
export const HandoverStatus = {
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  BLOCKED: 'blocked',
} as const;

export type HandoverStatusKey = (typeof HandoverStatus)[keyof typeof HandoverStatus];

export const HandoverClassification = {
  REQUIRED: 'required',
  OPTIONAL: 'optional',
} as const;

export type HandoverClassificationKey =
  (typeof HandoverClassification)[keyof typeof HandoverClassification];

/** Allowed status transitions (enforced server-side). */
export const HANDOVER_TRANSITIONS: Readonly<
  Record<HandoverStatusKey, readonly HandoverStatusKey[]>
> = {
  [HandoverStatus.PENDING]: [HandoverStatus.SUBMITTED, HandoverStatus.BLOCKED],
  [HandoverStatus.SUBMITTED]: [HandoverStatus.UNDER_REVIEW, HandoverStatus.BLOCKED],
  [HandoverStatus.UNDER_REVIEW]: [
    HandoverStatus.APPROVED,
    HandoverStatus.REJECTED,
    HandoverStatus.BLOCKED,
  ],
  [HandoverStatus.REJECTED]: [HandoverStatus.SUBMITTED],
  [HandoverStatus.BLOCKED]: [HandoverStatus.PENDING, HandoverStatus.SUBMITTED],
  [HandoverStatus.APPROVED]: [],
};

export function canTransition(from: HandoverStatusKey, to: HandoverStatusKey): boolean {
  return HANDOVER_TRANSITIONS[from].includes(to);
}
