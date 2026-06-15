# Procurement And Supply Chain Requirements

## Module Scope

- Perspective domains: Procurement, suppliers, subcontracted services

## Purpose

Manage supplier relationships, bought-in services and purchasing controls that support professional service delivery.

This module must support procurement patterns needed for both B2B portfolio work and B2C case-by-case delivery work.

## Core Objects

- supplier
- supplier_party_role
- purchase_order
- purchase_invoice
- subcontract_assignment
- project
- instruction

## Functional Requirements

### PSC-001 Supplier Master

The application shall maintain supplier records, accreditations, service categories, insurance status and compliance documents.

### PSC-002 Purchase Requests And Orders

The application shall support purchase requests, approvals and purchase orders for goods and subcontracted services.

### PSC-003 Subcontractor Engagement

The application shall support assignment of specialist suppliers to activities, projects or instructions.

The application shall support subcontractor engagement for both organisation-led delivery programmes and individual-customer instructions.

### PSC-004 Supplier Document Control

The application shall store supplier insurances, certifications, terms and performance evidence.

### PSC-005 Cost Capture

The application shall link supplier costs to the relevant project, instruction, property or deliverable.

The application shall preserve cost attribution whether the downstream commercial case is B2B account billing or B2C direct billing.

## Reporting Requirements

- spend by supplier, category and service line
- subcontractor utilisation and turnaround
- expiring supplier compliance documents
- committed versus actual external cost
- supplier cost exposure by B2B and B2C delivery mix

## Integration Requirements

- finance integration for purchase invoice processing
- supplier onboarding workflow and approval controls
