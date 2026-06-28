# People & Workforce Data Spine

## Purpose

This document defines the first PBM People & Workforce data spine.

It is not a route model and it is not a copied HR module structure. It is the normalised enterprise foundation that lets workflows decide which HR, resource, payroll, recruitment, training and availability tables are used for each business process.

## Core rule

```text
Person
  -> Candidate
  -> Employee
      -> Employment
      -> Contract
      -> Position assignment
      -> Skills / competencies
      -> Training
      -> Leave / absence
      -> Attendance / timesheets
      -> Salary / benefits
      -> Equipment
      -> Performance reviews
```

The employee record is not the identity record.

`person` remains the identity anchor. `employee` represents workforce participation. Downstream tables define the specific business context.

## Implemented schema file

```text
src/lib/server/db/schema/014_people_workforce.sql
```

The migration is intentionally placed after the core, commercial and work-management files because it references:

```text
party
person
address
project
work_container
```

## Table groups

### Enterprise organisation

```text
legal_entity
business_location
organisation_unit
grade
job_role
workforce_position
position_assignment
```

These tables separate legal employer, physical location, organisation structure, job role, position and employee assignment.

A job role is a type of work.

A workforce position is a seat in the organisation.

A position assignment is the link between an employee and that seat.

### Employee lifecycle

```text
employee
employment
employment_contract
employee_document
employee_emergency_contact
employee_dependent
```

These tables represent employment status, contracts, employee-specific documents and personal HR records.

### Recruitment

```text
candidate
job_opening
job_application
interview
employment_offer
```

Recruitment starts from a person-backed candidate and can later create an employee through workflow.

### Skills, competency and training

```text
skill
competency
competency_level
person_skill
person_competency
certification
person_certification
training
training_enrollment
```

Competency is modelled separately from skill so PBM can support evidence, assessment, expiry, authorisation and resource matching.

### Leave, absence and availability

```text
work_pattern
employee_work_pattern
leave_type
leave_policy
leave_allocation
leave_request
absence
attendance_event
```

Leave requests are workflow-controlled. Approved leave can create absence and reduce availability.

### Resource planning and timesheets

```text
resource_assignment
timesheet
timesheet_line
```

Resource assignment links people to projects or work containers. Timesheet lines can be chargeable or non-chargeable.

### Payroll and reward

```text
salary_component
employee_salary_component
benefit
employee_benefit
payroll_run
payslip
payslip_line
```

This gives PBM a payroll-ready structure without making payroll processing the first implementation target.

### Performance, development, equipment and access

```text
performance_review
review_goal
development_plan
equipment
equipment_assignment
onboarding_task
system_access_request
```

These support people-management workflows and new-starter/leaver processes.

## Workflow examples

### New starter

```text
Candidate accepted
  -> create person if required
  -> create employee
  -> create employment
  -> create employment contract
  -> assign workforce position
  -> create onboarding tasks
  -> assign equipment
  -> raise system access requests
```

### Leave request

```text
Employee submits leave request
  -> check leave allocation
  -> check work pattern
  -> route to approver
  -> approve / reject
  -> create absence record
  -> update availability reporting
```

### Project resourcing

```text
Project requires resource
  -> search person competency
  -> check employee work pattern
  -> check leave / absence
  -> create resource assignment
  -> optionally require timesheet lines
```

### Training and competency

```text
Training required
  -> enroll employee
  -> record completion
  -> update person competency or certification
  -> record expiry if applicable
```

## Design decisions

1. `person` is reused from the core schema.
2. `employee` does not duplicate name, email or phone fields.
3. `workforce_position` is used instead of a raw `position` table name to avoid ambiguity.
4. `organisation_unit` replaces department-only modelling.
5. `resource_assignment` connects People & Workforce to Project & Delivery.
6. Skills and competencies are person-level because they can exist before and after employment.
7. Payroll tables exist as a foundation but payroll workflows can be added later.
8. Equipment assignment is included for workforce control, even if a fuller asset register is added later.

## Not implemented yet

The schema creates the data spine only.

The following are still outstanding:

```text
CRUD table registry entries
People/workforce workflow definitions
People workspace screens
Generated API handlers
Seed data / reference code values
Validation rules
Permission rules
Audit/event integration
```

## First workflows to implement

```text
create-employee
assign-position
request-leave
approve-leave
assign-resource
record-training-completion
start-onboarding
request-system-access
```

## Acceptance criteria

The People & Workforce foundation is acceptable when:

1. a person can become a candidate
2. a candidate can become an employee
3. an employee can hold one or more position assignments
4. a position can report to another position
5. skills, competencies and certifications can be recorded against a person
6. leave allocation and leave request records can be created
7. resource assignments can link an employee to a project or work container
8. payroll-ready salary, benefit, payslip and payslip-line records can be stored
9. onboarding, equipment and access-control workflows have somewhere to write their records
