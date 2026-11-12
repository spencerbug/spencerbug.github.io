---
layout: page
title: "SOAM Studies A–F"
permalink: /research/soam-studies/
description: "A user-directed research series branching from E1: recurrent gates, sensory correction, operating modes, plasticity, navigable memory, and population topology."
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
{% include soam-studies-nav.html %}

This series follows six investigations I requested after SOAM's first shared-population experiment, **E1**. E1's tested candidate failed its useful-sharing gate. That result raised smaller questions about recurrent dynamics, sensing, and memory that can be investigated independently of the original architecture.

**Studies A and B are complete.** Their [joint article]({{ '/blog/soam-studies-a-b-gates-and-correction/' | relative_url }}) explains the findings; the [companion report]({{ '/research/soam-studies-a-b/' | relative_url }}) preserves the methods, numerical comparisons, uncertainty, and evidence downloads. C–F describe future directions. They have no completed results or activated experimental protocols in this publication.

| Study | Question | Status as of November 11, 2026 |
| --- | --- | --- |
| **A — Adaptive recurrent gates** | What do adaptive update and reset gates contribute beyond capacity, fixed retention, and training? | **Complete.** Practical adaptive-update benefit is inconclusive; ordinary R32 is a competent starting core. [Results]({{ '/research/soam-studies-a-b/#study-a-design-and-results' | relative_url }}) |
| **B — Temporal sensory assimilation** | How should action prediction, sensory correction, and internal settling interact? | **Complete.** Separate correction is retained; learned sensory gain does not establish its declared practical advantage. [Results]({{ '/research/soam-studies-a-b/#study-b-design-and-results' | relative_url }}) |
| **C — Operating modes and concurrent hypotheses** | Can primed, tracking, and attended modes preserve multiple hypotheses while allocating computation? | Proposed direction; no results reported. |
| **D — Inference and persistent plasticity** | Can transient inference and persistent associative writes be controlled independently without unacceptable interference? | Proposed direction; no results reported. |
| **E — Object-centered navigable memory** | Can recurrent state represent an object's local sensorimotor structure and support movement through it? | Proposed direction; no results reported. |
| **F — Population topology** | When should recurrent computation use one large population, a hierarchy, or communicating populations? | Future planning track; no architecture sweep or tournament results reported. |

The labels organize a publication series, not an instruction to run every branch. The original planning material called the first five investigations Studies A–E and introduced population topology as Prompt F; this index groups that future track under F to give the requested A–F series a consistent home. Designs and ordering remain subject to the evidence and a separately selected next experiment.

## Where this series branches from E1

In E1, a 32-unit candidate reused its activity coordinates for partial-cue reconstruction and action-conditioned prediction. It improved relative retention but missed the absolute reconstruction requirement. Ordinary GRU references predicted more accurately, and contraction after a perturbation did not establish useful recovery. [E1 article]({{ '/blog/a-memory-can-settle-and-still-be-wrong/' | relative_url }}) · [E1 report]({{ '/research/soam-e1-results/' | relative_url }})

Study A isolates parts of that GRU advantage. Study B then tests how a competent recurrent core should absorb new observations. These are fresh protocols and data streams. Better results under their changed training or tasks do not retroactively pass E1, and this series does not rename A–F as E2–E7.

## Published installments

1. **Studies A and B — Recurrent Gates and Sensory Correction** · November 11, 2026. [Article]({{ '/blog/soam-studies-a-b-gates-and-correction/' | relative_url }}) · [Report and evidence]({{ '/research/soam-studies-a-b/' | relative_url }})

Future installments will be added when their studies have reportable evidence. The broader [SOAM proposal]({{ '/blog/self-organizing-attractor-memory/' | relative_url }}) remains the motivation; these bounded experiments determine which mechanisms deserve to be carried forward.
