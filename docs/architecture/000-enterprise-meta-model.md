# PBM Enterprise Meta Model

## Purpose

This document defines the architectural root of Perspective Business Manager (PBM).

PBM is an enterprise operating system for a business. It gives a business one connected way to define itself, manage people, win work, deliver work, control money, manage suppliers, maintain evidence, govern risk and report performance.

PBM must not be designed as a set of disconnected modules. It must be designed from the real things a business manages and the jobs people need to do with those things.

The Enterprise Meta Model defines the smallest set of concepts from which PBM capabilities, business objects, workflows, routes, packages, reports, integrations and extensions are derived.

PBM starts with the question:

```text
What exists in a business?
```

Only after that does PBM define:

```text
What capabilities does the business need?
What business objects represent those capabilities?
What workspaces should users see?
What activities should those users perform?
What packages should implement the behaviour?
What workflows, documents, controls and reports are required?
```

This document is intended to stay stable. Later product, architecture and requirement documents may evolve, but they must remain explainable through this meta model.

## Product Context

PBM is built to cover the full operating needs of a business without exposing legacy ERP complexity to users.

A user should see clear business workspaces such as:

```text
Business Setup
People & Workforce
Clients & Commercial
Project Delivery
Procurement, Materials & Logistics
Operations & Planning
Finance & Control
Quality & Compliance
Assets, Property & Maintenance
Reporting, Documents & Admin
```

These workspaces are route doorways. They are not separate data worlds.

The internal model must remain unified:

- a client must not be recreated separately for commercial, project and finance use
- a supplier must not be recreated separately for procurement and finance use
- a person must not be recreated separately as contact, employee, approver and resource
- a project must not be recreated separately in delivery, finance, procurement and reporting
- an invoice must not become a different truth depending on which workspace views it
- a document must remain attached to the business object it evidences
- a control must govern the business process it relates to, not sit in a detached compliance silo

## Problem Statement

Enterprise systems become difficult when business concepts fragment across workspaces, teams or implementation packages.

Common failure patterns include:

- duplicate customer, client and supplier records
- separate commercial, delivery and finance versions of the same agreement
- project records disconnected from cost, revenue, procurement and reporting
- documents stored separately from the objects they evidence
- compliance records detached from operational delivery
- workflow rules implemented separately for each route
- reports that reconcile conflicting data instead of reporting a single source of truth
- industry extensions that create parallel object models instead of extending the core platform

PBM avoids these patterns by making every capability, object, route and package traceable to a small number of meta concepts.

## Enterprise Philosophy

PBM is built on these assumptions:

1. Most businesses manage the same fundamental things.
2. Industries differ mainly in how work is executed, governed, evidenced and reported.
3. Workspaces should be familiar to business users.
4. Data ownership should be unified and canonical.
5. Frameworks, standards and methods should configure behaviour rather than fork the platform.
6. Workspaces should present activity views, not own business data.
7. Packages should implement capabilities and object behaviour, not route-specific silos.
8. Workflow, events, documents, evidence, controls and reporting are cross-cutting platform capabilities.

## The Seven Meta Concepts

PBM derives enterprise behaviour from seven meta concepts:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

These are not final table names. They are architectural categories.

Every PBM business object must derive from one or more of these concepts.

## 1. Party

### Definition

A Party is any actor that can participate in the business.

A Party may be a person, organisation, team, legal entity, business unit, client, supplier, employee, contractor, partner, regulator, approver or other participant.

### Examples

```text
Person
Organisation
Legal entity
Business unit
Team
Client
Supplier
Subcontractor
Employee
Contractor
Partner
Regulator
Auditor
Approver
Stakeholder
```

### Purpose

Party provides the shared identity model for PBM.

The same organisation may be a client in one context, a supplier in another and a project stakeholder in another. The same person may be a contact, employee, resource, approver and document author.

PBM must therefore avoid separate client, supplier, employee and contact master records unless they are specialisations or roles of Party.

### Design Rules

1. A person is a Party.
2. An organisation is a Party.
3. A client is a Party in a client relationship.
4. A supplier is a Party in a supplier relationship.
5. An employee is a Party in an employment relationship.
6. A contractor is a Party in a contractual resource relationship.
7. A party role must not duplicate party identity.
8. Business-to-business and business-to-consumer journeys must use the same root party model.

## 2. Thing

### Definition

