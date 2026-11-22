---
layout: post
title: "SOAM E0 and E0-HOLD: A Memory That Moves Must Also Hold Still"
date: 2026-11-21 00:00:00 -0600
permalink: /blog/soam-stationary-memory-and-navigation/
description: "Longer zero-action training roughly halves recurrent drift, but misses the declared fix. Two experiments separate holding a pose, moving through actions, and recovering after a disturbance."
soam_studies: "E0 + E0-HOLD"
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/soam-study-d.css' | relative_url }}">
{% include soam-studies-nav.html %}

## A useful state has three jobs

Imagine keeping track of a box's orientation after it disappears from view. With no movement, the estimate should stay put. If an action rotates the box, the estimate should rotate with it. If internal activity is disturbed, the system should recover without quietly changing which orientation it represents.


**Terminology:** “Blindfolded action prediction” means the system receives action commands but no new sensory observations after its initial cue. “Zero-action drift” means it receives zero action and no new observations. Earlier labels called the first test “free action”; “free” referred to missing sensory feedback, not missing actions.

Those are three different requirements. A network can predict motion accurately while its stationary estimate drifts. It can also pull nearby states together while both slide toward the wrong pose.

SOAM's **E0** pilot tested those requirements in one small recurrent population. Its **E0-HOLD** follow-up extended stationary training from 24 to 128 steps. The follow-up reduced the candidate's mean 128-step pose error from **12.33° to 5.70°**, about 54%, but did **not** pass the declared fix: residual error remained above five degrees, and one recovery safeguard was unresolved.

The [joint technical report]({{ '/research/soam-stationary-memory-and-navigation/' | relative_url }}) records the methods, all model comparisons, uncertainty, costs and limitations.

## Before building a hierarchy

The broader idea is a collection of recurrent modules that represent objects or relationships, predict changes under actions, and exchange useful information. Different modules might specialize in different reference frames. Attention could eventually route an observation toward a module whose dynamics can explain it.

That remains a proposal. Before testing routing or communication, we need to know whether one candidate module can maintain a useful state. Otherwise, an apparent communication failure might begin inside the receiving module itself.

E0 therefore uses a deliberately small world: **one orientation on a circle**. An action adds an angular increment. A fixed projection turns the circle's two coordinates into twelve overlapping sensory features. Models receive noisy, sometimes partial features and an action; the true angle is reserved for evaluation. Clean sensory targets supervise offline training.

This is substantial scaffolding. There are no natural images, discovered object categories, sparse encoder comparisons or new memories acquired online. The inputs have a known two-dimensional structure, so these results cannot decide how a future system should organize diverse environmental experience.

## The candidate and its controls

The candidate, **NAV32**, has 32 recurrent activity values. Its learned symmetric weights govern zero-action dynamics. A separate learned skew-symmetric matrix adds an action-dependent influence: reversing the action reverses this contribution. An initializer converts a sensory cue into activity, a readout predicts sensory features, and a correction layer incorporates returning evidence.

These constraints make it a Hopfield-inspired rate network. They do not guarantee that every update decreases an energy or that training produces a stable circle of states.

Three controls put the result in context:

- **SYM32** uses a symmetric action matrix instead of the skew structure.
- **GRU32** is an ordinary gated recurrent network with the same state width and sensory interfaces, but more parameters.
- **PCA2** is a compact fitted estimator with a learned two-dimensional basis and action map. Its rank, polynomial action features and exact zero-action stationarity are supplied design choices.

All receive the same training evidence within each independent run. They differ in useful prior structure and resource use; this is not a perfectly matched architecture contest.

## E0: local recovery can coexist with drift

The pilot trained neural models for 600 updates on 24-step episodes, then evaluated ten fresh, independently trained systems per model. The test asked for accurate blindfolded action prediction, grounded prediction, stationary retention, local disturbance recovery, preservation of nearby distinct poses, and correction when observations returned.

NAV32 passed **six of seven** frozen criteria. Its mean error over 64 steps of prediction without new observations was .03336 normalized mean squared error, below the .05 requirement. A small transverse disturbance also shrank substantially over sixteen updates.

But with zero action, its pose estimate kept moving. Mean error grew from **0.82° initially** to **2.74° at step 24**, **8.19° at step 64**, and **13.86° at step 128**.

<figure>
  <a href="{{ '/assets/research/soam-e0/pilot-blindfolded.png' | relative_url }}"><img src="{{ '/assets/research/soam-e0/pilot-blindfolded.png' | relative_url }}" alt="E0 mean diagnostic trajectories across ten independent roots, including increasing zero-action pose error and local transverse contraction." loading="lazy"></a>
  <figcaption>E0 trajectories with clarified labels. Lines are descriptive means, without confidence bands. The report supplies the adjusted endpoint intervals and their decision rules. Open the figure for a larger view.</figcaption>
