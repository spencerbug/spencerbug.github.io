---
layout: post
title: "SOAM Memory Studies 4: Cue Completion and Retained Guesses"
date: 2026-11-26 00:04:00 -0600
permalink: /blog/soam-cue-completion-and-retained-guesses/
description: "One symmetric sweep helped, but more settling missed its target. In a fresh two-stage experiment, retaining two candidates lost to equal-work restart and could end in confident errors."
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/soam-study-d.css' | relative_url }}">
{% include soam-memory-series-nav.html %}

**Follow-up, November 27:** [Corrective writing substantially improves ordinary retrieval]({{ '/blog/soam-corrective-memory-writing/' | relative_url }}) on these same banks, with unchanged representation and dynamics. The visual follow-up preserves this study's retention result and the remaining ambiguity failure.

## A partial observation becomes a guess

Suppose an observation reveals enough of a familiar item to suggest a completion, but leaves several features hidden. A recurrent cue memory can use learned co-occurrences to fill those gaps. A second stage can then retrieve the content associated with the completed cue.

The two latest SOAM experiments tested this pipeline. On November 25, **one symmetric sweep improved exact payload recall substantially**, but further settling failed the required improvement on every bank. On November 26, **retaining two candidate cue states between passive glimpses lost 27 exact feature reconstructions out of 1,024 resolving decisions** compared with an equal-work restart.

These are separate experiments with different second stages and fresh banks. Together they expose a practical risk: inferred details can become persistent, confident mistakes. The [companion report]({{ '/research/soam-memory-studies-november-2026/' | relative_url }}#cue-completion-and-passive-retention) records the complete per-bank comparisons.

## The first sweep helped the shared decoder

The cue-assist study learned a symmetric sensory memory from clean observations. At query time it completed partial cues and sent them to a fixed context-conditioned linear decoder. The same decoder served every comparison, so changing the first stage could not quietly improve the second stage's training.

In the condition where the earlier view resolved ambiguity, the observed symbols alone produced **65, 64, 51 and 67** correct sixteen-bit payloads out of 256 per bank. One symmetric sweep raised those counts to **158, 144, 124 and 127**.

Full settling then produced **144, 145, 131 and 121**. Its gains over one sweep were −14, +1, +7 and −6, below the required +13 on every bank. The first sweep still left many mistakes, so a ceiling did not explain the failure.

Exact-word and bit-error measures also disagreed. On bank 3, further settling recovered seven additional exact payloads but introduced **90 additional wrong payload bits**. Better completion for some items coexisted with worse answers elsewhere.

## Ambiguity tests whether confidence is justified

Some trials deliberately gave two different familiar keys identical observations and different correct payloads. The available evidence could not identify the answer.

Full settling nevertheless accepted 96, 64, 64 and 32 responses across the four banks. Exactly half of those accepted responses were wrong on each bank. Compatible-key lookup kept the tie visible, allowing the shared receiver to abstain on every ambiguous case. It also retrieved every identifiable payload correctly.

Lookup had favorable conditions: sixteen familiar clean keys, noiseless erasures and supplied alignment between views. Its success is a strong reference for this task, not a general claim about noisy perception. But the ambiguous pairs make a broader logical point: internal convergence cannot supply evidence that the observations do not contain.

## Carry two candidates into the next glimpse

The fresh passive-branch study made the second stage recurrent. Both policies first saw an ambiguous ten-group view, then two additional observed groups. Both ran two cue trajectories and four recurrent feature updates per candidate. The retained policy carried its two inferred cue states forward. Restart kept the actual observations and recreated two candidates when the second glimpse arrived.

<figure>
  <a href="{{ '/assets/research/soam-memory-2026/passive-recall.png' | relative_url }}"><img src="{{ '/assets/research/soam-memory-2026/passive-recall.png' | relative_url }}" alt="Four banks: restart recovered 142, 169, 132 and 135 exact feature vectors; retention recovered 141, 152, 124 and 134; lookup recovered 256 in every bank." loading="lazy"></a>
  <figcaption>Exact sixteen-bit reconstructions out of 256 resolving decisions per bank. These are observed development counts, without confidence intervals. All methods use the same recurrent feature receiver within each bank. Open the figure for a larger view.</figcaption>
</figure>

Retention repaired **19** restart mistakes and lost **46** responses that restart got right: a net loss of 27. It underperformed on every bank. Feature recurrence itself helped both policies descriptively, adding 23 exact responses for retention and 24 for restart between the first and fourth feature updates. Both also lost some previously correct answers.

Two allocated states did not guarantee two different alternatives. Across the banks, **74–104 of 128 first-glimpse sensory rows** already had identical terminal candidates. A second state can duplicate the first state's guess.

## Following a confident error

One recorded error makes the failure concrete. On bank 1, row 99, context 1, neither candidate matched the true cue after the first glimpse. Both correctly anticipated the two symbols that the second glimpse would reveal. Both also carried the same guesses on three still-hidden, unseeded groups.

After the new evidence arrived, both completed cues remained inexact. Their support scores tied. Neither feature trajectory produced the correct full vector. The equal mixture was accepted because its smallest absolute output was **0.54738**, above the **0.5** acceptance threshold, yet **five of sixteen bits were wrong**.

The new observation supported part of each candidate without validating its hidden details. In this example the feature stage introduced no additional correct-to-wrong flips between its first and fourth updates; it began without a correct candidate vector to select. Independent replays of two other errors reproduced the stored paths through both recurrent stages.

## What the series has established

The new evidence separates useful ingredients from a complete memory system. Small-load recall works. Sparse participation is achievable. Arbitrary payloads can be retained under supplied addressing. One recurrent sweep can improve a downstream answer. Further settling and retained guesses still need to earn reliable retrieval under ordinary observations.

On these familiar noiseless keys, compatible lookup remains the practical reference. The last experiment's shared recurrent receiver reconstructed every identifiable item when given that lookup's cue and abstained on every truly ambiguous case. None of these development studies establishes learned memory organization, action selection or a sensorimotor world model. They clarify the failures a future mechanism must overcome, with the full [evidence and methods]({{ '/research/soam-memory-studies-november-2026/' | relative_url }}) available alongside the series.
