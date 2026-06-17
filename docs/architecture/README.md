# Perspective Business Manager Architecture

## Vision

Perspective Business Manager (PBM) is an Enterprise Resource Planning platform designed to provide one coherent system for managing every major business function.

PBM should feel familiar to users of established ERP platforms while avoiding the fragmented, module-owned data models that make traditional ERP implementations expensive, difficult to change and hard to report across.

PBM is not a CRM system, project management system, finance system, surveying system or document system.

PBM is an enterprise business management platform.

Workspaces such as Customers, Sales, Projects, Operations, Resources, Procurement, Finance, Assets, Documents, Compliance, Reporting and Administration are user-facing views over shared enterprise capabilities and shared enterprise objects.

## Architectural Intent

PBM must surpass traditional ERP systems by removing unnecessary boundaries between modules.

The platform must provide:

1. one coherent enterprise model
2. one shared party and customer model
3. one shared project, work and delivery model
4. one shared resource model
5. one shared finance and procurement context
6. one shared document and evidence model
7. one shared compliance and framework model
8. one shared workflow engine
9. one shared event model
10. one shared reporting and analytics layer

The user experience should be familiar.

The architecture underneath should be simpler, cleaner and more connected than traditional ERP.

## Core Architectural Principles

1. No table without a business object, relationship, event, workflow state or configuration purpose.
2. No route owns data.
3. No module owns data.
4. Packages implement business and platform boundaries, not isolated application modules.
5. Workspaces are views over shared enterprise objects.
6. Workflow is metadata.
7. Events are immutable.
8. Documents and evidence attach to business objects.
9. Compliance attaches to business objects.
10. Frameworks, standards and methodologies extend the core model rather than fork it.
11. Industry behaviour is configured through frameworks, controls, templates, workflows and deliverables.
12. Reporting is derived from shared enterprise data, not from route-specific data stores.

## Architecture Starting Point

The primary architecture baseline is now the Enterprise Meta Model.

Start here:

- [000-enterprise-meta-model.md](./000-enterprise-meta-model.md)

The Enterprise Meta Model defines the irreducible enterprise concepts from which PBM capabilities, business objects, routes, packages, workflows, events, documents, controls, reports and framework extensions are derived.

The capability model comes next:

- [001-enterprise-capability-model.md](./001-enterprise-capability-model.md)

The Enterprise Capability Model defines the ERP capability coverage expected of PBM.

All other architecture documents must align to the meta model and capability model.

## Architecture Reading Order

Read the architecture documents in this order:

```text
000 Enterprise Meta Model
    ↓
001 Enterprise Capability Model
    ↓
Canonical Enterprise Data Model
    ↓
Business Object Catalogue
    ↓
Enterprise Relationship Model
    ↓
Schema Relationship Appendix
    ↓
Route / Workspace Relationship Appendix
    ↓
Package Relationship Appendix
    ↓
Remediation Backlog
```

## Key Architecture Documents

- [000-enterprise-meta-model.md](./000-enterprise-meta-model.md)
- [001-enterprise-capability-model.md](./001-enterprise-capability-model.md)
- [001-canonical-enterprise-data-model.md](./001-canonical-enterprise-data-model.md)
- [002-business-object-catalogue.md](./002-business-object-catalogue.md)
- [003-enterprise-relationship-model.md](./003-enterprise-relationship-model.md)
- [004-schema-relationship-appendix.md](./004-schema-relationship-appendix.md)
- [005-route-object-relationship-appendix.md](./005-route-object-relationship-appendix.md)
- [006-package-object-relationship-appendix.md](./006-package-object-relationship-appendix.md)
- [007-architecture-remediation-backlog.md](./007-architecture-remediation-backlog.md)
- [core-business-object-spine.md](./core-business-object-spine.md)

## Enterprise Meta Concepts

PBM derives business architecture from seven root concepts:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

These are not user modules and not table names.

They are architecture categories.

Every PBM object, route, package, report, workflow, event and framework extension must remain traceable to these concepts.

## Enterprise Capability Groups

PBM is organised around these Level 0 enterprise capability groups:

1. Strategy & Governance
2. Customer & Commercial
3. Project & Delivery
4. Operations & Work Execution
5. People & Workforce
6. Supply Chain & Procurement
7. Finance & Accounting
8. Assets, Property & Facilities
9. Information, Documents & Knowledge
10. Compliance, Risk & Quality
11. Reporting & Analytics
12. Platform Administration
13. Integration & Automation
14. Framework & Extension Management

