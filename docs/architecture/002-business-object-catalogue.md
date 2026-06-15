# Business Object Catalogue

## Purpose

The Business Object Catalogue is the authoritative inventory of enterprise objects in Perspective Business Manager.

It links architecture, database design, API design, UI workspaces and reporting.

A new object should not be introduced unless it is added to this catalogue or deliberately approved as an extension.

## Object Classification

Objects are classified as:

- Foundation Object
- Core Business Object
- Workflow Object
- Event Object
- Activity Management Object
- Financial Object
- Document / Record Object
- Extension Object

## Catalogue

## Party

Classification: Foundation Object

Purpose: Represents a person, organisation or legal/business entity.

Examples:

- Client organisation
- Individual client
- Supplier
- Employee
- Contractor
- Insurer

Parent Objects:

- None

Child Objects:

- Person
- Organisation
- Party Role
- Party Relationship
- Contact Method
- Party Address
- Client Account

Workflow Enabled: No by default

Event Enabled: Yes

Auditable: Yes

Current Tables:

- `party`
- `person`
- `organisation`
- `party_role`
- `party_relationship`

Industry Extensions:

- RICS: landlord, tenant, managing agent, insurer, loss adjuster
- Engineering: customer, design authority, supplier, approver
- Quality: auditee, auditor, process owner

---

## Address

Classification: Foundation Object

Purpose: Represents a postal or physical address.

Parent Objects:

- None

Child Objects:

- Party Address
- Property

Workflow Enabled: No

Event Enabled: Yes

Auditable: Yes

Current Tables:

- `address`
- `party_address`

Industry Extensions:

- RICS: property address, site address, inspection address

---

## Contact Method

Classification: Foundation Object

Purpose: Represents a way to contact a party.

Examples:

- Email
- Phone
- Mobile
- Website

Parent Objects:

- Party

Child Objects:

- None

Workflow Enabled: No

Event Enabled: Yes

Auditable: Yes

Current Tables:

- `contact_method`

---

## Property

Classification: Core Business Object

Purpose: Represents a property, site, building or managed real estate object.

Parent Objects:

- Address

Child Objects:

- Property Unit
- Property Party Role
- Instruction Property
- Activity

Workflow Enabled: Optional

Event Enabled: Yes

Auditable: Yes

Current Tables:

- `property`
- `property_unit`
- `property_party_role`

Industry Extensions:

- RICS: subject property, comparable property, insured property

---

## Client Account

Classification: Core Business Object

Purpose: Represents a commercial client relationship with a party.

Parent Objects:

- Party

Child Objects:

- Instruction
- Sales Invoice

Workflow Enabled: Optional

Event Enabled: Yes

Auditable: Yes

Current Tables:

- `client_account`

Industry Extensions:

- RICS: client account for surveying instructions
- Engineering: customer account
- Quality: external customer or audit client

---

## Instruction

Classification: Core Business Object

Purpose: Represents a formal request, commission or accepted scope of work.

Parent Objects:

- Client Account

Child Objects:

- Instruction Party Role
- Instruction Property
- Project
- Activity
- Fee Agreement
- Sales Invoice

Workflow Enabled: Yes

Event Enabled: Yes

Auditable: Yes

Current Tables:

- `instruction`
- `instruction_party_role`
- `instruction_property`

Industry Extensions:

- RICS: building survey instruction, dilapidations instruction, reinstatement cost assessment instruction
- Engineering: investigation request, design change instruction

---

## Project

Classification: Core Business Object

Purpose: Represents a managed delivery structure used to coordinate work, people, time, risk and cost.

Parent Objects:

- Instruction

Child Objects:

- Deliverable
- Activity
- Work Item
- Task
- Risk
- Issue

Workflow Enabled: Yes

Event Enabled: Yes

Auditable: Yes

Current Tables:

- `project`
- `project_instruction`

Industry Extensions:

