# Route to workspace alignment

## Purpose

This document aligns the current SvelteKit route families with the PBM workspace model.

The purpose is to avoid renaming routes blindly. PBM routes should be treated as doorways into the shared data spine, not as proof that a workspace owns the underlying data.

## Route language rule

Routes may remain technically stable while the visible product language improves.

A route can be kept temporarily when it is already used by the app, bookmarked by users, or useful as a stable implementation path. A route should only be renamed when the new route name makes the product clearer and the old route can be safely redirected or removed.

## Confirmed route inventory

The route families below were confirmed from the current `src/routes/app` structure.

| Current route family | Example routes | PBM workspace / concept | Decision | Notes |
| --- | --- | --- | --- | --- |
| `/app` | `/app`, `/app/dashboard` | Enterprise workspace overview | Keep | This is the correct whole-business landing area. |
| `/app/business` | `/app/business/dashboard`, `/app/business/profile`, `/app/business/functions`, `/app/business/organisation-units`, `/app/business/positions` | Business Setup | Keep | This is the owning-business setup area. Visible labels should avoid making this sound like a separate organisation app. |
| `/app/activities` | `/app/activities`, `/app/activities/new`, `/app/activities/[activityId]` | Shared activity spine | Keep | Activities are cross-workspace records. They should not be owned by any single workspace. |
| `/app/parties` | `/app/parties`, `/app/parties/new`, `/app/parties/[partyId]` | Party spine | Keep | Party records are shared business objects used by clients, suppliers, people and contacts. |
| `/app/properties` | `/app/properties`, `/app/properties/new`, `/app/properties/[propertyId]` | Property record spine | Keep for now | This is the direct property object route. It overlaps with `/app/property`. Do not remove until the property object model is stable. |
| `/app/property` | `/app/property/dashboard`, `/app/property/property-register`, `/app/property/sites`, `/app/property/buildings`, `/app/property/units`, `/app/property/building-elements` | Property & Assets | Keep for now | This is the workspace route family for Property & Assets. Later decide whether `/app/properties` remains as an object route or redirects here. |
| `/app/crm` | `/app/crm/dashboard`, `/app/crm/clients` | Clients & Commercial | Keep for now | The route may remain as CRM during transition, but visible product language should use Clients & Commercial. |
| `/app/sales` | `/app/sales/dashboard`, `/app/sales/enquiries`, `/app/sales/opportunities`, `/app/sales/pipeline`, `/app/sales/fee-proposals`, `/app/sales/quotations`, `/app/sales/tenders` | Clients & Commercial | Keep for now | Sales routes represent commercial pipeline activities. Later consider a single `/app/commercial` route family. |
| `/app/projects` | `/app/projects/dashboard`, `/app/projects/projects` | Project Delivery | Keep | This is the main project delivery workspace. The repeated `/projects/projects` path should be reviewed later but not changed until equivalent navigation exists. |
| `/app/instructions` | `/app/instructions`, `/app/instructions/[instructionId]` | Instruction record spine | Review later | This overlaps with `/app/operations/instructions`. Decide whether instructions are an object route, an operations activity, or a project doorway. |
| `/app/operations` | `/app/operations/dashboard`, `/app/operations/instructions`, `/app/operations/building-surveys`, `/app/operations/dilapidations`, `/app/operations/insurance-reinstatements`, `/app/operations/reinstatement-cost-assessments`, `/app/operations/schedules-of-condition` | Operations & Planning / Project Delivery | Review later | These routes represent delivery service activities. They may remain operational route doorways while project/service records are consolidated. |
| `/app/surveys` | `/app/surveys` | Survey record spine | Review later | This overlaps with operation-specific survey routes. Decide whether it remains as a shared survey object route. |
| `/app/resource-planning` | `/app/resource-planning/dashboard`, `/app/resource-planning/allocations`, `/app/resource-planning/availability`, `/app/resource-planning/inspection-calendar`, `/app/resource-planning/utilisation`, `/app/resource-planning/workload` | People & Workforce / Project Delivery | Keep for now | Resource planning crosses workforce, projects and operations. Visible language should make this a planning activity, not a standalone data owner. |
| `/app/hr` | `/app/hr/dashboard`, `/app/hr/employees`, `/app/hr/roles`, `/app/hr/competencies`, `/app/hr/training` | People & Workforce | Keep for now | Use visible language of People & Workforce even if the route remains `/app/hr`. |
| `/app/procurement` | `/app/procurement/dashboard`, `/app/procurement/suppliers`, `/app/procurement/purchase-orders` | Procurement & Supplier Control | Keep | Use for suppliers, purchase orders, receipts, supplier invoices and committed spend. |
| `/app/finance` | `/app/finance`, `/app/finance/dashboard`, `/app/finance/fees`, `/app/finance/expenses`, `/app/finance/wip`, `/app/finance/sales-invoices`, `/app/finance/purchase-invoices`, `/app/finance/payments`, `/app/finance/profitability` | Finance & Control | Keep | Finance routes are a coherent workspace family. |
| `/app/compliance` | `/app/compliance`, `/app/compliance/dashboard`, `/app/compliance/complaints`, `/app/compliance/conflicts-of-interest`, `/app/compliance/pi-risk`, `/app/compliance/quality-reviews`, `/app/compliance/audit-trail` | Quality, Risk & Compliance | Keep | Use visible language of Quality, Risk & Compliance. |
| `/app/documents` | `/app/documents`, `/app/documents/dashboard`, `/app/documents/document-library`, `/app/documents/evidence-library`, `/app/documents/photos`, `/app/documents/drawings`, `/app/documents/templates` | Documents, Evidence & Information | Keep | This is the document and evidence workspace route family. It overlaps with `/app/evidence` and admin templates. |
| `/app/evidence` | `/app/evidence` | Evidence record spine | Review later | Decide whether this remains a shared evidence object route or redirects into the document/evidence workspace. |
| `/app/reporting` | `/app/reporting/dashboard`, `/app/reporting/kpis`, `/app/reporting/exports`, `/app/reporting/compliance-reports`, `/app/reporting/financial-reports`, `/app/reporting/operations-reports`, `/app/reporting/project-reports`, `/app/reporting/sales-reports`, `/app/reporting/utilisation-reports` | Reporting & Controls | Keep | This is a coherent reporting route family. |
| `/app/reports` | `/app/reports` | Report record spine | Review later | This overlaps with `/app/reporting`. Decide whether it is an object route or a redirect. |
| `/app/admin` | `/app/admin/dashboard`, `/app/admin/users`, `/app/admin/roles`, `/app/admin/permissions`, `/app/admin/teams`, `/app/admin/workflows`, `/app/admin/reference-data`, `/app/admin/service-lines`, `/app/admin/document-templates`, `/app/admin/report-templates`, `/app/admin/numbering-sequences`, `/app/admin/integrations`, `/app/admin/system-settings` | Administration & Platform Control | Keep | Admin routes are platform/control routes rather than business workspace ownership routes. |
| `/app/workflows` | `/app/workflows` | Workflow record spine | Review later | This overlaps with `/app/admin/workflows`. Decide whether user-facing workflows live outside admin or whether this redirects to admin. |

