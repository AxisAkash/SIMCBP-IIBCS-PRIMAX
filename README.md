<!-- Logos: official assets are centralized in packages/branding (placeholders until supplied). -->

# SIMCBP — MCBP-MIS

**Mother and Child Benefit Programme — Integrated Management Information System**
Ministry of Women and Children Affairs (MoWCA), Bangladesh

Developed by **IBCS-PRIMAX Software (Bangladesh) Ltd.**

> Formal system name: **MCBP-MIS / MoWCA Integrated MIS**

---

## Status

🚧 **Frontend complete (demo).** The full bilingual frontend — application shell, 14 modules, 5 supporting components, 7-category handover, role dashboards and login — is implemented on mock data. Backend (API, DB, real auth) is a separate upcoming phase. Module status is tracked honestly in
[`docs/REQUIREMENTS_TRACEABILITY.md`](docs/REQUIREMENTS_TRACEABILITY.md) and
[`docs/DEVELOPMENT_ROADMAP.md`](docs/DEVELOPMENT_ROADMAP.md). Nothing here is
claimed production-ready, and no figures in the UI represent real government data.

## What this system is

A bilingual (English / বাংলা) government-sector MIS covering the full MCBP
lifecycle: beneficiary application → verification → selection → enrollment →
benefit calculation → payment → reconciliation, plus training, grievance
redress, monitoring & evaluation, GIS intelligence, helpdesk/CRM, and a mandated
**seven-category Software Handover & Transition Management** capability.

See [`docs/PROJECT_OVERVIEW.md`](docs/PROJECT_OVERVIEW.md) for scope and the
14 modules (M01–M14) + 5 supporting components (X1–X5).

## Technology

All-TypeScript monorepo (pnpm + Turborepo):

| Layer | Stack |
|---|---|
| Web | Next.js (App Router) · React · TypeScript · Tailwind |
| API | NestJS · REST + OpenAPI |
| Database | PostgreSQL + PostGIS · Prisma |
| Mobile | React Native (Expo) |
| Design system | `@simcbp/design-tokens` · Lucide icons |
| i18n | `@simcbp/i18n` (en/bn) |

Full rationale: [`docs/SYSTEM_ARCHITECTURE.md`](docs/SYSTEM_ARCHITECTURE.md).

## Repository layout

```
.
├── apps/            # web, api, mobile (added per roadmap phase)
├── packages/
│   ├── branding/        # centralized logos/identity (placeholders until supplied)
│   ├── design-tokens/   # colors, typography, spacing, Tailwind preset, CSS vars
│   ├── eslint-config/   # shared flat ESLint config
│   ├── i18n/            # en/bn catalogs + parity tooling (X5)
│   ├── tsconfig/        # shared TS presets
│   └── types/           # shared domain contract (roles, jurisdiction, modules, handover)
└── docs/            # architecture, security, API, DB, UI/UX, traceability, handover, …
```

## Getting started

Requires **Node 22+** and **pnpm 12+**.

```bash
pnpm install
pnpm verify        # format check + lint + typecheck + tests
```

Copy [`.env.example`](.env.example) to `.env` and fill per environment. **Never
commit `.env`, secrets, keys, tokens, or production data.**

## Contributing & Git workflow

- Work on feature branches; **never push directly to `main`**.
- Small, meaningful commits (Conventional Commits).
- Run `pnpm verify` before every commit/push.

See [`docs/DEVELOPMENT_ROADMAP.md`](docs/DEVELOPMENT_ROADMAP.md).

## License

Proprietary — © IBCS-PRIMAX Software (Bangladesh) Ltd. All rights reserved.