- RICS: surveying project, portfolio instruction project
- Engineering: design project, change project

---

## Deliverable

Classification: Core Business Object

Purpose: Represents a committed output to be delivered to a client or stakeholder.

Examples:

- Report
- Certificate
- Schedule
- Drawing pack
- Assessment pack

Parent Objects:

- Project
- Instruction

Child Objects:

- Outcome
- Outcome Revision
- Document
- Sales Invoice

Workflow Enabled: Yes

Event Enabled: Yes

Auditable: Yes

Current Tables:

- `deliverable`

Industry Extensions:

- RICS: building survey report, schedule of condition, dilapidations schedule
- Engineering: technical report, design package

---

## Fee Agreement

Classification: Financial Object

Purpose: Represents the agreed fee or commercial basis for an instruction.

Parent Objects:

- Instruction

Child Objects:

- Sales Invoice
- WIP Item

Workflow Enabled: Optional

Event Enabled: Yes

Auditable: Yes

Current Tables:

- `fee_agreement`

---

## Sales Invoice

Classification: Financial Object

Purpose: Represents an invoice issued to a client account.

Parent Objects:

- Client Account
- Instruction
- Project

Child Objects:

- Payment
- Credit Note

Workflow Enabled: Yes

Event Enabled: Yes

Auditable: Yes

Current Tables:

- `sales_invoice`

---

## Workflow Definition

Classification: Workflow Object

Purpose: Defines a reusable lifecycle model.

Parent Objects:

- None

Child Objects:

- Workflow State
- Workflow Transition
- Workflow Instance

Workflow Enabled: No

Event Enabled: Yes

Auditable: Yes

Current Tables:

- `workflow_definition`

---

## Workflow State

Classification: Workflow Object

Purpose: Defines a valid state within a workflow.

Parent Objects:

- Workflow Definition

Child Objects:

- Workflow Transition
- Workflow Instance State

Workflow Enabled: No

Event Enabled: Yes

Auditable: Yes

Current Tables:

- `workflow_state`

---

## Workflow Transition

Classification: Workflow Object

Purpose: Defines a permitted movement from one workflow state to another.

Parent Objects:

- Workflow Definition
- Workflow State

Child Objects:

- Workflow Action
- Business Event

Workflow Enabled: No

Event Enabled: Yes

Auditable: Yes

Current Tables:

- `workflow_transition`

---

## Workflow Instance

Classification: Workflow Object

Purpose: Connects a workflow definition to a specific business object.

Parent Objects:

- Workflow Definition
- Business Object

Child Objects:

- Workflow Instance State
- Business Event

Workflow Enabled: No

Event Enabled: Yes

Auditable: Yes

Current Tables:

- `workflow_instance`
- `workflow_instance_state`

---

## Business Event

Classification: Event Object

Purpose: Records immutable business history.

Examples:

- Client created
- Instruction accepted
- Workflow state changed
- Document uploaded
- Invoice paid

Parent Objects:

- Any business object via `entity_type_code` and `entity_id`

Child Objects:

- None

Workflow Enabled: No

Event Enabled: No; it is the event store

Auditable: Yes; append-only

Current Tables:

- `business_event`

---

## Activity

Classification: Activity Management Object

Purpose: Represents a unit of work performed by the enterprise.

Examples:

- Inspection
- Audit
- Investigation
- Risk review
- Workshop
- Meeting
- Survey

Parent Objects:

- Instruction
- Project
- Contract
- Property

Child Objects:

- Activity Area
- Observation
- Assessment
- Action
- Outcome
- Evidence Item

Workflow Enabled: Yes

Event Enabled: Yes

Auditable: Yes

Planned Tables:

- `activity`
- `activity_area`

Industry Extensions:

- RICS: building survey inspection, schedule of condition inspection, dilapidations inspection
- Quality: audit
- Engineering: investigation
- Risk: risk review

---

## Activity Area

Classification: Activity Management Object

