# Enterprise Module Coverage

## Purpose

Map Perspective Business Manager capabilities to a complete ERP-style module structure so planning, governance and implementation sequencing cover the full application surface expected in an enterprise platform.

## Coverage Principle

Perspective Business Manager uses module groupings for planning and navigation, not for ownership of data.

The canonical enterprise model remains the system of record.

Customer-facing capabilities must work for both organisation customers and individual consumers using the same shared party, contact, instruction, finance and service-delivery model.

## Coverage Matrix

| Coverage area                        | Purpose in this product                                                          | Current capability areas         | Typical submodules                                                                                 |
| ------------------------------------ | -------------------------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------- |
| Sales and Client Management          | enquiries, opportunities, quotations, client accounts, instruction conversion    | CRM, Sales                       | enquiries, opportunities, fee proposals, quotations, client onboarding, client relationships       |
| Service Delivery and Projects        | project planning, instruction execution, tasks, milestones, deliverables         | Operations, Activities, Projects | instructions, projects, tasks, milestones, activities, findings, actions, outcomes                 |
| Property and Asset Management        | property register, site and unit model, technical history, condition context     | Property                         | property register, sites, buildings, units, elements, party roles, condition history               |
| Finance and Commercial Control       | fees, WIP, invoices, payments, profitability, cost control                       | Finance                          | fee agreements, WIP, invoicing, payments, credit control, profitability, budgets                   |
| Procurement and Supply Chain         | suppliers, purchasing, subcontractor control, bought-in services                 | Procurement                      | supplier master, purchase requests, purchase orders, subcontractor engagement, supplier compliance |
| Workforce and Resource Planning      | employees, competencies, allocations, utilisation, approvals                     | HR, Resource Planning            | employee records, competencies, accreditations, allocations, availability, utilisation             |
| Quality, Risk and Compliance         | quality reviews, audit, risk, complaints, conflicts, compliance controls         | Compliance                       | quality reviews, conflicts, complaints, risk register, audit trail, controls                       |
| Documents, Analytics and Integration | controlled documents, evidence, reports, integration events, workflow automation | Documents, Reporting, Admin      | document control, evidence, dashboards, reporting, integrations, workflow admin                    |

## Built-Environment Interpretation

### Sales And Client Management

The commercial lifecycle ends at accepted instruction with linked property, scope, parties and fee basis.

This lifecycle must work whether the customer is a company, public body, landlord, managing agent, insurer or an individual consumer.

### Service Delivery And Projects

The delivery lifecycle must support site work, inspections, technical review, action tracking and issue-to-client controls.

### Property And Asset Management

The property model is the spatial and technical anchor for surveys, inspections, risks, documents and lifecycle history.

### Finance And Commercial Control

Revenue recognition, WIP, invoice control and profitability need to work by client, instruction, project, property, service line and team.

Commercial controls must also support both account-based B2B billing and person-based B2C billing.

### Procurement And Supply Chain

Procurement must cover both ordinary spend and specialist subcontracted services such as asbestos surveys, structural testing or drone capture.

### Workforce And Resource Planning

Resource planning must reflect competencies, accreditations, sector authorisations and site availability, not only reporting hierarchy.

### Quality, Risk And Compliance

Quality and compliance must be embedded in the work chain through review states, evidence requirements, complaints handling and immutable audit history.

### Documents, Analytics And Integration

Documents, evidence, workflows and analytics are shared platform layers used across every business process.

## Mapping To Existing Capability Areas

- Sales and Client Management maps to current CRM and Sales routes.
- Service Delivery and Projects maps to Operations, Activities and Projects.
- Property and Asset Management maps to Property workspaces.
- Finance and Commercial Control maps to Finance.
- Procurement and Supply Chain maps to Procurement.
- Workforce and Resource Planning maps to HR and Resource Planning.
- Quality, Risk and Compliance maps to Compliance.
- Documents, Analytics and Integration maps to Documents, Reporting and Admin.

## Submodule Inventory

### Sales And Client Management

- client master and relationships
- customer type handling for organisations and individuals
- contacts and communication channels
- enquiries and intake
- opportunities and pipeline
- fee proposals and quotations
- tenders and submissions
- client onboarding and due diligence
- instruction conversion and handover

### Service Delivery And Projects

- instruction workspace
- project setup and governance
- programme, milestones and tasks
- activity management
- findings, assessments and actions
- deliverables and technical review
- resource assignment and field scheduling
- closeout and retained delivery records

### Property And Asset Management

- property register
- site and building hierarchy
- units, spaces and zones
- building elements and components
- party-to-property relationships
- property document history
- condition and defect history
- portfolio and client asset views

### Finance And Commercial Control

- fee agreements and pricing basis
- WIP capture and valuation
- invoice preparation and issue
- B2B account billing and B2C direct billing
- payments and allocations
- credit notes and write-offs
- profitability and margin analysis
- cost control and budgets
- debt and billing performance monitoring

### Procurement And Supply Chain

- supplier master
- supplier compliance records
- purchase requests
- purchase orders
- subcontractor engagement
- supplier costs and recovery
- external service delivery tracking
- supplier performance review

### Workforce And Resource Planning

- employee master
- team and role structure
- competencies and accreditations
- training and renewals
- availability and leave context
- allocations and utilisation
- workload forecasting
- approvals and internal controls

### Quality, Risk And Compliance

- conflicts and onboarding checks
- complaints management
- quality review workflows
- risk register and controls
- audit trail and evidence review
- policy linkage and attestations
- corrective actions and closeout
- compliance reporting and oversight

### Documents, Analytics And Integration

- document control
- evidence management
- templates and output standards
- dashboards and operational reporting
- management analytics
- integration endpoints and events
- workflow configuration
- master data and numbering administration

## End-To-End Business Processes

### Process 1: Lead To Instruction

1. Capture enquiry.
2. Identify whether the customer is an organisation or an individual consumer.
3. Qualify opportunity and service need.
4. Prepare fee proposal or quotation.
5. Run onboarding and compliance checks.
6. Accept commercial terms.
7. Convert to instruction with linked parties and properties.

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

- subcontractor cost capture must remain linked to instruction and project profitability
- document and evidence controls must work consistently across all delivery objects
- competency and accreditation checks must influence scheduling and assignment decisions
- client, property and instruction context must remain navigable across every workspace
- B2B and B2C customer handling must share the same party and client-account model rather than diverging into separate data structures
- workflow and event history must remain shared layers rather than module-specific duplicates

## Related Requirement Documents

- [modules/sales-client-management.md](./modules/sales-client-management.md)
- [modules/service-delivery-projects.md](./modules/service-delivery-projects.md)
- [modules/property-asset-management.md](./modules/property-asset-management.md)
- [modules/finance-commercial-control.md](./modules/finance-commercial-control.md)
- [modules/procurement-supply-chain.md](./modules/procurement-supply-chain.md)
- [modules/workforce-resource-planning.md](./modules/workforce-resource-planning.md)
- [modules/quality-risk-compliance.md](./modules/quality-risk-compliance.md)
- [modules/documents-analytics-integration.md](./modules/documents-analytics-integration.md)

## Governance Rule

Every roadmap item, epic, schema change, route, report and integration must identify:

1. the canonical business objects involved
2. the enterprise module context
3. the cross-module dependencies
4. the primary business event or workflow state change recorded
