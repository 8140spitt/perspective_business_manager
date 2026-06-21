# Traceability Matrix

## Purpose

Trace requirements from PBM capability areas to business workspaces, route doorways, implementation packages and shared business objects.

This matrix exists to prove that PBM is being built as one integrated enterprise platform rather than as separate route or package silos.

## Traceability Rules

1. Every PBM capability area should map to one or more requirement documents.
2. Every requirement area should map to one or more current or planned route doorways.
3. Every route family should map to one or more implementation package families.
4. Every package should map back to shared business objects.
5. Organisation-led and individual-led customer support should be traceable across all customer-facing and commercially relevant workspaces.
6. Gaps between requirement coverage and implementation surfaces should be explicit.

## Shared Control Documents

- enterprise capability coverage: [02-enterprise-capability-coverage.md](./02-enterprise-capability-coverage.md)
- cross-cutting platform requirements: [03-cross-cutting-platform-requirements.md](./03-cross-cutting-platform-requirements.md)
- customer model rules: [06-customer-model-rules.md](./06-customer-model-rules.md)

## Architecture Reference Documents

- canonical data model: [../architecture/001-canonical-enterprise-data-model.md](../architecture/001-canonical-enterprise-data-model.md)
- business object catalogue: [../architecture/002-business-object-catalogue.md](../architecture/002-business-object-catalogue.md)
- enterprise relationship model: [../architecture/003-enterprise-relationship-model.md](../architecture/003-enterprise-relationship-model.md)
- schema relationship appendix: [../architecture/004-schema-relationship-appendix.md](../architecture/004-schema-relationship-appendix.md)
- route relationship appendix: [../architecture/005-route-object-relationship-appendix.md](../architecture/005-route-object-relationship-appendix.md)
- package relationship appendix: [../architecture/006-package-object-relationship-appendix.md](../architecture/006-package-object-relationship-appendix.md)
- architecture remediation backlog: [../architecture/007-architecture-remediation-backlog.md](../architecture/007-architecture-remediation-backlog.md)

## Capability To Implementation Matrix

| PBM capability area | Requirement document | Current workspace families | Current route families | Current package families | Core business objects | Current maturity |
| --- | --- | --- | --- | --- | --- | --- |
| Clients & Commercial | [modules/sales-client-management.md](./modules/sales-client-management.md) | CRM, Sales | `/app/crm/*`, `/app/sales/*` | `parties`, `client-accounts`, `instructions`, `core` | party, person, business, client account, instruction, quote | foundation |
| Project Delivery | [modules/service-delivery-projects.md](./modules/service-delivery-projects.md) | Operations, Activities, Projects | `/app/operations/*`, `/app/activities/*`, `/app/projects/*` | `activities`, `inspections`, `instructions`, `building-surveying`, `workflows` | instruction, project, activity, observation, assessment, action, outcome, deliverable | scaffolded |
| Property & Assets | [modules/property-asset-management.md](./modules/property-asset-management.md) | Property | `/app/property/*`, `/app/properties/*` | `properties`, `core`, `documents` | property, site, building, unit, address, asset, property-party role | foundation |
| Finance & Control | [modules/finance-commercial-control.md](./modules/finance-commercial-control.md) | Finance | `/app/finance/*` | `finance`, `reports`, `core` | fee agreement, WIP item, sales invoice, supplier invoice, payment, project | scaffolded |
| Procurement & Supply | [modules/procurement-supply-chain.md](./modules/procurement-supply-chain.md) | Procurement | `/app/procurement/*` | `core`, `finance`, planned procurement package | supplier, supplier role, purchase order, supplier invoice, supplier compliance record | scaffolded |
| People & Workforce | [modules/workforce-resource-planning.md](./modules/workforce-resource-planning.md) | HR, Resource Planning | `/app/hr/*`, `/app/resource-planning/*` | `core`, `reference-data`, planned workforce package | person, employee, position, competence, allocation, authority limit | scaffolded |
| Quality, Risk & Compliance | [modules/quality-risk-compliance.md](./modules/quality-risk-compliance.md) | Compliance | `/app/compliance/*` | `compliance`, `audit`, `workflows`, `documents` | risk, control, compliance check, complaint, audit event, corrective action | scaffolded |
| Documents, Reporting & Administration | [modules/documents-analytics-integration.md](./modules/documents-analytics-integration.md) | Documents, Reporting, Admin, Dashboard | `/app/documents/*`, `/app/reporting/*`, `/app/admin/*`, `/app/dashboard` | `documents`, `evidence`, `reports`, `reference-data`, `workflows` | document, evidence item, workflow definition, business event, report definition | scaffolded |

## Object Spine Traceability

| Business object | Primary capability areas | Example route doorways | Example package families |
| --- | --- | --- | --- |
| party | Clients & Commercial, People & Workforce, Procurement & Supply | `/app/crm/clients`, `/app/parties`, `/app/procurement/suppliers` | `parties`, `core` |
| client account | Clients & Commercial, Finance & Control | `/app/crm/*`, `/app/finance/*` | `client-accounts`, `finance` |
| instruction | Clients & Commercial, Project Delivery, Finance & Control | `/app/instructions/*`, `/app/operations/instructions`, `/app/activities/*` | `instructions`, `activities`, `finance` |
| property | Property & Assets, Project Delivery | `/app/property/*`, `/app/properties/*`, `/app/operations/*` | `properties`, `building-surveying`, `activities` |
| project | Project Delivery, Finance & Control, Procurement & Supply | `/app/projects/*`, `/app/finance/*`, `/app/procurement/*` | `core`, `finance`, `activities`, planned procurement package |
| activity | Project Delivery, Documents, Reporting & Administration | `/app/activities/*` | `activities`, `inspections`, `evidence` |
| assessment and action | Project Delivery, Quality Risk & Compliance | `/app/activities/*`, `/app/compliance/*` | `activities`, `compliance`, `audit` |
| outcome and deliverable | Project Delivery, Documents, Reporting & Administration, Finance & Control | `/app/activities/*`, `/app/documents/*`, `/app/finance/*` | `activities`, `documents`, `finance`, `reports` |
| supplier invoice | Procurement & Supply, Finance & Control, Project Delivery, Reporting | `/app/procurement/*`, `/app/finance/*`, `/app/projects/*`, `/app/reporting/*` | `finance`, planned procurement package, `reports` |

## Current Gaps And Tensions

### Customer Model Coverage Gaps

- organisation-led and individual-led support is stated in requirements but needs explicit route-level behaviour in every relevant workspace
- finance, property and compliance routes need customer-type handling without splitting the party model
- reporting surfaces need consistent customer classification dimensions across pipeline, delivery, debt and complaints

### Route Coverage Gaps

- delivery routes are broader than some current package names, especially projects and procurement
- property routes are split between `/app/property/*` and `/app/properties/*`, which may need deliberate consolidation
- instruction routes need a separation rule to avoid duplicate ownership narratives
- reporting and dashboard surfaces exist conceptually but need stronger package and data-view definition

### Package Coverage Gaps

- `client-accounts` should be reflected more explicitly in high-level traceability references
- workforce needs a dedicated package family for employee, competence and allocation concerns
- procurement needs a dedicated package family instead of relying only on finance/core structures
- integration and admin concerns are distributed across `core`, `reference-data`, `reports` and `workflows`

### Architecture Watchpoints

- avoid creating route-specific data models that bypass shared business objects
- keep documents and evidence attached to business objects rather than route silos
- keep workflow and audit services reusable across workspaces

## Traceability Maintenance Rule

Any new capability area, route family, package family or business object must update this matrix in the same change that introduces it.
