# Canonical Enterprise Data Model

## Purpose

This document defines the core enterprise data model for Perspective Business Manager (PBM).

PBM is built around shared business records, not page-owned data and not legacy module-owned data. The same record can support many workspaces because each workspace uses that record for a different job.

The canonical data model exists to make sure PBM has one connected enterprise reality.

## Product language rule

Use PBM language in this document:

```text
Business workspace
Business object
Activity
Route doorway
Shared data spine
Integrated record
Operating model
Coverage audit
```

Do not describe PBM as a collection of old ERP modules. External ERP module lists may be used as completeness checks only; they are not PBM product language.

## Source architecture

This document supports:

- [000-enterprise-meta-model.md](./000-enterprise-meta-model.md)
- [002-business-object-catalogue.md](./002-business-object-catalogue.md)
- [003-enterprise-relationship-model.md](./003-enterprise-relationship-model.md)
- [012-enterprise-capability-coverage-catalogue.md](./012-enterprise-capability-coverage-catalogue.md)
- [013-enterprise-sub-capability-coverage-audit.md](./013-enterprise-sub-capability-coverage-audit.md)

## Core design principles

### 1. Business objects first

Every table, view, service and route should trace back to a business object or a relationship between business objects.

A table should not exist only because a page needed somewhere to store form data.

### 2. One record, many workspaces

Records are not owned by routes.

A client record is not owned by Clients & Commercial.

A project record is not owned by Project Delivery.

An invoice record is not owned by Finance & Control.

A document record is not owned by Reporting, Documents & Admin.

Each workspace is a doorway into the shared data spine.

### 3. One enterprise reality

PBM must avoid duplicate versions of the same business fact.

There must not be one client for commercial work, another client for project delivery and another client for finance.

There must not be one project for delivery, another for cost control and another for reporting.

There must not be detached document stores that cannot be traced back to the business object they support.

### 4. Relationships carry meaning

Where a connection has business meaning, dates, role, status, value, percentage, responsibility, evidence or lifecycle, it should be represented explicitly.

Examples:

```text
person assigned to position
employee assigned to project
client linked to project
supplier linked to purchase order
quote row linked to project service
supplier invoice row linked to purchase order row
sales invoice row linked to project service
risk linked to project
control evidenced by document
```

### 5. Events are immutable

Business events are append-only.

If a business fact changes, PBM records a new event rather than pretending the old fact never existed.

### 6. Information attaches to objects

Documents, files, evidence, correspondence, approvals and reports must attach to the business objects they support.

Information should never float outside the operating model.

## Root enterprise concepts

PBM has seven root concepts:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

These are not user-facing workspaces. They are architecture concepts used to keep the data model stable.

## Canonical data domains

```text
Party Domain
Thing Domain
Agreement Domain
Work Domain
Transaction Domain
Information Domain
Control Domain
Platform Domain
```

## 1. Party Domain

### Purpose

The Party Domain represents people, organisations and other actors that participate in the business.

A party may be a person, client, supplier, employee, contractor, regulator, approver, partner, stakeholder, insurer, landlord or internal business entity.

### Core objects

| Business object | Meaning | Current / planned data objects |
|---|---|---|
| Business entity | A real-world organisation or business body. | `business_entity` |
| Person entity | A real-world human being. | `person_entity` |
| Business partner | A party recognised by PBM for a business context. | `business_partner` |
| Business partner role | The role a partner plays, such as client, supplier, owning business or insurer. | `business_partner_role` |
| Business partner person | A person linked to a business partner. | `business_partner_person` |
| Contact method | Email, phone or other communication route. | `contact_method` |
| Address | Postal, physical or operational address. | `address` |

### Rules

1. Client, supplier, employee and contractor must not be separate root identities.
2. The same real-world party may hold several roles.
3. Commercial, workforce, procurement and finance views must reuse the same identity spine.
4. Party records may appear in Business Setup, People & Workforce, Clients & Commercial, Procurement, Finance, Project Delivery, Quality & Compliance and Reporting.

## 2. Business Structure Domain

### Purpose

The Business Structure Domain defines how the owning business is organised.

It answers:

```text
What functions exist?
What organisation units exist?
What positions exist?
Who reports to whom?
Which roles carry authority?
```

### Core objects

