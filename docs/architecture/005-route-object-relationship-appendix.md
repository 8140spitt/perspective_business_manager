# Route To Object Relationship Appendix

## Purpose

Map the application route structure to the canonical business objects and relationship model.

This appendix explains which enterprise objects each route family is primarily concerned with and how those routes should be interpreted in relation to the shared architecture.

## Design Rule

Routes are workspaces, not owners of data.

Every route family should be explainable as a view over canonical business objects already defined in:

- [001-canonical-enterprise-data-model.md](./001-canonical-enterprise-data-model.md)
- [003-enterprise-relationship-model.md](./003-enterprise-relationship-model.md)
- [004-schema-relationship-appendix.md](./004-schema-relationship-appendix.md)

## Route Mapping Matrix

| Route family                                                                             | Primary purpose                              | Primary objects                                                           | Common linked objects                                                                        | Relationship notes                                      |
| ---------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `/app/crm/*`                                                                             | customer and client workspace                | party, person, organisation, client_account                               | contact_method, party_relationship, property, instruction                                    | customer root for both B2B and B2C journeys             |
| `/app/sales/*`                                                                           | pre-instruction commercial pipeline          | enquiry, opportunity, fee_proposal, quotation                             | party, client_account, property, instruction                                                 | commercial funnel before instruction acceptance         |
| `/app/operations/*`                                                                      | live instruction delivery                    | instruction                                                               | instruction_party_role, instruction_property, activity, evidence, deliverable, fee_agreement | primary operations control layer                        |
| `/app/activities/*`                                                                      | unit-of-work execution                       | activity, observation, assessment, action, outcome                        | instruction, project, property, evidence_item, workflow_instance                             | technical finding chain workspace                       |
| `/app/projects/*`                                                                        | managed delivery and governance              | project                                                                   | instruction, activity, deliverable, task, risk, issue, sales_invoice                         | project coordination over instructions and outputs      |
| `/app/property/*`                                                                        | structured asset and register views          | property, property_unit, property_party_role                              | address, instruction, activity, document, evidence                                           | portfolio and technical asset context                   |
| `/app/properties/*`                                                                      | direct property records                      | property                                                                  | address, property_party_role, instruction_property                                           | direct record-oriented property surface                 |
| `/app/finance/*`                                                                         | commercial control and billing               | fee_agreement, sales_invoice                                              | client_account, instruction, project, payment, expense, WIP                                  | financial state over shared customer and delivery model |
| `/app/procurement/*`                                                                     | suppliers and external buying                | supplier, purchase_order                                                  | party, project, instruction, purchase_invoice                                                | supplier and external cost control                      |
| `/app/hr/*`                                                                              | people administration                        | person, employee, role, competency                                        | team, allocation, training                                                                   | internal workforce master data                          |
| `/app/resource-planning/*`                                                               | capacity and deployment                      | allocation, availability, utilisation                                     | employee, competency, activity, project, instruction                                         | scheduling and delivery capacity                        |
| `/app/compliance/*`                                                                      | governance and assurance                     | compliance_check, complaint, risk, control, audit_event                   | party, instruction, outcome, document, action                                                | cross-cutting assurance over the operational chain      |
| `/app/documents/*`                                                                       | record and evidence access                   | document, evidence_item, template                                         | party, property, instruction, activity, outcome, deliverable                                 | attached record layer, not source-of-truth layer        |
| `/app/reporting/*`                                                                       | analytical and exported views                | report_definition, aggregated metrics                                     | all major business objects                                                                   | derived analytical layer                                |
| `/app/admin/*`                                                                           | configuration and platform controls          | user, role, permission, workflow_definition, ref_code_set, ref_code_value | integrations, numbering, teams                                                               | platform control layer                                  |
| `/app/dashboard`, `/app/reports`, `/app/workflows`, `/app/evidence`, `/app/instructions` | cross-cutting summary or shortcut workspaces | mixed                                                                     | mixed                                                                                        | convenience and aggregate surfaces over shared objects  |

## Route Family Notes

### CRM

Relevant routes include:

- `/app/crm/dashboard`
- `/app/crm/clients/*`

Primary relationship path:

```text
Party -> Client Account -> Instruction -> Project/Activity -> Invoice
```

CRM routes should not invent separate customer data models for organisation and consumer journeys.

### Sales

Relevant routes include:

- `/app/sales/enquiries/*`
- `/app/sales/opportunities/*`
- `/app/sales/fee-proposals`
- `/app/sales/quotations`
- `/app/sales/tenders`

