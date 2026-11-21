---
layout: page
title: "SOAM D-R1 and D-R2: Recurrent Retrieval and Exact-Code Decoding"
permalink: /research/soam-retrieval-and-decoding/
description: "Joint technical report: fixed PH768 memory, controlled settling, retrieval reliability, and a fresh evaluator-only decoding diagnostic. Frozen thresholds, uncertainty, resources and provenance."
soam_studies: "D-R1 + D-R2"
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/soam-study-d.css' | relative_url }}">
{% include soam-studies-nav.html %}

**November 21 update:** The separately selected E0 and E0-HOLD studies now examine stationary retention, action navigation and local recovery in one recurrent population. [Read the joint article]({{ '/blog/soam-stationary-memory-and-navigation/' | relative_url }}) or [report]({{ '/research/soam-stationary-memory-and-navigation/' | relative_url }}). They do not resolve the retrieval/decoding diagnosis below, which remains a record of its November 19 evidence and decision.

## Scope and decisions

This joint report covers D-R1, completed November 18, 2026, and its independently selected D-R2 follow-up, completed November 19. [Companion article]({{ '/blog/soam-retrieval-and-decoding/' | relative_url }}). These names refer to the recurrent-retrieval studies; the preceding Study D's D1 isolated-acquisition and D2 retention stages are separate labels.

**D-R1:** PH768's additional settling gives a small positive accuracy contribution, precisely below the frozen five-percentage-point practical margin. Reliable sequential retrieval fails three guards. **D-R2:** exact acquired-code decoding is correct throughout the sample, while ordinary partial-cue recall is worse; the formal completion-gap diagnosis remains **inconclusive** because the adjusted interval exceeds its frozen width cap. KV remains the scoped conventional reference.

Both executions are valid. No failed fit, excluded root, replacement run, post-confirmation tuning or automatic budget extension is reported. Earlier experimental outcomes retain their meaning. No successor is selected by this publication.

## Shared task and information boundaries

Each object has a stable 16-coordinate appearance key and an independently sampled two-dimensional relationship. A fixed seed-1729 orthonormal 8-by-2 projection supplies eight relationship features. Similar appearance keys can label different relationships. A supplied rotation formula has two fitted feature-space matrices; every independent root fits them offline from 2,048 clean transitions. Core ridge is 1e-6 in the selected setting. Feature normalization is that root's training-input mean square, floored at 1e-8.

Grounded acquisition provides the full appearance, noisy relationship features and measured reference angle. The common fitted inverse action operator canonicalizes each observation before a write. Relationship and query noise standard deviation is .02. Acquisition angles range from −.4 to .4 radians; query action increments range from −.6 to .6. A partial query exposes eight randomly chosen appearance coordinates and hides all relationship coordinates. Free eight-step predictions receive actions but no correct future observations.

Initial projection, correspondence, action family, reference angles, encoder thresholds and unit roles are supplied scaffolding. Persistent parameters survive complete transient-state reset; inference and evaluation never write persistent memory. Every arm receives the same permitted observations within a root. Evaluator identity, clean relationship and future targets stay outside learner inputs.

## PH768 mechanism

PH768 is the `PH-FULL` arm: 16 appearance coordinates × 32 threshold units plus eight relationship coordinates × 32 threshold units. Midpoint thresholds cover [−4,4] for appearance and [−1.5,1.5] for relationship features. Values encode as +1 above each threshold and −1 below it. Decoding multiplies the mean of a coordinate's 32 activities by its bound. The same decoder applies to nonmonotone states, without sorting or target-based correction.

Persistent memory is a 768-by-768 float64 projector P and counters. For each acquired code x, the write computes a residual outside P's current span, reprojects it once for numerical stability, and adds its normalized outer product if the squared residual exceeds 1e-10 times x's squared norm. The result is symmetrized. It retains no separate pattern bank, object-index cache or replay buffer. Span preservation is checked at maximum absolute tolerance 1e-8.

Retrieval uses symmetric weights W formed by zeroing P's diagonal in a transient copy. Observed appearance bits remain clamped. All unobserved coordinates initialize to zero. Free units update asynchronously in ascending coordinate order to the field's sign; fields within ±1e-12 preserve the current activity. PH-FULL stops after an unchanged complete cycle or 32 cycles. PH-1 returns after the first cycle of the same trajectory and acquired weights. Energy checks verify the coordinate updates; a low energy or fixed point is not a correct-recall criterion.

