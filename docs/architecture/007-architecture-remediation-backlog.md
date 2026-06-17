# Architecture Alignment Review And Remediation Backlog

## Purpose

This document records the first architecture alignment review after the PBM architecture reset.

The architecture reset introduced:

```text
000-enterprise-meta-model.md
001-enterprise-capability-model.md
001-canonical-enterprise-data-model.md
```

The new architectural foundation defines PBM as one coherent ERP platform built from seven meta concepts:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

This document reviews the current repository direction against that model and converts known misalignment into a remediation backlog.

## Review Scope

This review covers the current architecture and implementation areas already visible or previously inspected during the refactor:

```text
docs/architecture
setup-perspective-os.cjs
src/lib/packages
src/lib/server/db/schema
src/routes/app
src/lib/server/repositories
src/lib/server/services
```

The repository could not be fully enumerated through the connector during this review. Therefore this is an initial architecture alignment review, not a complete code audit.

A deeper local audit should still be performed using:

```bash
find src/lib/packages -maxdepth 3 -type f | sort
find src/routes/app -maxdepth 5 -type f | sort
find src/lib/server -maxdepth 5 -type f | sort
```

## Alignment Status Key

```text
GREEN   = directionally aligned
AMBER   = partly aligned, needs refactor or clarification
RED     = materially misaligned with the new architecture
UNKNOWN = requires deeper inspection
```

---

# Executive Summary

The repository has moved in the right direction but still contains structural assumptions from the earlier instruction/activity-centred model.

The biggest issue is not that current objects are wrong.

The issue is that their relative importance is wrong.

The current implementation gives heavy weight to:

```text
Party -> Client Account -> Instruction -> Activity -> Observation -> Assessment -> Action -> Outcome
```

The new architecture says PBM is broader:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

with user-facing ERP capabilities such as:

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

The implementation must now be pulled upward from a delivery-chain prototype into a full ERP architecture.

---

# Current Architecture Findings

## Finding 1: Setup Script Still Encodes Old Package Set

Status: AMBER

`setup-perspective-os.cjs` currently creates packages such as:

```text
core
reference-data
parties
client-accounts
properties
instructions
workflows
activities
documents
evidence
inspections
building-surveying
reports
finance
compliance
audit
```

This is partially aligned, but it does not yet reflect the new capability and meta-model package direction.

Missing or underrepresented package families include:

```text
agreements
commercial
contracts
projects
work
resources
procurement
assets
transactions
controls
frameworks
events
integrations
administration
```

The presence of `building-surveying` and `inspections` is not inherently wrong, but these must be treated as extension or work-pattern packages, not core ERP identity packages.

## Finding 2: Routes Still Reflect Earlier Workspace Shape

Status: AMBER

The setup script still seeds route families such as:

```text
/app/parties
/app/properties
/app/instructions
/app/workflows
/app/documents
/app/evidence
/app/surveys
/app/reports
/app/finance
/app/compliance
/app/admin/reference-data
```

These routes are useful, but they do not yet represent the intended ERP workspace model:

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

The most important route gaps are:

```text
/app/sales or /app/commercial
/app/projects
/app/resources
/app/procurement
/app/assets
/app/reporting
/app/administration
```

The current `/app/instructions` route family should be reviewed because Instruction is now an Agreement / Work-authorisation object rather than the centre of the ERP.

## Finding 3: Party And Client Account Direction Is Strong

Status: GREEN / AMBER

The creation of `client-accounts` as a first-class package was correct.

Party and Client Account now align with the new model:

```text
Party -> Client Account
```

However, the surrounding commercial lifecycle is still thin.

Missing Agreement-domain objects include:

```text
Lead
Enquiry
Opportunity
Proposal
Quotation
Tender
Contract
Framework Agreement
Service Agreement
Purchase Order
Change Order
Variation
```

Client Account should remain the commercial customer relationship layer, but commercial activity must move into an Agreement / Commercial package family rather than stay inside Party or CRM routes.

## Finding 4: Instruction Is Overweighted

Status: RED / AMBER

Instruction remains important, but it should no longer be treated as the central ERP object.

Under the new model, Instruction is context-dependent:

```text
Agreement
Work authorisation
Operational request
Contract trigger
```

The implementation and docs need to stop using Instruction as the main spine of PBM.

Instruction should become one object in the Agreement / Work-authorisation model.

A future decision is required:

```text
Should Instruction remain a canonical object?
Should it become a type of Agreement?
Should it become a type of Work Request?
Should it be renamed to Authorisation / Work Instruction / Service Instruction?
```

Until that decision is made, new features should avoid deepening Instruction-specific architecture.

