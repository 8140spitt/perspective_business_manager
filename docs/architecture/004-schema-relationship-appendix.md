# Schema Relationship Appendix

## Purpose

This appendix connects PBM's business object model to the current database schema.

It is intentionally written in PBM language. The schema exists to support shared business records, not isolated route or workspace data stores.

## How To Read This Document

PBM has three levels of language:

1. **Business object** — the thing the business understands, such as client, project, employee, supplier invoice or document.
2. **Schema table** — the current table or group of tables that stores the record.
3. **Workspace activity** — the user-facing job that reads or changes the record.

A table is not owned by a workspace. A table supports one or more business objects, and those objects are surfaced through whichever workspace needs them.

## Current Schema Sources

This appendix reflects the current migration structure:

- `001_core.sql`
- `002_core_business_objects.sql`
- `003_workflow_and_events.sql`
- `004_activity_management_engine.sql`

When schema names change, this appendix must be updated in the same change.

## Foundation Identity Relationships

### Business Party Structure

| PBM business object | Current schema table | Relationship | Meaning |
| --- | --- | --- | --- |
| Party / stakeholder | `party` | root record | shared identity root for people and organisations |
| Person | `person` | `person.party_id -> party.party_id` | one party may specialise as a person |
| Organisation | `organisation` | `organisation.party_id -> party.party_id` | one party may specialise as an organisation |
| Contact method | `contact_method` | `contact_method.party_id -> party.party_id` | communication details attached to the shared identity record |
| Address | `address` and `party_address` | `party_address.party_id -> party.party_id`, `party_address.address_id -> address.address_id` | addresses are reusable and should not be duplicated per workspace |

### Relationship Rule

People and organisations must remain on the same shared identity spine. PBM must not create separate client, supplier, employee or contact identity tables when a role on the shared identity model is enough.

## Relationship Records

| PBM business object | Current schema table | Relationship | Meaning |
| --- | --- | --- | --- |
| Party relationship | `party_relationship` | `from_party_id` and `to_party_id` both reference `party.party_id` | directional connection between two parties |
| Property role | `property_party_role` | links `property` and `party` | ownership, occupation, management or other property-related role |
| Instruction role | `instruction_party_role` | links `instruction` and `party` | role a party plays on an instruction |

Relationship tables are important because they let one real-world person or organisation play different roles without duplicating the source record.

## Property And Asset Context

| PBM business object | Current schema table | Relationship | Meaning |
| --- | --- | --- | --- |
| Property | `property` | `property.address_id -> address.address_id` | location or asset context for work |
| Property unit | `property_unit` | `property_unit.property_id -> property.property_id` | subdivision of a property |
| Property role | `property_party_role` | links `property` and `party` | party involvement with a property |

Property records provide asset context. They must not become a separate delivery model. Work is still controlled through instructions, projects, activities and services.

## Client And Commercial Spine

| PBM business object | Current schema table | Relationship | Meaning |
| --- | --- | --- | --- |
| Client account | `client_account` | `client_account.party_id -> party.party_id` | commercial account for a party |
| Instruction | `instruction` | `instruction.client_account_id -> client_account.client_account_id` | accepted or controlled work request |
| Instruction party role | `instruction_party_role` | links `instruction` and `party` | billing, contact, customer, intermediary or other role |
| Instruction property | `instruction_property` | links `instruction` and `property` | subject property or property context |

Current implementation note: `client_account` is currently one-to-one with `party`. If PBM later needs multiple commercial accounts for one party, this must be changed deliberately.

## Project And Delivery Relationships

| PBM business object | Current schema table | Relationship | Meaning |
| --- | --- | --- | --- |
| Project | `project` | root delivery coordination record | controlled body of work |
| Project instruction link | `project_instruction` | links `project` and `instruction` | connects project delivery back to instructed work |
| Deliverable | `deliverable` | `deliverable.project_id -> project.project_id` | output or agreed result of work |
| Activity | `activity` | may link to `instruction`, `project`, `property` and lead `party` | unit of work or technical activity |

