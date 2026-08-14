---
layout: page
title: Performance & Cache Optimization
permalink: /courses/performance-cache/
---

# Performance & Cache Optimization

A systems-first course on understanding where CPU time goes when software touches memory, and how to turn that understanding into practical performance work.

The organizing question is deliberately concrete:

> When the CPU executes a load such as `mov eax, [buffer + 1234]`, what has to happen before the value arrives in a register?

The course starts with that single load and expands outward into virtual memory, the TLB, page walks, cache indexing, cache misses, DRAM, coherence, prefetching, memory ordering, atomics, NUMA, and profiling.

This is a living course. The sections below reflect material already covered and will be expanded as study continues.

## Course goals

By the end of this course I should be able to:

- Trace a load from instruction execution to virtual-address translation and the memory hierarchy.
- Distinguish a TLB miss, cache miss, and page fault.
- Explain page tables, page-table walks, and the role of the TLB.
- Reason about cache lines, sets, tags, associativity, and conflict misses.
- Predict when access patterns will defeat or help hardware prefetchers.
- Explain why cache coherence exists and how false sharing creates performance problems.
- Reason about store buffers, memory ordering, atomics, and fences.
- Build microbenchmarks that isolate latency, cache conflicts, and coherence effects.
- Use these mental models to optimize real embedded, networking, and infrastructure software.

## Covered so far

### Part I — Trace one load

1. **[Tracing a Load Request](/courses/performance-cache/01-tracing-a-load-request/)**  
   Address generation → TLB → page walk if necessary → L1/L2/L3 → DRAM, with page faults handled as a separate translation/protection event.

### Part II — Translate addresses

2. **[Virtual Memory, TLBs, and Page Walks](/courses/performance-cache/02-virtual-memory/)**  
   Pages and frames, multi-level page tables, CR3, page-table entries, TLB hits and misses, demand-zero, copy-on-write, file-backed mappings, and page faults.

### Part III — Find the cache line

3. **[Cache Lines, Sets, and Associativity](/courses/performance-cache/03-cache-structure/)**  
   Cache lines, offset/set/tag decomposition, set associativity, replacement pressure, spatial locality, conflict misses, pointer chasing, and prefetching.

### Part IV — Multiple CPUs touch the same memory

4. **[Coherence, False Sharing, and Memory Ordering](/courses/performance-cache/04-coherence-ordering/)**  
   MESI/MOESI mental models, ownership of writable cache lines, false sharing, store buffers, ordering, atomics, acquire/release, and fences.

## Next topics

These are natural continuations, but are not marked as completed material yet:

- Measuring cache and TLB behavior with hardware performance counters.
- NUMA topology and memory placement.
- DDIO and device DMA interactions with CPU caches.
- Branch prediction and speculative execution in more depth.
- Data-oriented layout and hot/cold splitting.
- Lock-free queue performance and cache-line ownership.
- Latency distributions, tail latency, and benchmark design.

## Course method

Each lesson should answer four questions:

1. **What is the hardware trying to accomplish?**
2. **What state does it consult?**
3. **What happens on the fast path?**
4. **What happens when the fast path fails?**

Where possible, concepts should be paired with a microbenchmark or debugging experiment so that the hardware model becomes observable rather than purely theoretical.
