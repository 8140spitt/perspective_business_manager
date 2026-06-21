# Customer Model Rules

## Purpose

Define the shared customer data-model rules that allow PBM to support organisation-led, individual-led and intermediary-led workflows across the whole application without splitting the enterprise model.

## Core Rule

The platform shall support organisation customers, individual consumers and intermediaries using one shared party-based model.

No workspace, route or package may introduce separate customer structures for organisation-led and individual-led journeys where the same business objects can represent both.

## Business Objects In Scope

- party
- person
- business entity
- client account
- contact method
- party relationship
- instruction
- instruction party role
- property party role
- sales invoice

## Data Model Rules

### CMR-001 Shared Party Root

Every customer of record shall originate from `party` as the shared enterprise identity.

### CMR-002 Person And Business Specialisation

An individual customer shall be represented as a `party` with `person` detail.

A business customer shall be represented as a `party` with business detail.

### CMR-003 Client Account Is Commercial, Not Type-Specific

`client_account` shall represent the commercial relationship to a party, whether that party is a business or an individual.

The existence of a client account must not imply business-only behaviour.

### CMR-004 Billing Party Rule

The bill-to party for an instruction or invoice may be:

- the same party as the customer of record
- a related business
- a related individual
- an authorised third-party payer

Billing relationships shall be expressed by roles and relationships, not by duplicating customer entities.

### CMR-005 Intermediary Role Rule

Intermediaries such as managing agents, loss adjusters, insurers, occupier representatives or family representatives shall be modelled as parties linked through party roles and relationships.

They must not require separate customer tables.

### CMR-006 Instruction Party Roles

Instructions shall support explicit party roles for at least:

- customer of record
- billing party
- primary contact
- occupier
- owner
- managing agent
- insurer
- contractor
- representative

### CMR-007 Property Party Roles

Properties shall support party roles that work for organisation-led and individual-led contexts, including ownership, occupation, management and access arrangements.

### CMR-008 Contact And Communication Rule

Contact methods shall attach to parties so the same communication model works for businesses, individuals and intermediaries.

### CMR-009 Customer Classification Rule

Customer classification such as organisation-led, individual-led, public-sector, insurer-led or intermediary-led shall be treated as controlled classification data used for reporting, workflow and service rules.

Classification must not drive separate entity structures.

### CMR-010 Reporting Rule

Reporting shall segment pipeline, delivery, billing, debt, complaints and profitability by customer classification while still aggregating over the shared model.

### CMR-011 Migration Rule

Legacy imports shall map both business customers and individual customers into the same customer model.

### CMR-012 No Divergent Customer Tables

The platform shall not introduce separate business customer tables and individual customer tables.

Any proposal to do so must be rejected unless the shared customer model is deliberately changed.

## Schema-Level Requirements

### SCR-001 Party Base Record

Every customer, intermediary, supplier and related external business actor shall have a base `party` record before any specialised or commercial records are created.

### SCR-002 Person And Business Optionality

Exactly one normal specialisation path shall be used for a customer root:

- `party` plus `person` for an individual-led customer
- `party` plus business detail for a business-led customer

The implementation shall prevent ambiguous dual specialisation for the same customer identity unless a deliberate business rule requires it.

### SCR-003 Client Account Foreign Key Rule

`client_account` shall reference `party` as its customer anchor.

No client account design may bypass the shared party root by pointing directly to separate individual or business entities.

### SCR-004 Contact Method Attachment Rule

`contact_method` shall attach to `party` so communication channels can be reused across business customers, individual customers and intermediaries.

### SCR-005 Party Relationship Rule

`party_relationship` shall support intermediary and representative scenarios such as:

- business to employee contact
- insurer to claimant
- managing agent to landlord
- family representative to individual customer
- contractor to client or project party

### SCR-006 Instruction Party Role Minimum Set

`instruction_party_role` shall support a controlled minimum role set including:

- customer_of_record
- billing_party
- primary_contact
- representative
- owner
- occupier
- managing_agent
- insurer

### SCR-007 Property Party Role Minimum Set

`property_party_role` shall support a controlled minimum role set including:

- owner
- occupier
- managing_agent
- landlord
- insurer
- access_contact

### SCR-008 Billing Separation Rule

The model shall allow `billing_party` to differ from `customer_of_record` without duplicating the instruction, client or invoice record.

### SCR-009 Classification Storage Rule

Customer classification such as organisation-led, individual-led, public-sector, insurer-led or intermediary-led shall be stored as controlled classification data and referenced consistently in workflows and reporting.

### SCR-010 Reporting Join Rule

Reporting models shall derive customer classification, billing party and representative context through shared joins rather than duplicated denormalised customer tables.

### SCR-011 Migration Mapping Rule

Migration and import utilities shall map legacy customer records into:

- shared party identity
- appropriate person or business detail
- client account if a commercial relationship exists
- role and relationship links where intermediaries or alternative bill-to parties exist

### SCR-012 Validation Rule

Application services shall reject customer data mutations that break shared customer-model constraints, including missing party roots, invalid billing-party references and unsupported role codes.

## Example Model Patterns

### Pattern 1: Business Portfolio Instruction

- customer of record: business party
- billing party: business party
- primary contact: person party linked to the business
- subject properties: multiple linked properties

### Pattern 2: Individual Private Instruction

- customer of record: person party
- billing party: same person party
- subject property: one or more linked properties

### Pattern 3: Intermediary-Led Individual Case

- customer of record: person party
- billing party: insurer or managing agent party
- representative: intermediary party linked by relationship and role

## Implementation Impact

The following areas must conform to these rules:

- clients and commercial work
- instruction creation and delivery workflows
- property-party linkage
- invoicing and payment allocation
- complaint handling and audit tracing
- dashboards, reporting and migration utilities

## Delivery Constraints

The following implementation constraints apply to code, schema and route design:

- new migrations must extend shared customer tables and role tables before introducing new customer-facing workflows
- route handlers must resolve customer context from shared party and role relationships
- package services must expose organisation-led and individual-led behaviour through shared APIs rather than divergent service families
- reports and exports must derive customer type from classification and relationships, not from separate table families

See [07-customer-model-implementation-checklist.md](./07-customer-model-implementation-checklist.md) for delivery-time conformance checks.
