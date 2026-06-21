# ADR 013: SAP Submodule Coverage Audit

Status: Draft  
Date: 2026-06-21  
Scope: PBM ERP capability coverage against the SAP ERP module and submodule checklist supplied from SolutionDots.

## 1. Purpose

The purpose of this document is to prove that PBM ERP is not merely a simplified workspace shell.

PBM must provide SAP-grade business capability coverage while presenting those capabilities through modern, activity-first workspaces.

The reference checklist used here is the SolutionDots article "SAP ERP Modules: Complete List of SAP ERP Modules" supplied during design discussion. It lists functional SAP ERP modules and submodules for HR, PP, MM, FSCM, SD, PS, FICO, PM and QM, plus technical modules such as Basis, Security, ABAP, HANA, NetWeaver, IS, CRM Technical, XI and Solution Manager.

This document does not treat SolutionDots as the formal SAP product authority. It is used as a practical coverage checklist.

## 2. Coverage status definitions

| Status | Meaning |
| --- | --- |
| Covered | PBM already has a clear capability and route/data direction for this item. |
| Partially covered | PBM covers the concept, but needs more explicit routes, data objects, workflow, or reporting. |
| Planned | PBM should cover this item, but it is not yet represented strongly enough in the capability map or data model. |
| Needs decision | The item may be needed, but PBM must decide how deep to go for the target market. |
| Not applicable as SAP wording | The SAP wording is too SAP-specific, but the underlying need must still be represented in PBM language. |

## 3. PBM workspace rule

PBM does not expose SAP module names such as FI, CO, MM, SD, PS, PP, PM and QM as primary user navigation.

PBM maps them like this:

```text
SAP module
    -> SAP submodule
        -> PBM capability
            -> PBM workspace
                -> PBM route
                    -> PBM data objects/tables
                        -> coverage status
```

The user-facing route is always activity-first.

Example:

```text
SAP MM: Invoice Verification
    -> PBM capability: Supplier invoice verification
        -> Workspace: Procurement, Materials & Logistics
        -> Route: /app/procurement/supplier-invoices
        -> Shared data: supplier_invoice, supplier_invoice_row, purchase_order, purchase_order_row
```

Finance may use the same supplier invoice record through `/app/finance/supplier-invoices`, but for payment, period, approval and control.

## 4. Functional SAP module coverage

## 4.1 SAP FICO: Financial Accounting and Controlling

PBM workspace: Finance & Control  
Secondary workspaces: Project Delivery, Procurement, Reporting & Intelligence, Business Setup

| SAP submodule | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| General Ledger Accounting | General ledger | /app/finance/general-ledger | ledger_account, ledger_entry, accounting_period | Planned | Not yet modelled explicitly. Required for real finance completeness. |
| Accounts Payable | Supplier account control | /app/finance/accounts-payable | supplier_invoice, supplier_invoice_row, business_partner | Partially covered | Supplier invoices exist conceptually; AP ledger and payment control still required. |
| Accounts Receivable | Customer account control | /app/finance/accounts-receivable | sales_invoice, sales_invoice_row, business_partner | Partially covered | Sales invoices exist conceptually; AR ledger, receipts and ageing still required. |
| Bank Accounting | Bank and cash records | /app/finance/banking | bank_account, bank_transaction, payment | Planned | Needed for cash visibility and reconciliation. |
| Budgeting and Monitoring | Budgets and budget monitoring | /app/finance/budgets | budget, budget_line, project_budget, cost_centre_budget | Planned | Should support project, department and business budgets. |
| Cash Management | Cash position and cash forecast | /app/finance/cash | bank_account, cash_forecast, receipt, payment | Planned | Should consume AR/AP/project timing. |
| Asset Accounting | Asset accounting | /app/assets/accounting | asset, asset_value, depreciation_schedule | Planned | Needs link to Assets, Property & Maintenance. |
| Funds Management | Funds and funding control | /app/finance/funds | fund, funding_source, fund_commitment | Needs decision | More relevant for public sector/grant-funded work. May be optional. |
| Treasury Management | Treasury and risk | /app/finance/treasury | treasury_account, exposure, instrument | Needs decision | Likely later-stage capability. |
| Special Purpose Ledger | Special reporting ledger | /app/finance/special-ledgers | reporting_ledger, ledger_mapping | Needs decision | Could be handled through reporting views unless full ledger separation is needed. |
| Withholding Tax / TDS | Withholding tax | /app/finance/tax | tax_code, withholding_tax_rule, invoice_tax_line | Planned | Needed for international or contractor-heavy businesses. |
| Cost Element Accounting | Cost classification | /app/finance/cost-elements | cost_element, cost_category | Planned | Required to classify costs consistently. |
| Cost Centre Accounting | Cost centre control | /app/finance/cost-centres | cost_centre, cost_centre_budget, ledger_entry | Planned | Can align to organisation_unit/business_function. |
| Product Cost Accounting | Service/product costing | /app/finance/product-costing | project_service_cost, cost_model, rate_card | Partially covered | For PBM, this maps more naturally to service costing and project costing. |
| Internal Orders | Internal work orders | /app/operations/internal-orders | internal_order, work_order, cost_collection | Planned | Could sit in Operations & Planning with finance visibility. |
| Profit Centre Accounting | Profit centre control | /app/finance/profit-centres | profit_centre, profit_centre_assignment | Planned | Could map to business_function, region, service line or office. |
| Profitability Analysis | Margin and profitability | /app/finance/profitability | project, project_service, sales_invoice, supplier_invoice, ledger_entry | Partially covered | Core PBM value. Needs strong reporting model. |

