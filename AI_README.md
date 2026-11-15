# AI_README — Working agreement for AI/automation contributors

This file orients any AI assistant (or automation) contributing to SIMCBP /
MCBP-MIS. It encodes non-negotiable guardrails for a **sensitive government
benefit programme**. Read it before making changes.

## Golden rules

1. **Inspect before modifying.** Never overwrite existing work or architecture
   without a documented reason. Read [`docs/SYSTEM_ARCHITECTURE.md`](docs/SYSTEM_ARCHITECTURE.md) first.
2. **Never fabricate.** No fake statistics presented as real programme data, no
   invented integrations, credentials, approvals, or requirement text. Demo data
   must be clearly labelled as demo.
3. **Never document unfinished work as complete.** Module/requirement status
   lives in [`docs/REQUIREMENTS_TRACEABILITY.md`](docs/REQUIREMENTS_TRACEABILITY.md)
   and must reflect verified reality.
4. **Secrets never enter the repo.** No `.env`, keys, tokens, production data,
   or build artifacts. Secret transfer is recorded as *procedure*, not values.
5. **Verify before committing.** `pnpm verify` (format, lint, typecheck, test)
   must pass. Never push broken or untested changes; never force-push shared history.
6. **Branch discipline.** Feature branches only; never push to `main`; no merge
   to `main` without explicit human authorization.

## AI must remain advisory (M09)

The in-product AI assistant and any automation MUST NOT independently:
approve/reject applications, change eligibility, approve payroll, authorize
payments, or modify critical master data. Every AI-assisted action requires
human review and leaves an audit record (X1).

## Requirements source of truth

- Principal requirements: the Tender SRS (`FR-001`–`FR-092`, NFRs). **The SRS
  `.docx` is not yet in-repo** — detailed FRs are tracked as `pending` in the
  traceability matrix until supplied. Do not invent their contents.
- Module list (M01–M14, X1–X5), handover categories, NFR targets, roles, and
  security model are captured in `docs/` and `packages/types`.

## Where things live

| Concern | Location |
|---|---|
| Design tokens / theme | `packages/design-tokens` |
| Shared domain types | `packages/types` |
| Localization (en/bn) | `packages/i18n` |
| Logos / identity | `packages/branding` (swap point for official assets) |
| Decisions & roadmap | `docs/DEVELOPMENT_ROADMAP.md`, `docs/CHANGELOG.md` |

## Open items / pending decisions

Tracked in [`docs/DEVELOPMENT_ROADMAP.md`](docs/DEVELOPMENT_ROADMAP.md#open-questions),
including the flagged conflicting NFR (1M payment transactions vs the stated
2–4 hour window) which must be **clarified, not silently resolved**.
