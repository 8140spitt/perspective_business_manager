# Schema Relationship Appendix

## Purpose

Map the conceptual relationship model to the current database schema, with concrete table names, foreign keys, uniqueness rules and important implementation notes.

This appendix should be read together with [003-enterprise-relationship-model.md](./003-enterprise-relationship-model.md).

## Scope

This appendix covers the current schema represented in:

- `001_core.sql`
- `002_core_business_objects.sql`
- `003_workflow_and_events.sql`
- `004_activity_management_engine.sql`

## Foundation Schema Relationships

### Party Specialisation

| Parent table | Child table    | Key                                       | Constraint          | Notes                                        |
| ------------ | -------------- | ----------------------------------------- | ------------------- | -------------------------------------------- |
| `party`      | `person`       | `person.party_id -> party.party_id`       | foreign key, unique | one party may specialise as one person       |
| `party`      | `organisation` | `organisation.party_id -> party.party_id` | foreign key, unique | one party may specialise as one organisation |

### Party Communication And Addressing

| Parent table | Child table      | Key                                              | Constraint  | Notes                                 |
| ------------ | ---------------- | ------------------------------------------------ | ----------- | ------------------------------------- |
| `party`      | `contact_method` | `contact_method.party_id -> party.party_id`      | foreign key | shared communications for B2B and B2C |
| `party`      | `party_address`  | `party_address.party_id -> party.party_id`       | foreign key | links parties to addresses            |
| `address`    | `party_address`  | `party_address.address_id -> address.address_id` | foreign key | address reused across parties         |

### Party Relationships

| From table | To table             | Key                                                  | Constraint  | Notes                           |
| ---------- | -------------------- | ---------------------------------------------------- | ----------- | ------------------------------- |
| `party`    | `party_relationship` | `party_relationship.from_party_id -> party.party_id` | foreign key | directional relationship source |
| `party`    | `party_relationship` | `party_relationship.to_party_id -> party.party_id`   | foreign key | directional relationship target |

## Property Schema Relationships

### Address To Property

| Parent table | Child table | Key                                         | Constraint            | Notes                                         |
| ------------ | ----------- | ------------------------------------------- | --------------------- | --------------------------------------------- |
| `address`    | `property`  | `property.address_id -> address.address_id` | foreign key, nullable | property may exist before full address detail |

### Property Structure And Roles

| Parent table | Child table           | Key                                                       | Constraint  | Notes                                   |
| ------------ | --------------------- | --------------------------------------------------------- | ----------- | --------------------------------------- |
| `property`   | `property_unit`       | `property_unit.property_id -> property.property_id`       | foreign key | one property to many units              |
| `property`   | `property_party_role` | `property_party_role.property_id -> property.property_id` | foreign key | ownership, occupation, management       |
| `party`      | `property_party_role` | `property_party_role.party_id -> party.party_id`          | foreign key | works for organisations and individuals |

## Customer And Commercial Spine

### Party To Client Account

| Parent table | Child table      | Key                                         | Constraint          | Notes                                               |
| ------------ | ---------------- | ------------------------------------------- | ------------------- | --------------------------------------------------- |
| `party`      | `client_account` | `client_account.party_id -> party.party_id` | foreign key, unique | each party currently has at most one client account |

Implementation note:

- `uq_client_account_party` means one party cannot currently hold multiple client accounts.
- if future legal-entity or multi-brand scenarios require more than one commercial account per party, this constraint will need deliberate review.

### Client Account To Instruction

| Parent table     | Child table   | Key                                                                 | Constraint  | Notes                                          |
| ---------------- | ------------- | ------------------------------------------------------------------- | ----------- | ---------------------------------------------- |
| `client_account` | `instruction` | `instruction.client_account_id -> client_account.client_account_id` | foreign key | each instruction belongs to one client account |

### Instruction Roles And Property Links

| Parent table  | Child table              | Key                                                                   | Constraint  | Notes                                             |
| ------------- | ------------------------ | --------------------------------------------------------------------- | ----------- | ------------------------------------------------- |
| `instruction` | `instruction_party_role` | `instruction_party_role.instruction_id -> instruction.instruction_id` | foreign key | customer, billing, contact and intermediary roles |
| `party`       | `instruction_party_role` | `instruction_party_role.party_id -> party.party_id`                   | foreign key | shared party model                                |
| `instruction` | `instruction_property`   | `instruction_property.instruction_id -> instruction.instruction_id`   | foreign key | subject-property links                            |
| `property`    | `instruction_property`   | `instruction_property.property_id -> property.property_id`            | foreign key | property may recur across instructions            |

Implementation note:

- `uq_instruction_party_role` prevents duplicate party-role-period combinations on the same instruction.
- `uq_instruction_property_role` prevents duplicate property links for the same relationship type.

## Project And Deliverable Relationships

### Project Coordination

