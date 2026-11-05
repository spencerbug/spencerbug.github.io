---
layout: page
title: "SOAM E1: Shared Recurrence Protocol Report"
permalink: /research/soam-e1/
description: "A protocol report on the first SOAM shared-recurrence pilot, its tied-state identifiability limit, controls, and reproducible evaluation plan."
---

<link rel="stylesheet" href="{{ '/assets/soam-sharing-demo.css' | relative_url }}">

**Version 1 · November 5, 2026 · protocol report, not an empirical results report.** This accompanies [Testing Shared Recurrent Memory]({{ '/blog/testing-shared-recurrent-memory/' | relative_url }}). The experiment was specified in project decision SOAM-049. No E1 fitting or confirmation trials had run when this protocol was frozen.

The research question is whether a shared recurrent implementation improves held-out action-conditioned prediction while preserving feature reconstruction, relative to declared independent and conventional references. The protocol explicitly limits what such a result would imply about neuronal sharing.

## Frozen documents and reproducibility

This page explains the study and its limits. The following byte-for-byte snapshots contain the complete protocol, platform contract, and numerical manifest:

- [Full E1 protocol v1, plain text]({{ '/assets/research/soam-e1-v1/shared-population-protocol-v1.txt' | relative_url }}).
- [Platform contract v1, plain text]({{ '/assets/research/soam-e1-v1/recurrent-platform-contract-v1.txt' | relative_url }}).
- [E1 numerical manifest, JSON]({{ '/assets/research/soam-e1-v1/shared_population_v1.json' | relative_url }}).
- [Source commit and SHA-256 provenance, JSON]({{ '/assets/research/soam-e1-v1/provenance.json' | relative_url }}).

The plain-text snapshots retain project-relative document links as source references; those links are not site navigation. This report and the JSON manifest are self-contained reading entry points. Download hashes establish snapshot identity, not that an experiment has been performed. Future results must record their own implementation, environment, inputs, checkpoints, and protocol hashes.

## The equivalence result and its assumptions

Let `F` be a deterministic state update with fixed parameters θ, `D` a fixed readout, `a` the command, and `q` the supplied role. Compare a shared state with the active bank of a separate-state realization using those same parameters:

$$
h_{t+1}=F_\theta(h_t,a_t,q),
\qquad
\tilde h_{t+1}=F_\theta(\tilde h_t,a_t,q).
$$

If the initial states match, induction gives matching trajectories and readouts:

$$
h_0=\tilde h_0
\;\Longrightarrow\;
h_t=\tilde h_t
\;\Longrightarrow\;
D_\theta(h_t)=D_\theta(\tilde h_t).
$$

The induction assumes identical initialization and inputs, fixed parameters, the same numerical operations, and no interaction with another active bank. The protocol's recall and transition episodes reset separately, so these conditions can be satisfied by construction. The T32 control checks that the implementation respects this equality.

This is a mathematical limitation of the observation scheme. It does not show that concurrent, uninterrupted, or differently coupled systems are equivalent. Conversely, merely adding concurrency would not automatically identify a unique benefit of physical neuron reuse: a new experiment would still have to define resource budgets and rule out equivalent state-space implementations.

A state intervention changes the comparison. Clamping a shared coordinate across both roles can affect both roles; clamping only the recall bank in the tied realization leaves transition unchanged. That supports participation of coordinates in a particular implementation. It does not establish that neuron overlap uniquely caused its performance advantage.

## What the task supplies

A simulated two-dimensional point is encoded through a fixed orthonormal projection into twelve features. Initial cues expose six noisy coordinates. The network gets a supplied recall/transition label once; that label is retained as two non-neural state flags.

Recall reconstructs the clean feature vector after ten zero-action updates. Transition predicts a moving point, whose simulator obeys:

$$
x_{t+1}=0.98 R(0.30a_{t,0})x_t+0.03(a_{t,1},a_{t,2})^\top.
$$

Here `R` is planar rotation and the three action components control rotation and translation. The model sees encoded observations and executed commands, not `x`, `R`, or the simulator's parameters. Clean observed records can supply training loss targets; they do not enter a free rollout.

Training and evaluation withhold different initial phase sectors and different joint action-bin combinations. Subsequent state distributions may overlap. This is generalization inside a supplied transform family, not demonstration of discovered concepts, new objects, or compositional skill learning.

## Candidate and references

The preferred rate network uses a symmetric recurrent matrix S and four skew-symmetric matrices A0…A3 on the same 32 activity coordinates. A skew-symmetric matrix has opposite-signed transposed entries and a zero diagonal. These constraints define a candidate rule; they are not a stability proof.

$$
W(a,q)=S+q_T\left(A_0+\sum_{j=0}^{2}a_jA_{j+1}\right).
$$

$$
h_{t+1}=0.5h_t+0.5\tanh\left(W(a_t,q)h_t+Ua_t+b+vq_T\right).
$$

