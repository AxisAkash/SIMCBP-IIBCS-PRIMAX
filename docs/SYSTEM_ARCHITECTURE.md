# System Architecture

> Status: **proposed & in-progress.** The monorepo foundation, shared packages,
> and design system exist today. Applications (web/api/mobile) are scaffolded per
> the roadmap. This document describes the target architecture; see
> [`DEVELOPMENT_ROADMAP.md`](DEVELOPMENT_ROADMAP.md) for what is actually built.

## Decision: all-TypeScript monorepo

The repository was greenfield (empty remote, no prior stack). Given the local
toolchain (Node 22, pnpm) and the breadth of surfaces (web, API, Android, iOS,
shared design/i18n/types), an **all-TypeScript monorepo** was chosen for one
coherent codebase, type-safe contracts end-to-end, and fast iteration.

Alternatives considered: TS-frontend + .NET or Java/Spring backend (common in
gov procurement). Rejected for this build because neither toolchain is present
and a second language doubles maintenance surface. Revisit only on an
organizational mandate (recorded as an ADR if so).

## High-level topology

```
          ┌───────────────┐      ┌───────────────┐
          │   Web (Next)  │      │ Mobile (Expo) │
          └───────┬───────┘      └───────┬───────┘
                  │  REST/JSON (OpenAPI)  │
                  └───────────┬───────────┘
                     ┌────────▼─────────┐
                     │  API gateway /   │   NestJS
                     │  NestJS backend  │──────────────┐
                     └───┬─────┬────┬───┘              │
          ┌──────────────┘     │    └──────────┐       │
   ┌──────▼──────┐     ┌───────▼─────┐   ┌─────▼─────┐ │
   │ PostgreSQL  │     │   Redis +   │   │  Object   │ │
   │ + PostGIS   │     │   BullMQ    │   │  storage  │ │
   │ (OLTP, X4)  │     │ (jobs/queue)│   │ (evidence)│ │
   └─────────────┘     └─────────────┘   └───────────┘ │
   ┌─────────────┐     ┌─────────────┐   ┌───────────┐ │
   │ Reporting / │     │  AI adapter │   │Integration│◄┘
   │ analytics   │     │ (advisory,  │   │ adapters  │
   │ store (X4)  │     │  mock=def.) │   │ (sandbox) │
   └─────────────┘     └─────────────┘   └───────────┘
```

## Workspace structure

- `apps/web` — Next.js App Router; the enterprise application shell, dashboards,
  module UIs. SSR + client components; i18n via `@simcbp/i18n`.
- `apps/api` — NestJS; modular (one Nest module per MCBP module), REST with
  versioning (`/api/v1`), OpenAPI, guards for RBAC + jurisdiction, Prisma data
  access, BullMQ jobs.
- `apps/mobile` — React Native (Expo) for field operations (M10); shares the API
  client and `@simcbp/types`.
- `packages/*` — design-tokens, types, i18n, branding, tsconfig, eslint-config.

## Cross-cutting principles

- **API-first** with versioned, documented contracts; shared DTO/types.
- **Separation of concerns**: controller → service → repository; no business
  logic in controllers.
- **Type safety** across the wire via `@simcbp/types` and generated OpenAPI clients.
- **Centralized error handling**, input validation (class-validator/zod), and
  structured logging.
- **RBAC + geographic authorization** enforced in a single guard layer (X1 audit
  on every privileged action).
- **Adapters for everything external** (payments, government APIs, AI, storage):
  real integrations are never assumed; sandbox/mock providers are the default
  until credentials are provisioned.
- **Two-tier data store (X4)**: transactional OLTP vs. aggregated reporting,
  with controlled aggregation — no raw PII in analytics surfaces.

## Data & GIS

PostgreSQL is the system of record; **PostGIS** powers M08 (geographic
distribution, catchment analysis). Migrations are versioned (Prisma). See
[`DATABASE_DESIGN.md`](DATABASE_DESIGN.md).

## Non-functional targets

Scale/performance/availability targets (1–1.5M beneficiaries, 5,000 concurrent
users, <2s API, 99.9% design availability, RPO<24h, RTO<48h, etc.) are recorded
in [`REQUIREMENTS_TRACEABILITY.md`](REQUIREMENTS_TRACEABILITY.md). They are
**design targets**; none are claimed met without test evidence.

## Deployment

Containerized (Docker) services behind a reverse proxy, CI/CD via GitHub Actions.
See [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md). (Docker is not installed in the
current dev environment; Dockerfiles/compose are authored for target infra.)
