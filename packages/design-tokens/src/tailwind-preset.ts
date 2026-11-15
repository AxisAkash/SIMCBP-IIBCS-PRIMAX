/**
 * Tailwind preset bridging design tokens -> Tailwind theme.
 *
 * Semantic colors reference CSS variables (defined in tokens.css) so light/dark
 * theming is handled by swapping variables, not utility classes. Raw palette
 * scales are also exposed for data-visualization needs.
 *
 * Typed loosely (no `tailwindcss` dependency here) to keep this package
 * framework-agnostic; apps/web casts it to `Config['theme']` on import.
 */
import { palette } from './colors';
import { fontFamily, fontSize, lineHeight } from './typography';
import { radius, shadow, spacing, zIndex } from './layout';

const withVar = (name: string, fallback: string) => `var(--${name}, ${fallback})`;

export const tailwindPreset = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Semantic, theme-aware roles (driven by CSS variables).
        canvas: withVar('color-canvas', palette.neutral[50]),
        surface: withVar('color-surface', palette.neutral[0]),
        'surface-raised': withVar('color-surface-raised', palette.neutral[0]),
        'surface-sunken': withVar('color-surface-sunken', palette.neutral[100]),
        border: withVar('color-border', palette.neutral[200]),
        'border-strong': withVar('color-border-strong', palette.neutral[300]),
        foreground: withVar('color-foreground', palette.neutral[900]),
        muted: withVar('color-muted', palette.neutral[500]),
        'muted-foreground': withVar('color-muted-foreground', palette.neutral[600]),
        primary: {
          DEFAULT: withVar('color-primary', palette.brand[700]),
          hover: withVar('color-primary-hover', palette.brand[800]),
          foreground: withVar('color-primary-foreground', palette.neutral[0]),
          subtle: withVar('color-primary-subtle', palette.brand[50]),
        },
        accent: {
          DEFAULT: withVar('color-accent', palette.accent[600]),
          foreground: withVar('color-accent-foreground', palette.neutral[0]),
          subtle: withVar('color-accent-subtle', palette.accent[50]),
        },
        success: withVar('color-success', palette.success[600]),
        warning: withVar('color-warning', palette.warning[600]),
        danger: withVar('color-danger', palette.danger[600]),
        info: withVar('color-info', palette.info[600]),
        'success-soft': withVar('color-success-soft', palette.success[50]),
        'warning-soft': withVar('color-warning-soft', palette.warning[50]),
        'danger-soft': withVar('color-danger-soft', palette.danger[50]),
        'info-soft': withVar('color-info-soft', palette.info[50]),
        // Raw scales for charts / explicit needs.
        brand: palette.brand,
        'accent-scale': palette.accent,
        neutral: palette.neutral,
      },
      fontFamily: {
        sans: fontFamily.sans,
        bangla: fontFamily.bangla,
        mono: fontFamily.mono,
      },
      fontSize,
      lineHeight,
      borderRadius: radius,
      boxShadow: shadow,
      spacing,
      zIndex: Object.fromEntries(Object.entries(zIndex).map(([k, v]) => [k, String(v)])),
    },
  },
} as const;

export type TailwindPreset = typeof tailwindPreset;
