# Architecture remediation backlog

## Purpose

This document records the architecture clean-up work required to bring the repository into line with the PBM product direction.

PBM is a business-first enterprise platform. It should be organised around business workspaces, business capabilities, business objects, route doorways, implementation packages and one shared data spine.

This backlog exists to remove older assumptions where the product was shaped too heavily around a narrow instruction/activity chain or around legacy suite terminology.

## Product language rule

Use PBM language in architecture documents and product-facing material:

```text
Business workspace
Business capability
Business object
Activity view
Route doorway
Shared data spine
Integrated record
Operating model
Coverage audit
Framework extension
```

Avoid making legacy vendor or module terminology part of PBM identity. External enterprise software lists may be used privately as completeness checks only.

## Alignment status key

```text
KEEP       Directionally correct; continue and strengthen.
REFACTOR   Valid concept, but wrong shape, location, naming or responsibility.
MOVE       Should live under a different workspace, package or domain.
SPLIT      Contains multiple responsibilities that need separating.
MERGE      Should become part of a broader object or package model.
EXPAND     Correct start, but materially incomplete.
REVIEW     Requires a product/architecture decision before further build-out.
REMOVE     Should be removed after migration because it misleads the model.
```

## Architecture baseline

PBM architecture must trace from stable enterprise concepts into buildable implementation:

```text
Meta concept
    -> business object
        -> business capability
            -> business workspace
                -> route doorway
                    -> implementation package
                        -> table / view
                            -> report / control
```

The stable meta concepts are:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

These are not navigation labels, not package names and not table prefixes. They are architecture categories used to stop the model fragmenting.

---

# Executive summary

The repository has moved in the right direction, but some older assumptions still need to be corrected.

The largest risk is allowing the old delivery chain to become the whole product:

```text
Client account
    -> instruction
        -> activity
            -> observation
                -> assessment
                    -> action
                        -> outcome
```

That chain is useful, but it is not the whole PBM operating model.

The target model is broader:

```text
The business defines itself.
The business manages people, clients, suppliers, assets and controls.
The business wins work.
The business delivers work.
The business controls money.
The business keeps evidence.
The business reports one version of the truth.
```

---

# Priority remediation themes

## 1. Re-centre PBM on the business operating model

Status: KEEP / EXPAND

PBM should be expressed as business workspaces over a shared data spine.

Target workspace families:

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

Required action:

1. Keep workspace names business-readable.
2. Keep implementation packages separate from navigation.
3. Ensure every route states which shared objects it reads or writes.
4. Prevent any route from becoming the owner of a record.

## 2. Reduce instruction as the centre of gravity

Status: REVIEW / REFACTOR

Instruction remains a useful business concept, but it should not be the spine of PBM.

Possible interpretations:

```text
Agreement
Work authorisation
Operational request
Service instruction
Contract trigger
```

Required decision:

```text
Should instruction remain a canonical business object?
Should it become a type of agreement?
Should it become a type of work request?
Should it be renamed to work authorisation or service instruction?
```

Until that decision is made, avoid building new architecture that makes instruction the centre of the product.

## 3. Strengthen project as the controlled work container

Status: EXPAND

Project must become one of the most important Work-domain objects.

A project should connect to:

```text
Client / owning party
Agreement or contract
Project parties and contacts
Locations, assets or properties
Services and deliverables
Assignments and resources
Budgets and forecasts
Purchase orders and supplier invoices
Sales invoices and receipts
Documents and evidence
Risks, issues and changes
Quality and compliance requirements
Reports
```

Required action:

1. Treat project as the controlled delivery container.
2. Link commercial, procurement, finance, document and control records back to the project where relevant.
3. Avoid duplicate project-like records inside other workspaces.

## 4. Complete the commercial lifecycle

Status: EXPAND

PBM needs a clear customer/commercial lifecycle before and after project creation.

Target lifecycle:

```text
Client / contact
    -> enquiry
        -> opportunity
            -> proposal / quote
                -> accepted agreement
                    -> project / work
                        -> invoice / closeout
```

Required business objects:

```text
Client account
Contact
Enquiry
Opportunity
Proposal
Quote
Quote row
Agreement / contract
Variation / change
Billing trigger
```

## 5. Build procurement as a first-class capability

Status: EXPAND

Procurement must not be a finance afterthought. It is the supplier-side control of commitments, service receipt, goods receipt and supplier cost.

Required business objects:

```text
Supplier account
Supplier contact
Purchase request
Supplier quote
Purchase order
Purchase order row
Goods receipt
Service receipt
Supplier invoice
Supplier invoice row
Commitment
```

Procurement records must be able to reference:

```text
Project
Project service
Work package
Asset / thing
Cost centre
Agreement
```