| Business object | Meaning | Current / planned data objects |
|---|---|---|
| Business function | A core function the business performs. | `business_function` |
| Organisation unit | A team, department, office, practice, region or unit. | `organisation_unit` |
| Position | A defined role in the operating model. | `position` |
| Authority limit | Delegated authority attached to a person, role or position. | `authority_limit` |

### Rules

1. Business structure is defined once and reused across HR, projects, finance, procurement and compliance.
2. A position is not just an HR label; it can carry reporting, approval and authority meaning.
3. Organisation structure should not be recreated inside individual workspaces.

## 3. People & Workforce Domain

### Purpose

The People & Workforce Domain turns people into employees, contractors, resources, assignees and competent/authorised participants in work.

### Core objects

| Business object | Meaning | Current / planned data objects |
|---|---|---|
| Employee | A person with an employment relationship. | `employee` |
| Employee position | A person occupying a position for a period. | `employee_position` |
| Competence | A skill, qualification, certification or capability. | `competence` |
| Person competence | A person holding a competence. | `person_competence` |
| Workforce assignment | A person or role assigned to work. | `project_assignment` |

### Rules

1. A person exists once.
2. Employment, user access, project assignment and competence are separate contexts.
3. Projects, operations and compliance consume workforce records without owning them.

## 4. Thing Domain

### Purpose

The Thing Domain represents assets, property, equipment, materials, stock, locations and other managed things.

### Core objects

| Business object | Meaning | Current / planned data objects |
|---|---|---|
| Asset | A managed thing owned, used, maintained or controlled by the business. | Planned |
| Property | A property, site, building or built environment location. | Existing / evolving |
| Project location | A location relevant to a project or job. | `project_location` |
| Equipment | Equipment used, inspected, maintained or allocated. | Planned |
| Material / item | Material, item or consumable used in work or stock. | Planned |
| Stock location | A place where stock is stored or controlled. | Planned |

### Rules

1. Property, equipment, materials and assets are all managed things.
2. Things may be the subject of work, used as resources, procured, maintained, inspected or costed.
3. Thing records may appear in Assets, Property & Maintenance, Project Delivery, Operations, Procurement, Finance, Quality & Compliance and Reporting.

## 5. Agreement Domain

### Purpose

The Agreement Domain represents offers, commitments, authorisations and obligations between parties.

### Core objects

| Business object | Meaning | Current / planned data objects |
|---|---|---|
| Lead / enquiry | Early commercial demand or request. | Planned |
| Opportunity | A potential piece of work or commercial outcome. | Planned |
| Quote / proposal | A priced offer to perform work or provide services. | `project_quote`, `project_quote_row` |
| Contract / instruction | Accepted authority to perform work. | Existing / evolving |
| Purchase order | Supplier-side commitment to buy goods or services. | `purchase_order`, `purchase_order_row` |
| Change / variation | Agreed change to scope, price, time or obligation. | Planned |

### Rules

1. Agreements link parties to obligations.
2. Agreements may authorise work.
3. Agreements may create transactions.
4. Commercial, project, procurement and finance activity must not recreate separate agreement records for the same commitment.

## 6. Work Domain

### Purpose

The Work Domain represents work performed to achieve an outcome.

Work includes projects, programmes, work packages, activities, tasks, service orders, deliverables and operational execution.

### Core objects

| Business object | Meaning | Current / planned data objects |
|---|---|---|
| Project | A controlled delivery container. | `project` |
| Project party | A party involved in a project. | `project_party` |
| Project contact | A contact for a project. | `project_contact` |
| Project assignment | A person, role or position assigned to project work. | `project_assignment` |
| Project service | A defined service or deliverable being performed. | `project_service` |
| Project service cost | Cost attached to a project service. | `project_service_cost` |
| Work order / service order | Operational work to be performed. | Planned |
| Milestone | Significant point in work lifecycle. | Planned |

### Rules

1. Work can be customer-facing, supplier-supported, internal, compliance-driven or maintenance-driven.
2. Work may consume parties, things, people and money.
3. Work may produce documents, evidence, invoices, costs and reports.

## 7. Transaction Domain

### Purpose

The Transaction Domain represents money, value, cost, commitment, payment and accounting movement.

### Core objects

