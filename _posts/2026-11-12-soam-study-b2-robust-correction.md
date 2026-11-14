---
layout: post
title: "SOAM Study B2: When Should a Filter Trust Its Senses?"
date: 2026-11-12 00:00:00 -0600
permalink: /blog/soam-study-b2-robust-correction/
description: "A tiny fitted filter learns no new gates: channel disagreement improves its correction, while coherent false evidence and measured runtime expose the limits."
soam_studies: "B2"
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/soam-study-b2.css' | relative_url }}">
{% include soam-studies-nav.html %}

**Series update, November 14:** [Study C-H1 is now complete]({{ '/research/soam-study-c/' | relative_url }}). The B2 conclusions and handoff below retain their original chronology; selective scheduling and later C stages remain conditional.

[Study B]({{ '/blog/soam-studies-a-b-gates-and-correction/' | relative_url }}) left an awkward winner. A fitted two-state filter predicted more accurately than the neural alternatives, using very few parameters. It also trusted corrupted observations enough to damage its own estimate.

Before moving on to competing hypotheses, I inserted **B2 into the [A–F series]({{ '/research/soam-studies/' | relative_url }})**: could a better correction rule fix that weakness? The best tested answer uses a statistical estimate of sensor reliability. It improves ordinary accuracy and reduces much of the damage from outliers, while retaining rapid response to real changes. The remaining failures explain where that answer stops.

## Keep the predictor; change how evidence enters

The world is still a point moving in two dimensions, observed through twelve projected sensory features. Six visible channels usually contain enough information to locate it. The filter learns its observation and motion maps from training features; it receives neither simulator equations nor a ground-truth projection inverse.

<div class="b2-flow" aria-label="Causal estimation sequence">
  <div><b>1 · Predict</b><span>Previous estimate + action → expected features</span></div>
  <div><b>2 · Score</b><span>Measure prediction error before seeing the new cue</span></div>
  <div><b>3 · Correct</b><span>New observed features + mask → updated estimate</span></div>
</div>

The **innovation** is the difference between observed and predicted features. The **covariance** describes the filter's estimated uncertainty; the **gain** determines how strongly that innovation changes the state. B2 changes correction while keeping fitted maps fixed. A rejected cue leaves uncertainty unshrunk. No corrector sees corruption labels or future observations, and none changes its fitted parameters online.

## Several ways to be less trusting

<div class="b2-designs">
  <div><strong>Keep nominal trust</strong><p>The original <b>two-state filter (FILTER2)</b> uses one fixed sensor-noise assumption. A <b>stable numerical control (STABLE)</b> uses linear solves and a Joseph covariance update: the same intended estimation rule, with safer arithmetic.</p></div>
  <div><strong>Turn trust down everywhere</strong><p>The <b>conservative filter (R100)</b> assumes 100 times the nominal measurement variance. Every cue has less influence, including correct cues after a real change.</p></div>
  <div><strong>Reject surprising snapshots</strong><p><b>Normalized Innovation Squared</b> measures surprise relative to predicted uncertainty. The <b>nominal gate (NIS99)</b> uses a Gaussian 99% cutoff; the <b>calibrated gate (NISEMP)</b> calibrates cutoffs from development innovations.</p></div>
  <div><strong>Soften individual channels</strong><p>The <b>channel Huber corrector (CHANNEL2)</b> raises the assumed noise of a channel whose residual exceeds two predicted standard deviations. It reduces that channel's influence instead of rejecting the whole snapshot.</p></div>
  <div class="b2-selected"><strong>Estimate reliability from disagreement</strong><p>The <b>adaptive-variance filter (ADAPT1)</b> removes the innovation explainable by a state displacement. Remaining channel disagreement sets a bounded sensor-noise variance for this correction.</p></div>
  <div><strong>Keep a neural reference</strong><p>The <b>16-unit recurrent corrector (PC16)</b> is Study B's ordinary neural model with separate prediction and fixed-gain sensory correction. It is refitted on the same training evidence.</p></div>
</div>

These eight designs reached fresh confirmation. Earlier screens also tried softer whole-snapshot weighting, process-noise and gain changes, smoothed variance, and **temporal rescue**: accept a suspicious displacement after two or three consistent cues. Temporal rescue and its one tested hybrid still adapted too slowly. Heavy-tailed filters and another learned gate were conditional options, not implemented comparisons.

## Channel disagreement makes a useful distinction

