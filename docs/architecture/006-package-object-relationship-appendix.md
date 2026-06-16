# Package To Object Relationship Appendix

## Purpose

Map package boundaries in `src/lib/packages` to canonical business objects, relationship chains and route families.

This appendix explains what each package family should own, what it should not own, and how packages should align to the enterprise object model.

## Design Rule

Packages are implementation boundaries over shared enterprise objects.

They are not permission to create parallel object models or route-specific data ownership.

Every package should be explainable through:

- [001-canonical-enterprise-data-model.md](./001-canonical-enterprise-data-model.md)
- [003-enterprise-relationship-model.md](./003-enterprise-relationship-model.md)
- [004-schema-relationship-appendix.md](./004-schema-relationship-appendix.md)
- [005-route-object-relationship-appendix.md](./005-route-object-relationship-appendix.md)

## Package Mapping Matrix

| Package family       | Primary purpose                                      | Primary objects                                                             | Common linked objects                                            | Main route families                                                     | Boundary note                               |
| -------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------- |
| `activities`         | delivery work execution chain                        | activity, observation, assessment, action, outcome                          | instruction, project, property, evidence_item, workflow_instance | `/app/activities/*`, `/app/operations/*`                                | core technical work chain                   |
| `audit`              | immutable assurance and review support               | audit_event, business_event                                                 | workflow_instance, party, complaint, action                      | `/app/compliance/*`                                                     | cross-cutting governance support            |
| `building-surveying` | sector-specific delivery extensions                  | instruction, property, inspection, defect, outcome                          | evidence_item, deliverable, party                                | `/app/operations/building-surveys`, related operations routes           | industry package over core objects          |
| `client-accounts`    | commercial customer relationship layer               | client_account                                                              | party, instruction, sales_invoice                                | `/app/crm/*`, `/app/finance/*`                                          | shared customer-account service layer       |
| `compliance`         | governance, complaints and risk                      | compliance_check, complaint, risk, control                                  | instruction, party, outcome, document, action                    | `/app/compliance/*`                                                     | cross-cutting control package               |
| `core`               | shared core primitives and reusable business support | party, organisation, person, address, shared helpers                        | most enterprise objects                                          | many route families                                                     | should stay generic and reusable            |
| `documents`          | controlled record support                            | document, document_revision, template                                       | party, property, instruction, activity, outcome, deliverable     | `/app/documents/*`                                                      | attached record layer                       |
| `evidence`           | supporting material capture                          | evidence_item                                                               | activity, observation, assessment, action, outcome, party        | `/app/documents/evidence-library`, `/app/evidence`, `/app/operations/*` | evidence is attached, not root-owned        |
| `finance`            | commercial control and billing                       | fee_agreement, sales_invoice, payment, WIP, expense                         | client_account, instruction, project                             | `/app/finance/*`                                                        | downstream of customer and delivery context |
| `inspections`        | inspection-oriented delivery support                 | inspection, activity, evidence, defect                                      | property, instruction, party, outcome                            | `/app/operations/*`, `/app/surveys`                                     | specialised activity support                |
| `instructions`       | operational instruction workspace logic              | instruction, instruction_party_role, instruction_property                   | client_account, property, party, project, fee_agreement          | `/app/instructions/*`, `/app/operations/instructions/*`                 | instruction-centric orchestration package   |
| `parties`            | shared party and relationship services               | party, person, organisation, party_relationship, contact_method             | client_account, property_party_role, instruction_party_role      | `/app/parties/*`, `/app/crm/*`, `/app/procurement/*`                    | root identity package for B2B and B2C       |
| `properties`         | asset and property context                           | property, property_unit, property_party_role                                | address, instruction_property, activity                          | `/app/property/*`, `/app/properties/*`                                  | shared asset context package                |
| `reference-data`     | controlled code sets and classification              | ref_code_set, ref_code_value                                                | all business objects through codes                               | `/app/admin/reference-data`                                             | metadata governance layer                   |
| `reports`            | reporting definitions and projections                | report_definition, aggregates, exports                                      | all major business objects                                       | `/app/reporting/*`, `/app/reports`                                      | derived analytical layer                    |
| `workflows`          | lifecycle metadata and runtime                       | workflow_definition, workflow_state, workflow_transition, workflow_instance | business_event, instruction, project, activity, invoice          | `/app/admin/workflows`, cross-cutting                                   | shared lifecycle engine                     |

