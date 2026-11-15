/**
 * Typography scale. Bilingual by design: a Latin UI face paired with a
 * Bangla-friendly face. Bangla text (Noto Sans Bengali / Hind Siliguri) needs
 * slightly larger line-height for legibility; `lineHeight.bangla` encodes that.
 *
 * Actual @font-face wiring and `next/font` loading live in apps/web; these are
 * the shared scale tokens so every surface (web, reports, PDFs) stays aligned.
 */

export const fontFamily = {
  /** Latin / default UI. */
  sans: [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  /** Bangla script. */
  bangla: ['Hind Siliguri', 'Noto Sans Bengali', 'SolaimanLipi', 'sans-serif'],
  /** Tabular / monospace for IDs, amounts, codes. */
  mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
} as const;

/** Modular type scale (rem). Restrained — no oversized display headings. */
export const fontSize = {
  xs: '0.75rem', // 12
  sm: '0.8125rem', // 13
  base: '0.875rem', // 14 — enterprise default body
  md: '1rem', // 16
  lg: '1.125rem', // 18
  xl: '1.25rem', // 20
  '2xl': '1.5rem', // 24
  '3xl': '1.875rem', // 30
  '4xl': '2.25rem', // 36 (page-level only)
} as const;

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  /** Bangla needs extra leading for descenders/matras. */
  bangla: '1.7',
} as const;

export const letterSpacing = {
  tight: '-0.01em',
  normal: '0',
  wide: '0.02em',
} as const;
