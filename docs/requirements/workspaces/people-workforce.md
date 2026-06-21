# People & Workforce Workspace Requirements

## Purpose

The People & Workforce workspace manages people, employees, positions, competence, approvals, availability, assignment and utilisation.

It must support workforce planning across portfolio delivery, project delivery and individual customer work without creating separate people structures for each workspace.

## Primary users

- Practice leaders
- Team leaders
- Resource planners
- Project managers
- HR administrators
- Finance and operations managers
- Employees using self-service activity views

## Business activities

### PW-001 Manage people and employee records

The workspace shall manage person records, employee records, employment status, business assignment, team structure and current position.

### PW-002 Manage competence and accreditation

The workspace shall track competence, professional memberships, charterships, licences, training, certification and expiry dates relevant to service delivery.

### PW-003 Plan resources

The workspace shall support allocation of people to instructions, projects and activities by capacity, skill, role, location and availability.

### PW-004 Manage approval routing

The workspace shall support approval routing for leave, expenses, timesheets, commercial authority and other approval processes where implemented.

### PW-005 Track utilisation

The workspace shall report planned, actual, chargeable, non-chargeable and available capacity.

### PW-006 Support joiner, mover and leaver controls

The workspace shall support controlled changes to employee status, team, position, access requirement and authority level.

## Business objects used

- person_entity
- employee
- employee_position
- organisation_unit
- position
- business_function
- competence
- person_competence
- accreditation
- availability
- assignment
- timesheet_entry
- authority_limit

## Data spine relationships

The People & Workforce workspace uses shared records from the PBM data spine:

- person records are shared with client, contact and supplier-contact records where relevant
- employees are linked to organisation units, positions and business functions
- assignments connect people to projects, activities and services
- competence records support planning, compliance and quality controls
- authority limits support approvals, purchasing, commercial review and finance controls
- utilisation reporting combines planned assignments, actual time and project/commercial context

## Required routes

| Route doorway | Job done by the user |
| --- | --- |
| `/app/hr/dashboard` | See people, competence, workload and workforce exceptions. |
| `/app/hr/people` | Search and manage people records. |
| `/app/hr/employees` | Manage employee records and status. |
| `/app/hr/positions` | Manage positions and organisation assignment. |
| `/app/hr/competence` | Manage competence, training and expiry records. |
| `/app/resource-planning/dashboard` | Plan resource demand, assignment and capacity. |
| `/app/resource-planning/assignments` | Assign people to projects and activities. |

## Reports and controls

- utilisation by person, team, office and service line
- competence gaps and expiring accreditations
- allocation conflicts and overload
- forecast capacity versus pipeline demand
- resource demand split by customer and service mix
- approval bottlenecks
- joiner, mover and leaver exceptions

## Initial exclusions

- full payroll processing
- full HR case management
- full employee benefits administration
- advanced workforce optimisation
