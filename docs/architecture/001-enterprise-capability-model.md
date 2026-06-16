# Enterprise Capability Model

## Purpose

This document defines the top-level enterprise capability model for Perspective Business Manager (PBM).

PBM is an Enterprise Resource Planning platform intended to provide one coherent system for managing every major business function. The platform should feel familiar to users of established ERP products while avoiding the fragmented, module-owned data models that make many ERP implementations complex, expensive and difficult to change.

This document is the architectural baseline for product scope, navigation, route families, package boundaries, database object discovery, permissions, workflow design, reporting design and future framework extensions.

No significant feature should be added unless it can be mapped to this capability model or deliberately approved as a new capability.

## Product Definition

Perspective Business Manager is not a surveying application, CRM application, project management application, finance application or document system.

Perspective Business Manager is an enterprise business management platform.

Users may experience familiar ERP workspaces such as Customers, Sales, Projects, Operations, Resources, Procurement, Finance, Documents, Compliance, Reporting and Administration. Internally those workspaces must operate over shared enterprise objects rather than isolated module-specific models.

## Core Thesis

Across industries, most enterprise functions follow similar patterns. Organisations manage customers, people, suppliers, money, assets, documents, risk, compliance, work and reporting.

The major differences between industries are usually:

- how work is executed
- how work is governed
- which standards apply
- which controls are required
- which deliverables are produced
- which evidence is required
- which lifecycle model must be followed
- which KPIs matter

PBM must therefore separate universal ERP capabilities from configurable frameworks, standards, methodologies and industry extensions.

The goal is one ERP platform, many frameworks.

## Strategic Objective

PBM must aim to surpass established ERP systems by removing unnecessary boundaries between modules.

Common ERP weaknesses include duplicated master data, separated project and finance models, document systems bolted on after the fact, disconnected compliance processes, rigid industry modules, expensive customisation, difficult reporting and poor user experience.

PBM should provide:

- one coherent enterprise model
- one shared party and customer model
- one shared project, work and delivery model
- one shared document and evidence model
- one shared workflow engine
- one shared framework and compliance engine
- one shared reporting and analytics layer
- route families that behave as workspaces, not data owners
- packages that implement business capabilities and enterprise objects, not isolated modules

## L0 Enterprise Capability Groups

PBM is organised around these Level 0 capability groups:

1. Strategy & Governance
2. Customer & Commercial
3. Project & Delivery
4. Operations & Work Execution
5. People & Workforce
6. Supply Chain & Procurement
7. Finance & Accounting
8. Assets, Property & Facilities
9. Information, Documents & Knowledge
10. Compliance, Risk & Quality
11. Reporting & Analytics
12. Platform Administration
13. Integration & Automation
14. Framework & Extension Management

These are capability groups, not necessarily menu labels, packages or database schemas.

---

# 1. Strategy & Governance

## Purpose

Manage strategic direction, enterprise controls, policies, governance structures and executive decision-making.

## L1 Capabilities

- Corporate strategy
- Business planning
- Objectives and OKRs
- KPI management
- Performance management
- Corporate governance
- Board reporting
- Policy management
- Delegations of authority
- Approval governance
- Portfolio governance
- Programme governance
- Investment governance
- Benefits realisation
- Business continuity
- Operating model management

## Typical Objects

- Strategy
- Objective
- KPI
- Policy
- Governance Board
- Decision
- Delegation of Authority
- Business Plan
- Portfolio
- Programme
- Benefit
- Control

## Notes

This group defines how the organisation governs itself. It is not the same as day-to-day delivery, although delivery must report into governance.

---

# 2. Customer & Commercial

## Purpose

Manage customer relationships and the commercial lifecycle from initial contact through opportunities, proposals, contracts, account management and customer service.

## L1 Capabilities

- Party management
- Organisation management
- Person management
- Client account management
- Contact management
- Communication history
- Lead management
- Enquiry management
- Opportunity management
- Sales pipeline
- Bid management
- Tender management
- Proposal management
- Quotation management
- Pricing
- Contract management
- Framework agreements
- Customer onboarding
- Account management
- Customer service
- Customer complaints
- Conflict checks
- Commercial correspondence

## Typical Objects

- Party
- Organisation
- Person
- Client Account
- Contact Method
- Party Relationship
- Lead
- Enquiry
- Opportunity
- Bid
- Tender
- Proposal
- Quotation
- Estimate
- Contract
- Framework Agreement
- Customer Communication
- Complaint
- Conflict Check

## Notes