| Parent table  | Child table           | Key                                                                | Constraint  | Notes                       |
| ------------- | --------------------- | ------------------------------------------------------------------ | ----------- | --------------------------- |
| `project`     | `project_instruction` | `project_instruction.project_id -> project.project_id`             | foreign key | project-to-instruction link |
| `instruction` | `project_instruction` | `project_instruction.instruction_id -> instruction.instruction_id` | foreign key | instruction-to-project link |

### Deliverables

| Parent table  | Child table   | Key                                                        | Constraint            | Notes                                   |
| ------------- | ------------- | ---------------------------------------------------------- | --------------------- | --------------------------------------- |
| `project`     | `deliverable` | `deliverable.project_id -> project.project_id`             | foreign key           | deliverable always belongs to a project |
| `instruction` | `deliverable` | `deliverable.instruction_id -> instruction.instruction_id` | foreign key, nullable | optional direct instruction context     |

## Finance Relationships

### Fee Agreement

| Parent table  | Child table     | Key                                                          | Constraint  | Notes                            |
| ------------- | --------------- | ------------------------------------------------------------ | ----------- | -------------------------------- |
| `instruction` | `fee_agreement` | `fee_agreement.instruction_id -> instruction.instruction_id` | foreign key | fee basis belongs to instruction |

### Sales Invoice

| Parent table     | Child table     | Key                                                                   | Constraint            | Notes                        |
| ---------------- | --------------- | --------------------------------------------------------------------- | --------------------- | ---------------------------- |
| `client_account` | `sales_invoice` | `sales_invoice.client_account_id -> client_account.client_account_id` | foreign key           | invoice customer anchor      |
| `instruction`    | `sales_invoice` | `sales_invoice.instruction_id -> instruction.instruction_id`          | foreign key, nullable | optional instruction context |
| `project`        | `sales_invoice` | `sales_invoice.project_id -> project.project_id`                      | foreign key, nullable | optional project context     |

Implementation note:

- the current schema does not yet include payment, credit note, WIP item or ledger entry tables.
- these remain planned extensions to the financial relationship chain.

## Activity Management Engine Relationships

### Activity Parentage

| Parent table  | Child table | Key                                                     | Constraint            | Notes                       |
| ------------- | ----------- | ------------------------------------------------------- | --------------------- | --------------------------- |
| `instruction` | `activity`  | `activity.instruction_id -> instruction.instruction_id` | foreign key, nullable | direct instruction work     |
| `project`     | `activity`  | `activity.project_id -> project.project_id`             | foreign key, nullable | project-controlled work     |
| `property`    | `activity`  | `activity.property_id -> property.property_id`          | foreign key, nullable | property-anchored work      |
| `party`       | `activity`  | `activity.lead_party_id -> party.party_id`              | foreign key, nullable | lead person or organisation |

### Activity Chain

| Parent table    | Child table     | Key                                                                       | Constraint            | Notes                       |
| --------------- | --------------- | ------------------------------------------------------------------------- | --------------------- | --------------------------- |
| `activity`      | `activity_area` | `activity_area.activity_id -> activity.activity_id`                       | foreign key           | internal activity structure |
| `activity_area` | `activity_area` | `activity_area.parent_activity_area_id -> activity_area.activity_area_id` | foreign key, nullable | recursive hierarchy         |
| `activity`      | `observation`   | `observation.activity_id -> activity.activity_id`                         | foreign key           | activity findings           |
| `activity_area` | `observation`   | `observation.activity_area_id -> activity_area.activity_area_id`          | foreign key, nullable | area-specific finding       |
| `observation`   | `assessment`    | `assessment.observation_id -> observation.observation_id`                 | foreign key           | evaluation step             |
| `assessment`    | `action`        | `action.assessment_id -> assessment.assessment_id`                        | foreign key           | response step               |
| `action`        | `outcome`       | `outcome.action_id -> action.action_id`                                   | foreign key, nullable | outcome from action         |
| `activity`      | `outcome`       | `outcome.activity_id -> activity.activity_id`                             | foreign key, nullable | direct outcome              |
| `deliverable`   | `outcome`       | `outcome.deliverable_id -> deliverable.deliverable_id`                    | foreign key, nullable | contractual outcome         |

### Outcome Revision

| Parent table | Child table        | Key                                                                    | Constraint             | Notes                     |
| ------------ | ------------------ | ---------------------------------------------------------------------- | ---------------------- | ------------------------- |
| `outcome`    | `outcome_revision` | `outcome_revision.outcome_id -> outcome.outcome_id`                    | foreign key            | revision history          |
| `party`      | `outcome_revision` | `prepared_by_party_id`, `reviewed_by_party_id`, `approved_by_party_id` | foreign keys, nullable | review and approval roles |

### Evidence Links

