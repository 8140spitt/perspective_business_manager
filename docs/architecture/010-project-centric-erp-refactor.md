# Project-Centric ERP Refactor

## Purpose

This document defines the line in the sand for PBM v1.

The current repository contains useful prototype work, but it has two competing domain centres:

- the original generic `party` / `person` / `organisation` model;
- the newer manually proven `business_partner` / `project` / `service` / `quote` / `purchase_order` / `invoice` model.

PBM v1 will use the project-centric ERP model as the canonical business spine.

## Decision

`project` is the controlled business container.

A project begins when a client or potential client asks the business to do something. The project then carries the enquiry, client, contacts, locations, services, quotes, assignments, purchase orders, supplier invoices, sales invoices, risks, evidence and close-out records.

The canonical flow is:

```text
business_partner
→ business_partner_person
→ project
→ project_party
→ project_contact
→ project_assignment
→ project_location
→ project_service
→ project_quote
→ project_quote_row
→ purchase_order
→ supplier_invoice
→ sales_invoice
```

The internal organisation flow is:

```text
business_function
→ organisation_unit
→ position
→ employee
→ employee_position
```

## Core concepts

### Business partner

A `business_partner` is any external or internal party the business has a relationship with.

Examples:

- client;
- vendor;
- supplier;
- subcontractor;
- consultant;
- employee-linked person;
- landlord;
- tenant;
- insurer;
- loss adjuster.

A business partner may be backed by a `business_entity`, a `person_entity`, or both.

### Business partner person

A `business_partner_person` records the role a person has within a client, vendor, supplier or other business partner.

This is separate from the person record because the same person may have different roles in different organisations or across time.

Examples:

- Property Manager at a client organisation;
- Accounts Contact at a supplier;
- Site Contact for a landlord;
- Technical Contact for a subcontractor.

### Project party

A `project_party` records which business partners are involved in a project and what role they play on that project.

Examples:

- client;
- supplier;
- subcontractor;
- consultant;
- landlord;
- tenant;
- insurer.

### Project contact

A `project_contact` records which named person from a business partner matters on a project.

Examples:

- client project contact;
- client approver;
- supplier contact;
- invoice contact;
- site contact;
- technical contact.

### Project assignment

A `project_assignment` records the internal person, employee or position assigned to the project.

Examples:

- project manager;
- commercial lead;
- building surveyor;
- quantity surveyor;
- quality reviewer;
- approver.

### Service catalogue and project service

`service_catalogue` defines reusable services the business can provide or procure.

`project_service` records the services required by a specific project.

## Refactor principles

1. Do not build new features around `work_container` as the primary object.
2. Keep the old prototype tables until the app is safely migrated.
3. New project delivery and commercial features must use `project` as the core container.
4. New client/vendor relationship features must use `business_partner` and `business_partner_person`.
5. Internal responsibility must come from `business_function`, `organisation_unit`, `position`, `employee` and `employee_position`.
6. Quotes, purchase orders, supplier invoices and sales invoices must all be able to trace back to a project.
7. The first UI target is the project dashboard, not another disconnected table editor.

## First implementation target

The first useful PBM v1 screen should be a project dashboard showing:

- project reference;
- project state;
- client;
- client project contact;
- internal project manager;
- locations;
- services;
- quote value;
- purchase order value;
- supplier invoice value;
- sales invoice value;
- gross margin.

## Repository impact

The first code changes should be:

1. add the canonical migration `014_project_centric_erp_core.sql`;
2. add project-centric views;
3. implement the `projects` package;
4. add `/app/projects` routes;
5. refactor commercial flows so enquiries create or attach to projects.

## Status

This is the active PBM v1 direction.