| Business object | Meaning | Current / planned data objects |
|---|---|---|
| Sales invoice | Customer-facing request for payment. | `sales_invoice` |
| Sales invoice row | Billable line linked to service, quote or project context. | `sales_invoice_row` |
| Supplier invoice | Supplier request for payment. | `supplier_invoice` |
| Supplier invoice row | Supplier cost line linked to purchase order, project or service context. | `supplier_invoice_row` |
| Purchase order | Commercial commitment that may create cost exposure. | `purchase_order` |
| Payment | Movement of money. | Planned |
| Ledger entry | Accounting record. | Planned |
| Budget | Planned financial value. | Planned |

### Rules

1. Finance records must be traceable to parties, agreements, work and things where relevant.
2. Project cost and margin must be derivable from shared transaction records.
3. Finance must not create separate project or supplier realities.

## 8. Information Domain

### Purpose

The Information Domain represents documents, evidence, templates, records, correspondence and reports.

### Core objects

| Business object | Meaning | Current / planned data objects |
|---|---|---|
| Document | A managed file or document record. | Planned / evolving |
| Evidence | Information proving a business fact, decision, control or outcome. | Planned |
| Template | Reusable document or data capture pattern. | Planned |
| Report | Structured information derived from records. | Reporting views |
| Export pack | Bundled reporting or evidence output. | Planned |

### Rules

1. Information attaches to business objects.
2. Evidence must support audit, compliance and operational proof.
3. Reports should read the shared data spine, not reconcile duplicated records.

## 9. Control Domain

### Purpose

The Control Domain represents governance, risk, compliance, approvals, audit, quality, issue management and controlled change.

### Core objects

| Business object | Meaning | Current / planned data objects |
|---|---|---|
| Risk | Uncertain event or condition affecting objectives. | Existing / evolving |
| Issue | Current problem requiring management. | Existing / evolving |
| Control | Mechanism that prevents, detects or corrects risk. | Existing / evolving |
| Approval | Authority decision. | Planned / workflow metadata |
| Audit evidence | Evidence proving control, decision or compliance. | Planned |
| Non-conformance | Failure against quality or compliance expectation. | Planned |
| Corrective action | Action to resolve non-conformance or control failure. | Planned |

### Rules

1. Controls govern business objects and activities.
2. Control records should not be isolated from the work, parties, information or transactions they govern.
3. Quality and compliance use the same data spine as the rest of the business.

## 10. Platform Domain

### Purpose

The Platform Domain supports configuration, reference data, users, permissions, workflow, integrations and system administration.

### Core objects

| Business object | Meaning | Current / planned data objects |
|---|---|---|
| User | Authenticated application user. | Existing / evolving |
| Role / permission | Access and authority model. | Existing / evolving |
| Workflow definition | Configured lifecycle behaviour. | Existing / evolving |
| Reference data | Controlled values used across PBM. | Existing / evolving |
| Integration endpoint | Connection to external systems. | Planned |
| System setting | Platform configuration. | Existing / evolving |

## Workspace usage

The same data model supports all PBM workspaces:

| Workspace | Main data used |
|---|---|
| Business Setup | business entities, partner roles, functions, units, positions, settings |
| People & Workforce | people, employees, positions, competence, authority, assignments |
| Clients & Commercial | clients, contacts, enquiries, opportunities, quotes, instructions, billing triggers |
| Project Delivery | projects, parties, services, assignments, risks, issues, costs, evidence |
| Procurement, Materials & Logistics | suppliers, purchase orders, supplier invoices, materials, stock and receipts |
| Operations & Planning | work plans, capacity, assignments, service orders and completion records |
| Finance & Control | sales invoices, supplier invoices, payments, cost, revenue, margin and ledgers |
| Quality & Compliance | risks, controls, quality checks, inspections, evidence, corrective actions |
| Assets, Property & Maintenance | assets, property, locations, equipment, inspections and maintenance work |
| Reporting, Documents & Admin | reports, documents, templates, users, permissions, workflows and settings |

## Implementation rule

Every new database object should answer these questions before it is created:

```text
What business object does this represent?
Which root concept does it derive from?
Which workspaces will use it?
Which records does it relate to?
What lifecycle does it have?
What evidence or documents can attach to it?
What reports or controls depend on it?
```