## Finding 5: Activities / Observations / Assessments / Actions / Outcomes Are Valid But Too Central

Status: AMBER

These objects are valid PBM objects in the Work domain:

```text
Activity
Observation
Assessment
Action
Outcome
```

They are useful for operational execution, inspections, audits, quality, risk, compliance, technical work and evidence-driven workflows.

However, they should not define the core ERP spine.

They belong under:

```text
Work Domain
Operations & Work Execution Capability
Compliance / Quality / Evidence workflows where appropriate
```

Future refactor should ensure they are reusable work-execution objects, not surveying-specific objects.

## Finding 6: Project Is Underdeveloped Relative To ERP Role

Status: RED

The new architecture makes Project one of the most important Work-domain objects.

A Project should be able to connect to:

```text
Client Account
Agreement / Contract
Party roles
Things / Assets
Work packages
Activities
Tasks
Deliverables
Resources
Budgets
Costs
Purchase Orders
Invoices
Documents
Evidence
Risks
Issues
Changes
Compliance requirements
Frameworks
Workflow instances
Business events
Reports
```

The current implementation appears to treat Project as secondary to Instruction.

This must be reversed.

Project should become the central controlled delivery container after commercial or internal authorisation.

## Finding 7: Commercial Lifecycle Is Missing

Status: RED

The current repository does not yet represent the full commercial lifecycle expected of an ERP:

```text
Lead
Enquiry
Opportunity
Proposal
Quotation
Tender
Contract
Framework Agreement
```

This is a major gap because ERP delivery normally begins before project creation.

PBM needs a Commercial / Agreement model so work can flow naturally:

```text
Party
  -> Client Account
    -> Lead / Enquiry / Opportunity
      -> Proposal / Quotation / Tender
        -> Contract / Accepted Agreement
          -> Project / Work
```

## Finding 8: Procurement Is Missing As A Core ERP Capability

Status: RED

Procurement is currently not represented strongly enough.

PBM needs supplier-side Agreement and Transaction objects:

```text
Supplier Account
Purchase Requisition
RFQ
Supplier Quote
Purchase Order
Subcontract
Goods Receipt
Service Receipt
Purchase Invoice
Commitment
```

Procurement must attach to:

```text
Project
Work Package
Activity
Asset
Cost Centre
Agreement
```

## Finding 9: Resource Management Is Missing As A Core ERP Capability

Status: RED

PBM needs a resource model that can schedule, allocate and cost people and things.

Resource should be treated carefully.

A resource is often a Party or Thing used in a Work context:

```text
Person as Resource
Team as Resource
Equipment as Resource
Vehicle as Resource
Facility as Resource
Material as Resource
```

The resource model should therefore avoid duplicating Party and Thing identity.

It should define allocation, availability, utilisation, capacity, skills and cost context.

## Finding 10: Finance Is Too Thin

Status: RED

The current finance direction includes early objects such as:

```text
fee_agreement
sales_invoice
```

A full ERP finance model requires:

```text
Chart of Accounts
Financial Period
Cost Centre
Profit Centre
Budget
Forecast
Commitment
Cost
Revenue
Sales Invoice
Purchase Invoice
Payment
Receipt
Credit Note
Journal Entry
WIP Item
Expense
Tax
```

Finance must reference shared objects rather than recreate them.

## Finding 11: Asset / Thing Model Needs Generalisation

Status: AMBER / RED

The implementation currently contains Property-oriented objects.

Property is valid, but the broader architecture requires a general Thing / Asset model.

PBM must support:

```text
Property
Building
Land
Equipment
Plant
Vehicle
Product
Material
Inventory Item
Software Asset
Information Asset
Infrastructure
```

Property should become a specialisation or view of Asset / Thing, not the only asset concept.

## Finding 12: Documents And Evidence Are Correctly Recognised But Not Fully Materialised

Status: AMBER

Documents and evidence are correctly identified as cross-cutting.

The implementation still needs a stronger Information domain:

```text
Document
Document Revision
Record
Evidence Item
Correspondence
Template
Report
Certificate
Drawing
Specification
Knowledge Article
Retention Policy
```

Documents and evidence must attach to all supported enterprise objects.

## Finding 13: Compliance And Framework Engine Are Not Yet Materialised

Status: RED

The new architecture depends heavily on a Framework Engine.

The current implementation does not yet appear to provide objects such as:

```text
Framework
Framework Version
Framework Assignment
Lifecycle Template
Stage Template
Control Template
Checklist Template
Evidence Requirement
Deliverable Template
KPI Template
Report Template
Compliance Requirement
```

This is one of PBM's main differentiators and should become a major platform capability.

