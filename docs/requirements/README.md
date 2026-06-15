# Perspective Business Manager Requirements Suite

## Purpose

This requirements suite defines the target application scope for Perspective Business Manager as a built-environment ERP platform.

The suite aligns product capabilities to a complete enterprise module structure while preserving the platform's canonical business object model.

The intent is to make sure the product covers the same broad functional ground expected of a full ERP without making any external vendor model the centre of the documentation.

## Document Set

### Core

- [01-product-scope.md](./01-product-scope.md)
- [02-enterprise-module-coverage.md](./02-enterprise-module-coverage.md)
- [03-cross-cutting-platform-requirements.md](./03-cross-cutting-platform-requirements.md)
- [04-traceability-matrix.md](./04-traceability-matrix.md)
- [05-phased-delivery-backlog.md](./05-phased-delivery-backlog.md)
- [06-customer-model-rules.md](./06-customer-model-rules.md)

### Module Requirements

- [modules/sales-client-management.md](./modules/sales-client-management.md)
- [modules/service-delivery-projects.md](./modules/service-delivery-projects.md)
- [modules/property-asset-management.md](./modules/property-asset-management.md)
- [modules/finance-commercial-control.md](./modules/finance-commercial-control.md)
- [modules/procurement-supply-chain.md](./modules/procurement-supply-chain.md)
- [modules/workforce-resource-planning.md](./modules/workforce-resource-planning.md)
- [modules/quality-risk-compliance.md](./modules/quality-risk-compliance.md)
- [modules/documents-analytics-integration.md](./modules/documents-analytics-integration.md)

## How To Use This Suite

1. Use the product scope document to define release boundaries.
2. Use the enterprise module coverage document to map capabilities to recognised ERP domains.
3. Use module requirement documents to drive backlog definition, data design, workflow design and reporting.
4. Use the traceability matrix to check that requirements, routes and package boundaries stay aligned.
5. Use the phased delivery backlog to sequence implementation and release scope.
6. Use the customer model rules document to keep B2B and B2C support on one shared enterprise model.
7. Cross-check every functional requirement against the canonical business object model in [../architecture/001-canonical-enterprise-data-model.md](../architecture/001-canonical-enterprise-data-model.md).
8. Cross-check every new object against [../architecture/002-business-object-catalogue.md](../architecture/002-business-object-catalogue.md).

## Architectural Rule

Enterprise modules are planning lenses, not data owners.

Perspective Business Manager remains object-first:

- party, client account, instruction, property, project, activity, assessment, action, outcome and invoice remain enterprise objects
- modules orchestrate work over those objects
- workflow, documents, evidence and events remain shared enterprise layers
