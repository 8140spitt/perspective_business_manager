# Business Object Catalogue

## Purpose

The Business Object Catalogue is the authoritative enterprise object dictionary for Perspective Business Manager (PBM).

It defines what each enterprise object means, which meta concept it derives from, which capability it supports, how it relates to other objects, whether it should support workflow/events/documents/frameworks, and how far the current implementation has progressed.

This catalogue is not a database schema.

It is not a route map.

It is not a package map.

It is the enterprise language that database schema, packages, routes, APIs, workflows, reports and integrations must align to.

## Source Architecture

This catalogue derives from:

- [000-enterprise-meta-model.md](./000-enterprise-meta-model.md)
- [001-enterprise-capability-model.md](./001-enterprise-capability-model.md)
- [001-canonical-enterprise-data-model.md](./001-canonical-enterprise-data-model.md)

## Object Status Values

```text
Implemented              Object exists materially in schema and/or package implementation.
Partially Implemented    Object exists but is incomplete, thin, route-led or awaiting broader ERP alignment.
Planned                  Object is required by the architecture but not yet implemented.
Extension                Object belongs primarily to a framework or industry extension.
Deprecated / Review      Object may be replaced, merged, renamed or reclassified.
```

## Object Template

Each object should eventually be documented using this structure:

```text
Name
Meta Concept
Primary Capability
Status
Definition
Purpose
Lifecycle
Key Relationships
Documents / Evidence
Workflow
Events
Framework Support
Reporting Usage
Current Implementation
Future Implementation Notes
```

## Meta Concepts

All objects must map to one or more of:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

---

# 1. Party Domain

## Party

Meta Concept: Party

Primary Capability: Customer & Commercial, People & Workforce, Supply Chain & Procurement, Platform Administration

Status: Implemented

Definition: The root identity object for any actor participating in the enterprise.

Purpose: Provides one shared identity model for people, organisations, customers, suppliers, employees, contractors, regulators, partners and stakeholders.

Lifecycle: created, classified, related, activated, suspended, archived.

Key Relationships:

- Party may specialise into Person or Organisation.
- Party may hold Party Roles.
- Party may relate to other Parties.
- Party may have Client Accounts, Supplier Accounts, Employee Records or Contractor Records.
- Party may participate in Agreements.
- Party may perform or receive Work.
- Party may create or receive Transactions.
- Party may own or use Things.

Documents / Evidence: onboarding records, correspondence, identity evidence, contracts, compliance documents.

Workflow: optional for onboarding, approval, due diligence and deactivation.

Events: party created, party updated, role assigned, relationship created, party archived.

Framework Support: client-specific onboarding, supplier qualification, workforce compliance.

Reporting Usage: customer analysis, supplier analysis, workforce analysis, stakeholder analysis.

Current Implementation:

- `party`
- `party_role`
- `party_relationship`

Future Notes: Party must remain the root identity model. Do not create separate master identity tables for customers, suppliers or employees.

## Person

Meta Concept: Party

Primary Capability: Customer & Commercial, People & Workforce

Status: Implemented

Definition: A human being represented as a Party specialisation.

Purpose: Supports individual customers, contacts, employees, contractors, stakeholders, approvers and representatives.

Lifecycle: created, maintained, linked to roles, archived.

Key Relationships:

- Person belongs to Party.
- Person may be linked to Organisations through Party Relationships.
- Person may be a user, employee, contact, contractor or customer depending on context.

Current Implementation:

- `person`

Future Notes: Person should not duplicate User or Employee. User and Employee are context-specific extensions of Person / Party.

## Organisation

Meta Concept: Party

Primary Capability: Customer & Commercial, Supply Chain & Procurement, People & Workforce

Status: Implemented

Definition: A legal, trading, operational or organisational entity represented as a Party specialisation.

Purpose: Supports B2B customers, suppliers, contractors, partners, regulators, internal departments and business units.

Lifecycle: created, classified, linked, active, inactive, archived.

Key Relationships:

- Organisation belongs to Party.
- Organisation may have Client Account, Supplier Account or internal Business Unit roles.
- Organisation may employ or represent Persons.

Current Implementation:

- `organisation`

Future Notes: Organisation should support legal entity, trading name, registration, tax and hierarchy attributes through extensions as needed.

## Client Account

Meta Concept: Party / Agreement

Primary Capability: Customer & Commercial, Finance & Accounting

