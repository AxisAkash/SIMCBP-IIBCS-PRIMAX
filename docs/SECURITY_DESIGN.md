# Security Design

Security-by-design for a **sensitive government benefit programme**. This
document states the target controls; implementation status is tracked in
[`REQUIREMENTS_TRACEABILITY.md`](REQUIREMENTS_TRACEABILITY.md). No control is
claimed operational without evidence.

## Identity & access (M11 / X1)

- **RBAC** — 14 roles ([`roles.ts`](../packages/types/src/roles.ts)); permissions
  granted per role, never ad hoc.
- **Geographic authorization** — every place-bound record carries a jurisdiction
  path; every user a scope. Effective access = *role permission ∩ jurisdiction*
  ([`jurisdiction.ts`](../packages/types/src/jurisdiction.ts)).
- **MFA** — required for privileged roles (`requiresMfa` in role definitions):
  System/Ministry Admin, Programme Director, National Admin, Finance Officer,
  Auditor. TOTP-based.
- **Sessions** — short-lived access tokens + rotating refresh tokens; server-side
  revocation; idle and absolute timeouts.
- **Password policy & lockout** — complexity rules, history, attempt throttling,
  progressive lockout.

## Workflow integrity

- **Maker–checker** for sensitive operations (eligibility decisions, payroll,
  payment authorization, master-data changes).
- **AI is advisory only** — automation cannot approve/reject applications, change
  eligibility, approve payroll, authorize payments, or alter critical master data
  without human approval. Every AI-assisted action is reviewable and audited.

## Data protection

- **Encryption in transit** (TLS everywhere) and **at rest** (DB/volume + object
  storage).
- **Sensitive-field masking** (NID, phone, bank details) by role; unmasking is a
  privileged, audited action.
- **Tamper-evident audit records** (X1): append-only, hash-chained, covering who
  did what, when, from where, on which record.
- **Consent, retention, archival, erasure** (X2): lawful-basis tracking,
  retention schedules, controlled erasure with audit.
- **Controlled aggregation** (X4): analytics surfaces expose aggregates, not raw
  PII.
- **Controlled export & secure document access**: exports are permissioned,
  watermarked where appropriate, and logged.

## Secrets

Secrets never enter the repository. `.env` is git-ignored; `.env.example` holds
placeholders only. Handover records secret **transfer procedures**, never values
(SRS §4 Category 02/05).

## Monitoring & response

Security event monitoring, alerting, and incident records (X3). VAPT/SQTC results
and remediation evidence are tracked under Handover Category 05.

## Current posture

Foundation phase: the authorization model and token contracts are defined in
shared types; runtime enforcement (guards, MFA, audit chain) is implemented in
Phase 2. Until then, do not treat any endpoint as secured.