## D-R1 design and frozen inference

D-R1 includes NOWRITE, KV, REG, FAST, REG-LIFT, PH-FULL and the same-checkpoint PH-1 control. KV uses separate key/value rows and nearest visible-key retrieval. REG is mask-aware online regression. FAST is the preceding study's direct delta-map reference. REG-LIFT uses the same 512-coordinate expanded appearance code as PH768, followed by ridge regression. It tests benefits of the encoding without Hopfield settling. REG and REG-LIFT ridge .01 and FAST rate 1.0 were selected on development data.

Per root, isolated acquisition uses 24 objects, budgets 0/1/2/4/8 snapshots and eight queries per budget. Sequential acquisition uses four sequences of eight similar objects with eight snapshots per object; every acquired object is queried after each acquisition. Full and partial cues share visible-coordinate noise. The total is 448 distinct grounded acquisition snapshots per arm/root, with isolated memories and sequences reset separately. The primary sequential endpoint covers the first seven objects after all eight have been learned.

Fixture root: 40011. Development/calibration roots: 41001 and 41013 with separate streams. Confirmation roots: **42003, 42009, 42027, 42029, 42051, 42057, 42059, 42063, 42069, 42077**. Exact repeat: 42003. Namespace: `soam-study-d-r1-v1`.

Accuracy means canonical normalized mean squared error (NMSE) at most .1; it is not object-ID classification. The primary contrast is PH-FULL minus PH-1 raw partial-cue accuracy. The practical margin is .05 and interval-width cap .10. Paired-root percentile bootstrap uses 200,000 resamples, seed 43013 and a Bonferroni family of twelve quantities at family alpha .05. Ten independently fitted roots are the units; objects, queries and timesteps are nested.

Known-object acceptance thresholds are calibrated separately by arm and cue condition from distinct development-calibration streams at the .95 quantile. Scores are residuals, not probabilities. Thresholds annotate acceptance without changing outputs or writes.

## D-R1 results and reliability guards

| Contrast in raw partial-cue accuracy | Mean, percentage points | Adjusted interval, points | Frozen classification |
| --- | ---: | --- | --- |
| PH-FULL minus PH-1 | +2.143 | [0.982,3.661] | Precise negative practical benefit against +5 |
| PH-FULL minus REG | −15.357 | [−21.250,−6.786] | Inconclusive: width >10 |
| PH-FULL minus KV | −29.688 | [−36.116,−21.518] | Inconclusive: width >10 |
| PH-FULL minus REG-LIFT | −24.598 | [−30.670,−17.321] | Inconclusive: width >10 |

The primary width is 2.679 points. Secondary intervals favor the controls in direction, but fail the declared precision cap; their categorical outcomes remain inconclusive. This is neither equivalence nor a PH768 advantage.

| PH768 guard | Mean | Adjusted interval | Requirement / outcome |
| --- | ---: | --- | --- |
| Isolated budget-eight accuracy | 1.00000 | [1,1] | Lower ≥.8: passes in sample |
| Isolated free-eight NMSE | .00118 | [.00096,.00140] | Upper ≤.15: passes |
| Earlier-object accuracy | .70312 | [.63884,.78482] | Lower ≥.8: established failure |
| Retention NMSE increase | .04784 | [.03522,.06340] | Upper ≤.02: established failure |
| Known-query acceptance | .94196 | [.93036,.95491] | Lower ≥.9: passes |
| Accepted and wrong / all known queries | .27232 | [.19464,.33438] | Upper ≤.05: established failure |
| Unknown-query acceptance | 0 | [0,0] | Upper ≤.1: passes in sample |

Retention compares final earlier-object free-eight error with the error immediately after that object was acquired. The isolated acquisition quantity J averages free-eight NMSE over budgets 1, 2, 4 and 8.

The remaining acquisition contrast is a .99792 relative reduction in isolated-object acquisition error versus NOWRITE, interval [.99757,.99830]. It passes the .20 point estimate, positive lower bound and .40 width criteria. Isolated learning therefore succeeds within the scaffolded task while the reliable sequential-retrieval conjunction fails.

<figure>
  <a href="{{ '/assets/research/soam-retrieval/settling.png' | relative_url }}"><img src="{{ '/assets/research/soam-retrieval/settling.png' | relative_url }}" alt="Archived D-R1 accuracy by settling cycle, with a small initial improvement and a plateau near 70 percent." loading="lazy"></a>
  <figcaption>Stopped paths are padded for display. The frozen comparison is between one cycle and each query's full stopping procedure.</figcaption>
