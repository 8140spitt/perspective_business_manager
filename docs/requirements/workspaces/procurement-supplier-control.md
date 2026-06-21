# Procurement & Supplier Control Workspace Requirements

## Purpose

The Procurement & Supplier Control workspace manages suppliers, bought-in services, purchase requests, purchase orders, subcontractor engagement, supplier compliance and supplier cost capture.

It must support supplier control for portfolio delivery, project delivery and individual customer work using the same supplier and purchasing data spine.

## Primary users

- Procurement administrators
- Project managers
- Delivery coordinators
- Finance users
- Compliance users
- Directors and approval holders

## Business activities

### PSC-001 Manage supplier records

The workspace shall maintain supplier records, supplier contacts, service categories, accreditations, insurance status, compliance documents and approval status.

### PSC-002 Raise purchase requests and purchase orders

The workspace shall support purchase requests, approval checks and purchase orders for goods, services and subcontracted work.

### PSC-003 Engage subcontractors and specialist suppliers

The workspace shall support assignment of suppliers to activities, projects, instructions, properties or service lines.

### PSC-004 Control supplier documents

The workspace shall store supplier insurance, certifications, terms, performance evidence and compliance documents.

### PSC-005 Capture supplier cost

The workspace shall link supplier cost to the correct project, instruction, property, deliverable, service or business area.

### PSC-006 Support supplier invoice matching

The workspace shall provide the procurement view of supplier invoices so users can check purchase order match, service receipt, dispute status and project attribution.

## Business objects used

- business_partner
- business_partner_role
- business_partner_person
- supplier
- supplier_contact
- supplier_service_category
- supplier_compliance_document
- purchase_request
- purchase_order
- purchase_order_row
- service_receipt
- supplier_invoice
- supplier_invoice_row
- subcontract_assignment
- project
- instruction
- document

## Data spine relationships

The Procurement & Supplier Control workspace uses shared records from the PBM data spine:

- supplier identity comes from the shared business partner model
- supplier contacts come from shared person and contact records
- purchase orders connect supplier commitments to projects, services and cost centres
- supplier invoices are used by procurement for matching and by finance for posting, payment and dispute management
- project delivery uses supplier cost as actual or committed cost
- compliance uses supplier document status and approval evidence
- reporting uses supplier spend, committed cost and project margin exposure

## Required routes

| Route doorway | Job done by the user |
| --- | --- |
| `/app/procurement/dashboard` | See supplier, purchasing and cost-control exceptions. |
| `/app/procurement/suppliers` | Search and manage supplier records. |
| `/app/procurement/purchase-requests` | Raise and review purchase requests. |
| `/app/procurement/purchase-orders` | Manage purchase orders and commitments. |
| `/app/procurement/supplier-invoices` | Review supplier invoice matching and dispute status. |
| `/app/procurement/compliance` | Manage supplier compliance documents and expiry exceptions. |

## Reports and controls

- spend by supplier, category and service line
- subcontractor utilisation and turnaround
- expiring supplier compliance documents
- committed versus actual external cost
- supplier cost exposure by project and customer mix
- purchase approval exceptions
- unmatched supplier invoices
- supplier dispute ageing

## Initial exclusions

- full supplier portal
- automated supplier scoring
- advanced warehouse management
- automated procurement optimisation