`q_T` indicates the supplied transition role; `U`, `b`, and `v` are fitted input/bias terms. A fitted affine readout predicts features. The full protocol specifies sensory correction, initialization, losses, exact parameter packing, and intervention timing.

<div class="sharing-table" role="region" aria-label="Candidate resource comparison; scroll horizontally on small screens" tabindex="0" markdown="1">

| Model | Fitted scalar parameters | Available activity coordinates | Additional role flags | Purpose |
| --- | ---: | ---: | ---: | --- |
| S32 | 3,868 | 32 | 2 | Shared candidate |
| D25 | 3,849 | 50 across two banks | 2 | Approximately parameter-matched independent banks |
| D16 | 2,040 | 32 across two banks | 2 | Allocated-state-matched independent banks |
| G28 | 3,988 | 28 | 2 | Approximately parameter-matched GRU |
| G32 | 4,940 | 32 | 2 | Allocated-state-matched GRU |
| L12 | 924 | 12 | 2 | Observed-data bilinear reference |
| SYM32 | 1,884 | 32 | 2 | Separately fitted symmetric-only control |
| T32 | Reuses S32's parameters | 64 across two banks | 2 | No-fit equivalence/isolation control |

</div>

These are analytical design counts, not measured storage or speed. Expanded matrices, masks, buffers, projection, optimizer state, snapshots, and temporary allocations also count. Only one disjoint bank is active in an episode; lazy allocation could reduce physical storage. There is no claim of exact simultaneous matching of parameters, active neurons, memory, and compute.

## Measurements and decisions

The primary endpoint averages free-rollout normalized mean squared error over steps 1–8. Normalization uses a fixed training-distribution feature variance shared by all models. Grounded one-step and free-32-step errors are secondary diagnostics. Reconstruction uses the ten-update recall endpoint.

The confirmation plan uses ten fixed model/data roots and twenty paired episodes per role per root. Episodes and timesteps are averaged within root before uncertainty estimation. The ten roots—not thousands of correlated trajectory points—are the independent units for paired bootstrap inference.

| Evidence | Frozen requirement or interpretation |
| --- | --- |
| Primary utility | At least 10% mean relative improvement over each of D25, D16, G28, G32, and L12; positive adjusted lower bounds and adequate precision |
| Reconstruction retention | Adjusted upper bound on degradation at most 0.005 NMSE, against both S32's recall-only checkpoint and final D25 |
| Absolute competence | Mean S32 transition NMSE at most 0.10 and recall NMSE at most 0.02 |
| Causal participation | Targeted lesions affect both roles, with an additional effect beyond masking only the readout; random and disjoint controls reported |
| Directional contribution | Command-shift and removal-of-asymmetry controls worsen prediction under the prescribed criteria |
| Recovery | Perturbation-distance reduction with preserved accuracy and output variation; reported separately from the utility gate |
| T32 | Intact outputs equal S32; a lesion confined to one bank leaves the other role unchanged |

The full manifest fixes bootstrap tails, precision widths, numerical floors and causal-effect margins. Utility and recall comparisons use a seven-contrast adjustment. Mechanism tests use a separate six-contrast adjustment. Ordinary 95% intervals are also reported for readability. These choices are preregistered engineering judgments, not a guarantee of statistical power with ten roots.

Required references that hit the error floor make relative improvement uninformative. Inadequately trained GRUs trigger an inconclusive development screen. Candidate instability, interference, direction failures, uncertain outcomes and implementation invalidity remain distinct classifications. None licenses deleting unfavorable seeds or expanding the tuning budget after inspecting confirmation results.

## Bounded execution plan

Seven families, two development configurations and three development roots produce 42 fit instances. Ten confirmation roots produce 70 refits; seed-11 reproduction adds seven. The maximum inventory is **119 fit instances** and **27,820 scoring cells**, including intervention selection, controls and reproduction. A scoring cell is not an independent replication. Predeclared screen or budget exits can leave the study incomplete, with the unexecuted inventory recorded.

The study ceiling is four CPU hours, eight wall-clock hours, 2 GiB peak resident memory and 8 GiB aggregate artifacts. These are allocations, not measured performance. Implementation must first time representative unfitted operations and project the complete workload with a 2× margin. An infeasible plan requires a new recorded protocol decision before fitting; there is no silent reduction of controls or seed counts.

## What this study can establish

A positive result would support a useful shared recurrent implementation within the declared tasks, controls and budgets, along with evidence about causal participation of its units. It would not establish that sharing physical neurons uniquely caused the gain over parameter tying, nor that SOAM has learned objects, self-organized memory, achieved online acquisition, or demonstrated human-like sensorimotor intelligence.

A negative or inconclusive result still provides a decision point: prefer a simpler reference, examine an identified interference problem, revise a directional mechanism, or stop this line. Any later application or stronger sharing claim needs its own selected question and protocol.

For accessible context and primary background sources, return to the [article's reading guide]({{ '/blog/testing-shared-recurrent-memory/#background-reading' | relative_url }}).
