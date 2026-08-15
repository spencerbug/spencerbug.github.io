---
layout: page
title: NIC Firmware Engineering
permalink: /courses/nic-firmware/
---

# NIC Firmware Engineering

A graduate-style, systems-first course on network interface card firmware and driver architecture.

The central question throughout the course is:

> What exactly happens to a packet as it moves between the wire, the NIC, PCIe, host memory, the operating system, and application software?

Rather than learning Ethernet, PCIe, DMA, interrupts, caches, Linux drivers, and RDMA as isolated technologies, this course treats them as parts of one connected machine.

## Course goals

By the end of this course I should be able to:

- Trace TX and RX packets end-to-end through hardware and software.
- Explain the responsibilities of PHY, MAC, NIC datapath logic, firmware, PCIe, DMA engines, and host drivers.
- Reason about descriptor rings, ownership, producer/consumer indices, queue state, and memory visibility.
- Explain how PCIe transactions and DMA interact with physical memory, IOMMUs, caches, and NUMA.
- Understand interrupt delivery through MSI/MSI-X and why high-performance drivers combine interrupts with polling and batching.
- Read and navigate a production Linux NIC driver.
- Explain multiqueue NICs, RSS, queue steering, interrupt affinity, and CPU scaling.
- Debug dropped packets, stalled queues, DMA failures, interrupt problems, and link problems systematically.
- Connect conventional NIC architecture to kernel bypass, RDMA, SmartNICs, and DPUs.
- Build labs that demonstrate these concepts rather than merely describe them.

## Curriculum

### Part I — Build the complete packet-path mental model

1. **[The NIC as a System](/courses/nic-firmware/01-nic-as-a-system/)**  
   Establish the complete RX/TX path and define the major components before diving into details.

2. **[Ethernet from Wire to MAC](/courses/nic-firmware/02-ethernet-wire-to-mac/)**  
   PHY, PCS, PMA, SerDes, MDI, link negotiation, framing, FCS, and MAC responsibilities.

3. **PCIe for NIC Engineers**  
   Enumeration, BARs, MMIO, transactions, bus mastering, ordering, and the NIC as a PCIe endpoint.

### Part II — Move data

4. **DMA Fundamentals**  
   Why DMA exists, bus mastering, host memory addresses, IOMMUs, scatter/gather, and coherency.

5. **Descriptor Rings**  
   RX/TX descriptors, ownership, producer/consumer state, head/tail registers, wraparound, and starvation.

6. **Transmit Path Deep Dive**  
   From `send()` to descriptors, DMA reads, offloads, MAC transmission, and completion cleanup.

7. **Receive Path Deep Dive**  
   Buffer provisioning, DMA writes, completion notification, packet construction, and buffer recycling.

### Part III — Coordinate CPUs and hardware

8. **Interrupts: INTx, MSI, and MSI-X**  
   Interrupt delivery, vectors, queue mapping, affinity, moderation, and interrupt storms.

9. **Polling, NAPI, and Batching**  
   Why packet processing changes modes under load and how batching trades latency for throughput.

10. **Memory Ordering and NIC Drivers**  
    DMA visibility, barriers, MMIO ordering, ownership transitions, and races between device and CPU.

### Part IV — Scale the datapath

11. **Multiqueue NIC Architecture**  
    Parallel RX/TX queues, per-CPU processing, queue selection, and contention reduction.

12. **RSS and Packet Steering**  
    Hashing, indirection tables, flow affinity, RPS/RFS/XPS, and queue distribution.

13. **Caches, NUMA, and Packet Performance**  
    Cache lines, false sharing, descriptor locality, DMA placement, DDIO, NUMA locality, and CPU affinity.

### Part V — Production driver engineering

14. **Anatomy of a Linux NIC Driver**  
    `probe`, PCI resources, `net_device`, rings, NAPI, IRQ setup, start/stop paths, and statistics.

15. **Link Management and PHY Control**  
    MDIO, PHY registers, phylib/phylink, autonegotiation, link state, and debugging.

16. **Offloads**  
    Checksum offload, TSO/GSO, LRO/GRO, VLAN acceleration, timestamping, and tradeoffs.

17. **Debugging NIC Failures**  
    Register state, ring dumps, counters, `ethtool`, packet captures, tracepoints, and failure isolation.

### Part VI — Beyond the conventional kernel datapath

18. **Kernel Bypass and DPDK**  
    Poll-mode drivers, huge pages, userspace queues, zero-copy goals, and the cost of the kernel path.

19. **RDMA and RoCE**  
    Queue pairs, completion queues, memory registration, RNIC responsibilities, and lossless-network assumptions.

20. **SmartNICs, DPUs, and Infrastructure Firmware**  
    Embedded control processors, programmable datapaths, isolation, telemetry, security, and hyperscaler use cases.

## Labs

Labs will be added alongside the course. Candidate projects include:

- Inspecting and diagramming a real Linux NIC driver's descriptor lifecycle.
- Building a software descriptor-ring simulator with explicit ownership transitions.
- Measuring interrupt moderation and NAPI behavior under load.
- Mapping RSS queues to CPUs and observing cache/NUMA effects.
- Writing a minimal userspace packet-ring model to explore batching and cache layout.
- Capturing and correlating packets, driver statistics, queue state, and CPU activity during induced failures.

## Course method

Each lesson should eventually contain:

1. Why the topic matters.
2. A simple mental model.
3. Hardware view.
4. Software/driver view.
5. One end-to-end packet walk.
6. Important data structures and registers.
7. Failure modes.
8. Debugging workflow.
9. Performance implications.
10. Interview questions.
11. Knowledge checks.
12. A lab or experiment.
13. A short list of durable ideas worth remembering.

The course is intentionally iterative. Questions that expose weak explanations should become edits to the relevant lesson.