Status: Partially Implemented

Definition: A commercial customer relationship between the enterprise and a Party.

Purpose: Represents the customer account layer without duplicating Party identity. A Party may exist before becoming a client.

Lifecycle: prospect, onboarding, active, suspended, closed, archived.

Key Relationships:

- Client Account belongs to Party.
- Client Account may have Opportunities, Proposals, Contracts, Projects and Sales Invoices.
- Client Account may have billing, representative and contact relationships.

Current Implementation:

- `client_account`
- `src/lib/packages/client-accounts`

Future Notes: Must support organisation-led and individual-led customers, bill-to parties, intermediaries and representatives.

## Supplier Account

Meta Concept: Party / Agreement

Primary Capability: Supply Chain & Procurement, Finance & Accounting

Status: Planned

Definition: A supplier or subcontractor commercial relationship with a Party.

Purpose: Supports procurement, subcontracting, supplier qualification, purchase orders and purchase invoices.

Lifecycle: onboarding, qualified, active, suspended, closed, archived.

Key Relationships:

- Supplier Account belongs to Party.
- Supplier Account may have RFQs, Supplier Quotes, Purchase Orders, Subcontracts and Purchase Invoices.

Future Notes: Must reuse Party identity and avoid separate supplier master duplication.

## Employee Record

Meta Concept: Party

Primary Capability: People & Workforce

Status: Planned

Definition: Employment relationship between a Person and the enterprise.

Purpose: Supports workforce management, HR, competence, allocation, timesheets and cost rates.

Key Relationships:

- Employee Record belongs to Person / Party.
- Employee may be allocated as a Resource to Work.

Future Notes: Employee is not a separate identity root.

## Contractor Record

Meta Concept: Party

Primary Capability: People & Workforce, Supply Chain & Procurement

Status: Planned

Definition: Contractor workforce relationship with a Party.

Purpose: Supports external workforce allocation, competence, onboarding and compliance.

Future Notes: Must distinguish contractor as workforce resource from supplier as commercial organisation where needed.

## Team

Meta Concept: Party

Primary Capability: People & Workforce, Project & Delivery

Status: Planned

Definition: A group of Parties used for organisation, delivery, approval or allocation.

Purpose: Supports project teams, departments, approval groups and resource pools.

Future Notes: Team may be modelled as Party or a Party grouping depending on implementation design.

---

# 2. Thing Domain

## Thing / Asset

Meta Concept: Thing

Primary Capability: Assets, Property & Facilities; Project & Delivery; Operations & Work Execution

Status: Planned

Definition: A general object that exists, can be managed, worked on, used, maintained, inspected, delivered or referenced.

Purpose: Provides the general asset model for property, equipment, plant, vehicles, products, materials and digital assets.

Lifecycle: registered, active, maintained, inactive, disposed, archived.

Key Relationships:

- Thing may be affected by Work.
- Thing may be used as a Resource.
- Thing may have Documents, Evidence, Controls, Events and Transactions.

Future Notes: Property currently exists, but PBM needs a broader Asset / Thing model.

## Property

Meta Concept: Thing

Primary Capability: Assets, Property & Facilities; Project & Delivery

Status: Implemented / Needs Generalisation

Definition: A property, building, site or built-environment asset context.

Purpose: Supports work performed on or related to property and built assets.

Lifecycle: registered, active, inactive, archived.

Key Relationships:

- Property may have Address.
- Property may have Property Units.
- Property may relate to Parties through ownership, occupancy, management or interest roles.
- Property may be linked to Agreements and Work.

Current Implementation:

- `property`
- `property_unit`
- `property_party_role`
- `src/lib/packages/properties`

Future Notes: Decide whether Property remains its own package or becomes an Asset specialisation.

## Address

Meta Concept: Thing / Information

Primary Capability: Customer & Commercial; Assets, Property & Facilities

Status: Implemented

Definition: A postal, physical or geographic address.

Purpose: Supports party addresses, property addresses, site addresses and location context.

Current Implementation:

- `address`
- `party_address`

Future Notes: May need generalised Location and geospatial support.

## Location

Meta Concept: Thing

Primary Capability: Assets, Property & Facilities; Operations

Status: Planned

Definition: A physical, geospatial, operational or logical location.

Purpose: Supports sites, stores, regions, rooms, GIS, work locations and asset placement.

## Equipment

Meta Concept: Thing