## Finding 14: Workflow And Events Are Strong Foundations

Status: GREEN / AMBER

Workflow and business event foundations exist.

They need to be connected consistently to all major object domains:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

Important next work:

```text
workflow-enabled object registry
event type registry
standard lifecycle events
standard create/update/approve/issue/complete/close events
polymorphic reference validation strategy
```

## Finding 15: Package Boundary Rule Needs Enforcement

Status: AMBER

Routes should not import repositories directly.

The recent refactor began moving routes toward:

```text
Route -> Service -> Repository -> Database
```

This must become a formal rule and conformance check.

Known package-level direction:

```text
repository = persistence only
service = business orchestration and transactions
validator = input and business validation
constants = controlled object/package constants
index = package public surface
```

---

# Target Package Direction

The package model should move toward:

```text
src/lib/packages/
  core/
  reference-data/

  parties/
  client-accounts/

  assets/
  properties/

  agreements/
  commercial/
  contracts/

  projects/
  work/
  activities/

  resources/
  procurement/
  finance/

  documents/
  evidence/

  controls/
  compliance/
  workflows/
  events/
  frameworks/
  audit/

  reports/
  integrations/
  administration/

  extensions/
    rics/
    construction/
    engineering/
    manufacturing/
    maritime/
```

This does not mean every package must be created immediately.

It means future packages should be judged against this model.

---

# Target Workspace Direction

The route model should move toward familiar ERP workspaces:

```text
src/routes/app/
  dashboard/
  customers/
  sales/
  projects/
  operations/
  resources/
  procurement/
  finance/
  assets/
  documents/
  compliance/
  reporting/
  administration/
```

Existing route families should be mapped into this model rather than deleted immediately.

Example:

```text
/app/crm/*          -> /app/customers/* or retained as alias during transition
/app/properties/*   -> /app/assets/properties/* or /app/assets/*
/app/instructions/* -> reviewed under agreements/work
/app/activities/*   -> /app/operations/activities/* or retained as operational shortcut
/app/reports/*      -> /app/reporting/*
/app/admin/*        -> /app/administration/*
```

---

# Remediation Backlog

## Priority 0: Lock Architecture Baseline

### Objective

Stop further drift while the architecture reset is being absorbed into the implementation.

### Actions

1. Treat `000-enterprise-meta-model.md` as the root architecture document.
2. Treat `001-enterprise-capability-model.md` as the ERP capability scope.
3. Treat `001-canonical-enterprise-data-model.md` as the object authority.
4. Add a short architecture decision record confirming the architecture reset.
5. Update any docs that still state the old instruction/activity spine as the primary model.

## Priority 1: Complete Architecture Relationship Documents

### Objective

Bring remaining architecture appendices into line with the meta model.

### Actions

1. Rewrite `002-business-object-catalogue.md` around Party, Thing, Agreement, Work, Transaction, Information and Control.
2. Rewrite `003-enterprise-relationship-model.md` as an enterprise graph, not an instruction chain.
3. Rewrite `004-schema-relationship-appendix.md` against the new CEDM.
4. Rewrite `005-route-object-relationship-appendix.md` around ERP workspaces.
5. Rewrite `006-package-object-relationship-appendix.md` around package families derived from the meta model.
6. Keep this backlog updated as the implementation changes.

## Priority 2: Repository-Wide Local Audit

### Objective

Create a verified map of implementation state.

### Actions

Run locally:

```bash
find src/lib/packages -maxdepth 3 -type f | sort > docs/architecture/.package-files.audit.txt
find src/routes/app -maxdepth 5 -type f | sort > docs/architecture/.route-files.audit.txt
find src/lib/server -maxdepth 5 -type f | sort > docs/architecture/.server-files.audit.txt
```

Then classify every route, package and server module as:

```text
GREEN
AMBER
RED
UNKNOWN
```

against:

```text
Meta concept
Capability
Canonical object
Package owner
Route workspace
```

The `.audit.txt` files should not necessarily be committed unless they are useful. The classification should be committed into an architecture review document.

## Priority 3: Package Boundary Refactor

### Objective

Move implementation toward clean package ownership.

### Actions

1. Enforce `Route -> Service -> Repository -> Database`.
2. Remove direct route imports from repositories.
3. Move business orchestration out of repositories.
4. Keep repositories focused on persistence.
5. Define public package APIs through `index.ts`.
6. Create or rename packages only when backed by the meta model and CEDM.

## Priority 4: Commercial And Agreement Model

### Objective

Build the missing commercial lifecycle.

### Actions

Create architecture and implementation plan for:

