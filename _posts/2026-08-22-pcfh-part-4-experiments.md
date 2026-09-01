---
layout: post
title: "Predictive Control Factor Hierarchy, Part IV: Experiments and Falsification"
date: 2026-08-22 01:45:00 -0500
permalink: /blog/predictive-control-factor-hierarchy/experiments/
pcfh_part: 4
---

> **AI-generated content disclaimer:** This article was generated with AI assistance from the author's research ideas, questions, and iterative review comments. It describes a speculative research architecture, not an established or peer-reviewed result.

{% include pcfh-series-nav.html %}

**Part IV · Experiments, failure modes, and falsification · approximately 10–12 minutes**

The previous three parts define the architecture's contracts but intentionally leave several algorithms open: sparse candidate retrieval, participant grouping, factor retention, composition grouping, reference-frame learning, and inverse-control implementation.

A research architecture is useful only if those choices can be compared experimentally and if failure produces evidence against the central hypothesis rather than another layer of explanation.

## 11. Why this resembles renormalization

The renormalization analogy is useful only as an intuition for **effective descriptions**. It is not another mechanism in PCFH.

In statistical physics, coarse-graining eliminates microscopic variables while preserving selected large-scale behavior. The effective description can contain new interactions that summarize the influence of hidden detail.

PCFH proposes a learned analogue with a different selection criterion:

```text
many lower-level dynamical factors
        ↓
find a subgraph with a compact external interface
        ↓
hide its internal realization from the next layer
        ↓
retain a macro-state and effective predictive/control law
```

The shared idea is that a useful coarse description preserves the behavior that matters while making fewer internal degrees of freedom explicit.

The analogy should stop there. PCFH is not claiming to implement the renormalization group from physics.

## 12. Developmental learning

A plausible training curriculum begins with safe intervention rather than passive observation.

### Phase 1: Safe excitation

Use a conservative baseline controller to generate bounded perturbations, repeated trajectories, load changes, and contacts.

### Phase 2: Learn sparse influence proposals

Train compatibility heads to identify which token pairs have predictive or interventional relationships.

### Phase 3: Learn participant grouping and local factors

Allocate factor slots to candidate participant sets and test whether joint dynamics are simpler or more useful than alternatives.

### Phase 4: Learn reference frames and composition

Search for coordinates that simplify prediction/control, then test which retained factor subgraphs admit compact external interfaces.

### Phase 5: Learn inverse control around stable baselines

Use factor sensitivities first for residual corrections, feedforward terms, or target refinement rather than immediately replacing the proven low-level controller.

### Phase 6: Add longer temporal abstractions

Repeated transformation sequences become candidates for skill-like macro-factors.

### Phase 7: Add task objectives

Task reward selects desired high-level consequences. Physical safety constraints remain a separate hard control plane rather than another reward term that the agent can trade away.

## 13. Failure modes that could kill the idea

The main risks are architectural rather than merely hyperparameter problems.

- **Correlation masquerading as causality.** Co-moving variables may share a hidden cause. Randomized interventions are essential.
- **Quadratic routing.** Dense pair search may dominate compute before sparsity can help.
- **Transitive over-grouping.** A–B and B–C pairwise compatibility may incorrectly produce one A–B–C factor.
- **Factor explosion.** A sparse proposal graph can still create too many persistent factor hypotheses.
- **Composition over-grouping.** A chain of retained factors may be merged into one macro-subsystem merely because the factor graph is connected.
- **Premature composition.** Hiding state too early can remove information later needed for prediction, control, or safety.
- **Hierarchy collapse.** Higher layers may simply copy lower-level state.
- **Unnecessary hierarchy.** Extra levels may add latency without discovering new effective interfaces.
- **Gauge ambiguity.** Many coordinate systems may describe the same dynamics; equivalent frames should be allowed if behavior is preserved.
- **Singular inverse control.** Desired changes may be unreachable, underactuated, or ill-conditioned.
- **Model exploitation.** A planner may exploit model error instead of learning valid behavior.
- **Representation drift.** Lower-factor changes can invalidate higher controllers.
- **Temporal under-modeling.** Delay, backlash, hysteresis, discontinuous contact, and long memory may exceed the structured temporal basis.
- **Integral windup.** Persistent unreachable goals can make high-level accumulated discrepancy pathological.
- **Safety-critical weak couplings.** Sparsity objectives may prune rare but dangerous interactions.

A successful design therefore needs explicit null hypotheses and ablations, not only end-task reward.

## 14. The first experiment

The first test should be much smaller than vision.

Use a simulated two- or three-link arm with:

- permuted and differently scaled sensor channels;
- joint encoders;
- motor commands;
- end-effector coordinates;
- contact sensing;
- variable payload;
- one movable object;
- rotated external coordinate frames.

Do not tell the model which channel represents what.

Compare at least:

