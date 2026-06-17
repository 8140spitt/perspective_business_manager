# Enterprise Relationship Model

## Purpose

This document defines how Perspective Business Manager (PBM) enterprise objects relate to each other.

It is the bridge between:

```text
Enterprise Meta Model
Enterprise Capability Model
Canonical Enterprise Data Model
Business Object Catalogue
```

and the implementation concerns of:

```text
schema design
package boundaries
services
repositories
routes
permissions
workflow
reporting
integrations
framework extensions
```

PBM must not be understood as a single hierarchy such as `Client -> Instruction -> Activity`.

PBM is an enterprise graph.

The relationship model defines how shared enterprise objects connect without allowing each route, module or industry extension to create its own duplicate reality.

## Source Architecture

This document derives from:

- [000-enterprise-meta-model.md](./000-enterprise-meta-model.md)
- [001-enterprise-capability-model.md](./001-enterprise-capability-model.md)
- [001-canonical-enterprise-data-model.md](./001-canonical-enterprise-data-model.md)
- [002-business-object-catalogue.md](./002-business-object-catalogue.md)

## Relationship Philosophy

Traditional ERP systems often hard-code relationships inside modules.

Examples:

```text
Customer -> Sales Order
Sales Order -> Project
Project -> Task
Task -> Cost
```

This works for simple flows, but enterprise reality is rarely simple.

PBM must support relationships such as:

```text
one customer involved in many contracts
one contract authorising many projects
one project spanning multiple contracts
one property affected by many projects
one supplier also being a customer
one document evidencing multiple controls
one risk affecting multiple projects
one framework applying to many work packages
one invoice referencing several deliverables
```

Therefore PBM distinguishes:

```text
Object Types
Relationship Types
Relationship Instances
Relationship Metadata
Relationship Lifecycle
```

This allows PBM to behave like an enterprise graph while still being implemented on relational databases.

## Relationship Design Principles

1. Relationships follow business meaning, not screen layout.
2. Routes are workspaces and do not own relationships.
3. Packages own relationship behaviour only where they own the underlying object or capability.
4. If a concept is only a connection between two objects, prefer a relationship object over a new root object.
5. If a relationship has business meaning, status, dates, roles, percentages, value or evidence, model it explicitly.
6. Relationships may have lifecycle and events.
7. Relationships may be governed by workflow and controls.
8. Relationships must support B2B, B2C, supplier, internal and multi-party cases.
9. Frameworks may require relationships, but must not create duplicate object models.
10. Reports must traverse canonical relationships rather than reconcile duplicated data.

## Root Relationship Pattern

The root enterprise pattern is:

```text
Party
  participates in Agreement

Agreement
  authorises Work

Work
  affects Thing

Work
  consumes Party or Thing as Resource

Work
  creates Information

Work
  creates Transaction

Transaction
  references Party / Agreement / Work / Thing

Control
  governs Party / Thing / Agreement / Work / Transaction / Information

Information
  evidences Party / Thing / Agreement / Work / Transaction / Control

Event
  records immutable history across all objects and relationships
```

This is not a strict hierarchy.

It is a reusable relationship grammar.

## Object Types

PBM root object types are:

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

Examples:

```text
Party: Person, Organisation, Client Account, Supplier Account
Thing: Asset, Property, Equipment, Material
Agreement: Opportunity, Proposal, Contract, Purchase Order
Work: Project, Work Package, Activity, Task, Deliverable
Transaction: Budget, Cost, Invoice, Payment, Journal
Information: Document, Evidence, Record, Report
Control: Risk, Issue, Change, Framework, Workflow, Compliance Requirement
Platform Object: Business Event, Reference Data, User, Permission
```

## Relationship Types

PBM should maintain a controlled vocabulary of relationship types.

Examples:

```text
owns
occupies
manages
represents
employs
supplies
contracts_with
bills_to
reports_to
approves
requests
offers
accepts
authorises
governs
controls
affects
uses
consumes
produces
delivers
contains
belongs_to
depends_on
references
evidences
allocates
assigned_to
responsible_for
funds
charges
pays
receives
```

