# Clients & Commercial Workspace Requirements

## Purpose

The Clients & Commercial workspace manages the lifecycle from prospect and enquiry through opportunity, quote, accepted instruction and live client account.

It must support business customers, individual customers and intermediaries using the same party, contact, client and commercial record model.

## Primary users

- Directors
- Commercial users
- Business development users
- Client account managers
- Administrators
- Project managers during instruction handover
- Finance users reviewing billing context

## Business activities

### CC-001 Manage clients and contacts

The workspace shall manage businesses, individuals, contacts, roles, addresses, contact methods and relationship hierarchies.

The workspace shall allow a business or an individual person to become the commercial customer of record.

### CC-002 Capture enquiries and opportunities

The workspace shall capture enquiries, opportunity stage, service line, estimated value, property context, probability and source.

The workspace shall capture whether an enquiry originated from a business customer, an individual customer or an intermediary acting on behalf of either.

### CC-003 Manage quotes and fee proposals

The workspace shall produce quotes and fee proposals with assumptions, exclusions, fee basis, review state, expiry and acceptance state.

The workspace shall support proposals addressed to a business, an individual customer or an intermediary with the correct customer-of-record preserved.

### CC-004 Convert accepted work into instructions

The workspace shall convert accepted quotes into instructions with linked client, property, parties, scope and commercial terms.

The workspace shall preserve the correct customer-of-record, billing party, contact structure and commercial basis during conversion.

### CC-005 Run pre-instruction controls

The workspace shall support pre-instruction checks including conflict review, client due diligence, required approvals and compliance gates.

### CC-006 Maintain the client view

The workspace shall provide a consolidated client view across contacts, opportunities, quotes, instructions, projects, invoices, complaints, documents and retained records.

### CC-007 Preserve customer model consistency

The workspace shall use the shared party and business partner model so sales, project delivery, finance, compliance and reporting can work across customer types without duplicate customer structures.

## Business objects used

- business_entity
- person_entity
- business_partner
- business_partner_role
- business_partner_person
- contact_method
- address
- client_account
- opportunity
- enquiry
- project_quote
- project_quote_row
- instruction
- project
- property
- sales_invoice
- document
- risk
- control

## Data spine relationships

The Clients & Commercial workspace uses shared records from the PBM data spine:

- customer identity comes from the shared party and business partner model
- contacts are shared with project delivery, finance and document activity views
- accepted quotes create or link to instructions and projects
- quote value becomes the commercial baseline for project delivery and finance
- finance uses client and billing records for invoicing, credit control and receipts
- compliance uses onboarding, conflict and due-diligence records as controls
- reporting uses enquiry, quote, conversion, revenue and margin data

## Required routes

| Route doorway | Job done by the user |
| --- | --- |
| `/app/crm/dashboard` | See commercial pipeline, client exceptions and account activity. |
| `/app/crm/clients` | Search and manage client accounts. |
| `/app/crm/contacts` | Search and manage contacts and relationships. |
| `/app/sales/dashboard` | See sales activity, quote status and conversion. |
| `/app/sales/enquiries` | Capture and manage enquiries. |
| `/app/sales/opportunities` | Manage opportunities and pipeline stages. |
| `/app/sales/quotes` | Create and manage quotes and fee proposals. |
| `/app/sales/instructions` | Convert accepted commercial work into controlled instructions. |

## Reports and controls

- pipeline by stage, office, service line and value
- conversion rate from enquiry to instruction
- proposal turnaround and win-loss analysis
- client revenue and margin profile
- customer mix by business, individual and intermediary source
- onboarding and conflict-check exceptions
- quotes expiring soon
- accepted work awaiting instruction setup

## Initial exclusions

- advanced campaign automation
- full customer self-service portal
- advanced marketing attribution
- automated sales forecasting
