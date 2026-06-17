# Enterprise Meta Model

## Purpose

This document defines the architectural root of Perspective Business Manager (PBM).

The Enterprise Meta Model defines the smallest set of irreducible concepts from which all PBM capabilities, business objects, workflows, routes, packages, reports, integrations and framework extensions are derived.

PBM must not start from application modules. Traditional ERP systems often begin with modules such as CRM, Projects, Finance, Procurement, HR and Documents. Those modules then grow their own data models, configuration patterns, security models and reporting structures. Over time this creates duplication, integration cost, implementation complexity and inconsistent business truth.

PBM starts from a different position.

PBM starts with the question:

```text
What exists in an enterprise?
```

Only after that does PBM define:

```text
What capabilities does the enterprise need?
What business objects represent those capabilities?
What workspaces should users see?
What packages should implement the behaviour?
What frameworks can be applied?
What workflows, events, documents, controls and reports are required?
```

This document is intended to be stable. Later architecture documents may evolve, but they must remain explainable through this meta model.

## Product Context

Perspective Business Manager is an Enterprise Resource Planning platform designed to provide one coherent system for managing every major business function.

PBM should cover the enterprise breadth expected from common ERP platforms while avoiding fragmented module-owned data models.

The platform should feel familiar to users of SAP, Oracle, Microsoft Dynamics, IFS, Infor, NetSuite, Sage, Epicor, Odoo and similar systems, but it should be architecturally simpler and more coherent underneath.

The user may see workspaces such as:

```text
Customers
Sales
Projects
Operations
Resources
Procurement
Finance
Assets
Documents
Compliance
Reporting
Administration
```

The internal model must remain unified.

A customer must not be recreated separately in CRM, projects and finance.

A project must not be recreated separately in delivery, finance, procurement and reporting.

A document must not be detached from the object it evidences.

A compliance requirement must not become a separate industry-specific application.

## Problem Statement

Large ERP systems become difficult because they often allow business concepts to fragment across modules.

Common failure patterns include:

- duplicate customer records
- duplicated supplier and customer concepts
- separate sales, project and finance versions of the same agreement
- project records that are disconnected from cost, revenue and procurement
- document systems that are bolted on rather than embedded
- compliance processes that live outside operational delivery
- workflow implementations that are specific to individual modules
- reports that reconcile conflicting data rather than reporting a single source of truth
- industry extensions that create parallel object models instead of extending the core platform

PBM must avoid these patterns by making every capability, object and route traceable back to a small number of meta concepts.

## Enterprise Philosophy

PBM is built on these assumptions:

1. Most enterprises manage the same fundamental things.
2. Industries differ primarily in how work is executed, governed, evidenced and reported.
3. Business capabilities should be familiar to users.
4. Internal data ownership should be unified and canonical.
5. Frameworks, standards and methodologies should configure behaviour rather than fork the platform.
6. Workspaces should present business journeys, not own business data.
7. Packages should implement enterprise capabilities and object behaviours, not route-specific logic.
8. Workflow, events, documents, evidence, compliance and reporting are cross-cutting platform capabilities.

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

These are not final table names.

They are architectural categories.

Every business object in PBM must derive from one or more of these concepts.

## 1. Party

### Definition

A Party is any actor that can participate in the enterprise.

A Party may be a person, organisation, team, legal entity, business unit, customer, supplier, employee, contractor, partner, regulator or other participant.

### Examples

```text
Person
Organisation
Team
Department
Customer
Client Account
Supplier
Subcontractor
Employee
Contractor
Partner
Regulator
Auditor
Approver
Stakeholder
Competitor
```

### Purpose

Party provides the shared identity model for the platform.

The same party may appear in many workspaces and relationships. For example, an organisation may be a customer in one context, a supplier in another, a partner in another and a stakeholder in another.

PBM must therefore avoid separate customer, supplier, employee and contact master models unless they are specialisations or roles of Party.

### Design Rules

