# Package To Business Object Relationship Appendix

## Purpose

This appendix explains how implementation packages in `src/lib/packages` should support PBM business objects, workspaces and route activity views.

Packages are not product modules. They are implementation boundaries that protect the shared data spine from duplication.

## Design Rule

A package may own implementation behaviour, but it must not invent a second version of a business object that already exists elsewhere.

Every package should be explainable through:

- [001-canonical-enterprise-data-model.md](./001-canonical-enterprise-data-model.md)
- [002-business-object-catalogue.md](./002-business-object-catalogue.md)
- [003-enterprise-relationship-model.md](./003-enterprise-relationship-model.md)
- [004-schema-relationship-appendix.md](./004-schema-relationship-appendix.md)
- [005-route-object-relationship-appendix.md](./005-route-object-relationship-appendix.md)

## Package Mapping Matrix

| Package family | Implementation purpose | Primary business objects | Common linked objects | Main route families | Boundary rule |
| --- | --- | --- | --- | --- | --- |
| `core` | shared primitives and technical helpers | shared identifiers, result types, common utilities | most objects | many route families | must stay generic and not become a dumping ground |
| `parties` | shared identity and relationship behaviour | party, person, organisation, relationship, contact method | client account, supplier role, employee, property role | `/app/crm/*`, `/app/procurement/*`, `/app/hr/*` | owns identity behaviour, not workspace-specific client/supplier/employee rules |
| `client-accounts` | commercial account behaviour | client account | party, instruction, project, sales invoice | `/app/crm/*`, `/app/finance/*` | bridges identity and commercial control |
| `business-setup` | owning business structure and operating model | business profile, business function, organisation unit, position | employee position, authority limit, reference data | `/app/business/*`, `/app/admin/*` | defines structure used by all other workspaces |
| `people` / `hr` | workforce administration | person, employee, employee position, competence, authority limit | project assignment, training, organisation unit, position | `/app/hr/*`, `/app/resource-planning/*` | must use shared person and position records |
| `projects` | project delivery coordination | project, project service, assignment, milestone, issue, project cost | client account, party, purchase order row, quote row, invoice row, evidence | `/app/projects/*` | owns project coordination, not client identity or finance ownership |
| `activities` | reusable work-chain behaviour | activity, activity area, observation, assessment, action, outcome | project, instruction, property, evidence, workflow instance | `/app/activities/*`, `/app/operations/*` | owns the work-chain used by many service types |
| `operations` | live work planning and execution | instruction, work/service order, schedule, allocation | project, activity, employee, property, evidence | `/app/operations/*`, `/app/resource-planning/*` | coordinates work without duplicating projects or activities |
| `properties` | property and asset context | property, property unit, property role | address, party, project, activity, evidence | `/app/property/*`, `/app/properties/*` | owns asset context, not delivery ownership |
| `procurement` | supplier and external buying behaviour | supplier role, purchase order, purchase order row, supplier invoice | party, project, project service, finance status | `/app/procurement/*` | must attach spend to delivery and finance context |
| `finance` | financial control behaviour | fee agreement, sales invoice, supplier invoice, payment, ledger entry, WIP | client account, party, project, instruction, purchase order | `/app/finance/*` | owns financial state, not client/project identity |
| `compliance` | governance, risk and assurance | risk, control, compliance check, complaint, action | party, project, instruction, document, evidence, outcome | `/app/compliance/*` | cross-cutting attachment to governed records |
| `audit` | event and assurance history | audit event, business event | workflow instance, party, action, complaint, controlled record | `/app/compliance/*`, `/app/admin/*` | append-only history and review support |
| `documents` | controlled document behaviour | document, document revision, template | party, project, property, instruction, activity, outcome | `/app/documents/*` | attached information layer |
| `evidence` | supporting material capture | evidence item | activity, observation, assessment, action, outcome, party | `/app/evidence/*`, `/app/documents/*`, `/app/operations/*` | evidence supports records; it does not own them |
| `reports` | analytical and export behaviour | report definition, metric, export | all major business objects | `/app/reporting/*`, `/app/reports` | derived read model over the data spine |
| `workflows` | lifecycle metadata and runtime state | workflow definition, state, transition, instance | business event, project, activity, invoice, document | `/app/admin/workflows`, cross-cutting | shared lifecycle engine |
| `reference-data` | controlled lists and classifications | reference code set, reference code value | all typed/stateful objects | `/app/admin/reference-data` | governs meaning, status and classification |

## Package Family Notes

### Identity And Commercial Account Packages

```text
Party -> Person / Organisation -> Role or Account -> Workspace activity
```

Rules:

- `parties` owns root identity behaviour.
- `client-accounts` owns commercial account behaviour.
- supplier, employee, contact and client views must not create separate identity roots.

### Business Setup And Workforce Packages

```text
Business function -> Organisation unit -> Position -> Employee position -> Authority / competence
```

Rules:

- business structure packages define the operating model.
- workforce packages consume that structure.
- approval, authority and competence should attach to positions and people deliberately.

### Delivery Packages

```text
Project / instruction -> Activity -> Observation -> Assessment -> Action -> Outcome
```

Rules:

- `projects` owns delivery coordination.
- `activities` owns the reusable work-chain.
- `operations` owns live planning and execution flow.
- service-specific packages may extend the chain but must not fork it.

### Property, Document And Evidence Packages

```text
Property / project / activity -> Document / Evidence
```

Rules:

- property provides asset context.
- documents and evidence support business records.
- none of these packages should become duplicate workflow, project or activity engines.

### Procurement And Finance Packages

```text
Supplier party -> Purchase order -> Supplier invoice -> Payment
Client account -> Project / instruction -> Sales invoice -> Receipt
```

Rules:

- procurement owns supplier buying behaviour.
- finance owns financial control behaviour.
- both must attach to the shared party, project and service records.

### Governance And Reporting Packages

```text
Any governed object -> Risk / Control / Event / Evidence -> Report
```

Rules:

- compliance and audit are cross-cutting packages.
- reports are derived views and must not become source-of-truth objects.
- workflows provide lifecycle behaviour for many object types.

## Expected Package Groups

### Foundation Packages

- `core`
- `parties`
- `business-setup`
- `reference-data`
- `workflows`

### Delivery Spine Packages

- `client-accounts`
- `projects`
- `operations`
- `activities`
- `properties`

### Commercial And Control Packages

- `procurement`
- `finance`
- `compliance`
- `audit`

### Information Packages

- `documents`
- `evidence`
- `reports`

## Current Package-Level Tensions

1. Procurement appears more route-led than package-led and needs deeper package support.
2. Workforce concerns are still thin at package level compared with workspace coverage.
3. `core` can become a dumping ground unless it stays constrained.
4. Property route/package naming still needs consolidation.
5. Cross-cutting packages must avoid owning the records they attach to.
6. Sector-specific packages must extend shared work-chain behaviour rather than create parallel engines.

## Package Relationship Rules

1. A package must declare the business objects it primarily supports.
2. A package must declare whether it owns behaviour, orchestration, reporting or configuration.
3. A package must not create a second identity, client, supplier, employee, project or invoice model.
4. Cross-cutting packages must attach through documented relationship paths.
5. New packages should only be added for a real business or platform boundary.
6. Route convenience must not drive package boundaries by itself.

## Design Review Checklist

Before creating or expanding a package, confirm:

1. which PBM business object the package serves
2. whether an existing package already supports that boundary
3. which route families depend on it
4. whether it owns records, orchestrates records or reports on records
5. whether it extends the shared model or risks duplicating it
6. whether it preserves the shared identity, project, finance and evidence spine
