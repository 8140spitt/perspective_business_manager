# 012. SAP-Coverage Capability Catalogue

## Decision

Perspective Business Manager must provide SAP-grade enterprise capability coverage without copying SAP's user experience.

PBM should not expose SAP-style module names as the primary user experience. It should expose modern functional workspaces, with SAP-equivalent capability coverage underneath.

## Principle

```text
SAP-style module coverage
    ↓
PBM capability group
    ↓
Functional workspace route
    ↓
User activity page
    ↓
Integrated data spine
```

The route structure is not the data model. A finance user can work in Finance & Control while reading project-linked invoices. A project manager can work in Project Delivery while seeing finance summaries. A procurement user can work in Procurement, Materials & Logistics while supplier invoices remain part of the integrated financial truth.

## Naming rule

Use business language in the application.

Do not expose old ERP shorthand as the main navigation:

```text
FI, CO, MM, SD, PS, PP, PM, QM
```

Use clear PBM workspace names:

```text
Business Setup
Finance & Control
People & Workforce
Clients & Commercial
Project Delivery
Procurement, Materials & Logistics
Operations & Planning
Quality & Compliance
Assets, Property & Maintenance
Reporting, Documents & Admin
```

## SAP-equivalent coverage map

### 01. Business Setup

SAP-equivalent coverage:

- Enterprise structure
- Organisational management
- Reference/configuration foundations

PBM capabilities:

- Business profile
- Legal entities
- Business functions
- Organisation units
- Positions
- Sites and locations
- Numbering rules
- Reference data
- Operating model

Primary route:

```text
/app/business/dashboard
```

### 02. Finance & Control

SAP-equivalent coverage:

- FI: Financial Accounting
- CO: Controlling
- FSCM: Financial Supply Chain Management
- AA: Asset Accounting

PBM capabilities:

- General ledger
- Accounts receivable
- Accounts payable
- Bank and cash
- Tax / VAT
- Credit control
- Collections
- Payments
- Dispute management
- Cost centres
- Profit centres
- Project costing
- Revenue, cost and margin
- Budgeting and monitoring
- Period close
- Management accounts
- Financial reporting

Primary route:

```text
/app/finance/dashboard
```

### 03. People & Workforce

SAP-equivalent coverage:

- HR / HCM
- Organisational Management
- Personnel Administration
- Time Management
- Training and Personnel Development
- Payroll interface / payroll later

PBM capabilities:

- People records
- Employees
- Employee positions
- Recruitment
- Onboarding
- Time and attendance
- Leave / absence
- Competence
- Training
- Authority limits
- Workforce planning
- Payroll interface

Primary route:

```text
/app/hr/dashboard
```

### 04. Clients & Commercial

SAP-equivalent coverage:

- SD: Sales and Distribution
- CRM
- Sales information
- Billing triggers
- Credit control hand-off

PBM capabilities:

- Clients
- Contacts
- Relationships
- Leads
- Enquiries
- Opportunities
- Quotes
- Fee proposals
- Pricing
- Instructions / sales orders
- Contract terms
- Billing triggers
- Client account view

Primary route:

```text
/app/crm/dashboard
```

### 05. Project Delivery

SAP-equivalent coverage:

- PS: Project System
- Project planning
- Project tracking
- Project reporting
- Project costs
- WBS-style breakdown

PBM capabilities:

- Projects
- Project phases / work breakdown
- Scope
- Services
- Activities
- Milestones
- Team assignments
- Risks
- Issues
- Change control
- Evidence
- Project documents
- Cost and margin view
- Project reporting

Primary route:

```text
/app/projects/dashboard
```

### 06. Procurement, Materials & Logistics

SAP-equivalent coverage:

- MM: Materials Management
- SRM: Supplier Relationship Management
- Purchasing
- Inventory management
- Material planning
- Invoice verification
- Warehouse management
- Vendor valuation
- Logistics / delivery tracking where needed

PBM capabilities:

- Suppliers
- Supplier contacts
- Purchase requests
- Supplier quotes
- Purchase orders
- Goods / service receipt
- Supplier invoices from procurement view
- Materials / item master
- Stock locations
- Inventory
- Stock movements
- Warehouse bins later
- Supplier performance
- Subcontractors

Primary route:

```text
/app/procurement/dashboard
```

### 07. Operations & Planning

SAP-equivalent coverage:

- PP: Production Planning
- Service operations
- Work centres / capacity planning
- Shop-floor/service execution equivalents

PBM capabilities:

- Work planning
- Demand / workload view
- Capacity planning
- Resource planning
- Scheduling
- Work orders / service orders
- Operational instructions
- Field/service completion
- Actual effort capture
- Productivity reporting

Primary route:

```text
/app/operations/dashboard
```

### 08. Quality & Compliance

SAP-equivalent coverage:

- QM: Quality Management
- GRC: Governance, Risk and Compliance
- EHS-style incident and safety records where required

PBM capabilities:

- Quality plans
- Quality checks
- Inspections
- Review gates
- Non-conformance
- Corrective actions
- Lessons learned
- Supplier quality
- Risk register
- Controls
- Compliance obligations
- Audit evidence
- Policies
- Approvals
- Incidents
- Health and safety
- Environmental records later

Primary route:

```text
/app/compliance/dashboard
```

### 09. Assets, Property & Maintenance

SAP-equivalent coverage:

- PM: Plant Maintenance
- EAM-style asset management
- RE-style property / real estate capability where required

PBM capabilities:

- Asset register
- Equipment
- Facilities
- Properties
- Sites
- Buildings
- Spaces
- Planned maintenance
- Preventive maintenance
- Reactive maintenance
- Inspections
- Defects
- Asset lifecycle
- Maintenance costs
- Leases / occupancy later

Primary route:

```text
/app/property/dashboard
```

### 10. Reporting, Documents & Admin

SAP-equivalent coverage:

- BW / BI reporting
- DMS-style document management
- Basis / Security / platform administration
- Integration and technical administration

PBM capabilities:

- Executive dashboards
- Finance reports
- Project reports
- HR/workforce reports
- Procurement reports
- Compliance reports
- KPI definitions
- Period reporting
- Export packs
- Document register
- Templates
- Controlled documents
- Evidence files
- Versioning
- Retention
- Users and permissions
- Security roles
- Workflow administration
- Integrations
- System settings

Primary route:

```text
/app/reporting/dashboard
```

## Build rule

Every new route, package, migration and component must be assignable to one of these capability groups.

When a feature spans more than one group, the data belongs in the integrated data spine and the UI appears in the workspace where the user performs the activity.

Examples:

- Supplier invoice entry belongs in Finance & Control.
- Supplier invoice status belongs in Procurement, Materials & Logistics.
- Project margin belongs in Finance & Control and Project Delivery as different views of the same underlying data.
- Employee records belong in People & Workforce.
- Project assignments consume employee data inside Project Delivery.

## Implementation note

`src/lib/business/capability-map.ts` is the application route/workspace source of truth.

This document is the architecture source of truth for SAP-equivalent capability coverage.
