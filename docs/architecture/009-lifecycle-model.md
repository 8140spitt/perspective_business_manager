# Lifecycle Model

## Purpose

This document defines the PBM customer-to-delivery lifecycle.

It connects customer management, commercial qualification, work authorisation, project delivery, finance, documents, controls and reporting.

## Core correction

A fee proposal and a quote are the same client-facing commercial offer.

PBM must not model them as separate sequential lifecycle stages.

The app may use different labels depending on context, but the underlying business object should be one offer/proposal record.

```text
Internal / professional wording: Fee proposal
Client-facing wording: Quote
Formal procurement wording: Tender response
Underlying PBM object: Commercial offer / fee proposal
```

A tender is also not automatically the next stage after a quote. A tender is a formal request or route-to-market context. A fee proposal / quote may be submitted as a tender response.

## Flow

```text
Contact / lead captured
  -> Client account or prospect record created
  -> Enquiry created
  -> Enquiry assigned
  -> Opportunity / project context created
  -> Fee proposal / quote prepared
  -> Fee proposal / quote accepted
  -> Instruction / authorised work created
  -> Project delivery controlled
  -> Deliverables produced
  -> Invoice raised
  -> Payment received
```

## Object interpretation

| Lifecycle item | PBM meaning | Notes |
| --- | --- | --- |
| Contact / lead | Initial person, organisation or contact route | May come from a marketing form, referral, phone call or direct email. |
| Client account / prospect | Party and business partner records | Sales or admin may enter these before any work exists. |
| Enquiry | A request for possible work | The enquiry can be assigned to a team or person. |
| Opportunity / project context | Commercial possibility and likely delivery container | The opportunity may sit inside the project context rather than as a separate client-visible thing. |
| Fee proposal / quote | The commercial offer to the client | This is one thing from the client perspective. |
| Tender response | A formal version of the offer | Used only where the enquiry came through a tender/procurement process. |
| Instruction / authorised work | Acceptance of the offer and authority to proceed | May create or activate the project delivery workflow. |
| Project | Controlled delivery container | Holds scope, service lines, deliverables, people, documents, costs and reporting context. |
| Deliverable | The thing PBM is producing for the client | Survey report, schedule, valuation output, assessment, evidence pack or similar. |
| Invoice | Finance request for payment | References client, project, authorised work and fee basis. |
| Payment | Settlement of the invoice | References invoice and finance records. |

## Package ownership

The commercial package owns the client-facing qualification and offer process:

```text
Lead / contact capture
Enquiry
Assignment
Opportunity context
Fee proposal / quote
Tender response context where required
```

The project delivery package consumes accepted commercial context and creates controlled delivery work.

The finance package consumes client, instruction, project, fee, invoice and payment context.

The documents package stores the evidence and deliverables that support the lifecycle.

## Design rules

1. A fee proposal and a quote are not separate lifecycle stages.
2. A tender is a context or submission route, not a mandatory stage after quotation.
3. Enquiry assignment is a workflow transition.
4. Creating a project from an enquiry is a workflow action.
5. Acceptance of a fee proposal / quote creates or confirms authorised work.
6. Project is the controlled delivery container.
7. Finance must reference client, instruction, project and fee context.
8. Documents attach to the object they support.
9. Workflow and controls govern lifecycle changes.
10. Reporting traverses canonical relationships.

## First implementation slice

1. Define table registry entries for client/prospect, enquiry, assignment, fee proposal / quote and project context.
2. Define workflow transitions for enquiry creation, assignment, acceptance, proposal preparation and authorisation.
3. Create API services that use CRUD for data access and workflow actions for business movement.
4. Connect sales/commercial screens to workflow actions rather than hard-coded page logic.
5. Create project records only through the approved enquiry/opportunity workflow path unless an admin override exists.