## 4.2 SAP HR / HCM: Human Resource Management

PBM workspace: People & Workforce  
Secondary workspaces: Business Setup, Project Delivery, Operations & Planning, Quality & Compliance

| SAP submodule | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Organisational Management | Organisation model | /app/business/organisation-units | organisation_unit, position, business_function | Covered | In PBM, this belongs mainly to Business Setup, not HR alone. |
| Personnel Administration | Employee administration | /app/hr/employees | person_entity, employee, employee_position | Partially covered | Employee structure exists; full lifecycle fields need expansion. |
| Recruitment | Recruitment | /app/hr/recruitment | candidate, vacancy, application, interview | Planned | Not yet modelled. |
| Payroll | Payroll / payroll interface | /app/hr/payroll | payroll_period, payroll_run, payroll_item | Planned | May begin as payroll export/interface rather than full payroll engine. |
| Travel Management | Travel and expenses | /app/hr/travel-expenses | travel_request, expense_claim, expense_line | Planned | Could also sit in Finance depending on workflow. |
| Personnel Management | People management | /app/hr/people | person_entity, employee, manager_relationship | Partially covered | Needs clear manager/self-service lifecycle model. |
| Time Management | Time and attendance | /app/hr/time | timesheet, time_entry, absence | Planned | Important for project effort and utilisation. |
| Compensation Management | Compensation | /app/hr/compensation | compensation_plan, salary_band, employee_compensation | Planned | HR-controlled, finance-consumed. |
| Training and Event Management | Training and events | /app/hr/training | training_event, training_record, competence | Partially covered | Competence exists conceptually; training event workflow needed. |
| Wages | Wages | /app/hr/payroll | wage_rate, payroll_item, employee_compensation | Planned | Likely part of payroll/compensation. |
| Personnel Development | Development and progression | /app/hr/development | development_plan, objective, review | Planned | Needed for mature HR capability. |
| Workforce Administration | Workforce administration | /app/hr/workforce | employee, employee_position, absence, timesheet | Partially covered | Needs admin dashboard and lifecycle workflows. |

## 4.3 SAP MM: Material Management

PBM workspace: Procurement, Materials & Logistics  
Secondary workspaces: Finance & Control, Project Delivery, Operations & Planning