Relationship types should be governed as reference data or metadata.

They should not be scattered as uncoordinated hard-coded strings across packages.

## Relationship Instances

A relationship instance is the actual business connection between two objects.

Examples:

```text
Organisation A owns Property B
Person C represents Organisation A
Client Account D requests Proposal E
Contract F authorises Project G
Project G affects Building H
Engineer I is assigned to Task J
Document K evidences Control L
Risk M affects Project G
Invoice N bills Client Account D
Payment O settles Invoice N
Framework P governs Project G
```

Relationship instances may require attributes such as:

```text
relationship type
source object type
source object id
target object type
target object id
role code
status
start date
end date
effective date
percentage / share
priority
sequence
value
currency
responsible party
created by
created at
closed by
closed at
notes
```

## Relationship Lifecycle

Relationships can have lifecycle.

Examples:

```text
proposed
active
suspended
superseded
expired
terminated
archived
```

A relationship lifecycle should be explicit when the relationship has business consequence.

Examples:

```text
property ownership
client account status
supplier qualification
project assignment
contract validity
framework assignment
billing responsibility
approval delegation
```

## Relationship Categories

PBM relationships fall into these broad categories:

```text
Identity relationships
Commercial relationships
Delivery relationships
Resource relationships
Asset relationships
Financial relationships
Information relationships
Governance relationships
Framework relationships
Platform relationships
```

---

# 1. Party Relationships

## Purpose

Party relationships define how people, organisations, teams and accounts relate to one another and to other enterprise objects.

## Common Relationship Types

```text
is_person
is_organisation
has_role
has_account
represents
employed_by
contracted_by
member_of
owns
manages
bills_to
contacts
approves
supplies
subcontracts
regulates
```

## Canonical Patterns

```text
Party -> Person
Party -> Organisation
Party -> Party Role
Party -> Party Relationship -> Party
Party -> Client Account
Party -> Supplier Account
Party -> Employee Record
Party -> Contractor Record
```

## Design Rules

1. Person and Organisation specialise Party.
2. Customer, supplier, employee and contractor are roles, accounts or relationships, not separate identity roots.
3. A Party may hold many roles in different contexts.
4. Party relationships must support both B2B and B2C.
5. Billing, representative and intermediary cases must be modelled through roles and relationships.

## Current Implementation

Current objects include:

```text
party
person
organisation
party_role
party_relationship
client_account
```

## Required Evolution

Add or formalise:

```text
supplier_account
employee_record
contractor_record
team
party relationship type governance
party relationship lifecycle
```

---

# 2. Thing Relationships

## Purpose

Thing relationships define how assets, property, equipment, products, materials and locations relate to Parties, Work, Agreements, Transactions, Information and Controls.

## Common Relationship Types

```text
owns
occupies
manages
located_at
contains
part_of
installed_in
used_by
affected_by
maintained_by
inspected_by
subject_of
```

## Canonical Patterns

```text
Thing -> Asset
Asset -> Asset Hierarchy
Property -> Property Unit
Party -> owns / occupies / manages -> Thing
Work -> affects -> Thing
Thing -> has -> Information
Thing -> governed_by -> Control
```

## Design Rules

1. Property is a Thing specialisation, not the whole Thing model.
2. Things can be subjects of Work.
3. Things can be resources used by Work.
4. Things can have documents, evidence, financial context and compliance controls.
5. Asset hierarchy must support parent/child relationships.

## Current Implementation

Current objects include:

```text
address
party_address
property
property_unit
property_party_role
```

## Required Evolution

Add or formalise:

```text
asset
asset_type
asset_hierarchy
location
equipment
plant
vehicle
material
inventory_item
software_asset
information_asset
```

---

# 3. Agreement Relationships

## Purpose

Agreement relationships define how commercial and obligation objects connect Parties to authorised Work, Transactions, Controls and Information.

## Common Relationship Types

