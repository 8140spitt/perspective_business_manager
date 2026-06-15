# Canonical Enterprise Data Model

## Purpose

The Canonical Enterprise Data Model (CEDM) defines the core enterprise objects used throughout Perspective Business Manager.

All database design, APIs, workflows, reporting models and industry packages must align to this model.

The CEDM exists to ensure that each business concept is represented once and reused consistently throughout the platform.

## Design Principles

### 1. Business Objects First

Every table must represent a recognised business object, relationship, lifecycle state or event.

Tables must not be created solely to satisfy a page, menu, report or short-term UI requirement.

### 2. No Module Ownership

Business objects belong to the enterprise, not to individual modules.

For example, Client is not owned by CRM. Client is used by CRM, Operations, Finance, Compliance and Reporting.

### 3. Workflow is Metadata

Business object lifecycles are managed by workflow metadata.

The platform must not hard-code instruction status, project status, complaint status or invoice status into application logic when the workflow engine can represent them.

### 4. Events are Immutable

Business events are append-only.

Events are not updated or deleted. If a business fact changes, a new event records the change.

### 5. Documents Attach to Objects

Documents are not standalone islands.

Documents must attach to business objects such as Party, Client Account, Instruction, Activity, Assessment, Outcome or Invoice.

### 6. Industry Packages Extend the Core

Industry-specific concepts must extend the platform core rather than modify it.

RICS, Engineering, Quality, Risk and Compliance packages should configure activity types, workflows, assessment types, action types and report templates.

## Core Enterprise Objects

### Party

Represents a person, organisation or other legal/business entity.

Examples:

- Client
- Supplier
- Employee
- Contractor
- Insurer
- Managing Agent

Current tables:

- `party`
- `person`
- `organisation`
- `party_role`
- `party_relationship`

### Address and Location

Represents where something is, occurs or is associated.

Examples:

- Postal address
- Site
- Property
- Building
- Unit
- Floor
- Room

Current tables:

- `address`
- `party_address`
- `property`
- `property_unit`

### Contact Method

Represents how a party can be contacted.

Examples:

- Email
- Telephone
- Mobile
- Website

Current tables:

- `contact_method`

### Client Account

Represents a commercial client relationship with a party.

A party may exist before it becomes a client. A client account records that commercial relationship.

Current tables:

- `client_account`

### Instruction

Represents a formal request or acceptance of work.

In a consultancy business this is one of the most important operational objects.

Current tables:

- `instruction`
- `instruction_party_role`
- `instruction_property`

### Project

Represents a managed delivery structure.

A project may deliver one or more instructions. Not every activity needs to be a project.

Current tables:

- `project`
- `project_instruction`

### Activity

Represents a unit of work performed by the enterprise.

Examples:

- Inspection
- Audit
- Investigation
- Risk review
- Workshop
- Meeting
- Survey

Planned tables:

- `activity`
- `activity_area`

### Observation

Represents something identified during an activity.

Examples:

- Crack observed
- Water ingress
- Process deviation
- Missing evidence
- Risk indicator

Planned tables:

- `observation`

### Assessment

Represents professional evaluation of an observation or situation.

Examples:

- Building defect assessment
- Risk assessment
- Technical assessment
- Compliance assessment
- Quality non-conformance

Planned tables:

- `assessment`

### Action

Represents a required or recommended response.

Examples:

- Repair recommendation
- Corrective action
- Mitigation action
- Engineering action
- Follow-up action

Planned tables:

- `action`

### Outcome

Represents the result or output of work.

Examples:

- Survey report
- Audit report
- Engineering report
- Risk decision
- Completion certificate

Planned tables:

- `outcome`
- `outcome_revision`

### Deliverable

Represents a contracted output to be delivered to a client or stakeholder.

Current tables:

- `deliverable`

### Evidence

Represents supporting material for observations, assessments, actions and outcomes.

Examples:

- Photo
- Video
- Drawing
- PDF
- Email
- Measurement
- Calculation

Planned tables:

- `evidence_item`

### Financial Objects

Represent commercial and financial activity.

Current tables:

- `fee_agreement`
- `sales_invoice`

Planned objects:

- Payment
- WIP item
- Ledger entry
- Credit note

### Workflow

Represents lifecycle control.

Current tables:

- `workflow_definition`
- `workflow_state`
- `workflow_transition`
- `workflow_action`
- `workflow_instance`
- `workflow_instance_state`

### Event

Represents immutable business history.

Current tables:

- `business_event`

### Document

Represents controlled information attached to business objects.

Planned objects:

- Document
- Document Revision
- Record
- Retention Policy

## Canonical Relationship Pattern

```text
Party
  -> Client Account
    -> Instruction
      -> Activity
        -> Observation
          -> Assessment
            -> Action
              -> Outcome
```

Supporting layers:

```text
Workflow
Event
Document
Evidence
```

## Industry Specialisation Examples

### RICS

```text
Inspection      -> Activity
Survey Finding  -> Assessment
Recommendation  -> Action
Survey Report   -> Outcome
Photo / Drawing -> Evidence
```

### Quality

```text
Audit              -> Activity
Non-Conformance    -> Assessment
Corrective Action  -> Action
Audit Report       -> Outcome
```

### Engineering

```text
Investigation       -> Activity
Technical Finding   -> Assessment
Engineering Action  -> Action
Engineering Report  -> Outcome
```

### Risk

```text
Risk Review      -> Activity
Risk Assessment  -> Assessment
Mitigation       -> Action
Decision         -> Outcome
```

## Governance Rule

If a future table, API, route or report cannot be mapped to this CEDM, it must not be added until the model is updated deliberately.
