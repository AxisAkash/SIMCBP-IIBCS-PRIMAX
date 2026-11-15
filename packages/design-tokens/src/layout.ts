/**
 * Spacing, radius, shadow and z-index primitives. Deliberately conservative:
 * small radii and shallow shadows to read as a formal records system, not a
 * consumer app.
 */

/** 4px base spacing scale. */
export const spacing = {
  0: '0',
  0.5: '0.125rem', // 2
  1: '0.25rem', // 4
  1.5: '0.375rem', // 6
  2: '0.5rem', // 8
  3: '0.75rem', // 12
  4: '1rem', // 16
  5: '1.25rem', // 20
  6: '1.5rem', // 24
  8: '2rem', // 32
  10: '2.5rem', // 40
  12: '3rem', // 48
  16: '4rem', // 64
} as const;

export const radius = {
  none: '0',
  sm: '0.1875rem', // 3
  md: '0.375rem', // 6 — default control radius
  lg: '0.5rem', // 8 — cards
  xl: '0.75rem', // 12
  full: '9999px',
} as const;

/** Shallow, layered shadows for elevation without decoration. */
export const shadow = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(15 23 42 / 0.04)',
  sm: '0 1px 2px 0 rgb(15 23 42 / 0.06), 0 1px 3px 0 rgb(15 23 42 / 0.08)',
  md: '0 2px 4px -1px rgb(15 23 42 / 0.08), 0 4px 6px -1px rgb(15 23 42 / 0.06)',
  lg: '0 4px 8px -2px rgb(15 23 42 / 0.10), 0 8px 16px -4px rgb(15 23 42 / 0.08)',
  /** For drawers / modals. */
  overlay: '0 8px 24px -4px rgb(15 23 42 / 0.18)',
} as const;

/** Layering contract — keep every overlay surface on one of these rungs. */
export const zIndex = {
  base: 0,
  sticky: 100,
  header: 200,
  sidebar: 300,
  dropdown: 400,
  drawer: 500,
  modal: 600,
  toast: 700,
  tooltip: 800,
} as const;

/** Application shell dimensions. */
export const layout = {
  sidebarWidth: '16rem', // 256
  sidebarCollapsedWidth: '4rem', // 64
  headerHeight: '3.5rem', // 56
  contentMaxWidth: '90rem', // 1440
} as const;
