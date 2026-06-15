# Cross-Cutting Platform Requirements

## Purpose

Define the platform requirements that apply across all enterprise modules.

## Canonical Data Requirements

### CR-001 Single Object Ownership Rule

The platform shall maintain a canonical definition for each enterprise object and reuse it across all modules.

### CR-002 Shared Identity

The platform shall assign stable identifiers and references for parties, instructions, properties, projects, activities, outcomes, invoices and documents.

### CR-003 Reference Data Governance

The platform shall manage status codes, type codes, workflow mappings, numbering sequences and reporting classifications as controlled reference data.

## Workflow Requirements

### WF-001 Workflow Metadata

The platform shall define lifecycle states and transitions as metadata rather than hard-coded module logic wherever practical.

### WF-002 Workflow Instance Traceability

The platform shall record workflow instance history for workflow-enabled business objects.

### WF-003 Approval Controls

The platform shall support approvals, technical reviews and gated transitions for commercially or professionally sensitive outcomes.

## Event And Audit Requirements

### AU-001 Immutable Events

The platform shall store append-only business events for significant create, update, transition and issue actions.

### AU-002 Audit Queryability

The platform shall support audit tracing by entity, user, date, workflow state and event type.

## Security And Access Requirements

### SEC-001 Role-Based Access Control

The platform shall support role-based access by module, business object, action and data sensitivity.

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

The platform shall provide reports across pipeline, workload, project status, findings, actions, invoices, debt and utilisation.

### REP-002 Dimensional Analysis

The platform shall analyse data by client, property, instruction, project, service line, office, team, surveyor and time period.

### REP-003 Defensible Outputs

The platform shall support evidence-backed reporting suitable for client delivery and regulatory review.

## Integration Requirements

### INT-001 API-First Services

The platform shall expose stable service interfaces for core objects and workflows.

### INT-002 Event Integration

The platform shall publish business events suitable for integration with document services, finance systems, GIS, BI and external portals.

### INT-003 Import And Migration

The platform shall support controlled migration of clients, properties, instructions, historical projects, invoices and documents.

## User Experience Requirements

### UX-001 Workspace Navigation

The application shall provide user-facing workspaces aligned to role and module concerns while preserving shared object relationships.

### UX-002 Fast Context Switching

Users shall be able to move quickly between client, instruction, property, project, activity, deliverable and invoice context.

### UX-003 Exception Visibility

Users shall be able to identify overdue actions, blocked approvals, unbilled WIP, expiring accreditations and compliance exceptions.

## Non-Functional Requirements

### NFR-001 Availability

The platform should support business-day operational availability suitable for professional services teams.

### NFR-002 Performance

The platform should return standard list and detail views quickly enough for day-to-day operational use with multi-user concurrency.

### NFR-003 Scalability

The platform should scale across multiple offices, service lines and legal entities.

### NFR-004 Data Protection

The platform shall support encryption, access control, data minimisation and retention controls appropriate for commercially sensitive and personally identifiable information.
