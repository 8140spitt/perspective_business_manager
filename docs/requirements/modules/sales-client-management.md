# Sales And Client Management Requirements

## Module Scope

- Perspective domains: CRM, Sales, Client onboarding

## Purpose

Manage the lifecycle from prospect and enquiry through accepted instruction and live client account.

This module must support both B2B and B2C customer types using the same underlying party and client account architecture.

## Core Objects

- party
- person
- organisation
- client_account
- contact_method
- opportunity
- fee_proposal
- quotation
- instruction

## Functional Requirements

### SCM-001 Client And Contact Management

The application shall manage organisations, individuals, roles, addresses, contact methods and relationship hierarchies.

The application shall allow an organisation or an individual person to become the commercial customer of record.

### SCM-002 Enquiries And Opportunities

The application shall capture enquiries, opportunity stage, service line, estimated value, property context and probability.

The application shall capture whether an enquiry originated from a business customer, an individual consumer or an intermediary acting on behalf of either.

### SCM-003 Fee Proposal Management

The application shall produce fee proposals and quotations with assumptions, exclusions, fee basis, review state and expiry.

The application shall support proposals addressed either to an organisation or directly to an individual consumer.

### SCM-004 Instruction Conversion

The application shall convert accepted proposals into instructions with linked client, property, parties, scope and commercial terms.

The application shall preserve the correct customer-of-record, billing party and contact structure when converting B2B or B2C work into an instruction.

### SCM-005 Conflict And Onboarding Controls

The application shall support pre-instruction checks including conflict review, client due diligence and required compliance gates.

### SCM-006 Client View

The application shall provide a consolidated client view across contacts, instructions, projects, invoices, complaints and documents.

The application shall provide an equivalent consolidated view for individual consumers, including their properties, instructions, invoices and retained records.

### SCM-007 Customer Model Consistency

The application shall use a shared party model for B2B and B2C customers so sales, operations, finance, compliance and reporting can work across both without duplicate customer structures.

## Reporting Requirements

- pipeline by stage, office, service line and fee value
- conversion rate from enquiry to instruction
- proposal turnaround and win-loss analysis
- client revenue and margin profile
- customer mix by B2B and B2C classification

## Integration Requirements

- email capture for enquiries and correspondence
- website or portal intake for new enquiries
- optional CRM or marketing integration where required

## Key Exclusions For Initial Delivery

- advanced campaign automation
- full customer self-service portal in phase one