Customer & Commercial must not own duplicate customer records. B2B and B2C use the same root model:

```text
Party -> Person / Organisation -> Client Account
```

Commercial objects may lead to projects, contracts or work orders once accepted.

---

# 3. Project & Delivery

## Purpose

Manage authorised work from contract award or internal approval through planning, delivery, monitoring, control, completion and close-out.

## L1 Capabilities

- Project management
- Programme management
- Portfolio management
- Project initiation
- Project governance
- Project planning
- Work breakdown structures
- Work packages
- Milestones
- Dependencies
- Scheduling
- Baselines
- Project controls
- Progress tracking
- Deliverable management
- Stage gates
- Gate reviews
- Project reporting
- Project close-out
- Lessons learned
- Project templates
- Project methodology application

## Typical Objects

- Project
- Programme
- Portfolio
- Work Package
- Activity
- Task
- Milestone
- Dependency
- Deliverable
- Project Baseline
- Stage Gate
- Project Review
- Project Report
- Lesson Learned

## Notes

Project is the central delivery container once work is authorised.

A project may be created from an accepted proposal, quotation, contract award, service request, internal business case, operational instruction, compliance requirement or asset maintenance requirement.

Projects are not industry-specific. Differences are applied through frameworks such as PRINCE2, PMBOK, Agile, Six Sigma, CMII, RICS, CDM, ISO standards or client-specific governance.

---

# 4. Operations & Work Execution

## Purpose

Manage the execution of work, including jobs, work orders, activities, inspections, operational tasks, findings, actions, outcomes and evidence.

## L1 Capabilities

- Work order management
- Job management
- Service request management
- Activity management
- Task execution
- Inspection management
- Audit execution
- Site visits
- Field work
- Operational checklists
- Observation capture
- Assessment capture
- Action management
- Corrective actions
- Preventive actions
- Defect management
- Snagging
- Outcome management
- Evidence capture
- Work status tracking

## Typical Objects

- Work Order
- Job
- Service Request
- Activity
- Task
- Checklist
- Observation
- Assessment
- Action
- Defect
- Non-Conformance
- Outcome
- Evidence Item
- Completion Record

## Notes

This is where industries differ most, but the core pattern remains stable:

```text
Project / Work Package -> Activity / Task -> Output / Evidence / Outcome
```

The platform must not force every project to use the same execution pattern. Frameworks and work types govern which structures are required.

---

# 5. People & Workforce

## Purpose

Manage people, roles, teams, skills, competence, capacity and workforce activity.

## L1 Capabilities

- Employee management
- Contractor management
- Workforce records
- Organisation structure
- Teams
- Roles
- Positions
- Skills
- Competencies
- Certifications
- Training
- Availability
- Resource planning
- Resource allocation
- Utilisation
- Timesheets
- Expenses
- Performance management
- Workforce compliance
- Absence management
- Onboarding
- Offboarding

## Typical Objects

- Employee
- Contractor
- Team
- Role
- Position
- Skill
- Competency
- Certification
- Training Record
- Availability
- Allocation
- Timesheet
- Expense Claim
- Performance Review
- Absence

## Notes

People & Workforce depends on Party and Person but must not duplicate the party model.

A person can be a customer contact, employee, contractor, approver, supplier representative or regulator depending on context.

---

# 6. Supply Chain & Procurement

## Purpose

Manage suppliers, subcontractors, sourcing, purchasing, purchase orders, receipt, supplier performance and procurement controls.

## L1 Capabilities

- Supplier management
- Subcontractor management
- Supplier onboarding
- Supplier qualification
- Supplier compliance
- Supplier performance
- Procurement planning
- Purchase requisitions
- RFQs
- Supplier quotations
- Purchase orders
- Subcontracts
- Framework supplier agreements
- Goods receipt
- Service receipt
- Invoice matching
- Materials management
- Inventory
- Stock control
- Plant and equipment hire
- External cost commitments
- Procurement approvals

## Typical Objects

- Supplier
- Subcontractor
- Supplier Account
- Supplier Qualification
- Purchase Requisition
- RFQ
- Supplier Quote
- Purchase Order
- Subcontract
- Goods Receipt
- Service Receipt
- Inventory Item
- Stock Location
- Material
- External Commitment

## Notes

Supplier and subcontractor identity should use Party. Procurement attaches to Project, Work Package, Activity, Asset or Cost Centre as appropriate.

---

# 7. Finance & Accounting

## Purpose

Manage financial control, accounting, billing, payments, budgets, costs, revenue, cash flow, WIP and financial reporting.

## L1 Capabilities