A Thing is anything that exists, can be identified, can be owned, managed, used, affected, maintained, delivered, inspected or referenced.

Thing is the broad concept for physical, digital, operational and information-bearing assets.

### Examples

```text
Asset
Property
Building
Land
Site
Room
Vehicle
Equipment
Plant
Machine
Infrastructure
Product
Component
System
Software asset
Information asset
Facility
Inventory item
Material
Tool
```

### Purpose

Thing provides the shared model for assets, property, equipment, products, materials and other managed items.

Different industries use different names, but the pattern is consistent: something exists, has identity, may have a location, may have ownership, may be worked on, may be used as a resource, may have documents, may have compliance obligations and may have lifecycle history.

### Design Rules

1. Property is a type of Thing.
2. Equipment is a type of Thing.
3. A product is a type of Thing.
4. A material or inventory item is a type of Thing.
5. A Thing may be the subject of Work.
6. A Thing may be used as a resource.
7. A Thing may have documents, evidence, controls and events.
8. A Thing must not be duplicated into separate asset, property, project and finance realities.

## 3. Agreement

### Definition

An Agreement is a formal or informal commitment, offer, promise, acceptance, commercial arrangement or obligation between parties.

Agreement covers pre-contract, contract, customer-side and supplier-side commitments.

### Examples

```text
Lead
Enquiry
Opportunity
Proposal
Quotation
Tender
Bid
Estimate
Contract
Framework agreement
Service agreement
Purchase order
Subcontract
Statement of work
Change order
Variation
Instruction
Engagement letter
```

### Purpose

Agreement provides the commercial and obligation model for PBM.

An agreement may authorise work, commit money, define obligations, create deliverables, trigger procurement, require compliance or establish rights.

### Design Rules

1. An opportunity is a potential Agreement context.
2. A proposal or quotation is an offered Agreement.
3. A contract is an accepted Agreement.
4. A purchase order is a supplier-side Agreement or commitment.
5. An instruction may be an Agreement, an authorisation of Work, or both.
6. Agreements may generate Work.
7. Agreements may generate Transactions.
8. Agreements may require Controls.
9. Agreements must remain linked to Parties.
10. Agreements must not be recreated separately in commercial, project, procurement and finance workspaces.

## 4. Work

### Definition

Work is effort performed to achieve an outcome.

Work may be project-based, operational, recurring, reactive, planned, internal, external, chargeable or non-chargeable.

### Examples

```text
Project
Programme
Portfolio
Work package
Activity
Task
Job
Work order
Service request
Inspection
Survey
Audit
Review
Assessment
Action
Deliverable
Milestone
Maintenance work
Production order
Investigation
```

### Purpose

Work is the operational delivery model of PBM.

Work is where the business plans, executes, controls and completes activity. Work may be created from Agreements, internal demand, compliance obligations, asset requirements, service requests or management decisions.

### Design Rules

1. A project is a type of Work.
2. A work package is a decomposition of Work.
3. An activity is executable Work.
4. A task is assignable Work.
5. A deliverable is output-focused Work or the output of Work, depending on context.
6. Work may affect Things.
7. Work may consume resources.
8. Work may generate Information.
9. Work may generate Transactions.
10. Work may be governed by Controls.
11. Work may have workflow.
12. Work may produce events.
13. Work must not be duplicated across project, operations, finance and reporting workspaces.

## 5. Transaction

### Definition

A Transaction is an economic event, planned economic amount, financial commitment, financial obligation, accounting movement or measurable financial consequence.

Transaction is used broadly to cover both actual financial events and financial planning or commitment objects.

### Examples

```text
Budget
Forecast
Estimate
Cost
Revenue
Commitment
Purchase request
Purchase order commitment
Supplier invoice
Sales invoice
Payment
Receipt
Credit note
Journal
Accrual
Prepayment
Tax
Work in progress item
Expense
Timesheet cost
Inventory movement
```

### Purpose

Transaction provides the financial and commercial measurement model for PBM.

Finance must not create a separate reality from projects, procurement, clients and delivery. Financial objects must attach to the Agreements, Work, Parties and Things that caused them.

### Design Rules