Primary Capability: Assets, Resources, Operations

Status: Planned

Definition: Equipment used, maintained, allocated or worked on.

Purpose: Supports equipment asset management and resource allocation.

## Plant

Meta Concept: Thing

Primary Capability: Assets, Resources, Procurement

Status: Planned

Definition: Plant used in work execution, operations or maintenance.

## Vehicle

Meta Concept: Thing

Primary Capability: Assets, Resources

Status: Planned

Definition: A managed vehicle.

## Material

Meta Concept: Thing

Primary Capability: Supply Chain & Procurement, Operations

Status: Planned

Definition: Material consumed or used in work.

## Inventory Item

Meta Concept: Thing

Primary Capability: Supply Chain & Procurement, Finance

Status: Planned

Definition: An item held in stock or inventory.

## Software Asset

Meta Concept: Thing

Primary Capability: Information, Platform Administration, Assets

Status: Planned

Definition: A software licence, application, environment or digital asset.

---

# 3. Agreement Domain

## Lead

Meta Concept: Agreement

Primary Capability: Customer & Commercial

Status: Planned

Definition: Early-stage potential commercial interest.

Purpose: Captures weak or unqualified sales demand before it becomes an Enquiry or Opportunity.

## Enquiry

Meta Concept: Agreement

Primary Capability: Customer & Commercial

Status: Planned

Definition: A request for information, price, proposal, support or service.

Purpose: Captures incoming demand before qualification.

## Opportunity

Meta Concept: Agreement

Primary Capability: Customer & Commercial

Status: Planned

Definition: A qualified potential commercial outcome.

Purpose: Supports pipeline, forecasting, qualification and conversion to Proposal, Quotation, Tender or Contract.

Lifecycle: identified, qualified, proposal, negotiation, won, lost, abandoned.

Relationships:

- Opportunity belongs to Client Account or Party.
- Opportunity may relate to Things.
- Opportunity may generate Proposal, Quotation, Tender or Contract.

## Proposal

Meta Concept: Agreement

Primary Capability: Customer & Commercial

Status: Planned

Definition: An offer to perform work, provide goods or deliver services.

Purpose: Records scope, price, assumptions, exclusions, deliverables and acceptance requirements.

## Quotation

Meta Concept: Agreement / Transaction

Primary Capability: Customer & Commercial, Finance

Status: Planned

Definition: A priced offer.

Purpose: Supports pricing and acceptance into Contract or Project.

## Tender / Bid

Meta Concept: Agreement

Primary Capability: Customer & Commercial

Status: Planned

Definition: Formal competitive procurement or response process.

Purpose: Supports tender submissions, bid/no-bid decisions, scoring, clarifications and award.

## Contract

Meta Concept: Agreement

Primary Capability: Customer & Commercial, Project & Delivery, Finance

Status: Planned

Definition: An accepted agreement between parties.

Purpose: Provides commercial authority for Work, billing, obligations, deliverables and controls.

Lifecycle: draft, issued, negotiated, accepted, active, varied, completed, terminated, archived.

Relationships:

- Contract belongs to Parties.
- Contract may create Project or Work.
- Contract may govern Transactions.
- Contract may require Documents, Controls and Compliance.

## Framework Agreement

Meta Concept: Agreement

Primary Capability: Customer & Commercial, Procurement

Status: Planned

Definition: A reusable agreement structure under which multiple contracts, orders or projects may be created.

## Instruction

Meta Concept: Agreement / Work

Primary Capability: Customer & Commercial, Project & Delivery, Operations

Status: Implemented / Review

Definition: A request, authorisation, trigger or instruction to perform work.

Purpose: Existing object from earlier consultancy-centred model. Still valid, but must be reclassified under Agreement or Work Authorisation rather than treated as the ERP centre.

Current Implementation:

- `instruction`
- `instruction_party_role`
- `instruction_property`
- `src/lib/packages/instructions`

Future Notes: Decide whether Instruction remains canonical, becomes a specialised Agreement, or becomes a Work Request / Authorisation pattern.

## Purchase Order

Meta Concept: Agreement / Transaction

Primary Capability: Supply Chain & Procurement, Finance

Status: Planned

Definition: Supplier-side commitment to buy goods or services.

Purpose: Authorises supplier fulfilment and creates financial commitment.

## Change Order / Variation

Meta Concept: Agreement / Control

Primary Capability: Project & Delivery, Customer & Commercial, Procurement, Finance