```text
requests
offers
quotes
bids
accepts
contracts_with
authorises
instructs
varies
supersedes
renews
terminates
commits
```

## Canonical Patterns

```text
Party -> requests -> Enquiry
Client Account -> owns -> Opportunity
Opportunity -> produces -> Proposal / Quotation / Tender
Proposal / Quotation -> accepted_as -> Contract
Contract -> authorises -> Project / Work
Purchase Order -> authorises -> Supplier Work / Commitment
Change Order -> varies -> Contract / Project / Work
```

## Design Rules

1. Agreements link Parties to obligations.
2. Agreements may authorise Work.
3. Agreements may create Transactions.
4. Agreements may require Information.
5. Agreements may be governed by Controls.
6. Sales, procurement, projects and finance must not recreate separate agreement realities.

## Current Implementation

Current objects include:

```text
instruction
instruction_party_role
instruction_property
fee_agreement
```

## Required Evolution

Add or formalise:

```text
lead
enquiry
opportunity
proposal
quotation
tender
bid
contract
framework_agreement
service_agreement
purchase_order
change_order
variation
```

## Instruction Reclassification

Instruction is currently implemented but must be reviewed.

Instruction may become one of:

```text
Agreement specialisation
Work authorisation
Service request
Contract trigger
Operational instruction
```

It should no longer be treated as the central ERP spine.

---

# 4. Work Relationships

## Purpose

Work relationships define how effort is structured, authorised, assigned, executed, controlled and completed.

## Common Relationship Types

```text
authorised_by
contains
part_of
assigned_to
responsible_for
depends_on
produces
delivers
affects
uses
consumes
completed_by
reviewed_by
approved_by
```

## Canonical Patterns

```text
Agreement -> authorises -> Project
Project -> contains -> Work Package
Work Package -> contains -> Activity / Task
Activity -> produces -> Observation
Observation -> evaluated_by -> Assessment
Assessment -> requires -> Action
Action -> produces -> Outcome
Work -> produces -> Deliverable
Work -> creates -> Information
Work -> creates -> Transaction
Control -> governs -> Work
```

## Design Rules

1. Project is the primary controlled delivery container after authorisation.
2. Work may exist without a Project, but project-enabled work must link to Project.
3. Work may be decomposed into Work Packages, Activities and Tasks.
4. Work may produce Deliverables, Information, Transactions and Events.
5. Activities and findings are execution detail, not the whole ERP model.

## Current Implementation

Current objects include:

```text
project
project_instruction
activity
activity_area
observation
assessment
action
outcome
deliverable
```

## Required Evolution

Add or formalise:

```text
portfolio
programme
work_package
task
job
work_order
service_request
milestone
dependency
project_role
project_resource
project_framework
project_budget
```

---

# 5. Transaction Relationships

## Purpose

Transaction relationships define how money is planned, committed, incurred, recognised, invoiced, paid and reported.

## Common Relationship Types

```text
budgets
forecasts
commits
costs
charges
invoices
pays
receives
settles
credits
allocates_to
recognises
accrues
```

## Canonical Patterns

```text
Agreement -> creates -> Commitment
Project -> has -> Budget
Work -> incurs -> Cost
Purchase Order -> creates -> Commitment
Supplier Account -> receives -> Purchase Order
Supplier Account -> sends -> Purchase Invoice
Client Account -> receives -> Sales Invoice
Payment -> settles -> Invoice
Transaction -> references -> Party / Agreement / Work / Thing
```

## Design Rules

1. Finance records economic consequence.
2. Transactions must reference their source context.
3. Finance must not recreate customer, supplier, project or contract objects.
4. Project profitability should be derived from shared Project, Agreement, Cost and Revenue relationships.

## Current Implementation

Current objects include:

```text
fee_agreement
sales_invoice
```

## Required Evolution

Add or formalise:

```text
chart_of_accounts
financial_period
cost_centre
profit_centre
budget
forecast
commitment
cost
revenue
purchase_invoice
payment
receipt
credit_note
journal_entry
wip_item
expense
tax
```

---

