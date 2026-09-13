---
title: Connect NIC firmware and RDMA to AI infrastructure
issue_id: AIINFRA-008
summary: Continue the active NIC course into RDMA, congestion, isolation, telemetry, and accelerator-oriented data paths.
status: in-progress
priority: P1
type: curriculum
area: networking
effort: XL
depends_on: [AIINFRA-002]
labels: [nic, rdma, roce, dpu]
created: 2026-09-13
updated: 2026-09-13
---

## Outcome

The NIC firmware course becomes the specialization's data-plane track, connecting packet movement fundamentals to the network behavior and device responsibilities of distributed AI workloads.

## Deliverables

- Complete DMA, rings, interrupts/NAPI, ordering, multiqueue, RSS, NUMA, driver, and failure-analysis lessons.
- Add RDMA queue pairs, completion queues, memory registration, protection, and verbs-to-hardware traces.
- Teach congestion and loss behavior without reducing RoCE to a checklist of switch settings.
- Cover SmartNIC/DPU management, isolation, update, and telemetry boundaries.

## Acceptance criteria

- [ ] A learner can trace a transfer from application memory through RNIC hardware and the fabric.
- [ ] Host software, NIC firmware, programmable datapath, and network control responsibilities are distinct.
- [ ] Performance claims are paired with measurements or reproducible experiments.
- [ ] The track connects to PCIe, security, fleet update, and capstone tickets.

## Notes

The first three [NIC Firmware Engineering](/courses/nic-firmware/) lessons are already published.
