---
title: Expand the OpenBMC and UEFI core track
issue_id: AIINFRA-004
summary: Continue the existing whole-machine course from its first lesson through host management and fleet operations.
status: in-progress
priority: P0
type: curriculum
area: openbmc
effort: XL
depends_on: [AIINFRA-002]
labels: [openbmc, uefi, redfish]
created: 2026-09-13
updated: 2026-09-13
---

## Outcome

The existing OpenBMC and UEFI course becomes the management-controller and host-boot backbone of the specialization.

## Why it matters

This track establishes the control plane for power, boot, sensors, inventory, recovery, and external management. Later security and fleet lessons depend on a precise model of the BMC/host boundary.

## Deliverables

- Continue the current curriculum in prerequisite order.
- Cover power and reset ownership, UEFI phases, OpenBMC Linux, Yocto, D-Bus, IPMI/KCS, MCTP/PLDM, Redfish, updates, and recovery.
- Add source-reading and simulated-platform labs.
- Tie protocol explanations to observable commands, logs, and state transitions.

## Acceptance criteria

- [ ] Each lesson has a focused system trace and an interactive knowledge check.
- [ ] Protocol layers are distinguished from physical bindings and implementation services.
- [ ] Labs can be completed without requiring access to a production server fleet.
- [ ] The track feeds the security, assurance, and capstone work without duplicating them.

## Notes

The first lesson, [Server Firmware as a System](/courses/openbmc/01-server-firmware-as-a-system/), is already published.