1. A person is a Party.
2. An organisation is a Party.
3. A customer is a Party in a customer relationship.
4. A supplier is a Party in a supplier relationship.
5. An employee is a Party in an employment relationship.
6. A contractor is a Party in a contractual resource relationship.
7. A party role must not duplicate party identity.
8. B2B and B2C journeys must use the same root party model.

## 2. Thing

### Definition

A Thing is anything that exists, can be identified, can be owned, managed, used, affected, maintained, delivered, inspected or referenced.

Thing is the broad meta concept for physical, digital, operational and information-bearing assets.

### Examples

```text
Asset
Property
Building
Land
Site
Room
Floor
Vehicle
Equipment
Plant
Machine
Ship
Infrastructure
Product
Component
System
Software Asset
Information Asset
Facility
Inventory Item
Material
Tool
```

### Purpose

Thing provides the shared model for assets, property, equipment, products and other managed items.

Different industries call these things different names, but the enterprise pattern is consistent: something exists, has identity, may have location, may have ownership, may be worked on, may be used as a resource, may have documents, may have compliance obligations and may have lifecycle history.

### Design Rules

1. Property is a type of Thing.
2. Equipment is a type of Thing.
3. Plant is a type of Thing.
4. A product is a type of Thing.
5. A software asset may be a Thing.
6. A Thing may be the subject of Work.
7. A Thing may be used as a Resource.
8. A Thing may have Documents, Evidence, Controls and Events.
9. A Thing must not be duplicated into separate asset, property, project and finance realities.

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
Framework Agreement
Service Agreement
Purchase Order
Subcontract
Statement of Work
Change Order
Variation
Instruction
Engagement Letter
```

### Purpose

Agreement provides the commercial and obligation model for the platform.

An agreement may authorise work, commit money, define obligations, create deliverables, trigger procurement, require compliance or establish commercial rights.

### Design Rules

1. An Opportunity is a potential Agreement context.
2. A Proposal or Quotation is an offered Agreement.
3. A Contract is an accepted Agreement.
4. A Purchase Order is a supplier-side Agreement or commitment.
5. An Instruction may be an Agreement, an authorisation of Work, or both depending on business context.
6. Agreements may generate Work.
7. Agreements may generate Transactions.
8. Agreements may require Controls.
9. Agreements must remain linked to Parties.
10. Agreements must not be recreated separately in sales, projects, procurement and finance.

## 4. Work

### Definition

Work is effort performed to achieve an outcome.

Work may be commercial, operational, project-based, recurring, reactive, planned, internal, external, chargeable or non-chargeable.

### Examples

```text
Project
Programme
Portfolio
Work Package
Activity
Task
Job
Work Order
Service Request
Inspection
Survey
Audit
Review
Assessment
Action
Deliverable
Milestone
Maintenance Work
Manufacturing Order
Implementation
Investigation
```

### Purpose

Work is the operational delivery model of PBM.

Work is where the enterprise plans, executes, controls and completes activity.

Work may be created from Agreements, internal demand, compliance obligations, asset requirements, service requests or management decisions.

### Design Rules

1. A Project is a type of Work.
2. A Work Package is a decomposition of Work.
3. An Activity is executable Work.
4. A Task is assignable Work.
5. A Deliverable is output-focused Work or the output of Work, depending on context.
6. Work may affect Things.
7. Work may consume Resources.
8. Work may generate Information.
9. Work may generate Transactions.
10. Work may be governed by Controls.
11. Work may have Workflow.
12. Work may produce Events.
13. Work must not be duplicated across project, operations, finance and reporting modules.

## 5. Transaction

### Definition

A Transaction is an economic event, planned economic amount, financial commitment, financial obligation, accounting movement or measurable financial consequence.

Transaction is used broadly here to cover both actual financial transactions and financial planning / commitment objects.

### Examples

```text
Budget
Forecast
Estimate
Cost
Revenue
Commitment
Purchase Requisition
Purchase Order Commitment
Purchase Invoice
Sales Invoice
Payment
Receipt
Credit Note
Journal
Accrual
Prepayment
Tax
WIP Item
Expense
Timesheet Cost
Inventory Movement
```

### Purpose

Transaction provides the financial and commercial measurement model for PBM.

Finance must not create a separate reality from projects, procurement, customers and delivery. Financial objects must attach to the Agreements, Work, Parties and Things that caused them.

### Design Rules

1. A Budget is a planned Transaction context.
2. A Forecast is a projected Transaction context.
3. A Cost is an economic consequence.
4. Revenue is an economic consequence.
5. A Sales Invoice is a customer-facing Transaction.
6. A Purchase Invoice is a supplier-facing Transaction.
7. A Payment settles a Transaction.
8. A Purchase Order may be an Agreement and may also create a financial commitment.
9. Transactions must reference their source context wherever possible.
10. Finance must consume shared objects, not recreate them.

## 6. Information

### Definition

Information is knowledge, evidence, record, communication or content captured, managed, controlled or produced by the enterprise.

### Examples

```text
Document
Document Revision
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
Knowledge Article
Decision Record
Meeting Minutes
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
Compliance Requirement
Compliance Framework
Standard
Policy
Procedure
Workflow
Approval
Decision
Audit
Quality Check
Non-Conformance
Corrective Action
Preventive Action
Gate Review
Stage Gate
Delegation of Authority
Framework
Methodology
KPI
```

### Purpose

Control provides the governance model for PBM.

Compliance is not an industry module. Compliance is a platform capability that applies to Parties, Things, Agreements, Work, Transactions and Information.

Frameworks such as PRINCE2, PMBOK, Agile, Six Sigma, Lean, CMII, RICS, CDM, NEC, JCT, ISO 9001, ISO 14001, ISO 45001 and client-specific governance are applied as Controls and framework overlays.

### Design Rules

1. A Risk is a Control object.
2. An Issue is a Control object.
3. A Change is a Control object.
4. A Workflow is a Control mechanism.
5. An Approval is a Control mechanism.
6. A Compliance Requirement is a Control object.
7. A Framework is a Control structure.
8. A Control may require Information as evidence.
9. A Control may govern Work.
10. A Control may apply to Agreements, Transactions, Parties or Things.
11. Frameworks must extend behaviour without forking the core model.

## Meta Model Relationship Rules

The seven meta concepts relate through recurring enterprise patterns.

```text
Party participates in Agreement
Party performs Work
Party owns or uses Thing
Party creates or receives Transaction
Party creates or receives Information
Party is subject to Control

