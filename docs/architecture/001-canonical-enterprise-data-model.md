# Canonical Enterprise Data Model

## Purpose

The Canonical Enterprise Data Model (CEDM) defines the core enterprise objects used throughout Perspective Business Manager (PBM).

The CEDM translates the Enterprise Meta Model into concrete business objects that can be implemented through database tables, repositories, services, APIs, routes, workflow definitions, reports, integrations and framework extensions.

The CEDM exists to ensure that each business concept is represented once and reused consistently throughout the platform.

All database design, APIs, workflows, reporting models, route families, package boundaries and framework extensions must align to this model.

## Source Architecture

This document derives from:

- [000-enterprise-meta-model.md](./000-enterprise-meta-model.md)
- [001-enterprise-capability-model.md](./001-enterprise-capability-model.md)

The meta model defines seven root concepts:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

This document defines the enterprise objects that derive from those concepts.

## Design Principles

### 1. Business Objects First

Every table must represent one of the following:

- recognised business object
- relationship between business objects
- lifecycle state
- immutable event
- workflow state
- configuration object
- framework definition
- evidence or document attachment
- audit or control record

Tables must not be created solely to satisfy a page, menu, report or short-term UI requirement.

### 2. No Module Ownership

Business objects belong to the enterprise, not to individual modules.

Customer is not owned by CRM.

Project is not owned by Projects.

Invoice is not owned by Finance.

Document is not owned by Documents.

Compliance is not owned by Compliance.

Those route families are workspaces over shared enterprise objects.

### 3. One Enterprise Reality

PBM must avoid separate module-owned realities.

There must not be one customer record for CRM, another for finance and another for projects.

There must not be one project record for delivery, another for cost control and another for reporting.

There must not be separate document stores detached from the business objects they support.

### 4. Frameworks Extend Behaviour

Frameworks, standards and methodologies extend behaviour through metadata, controls, workflows, templates, evidence requirements and deliverables.

They must not create duplicate object hierarchies.

A PRINCE2 project and a Six Sigma project are both Projects.

The applied framework changes the lifecycle, controls, deliverables and evidence requirements.

### 5. Workflow Is Metadata

Business object lifecycles are managed through workflow metadata where possible.

Status values should not become hard-coded application logic when they can be represented through workflow definitions, states, transitions and actions.

### 6. Events Are Immutable

Business events are append-only.

Events are not updated or deleted. If a business fact changes, a new event records the change.

### 7. Information Attaches To Objects

Documents, records, evidence and correspondence attach to enterprise objects.

Information should never become detached from the Party, Thing, Agreement, Work, Transaction or Control it supports.

## Canonical Object Domains

The CEDM is organised by meta-model domain:

```text
Party Domain
Thing Domain
Agreement Domain
Work Domain
Transaction Domain
Information Domain
Control Domain
Cross-Cutting Platform Domain
```

Each domain contains concrete enterprise objects.

---

# 1. Party Domain

## Meta Concept

Party

## Purpose

The Party Domain represents actors that participate in the enterprise.

A Party may be a person, organisation, team, customer, supplier, employee, contractor, regulator, partner, approver or any other participant.

## Canonical Objects

### Party

The canonical root identity for actors.

A Party is not automatically a customer, supplier or employee. Those are roles, accounts or relationship contexts applied to a Party.

Current tables:

- `party`

### Person

A human being represented as a specialisation of Party.

Current tables:

- `person`

### Organisation

A legal or business entity represented as a specialisation of Party.

Current tables:

- `organisation`

### Party Role

A role that a Party plays in a context.

Examples:

- Client
- Supplier
- Employee
- Contractor
- Approver
- Stakeholder
- Regulator
- Billing Party
- Primary Contact

Current tables:

- `party_role`

### Party Relationship

A relationship between two Parties.

Examples:

- contact of
- employee of
- supplier to
- contractor to
- parent organisation of
- representative of

Current tables:

- `party_relationship`

### Client Account

A commercial customer relationship with a Party.

A Party may exist before it becomes a customer. Client Account records the commercial customer relationship.

Current tables:

- `client_account`

### Supplier Account