</figure>

Full-cue PH768 recall is .71607 versus .70312 for partial cues. A post hoc audit covered the available final fourth-sequence checkpoint at each of ten roots: every one of its 64 acquired codes was preserved in the projector span, maximum residual 1.78e-15. This audit did not cover unarchived earlier-sequence checkpoints. It establishes neither unique association identity nor a useful basin or decoder on every settled state.

## D-R2 design: privileged decoding isolated from inference

D-R2 retains the unchanged PH-FULL, KV and REG-LIFT implementations and inherited settings. One fixed-load evaluation follows eight objects × eight snapshots in each of four sequences. The first seven objects receive eight partial-cue queries each. There is no hyperparameter search, prefix retention test, unknown-rejection test, architecture change or capacity sweep.

Ordinary predictions are saved first. A pure array evaluator then reconstructs the exact code from each actual acquired observation and the fitted inverse action transform, decodes all eight correct-object codes, and scores each separately against the clean canonical relationship. All snapshots have equal weight. It never selects the best target-scored code or supplies a code, identity or target to learner inference. This privileged reference is a diagnostic ceiling, not deployable recall or a mathematical upper bound on every possible estimate.

Fixture root: 50011. Confirmation roots: **53003, 53009, 53027, 53029, 53051, 53057, 53059, 53063, 53069, 53077**. Exact repeat: 53003. Fresh task-root namespace `soam-study-d-r2-v1:{root}` is embedded in the inherited hash-based generator. Each root has its own 2,048-transition fit, 256 acquisition snapshots and 224 earlier-object query cues. No D-R1 confirmation sample is reused as unseen data.

The primary endpoint is exact-code accuracy minus ordinary PH-FULL accuracy, with practical gap .05, maximum interval width .10 and exact-code adequacy lower bound .95. Ten independent root means receive 200,000 paired bootstrap resamples, seed 54013, with a two-quantity Bonferroni family at alpha .05. Other endpoints use descriptive ordinary 95% root intervals. All-identical outcomes yield degenerate empirical bootstrap intervals; these do not establish zero population risk.

## D-R2 results and precision limit

| Output path | Raw accuracy | Canonical NMSE | Free-eight NMSE |
| --- | ---: | ---: | ---: |
| PH-FULL cue recall | .77634 | .08339 | .05813 |
| REG-LIFT cue recall | .96071 | .01767 | .01767 |
| KV cue recall | 1.00000 | .00015 | .00015 |
| Exact acquired-code decode, evaluator only | 1.00000 | .01012 | Not a learner rollout |

The adjusted primary gap is **.22366 [.15357,.29018]**, width **.13661**. Exact-code accuracy is **1.0 [1,1]** in the empirical interval. The positive gap exceeds the practical margin throughout the interval, but its width exceeds .10. **Frozen classification: inconclusive.** No additional roots or relaxed criteria were introduced. D-R2 does not change D-R1's negative practical-settling result or establish a cross-study improvement.

<figure>
  <a href="{{ '/assets/research/soam-retrieval/decoding.png' | relative_url }}"><img src="{{ '/assets/research/soam-retrieval/decoding.png' | relative_url }}" alt="Ordinary PH768 recall is 77.63 percent, while privileged exact-code decoding and KV score 100 percent in D-R2's finite sample." loading="lazy"></a>
  <figcaption>Ordinary 95% root intervals are plotted. The frozen primary decision uses the adjusted gap interval above and remains inconclusive.</figcaption>
</figure>

All forty final sequence projectors preserve their acquired codes, maximum residual 3.94e-14. Mean squared free-coordinate code discrepancy, divided by four, is .00911 to the correct object's nearest acquired code and .05538 to other objects' codes. Another object's code is strictly closer on .446% of queries. These nearest-code calculations are evaluator-only; they never alter predictions.

Every queried relationship state contains at least one upward step in one of its eight thermometer codes. All queries converge, averaging 2.300 cycles. These are descriptive observations: a malformed code can still decode accurately, and proximity to a correct code does not ensure an accurate output. No intervention isolates clamping, encoding geometry, cue noise, mixed states or decoder behavior off the acquired-code set as the cause.

The shared action core's mean grounded one-step NMSE is 8.75e-18; its free-eight probe NMSE is 2.23e-16. It remains an easy supplied-family scaffold. Ordinary rollout errors begin with the retrieved value and are not repaired using future truth.

