# API Documentation

> Status: **initial.** No endpoints are implemented yet. The API is built in
> Phase 2+. This document records conventions; the live contract will be the
> generated **OpenAPI** spec served by the NestJS app.

## Conventions (target)

- **Base & versioning**: `/{API_GLOBAL_PREFIX}/{API_VERSION}` → `/api/v1`.
  Breaking changes bump the version; old versions deprecated, not silently broken.
- **Format**: JSON; `camelCase` fields; ISO-8601 timestamps (UTC); money as
  integer minor units with an explicit currency.
- **Auth**: Bearer access token (short-lived) + refresh rotation; privileged
  routes require MFA assurance. Every request is authorized by *role ∩
  jurisdiction* and audited (X1).
- **Validation**: request DTOs validated at the edge; 422 with field-level errors.
- **Errors**: consistent envelope `{ error: { code, message, details } }` with a
  stable, documented error-code catalogue (also a Handover Category 04 deliverable).
- **Pagination**: cursor-based for large collections (beneficiaries, payments);
  `limit` capped.
- **Idempotency**: mutating financial endpoints accept an idempotency key.
- **Rate limiting**: per-principal; peak target ≥ 10,000 req/min (NFR).

## Integrations (M06)

External/government integrations are accessed only through **documented adapters**
with **sandbox/mock** providers by default. Interface-control documents, field
mappings, auth flows, error codes, retry/fallback, and test collections are
tracked under Handover Category 04. No real integration is assumed available.

## Discoverability

- OpenAPI JSON + Swagger UI exposed by the API in non-production.
- Postman/Bruno collections committed under the API app once endpoints exist.
