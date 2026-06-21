# 012. PBM Enterprise Capability Coverage Catalogue

## Decision

Perspective Business Manager is a business-first enterprise platform. It must cover the full operating needs of a business without presenting users with legacy ERP module language.

PBM is organised around:

```text
Enterprise capability
    -> Business workspace
        -> User activity
            -> Business object
                -> Integrated data object
```

A workspace is a doorway into work. It is not a database boundary.

## Product language rule

Use PBM product language in documentation, routes and UI.

Use:

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

Avoid product wording that makes PBM sound like a clone of an older ERP product.

Legacy ERP module lists may be used as completeness references, but they must not become PBM navigation, PBM identity or PBM user-facing language.

## PBM workspace catalogue

### 01. Business Setup

Purpose:

Define the business that owns and uses the system.

Capabilities:

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

Uses and supports:

- People & Workforce
- Finance & Control
- Procurement, Materials & Logistics
- Project Delivery
- Quality & Compliance
- Reporting, Documents & Admin

### 02. Finance & Control

Purpose:

Control money, cost, revenue, margin, cash, accounts and financial reporting.

Capabilities:

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

Uses and supports:

- Project Delivery
- Clients & Commercial
- Procurement, Materials & Logistics
- Reporting, Documents & Admin
- Business Setup

### 03. People & Workforce

Purpose:

Manage people, employees, positions, competence, time, authority and workforce planning.

Capabilities:

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

Uses and supports:

- Business Setup
- Project Delivery
- Operations & Planning
- Quality & Compliance
- Reporting, Documents & Admin

### 04. Clients & Commercial

Purpose:

Manage the route from relationship, enquiry and opportunity through to quote, instruction and billing trigger.

Capabilities:

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
- Commercial reporting

Primary route:

```text
/app/crm/dashboard
```

Uses and supports:

- Project Delivery
- Finance & Control
- Reporting, Documents & Admin

### 05. Project Delivery

Purpose:

Manage chargeable and controlled work from setup through delivery, change, evidence, cost and reporting.

Capabilities:

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

Uses and supports:

- Clients & Commercial
- People & Workforce
- Procurement, Materials & Logistics
- Finance & Control
- Quality & Compliance
- Reporting, Documents & Admin

### 06. Procurement, Materials & Logistics

Purpose:

Manage suppliers, purchase activity, material or service supply, invoice verification, stock and supplier performance.

Capabilities:

- Suppliers
- Supplier contacts
- Purchase requests
- Supplier quotes
- Purchase orders
- Goods / service receipt
- Supplier invoice status
- Supplier invoice verification
- Materials / item master
- Material planning
- Stock locations
- Inventory
- Stock movements
- Warehouse locations
- Supplier performance
- Subcontractors

Primary route:

```text
/app/procurement/dashboard
```

Uses and supports:

- Project Delivery
- Finance & Control
- Operations & Planning
- Quality & Compliance
- Reporting, Documents & Admin

### 07. Operations & Planning

Purpose:

Plan demand, capacity, work, resources, orders, repeatable delivery steps and operational execution.

Capabilities:

- Demand and workload view
- Operations planning
- Capacity planning
- Resource planning
- Scheduling
- Work orders / service orders
- Internal orders
- Material requirements
- Work centres / delivery teams
- Routing / delivery steps
- Operational instructions
- Execution control
- Actual effort capture
- Productivity reporting

Primary route:

```text
/app/operations/dashboard
```

Uses and supports:

- Project Delivery
- People & Workforce
- Procurement, Materials & Logistics
- Finance & Control
- Reporting, Documents & Admin

### 08. Quality & Compliance

Purpose:

Control quality, audit, risk, obligations, policies, evidence, incidents and corrective action.

Capabilities:

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
- Delegations
- Incidents
- Health and safety
- Environmental records
- Certifications
- Test equipment / inspection equipment later

Primary route:

```text
/app/compliance/dashboard
```

Uses and supports:

- Project Delivery
- Procurement, Materials & Logistics
- Assets, Property & Maintenance
- Reporting, Documents & Admin

### 09. Assets, Property & Maintenance

Purpose:

Manage assets, facilities, property, equipment, maintenance, condition, defects, costs and lifecycle.

Capabilities:

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
- Maintenance orders
- Service management
- Inspections
- Defects
- Asset lifecycle
- Maintenance costs
- Leases and occupancy later
- Predictive maintenance later

Primary route:

```text
/app/property/dashboard
```

Uses and supports:

- Project Delivery
- Procurement, Materials & Logistics
- Finance & Control
- Quality & Compliance
- Reporting, Documents & Admin

### 10. Reporting, Documents & Admin

Purpose:

Provide cross-business visibility, controlled documents, system administration, access control and integration management.

Capabilities:

- Executive dashboards
- Operational reports
- Finance reports
- Project reports
- HR / workforce reports
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
- Access roles
- Workflow administration
- Integrations
- System settings
- Platform monitoring later

Primary routes:

```text
/app/reporting/dashboard
/app/admin/dashboard
```

Uses and supports:

- All PBM workspaces

## Architecture rule

Do not design one database per workspace.

Design one integrated enterprise data spine, then expose it through activity-first routes.

Example:

```text
supplier_invoice
    used by Procurement for invoice verification
    used by Finance for payment and period control
    used by Project Delivery for actual cost visibility
    used by Reporting for margin and cash exposure
```

## Status

Accepted as the PBM capability-language baseline.
