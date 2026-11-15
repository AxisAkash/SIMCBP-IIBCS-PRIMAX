# Testing Strategy

Quality is gated, not optional. `pnpm verify` (format + lint + typecheck + test)
must pass before every commit and push. Tests use realistic fixtures and **never
real beneficiary personal data**.

## Test layers

| Layer | Tooling (target) | Scope |
|---|---|---|
| Unit | Vitest / Jest | pure logic: eligibility, benefit calc, authz rules, state machines |
| Component | React Testing Library | UI components, states (empty/loading/error), forms |
| API | Supertest + Nest testing | controllers, validation, guards, error envelopes |
| Integration | Testcontainers (Postgres) | repository + DB behavior, migrations |
| Auth / Authz | dedicated suites | login, MFA, session, RBAC ∩ jurisdiction |
| Workflow | scenario tests | maker–checker, application pipeline, handover flow |
| E2E | Playwright | critical journeys across the shell |
| Accessibility | axe + manual | WCAG 2.1 AA checks |
| Responsive | Playwright viewports | desktop/tablet/mobile |
| Security | targeted + VAPT (Cat 05) | injection, authz bypass, masking, audit integrity |
| Regression | CI on every PR | guard against reintroduced defects |

## Handover module — mandatory test cases (SRS §13)

Create category · add deliverable · upload evidence · update status (valid/invalid
transitions) · review submission · approve/reject · track missing documents ·
calculate readiness · generate report · enforce authorized access · record audit
history. These are tracked as explicit cases in the RTM when the module lands.

## Current state

Foundation phase: shared packages carry pure logic (e.g. jurisdiction
containment, handover transition rules) that is unit-testable now; app-level and
integration suites are added alongside their features. No performance/DR/migration
evidence exists yet — related NFRs remain "design target" in the RTM.

## Evidence

Test runs, coverage, performance results, restore/DR tests, and migration
reconciliation are archived as handover evidence (Categories 03/05/06/07). A
passing checklist is never a substitute for evidence.
