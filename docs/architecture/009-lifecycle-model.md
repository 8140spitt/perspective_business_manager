# Lifecycle Model

## Purpose

This document defines the PBM customer-to-delivery lifecycle.

It connects customer management, sales, agreements, projects, finance, documents, controls and reporting.

## Flow

```text
Client Account
  -> Lead
  -> Enquiry
  -> Opportunity
  -> Proposal
  -> Quotation
  -> Tender
  -> Contract
  -> Project
  -> Deliverable
  -> Invoice
  -> Payment
```

## Package Ownership

The sales package owns Lead, Enquiry, Opportunity, Proposal, Quotation and Tender.

The contracts package owns Contract, Framework Agreement, Service Agreement and Variation.

The projects package consumes accepted agreement context and creates controlled delivery work.

The finance package consumes fee, invoice and payment context.

## Design Rules

1. Sales objects qualify and authorise work.
2. Contract is the agreement authority.
3. Project is the controlled delivery container.
4. Finance must reference customer, agreement and project context.
5. Documents attach to the object they support.
6. Workflow and controls govern stage changes.
7. Reporting traverses canonical relationships.

## First Implementation Slice

1. define package types and constants
2. define validators for create and transition inputs
3. design migration `012_sales_lifecycle.sql`
4. implement repository functions after schema exists
5. connect sales routes to services
