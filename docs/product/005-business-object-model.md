# 005 Business object model

A PBM business object is a real business thing the system manages.

Business objects are more important than database tables when explaining the product.

Tables implement objects. Users work with objects.

## Core business objects

PBM starts with these core business objects:

- Business
- Person
- Employee
- Position
- Business function
- Organisation unit
- Client
- Supplier
- Contact
- Project
- Project service
- Assignment
- Quote
- Purchase order
- Supplier invoice
- Sales invoice
- Document
- Risk
- Control
- Report

## Object rule

Each object should define:

- What it means in business language
- Which workspace creates it
- Which workspaces use it
- Which activities depend on it
- Which table or tables store it
- Which object owns the lifecycle

## Example: Project

A project is a controlled piece of work delivered for a client, internal business need or business obligation.

Used by:

- Clients & Commercial to quote and instruct work
- Project Delivery to manage scope, service, activity, risk and evidence
- Procurement to buy against project need
- Finance to bill, cost and measure margin
- Reporting to show performance

Typical records:

- project
- project_party
- project_contact
- project_assignment
- project_service
- project_service_cost

## Example: Supplier invoice

A supplier invoice is a claim for payment from a supplier.

Used by:

- Procurement to check the invoice against order or service receipt
- Finance to approve, pay and control accounting treatment
- Project Delivery to see actual cost
- Reporting to show supplier spend, margin and cash exposure

Typical records:

- supplier_invoice
- supplier_invoice_row
- purchase_order
- purchase_order_row
- project_service