1. a flat MLP dynamics model;
2. a transformer dynamics model;
3. a neural relational inference model;
4. a compatibility model without structured temporal channels;
5. a temporal-relational model without hierarchy;
6. a two-level PCFH model.

The primary question is:

> **Can the system discover a compact dynamical factorization whose higher-level interfaces preserve both prediction and controllability while hiding unnecessary lower-level detail?**

### Experiment A: compatibility and participant grouping

Construct synthetic cases in which pairwise compatibility is deliberately non-transitive.

Example:

```text
A ↔ B     strong under mechanism 1
B ↔ C     strong under mechanism 2
A ↔ C     weak
```

Compare participant-grouping strategies:

```text
per_head_connected_components
seed_and_grow_with_predictive_gain
learned_factor_slots
hyperedge_proposals
pair_factors_only
```

Measure:

- one-step and rollout prediction;
- intervention consistency;
- false transitive merges;
- factor persistence;
- active factor count;
- compute and memory.

The architecture is weakened if grouping requires privileged semantic labels or if no grouping strategy improves on simple pair factors at matched compute.

### Experiment B: composition grouping

This is a **different experiment** over retained factors rather than compatibility edges.

Create a system with a known internal subsystem—for example several joint-level factors that together determine hand motion—and external variables that interact only through a small boundary.

Compare composition criteria such as:

- connected factor subgraphs;
- minimum-cut / boundary-size heuristics;
- learned composition slots;
- predictive-information bottlenecks;
- no composition.

Measure whether the proposed macro-token preserves:

- future external-state prediction;
- action-to-effect prediction;
- reachability judgments;
- inverse-control quality;
- uncertainty calibration;
- transfer after changing internal realization.

A strong result would be a hand-level macro-factor that remains useful after changing link masses or sensor gains even though the detailed lower-level realization has changed.

### Experiment C: reference-frame transfer

Perturb coordinates without changing the underlying task:

- rotate the camera frame;
- permute encoder channels;
- change sensor scaling;
- change link masses;
- attach a payload.

If higher factors retain their predictive/control meaning while low-level realization adapts, that is evidence for genuine reference-frame-like abstraction rather than trajectory memorization.

### Experiment D: scaling

Sweep:

- input-token count \(N\);
- retained-neighbor budget \(k\);
- factor-slot budget \(F_{\max}\);
- factor dimension \(d_f\);
- hierarchy depth \(L\).

Measure wall-clock latency, memory, active factor count, compression ratio, rollout quality, control quality, planning horizon, and transfer at matched compute.

The depth claim is weakened if extra levels do not improve predictive/control efficiency or compositional transfer.

### Key ablations

At minimum:

```text
remove_integral_channels
remove_derivative_channels
remove_interventions
replace_participant_grouping
remove_composition
replace_composition_grouping
remove_shared_forward_inverse_structure
remove_reference_frame_objective
remove_hierarchy
```

The proposal should also be considered weakened if generic recurrent memory performs just as well, learned compatibility edges fail interventional tests, factor grouping is unstable, composition does not preserve control, or the forward model provides no measurable benefit to inverse action selection.

## Safety boundary

The hard safety plane should remain outside task reward. Learned actions or targets should pass through verified actuator, state, and recoverability constraints wherever practical.

Work such as [Safe exploration with learning-based model predictive control](https://arxiv.org/abs/1803.08287) illustrates one family of approaches for learning around a recoverable safe set. PCFH does not depend on that specific method; the important architectural separation is that “unsafe but highly rewarding” should not be a valid trade inside the task objective.

## 15. The core hypothesis

The entire proposal can now be summarized without introducing another abstraction mechanism.

### Within one layer: Relate

$$
\boxed{
\text{Relate}
=
\text{pairwise proposals}
\rightarrow
\text{participant grouping}
\rightarrow
\text{learned relational dynamics}
}
$$

### Between layers: Compose

$$
\boxed{
\text{Compose}
=
\text{factor-subgraph grouping}
\rightarrow
\text{hide internal realization}
\rightarrow
\text{preserve external predictive-control behavior}
}
$$

### Across the hierarchy

$$
\boxed{
Z^{(\ell)}
\xrightarrow{\mathcal B_\ell}
Z^{(\ell+1)}
}
$$

The deepest research hypothesis is therefore:

> **Prediction and control can be dual traversals of a recursively composed hierarchy of learned dynamical factors, where each abstraction is justified by preservation of a smaller predictive-control interface.**

If that hypothesis survives the experiments above, the same machinery could potentially discover body structure, object-relative coordinates, manipulable interfaces, skill-like temporal factors, and task consequences without requiring each semantic level to be designed independently.

If it does not survive—if composition fails to preserve control, grouping is unstable, depth provides no matched-compute advantage, or the hierarchy merely copies state—then the architecture should be revised or abandoned rather than explained away.
