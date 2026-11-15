/**
 * Role catalogue for RBAC (M11 / X-series). Roles are coarse-grained identities;
 * fine-grained permissions are granted per role via the permission registry
 * (defined in the API module) and are always intersected with the user's
 * geographic jurisdiction scope (see jurisdiction.ts).
 *
 * This enum is the shared contract between web, API and mobile.
 */
import type { JurisdictionLevelKey } from './jurisdiction';

export const Role = {
  SYSTEM_ADMIN: 'system_admin',
  MINISTRY_ADMIN: 'ministry_admin',
  PROGRAMME_DIRECTOR: 'programme_director',
  NATIONAL_ADMIN: 'national_admin',
  DIVISION_ADMIN: 'division_admin',
  DISTRICT_ADMIN: 'district_admin',
  UPAZILA_ADMIN: 'upazila_admin',
  UNION_OFFICER: 'union_officer',
  FIELD_OFFICER: 'field_officer',
  FINANCE_OFFICER: 'finance_officer',
  MNE_ANALYST: 'mne_analyst',
  AUDITOR: 'auditor',
  HELPDESK_AGENT: 'helpdesk_agent',
  BENEFICIARY: 'beneficiary',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export interface RoleDefinition {
  readonly key: Role;
  /** English display label. */
  readonly labelEn: string;
  /** Bangla display label. */
  readonly labelBn: string;
  /** The jurisdiction level at which this role normally operates. */
  readonly defaultScopeLevel: JurisdictionLevelKey;
  /** Whether this is a privileged role requiring MFA (NFR / §9). */
  readonly requiresMfa: boolean;
}

export const ROLE_DEFINITIONS: Readonly<Record<Role, RoleDefinition>> = {
  [Role.SYSTEM_ADMIN]: {
    key: Role.SYSTEM_ADMIN,
    labelEn: 'System Administrator',
    labelBn: 'সিস্টেম অ্যাডমিনিস্ট্রেটর',
    defaultScopeLevel: 'national',
    requiresMfa: true,
  },
  [Role.MINISTRY_ADMIN]: {
    key: Role.MINISTRY_ADMIN,
    labelEn: 'Ministry Administrator',
    labelBn: 'মন্ত্রণালয় অ্যাডমিনিস্ট্রেটর',
    defaultScopeLevel: 'national',
    requiresMfa: true,
  },
  [Role.PROGRAMME_DIRECTOR]: {
    key: Role.PROGRAMME_DIRECTOR,
    labelEn: 'Programme Director',
    labelBn: 'কর্মসূচি পরিচালক',
    defaultScopeLevel: 'national',
    requiresMfa: true,
  },
  [Role.NATIONAL_ADMIN]: {
    key: Role.NATIONAL_ADMIN,
    labelEn: 'National Administrator',
    labelBn: 'জাতীয় অ্যাডমিনিস্ট্রেটর',
    defaultScopeLevel: 'national',
    requiresMfa: true,
  },
  [Role.DIVISION_ADMIN]: {
    key: Role.DIVISION_ADMIN,
    labelEn: 'Division Administrator',
    labelBn: 'বিভাগীয় অ্যাডমিনিস্ট্রেটর',
    defaultScopeLevel: 'division',
    requiresMfa: false,
  },
  [Role.DISTRICT_ADMIN]: {
    key: Role.DISTRICT_ADMIN,
    labelEn: 'District Administrator',
    labelBn: 'জেলা অ্যাডমিনিস্ট্রেটর',
    defaultScopeLevel: 'district',
    requiresMfa: false,
  },
  [Role.UPAZILA_ADMIN]: {
    key: Role.UPAZILA_ADMIN,
    labelEn: 'Upazila Administrator',
    labelBn: 'উপজেলা অ্যাডমিনিস্ট্রেটর',
    defaultScopeLevel: 'upazila',
    requiresMfa: false,
  },
  [Role.UNION_OFFICER]: {
    key: Role.UNION_OFFICER,
    labelEn: 'Union-level Officer',
    labelBn: 'ইউনিয়ন পর্যায়ের কর্মকর্তা',
    defaultScopeLevel: 'union',
    requiresMfa: false,
  },
  [Role.FIELD_OFFICER]: {
    key: Role.FIELD_OFFICER,
    labelEn: 'Field Officer',
    labelBn: 'মাঠ কর্মকর্তা',
    defaultScopeLevel: 'union',
    requiresMfa: false,
  },
  [Role.FINANCE_OFFICER]: {
    key: Role.FINANCE_OFFICER,
    labelEn: 'Finance / Payment Officer',
    labelBn: 'অর্থ / পেমেন্ট কর্মকর্তা',
    defaultScopeLevel: 'national',
    requiresMfa: true,
  },
  [Role.MNE_ANALYST]: {
    key: Role.MNE_ANALYST,
    labelEn: 'Monitoring & Evaluation Analyst',
    labelBn: 'পরিবীক্ষণ ও মূল্যায়ন বিশ্লেষক',
    defaultScopeLevel: 'national',
    requiresMfa: false,
  },
  [Role.AUDITOR]: {
    key: Role.AUDITOR,
    labelEn: 'Auditor',
    labelBn: 'নিরীক্ষক',
    defaultScopeLevel: 'national',
    requiresMfa: true,
  },
  [Role.HELPDESK_AGENT]: {
    key: Role.HELPDESK_AGENT,
    labelEn: 'Helpdesk Agent',
    labelBn: 'হেল্পডেস্ক এজেন্ট',
    defaultScopeLevel: 'national',
    requiresMfa: false,
  },
  [Role.BENEFICIARY]: {
    key: Role.BENEFICIARY,
    labelEn: 'Beneficiary',
    labelBn: 'উপকারভোগী',
    defaultScopeLevel: 'union',
    requiresMfa: false,
  },
};

export const ALL_ROLES: readonly Role[] = Object.values(Role);
