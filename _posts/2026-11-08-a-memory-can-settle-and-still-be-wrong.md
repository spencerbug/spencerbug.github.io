---
layout: post
title: "A Memory Can Settle and Still Be Wrong"
date: 2026-11-08 00:00:00 -0600
permalink: /blog/a-memory-can-settle-and-still-be-wrong/
description: "SOAM's first shared-population result, in pictures: retention passed, recall failed, and contraction did not establish useful attraction."
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">

The first SOAM shared-population experiment is complete. **The tested candidate did not pass its gate.** That result is useful because prediction, participation, and attraction turned out to be different questions.

<div class="e1-verdicts" aria-label="Three separate evidence judgments">
  <div class="e1-verdict"><strong>Useful prediction</strong><span>Gate failed: recall exceeded its error limit.</span></div>
  <div class="e1-verdict unresolved"><strong>Shared-unit interventions</strong><span>Large effects; frozen precision requirements unmet.</span></div>
  <div class="e1-verdict"><strong>Useful attraction</strong><span>Recovery diagnostic failed despite contraction.</span></div>
</div>

<nav class="e1-links" aria-label="Companion reading"><a href="{{ '/research/soam-e1-results/' | relative_url }}">Full report + data</a><a href="{{ '/research/soam-e1/' | relative_url }}">Original protocol</a></nav>

## Retaining a memory does not make it accurate

SOAM explores recurrent memory for embodied intelligence. Here, a 32-unit candidate, **S32**, used the same state coordinates to reconstruct a partly observed feature vector or predict its movement under commands. The task supplied the role; it did not ask the model to discover these jobs or perform them concurrently.

<figure class="e1-figure">
  <a href="{{ '/assets/research/soam-e1-results/recall-gate.svg' | relative_url }}"><img src="{{ '/assets/research/soam-e1-results/recall-gate.svg' | relative_url }}" width="600" height="370" alt="S32 mean recall error improves from 0.115 at the recall-only checkpoint to 0.078 after joint training. Every final root remains above the required maximum of 0.02."></a>
  <figcaption><strong>Better, but still outside the requirement.</strong> Faint dots are ten independent training-root means; thick marks show means and ordinary 95% root-bootstrap intervals. NMSE is squared prediction error normalized by a fixed training variance. Lower is better. <a href="{{ '/research/soam-e1-results/#root-level-primary-results-and-failures' | relative_url }}">Values and intervals</a>.</figcaption>
</figure>

Both relative retention guardrails passed. Mean recall improved during joint training, yet its final error was **0.0777 against a maximum of 0.02**. Calling this destructive interference would misdescribe the evidence. The governing failure was absolute competence.

## The simpler comparisons matter

<figure class="e1-figure">
  <a href="{{ '/assets/research/soam-e1-results/prediction.svg' | relative_url }}"><img loading="lazy" src="{{ '/assets/research/soam-e1-results/prediction.svg' | relative_url }}" width="600" height="490" alt="Eight-step free prediction: S32 error 0.0868, D25 0.1097, D16 0.1095, G28 0.0464, G32 0.0377, L12 0.0864, and SYM32 0.1801, with 95 percent intervals."></a>
  <figcaption><strong>Ordinary recurrent controls were serious competitors.</strong> Free-8 means eight steps without fresh observations. Bars are ordinary 95% root intervals, not the adjusted paired benefit tests. D models split recall and transition populations; G models are gated recurrent units; L12 is linear; SYM32 omits the asymmetric component. T32 equals S32 exactly. <a href="{{ '/research/soam-e1-results/#model-errors-and-resource-differences' | relative_url }}">All endpoints and resource counts</a>.</figcaption>
</figure>

S32 passed the individual benefit test against D16. Its D25 estimate was positive but missed the precision requirement. Both GRUs had lower free-8 error on every root; L12 was inconclusive. The frozen rule required success against **all five** references. Different parameter counts and active widths also prevent treating every gap as an effect of sharing alone.

## A state can settle while losing the answer

After perturbing a hidden state, I want recovery that preserves useful information. Merely getting closer to an unperturbed trajectory is insufficient.

<div class="e1-pair">
  <figure class="e1-figure">
    <a href="{{ '/assets/research/soam-e1-results/contraction.svg' | relative_url }}"><img loading="lazy" src="{{ '/assets/research/soam-e1-results/contraction.svg' | relative_url }}" width="490" height="420" alt="Hidden-state distance contracts over ten steps. S32 reaches 0.233 of its initial distance; the zero-S control contracts faster, to 0.000977."></a>
    <figcaption><strong>Closer together…</strong> Removing the symmetric recurrent matrix (S = 0) makes the perturbation gap shrink faster. Shading: ordinary 95% root intervals.</figcaption>
  </figure>
  <figure class="e1-figure">
    <a href="{{ '/assets/research/soam-e1-results/recovery-error.svg' | relative_url }}"><img loading="lazy" src="{{ '/assets/research/soam-e1-results/recovery-error.svg' | relative_url }}" width="490" height="420" alt="…but less accurate: perturbed recall error is 0.109 for S32 and 0.984 for zero-S, both above the required maximum of 0.02."></a>
    <figcaption><strong>…does not mean closer to the answer.</strong> The faster-contracting control has far worse recall. Error bars: ordinary 95% root intervals. <a href="{{ '/research/soam-e1-results/#cue-dependence-and-finite-horizon-recovery' | relative_url }}">All recovery criteria</a>.</figcaption>
  </figure>
</div>

For this zero-command control, the update itself halves the difference between paired states at every step. That is an algebraic consequence of the supplied rule, not learned memory. S32 also failed the recovery diagnostic's usefulness and advantage requirements. Neither bounded activity nor rapid contraction establishes useful attraction.

## Identical predictions can hide different state organizations

<figure class="e1-figure">
  <img loading="lazy" src="{{ '/assets/research/soam-e1-results/tied-state.svg' | relative_url }}" width="560" height="490" alt="Design diagram: S32 reuses one 32-unit state; T32 uses separate recall and transition banks with tied weights. One role at a time and reset state yield exactly equal predictions, verified across 660 arrays.">
  <figcaption><strong>The T32 identifiability limit.</strong> This is a design diagram, not neural anatomy. The intact predictions cannot identify physical sharing as their cause. Two allocated banks also do not establish an unavoidable memory cost: the inactive bank could be allocated lazily.</figcaption>
</figure>

Lesioning selected S32 coordinates affected both functions, including effects beyond masking the readout alone. That supports participation in the declared coordinate basis. But all six causal contrasts missed their frozen interval-width limits. **The full causal claim remains unresolved**, and participation does not establish unique benefit, semantic neurons, or concurrent binding.

## What changes now

The decision is **stop promotion of this S32 candidate under E1 v1 + A1**. Shared recurrence remains a hypothesis; ordinary recurrence remains a substantive alternative. This experiment does not choose the next architecture.

The record contains 70 confirmation fits, seven exact reproduction fits, and 42 preserved development fits. No seeds were replaced or retuned. Reporting telemetry has disclosed gaps; the report explains why they qualify resource claims without overturning the measured negative gate.

The next eligible action is the separate SOAM-059 routing decision. No follow-up experiment has been launched. The larger lesson is methodological: **accuracy, causal participation, and recovery each need their own evidence.**

[Read the companion report, all intervals, controls, and provenance →]({{ '/research/soam-e1-results/' | relative_url }})

{% include ai-assisted-author-note.html %}