```text
Lead
Enquiry
Opportunity
Proposal
Quotation
Tender
Contract
Framework Agreement
Service Agreement
Instruction / Authorisation
Change Order / Variation
```

Decide whether `instruction` remains a core table or becomes a specialised Agreement / Work Authorisation pattern.

## Priority 5: Project-Centred Delivery Model

### Objective

Make Project the main controlled delivery container.

### Actions

1. Define Project object lifecycle.
2. Define Project workspace requirements.
3. Define Project relationships to Agreement, Party, Thing, Work, Transaction, Information and Control.
4. Add Work Package model.
5. Add Task model.
6. Define Deliverable model.
7. Review Activity/Observation/Assessment/Action/Outcome under Work execution.

## Priority 6: Procurement Model

### Objective

Add supplier-side ERP capability.

### Actions

Define objects and relationships for:

```text
Supplier Account
Purchase Requisition
RFQ
Supplier Quote
Purchase Order
Subcontract
Goods Receipt
Service Receipt
Purchase Invoice
Commitment
```

## Priority 7: Resource Management Model

### Objective

Support resource planning without duplicating Party and Thing identity.

### Actions

Define objects and relationships for:

```text
Resource Profile
Availability
Allocation
Capacity
Utilisation
Skill
Competency
Certification
Timesheet
Resource Cost Rate
```

## Priority 8: Finance Model

### Objective

Expand finance into a true ERP finance domain.

### Actions

Define objects and relationships for:

```text
Chart of Accounts
Financial Period
Cost Centre
Profit Centre
Budget
Forecast
Commitment
Cost
Revenue
Sales Invoice
Purchase Invoice
Payment
Receipt
Credit Note
Journal Entry
WIP Item
Expense
Tax
```

## Priority 9: Asset / Thing Model

### Objective

Generalise property into a broader asset model.

### Actions

1. Decide whether `property` remains separate or becomes an Asset specialisation.
2. Define general Asset table strategy.
3. Define asset hierarchy model.
4. Define asset type/classification model.
5. Define location model.
6. Define relationship between Asset, Work, Documents, Compliance and Finance.

## Priority 10: Information Domain

### Objective

Materialise document, evidence and record control.

### Actions

Define objects and relationships for:

```text
Document
Document Revision
Record
Evidence Item
Correspondence
Template
Report
Certificate
Drawing
Specification
Knowledge Article
Retention Policy
Transmittal
```

## Priority 11: Control And Framework Engine

### Objective

Build PBM's key differentiator.

### Actions

Define objects and relationships for:

```text
Framework
Framework Version
Framework Assignment
Lifecycle Template
Stage Template
Workflow Template
Control Template
Checklist Template
Evidence Requirement
Deliverable Template
KPI Template
Report Template
Compliance Requirement
```

Then support examples such as:

```text
Project + PRINCE2 + ISO 9001
Project + Six Sigma + Lean
Project + Agile + ISO 27001
Project + CMII + DNV
```

## Priority 12: Workflow And Event Integrity

### Objective

Make workflow and event behaviour consistent across all domains.

### Actions

1. Create workflow-enabled object registry.
2. Create event type registry.
3. Define standard lifecycle events.
4. Define polymorphic object reference validation rules.
5. Ensure services emit events consistently.
6. Ensure workflow transitions are controlled through service layer logic.

## Priority 13: Reporting And Analytics Model

### Objective

Create reporting from shared enterprise objects.

### Actions

1. Define reporting dimensions by meta concept.
2. Define project profitability view.
3. Define customer profitability view.
4. Define resource utilisation view.
5. Define procurement commitment view.
6. Define compliance status view.
7. Define document/evidence completeness view.
8. Define executive KPI model.

---

# Immediate Next Actions

The next practical implementation steps should be:

1. Update `002-business-object-catalogue.md` to match the new CEDM.
2. Update `003-enterprise-relationship-model.md` to model the enterprise graph.
3. Run the local implementation audit commands.
4. Create a package alignment matrix.
5. Create a route alignment matrix.
6. Stop adding new feature screens until package and route boundaries are stabilised.

---

# Exit Condition

This remediation backlog is materially complete when:

1. every route maps to a workspace and capability
2. every package maps to a meta concept, capability and canonical object set
3. every table maps to a canonical object, relationship, event, workflow state or configuration purpose
4. no route imports repositories directly
5. service layers own business orchestration
6. repositories only own persistence
7. commercial lifecycle exists
8. project-centred delivery exists
9. procurement, finance and resource management are first-class ERP domains
10. documents, evidence, workflow, events and controls are consistently cross-cutting
11. frameworks can be applied without forking the core object model