| SAP submodule | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Purchasing | Purchasing | /app/procurement/purchase-orders | purchase_order, purchase_order_row, supplier | Partially covered | PO concept exists; approvals and lifecycle need expansion. |
| Inventory Management | Inventory management | /app/inventory/stock | item, stock_location, stock_balance, stock_movement | Planned | Not yet represented strongly enough. |
| Material Planning | Material planning | /app/procurement/material-planning | item, demand, planned_order, project_service | Planned | Needed for stock/material-heavy businesses. |
| Invoice Verification | Supplier invoice verification | /app/procurement/supplier-invoices | supplier_invoice, supplier_invoice_row, purchase_order | Partially covered | Needs three-way match concept: PO, receipt, invoice. |
| Material Requirement Planning / MRP | MRP | /app/operations/mrp | demand, item, planned_order, stock_balance | Planned | Also relates to PP. |
| Warehouse Management | Warehouse management | /app/inventory/warehouse | warehouse, bin, stock_balance, stock_transfer | Planned | May be light initially. |
| Vendor Valuation | Supplier evaluation | /app/procurement/supplier-performance | supplier_scorecard, delivery_performance, quality_record | Planned | Should link to quality, delivery, cost and compliance. |

## 4.4 SAP SD: Sales and Distribution

PBM workspace: Clients & Commercial  
Secondary workspaces: Finance & Control, Project Delivery, Reporting & Intelligence

| SAP submodule | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Sales | Sales pipeline and instructions | /app/commercial/opportunities | lead, opportunity, project_quote, project | Partially covered | Quote/project concept exists; pipeline objects still needed. |
| Shipping and Transportation | Delivery / dispatch / transport | /app/logistics/dispatch | delivery, dispatch, transport_job | Planned | May be optional for consultancy but required for full SAP coverage. |
| Billing / Invoice Generation | Billing and sales invoicing | /app/finance/sales-invoices | sales_invoice, sales_invoice_row, project_quote_row | Partially covered | Needs billing trigger and invoice lifecycle. |
| Bills of Material / BOM | BOM / service component structure | /app/operations/bom | bill_of_material, bom_line, item | Planned | For PBM consultancy, may also become service/component templates. |
| Sales Information System | Sales reporting | /app/reporting/sales | opportunity, quote, sales_invoice, project | Planned | Should be part of Reporting & Intelligence. |
| Credit Control | Credit control | /app/finance/credit-control | credit_limit, customer_account, sales_invoice | Partially covered | Also appears in FSCM. |
| EDI | External document exchange | /app/admin/integrations | integration_endpoint, edi_message, import_job | Planned | Technical/platform capability. |

## 4.5 SAP PS: Project System

PBM workspace: Project Delivery  
Secondary workspaces: Clients & Commercial, Procurement, Finance & Control, Reporting & Intelligence

| SAP submodule | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Project Planning | Project planning | /app/projects/planning | project, project_phase, milestone, project_service | Partially covered | Needs explicit planning routes. |
| Project Preparation | Project setup and mobilisation | /app/projects/setup | project, project_party, project_contact, project_location | Partially covered | Good fit for early project lifecycle. |
| Project Tracking | Project tracking | /app/projects/tracking | project_activity, milestone, issue, risk | Planned | Needs activity and progress model. |
| Project Reporting | Project reporting | /app/reporting/projects | project, project_service, invoice, cost | Partially covered | Reporting concept exists; views need formalisation. |
| Project Costs | Project cost control | /app/projects/costs | project_service_cost, supplier_invoice_row, timesheet, ledger_entry | Partially covered | Core PBM value. Needs robust actual/committed/forecast cost. |
| WBS Elements | Project work breakdown | /app/projects/work-breakdown | project_phase, wbs_element, project_service | Planned | Needs explicit WBS hierarchy. |

## 4.6 SAP PP: Production Planning

PBM workspace: Operations & Planning  
Secondary workspaces: Procurement, Materials & Logistics, Project Delivery, Reporting & Intelligence

