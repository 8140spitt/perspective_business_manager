# Cross-Cutting Platform Requirements

## Purpose

Define requirements that apply across every PBM workspace, business object and route doorway.

These requirements protect the shared data spine and prevent workspace-specific implementations from creating duplicate versions of the truth.

## Shared Data Spine Requirements

### CR-000 Shared Customer Model

The platform shall support organisation-led, individual-led and intermediary-led customer relationships using the same shared party, person, business, client account and contact model.

### CR-001 Single Object Definition Rule

The platform shall maintain one canonical definition for each business object and reuse it across all workspaces.

### CR-002 Stable Identity

The platform shall assign stable identifiers and references for parties, instructions, properties, projects, activities, outcomes, invoices, supplier records, documents and controls.

### CR-003 Reference Data Governance

The platform shall manage status codes, type codes, workflow mappings, numbering sequences and reporting classifications as controlled reference data.

Customer classification, customer role and intermediary role codes must also be controlled reference data where required.

## Workflow Requirements

### WF-001 Workflow Metadata

The platform shall define lifecycle states and transitions as metadata wherever practical, rather than hard-coding workflow logic into individual routes.

### WF-002 Workflow Instance Traceability

The platform shall record workflow instance history for workflow-enabled business objects.

### WF-003 Approval Controls

The platform shall support approvals, technical reviews and gated transitions for commercially or professionally sensitive outcomes.

## Event And Audit Requirements

### AU-001 Immutable Events

The platform shall store append-only business events for significant create, update, transition, approval, issue and exception actions.

### AU-002 Audit Queryability

The platform shall support audit tracing by business object, user, date, workflow state and event type.

## Security And Access Requirements

### SEC-001 Role-Based Access Control

The platform shall support role-based access by workspace, business object, action and data sensitivity.

### SEC-002 Segregation Of Duties

The platform shall support segregation rules for approvals, invoicing, supplier setup, payments and compliance sign-off.

### SEC-003 Record Visibility

The platform shall support scoped visibility for confidential instructions, complaints, HR records and risk matters.

## Document And Evidence Requirements

### DOC-001 Object-Linked Documents

The platform shall attach documents and evidence items to business objects rather than managing them as isolated files.

### DOC-002 Version Control

The platform shall support revision history for controlled deliverables and important records.

### DOC-003 Retention Policies

The platform shall support retention rules by record type, service line, matter type and jurisdiction.

## Reporting Requirements

### REP-001 Operational Reporting

The platform shall provide reports across pipeline, workload, project status, findings, actions, invoices, supplier cost, debt and utilisation.

### REP-002 Dimensional Analysis

The platform shall analyse data by client, property, instruction, project, service line, office, team, employee and time period.

The platform shall support reporting dimensions that distinguish organisation-led and individual-led customer activity without splitting the underlying customer model.

### REP-003 Defensible Outputs

The platform shall support evidence-backed reporting suitable for client delivery, management review and regulatory or professional audit.

## Integration Requirements

### INT-001 API-First Services

The platform shall expose stable service interfaces for core business objects and workflows.

### INT-002 Event Integration

The platform shall publish business events suitable for integration with document services, finance systems, GIS, BI and external portals.

### INT-003 Import And Migration

The platform shall support controlled migration of clients, properties, instructions, historical projects, invoices and documents.

Organisation-led and individual-led customer records must migrate into the same shared customer structure.

## User Experience Requirements

### UX-001 Workspace Navigation

The application shall provide business workspaces aligned to user jobs while preserving shared object relationships.

The application shall preserve consistent navigation and record views for both organisation-led and individual-led customer journeys.

### UX-002 Fast Context Switching

Users shall be able to move quickly between client, instruction, property, project, activity, deliverable, invoice and supplier cost context.

### UX-003 Exception Visibility

Users shall be able to identify overdue actions, blocked approvals, unbilled WIP, unpaid invoices, supplier exceptions, expiring accreditations and compliance exceptions.

## Non-Functional Requirements

### NFR-001 Availability

The platform should support business-day operational availability suitable for professional services teams.

### NFR-002 Performance

The platform should return standard list and detail views quickly enough for day-to-day operational use with multi-user concurrency.

### NFR-003 Scalability

The platform should scale across multiple offices, service lines and legal entities.

### NFR-004 Data Protection

The platform shall support encryption, access control, data minimisation and retention controls appropriate for commercially sensitive and personally identifiable information.
