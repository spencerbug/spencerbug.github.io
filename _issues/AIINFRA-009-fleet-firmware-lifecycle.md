---
title: Build the fleet firmware lifecycle track
issue_id: AIINFRA-009
summary: Teach inventory, compatibility, staged rollout, observability, rollback, repair, and retirement across heterogeneous components.
status: backlog
priority: P1
type: curriculum
area: fleet-operations
effort: XL
depends_on: [AIINFRA-002, AIINFRA-004]
labels: [fleet, update, reliability]
created: 2026-09-13
updated: 2026-09-13
---

## Outcome

Learners can reason about firmware as a continuously managed fleet state rather than a collection of image files installed one device at a time.

## Deliverables

- Define desired-state inventory, compatibility matrices, rollout cohorts, gates, and evidence.
- Cover canaries, health signals, rollback, power-loss safety, anti-rollback, and recovery images.
- Address BMC, host firmware, NIC/DPU, accelerator, switch, drive, and CPLD coordination.
- Develop observability and incident-analysis examples for rare failures at scale.

## Acceptance criteria

- [ ] Update safety is expressed as explicit invariants and state transitions.
- [ ] Version compliance is not confused with device health or authenticity.
- [ ] The workflow covers partial failure and mixed-version operation.
- [ ] A lab simulates cohort rollout, a bad health signal, halt, and rollback.