| SAP submodule | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Sales and Production Planning | Demand and operations planning | /app/operations/planning | demand_plan, capacity_plan, project_service | Planned | Under-covered at present. |
| Demand Management | Demand management | /app/operations/demand | demand, forecast, pipeline_demand | Planned | Should consume commercial pipeline and project workload. |
| Material Requirement Planning | MRP | /app/operations/mrp | item, demand, stock_balance, planned_order | Planned | Also MM coverage. |
| Capacity Requirement Planning | Capacity planning | /app/operations/capacity | employee_position, capacity_calendar, assignment | Planned | Very important for consultancy/resource planning. |
| Bills of Material | BOM / service/component templates | /app/operations/bom | bill_of_material, bom_line, service_template | Planned | For consultancy, may support reusable service scope templates. |
| Production Orders | Work orders / production orders | /app/operations/work-orders | work_order, work_order_line, project_service | Planned | PBM may call these work orders or service orders. |
| Routing | Routing / delivery steps | /app/operations/routing | routing, routing_step, workflow_template | Planned | Useful for repeatable service delivery. |
| Work Center | Work centres / delivery teams | /app/operations/work-centres | work_centre, team, organisation_unit | Planned | Could map to teams, offices, disciplines, equipment. |
| Shop Floor Control | Operational execution control | /app/operations/execution | work_order, progress_event, completion_record | Planned | May be light unless manufacturing/service execution needed. |

## 4.7 SAP PM: Plant Maintenance

PBM workspace: Assets, Property & Maintenance  
Secondary workspaces: Project Delivery, Procurement, Finance & Control, Quality & Compliance

| SAP submodule | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Maintenance Planning | Maintenance planning | /app/assets/maintenance-plans | asset, maintenance_plan, maintenance_schedule | Planned | Not yet modelled. |
| Preventive Planning | Preventive maintenance | /app/assets/preventive-maintenance | maintenance_plan, inspection_schedule | Planned | Needed for asset/property clients. |
| Service Management | Service management | /app/operations/service-orders | service_order, work_order, project_service | Planned | Could overlap with Operations & Planning. |
| Predictive Maintenance | Predictive maintenance | /app/assets/predictive-maintenance | asset_condition, sensor_reading, prediction | Needs decision | Later capability, likely not MVP. |
| Project Maintenance | Project-linked maintenance | /app/projects/maintenance | project, maintenance_order, asset | Planned | Relevant if PBM handles facilities/property maintenance projects. |

## 4.8 SAP QM: Quality Management

PBM workspace: Quality & Compliance  
Secondary workspaces: Project Delivery, Procurement, Operations & Planning

| SAP submodule | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Planning | Quality planning | /app/quality/plans | quality_plan, quality_gate, inspection_plan | Planned | Needs explicit quality workspace or subroutes. |
| Process Inspections | Process inspections | /app/quality/inspections | inspection, inspection_result, project_service | Planned | Should link to project/service/activity. |
| Notifications of Quality | Quality notifications | /app/quality/notifications | quality_notification, non_conformance | Planned | Under-covered at present. |
| Quality Control | Quality control | /app/quality/control | quality_check, approval_gate, review_record | Planned | Needs workflow. |
| Test Equipment | Test equipment | /app/quality/test-equipment | test_equipment, calibration_record | Needs decision | Depends on target industries. |
| Quality Certifications | Quality certifications | /app/quality/certifications | certification, supplier_certification, employee_certification | Planned | Links to supplier quality and competence. |
| General Functions | Quality administration | /app/quality/admin | quality_setting, quality_template | Planned | Needed later. |

## 4.9 SAP FSCM: Financial Supply Chain Management

PBM workspace: Finance & Control  
Secondary workspaces: Clients & Commercial, Procurement, Reporting & Intelligence

| SAP submodule | PBM capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Credit Management | Credit management | /app/finance/credit-control | credit_limit, credit_exposure, customer_account | Partially covered | Must integrate with sales invoices and client account risk. |
| Cash & Liquidity Management | Cash and liquidity | /app/finance/cash-liquidity | bank_account, cash_forecast, receipt, payment | Planned | Important for business command centre. |
| Treasury and Risk Management | Treasury risk | /app/finance/treasury-risk | exposure, treasury_position, risk | Needs decision | Later-stage finance maturity. |
| Collections Management | Collections | /app/finance/collections | collection_case, sales_invoice, customer_contact | Planned | AR extension. |
| Payments | Payments | /app/finance/payments | payment, payment_allocation, bank_transaction | Planned | Needed for both AR and AP. |
| Dispute Management | Dispute management | /app/finance/disputes | dispute_case, invoice, communication | Planned | Useful for AR and supplier invoice disputes. |

## 5. Technical SAP module coverage

