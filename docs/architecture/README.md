# PBM architecture

## Purpose

This folder defines how Perspective Business Manager is structured.

PBM is a business-first enterprise platform. It gives a business one connected model for setup, people, clients, work, suppliers, finance, assets, documents, controls and reporting.

PBM is not a collection of disconnected business applications. It is also not a legacy suite copied with different labels.

The architecture is built around:

```text
Business workspaces
Business capabilities
Business objects
Activity views
Route doorways
Implementation packages
Shared data spine
Framework extensions
Reporting views
```

## Product language rule

Use PBM language in architecture and product documents.

Preferred terms:

```text
Business workspace
Business capability
Business object
Shared data spine
Integrated record
Activity view
Route doorway
Implementation package
Operating model
Coverage audit
Framework extension
```

Avoid using external vendor/module language as PBM identity. External enterprise software lists may be used as completeness references, but they must not become PBM navigation, product naming or data ownership language.

## Architecture principles

1. A route is a doorway into work, not the owner of a record.
2. A package is an implementation boundary, not the product module.
3. A table persists a business object, relationship, event, control or configuration.
4. A workspace shows an activity view over shared records.
5. A report reads from the shared data spine, not from isolated route data.
6. Documents and evidence attach to business objects.
7. Controls, risks and obligations attach to business objects.
8. Frameworks extend behaviour without duplicating the core model.
9. Industry-specific behaviour belongs in framework or extension layers.
10. Every new feature must trace from capability to object to route to data.

## Reading order

Read the architecture documents in this order:

```text
000 Enterprise Meta Model
    -> 001 Canonical Enterprise Data Model
        -> 002 Business Object Catalogue
            -> 003 Enterprise Relationship Model
                -> 004 Schema Relationship Appendix
                    -> 005 Route Object Relationship Appendix
                        -> 006 Package Object Relationship Appendix
                            -> 007 Architecture Remediation Backlog
                                -> 008 Repository Alignment Review
```

## Key documents

- [000-enterprise-meta-model.md](./000-enterprise-meta-model.md)
- [001-canonical-enterprise-data-model.md](./001-canonical-enterprise-data-model.md)
- [002-business-object-catalogue.md](./002-business-object-catalogue.md)
- [003-enterprise-relationship-model.md](./003-enterprise-relationship-model.md)
- [004-schema-relationship-appendix.md](./004-schema-relationship-appendix.md)
- [005-route-object-relationship-appendix.md](./005-route-object-relationship-appendix.md)
- [006-package-object-relationship-appendix.md](./006-package-object-relationship-appendix.md)
- [007-architecture-remediation-backlog.md](./007-architecture-remediation-backlog.md)
- [008-repository-alignment-review.md](./008-repository-alignment-review.md)
- [012-enterprise-capability-coverage-catalogue.md](./012-enterprise-capability-coverage-catalogue.md)
- [013-enterprise-sub-capability-coverage-audit.md](./013-enterprise-sub-capability-coverage-audit.md)

## Relationship to product docs

The product docs define what PBM is and how it should feel to the business user.

The architecture docs define how that product direction is made consistent in data, packages, routes and implementation.

Product docs live in:

```text
docs/product
```

Architecture docs must support the product docs. They must not introduce alternative product language.

## Root architecture concepts

PBM derives its architecture from seven stable concepts:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

These are not workspace names, table names, navigation labels or package names. They are architecture categories that keep the model coherent.

## Business workspaces

PBM workspaces are activity views over shared records.

Current target workspace families:

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

A workspace may use many business objects. A business object may appear in many workspaces.

The workspace does not own the object.

## Business objects

PBM business objects are the shared records that carry enterprise truth.

Examples:

```text
Business Entity
Person Entity
Business Partner
Business Partner Role
Business Function
Organisation Unit
Position
Employee
Employee Position
Client Account
Supplier Account
Project
Project Party
Project Assignment
Project Service
Project Quote
Purchase Order
Supplier Invoice
Sales Invoice
Asset
Property
Document
Evidence Item
Risk
Control
Framework
Report
```

The same object can appear in several workspaces.

Example:

```text
supplier_invoice
```

may appear in:

```text
Procurement
Finance
Project Delivery
Reporting
```

but there must still be one record of truth.

## Shared data spine

The shared data spine is the connected model of PBM records and relationships.

It prevents:

```text
duplicate client records
duplicate supplier records
duplicate project records
duplicate invoice records
route-owned data silos
package-owned data silos
workspace-specific versions of truth
```

The data spine lets each workspace perform a different job using the same underlying record.

## Framework extensions

PBM must support different industries, standards, methods and client-specific governance without forking the core product.

Frameworks can add:

```text
lifecycle stages
workflow definitions
controls
checklists
deliverable templates
document templates
evidence requirements
approval gates
risk rules
quality rules
reporting requirements
KPIs
```

Frameworks must extend the shared data spine. They must not create separate applications or duplicate business objects.

## Package direction

Packages should implement stable business and platform boundaries.

Candidate package families:

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

Packages are not user navigation.

## Route direction

Routes should represent workspaces and user journeys.

Every route family should answer:

1. Which business workspace does this belong to?
2. Which business capability does this support?
3. Which shared business objects does this view or modify?
4. Which package owns the relevant business behaviour?
5. Which table or view persists the record?
6. Which workflow, event, evidence or control rules apply?
7. Which reports need to read the same record?

## Architecture review rule

Before creating a new route, package, table, service or workflow, confirm:

1. Which root architecture concept does it derive from?
2. Which business capability does it support?
3. Which business object does it create, update, read or govern?
4. Does an existing object already represent this concept?
5. Is this core PBM behaviour or framework-specific behaviour?
6. Is this a workspace concern or package concern?
7. Does it require workflow?
8. Does it require immutable events?
9. Does it require document or evidence attachment?
10. Does it require compliance controls?
11. Can it report across the shared data spine?

## Summary

PBM architecture has one job: keep the product connected.

Users should see clear business workspaces.

The platform should maintain shared business objects and one data spine.

Packages should implement reusable behaviour.

Routes should provide activity views.

Frameworks should adapt how work is governed and executed.

The goal is complete enterprise capability coverage without the fragmentation that makes legacy systems hard to change, report across and operate.
