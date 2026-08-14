---
layout: page
title: "02 — Virtual Memory, TLBs, and Page Walks"
permalink: /courses/performance-cache/02-virtual-memory/
---

# 02 — Virtual Memory, TLBs, and Page Walks

Virtual memory gives each process an address space that is translated onto physical memory. The performance-critical fast path is the TLB; page tables are the authoritative mapping structure behind it.

## Pages and frames

A virtual address is divided conceptually into:

```text
| virtual page number | page offset |
```

The page-table machinery maps the virtual page number to a physical frame number.

```text
virtual page number  ──translation──> physical frame number
page offset           ───────────────> same page offset
```

The resulting physical address identifies the memory location used by the cache/memory system.

## Why page tables are hierarchical

A single flat array containing an entry for every possible virtual page would be enormous and mostly empty for ordinary processes.

Hierarchical page tables allocate lower-level tables only where address-space regions are actually populated.

A common four-level x86-64 walk is:

```text
CR3
 ↓
PML4 entry
 ↓
PDPT entry
 ↓
Page Directory entry
 ↓
Page Table entry
 ↓
physical frame
```

Each level consumes a portion of the virtual page number as an index.

## CR3

On x86-64, CR3 identifies the root of the current address space's page-table hierarchy.

Conceptually, a context switch may change which page-table root is active. Modern CPUs also have mechanisms such as address-space identifiers/PCIDs that reduce the cost of discarding useful TLB state across address-space changes.

## The TLB

The TLB is a cache of address translations.

Without it, ordinary loads and stores could require several extra memory references just to discover where the requested memory lives.

### TLB hit

```text
virtual page number
      ↓
     TLB
      ↓ hit
physical frame number
```

Translation is available quickly.

### TLB miss

```text
virtual page number
      ↓
     TLB
      ↓ miss
hardware page-table walker
      ↓
page-table hierarchy
```

If a valid mapping is found, the translation can be inserted into the TLB.

A TLB miss is a hardware-cache miss in translation state; it does not automatically require the kernel.

## Page faults

A page fault is an architectural event indicating that software intervention is required for the attempted memory access.

Useful categories we have covered include:

### Demand-zero

A virtual page has been reserved but does not yet have a physical page populated with data. The kernel allocates a frame, initializes it appropriately, installs the mapping, and resumes the instruction.

### Copy-on-write

Processes may initially share a physical page read-only. On the first write, the fault lets the kernel create a private copy and update the writer's mapping.

### File-backed page

A mapped file page may not currently be resident and may need to be populated from the page cache or storage.

### Swapped/nonresident page

The page's contents may need to be recovered from secondary storage.

### Protection fault

The page exists, but the attempted operation violates permissions—for example, writing through a read-only mapping.

### Invalid mapping

No valid mapping exists for the virtual address. If the kernel cannot resolve this as a legitimate demand-mapping event, the process typically receives a fault such as `SIGSEGV`.

## Page fault versus cache miss

These belong to different layers.

```text
Page fault:
virtual-memory mapping / residency / permission problem

Cache miss:
valid memory, but the data is not currently present in this cache level
```

A load from a perfectly valid resident page can miss every CPU cache and go to DRAM without generating a page fault.

Conversely, a page-table walk itself may hit or miss in CPU caches because page-table entries are stored in memory too.

## Demand paging and process creation

Virtual memory lets the operating system postpone physical work until necessary.

`fork()` is a classic example: parent and child can initially share physical pages under copy-on-write instead of duplicating the entire address space immediately.

This is both a memory-capacity optimization and a performance optimization.

## TLB reach

The TLB contains a finite number of translations. The amount of virtual memory that can be covered by its active entries is often called its **TLB reach**.

Large working sets with scattered accesses can stress the TLB even when the data itself fits comfortably in higher-level CPU caches or DRAM.

Huge pages can increase TLB reach because one translation covers a larger memory region, though they introduce their own allocation and fragmentation tradeoffs.

## Performance implications

Virtual-memory overhead becomes particularly visible when:

- walking very large or sparse data structures;
- using random access over many pages;
- switching among many address spaces;
- suffering frequent minor or major page faults;
- performing latency-sensitive work where page faults are unacceptable;
- using DMA or devices that introduce a second translation layer through an IOMMU.

## Knowledge check

1. What does the TLB cache?
2. Why is the page offset unchanged by translation?
3. What happens on a TLB miss if the mapping is valid?
4. Why is a page fault different from a cache miss?
5. Why does `fork()` benefit from copy-on-write?
6. What is TLB reach?
7. Why can a page-table walk itself experience cache misses?

## Durable ideas

- Programs normally issue virtual addresses.
- Page tables define virtual-page to physical-frame mappings.
- The TLB caches those mappings for the fast path.
- A TLB miss normally triggers a page walk, not immediately a page fault.
- Page faults are kernel-visible events involving mapping, residency, or protection.
- CPU cache residency and virtual-memory residency are separate concepts.

[Previous: Tracing a Load Request](/courses/performance-cache/01-tracing-a-load-request/) · [Next: Cache Lines, Sets, and Associativity](/courses/performance-cache/03-cache-structure/)
