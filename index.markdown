---
layout: page
title: Systems Coursework
permalink: /
---

# Systems Coursework

This site is my living textbook for low-level systems engineering.

The goal is not to collect notes. It is to build durable mental models, connect hardware and software behavior, and turn each course into hands-on work that can survive an interview, a debugging session, or a real production system.

## Courses

### [NIC Firmware Engineering](/courses/nic-firmware/)
**Active course.** A ground-up study of the network interface card as a complete system: packet paths, Ethernet hardware, DMA, descriptor rings, interrupts, Linux drivers, multiqueue, RSS, PCIe, kernel bypass, RDMA, and SmartNIC/DPU architecture.

### OpenBMC & Platform Firmware
Planned. BMC architecture, OpenBMC services, Yocto integration, Redfish, IPMI, host management, security, update systems, and fleet-scale reliability.

### Performance & Cache Optimization
Planned. Caches, TLBs, memory ordering, atomics, NUMA, prefetching, branch prediction, data-oriented design, profiling, and low-latency optimization.

## How I use this site

Each course is built around a repeated loop:

1. Build the mental model.
2. Follow real data through the system.
3. Connect hardware behavior to software abstractions.
4. Study failure modes and debugging techniques.
5. Measure performance implications.
6. Answer interview-style questions.
7. Implement a lab or experiment.
8. Fold new questions back into the textbook.

## [Blog](/blog/)

The blog remains separate from the coursework. It is for technical write-ups, project retrospectives, experiments, and ideas that are worth publishing but do not belong in the linear curriculum.
