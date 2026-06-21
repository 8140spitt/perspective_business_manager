# Product Scope

## Purpose

Define the target scope of Perspective Business Manager as a business-first enterprise platform for built-environment service businesses.

PBM is not a copy of an external ERP suite. It is an operating system for a business that uses clear workspaces, shared business objects and one integrated data spine.

## Product Position

Perspective Business Manager supports the full lifecycle from enquiry and client acceptance through work planning, delivery, evidence, deliverables, invoicing, governance and retained records.

The platform must support organisation-led and individual-led customer journeys without changing the underlying commercial, operational or reporting architecture.

## Primary Business Types

- building surveying practices
- multidisciplinary property consultancies
- engineering consultancies
- compliance and risk advisory teams
- technical due diligence and asset review teams
- project and programme delivery teams in the built environment

## Core Business Outcomes

- win and onboard the right work
- manage clients, properties and instructions consistently
- plan and execute professional service delivery
- capture defensible evidence and technical findings
- produce auditable deliverables and records
- control fees, WIP, invoices, supplier cost, cash position and margin
- maintain compliance, governance and retention obligations
- report the true operational and financial position of the business

## In Scope

### Commercial Work

- client and relationship management
- enquiries, opportunities, fee proposals and quotations
- instruction conversion and commercial acceptance
- client account and billing context

### Delivery Work

- instruction management
- project and programme management
- activity, observation, assessment, action and outcome lifecycle
- scheduling, assignment and utilisation
- deliverables, reviews and issue management

### Built Asset Information

- property register
- site, building, unit and element structures
- party-to-property relationships
- property condition and technical history

### Enterprise Control

- finance and commercial control
- procurement and supplier management
- people, competence and resource planning
- quality, risk and compliance management
- document, evidence and record control
- analytics, dashboards and management reporting

## Out Of Scope For Initial Releases

- general manufacturing and plant-floor execution
- retail point of sale
- deep payroll engine replacement
- statutory accounting localisation for every jurisdiction on day one
- fully automated advanced planning before core work, finance and reporting are stable

## Product Design Rules

1. The application must model business objects once and reuse them across workspaces.
2. Every user-facing workspace must map back to shared business objects, workflow states and business events.
3. Customer workflows must support both organisation-led and individual-led customers as first-class records.
4. Built-environment workflows must support inspection, evidence, review and issue lifecycles.
5. All commercially relevant work must flow from client and instruction to invoice, cost and reporting.
6. All regulated or professionally sensitive records must be auditable and retainable.
7. Route doorways must not create separate versions of the same business truth.

## Release Shape

### Foundation Release

- shared party, person, business and partner objects
- client and instruction model
- property model
- reference data, users, roles and workflows

### Delivery Release

- activity management engine
- project and task management
- evidence, documents and deliverables

### Commercial Control Release

- fee agreements, WIP, invoicing, payments, supplier cost, margin and profitability

### Control And Scale Release

- procurement, people/resource planning, compliance, analytics, integrations and automation
