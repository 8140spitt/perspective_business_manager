# Customer Model Rules

## Purpose

Define the shared customer data-model rules that allow Perspective Business Manager to support both B2B and B2C workflows across the whole application without splitting the enterprise model.

## Core Rule

The platform shall support organisation customers, individual consumers and intermediaries using one shared party-based model.

No module may introduce separate customer structures for B2B and B2C journeys where the same enterprise objects can represent both.

## Canonical Objects In Scope

- party
- person
- organisation
- client_account
- contact_method
- party_relationship
- instruction
- instruction_party_role
- property_party_role
- sales_invoice

## Data Model Rules

### CMR-001 Shared Party Root

Every customer of record shall originate from `party` as the canonical enterprise identity.

### CMR-002 Person And Organisation Specialisation

An individual consumer shall be represented as a `party` with `person` detail.

An organisation customer shall be represented as a `party` with `organisation` detail.

### CMR-003 Client Account Is Commercial, Not Type-Specific

`client_account` shall represent the commercial relationship to a party, whether that party is an organisation or an individual.

The existence of a client account must not imply B2B-only behavior.

### CMR-004 Billing Party Rule

The bill-to party for an instruction or invoice may be:

- the same party as the customer of record
- a related organisation
- a related individual
- an authorised third-party payer

Billing relationships shall be expressed by roles and relationships, not by duplicating customer entities.

### CMR-005 Intermediary Role Rule

Intermediaries such as managing agents, loss adjusters, insurers, tenants' representatives or family representatives shall be modeled as parties linked through party roles and relationships.

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

Properties shall support party roles that work for both B2B and B2C contexts, including ownership, occupation, management and access arrangements.

### CMR-008 Contact And Communication Rule

Contact methods shall attach to parties so the same communication model works for organisations, consumers and intermediaries.

### CMR-009 Customer Classification Rule

Customer classification such as B2B, B2C, public sector, insurer-led or intermediary-led shall be treated as controlled classification data used for reporting, workflow and service rules.

Classification must not drive separate entity structures.

### CMR-010 Reporting Rule

Reporting shall be able to segment pipeline, delivery, billing, debt, complaints and profitability by customer classification while still aggregating over the shared canonical model.

### CMR-011 Migration Rule

Legacy imports shall map both organisation customers and individual consumers into the same customer model.

### CMR-012 No Divergent Customer Tables

The platform shall not introduce separate B2B customer tables and B2C customer tables.

Any proposal to do so must be rejected unless the canonical model is deliberately changed.

## Schema-Level Requirements

### SCR-001 Party Base Record

Every customer, intermediary, supplier and related external business actor shall have a base `party` record before any specialised or commercial records are created.

### SCR-002 Person And Organisation Optionality

Exactly one specialisation path shall be used for a customer root:

- `party` plus `person` for an individual-led customer
- `party` plus `organisation` for an organisation-led customer

The implementation shall prevent ambiguous dual specialisation for the same customer identity unless a deliberate business rule requires it.

### SCR-003 Client Account Foreign Key Rule

`client_account` shall reference `party` as its customer anchor.

No client account design may bypass the shared party root by pointing directly to separate consumer or company entities.

### SCR-004 Contact Method Attachment Rule

`contact_method` shall attach to `party` so communication channels can be reused across organisation customers, individual consumers and intermediaries.

### SCR-005 Party Relationship Rule

`party_relationship` shall support intermediary and representative scenarios such as:

- organisation to employee contact
- insurer to claimant
- managing agent to landlord
- family representative to consumer
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
- tenant
- landlord
- insurer
- access_contact

### SCR-008 Billing Separation Rule

The model shall allow `billing_party` to differ from `customer_of_record` without duplicating the instruction, client or invoice record.

### SCR-009 Classification Storage Rule

Customer classification such as B2B, B2C, public_sector, insurer_led or intermediary_led shall be stored as controlled classification data and referenced consistently in workflows and reporting.

### SCR-010 Reporting Join Rule

Reporting models shall be able to derive customer classification, billing party and representative context through canonical joins rather than through duplicated denormalised customer tables.

### SCR-011 Migration Mapping Rule

Migration and import utilities shall map legacy customer records into:

- shared party identity
- appropriate person or organisation detail
- client account if a commercial relationship exists
- role and relationship links where intermediaries or alternative bill-to parties exist

### SCR-012 Validation Rule

Application services shall reject customer data mutations that break shared customer-model constraints, including missing party roots, invalid billing-party references and unsupported role codes.

## Example Model Patterns

### Pattern 1: B2B Portfolio Instruction

- customer of record: organisation party
- billing party: organisation party
- primary contact: person party linked to organisation
- subject properties: multiple linked properties

### Pattern 2: B2C Private Instruction

- customer of record: person party
- billing party: same person party
- subject property: one or more linked properties

### Pattern 3: Intermediary-Led Consumer Case

- customer of record: person party
- billing party: insurer or managing agent party
- representative: intermediary party linked by relationship and role

## Implementation Impact

The following areas must conform to these rules:

- CRM and sales
- instruction creation and delivery workflows
- property-party linkage
- invoicing and payment allocation
- complaint handling and audit tracing
- dashboards, reporting and migration utilities

## Delivery Constraints

The following implementation constraints apply to code, schema and route design:

- new migrations must extend shared customer tables and role tables before introducing new customer-facing workflows
- route handlers must resolve customer context from canonical party and role relationships
- package services must expose B2B and B2C behavior through shared APIs rather than divergent service families
- reports and exports must derive customer type from classification and relationships, not from separate table families

See [07-customer-model-implementation-checklist.md](./07-customer-model-implementation-checklist.md) for delivery-time conformance checks.
