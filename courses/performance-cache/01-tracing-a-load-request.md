---
layout: page
title: "01 — Tracing a Load Request"
permalink: /courses/performance-cache/01-tracing-a-load-request/
---

# 01 — Tracing a Load Request

Consider a load such as:

```asm
mov eax, [buffer + 1234]
```

The useful mental model is not simply "the CPU reads memory." A load crosses several different mechanisms, each solving a different problem.

At a high level:

```text
instruction
    ↓
address generation
    ↓
virtual address
    ↓
TLB lookup
    ↓
physical address
    ↓
L1 data cache
    ↓ miss
L2 cache
    ↓ miss
Last-level cache
    ↓ miss
memory controller / DRAM
    ↓
cache line returns toward the core
    ↓
requested bytes extracted
    ↓
register receives value
```

A page-table walk may be inserted into this path when translation is not already cached in the TLB. A page fault may interrupt it when the page-table state says software intervention is required.

## 1. The CPU must first know what address is being requested

The instruction contains enough information for the execution hardware to compute an **effective virtual address**.

Conceptually:

```text
base address of buffer
+ displacement 1234
-------------------
virtual address of requested bytes
```

The program normally deals in virtual addresses, not raw DRAM locations.

## 2. Translation and caching are different problems

This distinction is fundamental.

The **TLB and page tables** answer:

> Which physical page corresponds to this virtual page, and is this access allowed?

The **CPU caches** answer:

> Do I already have a recent copy of the physical memory contents close to the core?

A TLB miss is therefore not the same thing as a cache miss, and neither is automatically a page fault.

## 3. TLB lookup: the common translation fast path

The Translation Lookaside Buffer caches recently used virtual-page to physical-frame translations.

On a TLB hit, the CPU can obtain the physical-page information without walking the page tables.

```text
virtual address
    ├── virtual page number ──→ TLB lookup
    └── page offset

TLB hit:
physical frame number + unchanged page offset
                ↓
          physical address
```

The page offset does not change during translation. Translation selects a physical frame; the offset identifies the same byte position inside that frame.

## 4. TLB miss: hardware walks the page tables

A TLB miss usually means:

> The CPU does not currently have this translation cached.

It does **not** mean the page is absent from memory.

On a typical x86-64 system, hardware begins from the current process's page-table root and follows a multi-level tree. With four-level paging the familiar names are:

```text
CR3
 ↓
PML4
 ↓
PDPT
 ↓
Page Directory
 ↓
Page Table
 ↓
physical frame
```

Each level consumes some address bits to select an entry. The final page-table entry supplies the frame and access metadata.

The page walk itself requires memory accesses, so page-table entries can also benefit from CPU caches and dedicated page-walk caching structures.

If the walk finds a valid mapping, the CPU can normally fill the TLB and retry/continue the load without involving the operating system.

## 5. When does a page fault happen?

A page fault occurs when translation or protection state requires operating-system intervention.

Examples include:

- a demand-zero page that has not been physically allocated yet;
- copy-on-write when a process attempts the first write to a shared COW page;
- a file-backed page that must be brought in;
- a swapped-out page;
- a protection violation;
- an invalid or unmapped virtual address.

The operating system may be able to resolve the fault and resume the instruction, or it may terminate the process for an invalid access.

### Important correction

A cache miss does **not** cause a page fault.

If the virtual-to-physical mapping is valid but the requested data is absent from L1/L2/L3, the hardware continues farther down the memory hierarchy. The operating system does not need to intervene merely because the data was not cached.

## 6. The cache hierarchy

Once the load has a usable physical-memory identity, the data side of the memory hierarchy attempts to satisfy it as close to the core as possible.

A simplified model is:

```text
L1 data cache
   ↓ miss
L2 cache
   ↓ miss
L3 / last-level cache
   ↓ miss
DRAM
```

Exact organizations vary by processor, and modern cores overlap translation, cache lookup, speculation, and execution aggressively. The diagram is a reasoning model, not a literal claim that every stage waits for the previous stage to finish completely.

## 7. Caches move lines, not individual variables

If the load asks for four bytes, the memory hierarchy generally deals in a much larger **cache line**.

That means a miss on one small value can fetch neighboring bytes as well.

This is why sequential access often performs well: future nearby loads may already be present because an earlier miss brought in the whole line.

It is also why unrelated writable variables placed on the same cache line can interfere with one another across cores.

## 8. How does the cache know where to look?

A memory address is conceptually divided into fields used for cache lookup:

```text
|       tag       |   set index   | line offset |
```

- **Line offset** selects the desired byte inside the cache line.
- **Set index** selects the candidate cache set.
- **Tag** identifies which memory block currently occupies each candidate way in that set.

In an N-way set-associative cache, multiple lines can occupy the same set, but only up to the associativity of that set before replacement pressure begins.

This explains why two working sets of the same total size can perform very differently: address placement matters, not just byte count.

