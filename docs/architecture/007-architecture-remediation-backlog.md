# Architecture Remediation Backlog

## Purpose

Convert the current architecture tensions, schema caveats and traceability gaps into a concrete remediation backlog.

This document is the working backlog for improving alignment between canonical objects, schema, routes, packages and customer-model rules.

## Planning Rule

Remediation work should strengthen the shared enterprise model before adding more route depth or sector-specific variation.

## Priority 1: Customer And Instruction Spine

### Objective

Harden the shared B2B/B2C customer and instruction model so all downstream delivery and finance behavior relies on the same object chain.

### Backlog Items

1. Reflect `client-accounts` explicitly in all higher-level matrices and implementation narratives.
2. Confirm whether `uq_client_account_party` is a permanent rule or a temporary simplification.
3. Define the controlled role sets for `instruction_party_role` and `property_party_role` in reference data.
4. Make CRM, instruction and finance flows explicitly support customer-of-record, billing party and representative scenarios.
5. Add conformance checks against [../requirements/06-customer-model-rules.md](../requirements/06-customer-model-rules.md) and [../requirements/07-customer-model-implementation-checklist.md](../requirements/07-customer-model-implementation-checklist.md) for affected slices.

## Priority 2: Route Surface Consolidation

### Objective

Reduce overlap and ambiguity in the workspace tree so routes align cleanly to the canonical model.

### Backlog Items

1. Define the intended separation between `/app/instructions/*` and `/app/operations/instructions/*`.
2. Define the intended separation or consolidation path for `/app/property/*` and `/app/properties/*`.
3. Review cross-cutting convenience routes such as `/app/evidence`, `/app/reports` and `/app/workflows` to ensure they do not imply conflicting ownership.
4. Confirm whether customer-specific CRM subroutes should distinguish viewpoint only or also domain responsibility.

## Priority 3: Package Boundary Hardening

### Objective

Ensure package boundaries reflect real domain or platform ownership rather than route convenience.

### Backlog Items

1. Deepen procurement package strategy so it is not primarily route-led.
2. Define whether workforce concerns need a dedicated package family beyond `core` and `reference-data`.
3. Prevent `core` from accumulating route-specific orchestration logic that belongs in domain packages.
4. Confirm the division between core delivery packages and industry extension packages such as `building-surveying` and `inspections`.
5. Align package APIs with the route and schema appendices in the same change whenever boundaries shift.

## Priority 4: Delivery And Finance Relationship Gaps

### Objective

Close the main schema and workflow caveats that affect reporting and operational consistency.

### Backlog Items

1. Decide whether deliverables must always belong to projects or whether pure instruction-level deliverables should be supported.
2. Add the planned finance tables and relationships for payment, WIP item, credit note and ledger entry.
3. Define document tables and attachment rules so the architecture model becomes fully materialised in schema.
4. Add explicit reporting joins and projections for profitability across client account, instruction, project and activity.
5. Review nullable relationship paths in activity and outcome tables to ensure they are deliberate and adequately validated.

## Priority 5: Workflow And Event Integrity

### Objective

Strengthen lifecycle and audit consistency across all workflow-enabled objects.

### Backlog Items

1. Define the initial workflow set for instruction, project, deliverable, activity and invoice.
2. Establish the required business events for create, approval, issue, payment and compliance transitions.
3. Review polymorphic `workflow_instance` and `business_event` integrity controls and document where application validation is mandatory.
4. Ensure route and package implementations emit business events consistently.

## Priority 6: Reporting And Traceability Completion

### Objective

Make the architecture fully traceable from requirements to implementation.

### Backlog Items

1. Align [../requirements/04-traceability-matrix.md](../requirements/04-traceability-matrix.md) with the architecture appendices for routes and packages.
2. Add route-level and package-level conformance checks for B2B/B2C support.
3. Add reporting dimensions for customer classification, bill-to party and representative context.
4. Review every major workspace against the route and package appendices and record gaps.

## Suggested Execution Order

1. customer and instruction spine
2. route surface consolidation
3. package boundary hardening
4. delivery and finance relationship gaps
5. workflow and event integrity
6. reporting and traceability completion

## Exit Condition

This backlog should be considered materially complete only when:

1. route families align cleanly to canonical objects
2. package families align cleanly to canonical objects
3. B2B and B2C behavior uses one shared customer model in practice
4. schema caveats are either resolved or deliberately accepted
5. requirements, architecture and implementation references no longer contradict each other