A supplier or subcontractor commercial relationship with a Party.

Planned object.

### Employee Record

An employment or workforce relationship with a Person.

Planned object.

### Contractor Record

A contractor relationship with a Party.

Planned object.

### Team

A group of Parties or workforce resources used for organisation, allocation, delivery and governance.

Planned object.

### Department / Business Unit

An organisational structure element.

Planned object.

## Party Domain Rules

1. Customer, supplier, employee and contractor must not be separate root identities.
2. B2B and B2C must use the same Party root model.
3. Commercial relationships are represented through accounts, roles and relationships.
4. Contact methods and addresses attach to Party where relevant.
5. Party records may appear in Customers, Sales, Projects, Procurement, Finance, Resources, Compliance and Reporting.

---

# 2. Thing Domain

## Meta Concept

Thing

## Purpose

The Thing Domain represents assets, property, equipment, products, materials, locations and other things that exist, are managed, are used, are worked on or are referenced.

## Canonical Objects

### Asset

A general managed thing.

Asset is the broad canonical object for things the enterprise owns, manages, maintains, uses, inspects or delivers work against.

Planned object.

### Property

A property, site, building or built environment location.

Current tables:

- `property`

### Property Unit

A subdivision of a property.

Examples:

- building
- floor
- unit
- room
- plot

Current tables:

- `property_unit`

### Address

A postal, physical or geographic address.

Current tables:

- `address`
- `party_address`

### Location

A location that may be physical, geospatial, operational or logical.

Planned object.

### Equipment

A piece of equipment used, maintained, inspected or allocated.

Planned object.

### Plant

Plant used in delivery, operations or maintenance.

Planned object.

### Vehicle

A vehicle managed by the enterprise.

Planned object.

### Product

An item, product or output managed by the enterprise.

Planned object.

### Material

A material used in work or procurement.

Planned object.

### Inventory Item

An item held in stock or inventory.

Planned object.

### Software Asset

A software licence, system, environment or digital asset.

Planned object.

### Information Asset

A controlled information asset.

Planned object.

## Thing Domain Rules

1. Property is a type of Thing, not the whole Thing model.
2. Equipment, plant, vehicles, products and materials should use the same asset principles where possible.
3. Things may be the subject of Work.
4. Things may be used as Resources.
5. Things may have documents, evidence, compliance requirements, lifecycle history and financial context.
6. Thing records may appear in Assets, Projects, Operations, Procurement, Finance, Compliance and Reporting.

---

# 3. Agreement Domain

## Meta Concept

Agreement

## Purpose

The Agreement Domain represents commitments, offers, authorisations, contracts and obligations between Parties.

Agreements may be customer-facing, supplier-facing or internal.

## Canonical Objects

### Lead

A potential commercial contact or early-stage interest.

Planned object.

### Enquiry

A request for information, price, proposal or service.

Planned object.

### Opportunity

A potential piece of work or commercial outcome.

Planned object.

### Bid

A response to a competitive or formal opportunity.

Planned object.

### Tender

A formal tender context.

Planned object.

### Proposal

An offer to perform work, provide goods or deliver services.

Planned object.

### Quotation

A priced offer.

Planned object.

### Estimate

A financial or effort estimate, often pre-contract or pre-project.

Planned object.

### Contract

An accepted agreement between Parties.

Planned object.

### Framework Agreement

A reusable agreement structure under which multiple pieces of work may be instructed or awarded.

Planned object.

### Service Agreement

An agreement for recurring, service-based or support work.

Planned object.

### Instruction

An instruction is an authorisation, request, contract trigger or work initiation record.

Under the broader ERP model, Instruction is not always the centre of the platform. It is an Agreement or Work-authorisation object depending on context.

Current tables:

- `instruction`
- `instruction_party_role`
- `instruction_property`

### Purchase Order

A supplier-side commitment to buy goods or services.

Purchase Order belongs to the Agreement Domain and may also create financial commitments in the Transaction Domain.

Planned object.

### Change Order / Variation

An agreed change to scope, price, time, deliverables or obligations.

Planned object.

## Agreement Domain Rules

