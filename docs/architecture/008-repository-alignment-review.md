# Repository Alignment Review

## Purpose

This document starts the implementation alignment review against the new PBM architecture baseline.

The architecture baseline is now:

```text
000-enterprise-meta-model.md
001-enterprise-capability-model.md
001-canonical-enterprise-data-model.md
002-business-object-catalogue.md
003-enterprise-relationship-model.md
007-architecture-remediation-backlog.md
```

The objective is to classify current repository areas against:

```text
Party
Thing
Agreement
Work
Transaction
Information
Control
```

and identify what should be kept, refactored, moved, split, renamed or expanded.

## Important Limitation

This review is based on the repository structure and implementation areas inspected through the GitHub connector and the known PBM work completed so far.

A full local audit is still required because the connector could not reliably enumerate the complete repository tree.

Run locally:

```bash
find src/lib/packages -maxdepth 4 -type f | sort
find src/lib/server/repositories -maxdepth 4 -type f | sort
find src/lib/server/services -maxdepth 4 -type f | sort
find src/routes/app -maxdepth 6 -type f | sort
find src/lib/server/db/schema -maxdepth 2 -type f | sort
```

Use this document as the first alignment baseline, not as a complete verified code inventory.

## Status Key

```text
KEEP       Directionally correct; continue and strengthen.
REFACTOR   Valid concept but wrong shape, location, naming or responsibility.
MOVE       Should live under a different route/package/domain.
SPLIT      Contains multiple responsibilities that need separating.
MERGE      Should be merged into a broader package or object model.
EXPAND     Correct start but materially incomplete.
REVIEW     Requires decision before more implementation.
```

---

# 1. Architecture Documents

## Current State

The core architecture docs have been reset from an instruction/activity-centred model to an ERP meta-model-based architecture.

## Alignment

Status: KEEP / EXPAND

## Current Architecture Direction

```text
Enterprise Meta Model
  -> Enterprise Capability Model
    -> Canonical Enterprise Data Model
      -> Business Object Catalogue
        -> Enterprise Relationship Model
          -> Remediation Backlog
```

## Required Next Work

1. Update `004-schema-relationship-appendix.md` to align schema with the new CEDM.
2. Update `005-route-object-relationship-appendix.md` to align routes with ERP workspaces.
3. Update `006-package-object-relationship-appendix.md` to align packages with meta concepts and capabilities.
4. Add architecture decision record for the PBM architecture reset.
5. Review requirements documents for old instruction/activity assumptions.

---

# 2. Setup Script

## File

```text
setup-perspective-os.cjs
```

## Current State

The setup script still seeds the older package and route structure.

Current seeded package families include:

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

Current seeded route families include:

```text
parties
properties
instructions
workflows
documents
evidence
surveys
reports
finance
compliance
admin/reference-data
```

## Alignment

Status: REFACTOR

## Reason

The setup script still reflects the old product shape more than the new ERP workspace model.

It underrepresents:

```text
commercial
agreements
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

## Required Action

Refactor the setup script so it seeds the target ERP package and workspace structure.

Do not delete existing functional folders until the code has been migrated.

Preferred approach:

1. Add new target folders.
2. Preserve existing folders during transition.
3. Mark old folders as compatibility / pending migration.
4. Move code package-by-package.
5. Remove deprecated folders only after routes and imports are migrated.

---

# 3. Package Alignment

## Target Package Families

The target package model should move toward:

```text
src/lib/packages/
  core/
  reference-data/

  parties/
  client-accounts/
  supplier-accounts/

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

## Current Package Review

### `core`

Meta Concept: Cross-cutting

Status: KEEP / REVIEW

Action: Keep core small. Do not allow it to accumulate business orchestration that belongs in domain packages.

### `reference-data`

Meta Concept: Platform / Control

Status: KEEP

Action: Use for controlled code sets, relationship types, status values and framework metadata where appropriate.

### `parties`

Meta Concept: Party

Status: KEEP

Action: Keep as root identity package. Must own Party, Person, Organisation, Party Role and Party Relationship behaviours.

### `client-accounts`

Meta Concept: Party / Agreement

Status: KEEP / EXPAND

Action: Keep as commercial customer relationship package. Expand only in ways that preserve Party identity. Do not absorb sales pipeline objects.

### `properties`

Meta Concept: Thing

Status: REFACTOR / MERGE LATER

Action: Keep during transition, but review as an Asset / Thing specialisation. Future package may become `assets` with `properties` as a subdomain or extension.

### `instructions`

Meta Concept: Agreement / Work

Status: REVIEW

Action: Stop deepening instruction as the ERP spine. Decide whether it becomes Agreement specialisation, Work Authorisation, Service Request, or remains a specific object.

### `workflows`

Meta Concept: Control

Status: KEEP / EXPAND

Action: Keep as cross-cutting control package. Add workflow-enabled object registry and standard lifecycle events.

### `activities`

Meta Concept: Work

Status: KEEP / REFACTOR

Action: Keep as Work execution package. Ensure Activity, Observation, Assessment, Action and Outcome are generic work-execution concepts, not surveying-specific objects.

### `documents`