## 6. Build finance as control, not just invoicing

Status: EXPAND

Current invoice objects are a good start, but finance must support control of money across the business.

Required capability areas:

```text
Financial periods
Chart of accounts
Cost centres
Profit centres
Budgets
Forecasts
Commitments
Revenue
Costs
Sales invoices
Supplier invoices
Receipts
Payments
Credit notes
Journal entries
Tax/VAT
WIP / accruals
Management reporting
```

Finance must reference shared business objects rather than recreate clients, suppliers, projects or services.

## 7. Generalise asset and property into the Thing model

Status: REFACTOR / EXPAND

Property is valid, but PBM must support a broader Thing / Asset model.

Target object family:

```text
Asset
Property
Building
Land
Space
Equipment
Plant
Vehicle
Material
Inventory item
Software asset
Information asset
Infrastructure
```

Property should be a specialisation or view of asset/thing, not the only asset concept.

## 8. Make documents and evidence cross-object capabilities

Status: KEEP / EXPAND

Documents and evidence should attach to business objects, controls, work, projects, finance records and commercial records.

Required objects:

```text
Document
Document revision
Record
Evidence item
Correspondence
Template
Report pack
Certificate
Drawing
Specification
Retention policy
```

Evidence should satisfy a requirement or support a decision. It should not become a detached file store.

## 9. Build control, quality and framework management properly

Status: EXPAND

PBM needs a strong Control domain because this is what makes the platform useful across industries, standards and methods.

Required objects:

```text
Framework
Framework version
Framework assignment
Lifecycle template
Stage template
Control template
Checklist template
Evidence requirement
Deliverable template
KPI template
Compliance requirement
Risk
Issue
Corrective action
Audit evidence
```

Frameworks must extend the shared data spine. They must not create separate applications or duplicate business objects.

## 10. Make reporting a data-spine capability

Status: EXPAND

Reporting should not be route-specific. It should read across shared records.

Required reporting principles:

1. Reports read from shared business objects and reporting views.
2. Reports must state their source objects.
3. Reports should support drill-through back to the record of truth.
4. Route-level dashboards are allowed, but enterprise reporting must stay cross-workspace.

---

# Implementation backlog

## A. Documentation cleanup

Status: IN PROGRESS

Actions:

1. Rewrite architecture documents in PBM language.
2. Remove vendor/module branding from headings and product language.
3. Rename coverage documents to enterprise capability coverage documents.
4. Keep external enterprise software lists as private completeness references only.
5. Make every architecture document traceable to business object, workspace, route and data spine.

## B. Setup script alignment

Status: REVIEW / REFACTOR

Actions:

1. Stop seeding route and package names that imply old product ownership.
2. Seed target workspace families.
3. Seed packages as implementation boundaries, not navigation modules.
4. Keep compatibility folders only during migration.
5. Remove deprecated folders after route/import migration.

## C. Route alignment

Status: EXPAND / REFACTOR

Target rule:

```text
Route = user activity doorway.
Route != data owner.
```

Actions:

1. Align routes to business workspaces.
2. Move raw administration routes under admin where appropriate.
3. Keep evidence and documents contextual where possible.
4. Ensure each route has a documented object contract.

## D. Package alignment

Status: EXPAND / REFACTOR

Target rule:

```text
Package = implementation boundary.
Package != product module.
```

Actions:

1. Keep packages stable and reusable.
2. Avoid route-specific packages unless they are UI-only.
3. Put business behaviour in services.
4. Put persistence in repositories.
5. Put shared object contracts in package-level types.

## E. Schema alignment

Status: EXPAND

Target rule:

```text
Table = persistence for a business object, relationship, event, control or configuration.
```

Actions:

1. Review every table against the business object catalogue.
2. Add missing tables for commercial, procurement, finance, controls and reporting.
3. Remove table names that imply route ownership.
4. Add relationship tables where shared objects need many-to-many usage.

## F. Traceability alignment

Status: EXPAND

Every new feature must be traceable through:

```text
Business capability
Business object
Workspace activity
Route doorway
Package/service
Repository/table
Report/control
```

---

# Current priority order

```text
1. Finish documentation language cleanup.
2. Lock the PBM workspace model.
3. Lock the business object catalogue.
4. Lock the data spine and route/object rules.
5. Expand capability coverage audit using PBM language.
6. Convert audit gaps into implementation backlog.
7. Refactor setup script, packages and routes.
8. Expand schema and services by business object priority.
```

## Summary

PBM is not a set of old modules with new labels.

PBM is one connected enterprise operating model with clear workspaces, shared business objects, reusable packages, controlled workflows, attached evidence and a single data spine.

This backlog exists to keep implementation aligned with that direction.
