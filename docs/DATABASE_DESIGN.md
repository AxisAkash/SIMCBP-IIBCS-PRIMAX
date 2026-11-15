# Database Design

> Status: **initial.** No schema is implemented yet. This document records the
> approach and will grow into the authoritative data dictionary + ER model as
> entities are built (Phase 2+). Migrations are the source of truth once present.

## Engine

- **PostgreSQL** (system of record, OLTP) with **PostGIS** for geospatial
  features (M08). Prisma for schema, migrations, and type-safe access.
- Reporting/analytics tier (X4) separated from OLTP; controlled aggregation only
  (no raw PII in analytics surfaces).

## Conventions (target)

- `snake_case` tables/columns; surrogate `uuid` primary keys; `created_at` /
  `updated_at` / soft-delete where retention requires it.
- Every place-bound entity carries a **jurisdiction path** (materialized
  ancestor ids) for geographic authorization.
- Monetary values stored as integer minor units; never floats.
- Audit (X1): append-only, hash-chained audit table, written by a single audit
  service, not ad hoc.

## Core entity groups (planned)

- **Administrative geography**: division/district/upazila/union nodes.
- **Identity & access**: users, roles, role_grants, jurisdiction_scopes,
  sessions, mfa_enrollments.
- **Beneficiary**: applications, verifications, selections, enrollments, profiles.
- **Payments**: benefit schedules, payrolls, payment_instructions, reconciliations.
- **Handover**: categories, deliverables, submissions, evidence, reviews,
  approvals, audit history.
- **Support**: grievances, tickets, referrals, training, notifications, consent.

## Migrations, retention, backup

- Versioned migrations (Prisma) — no manual schema edits in environments.
- Retention/archival/erasure rules per X2; audit-log retention per policy.
- Backup sets + restore evidence tracked under Handover Category 03 & 06;
  RPO<24h / RTO<48h targets in the RTM.

## Data dictionary

Generated from the Prisma schema once entities exist; linked here. Until then,
the shared enums/constants in [`packages/types`](../packages/types) define the
controlled vocabularies (roles, statuses, jurisdiction levels, handover states).