- General ledger
- Chart of accounts
- Cost centres
- Profit centres
- Accounts receivable
- Accounts payable
- Sales invoicing
- Purchase invoicing
- Payments
- Receipts
- Credit notes
- Bank reconciliation
- Cash management
- Budgeting
- Forecasting
- Cost management
- Revenue management
- WIP management
- Accruals
- Prepayments
- Fixed assets
- Tax management
- VAT / sales tax
- Multi-currency
- Financial periods
- Financial approvals
- Financial reporting

## Typical Objects

- Ledger Account
- Journal Entry
- Cost Centre
- Profit Centre
- Budget
- Forecast
- Cost
- Revenue
- Sales Invoice
- Purchase Invoice
- Payment
- Receipt
- Credit Note
- Bank Account
- Tax Code
- Financial Period
- WIP Item

## Notes

Finance must consume customer, project, procurement and delivery context rather than recreating them.

A project should be able to expose budget, committed cost, actual cost, revenue, WIP, invoices and margin without switching to a separate reality.

---

# 8. Assets, Property & Facilities

## Purpose

Manage physical assets, properties, buildings, equipment, facilities and asset lifecycle context.

## L1 Capabilities

- Asset register
- Property register
- Building register
- Land and site management
- Asset hierarchy
- Asset classification
- Asset ownership
- Asset condition
- Asset lifecycle
- Facilities management
- Maintenance planning
- Planned preventative maintenance
- Reactive maintenance
- Asset inspections
- Asset documentation
- Asset compliance
- Location management
- GIS / mapping integration

## Typical Objects

- Asset
- Property
- Building
- Site
- Land Parcel
- Unit
- Floor
- Room
- Equipment
- Vehicle
- Plant
- Asset Hierarchy
- Asset Condition
- Maintenance Plan
- Maintenance Work Order
- Location

## Notes

Property is one asset type, not the whole asset model.

The platform must support built environment assets, operational assets, equipment, vehicles, plant, systems and other asset classes through the same general asset principles.

---

# 9. Information, Documents & Knowledge

## Purpose

Manage controlled information, documents, records, evidence, templates, knowledge and retention.

## L1 Capabilities

- Document management
- Document revision control
- Controlled documents
- Templates
- Records management
- Retention policies
- Evidence management
- Transmittals
- Correspondence
- Knowledge base
- Lessons learned
- Search
- Metadata management
- Document approvals
- Document distribution
- Information classification

## Typical Objects

- Document
- Document Revision
- Record
- Evidence Item
- Template
- Transmittal
- Correspondence
- Knowledge Article
- Retention Policy
- Metadata Field
- Classification

## Notes

Documents and evidence attach to business objects. They must not become isolated islands.

Supported attachment targets should include Party, Client Account, Opportunity, Contract, Project, Work Package, Activity, Task, Asset, Risk, Issue, Change, Deliverable, Invoice and Compliance Requirement.

---

# 10. Compliance, Risk & Quality

## Purpose

Manage risk, compliance obligations, controls, audits, quality, non-conformance, corrective action and assurance.

## L1 Capabilities

- Risk management
- Issue management
- Change management
- Compliance management
- Control management
- Audit management
- Quality management
- Non-conformance management
- Corrective action
- Preventive action
- Lessons learned
- Complaints
- Conflicts of interest
- Health and safety
- Environmental compliance
- Information security compliance
- Legal obligations
- Regulatory obligations
- Client-specific compliance
- Framework compliance
- Assurance reviews

## Typical Objects

- Risk
- Issue
- Change
- Compliance Requirement
- Compliance Framework
- Control
- Audit
- Audit Finding
- Quality Plan
- Non-Conformance
- Corrective Action
- Preventive Action
- Complaint
- Conflict Check
- Assurance Review

## Notes

Compliance is not an industry module.

Compliance is a platform capability applied to business objects.

A project may have multiple compliance frameworks applied, such as ISO 9001, ISO 14001, ISO 45001, CDM, RICS, CMII, NEC, JCT, PRINCE2, PMBOK, Six Sigma or client-specific governance.

---

# 11. Reporting & Analytics

## Purpose

Provide operational, financial, compliance, project and executive reporting across all enterprise objects.

## L1 Capabilities

- Dashboards
- Operational reporting
- Project reporting
- Finance reporting
- Sales reporting
- Resource reporting
- Procurement reporting
- Compliance reporting
- Risk reporting
- KPI reporting
- Executive reporting
- Report definitions
- Data exports
- Analytics
- Data warehouse integration
- Audit reporting
- Forecasting
- Trend analysis

