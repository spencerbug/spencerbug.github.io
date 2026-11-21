---
layout: post
title: "SOAM D-R1 and D-R2: A Stored Memory Still Has to Be Retrieved"
date: 2026-11-19 00:00:00 -0600
permalink: /blog/soam-retrieval-and-decoding/
description: "A projection-based Hopfield memory preserved acquired codes but often recalled incorrect relationships. Two bounded studies separate storage, settling and decoding, including an inconclusive precision-limited follow-up."
soam_studies: "D-R1 + D-R2"
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/soam-study-d.css' | relative_url }}">
{% include soam-studies-nav.html %}

**November 21 update:** The separately selected E0 and E0-HOLD studies now examine stationary retention, action navigation and local recovery in one recurrent population. [Read the joint article]({{ '/blog/soam-stationary-memory-and-navigation/' | relative_url }}) or [report]({{ '/research/soam-stationary-memory-and-navigation/' | relative_url }}). They do not resolve the retrieval/decoding diagnosis below, which remains a record of its November 19 evidence and decision.

## Three tests inside one word

A memory can preserve information in its connections and still fail when asked to use it. The stored pattern must remain available, a partial cue must lead to a useful state, and that state must decode into the right answer. Each step can succeed while another fails.

SOAM's two latest studies separate those steps. **D-R1 tested recurrent associative retrieval and the contribution of additional settling. D-R2 asked whether the acquired codes were useful when the cue-completion step was bypassed in the evaluator.**

D-R1 found a small settling benefit, precisely below its practical target, and established three reliability failures. D-R2 found perfect sampled decoding of exact acquired codes alongside substantially worse ordinary recall. Its formal diagnosis nevertheless remains **inconclusive**: the uncertainty interval was wider than the limit fixed before the experiment.

The [joint technical report]({{ '/research/soam-retrieval-and-decoding/' | relative_url }}) gives the protocols, full comparisons, decision rules and resource accounting.

## What PH768 remembers

The [preceding Study D]({{ '/blog/soam-study-d-acquisition-and-retention/' | relative_url }}) showed that explicit key-value storage could learn new associations and retain them in a small scaffolded task. Its fast-weight candidate used a single linear read. The next question was what actual recurrent settling would contribute.

**PH768 is the projection-based Hopfield candidate with 768 recurrent units.** It associates a 16-coordinate appearance key with eight relationship features. Each coordinate is encoded using 32 ordered thresholds: a scalar becomes a run of positive bits followed by negative bits, like a thermometer filling to a level. That produces 512 appearance units and 256 relationship units.

A grounded snapshot supplies the appearance, observed relationship features and a measured reference angle. A shared fitted motion model expresses the relationship in a common orientation. A write extends a matrix that preserves the span of the encoded patterns. The persistent candidate stores that matrix and counters; it does not retain a separate lookup table of acquired patterns.

<ol class="d-pipeline" aria-label="Implemented PH768 acquisition and recall">
  <li><b>1. Encode and write</b><span>Convert the grounded observation to a fixed 768-unit code and update persistent connections.</span></li>
  <li><b>2. Reset working state</b><span>Clear transient activity. The learned connections remain.</span></li>
  <li><b>3. Complete from a cue</b><span>Clamp observed appearance bits and update the remaining units recurrently.</span></li>
  <li><b>4. Decode and predict</b><span>Read the relationship units and use the shared motion model for future actions.</span></li>
</ol>

This describes the implemented, deliberately scaffolded system. The encoder, unit roles, correspondence, clamps and action formula are supplied. Learned memory organization is a later question.

At query time, a partial cue reveals eight of the sixteen appearance coordinates with noise. Relationship coordinates are hidden. The free units start at zero and update in a fixed order until a full cycle changes nothing, or the 32-cycle cap is reached. The decoder averages each group of 32 relationship units and rescales it to a scalar.

## D-R1: settling helps a little, but recall remains unreliable

D-R1 compared the full settling procedure with **PH-1**, which uses the same acquired weights and returns after one complete cycle. This makes the difference a controlled test of extra settling rather than another training run.

After acquiring eight similar objects, full settling recalled the first seven correctly on **70.31%** of partial-cue queries. One cycle achieved **68.17%**. The paired improvement was **2.14 percentage points**, with an adjusted interval of **0.98–3.66 points**.

The protocol required a five-point practical benefit. The interval lies below that target and meets the precision requirement: **a precise negative result for the declared practical benefit**, while retaining the small positive effect.

