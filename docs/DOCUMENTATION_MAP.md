# PBM Documentation Map

This document explains how to read the Perspective Business Manager documentation set.

PBM is documented from the outside in:

1. Product intent
2. Business operating model
3. Workspaces and activities
4. Enterprise capability coverage
5. Business objects
6. Shared data spine
7. Architecture
8. Requirements
9. Workspace requirements

The purpose is to keep the product understandable while still supporting full enterprise coverage.

## Language rule

PBM documentation must use PBM product language.

Use:

- Enterprise capability
- Business workspace
- Business object
- Activity
- Activity view
- Route doorway
- Shared data spine
- Integrated record
- Operating model
- Coverage audit
- Implementation package
- Reporting view
- Control

Avoid using external ERP vendor or module language as PBM product language. External ERP capability lists may be used as completeness references, but they must not become PBM navigation, route names, object ownership, package names or user-facing concepts.

## Recommended reading order

### 1. Product overview

Start here to understand what PBM is and why it exists.

| Order | Document | Purpose |
| --- | --- | --- |
| 1 | `docs/README.md` | Top-level documentation entry point and product language rule. |
| 2 | `docs/product/001-product-vision.md` | Defines PBM as a business-first enterprise platform. |
| 3 | `docs/product/002-enterprise-operating-model.md` | Explains how a business is represented and operated inside PBM. |
| 4 | `docs/product/003-workspace-model.md` | Explains the workspace model and why routes are activity doorways, not data owners. |
| 5 | `docs/product/004-capability-coverage.md` | Explains the enterprise capability coverage model. |
| 6 | `docs/product/005-business-object-model.md` | Explains the main business objects used across PBM. |
| 7 | `docs/product/006-data-spine.md` | Explains the shared record model and how different workspaces use the same truth. |

### 2. Architecture model

Read these after the product docs. They explain how the PBM product model is represented technically.

| Order | Document | Purpose |
| --- | --- | --- |
| 1 | `docs/architecture/README.md` | Architecture index and language rules. |
| 2 | `docs/architecture/000-enterprise-meta-model.md` | Root conceptual model: party, thing, agreement, work, transaction, information and control. |
| 3 | `docs/architecture/001-canonical-enterprise-data-model.md` | Canonical data domains and shared data spine. |
| 4 | `docs/architecture/002-business-object-catalogue.md` | Business object dictionary. |
| 5 | `docs/architecture/003-enterprise-relationship-model.md` | Relationships between objects, workspaces and activity views. |
| 6 | `docs/architecture/004-schema-relationship-appendix.md` | How schema tables support business objects and workspace activities. |
| 7 | `docs/architecture/005-route-object-relationship-appendix.md` | How routes act as doorways into business objects. |
| 8 | `docs/architecture/006-package-object-relationship-appendix.md` | How implementation packages support the product model. |
| 9 | `docs/architecture/007-architecture-remediation-backlog.md` | Architecture cleanup and alignment backlog. |
| 10 | `docs/architecture/008-repository-alignment-review.md` | Repository alignment review against the PBM operating model. |
| 11 | `docs/architecture/012-enterprise-capability-coverage-catalogue.md` | Capability coverage catalogue. |
| 12 | `docs/architecture/013-enterprise-sub-capability-coverage-audit.md` | Detailed coverage audit against reference enterprise capability lists. |

### 3. Requirements model

Read these to understand what the product must do and how delivery should be traced.

| Order | Document | Purpose |
| --- | --- | --- |
| 1 | `docs/requirements/README.md` | Requirements index and language rules. |
| 2 | `docs/requirements/01-product-scope.md` | Product scope and boundaries. |
| 3 | `docs/requirements/02-enterprise-capability-coverage.md` | Enterprise capability requirements. |
| 4 | `docs/requirements/03-cross-cutting-platform-requirements.md` | Shared platform requirements. |
| 5 | `docs/requirements/04-traceability-matrix.md` | Capability-to-workspace-to-object traceability. |
| 6 | `docs/requirements/05-phased-delivery-backlog.md` | Delivery phasing and backlog structure. |
| 7 | `docs/requirements/06-customer-model-rules.md` | Business profile and customer model rules. |
| 8 | `docs/requirements/07-customer-model-implementation-checklist.md` | Implementation checklist for the business profile model. |

### 4. Workspace requirements

Workspace requirement documents describe what users do in each area of PBM. They do not define separate modules or separate data ownership.

| Order | Document | Purpose |
| --- | --- | --- |
| 1 | `docs/requirements/workspaces/README.md` | Workspace requirements index and structure. |
| 2 | `docs/requirements/workspaces/clients-commercial.md` | Client, relationship, enquiry, opportunity, quote and instruction activities. |
| 3 | `docs/requirements/workspaces/project-delivery.md` | Project, service, delivery, assignment, evidence and project cost activities. |
| 4 | `docs/requirements/workspaces/people-workforce.md` | Person, employee, position, competence, time and workforce planning activities. |
| 5 | `docs/requirements/workspaces/procurement-supplier-control.md` | Supplier, purchasing, purchase order, receipt and supplier invoice activities. |

## How to write future docs

Every new PBM document should answer these questions:

1. What business job does this support?
2. Which workspace uses it?
3. Which business objects are involved?
4. Which records live in the shared data spine?
5. Which routes are only activity doorways?
6. Which reports or controls depend on it?
7. What is deliberately out of scope?

## Traceability rule

Every feature should be traceable through this chain:

```text
Business purpose
    -> enterprise capability
        -> business workspace
            -> business activity
                -> business object
                    -> route doorway
                        -> implementation package
                            -> table / view
                                -> report / control
```

If a feature cannot be traced through this chain, it is either not yet understood or it belongs outside the current PBM scope.

## Current documentation objective

The immediate documentation objective is to make PBM read as one coherent enterprise operating system:

- Product docs define the why and the product shape.
- Architecture docs define the technical model that supports the product shape.
- Requirements docs define what must be delivered.
- Workspace docs define how users perform work without creating separate versions of the truth.

The documentation should make it clear that PBM is not a set of disconnected screens. PBM is a connected operating model with one shared data spine.