Purpose: Represents a defined area, zone, scope segment or location within an activity.

Examples:

- Roof
- External elevation
- Level 01
- Plant room
- Process area
- System boundary

Parent Objects:

- Activity
- Activity Area

Child Objects:

- Observation
- Evidence Item

Workflow Enabled: No

Event Enabled: Yes

Auditable: Yes

Planned Tables:

- `activity_area`

---

## Observation

Classification: Activity Management Object

Purpose: Represents something observed or recorded during an activity.

Examples:

- Crack observed
- Water staining
- Missing record
- Process deviation
- Configuration mismatch

Parent Objects:

- Activity
- Activity Area

Child Objects:

- Assessment
- Evidence Item

Workflow Enabled: Optional

Event Enabled: Yes

Auditable: Yes

Planned Tables:

- `observation`

---

## Assessment

Classification: Activity Management Object

Purpose: Represents professional evaluation of an observation, issue, condition or risk.

Examples:

- Defect assessment
- Risk assessment
- Compliance assessment
- Technical assessment
- Non-conformance assessment

Parent Objects:

- Activity
- Observation

Child Objects:

- Action
- Outcome
- Evidence Item

Workflow Enabled: Yes

Event Enabled: Yes

Auditable: Yes

Planned Tables:

- `assessment`

---

## Action

Classification: Activity Management Object

Purpose: Represents a required, recommended or completed response to an assessment.

Examples:

- Repair recommendation
- Corrective action
- Mitigation action
- Engineering action
- Follow-up action

Parent Objects:

- Assessment
- Activity

Child Objects:

- Outcome
- Evidence Item
- Work Item
- Task

Workflow Enabled: Yes

Event Enabled: Yes

Auditable: Yes

Planned Tables:

- `action`

---

## Outcome

Classification: Activity Management Object

Purpose: Represents the result or output of an activity, assessment or action.

Examples:

- Survey report
- Audit report
- Engineering report
- Risk decision
- Completion statement

Parent Objects:

- Activity
- Assessment
- Action
- Deliverable

Child Objects:

- Outcome Revision
- Document
- Evidence Item

Workflow Enabled: Yes

Event Enabled: Yes

Auditable: Yes

Planned Tables:

- `outcome`
- `outcome_revision`

---

## Evidence Item

Classification: Activity Management Object / Document Object

Purpose: Represents supporting evidence attached to a business object.

Examples:

- Photo
- Video
- Drawing
- PDF
- Email
- Measurement
- Calculation

Parent Objects:

- Activity
- Activity Area
- Observation
- Assessment
- Action
- Outcome

Child Objects:

- Document
- File Storage Reference

Workflow Enabled: No

Event Enabled: Yes

Auditable: Yes

Planned Tables:

- `evidence_item`

---

## Work Item

Classification: Work Management Object

Purpose: Represents a package of work to be planned, assigned and tracked.

Parent Objects:

- Instruction
- Project
- Activity
- Action

Child Objects:

- Task
- Assignment
- Resource Allocation

Workflow Enabled: Yes

Event Enabled: Yes

Auditable: Yes

Planned Tables:

- `work_item`

---

## Task

Classification: Work Management Object

Purpose: Represents an actionable unit of work.

Parent Objects:

- Work Item

Child Objects:

- Assignment
- Business Event

Workflow Enabled: Yes

Event Enabled: Yes

Auditable: Yes

Planned Tables:

- `task`

---

## Document

Classification: Document / Record Object

Purpose: Represents controlled information attached to a business object.

Parent Objects:

- Any business object

Child Objects:

- Document Revision
- Record

Workflow Enabled: Optional

Event Enabled: Yes

Auditable: Yes

Planned Tables:

- `document`
- `document_revision`
- `record`

## Governance Rule

If a developer wants to add a table, route, API endpoint or report that does not map to an object in this catalogue, the catalogue must be updated first.
