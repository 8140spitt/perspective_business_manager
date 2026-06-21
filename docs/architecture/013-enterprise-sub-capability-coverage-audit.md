# ADR 013: Enterprise Sub-Capability Coverage Audit

Status: Draft  
Date: 2026-06-21  
Scope: PBM enterprise capability completeness.

## 1. Purpose

This document is the PBM completeness audit.

Its purpose is to make sure PBM covers the full breadth expected of an enterprise operating platform, without allowing legacy ERP module terminology to become the PBM product language.

PBM must be described in terms of:

```text
Reference enterprise area
    -> Reference capability
        -> PBM capability
            -> PBM workspace
                -> PBM route
                    -> PBM data objects / tables
                        -> coverage status
```

The source reference list used during design discussion came from an external article listing established ERP modules and submodules. That list is used only as a coverage checklist. It is not the PBM navigation model, product identity or user-facing wording.

## 2. Coverage status definitions

| Status | Meaning |
| --- | --- |
| Covered | PBM already has a clear capability and route/data direction for this item. |
| Partially covered | PBM covers the concept, but needs more explicit routes, data objects, workflow, or reporting. |
| Planned | PBM should cover this item, but it is not yet represented strongly enough in the capability map or data model. |
| Needs decision | The item may be needed, but PBM must decide how deep to go for the target market. |
| Reworded for PBM | The reference wording is legacy-vendor-specific, but the underlying business need is represented in PBM language. |

## 3. PBM workspace rule

PBM does not expose legacy module codes as primary user navigation.

PBM exposes workspaces such as:

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

The user-facing route is always activity-first.

Example:

```text
Reference capability: invoice verification
    -> PBM capability: Supplier invoice verification
        -> Workspace: Procurement, Materials & Logistics
        -> Route: /app/procurement/supplier-invoices
        -> Shared data: supplier_invoice, supplier_invoice_row, purchase_order, purchase_order_row
```

Finance may use the same supplier invoice record through `/app/finance/supplier-invoices`, but for payment, period, approval and control.

## 4. Finance and control coverage

PBM workspace: Finance & Control  
Secondary workspaces: Project Delivery, Procurement, Reporting, Business Setup

| Reference capability | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| General ledger accounting | General ledger | /app/finance/general-ledger | ledger_account, ledger_entry, accounting_period | Planned | Required for real finance completeness. |
| Accounts payable | Supplier account control | /app/finance/accounts-payable | supplier_invoice, supplier_invoice_row, business_partner | Partially covered | Supplier invoice concepts exist; AP ledger and payment control still required. |
| Accounts receivable | Customer account control | /app/finance/accounts-receivable | sales_invoice, sales_invoice_row, business_partner | Partially covered | Sales invoice concepts exist; AR ledger, receipts and ageing still required. |
| Bank accounting | Bank and cash records | /app/finance/banking | bank_account, bank_transaction, payment | Planned | Needed for cash visibility and reconciliation. |
| Budgeting and monitoring | Budgets and budget monitoring | /app/finance/budgets | budget, budget_line, project_budget, cost_centre_budget | Planned | Should support project, department and business budgets. |
| Cash management | Cash position and cash forecast | /app/finance/cash | bank_account, cash_forecast, receipt, payment | Planned | Should consume AR/AP/project timing. |
| Asset accounting | Asset accounting | /app/assets/accounting | asset, asset_value, depreciation_schedule | Planned | Needs link to Assets, Property & Maintenance. |
| Funds management | Funds and funding control | /app/finance/funds | fund, funding_source, fund_commitment | Needs decision | More relevant for public sector/grant-funded work. |
| Treasury management | Treasury and risk | /app/finance/treasury | treasury_account, exposure, instrument | Needs decision | Later-stage capability. |
| Special reporting ledger | Special reporting ledger | /app/finance/special-ledgers | reporting_ledger, ledger_mapping | Needs decision | Could be handled through reporting views unless full ledger separation is needed. |
| Withholding tax | Withholding tax | /app/finance/tax | tax_code, withholding_tax_rule, invoice_tax_line | Planned | Needed for international or contractor-heavy businesses. |
| Cost classification | Cost elements | /app/finance/cost-elements | cost_element, cost_category | Planned | Required to classify costs consistently. |
| Cost centre control | Cost centres | /app/finance/cost-centres | cost_centre, cost_centre_budget, ledger_entry | Planned | Can align to organisation_unit/business_function. |
| Product or service costing | Service/product costing | /app/finance/product-costing | project_service_cost, cost_model, rate_card | Partially covered | For PBM, this maps naturally to service costing and project costing. |
| Internal work orders | Internal orders | /app/operations/internal-orders | internal_order, work_order, cost_collection | Planned | Could sit in Operations & Planning with finance visibility. |
| Profit centre control | Profit centres | /app/finance/profit-centres | profit_centre, profit_centre_assignment | Planned | Could map to business_function, region, service line or office. |
| Profitability analysis | Margin and profitability | /app/finance/profitability | project, project_service, sales_invoice, supplier_invoice, ledger_entry | Partially covered | Core PBM value. Needs strong reporting model. |

