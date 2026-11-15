/**
 * SIMCBP / MCBP-MIS — Color primitives.
 *
 * Institutional, government-grade palette. Three brand scales plus a neutral
 * scale and semantic status colors. These are RAW primitives; semantic roles
 * (surface, border, text, primary action, ...) are mapped to CSS variables in
 * `tokens.css` so light/dark themes can re-point roles without changing values.
 *
 * - brand  : deep institutional green — primary identity & actions.
 * - accent : MCBP magenta — reserved accent (programme identity), used sparingly.
 * - neutral: cool slate — surfaces, borders, text, data tables.
 */

export const palette = {
  /** Deep institutional green — primary brand & actions. */
  brand: {
    50: '#eef6f2',
    100: '#d6eae0',
    200: '#aed5c2',
    300: '#7cbaa0',
    400: '#4f9d7e',
    500: '#2f8063',
    600: '#1f6b51',
    700: '#185541',
    800: '#134535',
    900: '#0e382b',
    950: '#07221a',
  },
  /** MCBP programme magenta — accent only. */
  accent: {
    50: '#fdf2f7',
    100: '#fce7f1',
    200: '#fbcfe3',
    300: '#f8a9cd',
    400: '#f273ad',
    500: '#e8458d',
    600: '#d12a74',
    700: '#b01d5f',
    800: '#921a50',
    900: '#7a1a45',
    950: '#470824',
  },
  /** Cool slate neutrals. */
  neutral: {
    0: '#ffffff',
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  /** Semantic status scales (used by badges, alerts, charts). */
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    900: '#78350f',
  },
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    900: '#7f1d1d',
  },
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
} as const;

export type Palette = typeof palette;
export type ColorScaleName = keyof Palette;
