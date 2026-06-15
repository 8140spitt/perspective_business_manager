# Property And Asset Management Requirements

## Module Scope

- Perspective domains: Property, Technical, Asset context

## Purpose

Provide the built-asset context for commercial, operational and reporting workflows.

This module must support property and asset relationships for both organisation-led B2B work and individual-led B2C work.

## Core Objects

- address
- property
- property_unit
- property_party_role
- building_element
- instruction_property
- activity
- evidence_item

## Functional Requirements

### PAM-001 Property Register

The application shall maintain a register of sites, buildings, units and related addresses.

### PAM-002 Party Relationships

The application shall record ownership, occupation, management and other party roles against properties.

The application shall support party-to-property relationships where the relevant party is an organisation, an individual consumer or an intermediary acting for either.

### PAM-003 Technical Structure

The application shall support optional hierarchy for blocks, floors, rooms, zones and building elements where needed by service lines.

### PAM-004 Property History

The application shall provide history of instructions, activities, findings, documents and outcomes linked to a property.

### PAM-005 Condition And Risk Context

The application shall support condition, defect, lifecycle and risk context associated with properties and components.

### PAM-006 Portfolio Views

The application shall support client and portfolio views across multiple properties, sites or assets.

The application shall also support single-consumer property views where one individual customer may hold one or more relevant properties, units or instructions.

## Reporting Requirements

- property inventory by client, geography and type
- instruction and project load by property
- recurring defects or condition trends by asset group
- property document and certificate status
- property workload split by B2B and B2C customer classification

## Integration Requirements

- address verification and geocoding
- GIS, mapping or spatial overlays where required
- optional import from existing asset registers or CAFM tools