## 5. People and workforce coverage

PBM workspace: People & Workforce  
Secondary workspaces: Business Setup, Project Delivery, Operations & Planning, Quality & Compliance

| Reference capability | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Organisation model | Organisation model | /app/business/organisation-units | organisation_unit, position, business_function | Covered | In PBM, this belongs mainly to Business Setup, not HR alone. |
| Personnel administration | Employee administration | /app/hr/employees | person_entity, employee, employee_position | Partially covered | Employee structure exists; full lifecycle fields need expansion. |
| Recruitment | Recruitment | /app/hr/recruitment | candidate, vacancy, application, interview | Planned | Not yet modelled. |
| Payroll | Payroll / payroll interface | /app/hr/payroll | payroll_period, payroll_run, payroll_item | Planned | May begin as payroll export/interface rather than full payroll engine. |
| Travel and expenses | Travel and expenses | /app/hr/travel-expenses | travel_request, expense_claim, expense_line | Planned | Could also sit in Finance depending on workflow. |
| People management | People management | /app/hr/people | person_entity, employee, manager_relationship | Partially covered | Needs clear manager/self-service lifecycle model. |
| Time and attendance | Time and attendance | /app/hr/time | timesheet, time_entry, absence | Planned | Important for project effort and utilisation. |
| Compensation | Compensation | /app/hr/compensation | compensation_plan, salary_band, employee_compensation | Planned | HR-controlled, finance-consumed. |
| Training and events | Training and events | /app/hr/training | training_event, training_record, competence | Partially covered | Competence exists conceptually; training event workflow needed. |
| Wages | Wages | /app/hr/payroll | wage_rate, payroll_item, employee_compensation | Planned | Part of payroll/compensation. |
| Personnel development | Development and progression | /app/hr/development | development_plan, objective, review | Planned | Needed for mature HR capability. |
| Workforce administration | Workforce administration | /app/hr/workforce | employee, employee_position, absence, timesheet | Partially covered | Needs admin dashboard and lifecycle workflows. |

## 6. Procurement, materials and logistics coverage

PBM workspace: Procurement, Materials & Logistics  
Secondary workspaces: Finance & Control, Project Delivery, Operations & Planning

| Reference capability | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Purchasing | Purchasing | /app/procurement/purchase-orders | purchase_order, purchase_order_row, supplier | Partially covered | PO concept exists; approvals and lifecycle need expansion. |
| Inventory management | Inventory management | /app/inventory/stock | item, stock_location, stock_balance, stock_movement | Planned | Not yet represented strongly enough. |
| Material planning | Material planning | /app/procurement/material-planning | item, demand, planned_order, project_service | Planned | Needed for stock/material-heavy businesses. |
| Invoice verification | Supplier invoice verification | /app/procurement/supplier-invoices | supplier_invoice, supplier_invoice_row, purchase_order | Partially covered | Needs three-way match concept: PO, receipt, invoice. |
| Material requirements planning | Material requirements planning | /app/operations/mrp | demand, item, planned_order, stock_balance | Planned | Also relates to Operations & Planning. |
| Warehouse management | Warehouse management | /app/inventory/warehouse | warehouse, bin, stock_balance, stock_transfer | Planned | May be light initially. |
| Supplier evaluation | Supplier evaluation | /app/procurement/supplier-performance | supplier_scorecard, delivery_performance, quality_record | Planned | Should link to quality, delivery, cost and compliance. |

## 7. Clients and commercial coverage

PBM workspace: Clients & Commercial  
Secondary workspaces: Finance & Control, Project Delivery, Reporting