Thing is affected by Work
Thing is used by Work
Thing may be governed by Control
Thing may have Information
Thing may cause Transactions

Agreement authorises Work
Agreement creates obligations
Agreement creates Transactions
Agreement requires Information
Agreement is governed by Control

Work delivers outcomes
Work affects Things
Work consumes Things as Resources
Work uses Parties as Resources
Work creates Information
Work creates Transactions
Work is governed by Control

Transaction records economic consequence
Transaction originates from Agreement or Work
Transaction references Party
Transaction may relate to Thing
Transaction may require Information
Transaction may be governed by Control

Information records evidence or knowledge
Information describes Party, Thing, Agreement, Work, Transaction or Control
Information may satisfy Control
Information may be produced by Work

Control governs Party, Thing, Agreement, Work, Transaction or Information
Control may require Information
Control may trigger Work
Control may create Events
```

## Enterprise Derivation Rules

Every PBM concept must be derived from the meta model.

### Rule 1: Every Business Object Must Map To A Meta Concept

A proposed object must be classified as one or more of:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

If it cannot be classified, it is probably not a valid enterprise object.

### Rule 2: Workspaces Do Not Define Objects

A workspace may expose objects, but it does not define them.

For example, Customers, Sales, Projects, Finance and Compliance are workspaces or capability areas. They do not own separate customer, project, document or financial realities.

### Rule 3: Packages Implement Object Behaviour

Packages should implement reusable object and capability behaviour.

Packages should not be named or structured merely around screens.

### Rule 4: Frameworks Extend Controls And Work Patterns

Frameworks may add lifecycle stages, workflows, controls, templates, evidence requirements, deliverables, reports and KPIs.

Frameworks must not create duplicate versions of Party, Thing, Agreement, Work, Transaction, Information or Control.

### Rule 5: Finance Does Not Own The Business Context

Finance records and measures economic consequences.

Finance must reference the Party, Agreement, Work or Thing that caused the financial event.

### Rule 6: Documents And Evidence Attach To Business Objects

Information must attach to the object it supports.

A report, drawing, certificate, photo or email should be traceable to the relevant Party, Thing, Agreement, Work, Transaction or Control.

### Rule 7: Workflow And Events Are Cross-Cutting

Workflow governs lifecycle.

Events record immutable history.

Neither should be implemented separately for each route family.

## Capability Derivation

Enterprise capabilities are derived from the meta model.

For example:

```text
Customer & Commercial
  Party + Agreement + Transaction + Information + Control

