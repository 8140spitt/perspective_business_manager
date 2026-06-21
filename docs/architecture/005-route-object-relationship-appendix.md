# Route To Business Object Relationship Appendix

## Purpose

This appendix explains how PBM route families expose shared business objects through user activity views.

A route is a doorway into the data spine. It is not the owner of the record it displays.

## Design Rule

Routes are business workspaces and activity views over shared records.

Every route family must be explainable through:

- [001-canonical-enterprise-data-model.md](./001-canonical-enterprise-data-model.md)
- [002-business-object-catalogue.md](./002-business-object-catalogue.md)
- [003-enterprise-relationship-model.md](./003-enterprise-relationship-model.md)
- [004-schema-relationship-appendix.md](./004-schema-relationship-appendix.md)

## Route Mapping Matrix

| Route family | PBM workspace | Primary job | Primary business objects | Common linked objects | Rule |
| --- | --- | --- | --- | --- | --- |
| `/app/business/*` | Business Setup | define the owning business and its structure | business profile, business function, organisation unit, position | reference data, sites, number sequences, authority limits | workspace for business configuration, not trading activity |
| `/app/crm/*` | Clients & Commercial | manage client and relationship context | party, person, organisation, client account | contact method, party relationship, project, instruction, quote, invoice | client context must remain on the shared identity spine |
| `/app/sales/*` | Clients & Commercial | manage early commercial work | enquiry, opportunity, proposal, quotation | party, client account, project, instruction | commercial pipeline must resolve into controlled work |
| `/app/projects/*` | Project Delivery | manage controlled work delivery | project, project service, project assignment | client account, instruction, party, property, quote row, purchase order row, invoice row, risk, issue, evidence | project is a delivery container, not a duplicate client model |
| `/app/operations/*` | Operations & Planning | manage live work and service execution | instruction, activity, work/service order | project, employee, property, deliverable, evidence, outcome | operational work must attach to shared delivery records |
| `/app/activities/*` | Project Delivery / Operations | execute technical or professional activity | activity, activity area, observation, assessment, action, outcome | project, instruction, property, evidence, workflow instance | this is the reusable work-chain view |
| `/app/property/*` and `/app/properties/*` | Assets, Property & Maintenance | manage property and asset context | property, property unit, property role | address, party, project, instruction, activity, document, evidence | asset context must not become a duplicate delivery model |
| `/app/procurement/*` | Procurement, Materials & Logistics | manage supplier and external spend | supplier role, purchase order, purchase order row, supplier invoice | party, project, project service, instruction, finance status | supplier spend must attach to projects/services where possible |
| `/app/finance/*` | Finance & Control | control revenue, cost, billing and payment | fee agreement, sales invoice, supplier invoice, payment, ledger entry, WIP | client account, party, project, instruction, purchase order | finance consumes shared client/project/supplier context |
| `/app/hr/*` | People & Workforce | manage people records and workforce rules | person, employee, employee position, competence, authority limit | organisation unit, position, project assignment, training | workforce data must stay connected to business structure |
| `/app/resource-planning/*` | Operations & Planning | plan capacity and deployment | employee, position, competence, allocation, availability, utilisation | project, activity, instruction, service | planning must use the same people and project records |
| `/app/compliance/*` | Quality & Compliance | manage risk, control, audit and assurance | risk, control, compliance check, complaint, audit event | party, project, instruction, document, evidence, action, outcome | assurance is cross-cutting and attaches to existing records |
| `/app/documents/*` and `/app/evidence/*` | Reporting, Documents & Admin | manage supporting information | document, evidence item, template | party, project, property, instruction, activity, outcome, deliverable | information supports records; it does not own them |
| `/app/reporting/*` and `/app/reports` | Reporting, Documents & Admin | show derived business truth | report definition, metric, export, dashboard | all major business objects | reporting is derived from the spine |
| `/app/admin/*` | Reporting, Documents & Admin | manage platform configuration | user, role, permission, workflow definition, reference data, integration, setting | all governed objects | admin configures behaviour; it is not a business workspace |
| `/app/dashboard` | Cross-workspace summary | show current position | mixed | all relevant objects | shortcut surface only |

## Workspace Notes

### Business Setup

Primary relationship path:

```text
Owning business -> Business function -> Organisation unit -> Position -> Authority rule
```

Business setup defines how the business is structured. Other workspaces consume this structure.

### Clients & Commercial

Primary relationship path:

```text
Party -> Client account -> Opportunity / Quote -> Project / Instruction -> Invoice
```

Commercial routes should not create separate client records. They should use the shared identity and client account model.

### Project Delivery

Primary relationship path:

```text
Client / instruction -> Project -> Service -> Assignment -> Cost / Revenue / Evidence
```

Projects coordinate work. They do not replace client, supplier, property or finance records.

### Operations & Activities

Primary relationship path:

```text
Project or instruction -> Activity -> Observation -> Assessment -> Action -> Outcome
```

Activities are the reusable work-chain. Sector-specific activities should extend this chain rather than create parallel chains.

### Property And Assets

Primary relationship path:

```text
Address -> Property -> Unit / Role -> Project or instruction -> Activity / Evidence
```

Property and asset routes provide context. They should not own project delivery or commercial records.

### Procurement

Primary relationship path:

```text
Supplier party -> Purchase order -> Purchase order row -> Project service -> Supplier invoice
```

Procurement records should attach to project and service context wherever spend is related to delivery.

### Finance

Primary relationship path:

```text
Client account -> Project / instruction -> Sales invoice -> Receipt
Supplier party -> Purchase order -> Supplier invoice -> Payment
```

Finance owns financial control and accounting views. It must not recreate client, project or supplier data.

### People & Workforce

Primary relationship path:

```text
Person -> Employee -> Employee position -> Competence / authority -> Project assignment
```

People routes manage internal capacity and responsibility. They should support project delivery, operations, approvals and compliance.

### Quality & Compliance

Primary relationship path:

```text
Any governed record -> Risk / Control / Check / Audit event / Evidence / Action
```

Compliance is cross-cutting. It attaches governance and assurance to existing business records.

### Documents, Evidence And Reporting

Primary relationship path:

```text
Any supported business object -> Document / Evidence -> Report / Export
```

Information and reporting routes are support surfaces. They must not become alternative ownership models for the records they reference.

## Route Relationship Rules

1. A route must declare its primary business object.
2. A route must declare whether it creates, updates, reviews or reports on that object.
3. Linked data must follow a documented relationship path.
4. Route naming must not imply ownership that contradicts the business object model.
5. Shortcut routes must remain summaries and not become separate record systems.
6. Cross-cutting routes must attach to shared records through stable identifiers.
7. New routes should extend an existing workspace unless a genuinely new workspace activity exists.

## Current Route-Level Tensions

1. `/app/property/*` and `/app/properties/*` overlap and need a deliberate consolidation decision.
2. `/app/instructions/*` and `/app/operations/instructions/*` overlap and need a clear split or merge decision.
3. Procurement and workforce routes are ahead of their package depth and need stronger package support.
4. Documents, evidence, compliance and reporting are cross-cutting and must be checked for duplicate ownership assumptions.
5. Dashboard and shortcut surfaces must stay read-led unless a clear activity workflow is added.

## Design Review Checklist

Before approving a new route or route family, confirm:

1. which business workspace it belongs to
2. which primary business object it surfaces
3. which activity the user performs there
4. which linked objects appear on the screen
5. which relationship path supports the route
6. whether the route respects the shared identity, project and finance spine
7. whether the route belongs inside an existing workspace instead of creating a parallel surface