1. Agreements link Parties to obligations.
2. Agreements may authorise Work.
3. Agreements may generate Transactions.
4. Agreements may require Information.
5. Agreements may be governed by Controls.
6. Sales, projects, procurement and finance must not recreate separate agreement records for the same business commitment.

---

# 4. Work Domain

## Meta Concept

Work

## Purpose

The Work Domain represents effort performed to achieve an outcome.

Work includes projects, programmes, work packages, activities, tasks, jobs, work orders, deliverables and operational execution.

## Canonical Objects

### Portfolio

A collection of programmes, projects and work aligned to strategic objectives.

Planned object.

### Programme

A coordinated set of projects and work managed together to achieve outcomes or benefits.

Planned object.

### Project

A controlled delivery container used to plan, execute, control and complete work.

A project may originate from a contract, proposal acceptance, internal approval, operational requirement, compliance requirement, service request or other authorised demand.

Current tables:

- `project`
- `project_instruction`

### Work Package

A subdivision of a project or programme used to organise delivery scope.

Planned object.

### Activity

A unit of executable work.

Activities may be linked to a project, work package, agreement, thing, party or control context.

Current tables:

- `activity`
- `activity_area`

### Task

An assignable piece of work.

Planned object.

### Job / Work Order

Operational work to be performed, usually more execution-focused than project-management-focused.

Planned object.

### Service Request

A request for operational or support work.

Planned object.

### Milestone

A significant point in a work lifecycle.

Planned object.

### Dependency

A relationship between pieces of Work.

Planned object.

### Deliverable

An output to be produced, submitted, approved or delivered.

Current tables:

- `deliverable`

### Observation

Something identified during Work.

Current tables:

- `observation`

### Assessment

An evaluation of an observation, situation, risk, defect, non-conformance or condition.

Current tables:

- `assessment`

### Action

A required, recommended or agreed response.

Current tables:

- `action`

### Outcome

The result of Work, Action, Activity or Deliverable production.

Current tables:

- `outcome`

Planned objects:

- `outcome_revision`

## Work Domain Rules

1. Project is the primary controlled delivery container.
2. Work may exist without a Project, but project-enabled work must link into the Project model.
3. Work may be created from Agreements, internal demand, compliance obligations, asset requirements or operational requests.
4. Work may affect Things.
5. Work may consume Parties and Things as Resources.
6. Work may create Information.
7. Work may create Transactions.
8. Work may be governed by Controls.
9. Activities, observations, assessments, actions and outcomes are execution details, not the whole ERP spine.

---

# 5. Transaction Domain

## Meta Concept

Transaction

## Purpose

The Transaction Domain represents financial planning, commitment, accounting movement, cost, revenue, billing, payment and economic consequence.

## Canonical Objects

### Budget

A planned financial allocation.

Planned object.

### Forecast

A projected financial outcome.

Planned object.

### Estimate

A planned cost, price or effort estimate.

May also appear in the Agreement Domain where used commercially.

Planned object.

### Cost

An incurred, planned or committed cost.

Planned object.

### Revenue

Recognised, planned or forecast income.

Planned object.

### Commitment

A financial commitment, often created by procurement or contract obligations.

Planned object.

### Fee Agreement

A fee arrangement that governs billing and revenue.

Current tables:

- `fee_agreement`

### Sales Invoice

A customer-facing invoice.

Current tables:

- `sales_invoice`

### Purchase Invoice

A supplier-facing invoice.

Planned object.

### Payment

A payment made or received.

Planned object.

### Receipt

Money received.

Planned object.

### Credit Note

A credit adjustment.

Planned object.

### Journal Entry

An accounting journal.

Planned object.

### WIP Item

Work-in-progress financial record.

Planned object.

### Expense

An expense claim or business cost.

Planned object.

### Tax Code / Tax Transaction

Tax classification or tax movement.

Planned object.

## Transaction Domain Rules

1. Finance records the economic effect of enterprise activity.
2. Transactions must reference their source Party, Agreement, Work or Thing wherever possible.
3. Purchase Orders are Agreements that may create financial Commitments.
4. Sales Invoices should reference Client Account and may reference Contract, Project, Work Package, Deliverable or other billing context.
5. Finance must not recreate customers, suppliers, projects or contracts.