# 6. Information Relationships

## Purpose

Information relationships define how documents, records, evidence, correspondence, reports and knowledge attach to enterprise objects.

## Common Relationship Types

```text
attaches_to
evidences
records
references
supersedes
revises
transmits
approves
publishes
retains
```

## Canonical Patterns

```text
Document -> attaches_to -> Any supported enterprise object
Evidence -> evidences -> Control / Work / Information / Transaction
Document Revision -> revises -> Document
Record -> records -> Business fact
Template -> generates -> Document / Report / Certificate
Information -> satisfies -> Control
Work -> produces -> Information
```

## Design Rules

1. Documents are not islands.
2. Evidence must attach to what it proves.
3. Records must preserve business facts.
4. Information may require workflow and approval.
5. Information may satisfy Controls or Framework requirements.

## Current Implementation

Current direction recognises:

```text
documents
evidence
```

## Required Evolution

Add or formalise:

```text
document
document_revision
record
evidence_item
correspondence
template
report
certificate
drawing
specification
knowledge_article
retention_policy
transmittal
```

---

# 7. Control Relationships

## Purpose

Control relationships define how governance, risk, compliance, quality, approval, workflow and frameworks govern enterprise objects.

## Common Relationship Types

```text
governs
controls
requires
evidenced_by
approves
rejects
escalates
mitigates
closes
reviews
audits
assigns_framework
requires_deliverable
requires_evidence
```

## Canonical Patterns

```text
Framework -> governs -> Project / Work / Agreement / Thing
Compliance Requirement -> governs -> Enterprise Object
Control -> requires -> Evidence
Risk -> affects -> Project / Agreement / Thing
Issue -> affects -> Work / Agreement / Transaction
Change -> varies -> Agreement / Work / Information / Transaction
Workflow Instance -> controls lifecycle of -> Business Object
Approval -> approves -> Transition / Object / Information
Audit -> reviews -> Object / Process / Control
```

## Design Rules

1. Compliance is a platform capability, not an industry module.
2. Frameworks alter behaviour through metadata.
3. Controls can apply to any major meta concept.
4. Controls may require evidence.
5. Workflow is a control mechanism.
6. Events record control history.

## Current Implementation

Current objects include:

```text
workflow_definition
workflow_state
workflow_transition
workflow_action
workflow_instance
workflow_instance_state
business_event
```

## Required Evolution

Add or formalise:

```text
risk
issue
change
compliance_requirement
control
audit
audit_finding
quality_check
non_conformance
corrective_action
preventive_action
approval
policy
framework
framework_version
framework_assignment
control_template
checklist_template
evidence_requirement
```

---

# 8. Platform Relationships

## Purpose

Platform relationships support security, reference data, automation, events, integrations and administration.

## Canonical Patterns

```text
User -> represents -> Party / Person
User -> has -> Role
Role -> grants -> Permission
Reference Code Set -> contains -> Reference Code Value
Business Event -> records -> Object / Relationship / Workflow Transition
Integration Endpoint -> publishes / receives -> Business Event
Automation Rule -> triggers_on -> Event / State / Condition
```

## Design Rules

1. User should not duplicate Person identity.
2. Permissions must map to capabilities and object actions.
3. Reference data must be governed.
4. Integration payloads must reference canonical objects.
5. Automation should be event-driven where possible.

---

# Relationship Metadata

Some relationships require only a simple foreign key.

Other relationships require explicit relationship records with metadata.

Use a relationship object when the relationship has:

```text
role
status
start date
end date
effective date
approval
percentage
value
sequence
priority
lifecycle
notes
evidence
workflow
events
```

Examples requiring explicit relationship records:

```text
party relationship
property party role
instruction party role
project role
project resource allocation
framework assignment
billing responsibility
contract party role
asset ownership
supplier qualification
```

## Relationship Table Guidance

A relationship table should normally include:

```text
relationship_id
source_object_type
source_object_id
target_object_type
target_object_id
relationship_type_code
role_code
status_code
effective_from
effective_to
created_at
created_by
updated_at
updated_by
```