## Route families with overlap

These route pairs need design decisions before any rename or removal:

| Overlap | Current issue | Safe next step |
| --- | --- | --- |
| `/app/properties` and `/app/property/*` | Direct property object route and Property & Assets workspace route both exist. | Keep both until the property object model and navigation are stable. |
| `/app/instructions` and `/app/operations/instructions` | Instruction records appear both as a top-level object route and an operations activity route. | Decide whether instruction is a shared object, project doorway or operations activity. |
| `/app/reports` and `/app/reporting/*` | Direct report route and reporting workspace both exist. | Prefer `/app/reporting` for the workspace; keep `/app/reports` only if it is a shared report object route. |
| `/app/evidence` and `/app/documents/evidence-library` | Evidence appears both as a top-level object route and as part of document management. | Decide whether evidence is an object route, document activity or both. |
| `/app/workflows` and `/app/admin/workflows` | Workflow records appear both outside and inside admin. | Keep admin workflow configuration separate from user workflow/task execution if both are needed. |
| `/app/crm/*` and `/app/sales/*` | Both route families support Clients & Commercial. | Keep visible language unified; consider `/app/commercial` only after coverage is equivalent. |

## Rename policy

Do not rename a route just because the product label changed.

Use this order:

1. Fix visible labels first.
2. Add aliases only where the old route name causes confusion.
3. Preserve existing working route families until the replacement has equivalent coverage.
4. Remove old route families only after redirects, checks and navigation have been updated.

## Target workspace route families

The long-term PBM route families are:

| Workspace | Preferred route family |
| --- | --- |
| Business Setup | `/app/business` |
| Clients & Commercial | `/app/commercial` or retained `/app/crm` plus `/app/sales` during transition |
| Project Delivery | `/app/projects` |
| People & Workforce | `/app/hr`, `/app/workforce` or retained `/app/resource-planning` for planning activities |
| Procurement & Supplier Control | `/app/procurement` |
| Finance & Control | `/app/finance` |
| Property & Assets | `/app/property` or `/app/property-assets`; retain `/app/properties` while object routes are needed |
| Quality, Risk & Compliance | `/app/compliance` |
| Documents, Reporting & Administration | `/app/documents`, `/app/reporting` and `/app/admin` during transition |

## Implementation rule

When building or renaming routes, each route must be traceable back to:

```text
Business purpose
    -> enterprise capability
        -> business workspace
            -> business activity
                -> business object
                    -> route doorway
                        -> implementation package
                            -> table / view
                                -> report / control
```

If a route cannot be traced this way, it is either a temporary technical route or it needs redesign.