Meta Concept: Information

Status: EXPAND

Action: Build full Information domain: Document, Document Revision, Record, Correspondence, Template, Transmittal, Retention Policy.

### `evidence`

Meta Concept: Information / Control

Status: KEEP / REFACTOR

Action: Evidence should attach to enterprise objects and satisfy Controls. It should not become a parallel work chain.

### `inspections`

Meta Concept: Work / Control

Status: REVIEW / EXTENSION

Action: Decide whether this is a generic work type package or extension package. It should not define the core Work model.

### `building-surveying`

Meta Concept: Extension / Framework

Status: MOVE / EXTENSION

Action: Move conceptually under extension/framework model. It must not shape core ERP architecture.

### `reports`

Meta Concept: Information / Reporting

Status: EXPAND

Action: Reporting should be based on shared relationships across Party, Agreement, Work, Transaction, Information and Control.

### `finance`

Meta Concept: Transaction

Status: EXPAND

Action: Expand significantly. Current finance is too thin for ERP. Add Budget, Forecast, Cost, Revenue, Commitment, Purchase Invoice, Payment, Journal, WIP and Tax strategy.

### `compliance`

Meta Concept: Control

Status: EXPAND

Action: Build Compliance Requirement, Control, Framework Assignment and Evidence Requirement model.

### `audit`

Meta Concept: Control / Event

Status: KEEP / EXPAND

Action: Align with Business Event and audit event strategy.

## Missing Packages

Highest-priority missing packages:

```text
agreements
commercial
contracts
projects
work
resources
procurement
assets
frameworks
events
integrations
administration
```

---

# 4. Route Alignment

## Target Workspace Model

Routes should move toward:

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

## Current Route Review

### `/app/parties`

Status: MOVE / REVIEW

Reason: Users normally expect Customers, Suppliers, People or Contacts rather than raw Party administration.

Action: Keep for admin/dev for now, but expose normal business journeys through Customers, Suppliers and Resources workspaces.

### `/app/properties`

Status: MOVE / REFACTOR

Reason: Property should sit under Assets or be a Thing specialisation.

Action: Move toward `/app/assets/properties` or `/app/assets`.

### `/app/instructions`

Status: REVIEW

Reason: Instruction is no longer the ERP centre.

Action: Reclassify under Sales/Agreements/Operations depending on final decision.

### `/app/workflows`

Status: MOVE / ADMINISTRATION

Reason: Workflow is a platform/control capability.

Action: Move toward `/app/administration/workflows` or `/app/compliance/workflows` depending on user role.

### `/app/documents`

Status: KEEP

Reason: Documents is a valid workspace.

Action: Ensure it behaves as a cross-object document workspace, not a detached document store.

### `/app/evidence`

Status: REVIEW

Reason: Evidence is usually contextual, not a primary user workspace.

Action: Keep if useful for compliance/evidence review, but most evidence should be viewed from the object it supports.

### `/app/surveys`

Status: MOVE / EXTENSION

Reason: Surveying is not the core ERP.

Action: Move conceptually into extension/framework/work-type area.

### `/app/reports`

Status: RENAME / MOVE

Reason: ERP users expect Reporting or Analytics.

Action: Move toward `/app/reporting`.

### `/app/finance`

Status: KEEP / EXPAND

Reason: Finance is core ERP.

Action: Expand once Transaction domain is designed.

### `/app/compliance`

Status: KEEP / EXPAND

Reason: Compliance is core ERP.

Action: Expand around Control and Framework Engine.

### `/app/admin/reference-data`

Status: KEEP / RENAME

Reason: Administration is valid, but route should align to `/app/administration`.

Action: Move toward `/app/administration/reference-data`.

## Missing Routes

Highest-priority missing route families:

```text
/app/customers
/app/sales
/app/projects
/app/operations
/app/resources
/app/procurement
/app/assets
/app/reporting
/app/administration
```

---

# 5. Server Repository And Service Alignment

## Target Rule

All business behaviour should follow:

```text
Route
  -> Package Service
    -> Repository
      -> Database
```

Routes should not import repositories directly.

Repositories should not perform business orchestration.

Services should coordinate validation, transactions, workflow, events and repository calls.

## Current Direction

Recent work introduced repository/service separation for activity-related objects and package-level services.

Status: KEEP / ENFORCE

## Required Action

Create a conformance pass:

```bash
grep -R "repository" src/routes/app -n
grep -R "from '\$lib/server/repositories" src/routes/app -n
grep -R "from '\$lib/packages" src/routes/app -n
```

Expected outcome:

```text
Routes import services or package public APIs.
Routes do not import repositories directly.
Services import repositories.
Repositories import db connection/query helpers only.
```

## Service Responsibilities

Services should own:

```text
business validation
transaction orchestration
workflow transitions
business event emission
document/evidence attachment coordination
permission checks where applicable
framework rule application
```

## Repository Responsibilities

Repositories should own:

```text
SQL queries
persistence mapping
record retrieval
record creation
record update
record deletion where allowed
```

Repositories should not own:

```text
business process decisions
workflow transitions
cross-package orchestration
framework evaluation
permission decisions
```

