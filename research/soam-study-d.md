---
layout: page
title: "Study D Report: Persistent Acquisition and Sequential Retention"
permalink: /research/soam-study-d/
description: "D0–D2 methods, all four memory controls, adjusted uncertainty, interference, resource differences, reproducibility and the next research direction."
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/soam-study-d.css' | relative_url }}">
{% include soam-studies-nav.html %}

## Outcome and scope

**Completed November 17, 2026.** Explicit KV memory passes the frozen persistent-acquisition and sequential-retention conjunction, including the separate one-shot conjunction. REG and FAST acquire isolated objects but fail the retention guard. FAST's practical advantage is precisely negative against both conventional controls.

This is a result about a supplied feature/action task and a particular linear fast-weight rule. FAST applies its learned associative matrix once at query; no iterative Hopfield settling was tested. KV has more allocated storage and spare slots. No claim about learned organization, shared neurons, general recurrent-memory inferiority or global cost optimality follows.

[Read the explanatory article]({{ '/blog/soam-study-d-acquisition-and-retention/' | relative_url }}). The original report and decision remain preserved in the project archive. The later owner selection of a recurrent-retrieval pilot is a separate research-direction decision; it changes no D0–D2 outcome.

## Task and data boundaries

Each object has a stable 16-coordinate observed appearance and an independent two-coordinate latent relationship. An evaluator-only orthonormal projection maps the relationship, rotated by the object's angle, into eight sensory features. Appearance is a family prototype plus independent noise, normalized to norm four. Relationship coordinates are sampled uniformly from −1 to 1.

The learner receives appearance/relationship features, visibility masks, measured cumulative angle and incremental actions. It does not receive hidden relationship coordinates, the projection, simulator objects, object IDs or future observations.

A shared action model is fitted offline from 2,048 transition pairs (4,096 feature snapshots) covering eight families and eight objects per family. It uses a supplied trigonometric action basis with two learned 8-by-8 matrices. The reversible rotation family, fixed sensor, stable appearance correspondence and proprioceptive reference are declared scaffolding.

Acquisition budgets are 0, 1, 2, 4 and 8 distinct snapshots. Full appearance is stable; relationship channels have Gaussian noise with standard deviation 0.02. The fitted inverse action operator canonicalizes each snapshot before one write. Querying follows complete transient reset and exposes eight randomly selected appearance coordinates with noise of standard deviation 0.02, but no relationship coordinates. The model predicts the canonical relationship and eight subsequent action steps without new observations.

D1 uses 24 independent objects and eight queries per budget per root. D2 uses four sequences of eight similar objects per root, eight observations per object, and post-reset queries of every acquired object after each acquisition. Queries and old-model probes never update persistent parameters.

## Implemented candidates

| Model | Acquisition and retrieval | Numerical persistent bytes |
| --- | --- | ---: |
| NOWRITE | No new association survives reset; zero relationship initializes the common motion model | 1,048 |
| KV | Exact stable-key matching during acquisition; separate rows with averaged canonical values; nearest visible-coordinate squared-distance retrieval | 7,448 |
| REG | Online key/target sufficient statistics; mask-aware ridge solve on observed coordinates | 4,120 |
| FAST | Normalized delta update to a 24-by-16 matrix, with Frobenius norm clipping at 16; one normalized matrix read at query | 4,120 |

FAST's unclipped update is exactly one normalized squared-loss gradient step. The implementation tests direct-map equivalence; that equivalent computation is not another independent model or experimental replicate. Its recurrent action rollout is common to all four candidates.

Every writer has the same 8,192-byte writable ceiling, but actual allocations differ. KV preallocates 32 rows and D2 occupies eight. Persistent totals include the 1,024-byte common core and scalar settings. Actual storage is not exactly matched. All candidates retain 24 float64 transient values per query; temporary workspaces and Python objects are additional.

## Frozen hypotheses and confirmation

The primary D1 quantity, J, averages free-eight-step normalized mean squared error over acquisition budgets 1, 2, 4 and 8. Lower is better. Accuracy is canonical normalized squared error at most 0.1. It is not an identity classification score.

The acquisition conjunction requires a D1 gain point estimate of at least 20% over NOWRITE, an adjusted lower bound above zero and interval width at most 0.4. Budget-eight accuracy must have a lower bound of at least 0.8 and error an upper bound of at most 0.15. D2 mean old-object error increase must have an upper bound of at most 0.02, and old-object accuracy a lower bound of at least 0.8. One-shot support additionally requires its separate gain of at least 20% with a positive lower bound. FAST's practical comparison requires a 10% gain over each conventional control, positive adjusted lower bounds and interval widths at most 0.4; all comparisons are reported regardless of outcome.

Development roots 31001 and 31013 select core ridge, FAST learning rate and REG ridge from finite inventories. Known-object calibration uses distinct development streams. Confirmation roots are **32003, 32009, 32027, 32029, 32051, 32057, 32059, 32063, 32069 and 32077**. Root 32003 is repeated exactly.

Frozen decisions use bootstrap intervals over the ten independent fitted roots, 20,000 draws, and Bonferroni adjustment across 20 simultaneous quantities. Correlated queries and timesteps are not counted as independent roots. The protocol and manifest specify every guard, threshold, tuning option and stopping condition.

## Acquisition and retention results

| Model | D1 J | One-snapshot free-8 error | D2 old-object error | D2 error increase | Old-object accuracy |
| --- | ---: | ---: | ---: | ---: | ---: |
| NOWRITE | 0.988019 | 0.988019 | 1.026705 | 0.000000 | 4.6% |
| KV | 0.000601 | 0.001313 | 0.000165 | 0.000000 | 100.0% |
| REG | 0.000658 | 0.001364 | 0.055064 | 0.051113 | 87.1% |
| FAST | 0.001274 | 0.001380 | 1.486512 | 1.395732 | 6.0% |

