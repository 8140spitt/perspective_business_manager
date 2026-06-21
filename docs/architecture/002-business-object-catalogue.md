# Business Object Catalogue

## Purpose

This document is the PBM business object dictionary.

It defines the main business objects PBM uses, what each object means, which enterprise concept it derives from, which workspaces use it, and how it should connect to the shared data spine.

This is not a database schema, route map or package map.

It is the common language that the database, packages, routes, workflows, reports and integrations must follow.

## Product language rule

Use PBM product language:

```text
Business object
Business workspace
Activity
Route doorway
Shared data spine
Integrated record
Operating model
Coverage audit
```

External ERP module lists can be used as completeness references only. They must not become PBM product language, navigation or object names.

## Object status values

```text
Implemented              Object exists materially in schema and/or package implementation.
Partially implemented    Object exists but is incomplete, thin or awaiting broader alignment.
Planned                  Object is required but not implemented yet.
Reference only           Object is useful for coverage thinking but is not currently a root PBM object.
Review                   Object may be merged, renamed, split or reclassified.
```

## Object template

Every object should eventually be documented using this structure:

```text
Name
Root concept
Primary workspace
Supporting workspaces
Status
Definition
Purpose
Lifecycle
Key relationships
Evidence / documents
Workflow
Events
Reporting usage
Current implementation
Future implementation notes
```

## Root concepts

