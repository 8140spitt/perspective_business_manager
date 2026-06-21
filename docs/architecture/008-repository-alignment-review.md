# Repository alignment review

## Purpose

This document reviews the current repository shape against the PBM architecture baseline.

It is not a full code audit. It is a working alignment review used to decide what should be kept, refactored, moved, split, merged, expanded or reviewed.

PBM must be implemented as:

```text
Business workspaces
    over shared business objects
        backed by implementation packages
            persisted through a shared data spine
```

Routes, packages and tables must not create separate versions of the truth.

## Limitation

This review is based on repository areas inspected during the current refactor and through GitHub connector access. A local audit should still be run before large deletions or renames:

```bash
find src/lib/packages -maxdepth 4 -type f | sort
find src/lib/server/repositories -maxdepth 4 -type f | sort
find src/lib/server/services -maxdepth 4 -type f | sort
find src/routes/app -maxdepth 6 -type f | sort
find src/lib/server/db/schema -maxdepth 2 -type f | sort
```

## Status key

```text
KEEP       Directionally correct; continue and strengthen.
REFACTOR   Valid concept, but wrong shape, location, naming or responsibility.
MOVE       Should live under a different route, package, workspace or domain.
SPLIT      Contains multiple responsibilities that need separating.
MERGE      Should become part of a broader object or package model.
EXPAND     Correct start, but materially incomplete.
REVIEW     Requires a product/architecture decision before more implementation.
REMOVE     Should be removed after migration because it misleads the model.
```

## Current architecture baseline

The repository should align to this documentation sequence:

```text
docs/README.md
    -> docs/product/*
        -> docs/architecture/000-enterprise-meta-model.md
            -> docs/architecture/001-canonical-enterprise-data-model.md
                -> docs/architecture/002-business-object-catalogue.md
                    -> docs/architecture/003-enterprise-relationship-model.md
                        -> appendices and remediation backlog
```

The root architecture concepts are:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

The product workspaces are:

```text
Business Setup
People & Workforce
Clients & Commercial
Project Delivery
Operations & Planning
Procurement, Materials & Logistics
Finance & Control
Assets, Property & Maintenance
Quality & Compliance
Reporting, Documents & Admin
```

---

# 1. Documentation alignment

Status: KEEP / EXPAND

## Current state

The documentation has been reset toward PBM language and a shared data-spine model.

## Required action

1. Keep all product docs in PBM language.
2. Avoid making old vendor/module terms part of the visible product model.
3. Keep external enterprise software lists only as completeness references.
4. Ensure each architecture doc identifies the business objects, workspaces, routes, packages and data spine relationships it governs.
5. Mark older assumptions as superseded where they are not yet removed.

---

# 2. Setup script alignment

Status: REFACTOR

## Current concern

The setup script has historically seeded older package and route families that reflect a narrower delivery-chain model.

The script should no longer be treated as the source of product truth.

## Target direction

The setup script should seed:

```text
product workspace structure
implementation package structure
shared route conventions
shared app shell conventions
```

It should not imply that packages or routes own the underlying business records.

## Required action

1. Add target workspaces and package families.
2. Preserve current folders only for migration.
3. Mark older folders as compatibility/pending migration where needed.
4. Move code package-by-package.
5. Remove deprecated folders only after imports and routes are migrated.

---

# 3. Package alignment

Status: EXPAND / REFACTOR

## Package rule

```text
Package = implementation boundary.
Package != product module.
```

Packages should group code around stable business or platform behaviour.

## Target package families

```text
core
reference-data
parties
business-structure
people
client-accounts
supplier-accounts
commercial
agreements
contracts
projects
work
operations
resources
procurement
finance
assets
documents
evidence
controls
compliance
quality
workflows
events
frameworks
reports
integrations
administration
extensions
```

## Current package decisions

| Package / concept | Status | Direction |
|---|---|---|
| `core` | KEEP / REVIEW | Keep small. Do not allow business orchestration to collect here. |
| `reference-data` | KEEP | Use for controlled code sets, relationship types, statuses and framework metadata. |
| `parties` | KEEP | Own party identity and relationships. Do not absorb customer/supplier journeys. |
| `client-accounts` | KEEP / EXPAND | Commercial customer relationship layer. Do not absorb the full sales pipeline. |
| `supplier-accounts` | EXPAND | Supplier relationship layer required for procurement and supplier finance. |
| `properties` | REFACTOR | Treat as an asset/thing specialisation, not the whole asset model. |
| `instructions` | REVIEW | Do not deepen as the spine. Decide whether it is agreement, work request or authorisation. |
| `activities` | KEEP / REFACTOR | Generic work execution, not surveying-specific work. |
| `documents` | EXPAND | Full information domain. Attach documents to all relevant objects. |
| `evidence` | KEEP / REFACTOR | Evidence satisfies requirements and supports decisions. It must attach to objects/controls. |
| `inspections` | REVIEW / EXTENSION | Decide whether generic work type or framework extension. |
| `building-surveying` | MOVE / EXTENSION | Industry extension or framework package. Must not shape the core model. |
| `reports` | EXPAND | Reporting over the shared data spine. |
| `finance` | EXPAND | Build finance control, not only invoicing. |
| `procurement` | EXPAND | First-class supplier-side commitment and cost control. |
| `compliance` | EXPAND | Controls, obligations, evidence requirements and auditability. |
| `workflows` | KEEP / EXPAND | Cross-object workflow control. |
| `events` | EXPAND | Immutable business events and audit events. |

