# Changelog

All notable changes are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/); the project adheres to
Semantic Versioning once releases begin. Entries describe **actual** changes —
nothing unfinished is logged as done.

## [Unreleased]

### Added — Phase 1 foundation
- Monorepo scaffold: pnpm workspaces + Turborepo, TypeScript/ESLint/Prettier
  standards, EditorConfig, environment template, `.gitignore` hardening.
- `@simcbp/design-tokens`: institutional color system, bilingual typography
  scale, spacing/radius/shadow/z-index primitives, status-tone mapping,
  Tailwind preset, and light/dark semantic CSS variables.
- `@simcbp/types`: shared domain contract — 14 roles, Bangladesh jurisdiction
  hierarchy with containment logic, module registry (M01–M14, X1–X5), and the
  handover domain model with enforced status transitions.
- `@simcbp/i18n`: localization skeleton (English/Bangla `common` namespace) with
  a locale-parity check script (X5).
- `@simcbp/branding`: centralized identity config with clearly-labelled logo
  placeholders and a single-flip swap for official assets.
- `@simcbp/tsconfig`, `@simcbp/eslint-config`: shared tooling presets.
- Documentation tree: overview, architecture, database, API, security, UI/UX
  design system, requirements traceability, roadmap, deployment, testing,
  handover, and this changelog.

> Scope note: these are architectural foundations and enablers. No MCBP module
> (M01–M14) or the handover module is functionally complete yet — see
> [`REQUIREMENTS_TRACEABILITY.md`](REQUIREMENTS_TRACEABILITY.md).
