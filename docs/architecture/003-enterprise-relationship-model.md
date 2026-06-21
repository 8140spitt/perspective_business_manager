# Enterprise Relationship Model

## Purpose

This document defines how PBM business objects connect.

PBM is not a tree of screens. PBM is an enterprise graph of business objects, relationships, activity views and shared records.

The relationship model exists to prevent duplicated realities across workspaces.

## Product language rule

Use PBM language:

```text
Business object
Relationship type
Relationship instance
Workspace
Activity view
Route doorway
Shared data spine
Integrated record
```

External ERP module lists are completeness references only. They are not PBM product language.

## Source architecture

This document supports:

- [000-enterprise-meta-model.md](./000-enterprise-meta-model.md)
- [001-canonical-enterprise-data-model.md](./001-canonical-enterprise-data-model.md)
- [002-business-object-catalogue.md](./002-business-object-catalogue.md)
- [012-enterprise-capability-coverage-catalogue.md](./012-enterprise-capability-coverage-catalogue.md)

## Relationship philosophy

PBM must support real business complexity without turning every workspace into a separate mini-system.

Examples PBM must support:

```text
one client involved in many projects
one project involving many clients, contacts, suppliers and employees
one supplier also being a client
one quote row becoming project scope and later a sales invoice row
one purchase order row becoming supplier cost against a project service
one supplier invoice being visible to procurement, finance, projects and reporting
one document evidencing many controls
one risk affecting several projects
one employee holding several positions over time
one position carrying authority for approvals
```

The relationship model therefore distinguishes:

```text
Business object type
Relationship type
Relationship instance
Relationship metadata
Relationship lifecycle
Relationship evidence
Relationship events
```

This allows PBM to behave like an enterprise graph while still being implemented on a relational database.

## Relationship design principles

1. Relationships follow business meaning, not screen layout.
2. Routes are doorways into the data spine; they do not own relationships.
3. If a concept is only a connection between two objects, prefer a relationship over a new root object.
4. If a relationship has dates, status, role, responsibility, percentage, value, approval or evidence, model it explicitly.
5. Relationships may have lifecycle, workflow, events and controls.
6. Reports must traverse shared relationships instead of reconciling duplicated records.
7. Relationship types should be governed as reference data or metadata, not scattered as hard-coded strings.

## Root relationship grammar

The reusable enterprise grammar is:

```text
Party
    participates in Agreement
    performs Work
    receives Transaction
    owns or uses Thing

Agreement
    authorises Work
    creates obligations
    creates Transaction

Work
    affects Thing
    consumes Party or Thing as resource
    creates Information
    creates Transaction

Transaction
    references Party, Agreement, Work or Thing

Control
    governs Party, Thing, Agreement, Work, Transaction or Information

Information
    evidences Party, Thing, Agreement, Work, Transaction or Control

Event
    records immutable history across objects and relationships
```

This is not a strict hierarchy. It is a reusable grammar.

## Core object types

```text
Party: business_entity, person_entity, business_partner, employee
Thing: asset, property, location, equipment, material, inventory item
Agreement: quote, instruction, contract, purchase order, change
Work: project, service, activity, assignment, work order, milestone
Transaction: sales invoice, supplier invoice, payment, ledger entry, budget, cost
Information: document, evidence, template, report
Control: risk, issue, control, approval, non-conformance, corrective action
Platform Object: user, permission, workflow, reference data, setting
```

## Controlled relationship type examples

```text
owns
uses
represents
employs
reports_to
occupies_position
assigned_to
responsible_for
approves
contracts_with
supplies
bills_to
requests
offers
accepts
authorises
governs
controls
affects
consumes
produces
delivers
contains
belongs_to
depends_on
references
evidences
funds
charges
pays
receives
```

Relationship types should become governed reference data where possible.

## Key PBM relationship patterns

### 1. Party role pattern

```text
business_entity / person_entity
    -> business_partner
        -> business_partner_role
```

Use this when one real-world party plays different roles.

Example:

```text
A business can be a client, supplier, insurer and landlord without being duplicated.
```

### 2. Workforce structure pattern

```text
person_entity
    -> employee
        -> employee_position
            -> position
                -> organisation_unit
                    -> business_function
```

Use this to connect people to the operating model.

### 3. Project participation pattern

```text
project
    -> project_party
        -> business_partner / business_partner_role

project
    -> project_contact
        -> business_partner_person / person_entity

project
    -> project_assignment
        -> employee / position / person
```

Use this to show who is involved, who is contacted and who is doing the work.

### 4. Service and scope pattern

```text
project
    -> project_service
        -> project_service_cost
```

A project service is the bridge between delivery scope, pricing, procurement cost, finance and reporting.

### 5. Commercial value pattern

```text
project
    -> project_quote
        -> project_quote_row
            -> project_service
```

Use this so commercial value connects to actual work.

### 6. Supplier cost pattern

```text
supplier / business_partner
    -> purchase_order
        -> purchase_order_row
            -> project_service

supplier_invoice
    -> supplier_invoice_row
        -> purchase_order_row / project_service
```

Use this so supplier spend can be seen by procurement, finance, projects and reporting.

### 7. Customer billing pattern

```text
client / business_partner
    -> sales_invoice
        -> sales_invoice_row
            -> project_quote_row / project_service
```

Use this so customer billing can be traced to quote, project, scope and delivered value.

### 8. Control and evidence pattern

```text
control / risk / issue
    -> governed business object
    -> evidence / document
    -> event history
```

Use this so compliance and quality records prove what happened, who approved it and what evidence exists.

## Workspace examples

### Supplier invoice

The same supplier invoice can be used by multiple workspaces:

```text
Procurement, Materials & Logistics:
    Did this match the purchase order and service receipt?

Finance & Control:
    Is this approved, due, paid, disputed or in the correct period?

Project Delivery:
    What actual cost has this created for the project?

Reporting, Documents & Admin:
    What is the cost, margin and cash exposure?
```

Same record. Different activity view.

### Project service

```text
Clients & Commercial:
    quote and price the service

Project Delivery:
    deliver and manage the service

Procurement:
    buy external support or materials for the service

Finance & Control:
    invoice, cost and analyse the service

Quality & Compliance:
    inspect, evidence and control the service
```

Same service. Different activity view.

## Relationship implementation rules

1. Do not duplicate a record just because another workspace needs to see it.
2. Model relationship context explicitly when it has business meaning.
3. Keep relationship types governed and reusable.
4. Keep route-specific display logic separate from business relationship truth.
5. Support date-effective relationships where people, roles, positions, responsibilities or terms change over time.
6. Attach evidence to the relationship when the relationship itself needs proof.
7. Make relationships reportable from the start.

## Minimum relationship metadata

Where a relationship is explicit, consider:

```text
source object
target object
relationship type
role / purpose
status
start date
end date
responsible person or position
value / percentage / quantity where relevant
approval state where relevant
evidence links where relevant
event history
```

## Final rule

The relationship model is what makes PBM an integrated enterprise system.

Without shared relationships, PBM becomes a collection of disconnected workspaces.

With shared relationships, PBM becomes one operating model with many clear activity views.
