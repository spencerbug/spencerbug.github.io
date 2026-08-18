---
layout: page
title: Courses
permalink: /courses/
---

# Courses

These courses are living documents. They are expected to change as my understanding improves, as labs expose gaps, and as new questions reveal better ways to explain the material.

## Active

### [NIC Firmware Engineering](/courses/nic-firmware/)

A systems-level course on how modern NICs move packets between wire, device, PCIe, memory, kernel, and application software.

The emphasis is on the boundary between hardware and firmware/software: DMA engines, queues, descriptor ownership, interrupts, PCIe transactions, cache behavior, multiqueue scaling, driver architecture, and debugging.

### [Performance & Cache Optimization](/courses/performance-cache/)

A systems-first course organized around tracing memory accesses end-to-end: virtual address generation, TLBs and page walks, cache lines and associativity, DRAM, coherence, prefetching, memory ordering, atomics, and performance experiments.

The goal is to connect CPU architecture to practical optimization rather than treating caches, virtual memory, concurrency, and profiling as isolated topics.

### [OpenBMC & UEFI Platform Firmware](/courses/openbmc/)

A systems-first course on server management and boot firmware: BMC hardware, OpenBMC Linux, Yocto, D-Bus, Redfish, IPMI/KCS, MCTP/PLDM, UEFI, power sequencing, firmware update, security, debugging, and fleet-scale reliability.

The course uses external material such as Arm's RD-V3 OpenBMC/UEFI learning path as a practical companion while keeping this repository as the canonical personalized textbook.