Project & Delivery
  Work + Party + Thing + Transaction + Information + Control

Procurement
  Party + Agreement + Transaction + Thing + Control

Finance
  Transaction + Party + Agreement + Work + Control

Documents
  Information + all other meta concepts

Compliance
  Control + Information + Work + Agreement + Transaction
```

This explains why capabilities feel like modules to users but should not own isolated data models internally.

## Workspace Derivation

A workspace is a user-facing view over one or more meta concepts.

Examples:

```text
Customers Workspace
  Party, Agreement, Transaction, Information, Control

Projects Workspace
  Work, Party, Thing, Transaction, Information, Control

Finance Workspace
  Transaction, Party, Agreement, Work, Control

Documents Workspace
  Information linked to all other concepts

Compliance Workspace
  Control and Information linked to all other concepts
```

Workspace design must identify:

1. the primary meta concept
2. the primary business object
3. linked concepts displayed in context
4. package services required
5. workflows and controls applied
6. documents and events shown

## Package Derivation

Packages are implementation boundaries.

They should align to stable objects and capabilities derived from the meta model.

Candidate package families include:

```text
parties
assets
agreements
commercial
contracts
projects
work
resources
procurement
finance
documents
controls
compliance
workflows
events
reports
frameworks
integrations
administration
```

A package may coordinate multiple meta concepts, but it must declare which concepts it owns and which it consumes.

## Framework Derivation

Frameworks are structured Controls that alter how Work, Agreements, Information and Transactions are governed.

Examples:

```text
PRINCE2
PMBOK
Agile
Scrum
SAFe
Six Sigma
Lean
CMII
RICS
CDM
NEC
JCT
ISO 9001
ISO 14001
ISO 45001
ISO 27001
Client Governance Framework
```

Frameworks may contribute:

```text
Lifecycle stages
Workflow definitions
Approval gates
Controls
Checklists
Evidence requirements
Deliverable templates
Document templates
Report templates
KPI definitions
Risk rules
Quality rules
Audit rules
```

Frameworks are not applications.

A Project using PRINCE2 and a Project using Six Sigma are both still Projects.

The frameworks change the governing controls and expected outputs.

## Anti-Patterns

PBM must avoid these anti-patterns.

### Duplicate Master Data

Creating separate customer, supplier, employee or contact records that do not derive from Party.

### Module-Owned Reality

Allowing CRM, Projects, Finance or Documents to own their own independent versions of the same business object.

### Industry Forking

Creating a separate data model for each industry instead of applying frameworks and extensions.

### Document Islands

Managing documents without attaching them to the business object they support.

### Compliance Islands

Managing compliance outside the work, agreement, transaction or information it governs.

### Finance Re-Creation

Creating finance-only copies of project, customer, supplier or contract context.

### Route-Led Schema Design

Creating tables because a screen needs them rather than because a recognised enterprise object, relationship, event, workflow state or control exists.

### Hard-Coded Frameworks

Embedding RICS, PRINCE2, ISO, Six Sigma or client-specific rules directly into core business logic.

## Examples

### Example 1: Building Survey

```text
Party
  Client organisation
  Surveyor