Primary relationship path:

```text
Party -> Opportunity -> Proposal/Quotation -> Client Account -> Instruction
```

Sales routes prepare commercial context that should ultimately resolve into the canonical instruction chain.

### Operations

Relevant routes include:

- `/app/operations/instructions/*`
- `/app/operations/building-surveys`
- `/app/operations/schedules-of-condition`
- `/app/operations/dilapidations`

Primary relationship path:

```text
Client Account -> Instruction -> Instruction Party Role / Instruction Property -> Activity / Deliverable / Fee Agreement
```

Operations routes are instruction-centric and should resolve all delivery context from the shared instruction model.

### Activities

Relevant routes include:

- `/app/activities`
- `/app/activities/new`
- `/app/activities/[activityId]`

Primary relationship path:

```text
Instruction or Project -> Activity -> Observation -> Assessment -> Action -> Outcome
```

This route family is the clearest expression of the technical work chain.

### Projects

Relevant routes include:

- `/app/projects/projects/*`
- `/app/projects/dashboard`

Primary relationship path:

```text
Instruction -> Project -> Activity / Deliverable / Financials
```

Projects organise work; they do not replace the instruction or customer root.

### Property

Relevant routes include:

- `/app/property/*`
- `/app/properties/*`

Primary relationship path:

```text
Address -> Property -> Property Unit / Property Party Role -> Instruction Property -> Activity
```

Property routes should expose asset context without becoming a duplicate delivery model.

### Finance

Relevant routes include:

- `/app/finance/fees`
- `/app/finance/wip`
- `/app/finance/sales-invoices`
- `/app/finance/payments`

Primary relationship path:

```text
Client Account -> Instruction -> Fee Agreement -> Sales Invoice
Project -> Sales Invoice
```

Finance routes remain downstream of customer, instruction and project context.

### Procurement

Relevant routes include:

- `/app/procurement/suppliers/*`
- `/app/procurement/purchase-orders`

Primary relationship path:

```text
Party/Supplier -> Purchase Order -> Project / Instruction / External Cost
```

Procurement should attach suppliers and external buying into the shared delivery and finance chain.

### Workforce And Resource Planning

Relevant routes include:

- `/app/hr/*`
- `/app/resource-planning/*`

Primary relationship path:

```text
Person/Employee -> Competency -> Allocation -> Activity / Project / Instruction
```

These routes manage internal delivery capacity rather than customer objects directly.

### Compliance

Relevant routes include:

- `/app/compliance/conflicts-of-interest`
- `/app/compliance/complaints`
- `/app/compliance/pi-risk`
- `/app/compliance/audit-trail`

Primary relationship path:

```text
Party / Instruction / Outcome / Document -> Compliance Check / Complaint / Audit Event / Action
```

Compliance routes are cross-cutting and may attach into many parts of the business chain.

### Documents And Evidence

Relevant routes include:

- `/app/documents/document-library`
- `/app/documents/evidence-library`
- `/app/evidence`

Primary relationship path:

```text
Any supported business object -> Document or Evidence Item
```

These routes should never become the ownership point for the business objects they reference.

### Reporting And Admin

Relevant routes include:

- `/app/reporting/*`
- `/app/admin/*`

Primary relationship path:

```text
All core objects -> reporting aggregates
Reference data / workflow / permissions -> admin configuration
```

Reporting is derived; admin configures the platform metadata that governs object behavior.

## Route Relationship Rules

1. A route should identify its primary business object.
2. If a route shows linked data, those relationships should already exist in the canonical model or schema appendix.
3. If a route needs a new concept, first decide whether it is a root entity, a role, a relationship, a workflow state or a document attachment.
4. Route families must preserve the shared B2B/B2C customer model.
5. Route naming should not imply data ownership that contradicts the canonical object model.

## Current Route-Level Tensions

1. `/app/property/*` and `/app/properties/*` overlap and may need a deliberate consolidation strategy.
2. `/app/instructions/*` and `/app/operations/instructions/*` both exist, so their intended distinction should remain explicit.
3. several route families expose planned capability earlier than their backing package boundaries currently suggest.
4. reporting, documents and compliance routes are necessarily cross-cutting and should be checked carefully to avoid route-specific duplicate data models.

## Use In Design Reviews

Before approving a new route or route family, confirm:

1. which primary object the route is centered on
2. which linked objects are being shown or edited
3. which relationship path supports the route behavior
4. whether the route respects the shared customer model
5. whether the route belongs in an existing workspace instead of creating a new parallel surface
