# Documents, Reporting & Administration Workspace Requirements

## Purpose

The Documents, Reporting & Administration workspace provides the information and platform control view of PBM.

It manages controlled documents, evidence, report definitions, workflow administration, reference data and platform settings without creating separate operational records.

## Primary Users

- administrators
- document controllers
- reporting users
- business analysts
- directors and managers
- compliance users
- process owners
- system owners

## Business Activities

- maintain document registers
- manage document templates and controlled versions
- attach evidence to business objects
- maintain report definitions and reporting views
- manage reference data
- manage workflow definitions and status rules
- manage user access and authority rules
- manage business settings
- support exports, packs and controlled outputs
- support auditability across the platform

## Business Objects Used

- document
- document version
- document template
- evidence item
- report definition
- reporting view
- workflow definition
- workflow state
- business event
- reference data value
- user
- role
- authority limit
- business workspace
- business object

## Data Spine Relationships

Documents, evidence and reporting sit across the whole data spine:

```text
document
    -> business object
    -> evidence item
    -> workflow state
    -> report view
```

```text
reporting_view
    -> shared business objects
    -> workspace activity need
    -> filter / dimension / measure
```

Administration configures how PBM behaves; it must not become a separate operational data model.

## Required Route Doorways

Current or planned route families:

- `/app/documents/*`
- `/app/reporting/*`
- `/app/admin/*`
- `/app/dashboard`
- relevant object routes where documents, evidence, events and reports are shown in context

## Reports And Controls

The workspace should support:

- document register
- evidence register
- report catalogue
- workflow status report
- reference data audit
- user and role review
- authority control review
- dashboard configuration report
- export pack register
- document version history

## Exclusions For Now

- full enterprise content management replacement
- advanced document co-authoring
- external BI warehouse automation
- identity provider administration
- complex record-retention legal hold workflows

These may be added later, but the foundation should focus on PBM-controlled documents, evidence, reporting and administration over the shared data spine.