| Reference capability | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Sales pipeline | Sales pipeline and instructions | /app/commercial/opportunities | lead, opportunity, project_quote, project | Partially covered | Quote/project concept exists; pipeline objects still needed. |
| Delivery / dispatch / transport | Delivery and dispatch | /app/logistics/dispatch | delivery, dispatch, transport_job | Planned | May be optional for consultancy but required for full enterprise coverage. |
| Billing / invoice generation | Billing and sales invoicing | /app/finance/sales-invoices | sales_invoice, sales_invoice_row, project_quote_row | Partially covered | Needs billing trigger and invoice lifecycle. |
| Component structure | Service component structure | /app/operations/bom | bill_of_material, bom_line, item | Planned | For consultancy, may become service/component templates. |
| Sales reporting | Sales reporting | /app/reporting/sales | opportunity, quote, sales_invoice, project | Planned | Should be part of Reporting & Intelligence. |
| Credit control | Credit control | /app/finance/credit-control | credit_limit, customer_account, sales_invoice | Partially covered | Also appears in Finance & Control. |
| External document exchange | External document exchange | /app/admin/integrations | integration_endpoint, edi_message, import_job | Planned | Technical/platform capability. |

## 8. Project delivery coverage

PBM workspace: Project Delivery  
Secondary workspaces: Clients & Commercial, Procurement, Finance & Control, Reporting

| Reference capability | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Project planning | Project planning | /app/projects/planning | project, project_phase, milestone, project_service | Partially covered | Needs explicit planning routes. |
| Project preparation | Project setup and mobilisation | /app/projects/setup | project, project_party, project_contact, project_location | Partially covered | Good fit for early project lifecycle. |
| Project tracking | Project tracking | /app/projects/tracking | project_activity, milestone, issue, risk | Planned | Needs activity and progress model. |
| Project reporting | Project reporting | /app/reporting/projects | project, project_service, invoice, cost | Partially covered | Reporting concept exists; views need formalisation. |
| Project costs | Project cost control | /app/projects/costs | project_service_cost, supplier_invoice_row, timesheet, ledger_entry | Partially covered | Core PBM value. Needs actual/committed/forecast cost. |
| Work breakdown | Project work breakdown | /app/projects/work-breakdown | project_phase, wbs_element, project_service | Planned | Needs explicit hierarchy. |

## 9. Operations and planning coverage

PBM workspace: Operations & Planning  
Secondary workspaces: Procurement, Project Delivery, Reporting

| Reference capability | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Sales and operations planning | Demand and operations planning | /app/operations/planning | demand_plan, capacity_plan, project_service | Planned | Under-covered at present. |
| Demand management | Demand management | /app/operations/demand | demand, forecast, pipeline_demand | Planned | Should consume commercial pipeline and project workload. |
| Material requirements | Material requirements planning | /app/operations/mrp | item, demand, stock_balance, planned_order | Planned | Also procurement/materials coverage. |
| Capacity planning | Capacity planning | /app/operations/capacity | employee_position, capacity_calendar, assignment | Planned | Very important for consultancy/resource planning. |
| Component templates | Service/component templates | /app/operations/bom | bill_of_material, bom_line, service_template | Planned | Supports reusable service scope templates. |
| Work orders | Work orders / production orders | /app/operations/work-orders | work_order, work_order_line, project_service | Planned | PBM should call these work orders or service orders. |
| Routing | Delivery steps / routing | /app/operations/routing | routing, routing_step, workflow_template | Planned | Useful for repeatable service delivery. |
| Work centres | Work centres / delivery teams | /app/operations/work-centres | work_centre, team, organisation_unit | Planned | Could map to teams, offices, disciplines, equipment. |
| Execution control | Operational execution control | /app/operations/execution | work_order, progress_event, completion_record | Planned | May be light unless manufacturing/service execution is needed. |

## 10. Assets, property and maintenance coverage

PBM workspace: Assets, Property & Maintenance  
Secondary workspaces: Project Delivery, Procurement, Finance & Control, Quality & Compliance

| Reference capability | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Maintenance planning | Maintenance planning | /app/assets/maintenance-plans | asset, maintenance_plan, maintenance_schedule | Planned | Not yet modelled. |
| Preventive maintenance | Preventive maintenance | /app/assets/preventive-maintenance | maintenance_plan, inspection_schedule | Planned | Needed for asset/property clients. |
| Service management | Service management | /app/operations/service-orders | service_order, work_order, project_service | Planned | Could overlap with Operations & Planning. |
| Predictive maintenance | Predictive maintenance | /app/assets/predictive-maintenance | asset_condition, sensor_reading, prediction | Needs decision | Later capability, likely not MVP. |
| Project-linked maintenance | Project-linked maintenance | /app/projects/maintenance | project, maintenance_order, asset | Planned | Relevant if PBM handles facilities/property maintenance projects. |

