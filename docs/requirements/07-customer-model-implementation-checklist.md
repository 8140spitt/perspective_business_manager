# Customer Model Implementation Checklist

## Purpose

Provide a delivery-time checklist for schema, service, route and reporting changes that must conform to the shared customer model.

The checklist protects PBM from splitting organisation-led and individual-led journeys into separate data structures.

## When To Use

Use this checklist when:

- adding or changing database migrations
- designing customer-facing route doorways
- implementing clients, instruction, finance, property or compliance workflows
- building imports, exports or reporting models
- reviewing pull requests that touch customer-related behaviour

## Schema Checklist

- every customer record roots in `party`
- customer specialisation uses `person` or business detail rather than separate customer tables
- `client_account` references shared party identity
- `instruction_party_role` supports customer-of-record, billing and representative scenarios
- `property_party_role` supports ownership, occupation, management and access scenarios
- classification values are controlled through reference data
- billing-party separation is possible without duplicating customer entities

## Service Checklist

- service methods accept shared customer identifiers rather than organisation-only or individual-only record types
- customer resolution logic works for business, individual and intermediary-led cases
- validation rules enforce supported role codes and billing relationships
- customer mutations preserve role and relationship integrity

## Route Checklist

- route flows can create and edit both organisation-led and individual-led customer journeys
- instruction routes can select customer-of-record, billing party and representative independently where required
- property routes can attach either a business or an individual as relevant parties
- complaint and compliance routes preserve the same customer context model

## Reporting Checklist

- reports can segment by organisation-led and individual-led classification
- finance reports can show bill-to party distinct from customer-of-record where relevant
- delivery reports can show portfolio-style work and single-case work without separate pipelines
- complaint and governance reporting can analyse customer mix consistently across the shared model

## Migration Checklist

- legacy businesses map to `party` plus business detail
- legacy individuals map to `party` plus `person`
- legacy customer accounts map to `client_account`
- legacy alternative payers or representatives map to party roles and relationships
- no import path creates parallel organisation-led and individual-led customer entities

## Pull Request Review Questions

1. Does this change preserve `party` as the shared customer root?
2. Does it avoid introducing separate customer structures for business and individual journeys?
3. Can billing, representative and intermediary scenarios still be modelled through roles and relationships?
4. Will reporting still be able to segment customer type on the shared model?
5. Does the change require updates to [06-customer-model-rules.md](./06-customer-model-rules.md) or [04-traceability-matrix.md](./04-traceability-matrix.md)?
