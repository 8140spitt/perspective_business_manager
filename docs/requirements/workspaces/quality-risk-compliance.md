# Quality, Risk & Compliance Workspace Requirements

## Purpose

The Quality, Risk & Compliance workspace provides the control view of PBM’s shared business records.

It manages risks, controls, quality checks, audit evidence, complaints, non-conformance and corrective action without creating a separate compliance silo.

## Primary Users

- quality managers
- compliance managers
- risk owners
- auditors
- project managers
- directors and accountable managers
- operational leads responsible for corrective action

## Business Activities

- maintain risk records
- define and review controls
- manage quality checks and review gates
- record non-conformance and corrective action
- manage complaints and incidents
- collect and review evidence
- link evidence to projects, properties, suppliers, people and documents
- track compliance obligations
- support audit preparation and audit trails
- report control performance and open actions

## Business Objects Used

- risk
- control
- compliance obligation
- quality check
- inspection
- non-conformance
- corrective action
- complaint
- incident
- audit event
- evidence item
- document
- project
- property
- supplier
- person
- employee
- workflow state
- business event

## Data Spine Relationships

Risk and compliance records should attach to the business object they control:

```text
risk
    -> control
    -> evidence item
    -> business object under control
    -> workflow state
    -> report view
```

Examples:

```text
supplier
    -> supplier compliance record
    -> evidence item
    -> corrective action
```

```text
project
    -> quality check
    -> non-conformance
    -> corrective action
    -> audit evidence
```

The workspace must not duplicate project, supplier, employee, property or document records.

## Required Route Doorways

Current or planned route families:

- `/app/compliance/*`
- `/app/activities/*` where inspections, observations or actions create quality records
- `/app/projects/*` where project risks and controls are shown
- `/app/procurement/*` where supplier compliance is shown
- `/app/property/*` where property risks are shown
- `/app/documents/*` where controlled evidence is stored
- `/app/reporting/*` for risk, quality and compliance reports

## Reports And Controls

The workspace should support:

- risk register
- control register
- compliance obligation register
- quality check status report
- non-conformance report
- corrective action report
- complaint and incident report
- evidence completeness report
- audit trail report
- supplier compliance report
- project quality report

## Exclusions For Now

- specialist certification body workflows
- full legal case management
- automated regulatory feeds
- complex health and safety incident investigation tooling

These may be added later, but the foundation must remain a shared control layer over PBM business objects.
