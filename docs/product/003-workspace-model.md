# 003 Workspace model

A PBM workspace is a clear place for a user to do a business job.

A workspace is not a database boundary. It is not a legacy software module. It is a user-facing doorway into the shared business data spine.

## Workspace rule

A workspace should answer:

- Who works here?
- What job are they doing?
- Which business objects do they use?
- Which records do they create or update?
- Which other workspaces use the same records?

## Core workspaces

PBM uses these primary workspaces:

- Business Setup
- People & Workforce
- Clients & Commercial
- Project Delivery
- Procurement, Materials & Logistics
- Operations & Planning
- Finance & Control
- Quality & Compliance
- Assets, Property & Maintenance
- Reporting, Documents & Admin

## Route principle

Routes follow the user's job.

Examples:

- Finance users manage project-linked invoices in Finance & Control.
- Project users see project cost and billing context in Project Delivery.
- Procurement users manage supplier commitments in Procurement, Materials & Logistics.
- Reporting reads across all workspaces.

The same record can be surfaced in more than one workspace when the business job is different.

## Navigation principle

The navigation should never expose every possible capability at once.

The main navigation shows workspaces. Each workspace shows capabilities. Each capability leads to activity pages.

Workspace -> Capability -> Activity -> Record
