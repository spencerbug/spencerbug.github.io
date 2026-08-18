---
layout: page
title: OpenBMC & UEFI Platform Firmware
permalink: /courses/openbmc/
---

# OpenBMC & UEFI Platform Firmware

A systems-first course on how modern server platform firmware works from standby power through host boot, operating-system runtime, remote management, recovery, and fleet-scale maintenance.

The central question is:

> What is happening across the BMC, host CPU, UEFI firmware, management buses, Linux, and the network from the moment standby power is present until a server is fully booted and remotely manageable?

This is a living course. It is intentionally broader than any one external tutorial: outside courses, documentation, questions, experiments, job descriptions, and debugging rabbit holes can all feed back into it.

## Companion learning path

One practical companion is Arm's **Simulate OpenBMC and UEFI pre-silicon on Neoverse RD-V3** learning path. It provides a concrete environment for building and running OpenBMC and UEFI together on an Arm Fixed Virtual Platform (FVP), observing host/BMC communication, using Serial over LAN, and implementing a custom IPMI command.

This course will use that material where useful, but will organize concepts around durable server-firmware mental models rather than around one platform or lab sequence.

## Course goals

By the end of the course I should be able to:

- Draw the complete server platform firmware architecture from standby power to host OS.
- Explain why the BMC is a separate computer and what remains operational when the host CPU is off.
- Trace a host boot through power sequencing, reset release, platform firmware, UEFI, bootloader, and OS.
- Explain the major UEFI execution phases and what each phase is trying to accomplish.
- Explain how OpenBMC is built from Linux, Yocto, system services, D-Bus objects, and management APIs.
- Distinguish IPMI, KCS, MCTP, PLDM, Redfish, SMBus/I2C, UART, and other host-management interfaces by layer and purpose.
- Trace host-to-BMC and BMC-to-host messages end-to-end.
- Understand sensors, FRUs, inventory, power control, thermal management, event logging, watchdogs, and recovery.
- Understand firmware update, secure boot, measured boot, attestation, rollback, and trust boundaries.
- Debug boot failures by correlating host console, BMC logs, sensors, buses, protocol traffic, and state transitions.
- Read OpenBMC source, recipes, service definitions, and D-Bus interfaces without treating the project as a black box.
- Reason about platform-firmware reliability and observability at data-center fleet scale.

## Curriculum

### Part I — Build the whole-machine mental model

1. **[Server Firmware as a System](/courses/openbmc/01-server-firmware-as-a-system/)**  
   BMC vs host, standby power, host CPU, UEFI, management network, consoles, and the full boot/management lifecycle.

2. **Power, Reset, and Boot Ownership**  
   Standby rails, power sequencing, reset domains, strap/configuration state, watchdogs, and who is allowed to turn what on.

3. **UEFI in the Server Boot Flow**  
   What UEFI replaces, firmware volumes, PEI/DXE/BDS mental models, hardware discovery, boot services, runtime services, and handoff to the OS.

### Part II — Understand the BMC as a computer

4. **BMC Hardware Architecture**  
   BMC SoC, flash, RAM, Ethernet, UARTs, GPIO, I2C/SMBus, eSPI/LPC, ADCs, fan control, watchdogs, and board-management buses.

5. **OpenBMC Linux Architecture**  
   Bootloader, kernel, device tree, userspace, systemd, services, logging, and process boundaries.

6. **Yocto and the OpenBMC Build**  
   Layers, recipes, machines, distro configuration, images, packages, bbappends, and how a platform becomes an image.

7. **D-Bus as the Internal Control Plane**  
   Objects, interfaces, properties, methods, signals, service ownership, introspection, and why so much OpenBMC functionality meets at D-Bus.

### Part III — Connect the host and BMC

8. **IPMI and KCS**  
   What IPMI defines, what KCS actually is, host/BMC request-response flow, channels, commands, and why the keyboard-controller heritage is only a register-interface lineage.

9. **MCTP**  
   Message transport, endpoints, bindings, addressing, packetization, and why modern platform management needs a transport independent of one physical bus.

10. **PLDM**  
    Platform monitoring/control, firmware update, BIOS configuration, inventory, message structure, and PLDM over MCTP.

11. **UART and Serial over LAN**  
    Physical host console, BMC bridging, remote console access, boot diagnostics, and failure modes.

