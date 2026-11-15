/**
 * Semantic status -> visual tone mapping. Shared by status badges across the
 * whole platform (handover deliverables, application pipeline, payments, etc.)
 * so a given state looks identical everywhere.
 *
 * `tone` maps to the CSS-variable badge styles defined in tokens.css.
 */

export type StatusTone = 'neutral' | 'info' | 'brand' | 'success' | 'warning' | 'danger';

/** Handover deliverable statuses (Section 4 of the SRS scope). */
export const handoverStatusTone = {
  pending: 'neutral',
  submitted: 'info',
  under_review: 'warning',
  approved: 'success',
  rejected: 'danger',
  blocked: 'danger',
} as const satisfies Record<string, StatusTone>;

/** Beneficiary application pipeline statuses (M01). */
export const applicationStatusTone = {
  draft: 'neutral',
  submitted: 'info',
  under_verification: 'warning',
  eligible: 'brand',
  ineligible: 'danger',
  selected: 'success',
  enrolled: 'success',
  rejected: 'danger',
} as const satisfies Record<string, StatusTone>;

/** Payment lifecycle statuses (M03). */
export const paymentStatusTone = {
  scheduled: 'neutral',
  processing: 'info',
  paid: 'success',
  failed: 'danger',
  reconciled: 'brand',
  on_hold: 'warning',
} as const satisfies Record<string, StatusTone>;

export type HandoverStatus = keyof typeof handoverStatusTone;
export type ApplicationStatus = keyof typeof applicationStatusTone;
export type PaymentStatus = keyof typeof paymentStatusTone;
