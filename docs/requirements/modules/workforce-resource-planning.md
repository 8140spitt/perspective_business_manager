# Workforce And Resource Planning Requirements

## Module Scope

- Perspective domains: HR, competencies, allocation, utilisation

## Purpose

Manage people, competencies, approvals and resource planning for delivery teams.

This module must support workforce planning across both B2B portfolio delivery and B2C individual-customer delivery.

## Core Objects

- person
- employee
- role
- team
- competency
- accreditation
- allocation
- availability
- timesheet_entry

## Functional Requirements

### WRP-001 Employee Master

The application shall manage employee identities, employment status, team structure and relevant organisational assignment.

### WRP-002 Competency And Accreditation Tracking

The application shall track competencies, charterships, licences, training and expiries relevant to service delivery.

### WRP-003 Resource Planning

The application shall support allocation of staff to instructions, projects and activities by capacity, skill and location.

The application shall support allocation patterns for both high-volume B2B workloads and smaller B2C case-based work.

### WRP-004 Approval Routing

The application shall support leave, expense, timesheet or commercial approval routing where implemented.

### WRP-005 Utilisation Tracking

The application shall report chargeable, non-chargeable, planned and available capacity.

The application shall allow workload and utilisation analysis to be segmented by B2B and B2C service mix where relevant.

## Reporting Requirements

- utilisation by person, team and office
- competency gaps and expiring accreditations
- allocation conflicts and overload
- forecast capacity versus pipeline demand
- resource demand split by B2B and B2C customer mix

## Integration Requirements

- calendar integration
- optional payroll or HRIS integration
- identity and access integration for joiner-mover-leaver controls
