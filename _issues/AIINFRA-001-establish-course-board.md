---
title: Establish the repository-backed course board
issue_id: AIINFRA-001
summary: Create a durable ticket schema and a public board that evolves with the specialization.
status: done
priority: P0
type: infrastructure
area: specialization
effort: M
depends_on: []
labels: [planning, site]
created: 2026-09-13
updated: 2026-09-13
---

## Outcome

Course-scale work can be planned as durable Markdown tickets and viewed as a board on the public site.

## Why it matters

The specialization spans several existing courses, new lessons, labs, source reviews, and outside interviews. Browser annotations remain useful for revising a single page, but they are too local and fine-grained to hold the cross-course roadmap.

## Deliverables

- A Jekyll `issues` collection with stable ticket URLs.
- A documented front-matter schema.
- A responsive board grouped by workflow status.
- Seed tickets for the first specialization backlog.

## Acceptance criteria

- [x] Ticket files render as readable detail pages.
- [x] The board derives its cards from front matter rather than duplicated data.
- [x] Status, priority, type, area, effort, and dependencies are visible.
- [x] The schema and workflow are documented in `AGENTS.md`.
