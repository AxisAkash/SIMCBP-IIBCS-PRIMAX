# Development Roadmap

Phased, dependency-aware delivery. Phases are development sequencing, not
permission to skip dependencies or fabricate external approvals.

## Phase 0 — Audit & requirements ✅

- Inspected repository (empty remote, greenfield) and toolchain.
- Captured module list (M01–M14, X1–X5), handover categories, roles, NFRs.
- Chose all-TS monorepo; recorded risks & open questions (below).

## Phase 1 — Architecture & design system 🟡 (current)

- [x] Monorepo scaffold (pnpm + Turborepo), TS/ESLint/Prettier standards.
- [x] Design tokens (color, type, spacing, radius, shadow, z-index, Tailwind
      preset, light/dark CSS variables).
- [x] Shared domain types (roles, jurisdiction, modules, handover).
- [x] Localization skeleton (en/bn + parity check) — X5.
- [x] Centralized branding/asset config with placeholders.
- [x] Documentation tree.
- [x] `apps/web` enterprise application shell (grouped sidebar, top bar,
      responsive workspace, global search, notifications, user menu).
- [x] Design-system component layer (buttons, badges, cards, stat cards,
      dropdown, breadcrumbs, empty/loading/error states).
- [x] Language switching (English↔Bangla) and light/dark/system theme wired
      into the shell; executive dashboard with clearly-labelled demo data.
- [ ] Remaining for later: data tables, modals/drawers, form controls library
      (built alongside the first data-entry module), and a dedicated `ui`
      package extraction if shared with other web surfaces.

## Phase 2 — Core platform ⬜

Authentication, user management, RBAC, jurisdiction-based permissions, audit
logging (X1), notification framework, configuration management.

## Phase 3 — Handover & Transition Management ⬜

Full seven-category system: dashboard, category management, deliverable
tracking, evidence upload/versioning, submission→review→approval workflow,
readiness calculation, reporting, audit history, final acceptance record.

## Phase 4 — MCBP core modules ⬜

Dependency order: IAM & shared services → beneficiary lifecycle (M01/M02) →
payments (M03) → mobile field ops (M10) → grievance (M05) → monitoring/reporting
(M07) → GIS (M08) → integrations (M06) → configuration/multi-scheme (M13/M14) →
AI assistant (M09). Training (M04) and helpdesk/CRM (M12) slot by readiness.

## Phase 5 — Quality assurance ⬜

Functional, security, performance, accessibility, responsive, integration, and
regression testing with evidence.

## Phase 6 — Deployment & handover ⬜

CI/CD, environment config, containerization, deployment docs, backup/DR
procedures, release notes, final handover package.

---

## Open questions / pending decisions

1. **SRS `.docx` not in repo** — needed to populate FR-001–FR-092 verbatim and
   complete the RTM. *Owner: client.*
2. **Conflicting payment NFR** — "1,000,000 payment transactions within a 2–4h
   window" conflicts with other stated throughput targets. Tracked for
   **clarification, not silent resolution**. *Owner: client / solution architect.*
3. **Official logos** — not yet supplied; placeholders in use via
   `@simcbp/branding`. Swap is a single config flip. *Owner: client.*
4. **Infrastructure** — no Postgres/Redis/Docker running in the dev environment;
   migrations and compose are authored for target infra and verified where
   possible. Live DB-integration runs need provisioning. *Owner: DevOps.*
5. **Push authentication** — `gh` CLI/credentials not confirmed; first push may
   require the maintainer to authenticate. *Owner: maintainer.*

## Git milestones

Small, verified commits per coherent unit (Conventional Commits). `pnpm verify`
gates every commit. Feature branches only; no direct push to `main`.