## 9. Hits, capacity misses, and conflict misses

A miss can occur for different reasons.

### Compulsory miss

The line has not been fetched yet.

### Capacity pressure

The active working set is larger than the useful cache capacity.

### Conflict pressure

Too many active addresses map to the same cache set even though other sets may have free or less-contended space.

This is the basis of cache-conflict microbenchmarks that deliberately stride by a distance causing many addresses to land in one set.

## 10. Why pointer chasing is slow

A pointer chain like:

```c
node = node->next;
node = node->next;
node = node->next;
```

can create serial dependency between loads. The address of the next load is not known until the previous load completes.

That reduces the processor's ability to overlap multiple independent cache misses and can defeat ordinary sequential hardware prefetching.

Pointer-chasing benchmarks are therefore useful for exposing memory latency rather than streaming bandwidth.

## 11. Hardware prefetchers

Processors try to predict future memory accesses and fetch lines before demand loads need them.

Regular sequential and strided patterns are often friendly to prefetchers.

Irregular dependent pointer chains are much harder.

This means a benchmark intended to measure raw memory latency must be designed carefully; otherwise the prefetcher may turn what appears to be a DRAM experiment into a cache-prefetch experiment.

## 12. What coherence adds to the load path

On a multicore machine, caches cannot be treated as unrelated private copies of memory.

If another core has modified the line, coherence machinery must ensure this load observes a legal value according to the architecture's memory model.

Protocols commonly described with MESI- or MOESI-like states track whether a cache line is shared, clean, modified, or exclusively owned.

The key performance implication is that ownership of a writable line may move between cores. Repeated movement can be expensive even if every access technically "hits cache."

## 13. Where stores and memory ordering enter the picture

Loads cannot be understood completely without eventually considering stores.

Modern CPUs buffer and reorder memory operations internally to gain performance. Store buffers let stores retire from parts of the pipeline before their effects are globally visible.

Memory-ordering rules define which observations other processors are allowed to make.

Atomics and fences are tools for constraining those observations when synchronization requires stronger guarantees.

This topic becomes especially important in lock-free queues, device drivers, shared-memory communication, and MMIO/DMA coordination.

## 14. The fast path and the slow paths

A useful way to reason about any memory access is to enumerate layers of increasingly expensive fallback behavior.

```text
Best case:
TLB hit + L1 hit

Then progressively more expensive possibilities:
TLB hit + L2/L3 hit
TLB miss + successful page walk + cache hit
LLC miss + DRAM access
page fault + kernel handling
major fault requiring storage I/O
```

The exact latency numbers depend heavily on the processor and system, but the ordering of mechanisms is the important first mental model.

## 15. Common mistakes

### "The TLB translates every byte address by itself"

More precisely, the TLB caches page translations. The page offset passes through unchanged.

### "A TLB miss is a page fault"

No. A TLB miss commonly triggers a hardware page-table walk.

### "If L3 misses, the CPU page faults"

No. A valid mapped page can simply be fetched from DRAM.

### "If my dataset fits in L1, every access must hit L1"

Not necessarily. Set conflicts, coherence invalidations, replacement activity, and competing data can still cause misses.

### "Four-byte load means four bytes come from DRAM"

The hierarchy normally transfers cache-line-sized blocks internally.

## 16. A debugging/performance checklist

When a memory access is unexpectedly expensive, ask:

1. Is the virtual address valid and mapped?
2. Is translation likely hitting in the TLB?
3. Is the working set exceeding TLB reach?
4. Which cache level should contain the line?
5. Is the access pattern generating conflict misses?
6. Is the workload sequential enough for prefetching?
7. Are accesses dependent, preventing memory-level parallelism?
8. Is another core repeatedly taking ownership of the same line?
9. Is false sharing present?
10. Is NUMA placement adding remote-memory latency?
11. Are synchronization or ordering constraints preventing useful reordering?

## Knowledge check

1. What is the difference between a TLB miss and a page fault?
2. Why does the page offset not need translation?
3. What information does the set index provide to a cache?
4. Why can a small working set still suffer many cache misses?
5. Why does randomized pointer chasing expose latency better than a simple sequential scan?
6. Why can two threads updating different variables still fight over cache ownership?
7. Why should a performance engineer distinguish cache residency from virtual-memory residency?

## Durable mental model

Remember this chain:

```text
Load instruction
→ compute virtual address
→ translate page (usually via TLB)
→ if TLB misses, walk page tables
→ if mapping requires OS help, page fault
→ locate the cache line
→ L1 → L2 → LLC → DRAM as needed
→ maintain multicore coherence
→ return requested bytes to the core
```

And remember the most important separation:

> **Virtual memory decides what memory the address means. The cache hierarchy decides how close a copy of that memory currently is to the CPU.**

[Back to Performance & Cache Optimization](/courses/performance-cache/)
