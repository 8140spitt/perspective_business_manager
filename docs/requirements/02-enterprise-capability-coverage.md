# Enterprise Capability Coverage

## Purpose

Define the full business capability surface PBM must cover so the product grows as one coherent enterprise platform rather than a set of disconnected apps.

This document is a coverage audit. It is not a navigation model and it is not a product module hierarchy.

## Coverage Principle

PBM uses business capability areas for planning, governance and implementation sequencing.

The shared enterprise data spine remains the system of record.

Workspaces expose activity views over that data spine. They do not own the records.

## PBM Capability Areas

| PBM capability area | Purpose | Primary workspaces | Example activity views |
| --- | --- | --- | --- |
| Clients & Commercial | Manage relationships, enquiries, opportunities, quotes and instruction conversion. | CRM, Sales | client view, enquiry view, quote view, instruction handover |
| Project Delivery | Plan, execute and control chargeable or governed work. | Projects, Operations, Activities | project view, activity view, milestone view, delivery issue view |
| Property & Assets | Maintain the built-asset context for work, evidence, risk and history. | Property | property view, site view, building view, asset view |
| Finance & Control | Control revenue, cost, WIP, invoicing, payments, debt, budget and margin. | Finance | invoice view, WIP view, margin view, cash/debt view |
| Procurement & Supply | Control suppliers, purchase commitments, bought-in services and supplier cost. | Procurement | supplier view, purchase order view, supplier invoice view |
| People & Workforce | Manage people, roles, competence, availability, allocation and authority. | HR, Resource Planning | employee view, competence view, allocation view |
| Quality, Risk & Compliance | Govern assurance, complaints, quality checks, controls, risk and evidence. | Compliance | risk view, control view, complaint view, review view |
| Documents, Reporting & Administration | Manage documents, evidence, reporting, workflow settings, reference data and platform administration. | Documents, Reporting, Admin | document view, evidence view, KPI view, workflow admin view |

## Coverage Interpretation

The goal is not to mirror old enterprise system menu labels.

The goal is:

- every normal enterprise capability has a PBM home
- every sub-capability has an intended PBM activity view
- every activity view maps back to shared business objects
- implementation packages support behaviour without creating separate truths
- reporting reads from the shared data spine rather than route-specific silos

## Capability Inventory

### Clients & Commercial

- client and relationship management
- customer type handling for organisations and individuals
- contacts and communication channels
- enquiries and intake
- opportunities and pipeline
- fee proposals and quotations
- tenders and submissions
- client onboarding and due diligence
- instruction conversion and handover
- credit and acceptance controls where commercially relevant

### Project Delivery

- instruction workspace
- project setup and governance
- programme, milestones and tasks
- activity management
- findings, assessments and actions
- deliverables and technical review
- resource assignment and field scheduling
- closeout and retained delivery records
- project cost and margin visibility

### Property & Assets

- property register
- site and building hierarchy
- units, spaces and zones
- building elements and components
- party-to-property relationships
- property document history
- condition and defect history
- portfolio and client asset views
- planned maintenance and inspection context where required

### Finance & Control

- fee agreements and pricing basis
- WIP capture and valuation
- invoice preparation and issue
- B2B account billing and individual customer billing
- payments and allocations
- credit notes and write-offs
- profitability and margin analysis
- cost control and budgets
- debt and billing performance monitoring
- cash, bank and period reporting
- supplier invoice financial control

### Procurement & Supply

- supplier master
- supplier contacts and roles
- supplier compliance records
- purchase requests
- purchase orders
- bought-in service and subcontractor engagement
- goods or service receipt confirmation where required
- supplier costs and recovery
- external service delivery tracking
- supplier performance review

### People & Workforce

- employee records
- team, role and position structure
- competencies and accreditations
- training and renewals
- availability and leave context
- allocations and utilisation
- workload forecasting
- approvals and internal controls
- authority limits

### Quality, Risk & Compliance

- onboarding checks and conflicts
- complaints management
- quality review workflows
- risk register and controls
- audit trail and evidence review
- policy linkage and attestations
- corrective actions and closeout
- compliance reporting and oversight
- health, safety and incident context where required

### Documents, Reporting & Administration

- document control
- evidence management
- templates and output standards
- dashboards and operational reporting
- management analytics
- integration endpoints and events
- workflow configuration
- reference data and numbering administration
- user, role and permission administration

## End-To-End Business Processes

### Process 1: Lead To Instruction

1. Capture enquiry.
2. Identify whether the customer is an organisation, individual or intermediary-led case.
3. Qualify opportunity and service need.
4. Prepare fee proposal or quotation.
5. Run onboarding and compliance checks.
6. Accept commercial terms.
7. Convert to instruction with linked parties, properties and scope.

### Process 2: Instruction To Deliverable

1. Define scope, property context and parties.
2. Create project or delivery plan where needed.
3. Schedule resources and activities.
4. Execute inspections, surveys or technical activities.
5. Capture observations, assessments, actions and evidence.
6. Draft, review, approve and issue outcomes or deliverables.

### Process 3: Delivery To Cash

1. Capture fee basis and delivery effort.
2. Accumulate WIP and external cost.
3. Prepare invoice based on fee rules or milestones.
4. Issue invoice and track debt.
5. Allocate receipts, credits or adjustments.
6. Report profitability and recovery.

### Process 4: Asset And Portfolio Oversight

1. Maintain property and building structures.
2. Link properties to parties, instructions and projects.
3. Record technical history, condition and risk context.
4. Aggregate outcomes, actions and certificates across portfolios.
5. Report status and trends by client, geography and asset type.

### Process 5: Governance And Assurance

1. Run compliance checks at onboarding and delivery stages.
2. Apply review and approval workflows to sensitive outputs.
3. Record complaints, risks, controls and corrective actions.
4. Retain evidence, documents and business events.
5. Produce audit-ready reporting and retained records.

## Coverage Gaps To Watch

- supplier cost capture must remain linked to project and instruction profitability
- document and evidence controls must work consistently across all delivery objects
- competence and accreditation checks must influence scheduling and assignment decisions
- client, property and instruction context must remain navigable across every workspace
- organisation-led and individual-led customer handling must share the same party and client-account model
- workflow and event history must remain shared layers rather than workspace-specific duplicates

## Related Requirement Documents

- [modules/sales-client-management.md](./modules/sales-client-management.md)
- [modules/service-delivery-projects.md](./modules/service-delivery-projects.md)
- [modules/property-asset-management.md](./modules/property-asset-management.md)
- [modules/finance-commercial-control.md](./modules/finance-commercial-control.md)
- [modules/procurement-supply-chain.md](./modules/procurement-supply-chain.md)
- [modules/workforce-resource-planning.md](./modules/workforce-resource-planning.md)
- [modules/quality-risk-compliance.md](./modules/quality-risk-compliance.md)
- [modules/documents-analytics-integration.md](./modules/documents-analytics-integration.md)