---

# 6. Database Schema Alignment

## Current Direction

The current schema already contains useful foundations:

```text
party
person
organisation
party_role
party_relationship
address
party_address
client_account
property
property_unit
instruction
instruction_party_role
instruction_property
project
project_instruction
activity
observation
assessment
action
outcome
deliverable
fee_agreement
sales_invoice
workflow_definition
workflow_state
workflow_transition
workflow_action
workflow_instance
workflow_instance_state
business_event
ref_code_set
ref_code_value
```

## Alignment

Status: KEEP / REFACTOR / EXPAND

## Schema Gap Summary

Missing or underdeveloped schema areas:

```text
Agreement domain
Commercial lifecycle
Contract model
Project as central delivery container
Work package and task model
Resource allocation
Procurement
Finance transaction model
Asset generalisation
Document control
Framework engine
Risk / issue / change
Compliance requirements
Reporting views
```

## Required Action

Do not add more narrow domain tables until the schema appendix is updated against the new CEDM.

Next schema design should focus on:

```text
agreement/commercial tables
project/work package/task tables
resource allocation tables
procurement tables
finance transaction tables
framework/control tables
```

---

# 7. Object-by-Object Refactor Classification

## KEEP

```text
party
person
organisation
party_role
party_relationship
address
party_address
client_account
workflow_definition
workflow_state
workflow_transition
workflow_action
workflow_instance
workflow_instance_state
business_event
ref_code_set
ref_code_value
```

## KEEP BUT REPOSITION

```text
property
property_unit
activity
activity_area
observation
assessment
action
outcome
deliverable
fee_agreement
sales_invoice
evidence_item
```

## REVIEW

```text
instruction
instruction_party_role
instruction_property
project_instruction
building-surveying package
inspections package
surveys route
```

## EXPAND

```text
project
finance
documents
evidence
compliance
reports
workflows
audit
```

## ADD

```text
supplier_account
lead
enquiry
opportunity
proposal
quotation
tender
contract
framework_agreement
service_agreement
purchase_order
change_order
variation
work_package
task
resource_profile
resource_allocation
procurement objects
budget
forecast
cost
revenue
commitment
purchase_invoice
payment
journal_entry
wip_item
asset
asset_hierarchy
document
document_revision
risk
issue
change
compliance_requirement
framework
framework_assignment
evidence_requirement
```

---

# 8. Immediate Code Refactor Sequence

Do not try to refactor everything at once.

Use this sequence:

## Step 1: Add Architecture Guardrails

1. Update setup script to include target package/workspace folders.
2. Add comments or README files to legacy folders that are pending migration.
3. Add package boundary rules to docs.

## Step 2: Commercial / Agreement Foundation

Create package skeletons:

```text
agreements
commercial
contracts
```

Do not build full UI yet.

Start with types, constants and relationship definitions.

## Step 3: Project Foundation

Create or expand:

```text
projects
work
```

Define Project as central controlled delivery container.

Move project-oriented logic out of instruction-centred assumptions.

## Step 4: Resource / Procurement / Finance Skeletons

Create package skeletons:

```text
resources
procurement
finance
```

Finance already exists but must be expanded.

## Step 5: Framework Engine Skeleton

Create:

```text
frameworks
controls
```

Compliance can consume this rather than hard-code industry rules.

## Step 6: Route Workspace Transition

Add target route families while preserving old routes:

```text
customers
sales
projects
operations
resources
procurement
assets
reporting
administration
```

Old routes can redirect or be kept temporarily.

---

# 9. Local Audit Checklist

Run these checks locally and paste results into the next review:

```bash
find src/lib/packages -maxdepth 3 -type f | sort
find src/lib/server/repositories -maxdepth 4 -type f | sort
find src/lib/server/services -maxdepth 4 -type f | sort
find src/routes/app -maxdepth 6 -type f | sort
find src/lib/server/db/schema -maxdepth 2 -type f | sort

grep -R "from '\$lib/server/repositories" src/routes/app -n || true
grep -R "from '\$lib/server/services" src/routes/app -n || true
grep -R "from '\$lib/packages" src/routes/app -n || true
```

Then classify every result as:

```text
KEEP
REFACTOR
MOVE
SPLIT
MERGE
EXPAND
REVIEW
```

---

# 10. Exit Criteria For Alignment Phase

The repository is aligned when:

1. every package maps to a meta concept and capability
2. every route maps to an ERP workspace
3. every table maps to a catalogue object, relationship, event, workflow state or configuration object
4. instruction is no longer treated as the central ERP spine
5. project is the central controlled delivery container
6. commercial lifecycle exists
7. procurement, resources and finance are first-class ERP capabilities
8. documents/evidence attach to enterprise objects
9. controls/frameworks govern enterprise objects
10. workflows and events are cross-cutting and consistent
11. routes use services/package APIs, not repositories directly
12. reporting is relationship-driven, not route-driven

## Summary

The implementation is not wrong.

It is an early vertical slice built around a narrower delivery model.

The architecture has now expanded to a full ERP platform model.

The next refactor should therefore avoid deleting useful work and instead reposition it into the new enterprise structure.
