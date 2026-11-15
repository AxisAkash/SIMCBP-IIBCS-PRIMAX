# UI/UX Design System

The design system is code-first: tokens live in
[`packages/design-tokens`](../packages/design-tokens) and are the single source
of truth. UI never hardcodes hex, spacing, or radius — it consumes tokens.

## Design principles

Formal, authoritative, modern-minimal. Strong information hierarchy, consistent
spacing, highly readable data tables, accessible contrast, intuitive workflows,
responsive desktop/tablet/mobile. **Avoid**: generic AI-dashboard look, excessive
gradients/glassmorphism, oversized headings, gratuitous animation, decorative
charts, and any fake data presented as real.

## Color

Three brand scales + neutrals + semantic status (see
[`colors.ts`](../packages/design-tokens/src/colors.ts)):

- **Primary** — deep institutional green (`brand`): primary identity & actions.
- **Accent** — MCBP magenta (`accent`): reserved programme accent, used sparingly.
- **Neutral** — cool slate: surfaces, borders, text, tables.
- **Status** — success / warning / danger / info for badges, alerts, charts.

Components reference **semantic CSS variables** (e.g. `--color-surface`,
`--color-primary`, `--color-border`) defined in
[`tokens.css`](../packages/design-tokens/src/tokens.css). Light and dark themes
re-point the same roles — theming is a single-layer swap.

### Contrast / accessibility

Target WCAG 2.1 AA. Primary green `#185541` on white ≈ 8.9:1; body text
`#0f172a` on `#ffffff` ≈ 17:1. Status colors chosen for AA on their subtle
backgrounds. Dark theme mirrors roles with adjusted values.

## Typography

- Latin UI: **Inter**; Bangla: **Hind Siliguri / Noto Sans Bengali**; mono:
  JetBrains Mono for IDs/amounts/codes.
- Restrained modular scale; **14px enterprise body default**.
- Bangla text uses relaxed line-height (1.7) for matra/descender legibility.

See [`typography.ts`](../packages/design-tokens/src/typography.ts).

## Spacing, radius, elevation

4px spacing scale; small radii (6px controls, 8px cards); shallow layered
shadows. Z-index contract in [`layout.ts`](../packages/design-tokens/src/layout.ts)
keeps every overlay on a defined rung.

## Iconography

**Lucide** icon set exclusively, consistent sizing and stroke.

## Application shell (target)

- **Sidebar**: project/company identity, grouped module navigation, active
  states, collapsible (desktop), drawer (mobile), user/account actions.
- **Top bar**: breadcrumbs, page context, global search, notification center,
  **English/Bangla selector**, profile, contextual actions.
- **Workspace**: clear hierarchy, consistent content width (`contentMaxWidth`),
  professional tables/forms, filters/search, responsive layouts.

## Component inventory (to be built in the `ui` package)

Buttons, form controls, tables, status badges (driven by
[`status.ts`](../packages/design-tokens/src/status.ts)), modals, drawers,
navigation, data-viz primitives, and the required empty / loading / error /
confirmation states. Each state is a first-class component, not an afterthought.

## Branding

Logos are centralized in [`packages/branding`](../packages/branding). The repo
ships neutral placeholders; swapping in the official IBCS-PRIMAX and MCBP logos
is a single config change (`useOfficialAssets`). Logos are never recolored,
cropped, or recreated.