For high-value relationships, prefer specific relationship tables over one generic table.

For low-value attachments, a controlled polymorphic attachment model may be acceptable if integrity is handled in the service layer.

---

# Relationship Events

Relationship changes should emit business events when they affect enterprise meaning.

Examples:

```text
party_role_assigned
party_relationship_created
client_account_opened
contract_accepted
project_created
project_framework_assigned
resource_allocated
purchase_order_issued
invoice_issued
payment_received
risk_linked
control_satisfied
document_attached
workflow_transitioned
```

Events should capture:

```text
object type
object id
relationship type
source object
target object
previous state
new state
actor
timestamp
reason
```

---

# Reporting Implications

Reporting should traverse relationships rather than reconcile duplicated module data.

Examples:

## Customer Profitability

```text
Party
  -> Client Account
    -> Agreement
      -> Project / Work
        -> Transaction
```

## Project Profitability

```text
Project
  -> Agreement / Contract
  -> Budget
  -> Cost
  -> Revenue
  -> Sales Invoice
  -> Purchase Order / Commitment
```

## Compliance Status

```text
Project / Work / Thing
  -> Framework Assignment
    -> Compliance Requirement
      -> Evidence
        -> Approval / Control Status
```

## Resource Utilisation

```text
Party / Thing as Resource
  -> Allocation
    -> Work
      -> Timesheet / Cost / Progress
```

## Document Completeness

```text
Framework / Control
  -> Evidence Requirement
    -> Document / Evidence Item
      -> Approval Status
```

---

# Future Graph Strategy

PBM should remain relational-database compatible.

However, its conceptual model is graph-like.

Future improvements may include:

```text
relationship registry
object type registry
relationship type registry
framework relationship requirements
graph-style reporting views
impact analysis queries
dependency traversal
object lineage
traceability graph
```

This should be implemented deliberately, not by allowing uncontrolled polymorphic relationships everywhere.

## Graph Governance Rules

1. High-value relationships should be typed and explicit.
2. Low-value attachments may use controlled polymorphic references.
3. Relationship types must be governed.
4. Relationship lifecycle must be explicit where business meaning changes over time.
5. Relationship events must be emitted for important changes.
6. Reporting models should be built from canonical relationships.

---

# Relationship Review Questions

Before adding any new relationship, ask:

1. Which two objects are being related?
2. Which meta concepts do those objects derive from?
3. What is the business meaning of the relationship?
4. Is the relationship temporary or permanent?
5. Does it need status?
6. Does it need dates?
7. Does it need role or percentage?
8. Does it need workflow?
9. Does it need evidence?
10. Should changes emit business events?
11. Should this be a specific relationship table or a generic attachment?
12. How will this relationship be reported?
13. Does this relationship duplicate an existing relationship?
14. Does this relationship support B2B, B2C, internal and supplier scenarios where relevant?

---

# Immediate Implementation Consequences

The current implementation should now be reviewed for these changes:

```text
Instruction should be reclassified under Agreement / Work Authorisation.
Project should be elevated as the central controlled delivery container.
Property should be reviewed as a Thing / Asset specialisation.
Activity / Observation / Assessment / Action / Outcome should remain Work execution objects, not the ERP spine.
Commercial lifecycle objects must be added.
Procurement relationship objects must be added.
Resource allocation relationships must be added.
Finance relationships must reference Agreement / Work / Party / Thing.
Documents and evidence must attach to all supported enterprise objects.
Framework assignments and compliance requirements must become first-class relationships.
```

---

# Summary

PBM is not a single parent-child hierarchy.

PBM is an enterprise graph built from canonical objects and governed relationship types.

The core relationship grammar is:

```text
Party participates in Agreement
Agreement authorises Work
Work affects Thing
Work consumes Party or Thing as Resource
Work creates Information
Work creates Transaction
Control governs everything
Information evidences everything
Event records everything
```

This relationship model should guide schema design, route design, package boundaries, workflow design, reporting and framework extension design.
