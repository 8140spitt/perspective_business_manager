# Core Business Object Spine

Perspective Business Manager is not organised around traditional ERP modules first. It is organised around the business objects that a RICS practice actually works with.

The core spine is:

```text
Party
  -> Client Account
    -> Instruction
      -> Property
        -> Project
          -> Deliverable
            -> Sales Invoice
```

## Design rule

Routes and modules are user-facing workspaces. They are not the source of truth.

The source of truth is the business object model.

That means:

- CRM manages parties, client accounts, contacts and relationships.
- Sales manages enquiries, opportunities, fee proposals and quotations before instruction acceptance.
- Operations manages the instruction lifecycle.
- Property manages subject properties, sites, buildings, units and building elements.
- Projects manages delivery work, team activity, programme, tasks, risks and issues.
- Finance manages fees, WIP, invoices, payments and profitability.
- Compliance audits the whole chain.
- Documents and records attach to the objects in the chain rather than living as isolated files.

## Why this matters

Traditional ERP design often starts with modules such as CRM, Finance, HR and Procurement. That is useful for navigation, but it can fragment the underlying model.

For a surveying and building consultancy practice, the highest-value thread is the lifecycle from client relationship to instruction, inspection, deliverable, invoice and audit record.

Every new table, route and workflow should be checked against this question:

> Which object in the spine does this belong to, and what business event does it record?

## Current database foundation

The foundation migration already provides reusable enterprise objects:

- `party`
- `person`
- `organisation`
- `party_role`
- `party_relationship`
- `address`
- `party_address`
- `contact_method`
- `property`
- `property_unit`
- `property_party_role`
- `ref_code_set`
- `ref_code_value`

The second migration adds the operational spine:

- `client_account`
- `instruction`
- `instruction_party_role`
- `instruction_property`
- `project`
- `project_instruction`
- `deliverable`
- `fee_agreement`
- `sales_invoice`

## Next workflow layer

The next migration should not add random screens. It should add business events and workflow history, for example:

- instruction status transitions
- project status transitions
- deliverable issue/review events
- fee approval events
- invoice issue/payment events
- audit events

This keeps the product defensible, reportable and scalable.
