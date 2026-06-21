# Table CRUD API and Workflow Engine

## Purpose

This document defines the PBM pattern for table-level CRUD APIs and workflow-driven business behaviour.

The goal is to separate four concerns that were becoming mixed together:

```text
Database table
    -> CRUD API
        -> workflow rule
            -> workspace screen
```

A table stores data.

A CRUD API provides safe access to that table.

A workflow decides what can happen next.

A workspace gives the user a business activity view.

## Core rule

Every main table should have a standard internal CRUD capability.

That does not mean every user can directly create, edit or delete every record.

The CRUD layer is the data access foundation. The workflow layer is the business control layer.

```text
CRUD API = controlled table access
Workflow = business rules, transitions, actions and permissions
Workspace = user journey and activity view
Route = doorway into the work
```

## Why this matters

PBM must avoid hiding business rules inside page routes.

A page such as:

```text
/app/sales/fee-proposals
```

should not be the only place that understands a fee proposal.

The fee proposal record should be available through the shared data spine and governed by workflow rules.

The sales route is only one doorway into that record.

## Table CRUD API pattern

Each registered table should support a consistent internal API shape:

```text
GET     /api/data/{table}
POST    /api/data/{table}
GET     /api/data/{table}/{id}
PATCH   /api/data/{table}/{id}
DELETE  /api/data/{table}/{id}
```

Example:

```text
GET     /api/data/enquiry
POST    /api/data/enquiry
GET     /api/data/enquiry/{id}
PATCH   /api/data/enquiry/{id}
DELETE  /api/data/enquiry/{id}
```

The API should be generated or driven from table metadata where possible.

## Required CRUD safeguards

The CRUD layer must not be a raw database tunnel.

Every table CRUD endpoint needs:

```text
Table registry lookup
Field metadata
Primary key rules
Required field validation
Type validation
Relationship validation
Permission checks
Row-level access checks
Audit logging
Soft delete / archive behaviour where required
Workflow lock checks
Business object mapping
```

## Table registry

The table registry should describe each table that can be exposed through the generic CRUD layer.

Minimum registry fields:

```text
table_key
physical_table_name
business_object_key
primary_key
allowed_operations
route_label
workspace_visibility
soft_delete_strategy
audit_strategy
workflow_policy
```

Example:

```text
table_key: enquiry
physical_table_name: enquiry
business_object_key: commercial_enquiry
primary_key: enquiry_id
allowed_operations: read, create, update, archive
workflow_policy: commercial_enquiry_workflow
```

## Workflow layer pattern

Workflow APIs sit above table CRUD.

They should expose business actions, not raw table updates.

Candidate API shape:

```text
POST /api/workflows/{workflowKey}/start
GET  /api/workflows/instances/{instanceId}
GET  /api/workflows/instances/{instanceId}/actions
POST /api/workflows/instances/{instanceId}/transition
```

Example:

```text
POST /api/workflows/commercial-enquiry/start
POST /api/workflows/instances/enquiry-123/transition
```

Example transition payload:

```json
{
  "transition": "assign",
  "assigned_to": "employee_42"
}
```

The workflow engine decides whether that transition is valid.

## Workflow responsibilities

A workflow transition may:

```text
Validate current state
Check user authority
Check required fields
Lock or unlock fields
Create related records
Update record status
Write audit events
Create tasks or activities
Attach evidence requirements
Trigger notifications
Expose the next available actions
Suggest the next route doorway
```

CRUD writes the table.

Workflow decides whether the write should happen.

## Commercial lifecycle example

The client and commercial flow should be modelled as records plus workflow transitions.

```text
Person or organisation contact captured
    -> party / contact records created

Client asks for work
    -> enquiry record created

Sales assigns enquiry
    -> enquiry workflow transition: new -> assigned

Staff member accepts or reviews enquiry
    -> enquiry workflow transition: assigned -> in review

Opportunity or project is generated
    -> workflow action creates opportunity / project relationship

Fee proposal is prepared
    -> fee proposal record created and linked to enquiry / opportunity / project

Client accepts
    -> workflow transition creates instruction or authorised work
```

The important point is that each record exists once.