## 11. Quality and compliance coverage

PBM workspace: Quality & Compliance  
Secondary workspaces: Project Delivery, Procurement, Assets, Reporting

| Reference capability | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Quality planning | Quality planning | /app/quality/plans | quality_plan, inspection_plan, review_gate | Planned | Needs explicit data model. |
| Process inspections | Process inspections | /app/quality/inspections | inspection, inspection_result, project_service | Planned | Needed for quality evidence. |
| Quality notifications | Quality notifications | /app/quality/notifications | quality_notification, non_conformance, corrective_action | Planned | Maps to NCR and corrective action. |
| Quality control | Quality control | /app/quality/control | quality_check, acceptance_record | Planned | Should connect to project/service deliverables. |
| Test equipment | Test equipment | /app/quality/test-equipment | test_equipment, calibration_record | Needs decision | Needed only if target industries require it. |
| Quality certifications | Quality certifications | /app/quality/certifications | certification, certification_record | Planned | Links to people, suppliers, projects and assets. |
| General quality functions | General quality functions | /app/quality/dashboard | quality_plan, inspection, non_conformance | Planned | Should be a dedicated quality workspace or quality area under compliance. |

## 12. Financial supply-chain coverage

PBM workspace: Finance & Control  
Secondary workspaces: Clients & Commercial, Procurement, Reporting

| Reference capability | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Credit management | Credit management | /app/finance/credit-control | customer_account, credit_limit, risk_score | Planned | Needed for mature AR control. |
| Cash and liquidity management | Cash and liquidity | /app/finance/cash-liquidity | bank_account, cash_forecast, payment_plan | Planned | Should consume AP/AR/project timings. |
| Treasury and risk management | Treasury and financial risk | /app/finance/treasury | treasury_account, exposure, financial_risk | Needs decision | Likely later-stage. |
| Collections management | Collections | /app/finance/collections | collection_case, customer_account, sales_invoice | Planned | Needed for AR control. |
| Payments | Payments | /app/finance/payments | payment, payment_allocation, bank_transaction | Planned | Required for invoice lifecycle. |
| Dispute management | Dispute management | /app/finance/disputes | dispute, sales_invoice, supplier_invoice | Planned | Should cover client and supplier disputes. |

## 13. Platform and administration coverage

PBM workspace: Reporting, Documents & Admin

| Reference capability | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Technical administration | Platform administration | /app/admin/system | system_setting, job_log, integration_status | Planned | Needed for operational support. |
| Security administration | Users, roles and permissions | /app/admin/security | user, role, permission, audit_log | Partially covered | Existing auth package direction should align here. |
| Application development extension | Extension model | /app/admin/extensions | extension, hook, package_registration | Needs decision | Later capability. |
| Database/platform services | Platform data services | /app/admin/data | migration_log, schema_version, data_quality_check | Planned | Supports data governance. |
| Integration middleware | Integrations | /app/admin/integrations | integration_endpoint, message, import_job, export_job | Planned | Required for external systems. |
| Solution monitoring | Platform monitoring | /app/admin/monitoring | job_log, error_log, performance_metric | Planned | Needed for production support. |

## 14. Required backlog themes

The audit shows that PBM needs explicit backlog themes for:

- Finance ledger and period control
- Payment, receipt and cash management
- Accounts receivable and accounts payable lifecycle
- Cost centres, profit centres and profitability analysis
- Recruitment, payroll interface, time, absence and compensation
- Purchasing lifecycle and supplier invoice verification
- Inventory, stock and material planning
- Commercial pipeline and billing triggers
- Work breakdown, activity tracking and project cost control
- Capacity planning, work orders and delivery routing
- Maintenance planning and asset lifecycle
- Quality plans, inspections, NCR and corrective action
- Risk, controls, audit evidence and compliance obligations
- Documents, integrations, users, roles and platform administration

## 15. Status

Draft.

This document is the PBM completeness audit. It should be maintained as the capability model, route model, data model and backlog mature.