Status: Planned

Definition: Agreed change to scope, time, price, deliverables or obligations.

---

# 4. Work Domain

## Portfolio

Meta Concept: Work

Primary Capability: Strategy & Governance, Project & Delivery

Status: Planned

Definition: Collection of programmes, projects and work aligned to strategic objectives.

## Programme

Meta Concept: Work

Primary Capability: Project & Delivery

Status: Planned

Definition: Coordinated group of projects and related work managed to achieve outcomes or benefits.

## Project

Meta Concept: Work

Primary Capability: Project & Delivery, Finance, Resources, Procurement, Compliance, Reporting

Status: Partially Implemented / Underdeveloped

Definition: Controlled delivery container used to plan, execute, control and complete authorised work.

Purpose: Project should be the central delivery object after commercial or internal authorisation.

Lifecycle: proposed, initiated, planned, active, controlled, completed, closed, archived.

Key Relationships:

- Project may originate from Opportunity, Proposal, Contract, Instruction, Service Request or internal approval.
- Project may relate to Client Account, Parties and Things.
- Project may contain Work Packages, Activities, Tasks and Deliverables.
- Project may have Budgets, Costs, Purchase Orders, Invoices and WIP.
- Project may have Documents, Evidence, Risks, Issues, Changes, Controls and Frameworks.

Current Implementation:

- `project`
- `project_instruction`

Future Notes: Project must be elevated from secondary object to core ERP delivery container.

## Work Package

Meta Concept: Work

Primary Capability: Project & Delivery

Status: Planned

Definition: A manageable subdivision of project or programme scope.

Purpose: Supports planning, delegation, control, costing and delivery structure.

## Activity

Meta Concept: Work

Primary Capability: Operations & Work Execution

Status: Implemented / Needs Repositioning

Definition: A unit of executable work.

Purpose: Supports operational execution, inspections, audits, reviews, investigations, workshops and technical work.

Current Implementation:

- `activity`
- `activity_area`
- `src/lib/packages/activities`

Future Notes: Activity is valid but must not be treated as the centre of the ERP.

## Task

Meta Concept: Work

Primary Capability: Project & Delivery, Operations, Resources

Status: Planned

Definition: Assignable piece of work.

Purpose: Supports assignment, progress tracking, resource planning and execution.

## Job / Work Order

Meta Concept: Work

Primary Capability: Operations & Work Execution

Status: Planned

Definition: Operational work order or job.

Purpose: Supports maintenance, service delivery, field work and repeatable operational work.

## Service Request

Meta Concept: Work / Agreement

Primary Capability: Operations, Customer & Commercial

Status: Planned

Definition: Request for service or operational support.

## Milestone

Meta Concept: Work

Primary Capability: Project & Delivery

Status: Planned

Definition: Significant point in a work lifecycle.

## Deliverable

Meta Concept: Work / Information / Agreement

Primary Capability: Project & Delivery, Customer & Commercial, Documents

Status: Implemented / Needs Expansion

Definition: Output to be produced, submitted, accepted or delivered.

Current Implementation:

- `deliverable`

Future Notes: Deliverables should link to Project, Agreement, Work Package, Activity, Documents, acceptance, invoicing and frameworks.

## Observation

Meta Concept: Work / Information

Primary Capability: Operations, Compliance, Quality

Status: Implemented

Definition: Something identified during work.

Current Implementation:

- `observation`

## Assessment

Meta Concept: Work / Control

Primary Capability: Operations, Compliance, Quality, Risk

Status: Implemented

Definition: Evaluation of an observation, condition, issue, risk, defect or situation.

Current Implementation:

- `assessment`

## Action

Meta Concept: Work / Control

Primary Capability: Operations, Compliance, Quality, Risk

Status: Implemented

Definition: Required, recommended or agreed response.

Current Implementation:

- `action`

## Outcome

Meta Concept: Work / Information

Primary Capability: Operations, Project & Delivery, Reporting

Status: Implemented

Definition: Result of Work, Action or Activity.

Current Implementation:

- `outcome`

---

# 5. Transaction Domain

## Budget

Meta Concept: Transaction

Primary Capability: Finance, Project & Delivery

Status: Planned

Definition: Planned financial allocation.

## Forecast

Meta Concept: Transaction

Primary Capability: Finance, Reporting

Status: Planned

Definition: Projected financial outcome.

