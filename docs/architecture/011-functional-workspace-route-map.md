# 011 Functional Workspace Route Map

## Status

Accepted.

## Decision

Perspective Business Manager will not copy SAP's module experience, but it will preserve the useful discipline of grouping enterprise work by major business function.

PBM routes are therefore organised as **functional workspaces**. A workspace gathers the activities a person performs in a business function. The route structure should not mirror database tables and should not force users into another function's workspace simply because the underlying data is related.

## Core principle

```text
Packages = reusable domain/data capability
Routes   = functional workspaces and user activities
Database = integrated enterprise truth
```

A finance user can process project-linked sales invoices inside `/app/finance`. They do not need to enter `/app/projects` to do finance work.

A HR user can manage employees inside `/app/hr`. They do not need to enter `/app/projects` to maintain workforce records.

A project manager can see finance, HR and procurement context inside `/app/projects`, but only as project delivery context.

## Workspace map

| Workspace | Route root | Purpose |
| --- | --- | --- |
| Command centre | `/app/dashboard` | Overall operating model, navigation and cross-functional visibility. |
| Business setup | `/app/business` | Tenant business profile, business functions, operating model, organisation units and positions. |
| HR / workforce | `/app/hr` | People, employees, employee positions, competence, authority and workforce records. |
| CRM | `/app/crm` | Clients, contacts, prospects and relationships. |
| Commercial | `/app/commercial` or existing sales routes | Enquiries, opportunities, quotes, proposals, tenders and sales pipeline. |
| Projects | `/app/projects` | Project delivery, scope, services, instructions, activities, risks, issues, change, evidence and documents. |
| Procurement | `/app/procurement` | Suppliers, purchase orders, supplier quotes, subcontractors and bought-in services. |
| Finance | `/app/finance` | Sales invoices, supplier invoices, payments, credit control, revenue, cost, VAT and margin reporting. |
| Quality | `/app/quality` | Reviews, checks, non-conformance, lessons learned and quality assurance. |
| Compliance | `/app/compliance` | Controls, governance, audit, risk and regulatory evidence. |
| Reporting | `/app/reporting` | Cross-functional reporting, dashboards and KPIs. |
| Admin | `/app/admin` | Reference data, platform settings and system administration. |

## SAP-style mapping, PBM-style implementation

PBM uses SAP-style module completeness as a checklist, not as an experience model.

| SAP-style area | PBM workspace |
| --- | --- |
| FI / CO | Finance |
| HCM / HR | HR / workforce |
| MM / SRM | Procurement |
| SD / CRM | CRM and Commercial |
| PS | Projects |
| QM | Quality |
| PM / EAM | Assets / property / maintenance later |
| BI / BW | Reporting |

## Route rule

A route answers this question:

```text
What job is the user trying to do?
```

It should not answer this question:

```text
What database table is this?
```

Examples:

```text
Finance user:
/app/finance/sales-invoices
/app/finance/supplier-invoices
/app/finance/project-margin

Project manager:
/app/projects/dashboard
/app/projects/projects/[projectId]/overview
/app/projects/projects/[projectId]/services

HR user:
/app/hr/dashboard
/app/hr/employees
/app/hr/employee-positions

Business/admin user:
/app/business/dashboard
/app/business/functions
/app/business/organisation-units
/app/business/positions
```

## Current refactor direction

The project-centric ERP database remains valid. Project is still the controlled business/work container.

The route structure must not become project-only. Finance, HR, procurement and commercial workspaces may read or write project-linked data, but their user journeys remain inside their own functional workspace.

## Immediate implementation rule

Do not create `/app/organisation` as a primary workspace.

Use:

```text
/app/business/dashboard  -> tenant business, business functions, organisation units, positions
/app/hr/dashboard        -> people, employees, employee positions, competence, authority
/app/projects/dashboard  -> project delivery
/app/finance/dashboard   -> finance processing and reporting
/app/procurement/dashboard -> procurement processing
```
