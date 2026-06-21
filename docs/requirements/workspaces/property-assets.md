# Property & Assets Workspace Requirements

## Purpose

The Property & Assets workspace supports the management of properties, sites, buildings, spaces and maintained assets used in service delivery or owned/managed by the business.

It provides the business view of the physical environment without creating a separate copy of customers, projects, documents, inspections or maintenance records.

## Primary Users

- property managers
- building surveyors
- asset managers
- maintenance coordinators
- project delivery teams
- finance users reviewing asset or property-related cost
- compliance users reviewing property risk, evidence and obligations

## Business Activities

- create and maintain property records
- record sites, buildings, spaces and units
- link properties to clients, owners, occupiers and other parties
- associate projects, surveys, inspections and evidence with properties
- track defects, actions and maintenance needs
- support planned and reactive maintenance views
- support property and asset cost visibility
- provide property context for reporting and compliance

## Business Objects Used

- property
- site
- building
- space / unit
- address
- asset
- party
- business partner role
- project
- activity
- inspection
- defect
- document
- evidence item
- supplier invoice
- risk
- control

## Data Spine Relationships

Property and asset records sit on the shared data spine:

```text
property
    -> address
    -> party relationships
    -> project
    -> activity / inspection
    -> document / evidence
    -> defect / action
    -> supplier invoice / cost
    -> risk / control
```

The workspace must not duplicate client, supplier, project, finance or document records. It should link to them through shared business objects.

## Required Route Doorways

Current or planned route families:

- `/app/property/*`
- `/app/properties/*`
- `/app/projects/*` where property context is needed
- `/app/activities/*` where inspections or surveys are property-related
- `/app/documents/*` where controlled property evidence is managed
- `/app/reporting/*` for property and asset reporting

## Reports And Controls

The workspace should support:

- property register
- asset register
- property status report
- defect and action report
- maintenance due report
- property-linked project report
- property cost view
- compliance evidence view
- risk and control view by property

## Exclusions For Now

- full facilities management scheduling
- lease accounting
- complex property valuation engines
- IoT/sensor-driven maintenance automation
- detailed space planning or CAD/BIM modelling

These may be added later as extended capabilities, but they should still use the shared data spine rather than a separate property data silo.
