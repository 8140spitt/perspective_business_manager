# Route to workspace alignment

## Purpose

This document aligns the current SvelteKit route families with the PBM workspace model.

The purpose is to avoid renaming routes blindly. PBM routes should be treated as doorways into the shared data spine, not as proof that a workspace owns the underlying data.

## Route language rule

Routes may remain technically stable while the visible product language improves.

A route can be kept temporarily when it is already used by the app, bookmarked by users, or useful as a stable implementation path. A route should only be renamed when the new route name makes the product clearer and the old route can be safely redirected or removed.

## Alignment decisions

| Current route family | Current meaning | PBM workspace / concept | Decision | Notes |
| --- | --- | --- | --- | --- |
| `/app/dashboard` | Main app landing page | Enterprise workspace overview | Keep | This is the correct landing doorway for the whole business operating model. |
| `/app/activities` | Activity records and activity evidence | Shared activity spine | Keep | Activities are cross-workspace records. They should not be owned by any single workspace. |
| `/app/parties` | People, organisations or external parties | Party spine | Keep | Party records are shared business objects used by clients, suppliers, people and contacts. |
| `/app/properties` | Property records | Property & Assets | Keep for now | Visible labels should use Property & Assets. A later alias to `/app/property-assets` may be considered. |
| `/app/crm/clients` | Client records and contacts | Clients & Commercial | Keep for now | The route can remain as CRM while visible language should say Clients & Commercial. Later consider `/app/clients` or `/app/commercial/clients`. |
| `/app/sales/enquiries` | Enquiries and early sales records | Clients & Commercial | Keep for now | Enquiries are commercial pipeline activities. Keep until commercial route family is designed. |
| `/app/sales/opportunities` | Opportunity records | Clients & Commercial | Keep for now | Should be shown as commercial pipeline in the UI. |
| `/app/operations/instructions` | Instructions and delivery start points | Project Delivery / Operations | Review later | This may become part of Project Delivery once instruction, project and activity records are fully connected. |
| `/app/business` | Business setup and profile | Business Setup | Target route family | Use for owning business, locations, functions, teams and operating structure. |
| `/app/projects` | Project delivery | Project Delivery | Target route family | Use for projects, services, assignments, evidence, costs and delivery reporting. |
| `/app/hr` | People and workforce | People & Workforce | Target route family | Use visible language of People & Workforce even if the route remains `/app/hr`. |
| `/app/procurement` | Purchasing and supplier control | Procurement & Supplier Control | Target route family | Use for suppliers, purchase orders, receipts, supplier invoices and committed spend. |
| `/app/finance` | Finance and control | Finance & Control | Target route family | Use for invoices, ledgers, cash, control and period reporting. |
| `/app/compliance` | Quality, risk and control | Quality, Risk & Compliance | Keep for now | Use visible language of Quality, Risk & Compliance. |
| `/app/reporting` | Reports and administration | Documents, Reporting & Administration | Review later | Reporting may remain a standalone route while document administration matures. |

## Rename policy

Do not rename a route just because the product label changed.

Use this order:

1. Fix visible labels first.
2. Add aliases only where the old route name causes confusion.
3. Preserve existing working route families until the replacement has equivalent coverage.
4. Remove old route families only after redirects, tests and navigation have been updated.

## Target workspace route families

The long-term PBM route families are:

| Workspace | Preferred route family |
| --- | --- |
| Business Setup | `/app/business` |
| Clients & Commercial | `/app/commercial` or retained `/app/crm` plus `/app/sales` during transition |
| Project Delivery | `/app/projects` |
| People & Workforce | `/app/hr` or `/app/workforce` |
| Procurement & Supplier Control | `/app/procurement` |
| Finance & Control | `/app/finance` |
| Property & Assets | `/app/property-assets` or retained `/app/properties` during transition |
| Quality, Risk & Compliance | `/app/compliance` |
| Documents, Reporting & Administration | `/app/reporting` plus document routes during transition |

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
