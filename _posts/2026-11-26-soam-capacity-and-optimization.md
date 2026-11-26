---
layout: post
title: "SOAM Memory Studies 1: Measuring Usable Capacity"
date: 2026-11-26 00:01:00 -0600
permalink: /blog/soam-capacity-and-optimization/
description: "Gated recall works at a small load, but simpler controls store more reliably. Four optimization interventions show why smoother training and better subsets do not establish usable capacity."
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/soam-study-d.css' | relative_url }}">
{% include soam-memory-series-nav.html %}

## How many memories can we actually use?

A memory system can look successful when it recalls a few familiar examples. The harder question is how many distinct associations it can recover reliably, including its least reliable memories, after accounting for everything needed to store and retrieve them.

The November 24 SOAM experiments made that question explicit. A gated recurrent candidate passed the recall requirements at **eight associations**, but failed at **32**. At the larger tested network size, an ordinary recurrent control with the same number of retained state values and a feedforward network both passed 32. Explicit lookup passed every tested cell.

The result gives us a practical comparison within this screen. It does not reveal the candidate's maximum capacity: most neural fits had not met the declared training-plateau check. Four subsequent optimization interventions also failed to make the gated candidate qualify. The distinction between a demonstrated useful load and a capacity limit matters throughout this series.

This is the first of four posts covering six completed development studies from November 24–26. The [companion report]({{ '/research/soam-memory-studies-november-2026/' | relative_url }}#capacity-and-optimization) gives the numerical comparisons, resources and source identities. These studies follow the earlier [navigation and stationary-memory experiments]({{ '/blog/soam-stationary-memory-and-navigation/' | relative_url }}).

## What the gate was supposed to contribute

The broader hypothesis is that a recurrent memory can learn to recruit useful parts of its population for a particular cue. A content state represents the current memory; a second state controls participation in the recurrent computation. If selective participation reduces interference enough to repay its own cost, a larger reservoir might support more usable associations.

The first screen used distinct 16-bit patterns. Four bits were erased at query time. A supplied separation between stored patterns ensured that the visible bits still identified the correct familiar pattern. The network started from a reset state, received the same partial cue throughout twelve settling steps, and predicted the full pattern. Training happened offline from supervised examples.

Qualification required at least 95% exact recall, at most 1% bit error, and at least 90% exact recall for the worst association, alongside identity recall. A model that repeatedly fails one memory should not earn a reliable-storage claim merely because the other memories are easy.

## The weak memories change the answer

At 32 associations, the gated candidate recalled **92.72% and 93.51%** exactly across the two independent banks. Its worst-association scores were **73.44% and 81.25%**. It missed both the average and worst-memory targets.

The flat control illustrates why the second target matters. Its averages exceeded 95%, yet its worst memories scored only 87.50% and 85.94%. It failed the joint rule. The larger ordinary recurrent and feedforward controls passed all guards on both banks.

Accounting also changes the comparison. The gated network retained two state values per indexed unit. At the larger size that meant 64 retained scalars. The state-matched recurrent control used 64 ordinary states and more trainable parameters. The feedforward control retained no episode state. Their deployment estimates were similar, but they were not simultaneously matched for parameters, state, computation and bytes.

## Better training proxies did not rescue retrieval

The follow-up campaign tested four specific explanations: unstable late learning steps, too little variety in practice cues, conflicting gradients, and uneven target representation in minibatches. Each intervention had a prospectively fixed rule and two fresh development banks. None passed its complete two-bank rule; none made the gated model usable at the difficult 32-association load.

Balanced replay produced the most instructive partial gain. On one bank, the eight memories ranked hardest by the baseline gained **46 exact responses**. The other 24 memories lost **42**. The whole bank gained only four, against a required 41, while other guards also failed.

That is an actual improvement on the chosen subset. It is also a warning about selecting the subset that makes a treatment look best. Ranking the difficult memories by the candidate instead reversed the apparent advantage. Smoother losses, a smaller practice–validation gap and repaired difficult examples each describe something useful, but none can substitute for the full retrieval requirement.

## Remembering and changing the active memory are separate

The first screen also exposed a sharp usability gap. The gated candidate could recall from a fresh reset, yet at the larger difficult cell its exact recall after a cue change was only about **0.049% and 0.146%**. The old active memory usually persisted when another partial cue arrived.

This was a declared diagnostic, separate from the capacity qualification rule. It shows why dormant storage, successful reset recall and updating an ongoing state need separate tests. A mechanism that resists change may preserve activity while obstructing the next query.

The completed evidence supports small-load recall and a clear practical advantage for simpler controls in the tested screen. It leaves optimal training, maximum capacity and learned organization unresolved. The [next post]({{ '/blog/soam-sparse-memory-and-routing/' | relative_url }}) asks whether enforcing genuinely sparse activity changes that comparison.
