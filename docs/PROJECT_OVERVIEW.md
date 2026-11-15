# Project Overview

**Project:** SIMCBP – MCBP-MIS
**Formal system name:** MCBP-MIS / MoWCA Integrated MIS
**Organization:** Ministry of Women and Children Affairs (MoWCA), Bangladesh
**Vendor:** IBCS-PRIMAX Software (Bangladesh) Ltd.
**Repository:** https://github.com/AxisAkash/SIMCBP-IIBCS-PRIMAX

## Purpose

A comprehensive, bilingual, integrated Management Information System for the
**Mother and Child Benefit Programme (MCBP)**, supporting the full programme
lifecycle from beneficiary application through payment reconciliation, plus
training, grievance redress, monitoring & evaluation, GIS intelligence,
helpdesk/CRM, interoperability, mobile field operations, and a mandated
seven-category software handover capability.

## Principal modules (M01–M14)

| ID | Module |
|---|---|
| M01 | Beneficiary Application, Verification, Selection & Enrollment |
| M02 | Beneficiary Profile Management |
| M03 | Benefit Calculation, Payroll, Payment Tracking & Reconciliation |
| M04 | Training Management |
| M05 | Grievance Redress & Feedback |
| M06 | Secure Data Hub / API Bank & Integration |
| M07 | Monitoring, Evaluation, Dashboards & Reporting |
| M08 | GIS-Based Programme Intelligence |
| M09 | Agentic AI Workflow Automation & Bilingual Assistant |
| M10 | Android/iOS Mobile Application & Field Operations |
| M11 | User Management, IAM & Access Control |
| M12 | Helpdesk, Helpline, CRM & Referral Management |
| M13 | Dynamic Module Creation & Governed Bulk Data Exchange |
| M14 | Multi-Scheme Extensibility & Programme Configuration |

## Supporting components (X1–X5)

| ID | Component |
|---|---|
| X1 | Audit Logging & Activity Monitoring |
| X2 | Consent, Privacy, Retention, Archiving & Erasure |
| X3 | System Administration, Monitoring & Backup |
| X4 | Two-Tier Data Store & Controlled Aggregation |
| X5 | Localization Framework |

The canonical, machine-readable module registry lives in
[`packages/types/src/modules.ts`](../packages/types/src/modules.ts).

## Software Handover & Transition Management (SRS §4)

A dedicated capability spanning **seven mandated categories**:

1. Build, Release & Deployment
2. Applications & Configuration
3. Database & Data Assets
4. APIs & Integrations
5. Infrastructure & Security
6. Operations, Backup & Disaster Recovery
7. User & Technical Documentation

Each category tracks deliverables through a submission → review → approval
workflow with evidence, ownership, and audit history. A handover is **not**
complete merely because a checklist is ticked — evidence and approval are
required. See [`HANDOVER_DOCUMENTATION.md`](HANDOVER_DOCUMENTATION.md).

## Users & roles

Fourteen roles from System Administrator to Beneficiary, each anchored to a
level of the Bangladesh administrative hierarchy (National → Division → District
→ Upazila → Union). Access = role permission ∩ geographic jurisdiction. See
[`packages/types/src/roles.ts`](../packages/types/src/roles.ts) and
[`SECURITY_DESIGN.md`](SECURITY_DESIGN.md).

## Requirements provenance

Functional requirements `FR-001`–`FR-092` and the NFR set originate from the
Tender SRS. That `.docx` is **not yet in-repo**; detailed FR text is tracked as
`pending` in [`REQUIREMENTS_TRACEABILITY.md`](REQUIREMENTS_TRACEABILITY.md) and
will be reconciled when supplied. Module-level scope above is authoritative for
planning in the interim.