## Resources and reproducibility

| D-R1 arm | Partial-cue accuracy | Persistent bytes | Mean serial recall, microseconds |
| --- | ---: | ---: | ---: |
| NOWRITE | .05357 | 1,048 | 30.22 |
| KV | 1.00000 | 7,448 | 47.25 |
| REG | .85670 | 4,120 | 72.79 |
| FAST | .05848 | 4,120 | 48.49 |
| REG-LIFT | .94911 | 2,131,480 | 2,480.48 |
| PH-FULL | .70312 | 4,720,160 | 28,286.43 |
| PH-1 | .68170 | Shared PH checkpoint | No independent serial timing |

These are actual unequal allocations within an 8 MiB per-arm ceiling. PH also materializes a 4,718,592-byte effective weight matrix and retains activity, fields and bounded cycle-detection history. Its implemented cycle with invariant diagnostics costs approximately 5 × 768² multiply-add pairs. REG-LIFT solves a 256-visible-coordinate system per partial query; KV scans eight stored keys. Neither arithmetic estimates nor timings establish a universal performance ranking.

D-R2 reuses these persistent sizes, with all three models resident and a shared core during evaluation. Its recall measurements are batch-derived and should not be substituted for D-R1's serial benchmarks. Evaluator code arrays are separate from learner memory and included in measured process/storage use.

| Execution record | D-R1 | D-R2 |
| --- | ---: | ---: |
| Core fit attempts, all complete | 16 | 12 |
| Independent confirmation roots | 10 | 10 |
| Cumulative CPU seconds through closeout | 651.423344 | 26.880253 |
| Execution-wall seconds through closeout | 652.182670 | 27.089411 |
| Peak RSS, bytes | 428,195,840 | 366,903,296 |
| Artifact bytes before final receipt | 572,385,949 | 348,556,036 |
| Exact repeated numerical arrays | 5,497 | 87 |
| Additional exact checkpoint tensors reported | See D-R1 array/checkpoint audit | 42 |
| Independently reduced endpoints / root metrics | 2,100 | 210 |
| Pre-run passing tests | 318 | 328 |

Both studies used Python 3.12.13, NumPy 2.5.4 and PyTorch 2.14.1 on macOS 26.6.2 arm64: CPU float64, deterministic Torch, one intra-op and one inter-op thread. Numerical fixtures, development where applicable, confirmation, repeats, diagnostics and reporting were charged; engineering, unit tests and process startup were separate. D-R1's ceiling was 7,200 CPU / 14,400 execution-wall seconds and 2 GiB each of RAM and artifacts. D-R2's fresh ceiling was 900 / 1,800 seconds, 2 GiB RAM and 1 GiB artifacts. Different evaluation inventories explain much of the cost difference; it is not a mechanism speedup.

D-R1 source commit: `a84736dbbd3fcdf51bd59b868e2ac5557b17d451`; scientific fingerprint: `347e5eb9cb539374ea069de2d485f33fdb2070b06a9fbb2c670f207ffe034011`.

D-R2 source commit: `924acd8c3f32af9abfbd77ff69f8bab3030b01cb`; scientific fingerprint: `0df3abe0ec7906dea1d1978280709f99f3111b2c06fff066d759559ad3fba577`.

D-R1 verified 110 frozen source files and 102 historical Study D files. D-R2 verified all 110 D-R1 hashes unchanged; its closeout checks 116 frozen files against working and archived copies and hashes 397 payload files. No trial was rerun for publication. The figures are unchanged copies from the study archives. This publication presents the joint methods, aggregate evidence and decisions; source snapshots and raw datasets remain in the project archive and are not downloadable here.

## Interpretation and conditional next step

The experiments separate algebraic storage, cue-driven completion and decoded usefulness. They provide no general rejection of recurrent associative memory, no learned-organization result and no shared-neuron or neuroscience validation. Useful exact-code content is compatible with incorrect ordinary recall. Correct convergence and a preserved span alone cannot establish the desired capability.

The recorded decisions retain KV for this task. If a formal precision-qualified diagnosis is needed for the next architecture decision, D-R2 recommends a fresh fixed-design precision replication, with its independent-root count, ceiling and stopping rule frozen first. That recommendation is conditional; no new study is selected. Historical E1's stop, the earlier revision decisions and all completed negative results remain intact.
