# Finance & Control Workspace Requirements

## Purpose

The Finance & Control workspace provides the financial view of PBM’s shared business records.

It controls income, cost, margin, payment, debt, period reporting and financial approval without creating separate versions of projects, clients, suppliers or documents.

## Primary Users

- finance managers
- accounts payable users
- accounts receivable users
- commercial managers
- project managers reviewing margin
- directors and business owners
- reporting users

## Business Activities

- manage sales invoices and billing status
- manage supplier invoices and payment status
- review project income, cost and margin
- control accounts receivable and debt
- control accounts payable and supplier liabilities
- support cash, bank and payment tracking
- support budgeting and forecast views
- support period close and management reporting
- support approval and authority controls

## Business Objects Used

- sales invoice
- sales invoice row
- supplier invoice
- supplier invoice row
- payment
- receipt
- project
- project service
- project service cost
- quote
- client account
- supplier
- purchase order
- cost centre
- profit centre
- accounting period
- document
- evidence item
- authority limit

## Data Spine Relationships

Finance reads and controls records created across the enterprise:

```text
project
    -> quote
    -> sales invoice
    -> supplier invoice
    -> payment / receipt
    -> cost / margin view
```

```text
supplier_invoice
    -> supplier
    -> purchase order
    -> project cost
    -> payment status
    -> period reporting
```

Finance must not create a second project, client or supplier model. It should use financial views over shared business objects.

## Required Route Doorways

Current or planned route families:

- `/app/finance/*`
- `/app/projects/*` where project finance is shown
- `/app/procurement/*` where supplier spend originates
- `/app/crm/*` and `/app/sales/*` where client billing context originates
- `/app/reporting/*` for finance reporting

## Reports And Controls

The workspace should support:

- sales invoice register
- supplier invoice register
- accounts receivable report
- accounts payable report
- cash exposure view
- debt position report
- project margin report
- revenue recognition view
- cost and commitment report
- payment due report
- approval exception report
- period close checklist

## Exclusions For Now

- full statutory accounts production
- payroll processing engine
- banking integration automation
- advanced treasury instruments
- corporation tax computation

These can be integrated later, but the first priority is a reliable financial control view across the shared PBM data spine.