---

# 6. Information Domain

## Meta Concept

Information

## Purpose

The Information Domain represents documents, records, evidence, correspondence, templates, knowledge and controlled information.

## Canonical Objects

### Document

A controlled information object.

Planned object.

### Document Revision

A version or revision of a Document.

Planned object.

### Record

A retained business record.

Planned object.

### Evidence Item

Supporting evidence attached to an enterprise object.

Planned objects:

- `evidence_item`

### Correspondence

A communication record.

Planned object.

### Template

A reusable information structure.

Planned object.

### Report

A produced or generated information output.

Planned object.

### Certificate

A formal certificate or attestation.

Planned object.

### Drawing / Specification

Technical information objects.

Planned object.

### Knowledge Article

Knowledge-base content.

Planned object.

### Retention Policy

A policy governing record retention.

Planned object.

## Information Domain Rules

1. Documents and evidence attach to enterprise objects.
2. Information may be produced by Work.
3. Information may satisfy Controls.
4. Information may support Agreements and Transactions.
5. Information may require workflow and approval.
6. Information must not become a detached document island.

---

# 7. Control Domain

## Meta Concept

Control

## Purpose

The Control Domain represents governance, risk, compliance, quality, workflow, assurance, approvals, frameworks and policies.

## Canonical Objects

### Risk

An uncertain event or condition that may affect objectives.

Planned object.

### Issue

A known problem or matter requiring management.

Planned object.

### Change

A controlled change to scope, cost, time, design, requirement, agreement, work or information.

Planned object.

### Compliance Requirement

A requirement that must be satisfied.

Planned object.

### Compliance Framework

A structured set of compliance requirements, controls, templates, workflows, evidence requirements and reporting obligations.

Planned object.

### Control

A mechanism used to govern or assure behaviour.

Planned object.

### Audit

A review, assurance or audit activity.

Planned object.

### Audit Finding

A finding from audit or assurance.

Planned object.

### Quality Check

A quality control or quality assurance check.

Planned object.

### Non-Conformance

A failure to meet a requirement.

Planned object.

### Corrective Action

An action to correct a non-conformance or issue.

May reuse Action from the Work Domain where appropriate.

Planned object.

### Preventive Action

An action to prevent recurrence or occurrence.

Planned object.

### Workflow Definition

Metadata defining lifecycle behaviour.

Current tables:

- `workflow_definition`
- `workflow_state`
- `workflow_transition`
- `workflow_action`

### Workflow Instance

A live workflow attached to a business object.

Current tables:

- `workflow_instance`
- `workflow_instance_state`

### Approval

A formal approval control.

Planned object.

### Policy

A governance rule or policy.

Planned object.

### Framework

A methodology, standard or governance framework applied to business objects.

Examples:

- PRINCE2
- PMBOK
- Agile
- Six Sigma
- Lean
- CMII
- RICS
- CDM
- NEC
- JCT
- ISO 9001
- ISO 14001
- ISO 45001
- ISO 27001
- client-specific governance

Planned object.

## Control Domain Rules

1. Compliance is a platform capability, not an industry module.
2. Frameworks apply behaviour to enterprise objects.
3. Controls may govern Party, Thing, Agreement, Work, Transaction or Information.
4. Controls may require evidence.
5. Workflow and approval are control mechanisms.
6. Frameworks must not fork the core ERP object model.

---

# 8. Cross-Cutting Platform Domain

## Purpose

Some objects support all domains.

## Canonical Objects

### Business Event

Immutable record of a business fact, action or state change.

Current tables:

- `business_event`

### Audit Event

A system or user action record for auditability.

Planned object.

### Reference Data

Controlled codes and classifications.

Current tables:

- `ref_code_set`
- `ref_code_value`

### User

An authenticated user.

Planned / existing depending on auth implementation.

### Role

A security or business role.

Planned / existing depending on auth implementation.

### Permission

A permission granted to a user, role or policy.

Planned / existing depending on auth implementation.

