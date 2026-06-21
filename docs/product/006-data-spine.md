# 006 Data spine

The PBM data spine is the connected set of records that lets the business see one version of the truth.

The data spine is not one table per workspace.

The same record can support different workspaces because each workspace uses the record for a different job.

## Spine layers

PBM uses these data spine layers:

1. Foundation identity
2. Business structure
3. People and authority
4. Project and service delivery
5. Commercial value
6. Procurement and supplier cost
7. Finance and control
8. Quality, risk, evidence and reporting

## Foundation identity

Foundation records identify real-world organisations and people.

Typical records:

- business_entity
- person_entity
- business_partner
- business_partner_role
- business_partner_person
- contact_method
- address

## Business structure

Business structure records describe how the business is organised.

Typical records:

- business_function
- organisation_unit
- position

## People and authority

People records describe who works for the business, what role they hold and what authority or competence they have.

Typical records:

- employee
- employee_position
- competence
- person_competence
- authority_limit

## Project and service delivery

Project records describe the work being delivered.

Typical records:

- project
- project_party
- project_contact
- project_assignment
- project_location
- project_service
- project_service_cost

## Commercial value

Commercial records describe quoted and instructed value.

Typical records:

- project_quote
- project_quote_row

## Procurement and supplier cost

Procurement records describe commitments and supplier cost.

Typical records:

- purchase_order
- purchase_order_row
- supplier_invoice
- supplier_invoice_row

## Finance and control

Finance records describe billed income, supplier cost, payment control and margin.

Typical records:

- sales_invoice
- sales_invoice_row
- supplier_invoice
- supplier_invoice_row

## Data rule

A workspace is a view over the data spine.

The business object owns the record identity.

The activity owns the user interaction.

The data spine owns the truth.