<figure>
  <a href="{{ '/assets/research/soam-retrieval/settling.png' | relative_url }}"><img src="{{ '/assets/research/soam-retrieval/settling.png' | relative_url }}" alt="D-R1 recall rises slightly after one cycle and then plateaus near 70 percent through the plotted 32-cycle horizon." loading="lazy"></a>
  <figcaption>Archived D-R1 curve. Stopped trajectories are padded for plotting; the flat tail does not mean every query executed 32 cycles. The confirmatory contrast uses paired independent roots.</figcaption>
</figure>

The separate reliability test also failed. Earlier-object accuracy fell below its guard, earlier-object prediction error increased too much, and accepted-but-wrong outputs exceeded their allowed rate. Convergence did not ensure a correct answer.

Conventional references performed better in the observed accuracy/resource comparison. KV reached 100% sampled recall; regression using the same expanded appearance encoding, REG-LIFT, reached 94.91%. PH768 also used substantially more storage and measured recall time. The formal PH-versus-control accuracy contrasts remained inconclusive under their own interval-width rule, which the report preserves.

## A clue from the stored patterns

A post hoc audit checked the final available projector from the fourth sequence at each of D-R1's ten confirmation roots. Every acquired code in those checkpoints was preserved in the stored span to numerical precision.

That narrowed the question. Being preserved by a matrix does not mean a noisy cue will reach the code, or that every state reached during settling will decode usefully. Supplying the full appearance cue improved recall only slightly, to 71.61%, so missing appearance coordinates alone did not explain the errors.

The follow-up held the mechanism fixed and examined the gap between acquired-code decoding and ordinary cue-driven output.

## D-R2: remove completion only in the evaluator

D-R2 used ten fresh confirmation roots and the inherited settings. After the same eight-object memory load, it saved ordinary partial-cue predictions from PH768, KV and REG-LIFT. Only then did a separate evaluator decode the exact codes acquired for the correct object.

The evaluator knew the object's identity. It scored all eight acquired snapshots equally, without selecting whichever code gave the best answer. Those codes never entered the learner's recall or changed a prediction. This branch measures fidelity when the correct code is supplied; it is not a deployed retrieval system.

<figure>
  <a href="{{ '/assets/research/soam-retrieval/decoding.png' | relative_url }}"><img src="{{ '/assets/research/soam-retrieval/decoding.png' | relative_url }}" alt="D-R2 sampled accuracy: ordinary PH768 77.63 percent, REG-LIFT 96.07 percent, KV 100 percent and evaluator-only exact-code decoding 100 percent." loading="lazy"></a>
  <figcaption>Archived D-R2 results. The figure shows ordinary 95% root intervals. The decision uses the separately adjusted primary-gap interval and its frozen precision rule. Exact-code decoding has privileged association identity; it is not a fourth deployable competitor.</figcaption>
</figure>

Exact acquired-code decoding scored **100%** in this sample; ordinary PH768 recall scored **77.63%**. The gap was **22.37 points**, with adjusted interval **15.36–29.02 points**. All forty final sequence projectors preserved their acquired codes.

These fresh-root values are not an improvement curve from D-R1 to D-R2. The diagnostic changed which evaluations were collected, and the confirmation data are different. PH768 itself was unchanged.

## Why a large gap still receives an inconclusive label

D-R2 required both a gap above five points and an interval no wider than ten points, together with adequate exact-code decoding. The gap's interval is entirely above five points, but its **13.66-point width** misses the precision cap.

The formal diagnosis therefore stays **inconclusive**. That label does not erase the directional evidence, and the directional evidence does not justify discarding the width rule. No extra roots were added after seeing the result.

The measured distinction is useful: these acquired codes could represent the requested relationships, while the ordinary cue-to-output path still made errors. The experiment does not uniquely assign those errors to cue ambiguity, clamping, encoding geometry, mixed states or decoder behavior away from the acquired-code set. The 100% result is also a finite-sample observation, not a universal reliability guarantee.

## What this changes for SOAM

KV remains the conventional reference for this scaffolded task. A persistent association, a converged recurrent state and a useful recalled relationship each need their own evidence.

The broader goal remains a sensorimotor world model whose organization develops through experience. Neither study tested discovery of object identities, learned roles, shared-neuron benefits, compositional reuse or self-directed play. They test prerequisites that a more elaborate mechanism would still have to satisfy.

If a formal precision-qualified diagnosis is necessary for the next architectural decision, the recorded recommendation is a fresh fixed-design replication with its root count and stopping rule declared in advance. No successor study is currently selected. The complete [report]({{ '/research/soam-retrieval-and-decoding/' | relative_url }}) keeps the negative and inconclusive outcomes alongside the useful observations.