Different workspaces can show different activity views over those records.

## Workspace usage pattern

Workspace pages should call workflow actions for business decisions.

They should use CRUD reads for lists, detail pages and controlled edits.

Example:

```text
Clients & Commercial
    reads clients, contacts, enquiries and proposals
    starts enquiries
    assigns enquiries
    converts enquiries
    prepares fee proposals

Project Delivery
    reads projects, activities and documents
    accepts assigned work
    updates project delivery state
    records evidence

Finance & Control
    reads invoices and payments
    approves, disputes or marks finance events through workflow
```

## Direct CRUD versus workflow action

Direct CRUD is acceptable for low-risk reference or administrative records.

Workflow actions are required when the change affects a business lifecycle.

Examples:

```text
Reference data label change -> CRUD may be enough
New client enquiry -> workflow start required
Assign enquiry to staff member -> workflow transition required
Convert enquiry to project -> workflow action required
Approve supplier invoice -> workflow transition required
Archive active project -> workflow transition required
```

## Permission model

Permissions should be checked at both layers.

```text
CRUD permission
    Can this user perform this operation on this table and row?

Workflow permission
    Can this user perform this business transition at this lifecycle state?
```

A user may be allowed to read a table but not perform a workflow action.

A user may be allowed to update simple fields but not change lifecycle state directly.

## Audit model

Every CRUD write should produce an audit event.

Every workflow transition should produce a business event.

These are not the same thing.

```text
CRUD audit
    Field-level or row-level data change record

Workflow event
    Business lifecycle event explaining what happened and why
```

Example:

```text
CRUD audit:
    enquiry.assigned_to changed from null to employee_42

Workflow event:
    Enquiry assigned to employee_42 by sales_manager_7 using transition assign
```

## Proposed package structure

Candidate server-side structure:

```text
src/lib/server/data/
    table-registry.ts
    table-metadata.ts
    crud-service.ts
    validation.ts
    permissions.ts
    audit.ts

src/lib/server/workflow/
    workflow-registry.ts
    workflow-engine.ts
    transition-engine.ts
    action-runner.ts
    workflow-permissions.ts

src/routes/api/data/[table]/+server.ts
src/routes/api/data/[table]/[id]/+server.ts

src/routes/api/workflows/[workflowKey]/start/+server.ts
src/routes/api/workflows/instances/[instanceId]/+server.ts
src/routes/api/workflows/instances/[instanceId]/actions/+server.ts
src/routes/api/workflows/instances/[instanceId]/transition/+server.ts
```

## Implementation sequence

Build this in stages.

```text
1. Define table registry shape
2. Register a small set of tables
3. Build read/list CRUD safely first
4. Add create/update with validation and audit
5. Add soft archive rules
6. Add workflow registry
7. Add workflow start and transition APIs
8. Connect one commercial lifecycle flow
9. Connect workspace screens to workflow actions
10. Expand table coverage
```

## First candidate tables

The first CRUD/API registry should focus on the records needed for the commercial-to-project flow.

```text
party
person_entity
business_entity
business_partner
business_partner_role
contact_method
address
enquiry
opportunity
fee_proposal
project
project_party
project_service
instruction
activity
document
evidence_item
```

Additional tables can follow once the pattern is stable.

## Design decisions

1. CRUD APIs should be generic but not uncontrolled.
2. Workflow should own lifecycle transitions.
3. Workspace routes should not own the record.
4. Route names should reflect user work, not table ownership.
5. Business objects should remain stable even if route names change.
6. Audit and workflow events are both required.
7. The workflow engine should sit above CRUD, not inside page components.

## Open questions

These need decisions before implementation:

```text
Should all tables be registered manually first, or discovered from schema?
How much table metadata should come from database comments?
Should every table support archive rather than delete?
How are workflow states stored?
How are workflow actions exposed to the UI?
How are generated CRUD endpoints protected from misuse?
How are field-level permissions represented?
```

## Summary

PBM should use table CRUD APIs as a controlled data foundation.

Business workflows should define the actual process.

Workspaces should guide users through work using those workflows.

This lets PBM support complete business coverage without hard-coding business rules into route pages or duplicating records across workspaces.
