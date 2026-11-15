/**
 * @simcbp/design-tokens — single source of truth for the MCBP-MIS design system.
 *
 * Consumers:
 *  - apps/web Tailwind config imports `tailwindPreset`.
 *  - Global CSS imports `@simcbp/design-tokens/css` (semantic CSS variables).
 *  - Report/PDF generators import raw primitives for consistent branding.
 */

export { palette } from './colors';
export type { Palette, ColorScaleName } from './colors';

export { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from './typography';

export { spacing, radius, shadow, zIndex, layout } from './layout';

export { handoverStatusTone, applicationStatusTone, paymentStatusTone } from './status';
export type { StatusTone, HandoverStatus, ApplicationStatus, PaymentStatus } from './status';

export { tailwindPreset } from './tailwind-preset';