These are capability groups.

They are not necessarily packages, routes, database schemas or navigation labels.

## User-Facing ERP Workspaces

The platform should expose familiar ERP workspaces such as:

```text
Dashboard
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

These workspaces help users navigate the business.

They must not create separate data ownership boundaries.

## Internal Enterprise Model

Internally, PBM must maintain shared enterprise objects that can be reused across all workspaces.

Examples include:

```text
Party
Person
Organisation
Client Account
Supplier Account
Asset
Property
Opportunity
Proposal
Contract
Project
Work Package
Activity
Task
Deliverable
Resource
Purchase Order
Sales Invoice
Document
Evidence Item
Risk
Issue
Change
Compliance Requirement
Workflow Instance
Business Event
```

The same object may appear in many workspaces.

For example, a Project may appear in Projects, Finance, Resources, Procurement, Documents, Compliance and Reporting.

There must still only be one Project object.

## Framework Engine

PBM must separate universal ERP capabilities from configurable frameworks, standards, methodologies and industry extensions.

A project, programme, work package, activity or operational process may have zero or many frameworks applied.

Examples include:

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
Client-specific governance
```

Frameworks may contribute:

```text
Lifecycle stages
Workflow definitions
Controls
Checklists
Deliverable templates
Document templates
Evidence requirements
Approval gates
Risk rules
Quality rules
Compliance rules
Reports
KPIs
```

Frameworks must extend the core ERP model.

They must not create separate applications or duplicate business objects.

## Example Framework Application

A construction project may use:

```text
PRINCE2
CDM
ISO 9001
Client Governance Framework
```

A manufacturing improvement project may use:

```text
Six Sigma
Lean
ISO 9001
```

A software delivery project may use:

```text
Agile
Scrum
ITIL
ISO 27001
```

A maritime engineering project may use:

```text
CMII
DNV
Lloyd's Register
Client Technical Standards
```

The core PBM objects remain the same.

Only the applied framework behaviour changes.

## Package Direction

Packages should implement stable business and platform boundaries.

Candidate package families include:

```text
parties
client-accounts
commercial
contracts
projects
work
resources
procurement
finance
assets
documents
compliance
workflows
events
reports
frameworks
administration
integrations
```

Existing packages must be assessed against the Enterprise Meta Model and Enterprise Capability Model before further expansion.

## Route Direction

Routes should represent workspaces and user journeys.

Routes should not imply ownership of business data.

Every route family should answer:

1. Which capability does this support?
2. Which shared enterprise objects does this view or modify?
3. Which package owns the relevant business logic?
4. Which framework, workflow or compliance rules apply?
5. Which relationships support the screen?

## Migration Roadmap Reframing

The original migration sequence remains useful but must be reframed under the broader ERP capability model.

### Completed / In Progress

- Core foundation objects
- Core business objects
- Workflow and events foundation
- Client accounts package
- Activity management foundation
- Enterprise meta model
- Enterprise capability model

### Needs Realignment

- Canonical enterprise data model
- Business object catalogue
- Commercial lifecycle
- Project and delivery model
- Work package and task model
- Resource management
- Procurement
- Finance engine
- Asset model
- Documents and evidence
- Compliance and framework engine
- Reporting and analytics

## Architecture Review Rule

Before creating a new route, package, table or workflow, confirm:

1. Which meta concept does it derive from?
2. Which L0 capability does it support?
3. Which enterprise object does it create, update, read or govern?
4. Does an existing object already represent this concept?
5. Is this core ERP behaviour or framework-specific behaviour?
6. Is this a workspace concern or package concern?
7. Does it require workflow?
8. Does it require immutable events?
9. Does it require document or evidence attachment?
10. Does it require compliance controls?
11. Can it report across the shared enterprise model?

## Summary

PBM is one coherent ERP platform.

The architecture starts with the Enterprise Meta Model.

The user sees familiar ERP workspaces.

The platform maintains shared enterprise objects.

Frameworks adapt how work is governed and executed.

Packages implement reusable business and platform capabilities.

Routes provide workspaces over those capabilities.

The architectural goal is not to copy traditional ERP.

The goal is to cover the same enterprise breadth while removing the fragmentation that makes traditional ERP difficult to implement, operate and evolve.