1. A budget is a planned Transaction context.
2. A forecast is a projected Transaction context.
3. A cost is an economic consequence.
4. Revenue is an economic consequence.
5. A sales invoice is a customer-facing Transaction.
6. A supplier invoice is a supplier-facing Transaction.
7. A payment settles a Transaction.
8. A purchase order may be an Agreement and may also create a financial commitment.
9. Transactions must reference their source context wherever possible.
10. Finance must consume shared objects, not recreate them.

## 6. Information

### Definition

Information is knowledge, evidence, record, communication or content captured, managed, controlled or produced by the business.

### Examples

```text
Document
Document revision
Record
Evidence
Drawing
Specification
Report
Certificate
Photograph
Video
Email
Correspondence
Template
Form
Calculation
Dataset
Knowledge article
Decision record
Meeting minutes
Transmittal
```

### Purpose

Information provides the document, evidence, records and knowledge model for PBM.

Information must attach to the business objects it supports. A document is not an island. Evidence is not a parallel workflow. Records exist to prove something about Parties, Things, Agreements, Work, Transactions or Controls.

### Design Rules

1. Documents attach to enterprise objects.
2. Evidence attaches to enterprise objects.
3. Records preserve business facts.
4. Templates generate repeatable information structures.
5. Information may require workflow and approval.
6. Information may satisfy Controls.
7. Information may be produced by Work.
8. Information may support Transactions.
9. Information must not become detached from business context.

## 7. Control

### Definition

A Control is a mechanism used to govern, constrain, approve, assure, evidence, improve or regulate behaviour.

Control includes governance, risk, compliance, quality, workflow, policy, assurance and framework concepts.

### Examples

```text
Risk
Issue
Change
Control
Compliance requirement
Compliance framework
Standard
Policy
Procedure
Workflow
Approval
Decision
Audit
Quality check
Non-conformance
Corrective action
Preventive action
Gate review
Delegation of authority
Framework
Methodology
KPI
```

### Purpose

Control provides the governance model for PBM.

Controls ensure that work is authorised, compliant, evidenced, reviewed, safe, auditable and improved over time.

### Design Rules

1. A risk is a Control concern.
2. An issue is a Control concern.
3. A change is a Control concern.
4. A policy is a Control.
5. A workflow may implement a Control.
6. An approval may satisfy a Control.
7. A quality check is a Control.
8. Controls may apply to Parties, Things, Agreements, Work, Transactions or Information.
9. Controls must be connected to the work and records they govern.

## Cross-Cutting Concepts

The seven meta concepts are supported by cross-cutting platform concepts.

```text
Workflow
Event
State
Role
Permission
Document
Evidence
Comment
Notification
Audit trail
Integration
Report
Dashboard
Configuration
Reference data
```

These are not separate business silos. They apply across PBM.

For example:

- a Party can have roles and permissions
- Work can have workflow, state, events, documents and evidence
- a Transaction can require approval and audit trail
- a Control can require evidence and reporting
- Information can trigger notifications and retention rules

## Workspaces, Packages and Data Ownership

PBM separates three concerns:

```text
Workspace = where the user does a job
Package = where capability behaviour is implemented
Data spine = where the business truth is held
```

A workspace does not own records.

A package implements capability behaviour and object operations.

The data spine holds integrated records that may be viewed, used or updated from multiple workspaces.

Example:

```text
supplier_invoice
```

May be used by:

```text
Procurement:
    Did the invoice match the purchase order and received service?

Finance:
    Is the invoice approved, due, paid and posted correctly?

Projects:
    Has this project incurred actual cost?

Reporting:
    What does this invoice do to margin, cash exposure and supplier performance?
```

Same record. Different job. Different workspace view.

## Traceability Rule

Every PBM feature must be traceable through this chain:

```text
Meta concept
    -> business object
        -> enterprise capability
            -> workspace activity
                -> route
                    -> package/service
                        -> table/view
                            -> report/control
```

If a feature cannot be traced through this chain, it should be questioned before being built.

## Public Language Rule

PBM documentation, UI and route names must use PBM product language.

Use:

```text
enterprise capability
business workspace
business object
activity
route doorway
activity view
shared data spine
integrated record
operating model
coverage audit
```

Avoid exposing legacy ERP module labels as PBM identity, navigation or user-facing language.

External ERP capability lists may be used as completeness references during analysis, but they do not define PBM's product language.

## Summary

PBM is not a collection of disconnected modules.

PBM is a connected enterprise operating model built from seven stable concepts:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

Everything else in the platform must remain explainable through these concepts.
