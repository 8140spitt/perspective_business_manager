# PBM Requirements Suite

## Purpose

This requirements suite defines what Perspective Business Manager must do as a business-first enterprise platform for built-environment service businesses.

The requirements are written in PBM product language. External ERP capability lists may be used as completeness checks, but they must not become PBM navigation, object ownership, route naming or user-facing language.

## Product Language Rule

Use these terms in requirements:

- enterprise capability
- business workspace
- business object
- activity view
- route doorway
- shared data spine
- integrated record
- workflow state
- business event
- reporting view
- coverage audit

Avoid using external vendor or legacy module language as PBM product language.

## Document Set

### Core Requirements

- [01-product-scope.md](./01-product-scope.md)
- [02-enterprise-capability-coverage.md](./02-enterprise-capability-coverage.md)
- [03-cross-cutting-platform-requirements.md](./03-cross-cutting-platform-requirements.md)
- [04-traceability-matrix.md](./04-traceability-matrix.md)
- [05-phased-delivery-backlog.md](./05-phased-delivery-backlog.md)
- [06-customer-model-rules.md](./06-customer-model-rules.md)
- [07-customer-model-implementation-checklist.md](./07-customer-model-implementation-checklist.md)

### Workspace Requirement Documents

These documents describe workspace-level requirements. They are implementation planning documents, not product module boundaries.

- [modules/sales-client-management.md](./modules/sales-client-management.md)
- [modules/service-delivery-projects.md](./modules/service-delivery-projects.md)
- [modules/property-asset-management.md](./modules/property-asset-management.md)
- [modules/finance-commercial-control.md](./modules/finance-commercial-control.md)
- [modules/procurement-supply-chain.md](./modules/procurement-supply-chain.md)
- [modules/workforce-resource-planning.md](./modules/workforce-resource-planning.md)
- [modules/quality-risk-compliance.md](./modules/quality-risk-compliance.md)
- [modules/documents-analytics-integration.md](./modules/documents-analytics-integration.md)

## How To Use This Suite

1. Use the product scope to define release boundaries.
2. Use the enterprise capability coverage document to check that PBM covers the full business operating surface.
3. Use workspace requirement documents to drive backlog definition, data design, workflow design and reporting.
4. Use the traceability matrix to keep requirements, route doorways, package boundaries and business objects aligned.
5. Use the phased delivery backlog to sequence implementation and release scope.
6. Use the customer model rules to keep organisation-led and individual-led customer journeys on one shared enterprise model.
7. Use the customer model implementation checklist during schema, route, service and reporting changes.
8. Cross-check every functional requirement against the shared data spine in [../architecture/001-canonical-enterprise-data-model.md](../architecture/001-canonical-enterprise-data-model.md).
9. Cross-check every new object against [../architecture/002-business-object-catalogue.md](../architecture/002-business-object-catalogue.md).

## Architectural Rule

Business workspaces are planning and activity lenses. They do not own data.

PBM remains object-first:

- business objects are defined once
- workspaces expose activity views over those objects
- routes are doorways into the shared data spine
- packages implement behaviour without creating separate truths
- workflow, documents, evidence, events and reporting remain shared enterprise layers