</figure>

E0's formal NAV32 outcome is **inconclusive**. The zero-action drift interval, 12.12–16.28°, is entirely above the five-degree target, but its width of 4.16° exceeds the four-degree precision cap fixed beforehand. The unfavorable observation remains; the experiment's categorical rule does not permit calling it adequately precise negative evidence.

The recovery measurement explains why the other passes do not rescue that result. We perturb a state away from a sampled family of pose representations, evolve both the disturbed state and its undisturbed partner, then compare their remaining transverse separation. **Both paths can drift together.** Smaller separation is useful local evidence, but does not show that either path stays at the correct pose or converges to an invariant manifold.

## E0-HOLD: train the missing time scale


The follow-up tested one change. In twenty fresh paired runs, **SHORT24** retained the original recipe. **LONG128** extended entirely stationary episodes to 128 steps. Moving episodes stayed at 24 steps. Each pair began with identical parameters and received identical original observations, actions and masks.

The added stationary tail supplied no new cues. It reused the already provided stationary target. Each episode kept equal total loss weight, so adding steps changed the time span and backpropagation length without simply multiplying the stationary episodes' weight. Both arms still had 600 optimizer updates and the inherited learning rate. The long arm received no separate tuning.

<figure>
  <a href="{{ '/assets/research/soam-e0/hold-blindfolded.png' | relative_url }}"><img src="{{ '/assets/research/soam-e0/hold-blindfolded.png' | relative_url }}" alt="E0-HOLD NAV32 trajectories compare SHORT24 and LONG128: longer training reduces stationary drift while the transverse recovery ratio increases." loading="lazy"></a>
  <figcaption>Archived NAV32 means with clarified labels across twenty paired roots. Lower error and lower transverse separation are better. These curves are descriptive; the confirmatory intervals are reported separately.</figcaption>
</figure>

The paired improvement was **6.63°**, with adjusted interval **5.02–8.80°**. That passed the predeclared five-degree practical-improvement requirement and its precision cap. The causal comparison is the fresh paired **12.33° → 5.70°**, rather than subtracting the new result from the pilot's 13.86°.

The residual error interval was **5.26–6.18°**. It is narrow enough and wholly above the five-degree absolute target. This time the formal outcome is **negative for the declared joint fix**. A substantial improvement and a failed fix are compatible findings.

## What happened to navigation and recovery?

NAV32's mean blindfolded action prediction error rose from .03290 to .03651. Its adjusted paired increase stayed below the permitted .01 margin, so that safeguard passed. This means bounded degradation under the declared test, not identical predictions. Descriptive sustained clockwise and counterclockwise action streams both worsened more than the mixed-action average suggests.

The transverse separation ratio rose from **.10684 to .13996**. Both values pass the absolute recovery target of .5. But the adjusted increase, **.00731–.06218**, crosses the allowed .05 degradation limit. The contraction proxy became weaker; the experiment establishes neither acceptable noninferiority within that margin nor harm definitively beyond it.

Eleven of thirteen joint criteria passed. The precise stationary failure and unresolved recovery safeguard prevent the stronger claim that longer training fixed drift while preserving the other required functions.

The controls make the distinction especially clear. GRU32 improved zero-action drift from **12.97° to 2.63°**, while its blindfolded action prediction error worsened from **.07717 to .26582**. Judging only the ability to hold still would have hidden a large navigation cost. SYM32 also improved holding still while retaining poor action prediction.

PCA2 remained the strongest prediction and state-size reference for this supplied rank-two task. It held still almost exactly and predicted actions with much lower error. Its zero-action identity also preserves a displaced state: the transverse ratio is one. Accurate estimation and autonomous restoration are separate capabilities.

## What we learned before adding modules

Extending stationary training helps this candidate, at a real cost: mean NAV32 fitting time rose from **2.90 to 9.63 CPU seconds**, about 3.32 times as much. The additional recurrence reused existing evidence; this was an equal-observation, equal-update comparison, not an equal-compute one.

The useful lesson is to evaluate holding, movement and recovery together. A stable-looking trace or a shrinking perturbation alone is too weak a basis for building a hierarchy. These bounded studies do not prove a continuous attractor, a universal stability–navigation tradeoff, or a Hopfield advantage over conventional estimators.

The recorded next recommendation is conditional: one fixed optimization-budget comparison at the 128-step stationary horizon, replaying the same corpus with a predeclared larger update count and fresh confirmation roots. The late training loss was still declining, which motivates testing optimization effort; it does not prove that more training will solve the problem. No successor experiment is activated by this publication.

Reference-frame translation, RIM-like communication, sparse encoders and hierarchical organization remain future questions. E0 and E0-HOLD give us a more precise account of the single-module behavior those later mechanisms would have to preserve.