### Numbering Scheme

A configurable identifier scheme.

Planned object.

### Integration Endpoint

An external integration point.

Planned object.

### Automation Rule

A rule that triggers automated behaviour.

Planned object.

## Cross-Cutting Rules

1. Events must be immutable.
2. Reference data must be governed.
3. Security and permissions must reference shared objects and capabilities.
4. Integrations must use canonical objects, not route-specific payloads.
5. Numbering should be configurable by object type and business context.

---

# Enterprise Relationship Pattern

The canonical data model does not define one single rigid hierarchy.

PBM is a connected enterprise graph.

The main relationship pattern is:

```text
Party
  participates in Agreement

Agreement
  authorises Work

Work
  affects Thing

Work
  consumes Party / Thing as Resource

Work
  creates Information

Work
  creates Transaction

Transaction
  references Party / Agreement / Work / Thing

Control
  governs Party / Thing / Agreement / Work / Transaction / Information

Information
  evidences Party / Thing / Agreement / Work / Transaction / Control

Event
  records immutable history across all objects
```

## Example Commercial-to-Delivery Flow

```text
Party
  -> Client Account
    -> Opportunity
      -> Proposal / Quotation
        -> Contract / Accepted Agreement
          -> Project
            -> Work Package
              -> Activity / Task
                -> Deliverable / Outcome
                  -> Sales Invoice
```

This is a common flow, not the only flow.

PBM must also support:

- internal projects
- maintenance work
- service requests
- compliance-driven work
- asset-driven work
- supplier-side procurement
- framework agreements
- programmes and portfolios
- non-project operational work

## Example Project Context

A Project may connect to:

```text
Client Account
Contract
Party Roles
Assets / Things
Work Packages
Activities
Tasks
Deliverables
Resources
Budgets
Costs
Purchase Orders
Invoices
Documents
Evidence
Risks
Issues
Changes
Compliance Requirements
Frameworks
Workflow Instances
Business Events
Reports
```

There is still only one Project object.

The different route families simply expose different views of it.

---

# Object Ownership Rules

## Party Ownership

The Party package owns Party identity behaviour.

Customer, supplier, employee and contractor behaviour must extend Party through accounts, roles and relationships.

## Thing Ownership

Asset-oriented packages own Thing specialisations such as property, equipment, plant and inventory.

Property must not become a duplicate project or work model.

## Agreement Ownership

Commercial and contract packages own Agreement behaviour.

Sales, procurement, projects and finance may consume Agreement context but must not duplicate it.

## Work Ownership

Project and work packages own delivery behaviour.

Operations routes may expose Work execution but must not create separate work realities.

## Transaction Ownership

Finance and procurement packages own Transaction behaviour.

They must reference the source Party, Agreement, Work or Thing.

## Information Ownership

Documents and evidence packages own Information behaviour.

Information attaches to enterprise objects.

## Control Ownership

Compliance, workflows, audit and framework packages own Control behaviour.

Controls govern enterprise objects.

---

# Current Implementation Alignment Notes

The current codebase already contains some early CEDM foundations:

```text
party
person
organisation
party_role
party_relationship
address
party_address
client_account
property
property_unit
instruction
instruction_party_role
instruction_property
project
project_instruction
activity
observation
assessment
action
outcome
deliverable
fee_agreement
sales_invoice
workflow_definition
workflow_state
workflow_transition
workflow_action
workflow_instance
workflow_instance_state
business_event
ref_code_set
ref_code_value
```

However, the architecture has now moved beyond an instruction/activity-centred model.

The implementation must be reviewed against the broader ERP meta model and capability model.

Known areas requiring realignment:

```text
commercial lifecycle
agreement model
contract model
project model
work package model
task model
resource model
procurement model
finance model
asset model
document and evidence model
compliance and framework model
reporting model
```

---

# Governance Rule

If a future table, API, route, workflow, package or report cannot be mapped to:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

and then to a recognised canonical enterprise object, it must not be added until the model is deliberately updated.

The CEDM is the source of truth for object creation.

Routes and screens do not create object authority.

Packages and database tables must follow the CEDM, not the other way around.