All writers achieve 100% sampled isolated-object accuracy at eight snapshots. NOWRITE's zero error increase reflects unchanged poor performance, not useful retention.

| Retention quantity | Mean | Family-adjusted interval | Frozen requirement |
| --- | ---: | --- | --- |
| KV error increase | 0 | [0, 0] | At most 0.02 |
| REG error increase | 0.05111 | [0.03315, 0.07160] | At most 0.02: fails |
| FAST error increase | 1.39573 | [1.11154, 1.76907] | At most 0.02: fails |
| KV old accuracy | 100.0% | [100.0%, 100.0%] | At least 80% |
| REG old accuracy | 87.10% | [82.72%, 91.61%] | At least 80% |
| FAST old accuracy | 5.98% | [4.24%, 8.08%] | At least 80%: fails |

Zero-width KV bootstrap intervals reflect identical measured outputs and no failures in this finite sample. They do not bound all future cues or memory loads.

<figure>
  <a href="{{ '/assets/research/soam-study-d/old-object-accuracy.png' | relative_url }}"><img src="{{ '/assets/research/soam-study-d/old-object-accuracy.png' | relative_url }}" alt="D2 old-object accuracy with ten independent root values and frozen adjusted intervals: KV 100 percent, REG 87.1 percent, FAST 6.0 percent." loading="lazy"></a>
  <figcaption>Rendered from the archived root results and adjusted statistics. All earlier-object query outcomes are nested within ten independent roots.</figcaption>
</figure>

<figure>
  <a href="{{ '/assets/research/soam-study-d/retention.png' | relative_url }}"><img src="{{ '/assets/research/soam-study-d/retention.png' | relative_url }}" alt="Archived heatmaps show earlier-object prediction errors as eight objects are learned, with pronounced FAST interference." loading="lazy"></a>
  <figcaption>Archived D2 heatmaps. Rows are acquisition stages; columns are queried objects. White upper-triangle cells are objects not yet acquired. All models share the color scale, saturated above NMSE 1.5; raw errors are retained in the original run archive.</figcaption>
</figure>

FAST's mean relative D1 gain over KV is −114.85%, adjusted interval [−132.42%, −96.49%]; over REG it is −95.77%, [−112.73%, −80.26%]. Both intervals exclude the required +10% practical benefit and meet the frozen precision limit. These average per-root relative gains are not ratios of aggregate means. Mean absolute excess J is 0.000673 over KV and 0.000616 over REG; the small isolated-object errors should be read alongside the larger sequential failures.

## Failures and familiarity

For the prespecified first root, first sequence and first object, mean free-8 error changed from 0.0000897 to 0.0000897 for KV, 0.0001095 to 0.100984 for REG, and 0.0006089 to 0.599687 for FAST after seven further objects. The worst retained FAST query reached free-8 NMSE 13.926. No failure was excluded.

Unknown same-family queries were accepted at rates of 0% for KV, 32.1% for REG and 90.5% for FAST. At the final stage across all eight known objects, accepted-but-wrong query rates were 0%, 10.43% and 82.77%; ordinary root intervals were [0,0], [8.20%,12.58%] and [80.31%,84.92%]. Known-query acceptance was 94.30%, 91.37% and 94.38%.

These are descriptive diagnostics. Thresholds used known-object development data only; scores are not calibrated probabilities. Raw accuracy, query acceptance and wrong acceptance have different denominators and meanings. D3 corruption/revision and D4 fixed-capacity stress remain deferred.

## Resources and reproducibility

Mean serial recall times were 17.61 microseconds for NOWRITE, 33.12 for KV, 58.82 for REG and 34.69 for FAST; mean writes were 23.52, 40.22, 29.44 and 37.44 microseconds. Profiling included validation/accounting and used three warmups and twenty samples per root. These are measured implementation costs, not universal algorithm rankings.

The complete numerical study used **51.13 CPU seconds**, **61.60 execution-wall seconds**, **344,047,616 bytes peak RSS**, and about **165 MB of artifacts**. Engineering, tests and language-model work were separately accounted. There were 16 offline fits and 88 model evaluations, with no failures, exclusions, replacement roots or budget extensions.

The first confirmation root repeated 64 arrays exactly. Independent reconstruction checked 280 endpoint values, with maximum difference 2.22e−16. The archive audit checked 102 frozen source files, 40 input/checkpoint records and 1,135 indexed raw artifacts. The pre-run suite passed 303 tests; historical Study C source hashes remained unchanged. A compact status-export timing error was repaired with an explicit receipt, without changing scientific data.

The experiment used CPU float64, one Torch thread and deterministic algorithms. The original source commit was **227074388fc1f48da3ca9c340d5fd503e285658b**; the frozen aggregate source fingerprint is **e3b352a3cc4257203baced7a5be720b0884309efa9f31680cd5b50b0146241d2**.

## Evidence archive

The source snapshot, protocol, complete numerical results and approximately 165 MB raw run directory are retained in the project archive. This publication presents the methods, aggregate results and figures; it does not include downloadable source or raw data. No new fitting or scientific trials were run for this article.

## Subsequent direction

After reviewing D0–D2, the owner selected a fresh recurrent-retrieval pilot for protocol design. Its motivation is to test whether memory retrieval can use a recurrent substrate compatible with tracking, leaving learned specialization and organization as later questions. No pilot results are reported here. The original decision's full-versus-partial-cue diagnostic remains relevant to that design; the new selection does not retroactively change the completed decision.

Mutual population coupling, learned role discovery, superlinear scaling and self-organization remain hypotheses. Historical E1, A, B, B2 and C conclusions retain their original scope.