## Cost

Meta Concept: Transaction

Primary Capability: Finance, Projects, Procurement

Status: Planned

Definition: Planned, committed or actual cost.

## Revenue

Meta Concept: Transaction

Primary Capability: Finance, Customer & Commercial

Status: Planned

Definition: Planned, recognised or actual income.

## Commitment

Meta Concept: Transaction / Agreement

Primary Capability: Finance, Procurement

Status: Planned

Definition: Financial commitment, often created by Purchase Order or Contract.

## Fee Agreement

Meta Concept: Transaction / Agreement

Primary Capability: Finance, Customer & Commercial

Status: Implemented / Review

Definition: Fee arrangement governing billing and revenue.

Current Implementation:

- `fee_agreement`

Future Notes: Review relationship to Proposal, Contract, Project and Sales Invoice.

## Sales Invoice

Meta Concept: Transaction

Primary Capability: Finance

Status: Implemented / Thin

Definition: Customer-facing invoice.

Current Implementation:

- `sales_invoice`

## Purchase Invoice

Meta Concept: Transaction

Primary Capability: Finance, Procurement

Status: Planned

Definition: Supplier-facing invoice.

## Payment

Meta Concept: Transaction

Primary Capability: Finance

Status: Planned

Definition: Payment made or received.

## Receipt

Meta Concept: Transaction

Primary Capability: Finance

Status: Planned

Definition: Money received.

## Credit Note

Meta Concept: Transaction

Primary Capability: Finance

Status: Planned

Definition: Credit adjustment.

## Journal Entry

Meta Concept: Transaction

Primary Capability: Finance

Status: Planned

Definition: Accounting journal.

## WIP Item

Meta Concept: Transaction

Primary Capability: Finance, Project & Delivery

Status: Planned

Definition: Work-in-progress financial record.

## Expense

Meta Concept: Transaction

Primary Capability: Finance, People & Workforce, Projects

Status: Planned

Definition: Business or workforce expense.

---

# 6. Information Domain

## Document

Meta Concept: Information

Primary Capability: Information, Documents & Knowledge

Status: Planned

Definition: Controlled information object.

Purpose: Provides document control across all enterprise objects.

## Document Revision

Meta Concept: Information

Primary Capability: Documents

Status: Planned

Definition: Version or revision of a Document.

## Record

Meta Concept: Information

Primary Capability: Documents, Compliance

Status: Planned

Definition: Retained business record.

## Evidence Item

Meta Concept: Information

Primary Capability: Documents, Compliance, Operations

Status: Planned / Partially Represented

Definition: Supporting evidence attached to an enterprise object.

Future Notes: Evidence should support Activity, Observation, Assessment, Action, Outcome, Project, Compliance Requirement, Audit and more.

## Correspondence

Meta Concept: Information

Primary Capability: Customer & Commercial, Documents

Status: Planned

Definition: Communication record such as email, letter or message.

## Template

Meta Concept: Information / Control

Primary Capability: Documents, Frameworks, Administration

Status: Planned

Definition: Reusable structure for generating information.

## Report

Meta Concept: Information

Primary Capability: Reporting & Analytics

Status: Planned

Definition: Produced or generated information output.

## Certificate

Meta Concept: Information / Control

Primary Capability: Compliance, Documents

Status: Planned

Definition: Formal certificate or attestation.

## Drawing / Specification

Meta Concept: Information

Primary Capability: Documents, Assets, Projects

Status: Planned

Definition: Technical information object.

## Knowledge Article

Meta Concept: Information

Primary Capability: Information & Knowledge

Status: Planned

Definition: Knowledge-base content.

---

# 7. Control Domain

## Risk

Meta Concept: Control

Primary Capability: Compliance, Risk & Quality; Project & Delivery

Status: Planned

Definition: Uncertain event or condition that may affect objectives.

## Issue

Meta Concept: Control

Primary Capability: Compliance, Risk & Quality; Project & Delivery

Status: Planned

Definition: Known problem or matter requiring management.

## Change

Meta Concept: Control / Agreement / Work

Primary Capability: Project & Delivery, Governance, Finance

Status: Planned

Definition: Controlled change to scope, time, cost, design, requirement, agreement, work or information.

## Compliance Requirement

Meta Concept: Control

Primary Capability: Compliance, Risk & Quality

Status: Planned

Definition: Requirement that must be satisfied.

## Control