The original filter was not broken. It was confident: its fixed measurement variance understates the high-noise condition, while its fitted process uncertainty includes genuine jumps. It therefore pulls strongly toward new evidence—even when that evidence is wrong.

The adaptive-variance filter asks whether the observed channels fit *any* displacement in the learned two-dimensional model. A real displacement can produce a large innovation with little leftover disagreement. Independent sensor errors often cannot.

<figure class="e1-figure">
  <a href="{{ '/assets/research/soam-study-b2/disagreement.svg' | relative_url }}"><img src="{{ '/assets/research/soam-study-b2/disagreement.svg' | relative_url }}" width="720" height="400" alt="Conceptual illustration: a genuine displacement and a coherent false displacement both fit the observation model. Inconsistent channel errors leave a residual outside that model, which can signal unreliable sensing."></a>
  <figcaption>Mechanism illustration, not measured trajectories. The filter can measure disagreement with its learned observation structure. It cannot see the hidden cause of an otherwise plausible displacement.</figcaption>
</figure>

The selected rule uses the current snapshot, without a history window, and carries one variance scalar for sparse-observation fallback. That estimate drives both the state correction and its uncertainty update. This depends on the fixed, redundant observation model; it is not a generally calibrated Bayesian posterior.

**Beyond this environment:** richer sensory features and dynamics may require nonlinear prediction and correction models. The causal ordering stays the same: **predict → score before seeing the new observation → correct**. ADAPT1's linear channel-disagreement rule is specific to this benchmark; its transfer is untested. Future designs must distinguish sensor unreliability from an inadequate model, and earn their robustness on richer environments rather than inherit it from B2.

## Better accuracy without freezing the state

{% include soam-b2-headline.html %}

These are fresh B2 means from **ten independently fitted roots**, with paired episodes. Error is normalized mean squared feature error; lower is better. Ordinary error is scored before correction. The report supplies intervals and every confirmed model.

Across the broader seven-condition corruption benchmark, adaptive variance improves error by **52.7%**, with a multiplicity-adjusted interval of **50.1–55.1%**. It passes every frozen accuracy guardrail. The calibrated hard gate also passes, improving that endpoint by **45.0%**; it is the simpler alternative.

Merely turning trust down does not achieve the same balance. Conservative fixed variance gives genuine-change error **0.09986**, beyond the **0.07** target. The nominal surprise gate looks excellent on corruption but reaches **0.54167** on real changes. Rejecting evidence can protect the wrong state.

## A plausible lie still looks plausible

<figure class="e1-figure">
  <a href="{{ '/assets/research/soam-study-b2/faults.svg' | relative_url }}"><img src="{{ '/assets/research/soam-study-b2/faults.svg' | relative_url }}" width="720" height="610" loading="lazy" alt="Paired error comparison: adaptive variance greatly improves isolated outliers, partial-channel corruption and the original corruption test; it also improves heavy-tailed and biased noise. Coherent snapshots and sustained plausible corruption remain almost unchanged."></a>
  <figcaption>Measured mean errors and ordinary 95% root-bootstrap intervals. Seven corruption conditions; the original filter and adaptive variance share fitted maps. Coherent and sustained faults account for about 90% of the adaptive filter's remaining balanced corruption error.</figcaption>
</figure>

B2 also constructs two worlds with identical observations and actions but different hidden causes. Every estimator must produce the same output in both. Longer history only helps when it eventually supplies distinguishing evidence. Multiple hypotheses may represent that ambiguity; they do not make missing information appear.

## Small does not automatically mean fast

{% include soam-b2-cost.html %}

Adaptive variance retains a large parameter and fitting-cost advantage. **Measured inference favors the neural reference**, however: small solves, double precision, and Torch/Python overhead make this implementation about **3.6 times slower** per step. Arithmetic counts alone would have hidden that result.

I would carry adaptive variance forward as the conventional single-hypothesis reference, with calibrated hard rejection as its lean control. That gives a future Study C a stronger starting estimator, alongside an explicit coherent-corruption failure. B2 does not establish the need for operating modes, useful attractors, or shared recurrent memory. **Study C remains conditional and unstarted.**

[Methods, all correctors, uncertainty and downloadable evidence]({{ '/research/soam-study-b2/' | relative_url }}) · [Studies A–F index]({{ '/research/soam-studies/' | relative_url }})

{% include ai-assisted-author-note.html %}
