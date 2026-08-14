---
layout: page
title: "03 — Cache Lines, Sets, and Associativity"
permalink: /courses/performance-cache/03-cache-structure/
---

# 03 — Cache Lines, Sets, and Associativity

Once a virtual address has been translated, the processor still needs to determine whether the requested data is already close to the core.

CPU caches make that lookup fast by storing memory in fixed-size **cache lines** arranged into **sets** and **ways**.

## Cache lines

Caches do not normally fetch one C variable at a time. They move fixed-size blocks of neighboring memory.

A load of a few bytes can therefore bring an entire cache line into the hierarchy.

That creates **spatial locality**: nearby future accesses may hit because they arrived with an earlier demand load.

## Address decomposition

A useful conceptual cache address is:

```text
|              tag              | set index | line offset |
```

### Line offset

Chooses the byte inside the selected cache line.

### Set index

Chooses which cache set must be searched.

### Tag

Distinguishes the memory blocks that can occupy the selected set.

The key insight is that an address does not get to search the entire cache. It maps to a particular set.

## Set associativity

In a direct-mapped cache, each memory block has only one possible slot.

In an N-way set-associative cache, each set has N candidate ways.

Conceptually:

```text
set 0: [way 0] [way 1] ... [way N-1]
set 1: [way 0] [way 1] ... [way N-1]
set 2: [way 0] [way 1] ... [way N-1]
...
```

When an address maps to a set, its tag is compared against the tags in the ways belonging to that set.

If one matches and the line is valid, the access hits.

## Why associativity matters

Suppose a cache is large enough to hold a working set in total, but many hot addresses map to the same set.

If more simultaneously useful lines compete for that set than there are ways, lines must repeatedly evict one another.

That is a **conflict miss** problem.

This means:

> "My working set fits in the cache" is not enough to guarantee good cache behavior.

Address mapping and access pattern matter.

## A useful conflict experiment

One way to expose associativity is to access addresses separated by the amount of memory corresponding to one full rotation through all cache sets.

That keeps the set-index bits constant while changing higher tag bits, forcing multiple lines to compete within one set.

For example, with a 32 KiB, 8-way cache using 64-byte lines:

```text
number of cache lines = 32 KiB / 64 B = 512
number of sets        = 512 / 8 = 64
set span              = 64 sets × 64 B = 4096 B
```

Addresses separated by 4 KiB can therefore be useful for deliberately creating same-set pressure in this illustrative geometry.

The actual cache geometry should be verified on the machine being measured.

## Types of cache misses

### Compulsory

The line has not been brought into the cache yet.

### Capacity

The active working set exceeds the useful cache capacity.

### Conflict

Multiple useful lines map to the same set and exceed its associativity.

### Coherence-related

Another core's writes can invalidate or take ownership of a line, causing later accesses to miss or incur coherence traffic even when the total working set is small.

## Cache hierarchy

A simplified hierarchy is:

```text
core
 ↓
L1 data cache
 ↓
L2 cache
 ↓
L3 / LLC
 ↓
DRAM
```

L1 is generally the smallest and fastest. Lower levels trade latency for larger capacity.

The exact organization varies: some levels may be private per core, others shared, and inclusion policies differ by microarchitecture.

## Temporal and spatial locality

### Temporal locality

If data was used recently, it may be used again soon.

Caches exploit this by retaining recently useful lines.

### Spatial locality

If one address is used, nearby addresses may be used soon.

Cache-line fetches and hardware prefetchers exploit this behavior.

## Pointer chasing

Randomized pointer chasing is useful because each load reveals the address of the next load.

```c
p = p->next;
p = p->next;
p = p->next;
```

The dependent chain limits memory-level parallelism. The CPU cannot freely issue many independent future loads because the next address does not exist architecturally until the current load returns.

If the chain is randomized, ordinary sequential prefetching also becomes much less effective.

This makes pointer chasing a good tool for exposing latency across cache-size transitions.

## Hardware prefetchers

Prefetchers observe access patterns and try to bring future lines into the cache before demand instructions need them.

They tend to help with:

- sequential scans;
- predictable strides;
- repeated regular patterns.

They tend to have more difficulty with:

- randomized pointer chasing;
- data-dependent addresses;
- irregular graph traversal;
- patterns that change frequently.

This matters when designing benchmarks. A sequential scan can measure an impressively low apparent cost even when the working set exceeds cache capacity because hardware is overlapping and prefetching memory traffic.

## Why cache optimization is often data-structure optimization

Many performance problems are really layout problems:

- hot fields are spread across too many cache lines;
- cold metadata is interleaved with hot data;
- pointer-heavy structures destroy spatial locality;
- adjacent thread-owned state causes false sharing;
- arrays are traversed in an order that fights the cache hierarchy;
- working sets map badly to limited associativity.

A performance engineer therefore needs to think about the physical access pattern produced by an abstraction, not just its algorithmic complexity.

## Knowledge check

1. Why does an address map to a set rather than search the entire cache?
2. What is the role of the tag?
3. How can a working set smaller than the cache still suffer heavy misses?
4. What is the difference between capacity and conflict misses?
5. Why can a sequential scan hide DRAM latency?
6. Why is a randomized dependent pointer chain useful for latency measurement?
7. Why can changing data layout improve speed without changing the algorithm?

## Durable ideas

- Caches move lines, not individual variables.
- Cache addresses can be reasoned about as tag + set index + line offset.
- Associativity limits how many useful lines mapping to one set can coexist.
- Cache capacity alone does not predict hit rate.
- Access pattern determines locality and prefetch effectiveness.
- Pointer chasing exposes dependency and memory latency.

[Previous: Virtual Memory, TLBs, and Page Walks](/courses/performance-cache/02-virtual-memory/) · [Next: Coherence, False Sharing, and Memory Ordering](/courses/performance-cache/04-coherence-ordering/)
