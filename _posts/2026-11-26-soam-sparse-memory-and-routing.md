---
layout: post
title: "SOAM Memory Studies 2: Sparse Activity and the Cost of Routing"
date: 2026-11-26 00:02:00 -0600
permalink: /blog/soam-sparse-memory-and-routing/
description: "Two designs really did retrieve with 20 active units, yet neither earned a capacity advantage over compact recurrence. A route repair exposed a misleading comparison with a disruption control."
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/soam-study-d.css' | relative_url }}">
{% include soam-memory-series-nav.html %}

## A larger reservoir with a small active part

The first capacity screen often produced nearly open gates. A natural next question was whether a larger memory could become more useful if only a small part participated in each retrieval.

The November 25 sparse-modulation campaign tested that idea at **20 active content and controller units per query**. Both candidates drew content from a 64-unit reservoir. One used ten active content units and ten controller units; the other used sixteen and four. Compact ordinary recurrence, feedforward memory, ordinary sparse controls and explicit lookup supplied comparisons.

The sparsity was real and verified. The capacity advantage was absent: neither candidate earned the frozen advantage over compact ordinary recurrence. That distinction is the central finding. A mechanism can implement the proposed activity pattern without delivering the proposed storage benefit. The [companion report]({{ '/research/soam-memory-studies-november-2026/' | relative_url }}#sparse-routing) preserves both the favorable within-family effects and the failed guards.

## What was learned and what was supplied

The first design learned cue addresses and used multiplicative modulation to regulate recurrent exchange. The second used competitive allocation with a membership table derived during training. Its four-bit cue-code geometry, quotas and overlap constraints were supplied.

Both learned familiar 16-bit targets offline from partial observations. At retrieval, four bits were erased. The experiment compared banks of eight and 24 targets, with two independent training roots. The larger load was refitted from scratch: this was not a sequence in which new memories were written into an existing store.

The distinction matters for the long-term SOAM goal. Selectively reading a small population does not automatically protect old information when learning updates the weights. In these experiments, training batches touched much more of the reservoir, and dense optimizer work and regularization changed off-route parameters.

## The compact network remained stronger

At 24 associations, out of 1,536 partial-cue queries per bank, the first sparse candidate recovered **780 and 941** exactly. The second recovered **1,218 and 1,225**. Compact RNN20 recovered **1,255 and 1,326**.

The first candidate did improve over its own ordinary sparse control by 47 and 216 responses. The second improved over its control by 107 and 20. Those are useful local comparisons. Neither establishes increased usable capacity over the stronger compact reference. The first candidate qualified at eight associations only; the second qualified at neither tested load. RNN20 and FF20 qualified at eight only, while lookup was exact at both loads.

The price of sparsity was also visible. Estimated full deployment storage was **78,640 bytes** for the first candidate and **69,704** for the second, versus **10,368** for RNN20. Matching active width does not match total stored weights, controller cost or computation. No hardware energy or uncontended latency benefit was measured.

## A compatible repair can still make memory worse

The final diagnostic asked whether changing a route could expose information already in the frozen weights. For the first candidate, a privileged evaluator used the target's training history to replace one selected content index. An unrelated target supplied a matched disruption control. No learning occurred.

| Exact responses out of 1,536 | Bank 1 | Bank 2 |
| --- | ---: | ---: |
| Ordinary route | 788 | 976 |
| Historically compatible edit | 767 | 965 |
| Unrelated edit | 722 | 924 |

The compatible edit beat the unrelated edit by **45 and 41** responses. Viewed alone, that contrast could suggest successful repair. Against the ordinary route, however, it lost **21 and 11**. The intervention was less damaging than the disruption control and still harmful overall.

The second candidate's proposed whole-support diagnostic stopped before treatment. Its historical data did not contain enough eligible errors under the frozen matching rules. That is a valid feasibility stop; it supplies no treatment estimate and cannot be ranked as a failed repair.

## What this narrows down

Sparse recruitment and sensitivity to route changes have now been demonstrated in these implementations. Increased usable storage, selective protection during new writes and learned compartments have not. Some fits were still improving at the training cap, so these outcomes also leave optimization adequacy and maximum capacity unresolved.

The useful next architectural question is what information the weights actually contain, and whether ordinary cues can access it. A supplied route may reveal representational ability without providing a usable retrieval method. The [third post]({{ '/blog/soam-storage-and-cue-access/' | relative_url }}) tests that distinction using independent key–payload associations.