Thing
  Building
  Property

Agreement
  Proposal
  Accepted contract / instruction

Work
  Project
  Site visit
  Survey activity
  Report deliverable

Transaction
  Fee
  Sales invoice
  Payment

Information
  Photographs
  Notes
  Building survey report

Control
  RICS framework
  Internal quality review
  Approval workflow
```

The core model is not a surveying system. Surveying behaviour is applied through frameworks, templates, work types and deliverables.

### Example 2: Electrical Rewire

```text
Party
  Client
  Electrical contractor
  Supplier

Thing
  Building
  Electrical system
  Materials

Agreement
  Quotation
  Contract
  Purchase order

Work
  Project
  Work packages
  Installation activities
  Testing tasks

Transaction
  Budget
  Committed cost
  Supplier invoice
  Sales invoice

Information
  Drawings
  Certificates
  RAMS
  Completion records

Control
  CDM
  Building regulations
  ISO 9001
  Inspection approvals
```

### Example 3: Manufacturing Improvement Project

```text
Party
  Internal sponsor
  Process owner
  Engineering team

Thing
  Production line
  Machine
  Process asset

Agreement
  Internal business case
  Approved project charter

Work
  Project
  DMAIC stages
  Improvement tasks

Transaction
  Budget
  Cost
  Savings forecast

Information
  Process maps
  Control plans
  Test results

Control
  Six Sigma
  Lean
  ISO 9001
  Stage gate review
```

### Example 4: Software Delivery Project

```text
Party
  Customer
  Product owner
  Delivery team

Thing
  Software product
  Environment
  Information asset

Agreement
  Contract
  Statement of work

Work
  Project
  Sprint
  User story
  Release

Transaction
  Budget
  Cost
  Invoice

Information
  Requirements
  Test evidence
  Release notes
  Documentation

Control
  Agile framework
  ITIL change control
  ISO 27001
  Approval workflow
```

### Example 5: Maritime Engineering Project

```text
Party
  Customer
  Design authority
  Supplier
  Classification society

Thing
  Ship
  System
  Component

Agreement
  Contract
  Technical instruction
  Purchase order

Work
  Project
  Work package
  Design activity
  Verification activity

Transaction
  Budget
  Cost
  Invoice

Information
  Drawings
  Design baseline
  Verification record
  Configuration audit record

Control
  CMII
  DNV
  Lloyd's Register
  Naval standards
  Change control workflow
```

## Design Review Checklist

Before approving a new PBM concept, ask:

1. Which meta concept does it derive from?
2. Is it a Party, Thing, Agreement, Work, Transaction, Information or Control?
3. Is it a business object, relationship, workflow state, event, document, control or configuration?
4. Does an existing object already represent it?
5. Is it core ERP behaviour or framework-specific behaviour?
6. Which capability does it support?
7. Which workspace will expose it?
8. Which package should implement it?
9. Which objects does it relate to?
10. Does it need workflow?
11. Does it need immutable events?
12. Does it need documents or evidence?
13. Does it need compliance controls?
14. Does it create financial consequences?
15. Does it preserve the shared enterprise model?

## Relationship To Other Architecture Documents

This document sits above all other architecture documents.

```text
000-enterprise-meta-model.md
  -> 001-enterprise-capability-model.md
  -> canonical enterprise data model
  -> business object catalogue
  -> relationship model
  -> workspace model
  -> package model
  -> schema model
  -> workflow model
  -> event model
  -> framework model
```

If later documents conflict with this one, either the later document should be corrected or this meta model should be deliberately revised through an explicit architecture decision.

## Summary

PBM must be built from a stable enterprise meta model.

The seven root concepts are:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

These concepts allow PBM to cover the breadth of traditional ERP while avoiding fragmented module-owned reality.

Capabilities, workspaces, packages, schemas, workflows, documents, events, reports and frameworks must all remain traceable to this model.
