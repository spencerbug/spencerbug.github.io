---
title: Define the specialization architecture and outcomes
issue_id: AIINFRA-002
summary: Turn the broad AI-infrastructure domain into a coherent dependency graph with explicit learner outcomes.
status: in-progress
priority: P0
type: curriculum
area: specialization
effort: XL
depends_on: []
labels: [curriculum, architecture]
created: 2026-09-13
updated: 2026-09-13
---

## Outcome

A specialization map explains what an AI infrastructure firmware engineer should understand, build, debug, and defend—and how the existing courses combine to teach it.

## Why it matters

OpenBMC, UEFI, PCIe, NIC firmware, RDMA, host assurance, supply-chain security, and fleet operations are connected parts of one platform. A simple list of technologies would hide the causal paths and prerequisites that make the material useful.

## Deliverables

- Define the intended learner and assumed embedded-Linux background.
- Define system-model, debugging, security, performance, and operational outcomes.
- Map prerequisites and shared concepts across tracks.
- Separate core material from optional depth and vendor-specific examples.
- Decide which existing course owns each concept to avoid duplication.

## Acceptance criteria

- [ ] Every core track has explicit entry and exit knowledge.
- [ ] The map identifies cross-track prerequisites and capstone dependencies.
- [ ] Existing OpenBMC, NIC, and performance lessons have clear roles.
- [ ] Planned material is visibly distinct from completed material.

## Notes

The organizing principle should be the lifecycle of real infrastructure: manufacture and onboarding, boot, discovery, provisioning, operation, update, failure, recovery, and retirement.
