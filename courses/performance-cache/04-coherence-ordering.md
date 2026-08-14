---
layout: page
title: "04 — Coherence, False Sharing, and Memory Ordering"
permalink: /courses/performance-cache/04-coherence-ordering/
---

# 04 — Coherence, False Sharing, and Memory Ordering

Caches become more complicated once multiple cores can hold copies of the same memory.

The central problem is simple:

> If one core writes a cache line, what are other cores allowed to see, and when?

Two related but different mechanisms matter here:

- **cache coherence** keeps per-core cache copies logically consistent;
- **memory ordering** defines which ordering of loads and stores software is allowed to observe.

## Cache coherence

Modern multicore CPUs commonly use coherence protocols described with MESI- or MOESI-like states.

The exact implementation varies, but the useful mental model is that each cache line carries state describing whether it is:

- shared with other cores;
- exclusively held;
- modified relative to memory;
- invalid;
- or, on some protocols, owned in another intermediate state.

The point is not memorizing letters. The important idea is **ownership of a writable cache line**.

## Why writes create traffic

Two cores can often read the same clean line simultaneously.

But if one core wants to modify that line, the coherence system must ensure that other cores do not continue using stale writable copies.

Conceptually:

```text
Core A cache: Shared
Core B cache: Shared

Core A wants to write
        ↓
request exclusive ownership
        ↓
Core B's copy invalidated
        ↓
Core A can modify line
```

If Core B then wants to write the same line, ownership can move back in the other direction.

This repeated movement is sometimes called **cache-line ping-pong**.

## False sharing

False sharing occurs when two threads modify different variables that happen to occupy the same cache line.

For example:

```c
struct counters {
    atomic_uint64_t a;
    atomic_uint64_t b;
};
```

Suppose Core A repeatedly updates `a` and Core B repeatedly updates `b`.

At the source-code level the variables are independent.

At the coherence level they may be the same object: one cache line.

```text
cache line
┌────────────────────────────────────┐
│ counter a │ counter b │ other data │
└────────────────────────────────────┘
     ↑             ↑
   Core A        Core B
```

Every write can require ownership of the entire line, so the line bounces between cores even though neither thread is logically sharing the other's variable.

Padding or separating frequently written per-thread data onto different cache lines can remove this contention.

## Why false sharing is so important

False sharing explains why code can scale poorly even when:

- there are no locks;
- threads update different variables;
- the dataset is tiny;
- the data fits in cache;
- each operation is only a simple increment.

A cache hit is not automatically cheap if acquiring ownership requires coherence traffic.

## Store buffers

Processors do not necessarily wait for a store to become globally visible before continuing execution.

A **store buffer** lets the core hold pending writes while later instructions proceed.

This improves performance because otherwise stores could frequently stall the pipeline while coherence and cache machinery complete.

But it also means the order in which memory operations become visible to other cores may differ from the simple source-code ordering a programmer imagines.

## Memory ordering

A processor architecture defines which reorderings are permitted and which observations must remain impossible.

Compilers also transform code, so concurrent software must satisfy both compiler and hardware ordering rules.

Synchronization operations constrain those reorderings.

## Atomics

An atomic operation guarantees that other threads do not observe a torn or partially completed modification of the atomic object.

But atomicity alone does not necessarily imply the strongest possible ordering for unrelated memory operations.

This is why languages such as C and C++ expose different memory orders.

## Relaxed ordering

A relaxed atomic operation preserves atomicity for the atomic object but asks for minimal synchronization ordering around other memory.

This is useful for operations such as independent statistics counters where the numeric update must not tear, but the counter does not publish other state.

## Acquire and release

A common synchronization pattern is:

```text
producer:
write ordinary data
release-store ready = true

consumer:
acquire-load ready
read ordinary data
```

The release operation prevents earlier relevant writes from being reordered past publication. The acquire operation prevents later relevant reads from being reordered before successful observation of that publication.

Together they create the ordering relationship required to safely hand data from one thread to another.

## Fences

A fence constrains ordering without necessarily performing the data access that communicates between threads.

Fences are useful in specialized synchronization patterns, low-level drivers, MMIO, DMA coordination, and architecture-specific code, but they should be used with a clear model of the ordering problem being solved.

Adding fences blindly can hide bugs or destroy performance without establishing the intended synchronization relationship.

## Coherence is not the same as consistency

This distinction is useful:

**Coherence** concerns the history of an individual memory location/cache line across cores.

**Memory consistency / ordering** concerns what combinations and orderings of operations across multiple memory locations may be observed.

A system can keep a single cache line coherent while still permitting loads and stores to different addresses to become visible in an order that surprises a programmer who assumed strict sequential execution.

## Why this matters for systems work

These concepts appear directly in:

- lock-free SPSC queues;
- producer/consumer rings;
- NIC descriptor ownership;
- interrupt and polling handoff;
- DMA buffers;
- MMIO register programming;
- per-CPU statistics;
- shared state in high-throughput servers.

Performance and correctness meet at the same boundary: ownership and visibility of memory.

## A false-sharing experiment

A useful microbenchmark compares two versions of per-thread counters.

### Version A — same cache line

```text
[counter A][counter B]
```

Two pinned threads repeatedly increment their own counters.

### Version B — separated cache lines

```text
[counter A][padding ........]
[counter B][padding ........]
```

If the first version is substantially slower, the difference exposes coherence traffic rather than algorithmic complexity.

Using relaxed atomics for the counters isolates the cache-line ownership effect while avoiding unnecessary stronger synchronization.

## Common mistakes

### "Different variables means no sharing"

False. Coherence operates at cache-line granularity.

### "Atomic means globally ordered"

Not necessarily. Atomicity and ordering strength are separate properties.

### "If everything fits in L1, synchronization is free"

No. A line may need to move between cores before a write can proceed.

### "A fence flushes the whole cache"

That is not the right mental model. Fences constrain ordering; cache maintenance is a different mechanism.

## Knowledge check

1. Why can two independent counters contend with each other?
2. What does a core generally need before modifying a line shared with another core?
3. What problem does a store buffer solve?
4. Why can relaxed atomics be appropriate for statistics counters?
5. What relationship do release and acquire operations establish?
6. How is coherence different from memory ordering?
7. Why are these concepts important to NIC descriptor rings and lock-free queues?

## Durable ideas

- Coherence works at cache-line granularity.
- Writable cache-line ownership may move between cores.
- False sharing is contention caused by layout rather than logical data sharing.
- Store buffers are a performance mechanism that also affects visibility reasoning.
- Atomicity does not automatically mean strongest ordering.
- Acquire/release is a common way to publish and consume shared state safely.
- Correct low-level performance work requires reasoning about both locality and visibility.

[Previous: Cache Lines, Sets, and Associativity](/courses/performance-cache/03-cache-structure/) · [Back to Performance & Cache Optimization](/courses/performance-cache/)
