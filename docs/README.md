# PBM documentation

PBM is an enterprise operating system for a business.

It is not designed around legacy ERP module names. It is designed around how a business actually operates: workspaces, capabilities, activities, shared business objects and one integrated data spine.

## Documentation principles

All documentation must use PBM product language first.

Use these terms:

- Enterprise capability
- Business workspace
- Business object
- Activity
- Data spine
- Integrated record
- Operating model
- Coverage audit
- Route doorway
- User activity view

Avoid these terms as product language:

- SAP module
- SAP submodule
- SAP-grade
- SAP mapping
- Transaction code
- Module clone

Legacy ERP module lists may be used only as internal completeness checks. They must not become the PBM navigation model, product identity or user-facing language.

## Product documentation

The product docs explain the business idea before the technical design.

- `product/001-product-vision.md` — what PBM is and what it is not.
- `product/002-enterprise-operating-model.md` — how PBM represents a business.
- `product/003-workspace-model.md` — how users move through workspaces.
- `product/004-capability-coverage.md` — how PBM ensures full enterprise coverage without legacy module language.
- `product/005-business-object-model.md` — the business nouns PBM manages.
- `product/006-data-spine.md` — how records are shared across workspaces.

## Architecture documentation

Architecture docs describe how the product model is implemented.

Architecture documents should support the product model. They should not introduce a competing language or a separate module model.

## Requirements documentation

Requirements docs convert the product model into buildable scope, traceability and acceptance criteria.

Requirements should be written against PBM workspaces, capabilities, activities, business objects and data objects.