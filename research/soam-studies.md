---
layout: page
title: "SOAM Studies A–F"
permalink: /research/soam-studies/
description: "Studies A–F, with B2 between B and C: recurrent gates, sensory correction, robust filtering, hypothesis preservation, conditional scheduling, plasticity, navigable memory, and population topology."
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
{% include soam-studies-nav.html %}

This series follows the A–F investigations I requested after SOAM's first shared-population experiment, **E1**, with **B2 inserted between B and C** to test robust correction. E1's tested candidate failed its useful-sharing gate. That result raised smaller questions about recurrent dynamics, sensing, and memory that can be investigated independently of the original architecture.

**Studies A, B, B2 and C-H1 are complete.** The [A/B article]({{ '/blog/soam-studies-a-b-gates-and-correction/' | relative_url }}) establishes the predictor/corrector interface. The [B2 article]({{ '/blog/soam-study-b2-robust-correction/' | relative_url }}) tests how a tiny filter can become less vulnerable to bad evidence. The [C article]({{ '/blog/soam-study-c-hypothesis-preservation/' | relative_url }}) tests whether distinct candidate states preserve uncertainty better than competent single-state controls. Each installment has a companion report and evidence downloads. Selective scheduling within C and Studies D–E remain conditional; F is a future planning track. No next experiment is selected by this publication.

| Study | Question | Status as of November 14, 2026 |
| --- | --- | --- |
| **A — Adaptive recurrent gates** | What do adaptive update and reset gates contribute beyond capacity, fixed retention, and training? | **Complete.** Practical adaptive-update benefit is inconclusive; ordinary R32 is a competent starting core. [Results]({{ '/research/soam-studies-a-b/#study-a-design-and-results' | relative_url }}) |
| **B — Temporal sensory assimilation** | How should action prediction, sensory correction, and internal settling interact? | **Complete.** Separate correction is retained; learned sensory gain does not establish its declared practical advantage. [Results]({{ '/research/soam-studies-a-b/#study-b-design-and-results' | relative_url }}) |
| **B2 — Robust Kalman correction** | Can a compact filter resist corrupted observations without losing accuracy or rapid change response? | **Complete.** Channel-disagreement variance adaptation and calibrated rejection pass frozen checks. Coherent corruption and measured runtime remain limits. [Article]({{ '/blog/soam-study-b2-robust-correction/' | relative_url }}) · [Results]({{ '/research/soam-study-b2/' | relative_url }}) |
| **C — Hypothesis preservation and conditional scheduling** | Do separate candidate states improve inference under genuine ambiguity; when would selective updating help? | **C-H1 complete.** Neural factorization benefit supported; compact conventional inference remains competitive; coherent-cause overconfidence remains. C-H2 scheduling and C-H3 learned allocation are deferred. [Article]({{ '/blog/soam-study-c-hypothesis-preservation/' | relative_url }}) · [Results]({{ '/research/soam-study-c/' | relative_url }}) |
| **D — Inference and persistent plasticity** | Can transient inference and persistent associative writes be controlled independently without unacceptable interference? | Proposed direction; no results reported. |
| **E — Object-centered navigable memory** | Can recurrent state represent an object's local sensorimotor structure and support movement through it? | Proposed direction; no results reported. |
| **F — Population topology** | When should recurrent computation use one large population, a hierarchy, or communicating populations? | Future planning track; no architecture sweep or tournament results reported. |

The labels organize a publication series, not an instruction to run every branch. The original planning material called the first five investigations Studies A–E and introduced population topology as Prompt F; this index groups that future track under F. B2 adds a correction study without renumbering A–F. Its baseline handoff preceded the independently selected C-H1 protocol. The broader operating-mode proposal was separated into hypothesis preservation (tested), selective scheduling (deferred) and learned allocation (deferred). Completing C-H1 does not activate the other two.

## Where this series branches from E1

In E1, a 32-unit candidate reused its activity coordinates for partial-cue reconstruction and action-conditioned prediction. It improved relative retention but missed the absolute reconstruction requirement. Ordinary GRU references predicted more accurately, and contraction after a perturbation did not establish useful recovery. [E1 article]({{ '/blog/a-memory-can-settle-and-still-be-wrong/' | relative_url }}) · [E1 report]({{ '/research/soam-e1-results/' | relative_url }})

Study A isolates parts of that GRU advantage. Study B then tests how a competent recurrent core should absorb new observations. These are fresh protocols and data streams. Better results under their changed training or tasks do not retroactively pass E1, and this series does not rename A–F as E2–E7.

## Published installments

1. **Studies A and B — Recurrent Gates and Sensory Correction** · November 11, 2026. [Article]({{ '/blog/soam-studies-a-b-gates-and-correction/' | relative_url }}) · [Report and evidence]({{ '/research/soam-studies-a-b/' | relative_url }})
2. **Study B2 — When Should a Filter Trust Its Senses?** · November 12, 2026. [Visual article]({{ '/blog/soam-study-b2-robust-correction/' | relative_url }}) · [Report and evidence]({{ '/research/soam-study-b2/' | relative_url }})

3. **Study C — When Should an Estimator Keep Two Stories?** · November 14, 2026. [Visual article]({{ '/blog/soam-study-c-hypothesis-preservation/' | relative_url }}) · [Report and evidence]({{ '/research/soam-study-c/' | relative_url }})

Future installments will be added when their studies have reportable evidence. The broader [SOAM proposal]({{ '/blog/self-organizing-attractor-memory/' | relative_url }}) remains the motivation; these bounded experiments determine which mechanisms deserve to be carried forward.
