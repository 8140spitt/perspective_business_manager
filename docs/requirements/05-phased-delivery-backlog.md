# Phased Delivery Backlog

## Purpose

Translate the requirements suite into implementation phases, epics and backlog priorities aligned to current capability maturity.

## Planning Principles

1. Build shared objects and workflows before deep route proliferation.
2. Finish the commercial-to-delivery-to-cash chain before broadening edge modules.
3. Prefer vertical slices that prove the canonical model in real operational workflows.
4. Treat compliance, documents and audit as first-class delivery concerns, not late add-ons.
5. Keep B2B and B2C behavior on the same shared party, client, instruction and finance model.

## Phase 1: Core Commercial And Delivery Spine

### Outcome

Operate the end-to-end flow from client and instruction through activity, deliverable and invoice at a usable baseline level.

### Epics

- client and party foundation hardening
- instruction workspace completion
- property linkage and delivery context
- activity chain completion
- fee agreement, WIP and invoice baseline
- shared workflow and event history baseline

### Priority Backlog

1. Complete instruction routes and server flows around linked parties, properties and status.
2. Complete activity chain creation flows for observation, assessment, action and outcome.
3. Add customer-type-aware handling for B2B and B2C instructions without duplicating customer structures.
4. Add deliverable and review state support linked to instruction and activity outcomes.
5. Establish WIP item model and invoice issue flow.
6. Ensure document and evidence attachment works for instruction, activity and outcome.

## Phase 2: Project Control And Resource Planning

### Outcome

Manage planned delivery, team allocation and execution control across projects and service lines.

### Epics

- project governance and task control
- milestones and programme tracking
- workforce allocation and utilisation baseline
- inspection scheduling and field planning
- project-level commercial oversight

### Priority Backlog

1. Complete project overview, team, programme, milestones and tasks with real domain services.
2. Introduce allocation, availability and utilisation objects and workflows.
3. Tie assignment decisions to competency and accreditation data.
4. Add project financial views linked to WIP, supplier cost and invoice status.
5. Ensure project and resource views work consistently for B2B portfolio work and B2C single-property work.
6. Add overdue and blocked-work exception reporting.

## Phase 3: Governance, Quality And Records Control

### Outcome

Make the platform defensible for regulated professional service delivery through embedded compliance and retained records.

### Epics

- conflict and onboarding controls
- complaints and case handling
- quality review workflows
- risk register and corrective action control
- document retention and controlled records

### Priority Backlog

1. Implement conflicts, complaints and audit-trail service flows behind compliance routes.
2. Add quality review and approval workflows to deliverables and outcomes.
3. Add document revision, record classification and retention policy enforcement.
4. Add corrective action linkage across compliance and operational objects.
5. Add compliance dashboards for open issues, due actions and review ageing.
6. Ensure complaint and privacy handling supports both B2B and B2C cases.

## Phase 4: Procurement, Supplier Control And External Delivery

### Outcome

Control bought-in services and supplier risk as part of normal delivery and profitability workflows.

### Epics

- supplier master and compliance
- purchase request and order control
- subcontractor assignment and evidence
- external cost capture and recovery

### Priority Backlog

1. Create dedicated supplier and procurement domain services.
2. Add supplier compliance document tracking and expiry alerts.
3. Add purchase request, approval and purchase order workflows.
4. Link supplier assignments to projects, activities and instructions.
5. Feed supplier costs into profitability and WIP reporting.

## Phase 5: Analytics, Integration And Platform Administration

### Outcome

Scale the platform across offices, service lines and integrations with reliable reporting and configurable administration.

### Epics

- operational dashboards and KPI layer
- curated reporting and exports
- integration event framework
- admin controls for reference data and numbering
- workflow administration and automation

### Priority Backlog

1. Stand up dashboard metrics across pipeline, delivery, finance and compliance.
2. Add reporting definitions and export-friendly views.
3. Add integration endpoints and event publication around key business events.
4. Harden admin tooling for reference data, numbering sequences and workflow definitions.
5. Add reminders, escalations and state-based automation.

## Backlog Classification

### Must-Have Near Term

- instruction, activity, outcome and invoice chain
- shared B2B and B2C customer handling on the same core model
- workflow and business event history
- object-linked documents and evidence
- baseline finance controls

### Should-Have Mid Term

- project planning depth
- workforce allocation and utilisation
- compliance case handling
- supplier and purchase workflows

### Scale And Optimisation

- analytics and KPI model
- automation and notifications
- integrations and admin configurability
- portfolio and executive reporting depth

## Dependency Notes

- finance accuracy depends on strong instruction, project and activity object linkage
- resource planning depends on workforce objects and project/task structures
- compliance controls depend on shared workflow, audit and document services
- analytics depends on disciplined reference data and event capture

## Exit Criteria For Each Phase

Each phase should only be considered complete when:

1. the core user workflows are executable end to end
2. required business objects and events are persisted consistently
3. documents and evidence are attached where needed
4. reporting exists for the primary operational risks of that phase
5. the traceability matrix can show clear route, package and object coverage for delivered scope