PBM objects derive from one or more of:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
Platform Object
```

---

# 1. Party Objects

## Business Entity

Root concept: Party

Primary workspace: Business Setup

Supporting workspaces: Clients & Commercial, Procurement, Finance & Control, Project Delivery, Quality & Compliance, Reporting

Status: Implemented / evolving

Definition: A real-world organisation, company, public body, partnership, charity, practice, internal owning business or external business body.

Purpose: Provides one organisation identity record that can be reused as the owning business, client, supplier, subcontractor, insurer, landlord, regulator or partner.

Current implementation:

```text
business_entity
```

Rule: do not create separate root tables for clients, suppliers or internal business entities when a role on a business entity is sufficient.

## Person Entity

Root concept: Party

Primary workspace: People & Workforce

Supporting workspaces: Business Setup, Clients & Commercial, Project Delivery, Procurement, Finance & Control, Quality & Compliance

Status: Implemented / evolving

Definition: A real-world human being.

Purpose: Provides one person identity record that can be reused as an employee, contact, contractor, approver, representative, stakeholder or user-linked individual.

Current implementation:

```text
person_entity
```

Rule: a person is not the same thing as an employee, user, contact or contractor. Those are contexts applied to the person.

## Business Partner

Root concept: Party

Primary workspace: Business Setup

Supporting workspaces: all workspaces that need a party context

Status: Implemented / evolving

Definition: A party recognised by PBM for a business relationship or application context.

Purpose: Allows a real-world person or business to participate in PBM without hard-coding one identity per role.

Current implementation:

```text
business_partner
```

## Business Partner Role

Root concept: Party

Primary workspace: Business Setup

Supporting workspaces: Clients & Commercial, Procurement, Finance & Control, Project Delivery, Quality & Compliance

Status: Implemented / evolving

Definition: The role a business partner plays in a context.

Examples:

```text
owning_business
client
supplier
subcontractor
employee
insurer
landlord
regulator
primary_contact
billing_contact
approver
```

Current implementation:

```text
business_partner_role
```

Rule: roles allow the same party to be used in multiple contexts without duplication.

## Business Partner Person

Root concept: Party

Primary workspace: Business Setup

Supporting workspaces: Clients & Commercial, Procurement, Project Delivery, Finance & Control

Status: Implemented / evolving

Definition: A person linked to a business partner.

Purpose: Supports contacts, representatives, account managers, approvers and named individuals connected to organisations or business relationships.

Current implementation:

```text
business_partner_person
```

## Contact Method

Root concept: Information / Party

Primary workspace: Business Setup

Supporting workspaces: all contact-using workspaces

Status: Implemented / evolving

Definition: A communication route such as email address, phone number or website.

Current implementation:

```text
contact_method
```

## Address

Root concept: Thing / Information / Party

Primary workspace: Business Setup

Supporting workspaces: Clients & Commercial, Project Delivery, Procurement, Finance & Control, Property, Reporting

Status: Implemented / evolving

Definition: A postal, physical, operational or geographic address.

Current implementation:

```text
address
```

---

# 2. Business Structure Objects

## Business Function

Root concept: Platform Object / Control

Primary workspace: Business Setup

Supporting workspaces: People & Workforce, Project Delivery, Finance & Control, Procurement, Compliance

Status: Implemented / evolving

Definition: A major function the business performs.

Purpose: Provides the operating model structure that explains what the business does.

Current implementation:

```text
business_function
```

## Organisation Unit

Root concept: Platform Object / Party

Primary workspace: Business Setup

Supporting workspaces: People & Workforce, Project Delivery, Finance & Control, Procurement, Compliance

Status: Implemented / evolving

Definition: A department, team, region, office, practice, function group or organisational unit.

Current implementation:

```text
organisation_unit
```

## Position

Root concept: Party / Control

Primary workspace: Business Setup

Supporting workspaces: People & Workforce, Project Delivery, Finance & Control, Procurement, Compliance

Status: Implemented / evolving

Definition: A defined role in the operating model.

Purpose: Supports reporting lines, responsibility, authority, resourcing and governance.

Current implementation:

```text
position
```

## Authority Limit

Root concept: Control

Primary workspace: People & Workforce

Supporting workspaces: Finance & Control, Procurement, Project Delivery, Quality & Compliance

Status: Implemented / evolving

Definition: A delegated authority rule that defines what a person, position or role can approve or control.

Current implementation:

```text
authority_limit
```

---

# 3. Workforce Objects

## Employee

Root concept: Party

Primary workspace: People & Workforce

Supporting workspaces: Project Delivery, Operations & Planning, Quality & Compliance, Finance & Control

Status: Implemented / evolving

Definition: An employment relationship between a person and the owning business.

Current implementation:

```text
employee
```

## Employee Position

Root concept: Party / Control

Primary workspace: People & Workforce

Supporting workspaces: Business Setup, Project Delivery, Operations & Planning, Compliance

Status: Implemented / evolving

Definition: A person occupying a position for a period.

Current implementation:

```text
employee_position
```

## Competence

Root concept: Control / Information

Primary workspace: People & Workforce

Supporting workspaces: Project Delivery, Operations & Planning, Quality & Compliance

Status: Implemented / evolving

Definition: A skill, qualification, certification, capability or training item.

Current implementation:

```text
competence
person_competence
```

---

# 4. Work Objects

## Project

Root concept: Work

Primary workspace: Project Delivery

Supporting workspaces: Clients & Commercial, Procurement, Finance & Control, People & Workforce, Quality & Compliance, Reporting

Status: Implemented / evolving

Definition: A controlled delivery container used to plan, execute, control and complete work.

Current implementation:

```text
project
```

## Project Party

Root concept: Work / Party

Primary workspace: Project Delivery

Supporting workspaces: Clients & Commercial, Procurement, Finance & Control, Quality & Compliance

Status: Implemented / evolving

Definition: A party involved in a project with a defined role.

Current implementation:

```text
project_party
```

## Project Contact

Root concept: Work / Party

Primary workspace: Project Delivery

Supporting workspaces: Clients & Commercial

Status: Implemented / evolving

Definition: A named project contact.

Current implementation:

```text
project_contact
```

## Project Assignment

Root concept: Work / Party

Primary workspace: Project Delivery

Supporting workspaces: People & Workforce, Operations & Planning, Finance & Control

Status: Implemented / evolving

Definition: A person, employee, position or role assigned to work on a project.

Current implementation:

```text
project_assignment
```

## Project Location

Root concept: Work / Thing

Primary workspace: Project Delivery

Supporting workspaces: Assets, Property & Maintenance, Quality & Compliance, Reporting

Status: Implemented / evolving

Definition: A location relevant to project delivery.

Current implementation:

```text
project_location
```

## Project Service

Root concept: Work / Agreement

Primary workspace: Project Delivery

Supporting workspaces: Clients & Commercial, Procurement, Finance & Control, Reporting

Status: Implemented / evolving

Definition: A service, deliverable or controlled scope item within project work.

Current implementation:

```text
project_service
```

## Project Service Cost

Root concept: Transaction / Work

Primary workspace: Project Delivery

Supporting workspaces: Finance & Control, Procurement, Reporting

Status: Implemented / evolving

Definition: Cost attached to a project service.

Current implementation:

```text
project_service_cost
```

---

# 5. Commercial Objects

## Project Quote

Root concept: Agreement / Transaction

Primary workspace: Clients & Commercial

Supporting workspaces: Project Delivery, Finance & Control, Reporting

Status: Implemented / evolving

Definition: A priced offer connected to project or service work.

Current implementation:

```text
project_quote
project_quote_row
```

## Instruction / Accepted Work Authority

Root concept: Agreement / Work

Primary workspace: Clients & Commercial

Supporting workspaces: Project Delivery, Finance & Control, Reporting

Status: Existing / review

Definition: Accepted authority to perform work.

Rule: instruction language may remain where useful, but the object must fit the wider Agreement and Work model.

---

# 6. Procurement Objects

## Purchase Order

Root concept: Agreement / Transaction

Primary workspace: Procurement, Materials & Logistics

Supporting workspaces: Project Delivery, Finance & Control, Reporting

Status: Implemented / evolving

Definition: Supplier-side commitment to buy goods or services.

Current implementation:

```text
purchase_order
purchase_order_row
```

## Supplier Invoice

Root concept: Transaction

Primary workspace: Finance & Control

Supporting workspaces: Procurement, Materials & Logistics, Project Delivery, Reporting

Status: Implemented / evolving

Definition: Supplier request for payment.

Current implementation:

```text
supplier_invoice
supplier_invoice_row
```

---

# 7. Finance Objects

## Sales Invoice

Root concept: Transaction

Primary workspace: Finance & Control

Supporting workspaces: Clients & Commercial, Project Delivery, Reporting

Status: Implemented / evolving

Definition: Customer-facing request for payment.

Current implementation:

```text
sales_invoice
sales_invoice_row
```

## Payment

Root concept: Transaction

Primary workspace: Finance & Control

Supporting workspaces: Reporting

Status: Planned

Definition: Movement of money against receivables, payables or other financial obligations.

## Ledger Entry

Root concept: Transaction

Primary workspace: Finance & Control

Supporting workspaces: Reporting

Status: Planned

Definition: Accounting record used for financial truth and period reporting.

---

# 8. Control Objects

## Risk

Root concept: Control

Primary workspace: Quality & Compliance

Supporting workspaces: Project Delivery, Operations & Planning, Reporting

Status: Existing / evolving

Definition: Uncertain event or condition affecting objectives.

## Issue

Root concept: Control / Work

Primary workspace: Quality & Compliance

Supporting workspaces: Project Delivery, Operations & Planning, Reporting

Status: Existing / evolving

Definition: Current problem requiring management.

## Control

Root concept: Control

Primary workspace: Quality & Compliance

Supporting workspaces: all workspaces where governance applies

Status: Existing / evolving

Definition: Mechanism that prevents, detects or corrects risk.

## Non-conformance

Root concept: Control / Information

Primary workspace: Quality & Compliance

Supporting workspaces: Project Delivery, Procurement, Operations, Reporting

Status: Planned

Definition: Failure against a quality, process or compliance expectation.

## Corrective Action

Root concept: Control / Work

Primary workspace: Quality & Compliance

Supporting workspaces: Project Delivery, Operations, Procurement, Reporting

Status: Planned

Definition: Action taken to resolve non-conformance, defect or control failure.

---

# 9. Information Objects

## Document

Root concept: Information

Primary workspace: Reporting, Documents & Admin

Supporting workspaces: all workspaces

Status: Planned / evolving

Definition: Managed document or file record.

## Evidence

Root concept: Information / Control

Primary workspace: Quality & Compliance

Supporting workspaces: Project Delivery, Finance & Control, Procurement, Reporting

Status: Planned

Definition: Information that proves a fact, decision, control, activity or outcome.

## Report

Root concept: Information

Primary workspace: Reporting, Documents & Admin

Supporting workspaces: all workspaces

Status: Existing / evolving

Definition: Derived view of enterprise data.

---

# 10. Thing Objects

## Asset

Root concept: Thing

Primary workspace: Assets, Property & Maintenance

Supporting workspaces: Project Delivery, Procurement, Finance & Control, Quality & Compliance, Reporting

Status: Planned

Definition: Managed thing owned, used, maintained, inspected or controlled by the business.

## Property / Site / Building

Root concept: Thing

Primary workspace: Assets, Property & Maintenance

Supporting workspaces: Project Delivery, Quality & Compliance, Reporting

Status: Existing / evolving

Definition: Physical property, site, building or built environment location.

## Material / Inventory Item

Root concept: Thing

Primary workspace: Procurement, Materials & Logistics

Supporting workspaces: Operations & Planning, Finance & Control, Reporting

Status: Planned

Definition: Item used, bought, stored, issued or consumed by work.

---

# Implementation rules

1. Do not create a new root object where an existing object plus a role or relationship is enough.
2. Do not duplicate identity objects for clients, suppliers, employees or contacts.
3. Do not let a route define the business language.
4. Every object must be traceable to a root concept, workspace, data object and reporting/control need.
5. Object names should make sense to the business before they make sense to the database.