---

# 4. Route alignment

Status: EXPAND / REFACTOR

## Route rule

```text
Route = activity doorway.
Route != data owner.
```

Routes should express how a user performs work, not how the database is partitioned.

## Target route families

```text
/app/business
/app/hr
/app/crm
/app/sales
/app/projects
/app/operations
/app/resource-planning
/app/procurement
/app/finance
/app/property or /app/assets
/app/compliance
/app/reporting
/app/admin
```

## Current route direction

| Route / route family | Status | Direction |
|---|---|---|
| `/app/business` | KEEP / EXPAND | Business setup and operating model. |
| `/app/hr` | KEEP / EXPAND | People, employees, positions, competence and workforce controls. |
| `/app/crm` | KEEP / REVIEW | Client/contact relationship view. Should not own all commercial work. |
| `/app/sales` | EXPAND | Enquiry, opportunity, quote, proposal and commercial activity. |
| `/app/projects` | KEEP / EXPAND | Controlled delivery container and project service model. |
| `/app/operations` | EXPAND | Work planning, scheduling, service/work order execution. |
| `/app/resource-planning` | EXPAND | Capacity, assignments and utilisation. |
| `/app/procurement` | EXPAND | Purchase requests, orders, receipts, supplier invoices and supplier performance. |
| `/app/finance` | EXPAND | Finance control, periods, invoicing, payment, budgets and reporting. |
| `/app/property` | REFACTOR | Move toward broader assets/property/facilities model. |
| `/app/compliance` | EXPAND | Risk, controls, quality, obligations, evidence and audit. |
| `/app/reporting` | KEEP / EXPAND | Cross-workspace reporting over shared records. |
| `/app/admin` | KEEP / EXPAND | Platform, reference data, users, roles, settings, workflows and integrations. |

Routes that expose raw technical objects should be treated as admin or developer views unless they represent a business activity.

---

# 5. Server service and repository alignment

Status: KEEP / ENFORCE

## Target rule

```text
Route
    -> package service
        -> repository
            -> database
```

Routes should not import repositories directly.

Repositories should not perform business orchestration.

Services should coordinate:

```text
validation
business rules
transactions
workflow calls
event creation
repository calls
```

## Required action

1. Keep repository methods focused on persistence.
2. Keep service methods focused on business behaviour.
3. Keep route load/actions thin.
4. Create package-level service APIs for shared behaviour.
5. Ensure workflow and event logic is not duplicated per route.

---

# 6. Schema alignment

Status: EXPAND

## Schema rule

```text
Table = persistence for a business object, relationship, event, control or configuration.
```

Tables must not be created just because a route exists.

## Required action

1. Map every table to a business object or relationship.
2. Add missing commercial, procurement, finance, control and reporting tables.
3. Avoid table names that imply route ownership.
4. Use relationship tables where shared objects participate in multiple workspaces.
5. Keep reference/code tables clear and reusable.

---

# 7. Business object gaps

Status: EXPAND

The following business objects or object families need stronger implementation coverage:

```text
Business profile
Business function
Organisation unit
Position
Employee
Employee position
Competence
Authority limit
Client account
Supplier account
Enquiry
Opportunity
Quote
Quote row
Agreement
Contract
Project
Project service
Project assignment
Project cost
Purchase request
Purchase order
Purchase order row
Goods/service receipt
Supplier invoice
Supplier invoice row
Sales invoice
Sales invoice row
Financial period
Cost centre
Profit centre
Budget
Forecast
Asset
Property
Maintenance order
Document
Evidence item
Risk
Control
Corrective action
Framework assignment
Reporting view
```

Each object family should have:

```text
business definition
owning package
workspace usage
route doorway
schema table(s)
relationships
workflow/event requirements
reporting requirements
```

---

# 8. Naming alignment

Status: ENFORCE

PBM documentation and code should avoid names that make the product look like a clone of a legacy suite or like a route-owned application.

Preferred names:

```text
Business workspace
Business object
Business capability
Data spine
Activity view
Route doorway
Implementation package
Coverage audit
Framework extension
```

Avoid names that imply:

```text
route owns the record
package is the product module
old vendor module labels are the PBM model
industry extension is the core product
```

---

# 9. Recommended next repository work

Priority order:

```text
1. Finish documentation alignment.
2. Lock workspace names and route roles.
3. Lock the business object catalogue.
4. Expand the capability coverage audit using PBM language.
5. Convert gaps into a build backlog.
6. Refactor setup script package and route seeding.
7. Expand project, commercial, procurement, finance and control object models.
8. Add reporting views over the shared data spine.
```

## Summary

The repository is moving toward the right product model.

The remaining work is to remove old centre-of-gravity assumptions, complete the enterprise object coverage, and keep implementation aligned to PBM's actual product language:

```text
One business operating model.
Clear workspaces.
Shared business objects.
One data spine.
No route-owned truth.
No module-owned truth.
```