Meta Concept: Control

Primary Capability: Compliance, Governance, Quality

Status: Planned

Definition: Mechanism used to govern or assure behaviour.

## Audit

Meta Concept: Control / Work

Primary Capability: Compliance, Risk & Quality

Status: Planned

Definition: Review, assurance or audit activity.

## Non-Conformance

Meta Concept: Control

Primary Capability: Quality, Compliance

Status: Planned

Definition: Failure to meet a requirement.

## Corrective Action

Meta Concept: Control / Work

Primary Capability: Quality, Compliance, Operations

Status: Planned / May Reuse Action

Definition: Action to correct a non-conformance, issue or defect.

## Workflow Definition

Meta Concept: Control

Primary Capability: Workflow & Automation, Platform Administration

Status: Implemented

Definition: Metadata defining lifecycle behaviour.

Current Implementation:

- `workflow_definition`
- `workflow_state`
- `workflow_transition`
- `workflow_action`

## Workflow Instance

Meta Concept: Control

Primary Capability: Workflow & Automation

Status: Implemented

Definition: Live workflow attached to a business object.

Current Implementation:

- `workflow_instance`
- `workflow_instance_state`

## Approval

Meta Concept: Control

Primary Capability: Governance, Workflow

Status: Planned

Definition: Formal approval decision or approval step.

## Policy

Meta Concept: Control

Primary Capability: Strategy & Governance, Compliance

Status: Planned

Definition: Governance rule or policy.

## Framework

Meta Concept: Control

Primary Capability: Framework & Extension Management, Compliance, Project & Delivery

Status: Planned

Definition: A methodology, standard or governance framework applied to business objects.

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
- Client-specific governance

Future Notes: Framework is one of PBM's key differentiators and must be implemented as configurable metadata, not hard-coded industry logic.

---

# 8. Platform Domain

## Business Event

Meta Concept: Cross-Cutting

Primary Capability: Integration & Automation, Audit, Reporting

Status: Implemented

Definition: Immutable record of business fact, action or state change.

Current Implementation:

- `business_event`

## Audit Event

Meta Concept: Control / Information

Primary Capability: Compliance, Platform Administration

Status: Planned

Definition: Record of user, system or security-relevant action.

## Reference Code Set

Meta Concept: Cross-Cutting Configuration

Primary Capability: Platform Administration

Status: Implemented

Definition: Controlled set of reference codes.

Current Implementation:

- `ref_code_set`
- `ref_code_value`

## User

Meta Concept: Party / Control

Primary Capability: Platform Administration

Status: Planned / Auth Dependent

Definition: Authenticated system user.

## Role

Meta Concept: Control

Primary Capability: Platform Administration

Status: Planned / Auth Dependent

Definition: Security or business role.

## Permission

Meta Concept: Control

Primary Capability: Platform Administration

Status: Planned / Auth Dependent

Definition: Authorisation grant.

## Numbering Scheme

Meta Concept: Control / Configuration

Primary Capability: Platform Administration

Status: Planned

Definition: Configurable identifier generation rule.

## Integration Endpoint

Meta Concept: Information / Control

Primary Capability: Integration & Automation

Status: Planned

Definition: External integration point.

## Automation Rule

Meta Concept: Control

Primary Capability: Integration & Automation, Workflow

Status: Planned

Definition: Configured automation trigger and action.

---

# Catalogue Governance Rules

1. No new enterprise object may be added without mapping to a meta concept.
2. No new table may be added without mapping to a catalogue object, relationship, event, workflow state or configuration object.
3. No route may imply ownership of an object.
4. No package may duplicate an object owned by another package.
5. Framework-specific objects must extend the core model rather than fork it.
6. Documents, evidence, workflow, events and controls should be considered for every major object.
7. Object status must be reviewed as the implementation evolves.

# Immediate Catalogue Gaps

The most important missing or underdeveloped objects are:

```text
Opportunity
Proposal
Contract
Purchase Order
Project
Work Package
Task
Resource Allocation
Supplier Account
Budget
Cost
Purchase Invoice
Document
Framework
Compliance Requirement
Risk
Issue
Change
```

# Summary

This catalogue is the PBM enterprise dictionary.

It should be used to decide:

- what objects exist
- what packages should own
- what routes should expose
- what workflows should govern
- what reports should measure
- what frameworks may extend

The implementation should now be reviewed and refactored against this catalogue object by object.
