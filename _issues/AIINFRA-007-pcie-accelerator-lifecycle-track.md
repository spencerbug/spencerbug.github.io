---
title: Build the PCIe and accelerator lifecycle track
issue_id: AIINFRA-007
summary: Extend PCIe fundamentals into accelerator discovery, initialization, isolation, telemetry, reset, firmware update, and failure recovery.
status: backlog
priority: P1
type: curriculum
area: pcie
effort: XL
depends_on: [AIINFRA-002]
labels: [pcie, accelerators, serviceability]
created: 2026-09-13
updated: 2026-09-13
---

## Outcome

A learner can follow a GPU, accelerator, NIC, or DPU from physical presence through enumeration and fleet readiness, then diagnose common cross-layer failures.

## Deliverables

- Reuse PCIe foundations already introduced in the NIC course.
- Cover topology, switches, retimers, link training, enumeration, BARs, DMA, IOMMU, interrupts, error reporting, resets, and hot-plug.
- Connect firmware ownership and update paths across the host, BMC, and device.
- Add failure trees for missing, degraded, wedged, and mismatched devices.

## Acceptance criteria

- [ ] The track separates standardized PCIe mechanisms from platform-specific orchestration.
- [ ] Each lifecycle phase names the responsible component and observable evidence.
- [ ] At least one lab inspects a real or simulated PCIe topology and error state.
- [ ] The material leads naturally into device attestation and fleet serviceability.
