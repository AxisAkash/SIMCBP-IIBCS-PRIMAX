# Requirements Traceability Matrix (RTM)

Connects requirements → modules → implementation → tests. **Status reflects
verified reality**, never aspiration. Legend: ⬜ planned · 🟡 in progress ·
✅ implemented & verified.

## 1. Functional requirements FR-001–FR-092

> ⚠️ The Tender SRS `.docx` (which defines the exact text of FR-001–FR-092 and
> NFR identifiers) is **not yet in the repository**. These rows are therefore
> tracked as **`pending` — awaiting SRS import**. They will be populated verbatim
> (preserving original IDs) when the document is supplied. Module-level scope
> below is authoritative for planning in the interim. FR text will **not** be
> invented.

| FR range | Owning module(s) | Status |
|---|---|---|
| FR-001 … FR-092 | M01–M14 / X1–X5 (to be mapped on SRS import) | pending |

## 2. Module implementation status

| Module | Scope summary | Impl. | Tests |
|---|---|---|---|
| M01 Beneficiary lifecycle | application → verification → selection → enrollment | ⬜ | ⬜ |
| M02 Beneficiary profile | profile management | ⬜ | ⬜ |
| M03 Payments | calculation, payroll, tracking, reconciliation | ⬜ | ⬜ |
| M04 Training | training management | ⬜ | ⬜ |
| M05 Grievance | redress & feedback | ⬜ | ⬜ |
| M06 Integration | secure data hub / API bank (adapters, sandbox) | ⬜ | ⬜ |
| M07 Monitoring & reporting | dashboards, M&E, reports | ⬜ | ⬜ |
| M08 GIS | geographic programme intelligence (PostGIS) | ⬜ | ⬜ |
| M09 AI assistant | advisory workflow automation, bilingual | ⬜ | ⬜ |
| M10 Mobile & field | Android/iOS field operations | ⬜ | ⬜ |
| M11 IAM | users, RBAC, jurisdiction access | ⬜ | ⬜ |
| M12 Helpdesk/CRM | helpline, CRM, referral | ⬜ | ⬜ |
| M13 Dynamic modules | dynamic module creation, governed bulk exchange | ⬜ | ⬜ |
| M14 Multi-scheme | extensibility, programme configuration | ⬜ | ⬜ |
| X1 Audit logging | tamper-evident activity log | ⬜ | ⬜ |
| X2 Privacy/consent | consent, retention, archival, erasure | ⬜ | ⬜ |
| X3 Sysadmin | administration, monitoring, backup | ⬜ | ⬜ |
| X4 Data store | two-tier store, controlled aggregation | ⬜ | ⬜ |
| X5 Localization | en/bn framework + runtime switching in the shell | 🟡 | ⬜ |

Foundations delivered so far (Phase 1): design system, shared domain types,
localization framework with working English↔Bangla runtime switching, branding
config, and the enterprise application shell + executive dashboard (demo data).
These are enablers and UI scaffolding — **not** module completion. In particular,
the dashboard renders clearly-labelled demo data and does **not** constitute M07
(Monitoring & Reporting), which remains planned.

## 3. Handover categories (SRS §4)

| # | Category | Impl. |
|---|---|---|
| 01 | Build, Release & Deployment | ⬜ |
| 02 | Applications & Configuration | ⬜ |
| 03 | Database & Data Assets | ⬜ |
| 04 | APIs & Integrations | ⬜ |
| 05 | Infrastructure & Security | ⬜ |
| 06 | Operations, Backup & DR | ⬜ |
| 07 | User & Technical Documentation | ⬜ |

Domain model: [`packages/types/src/handover.ts`](../packages/types/src/handover.ts).

## 4. Non-functional requirements (SRS §10)

| NFR | Target | Status |
|---|---|---|
| Active beneficiaries | 1,000,000–1,500,000+ | design target |
| Concurrent users | ≥ 5,000 | design target |
| Avg API response | < 2 s | design target |
| Avg page response | < 3 s (normal load) | design target |
| Peak API throughput | ≥ 10,000 req/min | design target |
| Payment throughput | 1,000,000 txns in 2–4 h window | ⚠️ **conflict — see roadmap open questions** |
| Central-server design availability | 99.9% | design target |
| Contractual monthly production availability | ≥ 99.5% | design target |
| RPO | < 24 h | design target |
| RTO | < 48 h | design target |
| Migration record-count reconciliation | 100% | design target |
| Migration field-level accuracy (approved samples) | ≥ 99.5% | design target |

None of the above are claimed **achieved**; they become ✅ only with test
evidence (performance, restore, DR, migration reconciliation).
