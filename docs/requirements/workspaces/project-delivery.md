# Project Delivery Workspace Requirements

## Purpose

The Project Delivery workspace manages operational work from accepted instruction through planning, site or remote activity, evidence capture, findings, actions, deliverables and closeout.

It must support business-led portfolio work and individual customer work using the same underlying instruction, project, activity and outcome model.

## Primary users

- Project managers
- Surveyors
- Consultants
- Technical reviewers
- Delivery coordinators
- Administrators
- Directors and practice leads

## Business activities

### PD-001 Manage accepted instructions

The workspace shall provide an activity view for scope, parties, property links, commercial basis, delivery status and planned work.

The same instruction model shall support business customers, individual customers and intermediary-led work without creating separate record structures.

### PD-002 Plan project delivery

The workspace shall support project setup, phases, milestones, tasks, dependencies, team roles, planned dates and planned outputs.

### PD-003 Manage delivery activities

The workspace shall support activity creation and lifecycle management for inspections, audits, investigations, meetings, workshops, surveys and other delivery work.

### PD-004 Capture findings and technical judgement

The workspace shall support observations, assessments, actions and outcomes as linked records within a defensible technical chain.

### PD-005 Control review and issue

The workspace shall support draft, internal review, technical approval, issue and reissue states for deliverables and outcomes.

### PD-006 Assign resources

The workspace shall support assignment of internal and external resources by role, competence, availability and location.

### PD-007 Manage exceptions

The workspace shall highlight overdue tasks, blocked reviews, overdue actions, missing evidence and activities with incomplete outcomes.

## Business objects used

- instruction
- project
- project_party
- project_contact
- project_assignment
- project_location
- project_service
- project_service_cost
- activity
- observation
- assessment
- action
- outcome
- deliverable
- task
- document

## Data spine relationships

The Project Delivery workspace does not own these records. It uses shared records from the PBM data spine:

- clients and contacts come from the shared party and business partner model
- project people come from the shared people and workforce model
- supplier activity and external cost connect to procurement records
- project cost and margin connect to finance records
- documents and evidence connect to the information spine
- risks, approvals and reviews connect to the control spine

## Required routes

| Route doorway | Job done by the user |
| --- | --- |
| `/app/projects/dashboard` | See delivery workload, exceptions and project performance. |
| `/app/projects/projects` | Search and manage project records. |
| `/app/projects/projects/new` | Create a project from an accepted instruction or direct project setup. |
| `/app/projects/[id]` | View and manage a single project. |
| `/app/projects/[id]/activities` | Manage delivery activity. |
| `/app/projects/[id]/evidence` | Manage evidence, documents and deliverables. |
| `/app/projects/[id]/costs` | Review project cost, committed spend and margin indicators. |

## Reports and controls

- instruction status and ageing
- project progress and milestone slippage
- open findings and action ageing
- deliverable turnaround
- review bottlenecks
- activity volume by type and service line
- workload and completion trends by customer mix
- project cost and margin exposure

## Initial exclusions

- advanced mobile offline evidence capture
- full GIS mapping
- automated technical judgement
- full client self-service project portal
