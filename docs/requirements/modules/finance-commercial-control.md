# Finance And Commercial Control Requirements

## Module Scope

- Perspective domains: Finance, profitability, commercial control

## Purpose

Control commercial performance from fee agreement through WIP, invoice, payment and profitability.

## Core Objects

- fee_agreement
- wip_item
- sales_invoice
- payment
- credit_note
- ledger_entry
- project
- instruction
- client_account

## Functional Requirements

### FIN-001 Fee Basis Management

The application shall manage fixed fee, capped fee, time-charge and staged fee arrangements.

### FIN-002 WIP Tracking

The application shall track unbilled work by instruction, project, service line, person and period.

### FIN-003 Sales Invoicing

The application shall issue invoices linked to client accounts, instructions, projects and deliverables.

### FIN-004 Payment Allocation

The application shall record payments, allocate them to invoices and track outstanding debt.

### FIN-005 Credit And Adjustment Control

The application shall support credit notes, invoice adjustments and approval-controlled write-offs.

### FIN-006 Profitability Analysis

The application shall analyse revenue, cost, margin and recovery by client, project, instruction, service line and team.

### FIN-007 Budget And Cost Control

The application shall support planned effort, cost-to-complete and variance analysis for projects and major instructions.

## Reporting Requirements

- aged debtors
- WIP by office, team and service line
- invoice status and billing turnaround
- profitability by client, property, project and surveyor
- write-off and credit note analysis

## Integration Requirements

- external accounting ledger integration if needed
- bank receipt import or finance system integration
- tax code and statutory reporting extension points