# Traceability Matrix

## Purpose

Trace requirements coverage from enterprise modules to current capability areas, routes, package boundaries and core business objects.

## Traceability Rules

1. Every enterprise module should map to one or more requirement documents.
2. Every requirement area should map to one or more routes or planned routes.
3. Every route family should map to one or more domain packages or platform packages.
4. Every package should map back to canonical business objects.
5. B2B and B2C support should be traceable across all customer-facing and commercially relevant modules.
6. Gaps between requirement coverage and implementation surfaces should be made explicit rather than implied.

## Module To Implementation Matrix

| Enterprise module                    | Requirement document                                                                       | Current capability areas                                        | Current route families                                                   | Current package families                                                       | Core objects                                                                          | Current maturity |
| ------------------------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ---------------- |
| Sales and Client Management          | [modules/sales-client-management.md](./modules/sales-client-management.md)                 | sales-client-management                                         | `/app/crm/*`, `/app/sales/*`                                             | `parties`, `instructions`, `core`                                              | party, person, organisation, client_account, instruction                              | foundation       |
| Service Delivery and Projects        | [modules/service-delivery-projects.md](./modules/service-delivery-projects.md)             | operations-service-delivery, projects-portfolio                 | `/app/operations/*`, `/app/activities/*`, `/app/projects/*`              | `activities`, `inspections`, `instructions`, `building-surveying`, `workflows` | instruction, project, activity, observation, assessment, action, outcome, deliverable | scaffolded       |
| Property and Asset Management        | [modules/property-asset-management.md](./modules/property-asset-management.md)             | property-technical-asset                                        | `/app/property/*`, `/app/properties/*`                                   | `properties`, `core`, `documents`                                              | property, property_unit, address, building_element, property_party_role               | foundation       |
| Finance and Commercial Control       | [modules/finance-commercial-control.md](./modules/finance-commercial-control.md)           | finance-capital                                                 | `/app/finance/*`                                                         | `finance`, `reports`, `core`                                                   | fee_agreement, wip_item, sales_invoice, payment, instruction, project                 | scaffolded       |
| Procurement and Supply Chain         | [modules/procurement-supply-chain.md](./modules/procurement-supply-chain.md)               | supply-chain-procurement                                        | `/app/procurement/*`                                                     | `core`, `finance`                                                              | supplier, supplier_party_role, purchase_order                                         | scaffolded       |
| Workforce and Resource Planning      | [modules/workforce-resource-planning.md](./modules/workforce-resource-planning.md)         | people-workforce                                                | `/app/hr/*`, `/app/resource-planning/*`                                  | `core`, `reference-data`                                                       | person, employee, role, competency, allocation                                        | scaffolded       |
| Quality, Risk and Compliance         | [modules/quality-risk-compliance.md](./modules/quality-risk-compliance.md)                 | governance-risk-compliance                                      | `/app/compliance/*`                                                      | `compliance`, `audit`, `workflows`, `documents`                                | risk, control, compliance_check, complaint, audit_event, action                       | scaffolded       |
| Documents, Analytics and Integration | [modules/documents-analytics-integration.md](./modules/documents-analytics-integration.md) | knowledge-records, information-data-digital, strategy-direction | `/app/documents/*`, `/app/reporting/*`, `/app/admin/*`, `/app/dashboard` | `documents`, `evidence`, `reports`, `reference-data`, `workflows`              | document, evidence_item, workflow_definition, business_event, report_definition       | scaffolded       |

## Object Spine Traceability

| Canonical object        | Primary modules                                                                                     | Example routes                                                             | Example packages                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------ |
| party                   | Sales and Client Management, Workforce and Resource Planning, Procurement and Supply Chain          | `/app/crm/clients`, `/app/parties`, `/app/procurement/suppliers`           | `parties`, `core`                                |
| client_account          | Sales and Client Management, Finance and Commercial Control                                         | `/app/crm/*`, `/app/finance/*`                                             | `core`, `finance`                                |
| instruction             | Sales and Client Management, Service Delivery and Projects, Finance and Commercial Control          | `/app/instructions/*`, `/app/operations/instructions`, `/app/activities/*` | `instructions`, `activities`, `finance`          |
| property                | Property and Asset Management, Service Delivery and Projects                                        | `/app/property/*`, `/app/properties/*`, `/app/operations/*`                | `properties`, `building-surveying`, `activities` |
| project                 | Service Delivery and Projects, Finance and Commercial Control                                       | `/app/projects/*`                                                          | `core`, `finance`, `activities`                  |
| activity                | Service Delivery and Projects, Documents, Analytics and Integration                                 | `/app/activities/*`                                                        | `activities`, `inspections`, `evidence`          |
| assessment and action   | Service Delivery and Projects, Quality, Risk and Compliance                                         | `/app/activities/*`, `/app/compliance/*`                                   | `activities`, `compliance`, `audit`              |
| outcome and deliverable | Service Delivery and Projects, Documents, Analytics and Integration, Finance and Commercial Control | `/app/activities/*`, `/app/documents/*`, `/app/finance/*`                  | `activities`, `documents`, `finance`, `reports`  |

## Current Gaps And Tensions

### Customer Model Coverage Gaps

- B2B and B2C support is now stated in requirements but is not yet explicitly traced to route-level behavior in every module
- finance, property and compliance routes will need explicit customer-type handling without splitting the party model
- reporting surfaces will need consistent customer classification dimensions across pipeline, delivery, debt and complaints

### Route Coverage Gaps

- delivery routes are broader than the current domain package names in some areas, especially for projects and procurement
- property routes are split between `/app/property/*` and `/app/properties/*`, which may need deliberate consolidation
- reporting and dashboard surfaces exist in the capability map but are less explicit in package segmentation

### Package Coverage Gaps

- there is no dedicated workforce package family yet for employee, competency and allocation concerns
- procurement currently appears route-led more than package-led
- integration and admin concerns are distributed across `core`, `reference-data`, `reports` and `workflows`

### Architecture Watchpoints

- avoid creating route-specific data models that bypass canonical business objects
- keep documents and evidence attached to business objects rather than route silos
- keep workflow and audit services reusable across modules

## Traceability Maintenance Rule

Any new module, route family, package family or core object must update this matrix in the same change that introduces it.
