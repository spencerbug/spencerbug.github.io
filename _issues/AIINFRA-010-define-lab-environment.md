---
title: Define the specialization lab environment
issue_id: AIINFRA-010
summary: Select accessible simulations, commodity hardware, traces, and evidence artifacts that make the system models observable.
status: ready
priority: P0
type: lab
area: specialization
effort: M
depends_on: [AIINFRA-002]
labels: [labs, simulation, tooling]
created: 2026-09-13
updated: 2026-09-13
---

## Outcome

Each core track has practical exercises that can run without privileged access to a hyperscaler lab or proprietary rack.

## Deliverables

- Inventory useful virtual platforms, emulators, open firmware, Linux observability tools, and low-cost hardware.
- Define a common evidence bundle: logs, inventory, bus/protocol traces, measurements, state snapshots, and root-cause reports.
- Separate quick browser/desktop exercises from long builds and hardware-dependent labs.
- Establish reproducibility, cleanup, and expected-output conventions.

## Acceptance criteria

- [ ] Every P0 track has at least one accessible lab path.
- [ ] Labs teach how evidence supports a conclusion, not merely which commands to type.
- [ ] Long build or hardware requirements are disclosed before the exercise.
- [ ] Artifacts can be reviewed independently of the learner's machine.