Projects organise delivery. They do not replace the client, instruction or property root.

## Activity Chain Relationships

PBM's technical work chain is:

```text
Activity
  -> Activity Area
    -> Observation
      -> Assessment
        -> Action
          -> Outcome
            -> Outcome Revision
```

| PBM business object | Current schema table | Relationship | Meaning |
| --- | --- | --- | --- |
| Activity area | `activity_area` | `activity_area.activity_id -> activity.activity_id` | internal structure of an activity |
| Observation | `observation` | `observation.activity_id -> activity.activity_id` | finding or recorded fact |
| Assessment | `assessment` | `assessment.observation_id -> observation.observation_id` | evaluation of the finding |
| Action | `action` | `action.assessment_id -> assessment.assessment_id` | response to the assessment |
| Outcome | `outcome` | may link to `activity`, `action` or `deliverable` | result, conclusion or output |
| Outcome revision | `outcome_revision` | `outcome_revision.outcome_id -> outcome.outcome_id` | revision and approval history |

This chain must remain reusable across service types. Sector-specific packages can extend it, but should not fork it.

## Evidence And Information Relationships

| PBM business object | Current schema table | Relationship | Meaning |
| --- | --- | --- | --- |
| Evidence item | `evidence_item` | may link to activity, area, observation, assessment, action or outcome | material supporting a record |
| Capturing party | `party` | `evidence_item.captured_by_party_id -> party.party_id` | who captured or authored the evidence |
| Document | planned document tables | planned | controlled business record, template, file or formal output |

Evidence is attached to business records. It should not become the ownership point for the work, client, property or project.

## Financial Relationships

| PBM business object | Current schema table | Relationship | Meaning |
| --- | --- | --- | --- |
| Fee agreement | `fee_agreement` | `fee_agreement.instruction_id -> instruction.instruction_id` | commercial basis for work |
| Sales invoice | `sales_invoice` | may link to `client_account`, `instruction` and `project` | money requested from the client |
| Payment / receipt | planned | planned | money received or paid |
| Ledger entry | planned | planned | formal accounting record |
| WIP item | planned | planned | work in progress value |

Finance must consume the shared client, instruction and project context. It must not create a duplicate commercial or delivery model.

## Workflow And Event Relationships

| PBM business object | Current schema table | Relationship | Meaning |
| --- | --- | --- | --- |
| Workflow definition | `workflow_definition` | root workflow template | reusable lifecycle definition |
| Workflow state | `workflow_state` | belongs to workflow definition | allowed state |
| Workflow transition | `workflow_transition` | links from/to workflow states | allowed movement |
| Workflow instance | `workflow_instance` | polymorphic binding through `entity_type_code` and `entity_id` | workflow attached to a business record |
| Workflow instance state | `workflow_instance_state` | state history for workflow instance | progression record |
| Business event | `business_event` | polymorphic binding through `entity_type_code` and `entity_id` | append-only business history |

Current implementation note: polymorphic bindings mean database-level referential integrity cannot fully validate every target object. The application layer must enforce the supported entity types and record existence.

## Current Relationship Caveats

1. `client_account` is currently one-to-one with `party`.
2. `deliverable` currently requires a project, so direct instruction-only deliverables are not fully supported.
3. `workflow_instance` and `business_event` use polymorphic entity references.
4. Document tables are planned and not yet fully materialised.
5. Payments, WIP, credit notes and ledger entries remain planned finance extensions.
6. Procurement and workforce relationships need deeper schema support as those workspaces mature.

## Schema Change Review Rules

Before approving a schema change, confirm:

1. which PBM business object the table supports
2. whether the relationship already exists in this appendix
3. whether the cardinality is explicit
4. whether foreign keys and uniqueness constraints are deliberate
5. whether the change preserves the shared identity and client model
6. whether the change avoids route-specific duplicate data ownership
7. whether related product, architecture and requirement docs need to be updated in the same change