## Package Family Notes

### Parties And Client Accounts

The `parties` and `client-accounts` packages together express the shared customer model:

```text
Party -> Person/Organisation -> Client Account -> Instruction
```

Rules:

- `parties` should own root identity behavior and relationships
- `client-accounts` should own commercial account behavior
- neither package should split B2B and B2C into separate data structures

### Instructions, Activities And Industry Packages

The delivery chain should flow through:

```text
Instruction -> Activity -> Observation -> Assessment -> Action -> Outcome
```

Rules:

- `instructions` owns instruction-centric orchestration
- `activities` owns the technical work chain
- industry packages such as `building-surveying` and `inspections` should extend, not replace, that chain

### Properties And Evidence

Property and evidence packages should remain attached to the core delivery chain:

```text
Property -> Instruction Property -> Activity -> Evidence
```

Rules:

- `properties` owns asset context and relationships
- `evidence` owns supporting material behavior
- neither package should become a duplicate instruction or activity engine

### Finance And Compliance

Finance and compliance packages are cross-cutting but still rooted in shared objects:

```text
Client Account -> Instruction -> Fee Agreement / Invoice
Instruction / Outcome / Document -> Compliance / Audit
```

Rules:

- `finance` must consume customer and instruction context rather than recreate it
- `compliance` and `audit` must attach controls and history to existing objects

### Workflows And Reports

These are platform packages rather than business-domain owners:

- `workflows` should manage lifecycle metadata and runtime state
- `reports` should derive projections from business objects
- `reference-data` should manage the codes that govern state, type and classification behavior

## Expected Package Responsibilities

### Root Identity Packages

- `parties`
- `client-accounts`
- `reference-data`

These should provide reusable services used by many route families.

### Delivery Spine Packages

- `instructions`
- `activities`
- `properties`
- `finance`

These should carry the end-to-end commercial and operational chain.

### Extension Packages

- `building-surveying`
- `inspections`
- `compliance`
- `audit`

These should enrich or govern the shared model rather than fork it.

### Platform Packages

- `documents`
- `evidence`
- `reports`
- `workflows`
- `core`

These should remain reusable across modules.

## Current Package-Level Tensions

1. `client-accounts` now exists as a package family but is not yet fully reflected in all higher-level matrices and route narratives.
2. procurement appears more route-led than package-led; a dedicated supplier or procurement package may need to deepen over time.
3. workforce concerns are still thin at package level compared to route coverage under HR and resource planning.
4. industry packages and core delivery packages must be kept separate so sector extensions do not become duplicate core logic.
5. `core` can easily become a dumping ground unless its responsibilities stay constrained to truly shared concerns.

## Package Relationship Rules

1. A package should declare its primary business objects clearly.
2. If a package mostly coordinates other objects, it should remain orchestration-focused and avoid re-owning root entities.
3. If a package is cross-cutting, it should attach through shared identifiers and relationship paths already defined in the canonical model.
4. Package APIs must preserve the shared B2B/B2C customer model.
5. New packages should be added only when a meaningful business or platform boundary exists.

## Use In Design Reviews

Before creating or expanding a package, confirm:

1. which canonical objects the package primarily serves
2. whether an existing package already owns that object boundary
3. which route families will depend on it
4. whether it extends the shared model or risks duplicating it
5. whether B2B and B2C behavior remains on the shared party and client-account model
