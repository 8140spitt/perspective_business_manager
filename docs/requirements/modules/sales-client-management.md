# Sales And Client Management Requirements

## Module Scope

- Perspective domains: CRM, Sales, Client onboarding

## Purpose

Manage the lifecycle from prospect and enquiry through accepted instruction and live client account.

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

### SCM-002 Enquiries And Opportunities

The application shall capture enquiries, opportunity stage, service line, estimated value, property context and probability.

### SCM-003 Fee Proposal Management

The application shall produce fee proposals and quotations with assumptions, exclusions, fee basis, review state and expiry.

### SCM-004 Instruction Conversion

The application shall convert accepted proposals into instructions with linked client, property, parties, scope and commercial terms.

### SCM-005 Conflict And Onboarding Controls

The application shall support pre-instruction checks including conflict review, client due diligence and required compliance gates.

### SCM-006 Client View

The application shall provide a consolidated client view across contacts, instructions, projects, invoices, complaints and documents.

## Reporting Requirements

- pipeline by stage, office, service line and fee value
- conversion rate from enquiry to instruction
- proposal turnaround and win-loss analysis
- client revenue and margin profile

## Integration Requirements

- email capture for enquiries and correspondence
- website or portal intake for new enquiries
- optional CRM or marketing integration where required

## Key Exclusions For Initial Delivery

- advanced campaign automation
- full customer self-service portal in phase one