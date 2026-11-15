# Deployment Guide

> Status: **initial.** Deployment artifacts (Dockerfiles, compose, CI/CD) are
> authored in Phase 6; the dev environment currently has no Docker/DB running.
> This records the target process.

## Environments

`development` → `staging/UAT` → `production`. Configuration is environment-based
via `.env` (never committed); see [`.env.example`](../.env.example). Each
environment has its own secrets, injected at deploy time (vault / CI secrets),
never in the repo.

## Prerequisites (target)

- Node 22+, pnpm 12+ (build), Docker (runtime), PostgreSQL 16 + PostGIS, Redis,
  S3-compatible object storage.

## Build & run (local, once apps exist)

```bash
pnpm install
pnpm build
# apps start via their own scripts / compose
```

## Containerization

Each app (`web`, `api`) ships a multi-stage Dockerfile; `docker-compose` wires
app + Postgres/PostGIS + Redis for local/staging. Images are built in CI and
promoted per environment.

## CI/CD (GitHub Actions)

Pipeline: install → format check → lint → typecheck → test → build → (on
protected branches) image build & deploy. No deploy on a failing gate. Secrets
come from GitHub Actions secrets / environment protection rules.

## Release & rollback

Versioned releases with notes (Handover Category 01/07). Documented rollback
procedure per release; database migrations are forward-only with tested
down-paths where feasible. Backup before migration; restore evidence retained.

## Availability & recovery

Design availability 99.9% (central), contractual ≥ 99.5% monthly; RPO < 24h,
RTO < 48h. These are targets validated by DR/restore tests (Category 06), not
assumed.
