# Customer Model Implementation Checklist

## Purpose

Provide a delivery-time checklist for schema, service, route and reporting changes that must conform to the shared B2B/B2C customer model.

## When To Use

Use this checklist when:

- adding or changing database migrations
- designing customer-facing routes
- implementing CRM, instruction, finance or property workflows
- building imports, exports or reporting models
- reviewing pull requests that touch customer-related behavior

## Schema Checklist

- every customer record roots in `party`
- customer specialisation uses `person` or `organisation` rather than separate customer tables
- `client_account` references shared party identity
- `instruction_party_role` supports customer-of-record, billing and representative scenarios
- `property_party_role` supports ownership, occupation and management scenarios
- classification values are controlled through reference data
- billing-party separation is possible without duplicating customer entities

## Service Checklist

- service methods accept shared customer identifiers rather than B2B-only or B2C-only record types
- customer resolution logic works for organisation, individual and intermediary-led cases
- validation rules enforce supported role codes and billing relationships
- customer mutations preserve role and relationship integrity

## Route Checklist

- route flows can create and edit both organisation-led and individual-led customer journeys
- instruction routes can select customer-of-record, billing party and representative independently where required
- property routes can attach either an organisation or an individual as relevant parties
- complaint and compliance routes preserve the same customer context model

## Reporting Checklist

- reports can segment by B2B and B2C classification
- finance reports can show bill-to party distinct from customer-of-record where relevant
- delivery reports can show portfolio-style B2B work and single-case B2C work without separate pipelines
- complaint and governance reporting can analyse customer mix consistently across the shared model

## Migration Checklist

- legacy organisations map to `party` plus `organisation`
- legacy individuals map to `party` plus `person`
- legacy customer accounts map to `client_account`
- legacy alternative payers or representatives map to party roles and relationships
- no import path creates parallel B2B and B2C customer entities

## Pull Request Review Questions

1. Does this change preserve `party` as the shared customer root?
2. Does it avoid introducing separate customer structures for organisation and consumer journeys?
3. Can billing, representative and intermediary scenarios still be modeled through roles and relationships?
4. Will reporting still be able to segment B2B and B2C on the shared model?
5. Does the change require updates to [06-customer-model-rules.md](./06-customer-model-rules.md) or [04-traceability-matrix.md](./04-traceability-matrix.md)?