12. **Redfish and External Management APIs**  
    HTTPS/REST management, resources, sessions, inventory, telemetry, actions, and how Redfish maps onto internal OpenBMC state.

### Part IV — Manage a real platform

13. **Sensors, Inventory, and FRUs**  
    Temperatures, voltages, currents, presence, EEPROMs, FRU data, inventory models, thresholds, and event generation.

14. **Thermal and Fan Control**  
    Thermal zones, fan curves, sensor failures, failsafe modes, control loops, and why cooling firmware is a safety-critical subsystem.

15. **Host Lifecycle Management**  
    Power-on/off/reset, graceful vs forced actions, boot progress, watchdog recovery, boot order, and host state machines.

16. **Firmware Update Across Components**  
    BMC image updates, BIOS/UEFI updates, CPLDs, NICs, drives, component ownership, activation, rollback, and orchestration.

### Part V — Security and resilience

17. **Platform Firmware Trust Boundaries**  
    BMC privilege, management network exposure, host isolation, credentials, secrets, debug ports, and attack surfaces.

18. **Secure Boot, Measured Boot, and Attestation**  
    Roots of trust, signature verification, TPM measurements, event logs, chain of trust, and recovery.

19. **Failure Recovery and Serviceability**  
    A/B images, watchdogs, crash capture, golden images, hardware replacement, degraded modes, and remote recovery.

### Part VI — Debug and operate at scale

20. **Debugging a Server That Will Not Boot**  
    Build a layered workflow using power state, sensors, GPIO, UART, POST/boot status, BMC journal, UEFI logs, IPMI/PLDM state, and physical buses.

21. **Observability and Fleet Reliability**  
    Telemetry, event correlation, rare failures at scale, firmware rollout, canaries, rollback, version inventory, and reproducibility.

22. **Pre-Silicon Development and FVPs**  
    Virtual platforms, firmware bring-up before hardware, host/BMC co-simulation, limitations of models, and CI opportunities.

23. **OpenBMC Code Archaeology**  
    Choose a real feature and trace it from external API through D-Bus/service code to hardware access.

24. **Capstone: Platform Failure Investigation**  
    Diagnose a deliberately broken boot/management scenario using logs, protocol traces, source, and a written root-cause report.

## Labs and mini-experiments

Labs should be layered so the course remains useful even before dedicated server hardware is available.

Candidate activities:

- Draw the BMC/host power and communication architecture for a real server or reference platform.
- Explore a running OpenBMC image: processes, systemd units, D-Bus tree, logs, network services, and device tree.
- Use `busctl` to trace a sensor or power-control object through D-Bus.
- Use `ipmitool` to issue commands and identify which transport/interface is being used.
- Trace KCS/IPMI request-response behavior in simulation or source.
- Enumerate MCTP endpoints and inspect PLDM messages where the platform supports them.
- Follow a Redfish request from HTTP endpoint to D-Bus state.
- Modify an OpenBMC service or add a small custom management command.
- Build OpenBMC with Yocto and identify the recipes that contribute a chosen feature.
- Run the Arm RD-V3 OpenBMC/UEFI FVP and correlate BMC and host boot logs.
- Break a service, sensor path, or boot dependency and diagnose it systematically.
- Build a small host/BMC protocol simulator if hardware access becomes a bottleneck.

## Course method

Each lesson should prefer:

1. A whole-system diagram first.
2. A concrete question or failure scenario.
3. The hardware view.
4. The firmware/software view.
5. The protocol/data structures involved.
6. A sequence diagram for cross-component interactions.
7. Observable commands, logs, or source paths.
8. Failure modes and debugging strategy.
9. A short knowledge check.
10. A mini-experiment or lab when practical.

Unanswered questions and plausible learner hypotheses should be preserved rather than prematurely collapsed into memorized facts. Later lessons can revisit them when the relevant mechanism has actually been taught.

## External-course integration

When working through the Arm RD-V3 path, useful observations should feed back into this course:

- terminology that needs expansion,
- architecture diagrams that are missing,
- commands worth keeping as durable references,
- confusing abstractions that need deeper explanation,
- real boot logs or protocol traces,
- and questions that reveal a useful detour.

The external path is therefore a lab source and reality check; this repository remains the canonical personalized textbook.