PBM should not attempt to copy SAP technical module names as user-facing product areas, but it must cover the equivalent platform capabilities.

| SAP technical module | PBM platform capability | Primary PBM route | Main data objects / tables | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| SAP Basis | System administration | /app/admin/system | system_setting, job_log, environment_status | Planned | PBM needs a system admin layer. |
| SAP Security | Security and access control | /app/admin/security | user, role, permission, audit_log | Partially covered elsewhere | Should align with NuBlox Auth direction. |
| SAP ABAP | Extension and custom logic | /app/admin/extensions | extension, script, workflow_rule | Needs decision | PBM may use TypeScript/extensions rather than ABAP-style customisation. |
| SAP HANA | Database and analytics platform | /app/admin/data-platform | database_connection, model_metadata | Not applicable as SAP wording | PBM uses MySQL first; analytical capability still required. |
| SAP NetWeaver | Integration/application platform | /app/admin/platform | integration_endpoint, service_registry | Planned | Map to platform/integration layer. |
| SAP IS | Industry solutions | /app/admin/industry-configuration | industry_profile, capability_toggle | Planned | Important for PBM verticalisation. |
| SAP CRM Technical | CRM platform configuration | /app/admin/crm-settings | crm_setting, workflow_rule | Planned | Should be admin configuration, not end-user CRM. |
| SAP XI | Integration exchange | /app/admin/integrations | integration_endpoint, message_log, import_job | Planned | Needed for import/export/API later. |
| SAP Solution Manager | Lifecycle, monitoring and support | /app/admin/solution-management | deployment_log, support_case, health_check | Planned | Could be internal admin/support tooling. |

## 6. SAP Business Suite and component coverage

The source checklist also names Business Suite applications and additional components. PBM should map these at capability level.

| SAP item | PBM equivalent | Status | Notes |
| --- | --- | --- | --- |
| ERP | PBM ERP core | Covered conceptually | The overall system. |
| CRM | Clients & Commercial | Partially covered | Needs route/data expansion for leads/opportunities. |
| SCM | Procurement, Materials & Logistics plus Operations & Planning | Planned | Needs inventory, logistics, demand and supplier performance. |
| SRM | Supplier relationship and supplier performance | Planned | Part of procurement capability. |
| Product Life Cycle | Asset/service/document lifecycle | Needs decision | For PBM target market, may be service lifecycle rather than product lifecycle. |
| HANA | Data platform and analytics | Not applicable as SAP wording | PBM technology differs. Analytics still required. |
| GRC | Quality & Compliance | Partially covered | Risk register started; full controls/audit still needed. |
| SEM | Strategic management and KPI planning | Planned | Could sit in reporting/executive dashboards. |
| Compliance Management for SOA | Compliance obligations and service governance | Needs decision | Use PBM compliance model rather than SAP SOA wording. |
| BW | Reporting & Intelligence | Planned | Reporting views and KPI definitions required. |
| APO | Advanced planning and optimisation | Planned | Related to demand/capacity/resource planning. |
| SFA | Sales force automation | Planned | Part of Clients & Commercial. |
| ITS | Web transaction/application access | Not applicable as SAP wording | PBM is web-native. |

## 7. Immediate coverage gaps to add to PBM backlog

The current PBM capability map must be expanded to explicitly include these missing areas:

1. General ledger and accounting periods.
2. Bank, cash, receipts, payments and reconciliation.
3. Budgeting and cost centre/profit centre control.
4. Credit, collections and dispute management.
5. Recruitment, payroll interface, time, absence, travel and expenses.
6. Inventory, stock movements, warehouse locations and material planning.
7. Demand, capacity, work orders, routing and work centres.
8. Quality plans, inspections, notifications, certifications and non-conformance.
9. Asset maintenance plans, preventive/reactive maintenance and service management.
10. Platform administration, integrations, access control, audit logs and system health.

## 8. Implementation rule

Each item above should eventually have:

```text
1. Workspace owner
2. Route
3. Package/domain owner
4. Data object/table mapping
5. Workflow lifecycle
6. Reporting requirement
7. Security/authority requirement
8. MVP status
```

PBM cannot claim SAP-grade coverage until this audit is complete and every item has a status and implementation path.
