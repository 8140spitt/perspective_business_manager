# Perspective Business Manager Architecture

## Vision

Perspective Business Manager is an enterprise platform built around a canonical business model rather than application modules.

Applications, workspaces and industry solutions are views over the same enterprise objects.

## Architectural Principles

1. No table without a business object.
2. No module owns data.
3. Workflow is metadata.
4. Events are immutable.
5. Documents attach to business objects.
6. Every major object is auditable.
7. Industry solutions extend the platform core.

## Current Platform Layers

### Foundation Layer

- Party
- Address
- Contact Method
- Location
- Reference Data
- User
- Role
- Team

### Core Business Layer

- Client Account
- Instruction
- Property
- Project
- Deliverable
- Fee Agreement
- Sales Invoice

### Workflow Layer

- Workflow Definition
- Workflow State
- Workflow Transition
- Workflow Action
- Workflow Instance
- Workflow Instance State

### Event Layer

- Business Event

## Canonical Enterprise Model

```text
Party
  -> Client
    -> Contract / Instruction
      -> Activity
        -> Observation
          -> Assessment
            -> Action
              -> Outcome
```

Supporting all layers:

```text
Workflow
Event
Document
Evidence
```

## Migration Roadmap

### 001 Core Foundation
Completed

### 002 Core Business Objects
Completed

### 003 Workflow & Events
Completed

### 004 Activity Management Engine
Planned

Proposed objects:

- Activity
- Activity Area
- Observation
- Assessment
- Action
- Outcome
- Outcome Revision
- Evidence Item

### 005 Work Management
Planned

- Work Item
- Task
- Assignment
- Resource Allocation

### 006 Document & Records
Planned

### 007 Finance Engine
Planned

### 008 Reporting & Analytics
Planned

## Package Extension Model

Platform Core:

```text
@perspective/core
```

Industry Packages:

```text
@perspective/rics
@perspective/engineering
@perspective/quality
@perspective/risk
@perspective/compliance
```

Industry packages extend workflows, activity types, assessments, actions and reporting without modifying the platform core.