| Parent table    | Child table     | Key                                                                | Constraint            | Notes                       |
| --------------- | --------------- | ------------------------------------------------------------------ | --------------------- | --------------------------- |
| `activity`      | `evidence_item` | `evidence_item.activity_id -> activity.activity_id`                | foreign key, nullable | direct activity evidence    |
| `activity_area` | `evidence_item` | `evidence_item.activity_area_id -> activity_area.activity_area_id` | foreign key, nullable | area evidence               |
| `observation`   | `evidence_item` | `evidence_item.observation_id -> observation.observation_id`       | foreign key, nullable | finding evidence            |
| `assessment`    | `evidence_item` | `evidence_item.assessment_id -> assessment.assessment_id`          | foreign key, nullable | evaluation evidence         |
| `action`        | `evidence_item` | `evidence_item.action_id -> action.action_id`                      | foreign key, nullable | action evidence             |
| `outcome`       | `evidence_item` | `evidence_item.outcome_id -> outcome.outcome_id`                   | foreign key, nullable | output evidence             |
| `party`         | `evidence_item` | `evidence_item.captured_by_party_id -> party.party_id`             | foreign key, nullable | evidence author or capturer |

## Workflow And Event Relationships

### Workflow Definition Layer

| Parent table          | Child table           | Key                                                                                        | Constraint   | Notes                          |
| --------------------- | --------------------- | ------------------------------------------------------------------------------------------ | ------------ | ------------------------------ |
| `workflow_definition` | `workflow_state`      | `workflow_state.workflow_definition_id -> workflow_definition.workflow_definition_id`      | foreign key  | state set belongs to workflow  |
| `workflow_definition` | `workflow_transition` | `workflow_transition.workflow_definition_id -> workflow_definition.workflow_definition_id` | foreign key  | transitions belong to workflow |
| `workflow_state`      | `workflow_transition` | `from_workflow_state_id`, `to_workflow_state_id`                                           | foreign keys | state-to-state move            |
| `workflow_transition` | `workflow_action`     | `workflow_action.workflow_transition_id -> workflow_transition.workflow_transition_id`     | foreign key  | actions on transition          |

### Workflow Runtime Layer

| Parent table          | Child table               | Key                                                                                      | Constraint            | Notes                 |
| --------------------- | ------------------------- | ---------------------------------------------------------------------------------------- | --------------------- | --------------------- |
| `workflow_definition` | `workflow_instance`       | `workflow_instance.workflow_definition_id -> workflow_definition.workflow_definition_id` | foreign key           | live workflow binding |
| `workflow_instance`   | `workflow_instance_state` | `workflow_instance_state.workflow_instance_id -> workflow_instance.workflow_instance_id` | foreign key           | progression history   |
| `workflow_state`      | `workflow_instance_state` | `workflow_instance_state.workflow_state_id -> workflow_state.workflow_state_id`          | foreign key           | current state marker  |
| `party`               | `workflow_instance_state` | `entered_by_party_id -> party.party_id`                                                  | foreign key, nullable | actor on state entry  |

Implementation note:

- `workflow_instance` uses polymorphic binding through `entity_type_code` and `entity_id` rather than direct foreign keys to business objects.
- `uq_workflow_instance_entity` prevents duplicate workflow-definition bindings for the same entity.

### Business Event Layer

| Parent or referenced table | Child table      | Key                                                                    | Constraint                    | Notes                 |
| -------------------------- | ---------------- | ---------------------------------------------------------------------- | ----------------------------- | --------------------- |
| any business object        | `business_event` | `entity_type_code`, `entity_id`                                        | indexed polymorphic reference | append-only history   |
| `workflow_instance`        | `business_event` | `workflow_instance_id -> workflow_instance.workflow_instance_id`       | foreign key, nullable         | workflow-linked event |
| `workflow_transition`      | `business_event` | `workflow_transition_id -> workflow_transition.workflow_transition_id` | foreign key, nullable         | transition event      |
| `workflow_state`           | `business_event` | `from_workflow_state_id`, `to_workflow_state_id`                       | foreign keys, nullable        | state change context  |
| `party`                    | `business_event` | `performed_by_party_id -> party.party_id`                              | foreign key, nullable         | actor context         |

## Current Relationship Caveats

1. `client_account` is currently one-to-one with `party` because of `uq_client_account_party`.
2. `deliverable` currently requires `project_id`, so a purely instruction-level deliverable is not yet supported without a project.
3. `workflow_instance` and `business_event` use polymorphic entity references, which means referential integrity to business entities is enforced partly by application logic.
4. `document` tables are still planned, so document relationships are conceptual in the architecture model but not yet materialised in current schema.
5. finance extensions such as payments, WIP items, credit notes and ledger entries are described in requirements but not all are present in current schema.

## Use In Design Reviews

Before approving a schema change, confirm:

1. the relationship already exists here or the appendix is updated in the same change
2. cardinality is explicit
3. required foreign keys and uniqueness constraints are identified
4. B2B and B2C behavior still works through the shared customer model
5. polymorphic or nullable links are deliberate rather than accidental