## Typical Objects

- Report Definition
- Dashboard
- KPI
- Metric
- Data View
- Export
- Analytical Snapshot
- Forecast
- Trend

## Notes

Reporting is derived from enterprise objects.

Reports must not create parallel business models.

---

# 12. Platform Administration

## Purpose

Manage platform configuration, security, reference data, permissions, numbering, workflow setup and tenant-level controls.

## L1 Capabilities

- User management
- Role management
- Permission management
- Team management
- Organisation configuration
- Reference data
- Numbering schemes
- Workflow configuration
- Framework configuration
- Template configuration
- Notification configuration
- Audit logs
- System settings
- Tenant configuration
- Feature flags
- Data import/export administration

## Typical Objects

- User
- Role
- Permission
- Team
- Reference Code Set
- Reference Code Value
- Numbering Scheme
- Workflow Definition
- Framework Definition
- Template Configuration
- Notification Rule
- Audit Log
- Tenant
- Feature Flag

## Notes

Administration configures the platform. It must not become the owner of business data.

---

# 13. Integration & Automation

## Purpose

Connect PBM to external systems and automate cross-functional business processes.

## L1 Capabilities

- API management
- Webhooks
- Event publishing
- Event subscriptions
- Integration monitoring
- Import/export
- Email integration
- Calendar integration
- Accounting integration
- Payment integration
- Document storage integration
- GIS integration
- CAD / BIM integration
- Identity provider integration
- Workflow automation
- Notifications
- Escalations
- Scheduled jobs
- Data synchronisation

## Typical Objects

- API Client
- Integration Endpoint
- Webhook
- Integration Event
- Import Job
- Export Job
- Automation Rule
- Notification
- Escalation
- Scheduled Job
- Sync Job

## Notes

Integration and automation must use the same canonical objects and event model as the rest of the platform.

---

# 14. Framework & Extension Management

## Purpose

Allow PBM to adapt to industries, methodologies, standards and client-specific governance without changing the core ERP model.

## L1 Capabilities

- Framework definition
- Framework assignment
- Methodology configuration
- Standard configuration
- Lifecycle templates
- Stage templates
- Workflow templates
- Control libraries
- Checklist libraries
- Deliverable templates
- Evidence requirements
- Report templates
- KPI templates
- Industry extension packs
- Client-specific governance packs

## Typical Objects

- Framework
- Framework Version
- Framework Assignment
- Methodology
- Standard
- Lifecycle Template
- Stage Template
- Workflow Template
- Control Template
- Checklist Template
- Deliverable Template
- Evidence Requirement
- Report Template
- KPI Template
- Extension Pack

## Notes

This is one of PBM's most important differentiators.

A project should be able to apply zero or many frameworks.

Example:

```text
Project: Office Refurbishment
Frameworks: PRINCE2, CDM, ISO 9001, Client Governance
```

Another project:

```text
Project: Manufacturing Process Improvement
Frameworks: Six Sigma, Lean, ISO 9001
```

The same ERP core supports both.

Frameworks may contribute lifecycle stages, required deliverables, workflows, controls, evidence requirements, reports and KPIs.

Frameworks must extend the core model; they must not fork it.

---

# Capability To Workspace Direction

The user-facing platform should feel familiar to ERP users. A likely route and navigation model is:

```text
Dashboard
Customers
Sales
Projects
Operations
Resources
Procurement
Finance
Assets
Documents
Compliance
Reporting
Administration
```

These workspaces map to capabilities but do not own data.

---

# Capability To Package Direction

Packages should implement stable business and platform boundaries. Candidate package families include:

```text
parties
client-accounts
commercial
contracts
projects
work
resources
procurement
finance
assets
documents
compliance
workflows
events
reports
frameworks
administration
integrations
```

Existing packages should be assessed against this model before further expansion.

---

# Design Review Rules

Before approving new functionality, confirm:

1. Which L0 capability does it serve?
2. Which business object does it create, update or report on?
3. Does an existing package already own that object?
4. Is this a workspace concern or a domain concern?
5. Does it duplicate an existing object model?
6. Does it need workflow?
7. Does it need events?
8. Does it need documents or evidence?
9. Does it need compliance controls?
10. Is it framework-specific or core ERP behaviour?

# Summary

PBM is designed as one coherent ERP platform.

The user should experience familiar ERP workspaces.

The platform should internally maintain a unified enterprise model.

Frameworks and industry extensions should adapt how work is governed and executed without creating separate applications or duplicate data models.
