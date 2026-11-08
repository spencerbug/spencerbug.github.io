---
layout: page
title: "SOAM E1 Results: Prediction, Sharing, and Recovery"
permalink: /research/soam-e1-results/
description: "The complete E1 v1 + A1 result and SOAM-052 stop decision: validity, comparisons, uncertainty, resource accounting, interventions, T32 equivalence, and reproduction."
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">

**November 8, 2026 · Completed experiment SOAM-051 · Reviewed decision SOAM-052**

<p class="e1-status"><strong>Decision: stop promotion of the tested S32 candidate under E1 v1 + A1.</strong> Its governing frozen outcome is <code>recall_interference_or_failure</code>, specifically absolute recall failure. Both relative retention guardrails passed. This decision does not reject all shared recurrence or select a replacement architecture.</p>

<nav class="e1-links" aria-label="Companion reading"><a href="{{ '/blog/a-memory-can-settle-and-still-be-wrong/' | relative_url }}">Visual companion article</a><a href="{{ '/research/soam-e1/' | relative_url }}">Pre-results protocol report</a><a href="{{ '/research/' | relative_url }}">All reports</a></nav>

This public report combines the completed study and its gate review. Values and tables are transcribed from the archived evidence; figures render those statistics without new fitting, selection, resampling, or observations. The original scientific record remains unchanged. This is exploratory research, not a peer-reviewed result.

<nav class="e1-toc" aria-label="Report contents" markdown="1">
**In this report**

- [Design, information parity, and validity](#design-information-parity-and-validity)
- [Uncertainty and frozen decision precedence](#uncertainty-and-frozen-decision-precedence)
- [Resources and disclosed limitations](#resources-and-disclosed-limitations)
- [Separate claims and architectural consequences](#separate-claims-and-architectural-consequences)
- [T32 equivalence and exact reproduction](#t32-equivalence-and-exact-reproduction)
- [Evidence downloads and provenance](#evidence-downloads-and-provenance)
- [All model errors](#model-errors-and-resource-differences), [primary comparisons and guards](#primary-benefit-and-recall-guardrails), [causal contrasts](#causal-overlap-and-direction), [all controls](#all-lesion-and-direction-controls), [recovery](#cue-dependence-and-finite-horizon-recovery), [individual roots and failures](#root-level-primary-results-and-failures)
</nav>

## Design, information parity, and validity

The test asks whether a shared population supports reconstruction and command-conditioned prediction better than mandatory references, without sacrificing reconstruction. The two roles occur in separate episodes; their labels are supplied. It tests reuse across functions, not concurrent binding or learned role discovery.

All families receive the same six-coordinate noisy cue, mask, role, and commands from a fixed 12-feature projection of a two-dimensional latent task. The task supplies a rotation/contraction/translation rule. Grounded observations arrive only after prediction; free rollouts receive no fresh observations or hidden world state. The initial projection stays fixed at seed 1729. Error is normalized by training variance 0.03096017249093924 from 2,048 separate normalization records (train root 1801).

The selected candidate S32 has symmetric recurrence plus command-dependent skew-symmetric components. D25 and D16 use independent recall/transition populations. G28 and G32 are conventional GRUs. L12 is a linear ridge-fitted model. SYM32 is the independently fitted symmetric-only mechanism control. T32 is a no-fit, tied-weight, two-state-bank diagnostic.

Each family received two frozen configurations and development roots 401/409/419. Development selected neural configuration 1 (learning rate 0.003), L12 configuration 0 (ridge penalty 0.0001), and G32 as the strongest reference. The reference competence screen passed. These are comparable finite tuning opportunities, not claims of optimal training.

Confirmation used independent roots **11, 23, 47, 71, 101, 131, 173, 211, 257, 307**, with distinct training and confirmation-scoring streams and 20 evaluation episodes per role per root. Four targeted lesion coordinates were selected on the separate development-diagnostic stream before confirmation. No configuration or lesion was selected from confirmation outcomes.

Each fit used 6,400 recall source records and 4,800 transition episodes / 38,400 transitions. Neural training used 100 recall-only plus 300 joint Adam steps, batch size 16; L12 used three ridge solves on the corresponding records. Repeated targets and replay do not count as new observations. A1 deduplicated physical archive files without changing information exposure.

The audit checked 53,900 training-input references and 4,620 base scoring references for parity. The inventory is complete: **42 development + 70 confirmation + 7 reproduction fits; 27,820 cells**. Scientific fit/cell failures, exclusions, replacements, retries, and post-confirmation retuning: **zero**. The original 190-test suite passed; the gate audit independently checked archive integrity, source/configuration parity, root statistics, isolation, and reproduction. These are recorded historical checks, not a claim that publication reran the experiment.

## Uncertainty and frozen decision precedence

The independent unit is the **paired confirmation root**, not a timestep, episode, or cell. Episodes are averaged within root. Seed-11 reproduction adds no independent sample. The frozen bootstrap uses 10,000 PCG64 resamples, inference root 8675309 (derived seed 7170790573829272725). Five gains and two retention contrasts share adjusted tails 0.05/14; six causal contrasts use tails 0.05/12. Descriptive and recovery intervals are ordinary 95% intervals.

Primary gain is the mean of per-root relative error reductions against each reference, not the ratio of pooled errors. Passing requires mean gain ≥0.10, adjusted lower bound >0, and adjusted width ≤0.20 against **every** mandatory reference. Wide intervals do not establish equivalence or precise absence of benefit.

<figure class="e1-figure">
  <a href="{{ '/assets/research/soam-e1-results/benefit-intervals.svg' | relative_url }}"><img src="{{ '/assets/research/soam-e1-results/benefit-intervals.svg' | relative_url }}" width="600" height="440" alt="Adjusted paired gain intervals: D25 20.1 percent [9.3,31.0], D16 21.1 [14.3,30.0], G28 minus93.9 [minus138.4,minus55.6], G32 minus152.6 [minus233.3,minus86.6], L12 minus2.1 [minus22.1,10.3]."></a>
  <figcaption>Adjusted paired-root intervals. Positive favors S32. The dashed line marks the 10% mean-benefit minimum; the lower bound must exceed zero and interval width must also be ≤20 percentage points. Only D16 meets all three individual criteria. A negative gain can exceed 100% in magnitude because its denominator is the reference's error.</figcaption>
</figure>

| Frozen precedence | Evidence | Consequence |
| --- | --- | --- |
| 1. Invalid execution/comparison | No demonstrated leakage, wrong equation/source, parity defect, broken isolation, or missing scientific row; reporting caveats below | Does not supersede the scientific result |
| 2. Incomplete/floor/reference instability | Complete finite inventory; competence screen passes; no reference error reaches the 1e-6 floor or resource cap | Does not apply |
| 3. Recall interference/failure | S32 recall 0.077657, 95% interval [0.068287, 0.086725], exceeds 0.02; all ten root means fail; both relative guards pass | **Governing outcome: absolute recall failure** |
| 4. Directional failure | Free-8 mean 0.086825 ≤0.10; action tests are not precise failures | Does not override the earlier recall failure |
| 5. Useful sharing supported | Absolute recall, all-reference benefit, and causal precision requirements do not all pass | Cannot proceed |
| 6. Precise no practical benefit | No required-reference gain meets both upper bound <0.10 and width ≤0.20 | Do not claim this class or equivalence |
| 7. Remaining inconclusive | Several component estimates remain unresolved | Preserve their uncertainty alongside the clear recall failure |

The relative guards address mean retention during offline fitting, not online forgetting resistance or every individual root. Root 307 worsened despite the mean pass. A **stop** decision preserves the earlier clear recall rule; hypothetical better tuning is not a confound that permits revising the frozen outcome after seeing confirmation.

## Resources and disclosed limitations

| Resource | Recorded/charged amount | Frozen cap |
| --- | ---: | ---: |
| Maximum new fit CPU | 36.121810 s | 90 s |
| Development CPU | 392.372820 s | 4,000 s |
| Confirmation CPU | 1,736.235285 s | 8,000 s |
| Reproduction CPU | 316.280692 s | 1,200 s |
| SOAM-051 cumulative CPU / wall | 2,842.168314 / 2,871.456852 s | 14,400 / 28,800 s |
| Through gate review, cumulative CPU / wall | 2,906.209410 / 2,956.593458 s | Same caps |
| Through gate review, overhead CPU | 461.320613 s | 1,200 s |
| Measured peak RSS | 853,032,960 B; scientific runner 417,562,624 B | 2 GiB |
| Artifact allocation through gate, including reserve | 680,181,226 B | 8 GiB |

The carry includes earlier failed/complete calibration and engineering attempts. Actual maximum fit and repeat time exceeded calibration projections but remained within frozen runtime ceilings. No allocation was extended. Publication rendering and site verification are separate engineering work, not a reopened scientific allowance.

The model table below counts readouts and both disjoint banks; two non-neural role flags are additional. D25/G28 approximately match parameters; D16/G32 match allocated neural state. Active widths, training algorithms, and compute differ. In particular S32 vs D16 also changes active width from 16 to 32. There is no exact simultaneous parameter/state/compute match. No replay memory or supplied pattern bank exists at inference. The recorded 4,820,893,440 evaluation linear multiply-accumulates exclude nonlinearities, backpropagation, ridge solves, and I/O; they are not total training FLOPs.

Three qualifications remain visible:

1. Raw provenance's `config_sha256` hashes the engineering capture wrapper. The separately audited actual scientific configuration has `fixture: false`, complete exposure traces, and canonical SHA-256 `b9f125d176844963db9aaadf8ec32f43da76e70aa5429dd77bd637fc221c3f80`. This resolves a metadata-label deficiency; it does not show that a fixture ran instead.
2. Generic L12 exposure fields describe neural loss shapes. Ridge traces establish the actual three solves and data counts; those generic fields do not establish gradient-update or exact compute parity.
3. Two post-run reporting extractions were incomplete and conservatively charged 177 + 44 CPU/wall seconds. Their separate peak RSS and the first terminal diagnosis were not retained. A later regrouped-mean check used 1e-12 tolerance (maximum discrepancy 6.66e-16); numerical bootstrap, T32/isolation, and reproduction checks were exact.

The gate found no demonstrated defect that invalidated the complete scientific comparison. **It cannot certify RSS-cap compliance for every reporting attempt**, nor flawless end-to-end telemetry or resource efficiency. Missing telemetry is not assumed zero. These limits remain part of the negative result.

## Separate claims and architectural consequences

| Evidence lane | Supported observation | Limit / belief update |
| --- | --- | --- |
| Predictive utility | Both GRUs have lower free-8 error on all ten roots. D16's individual benefit test passes; D25 misses precision; L12 is inconclusive. Retention improves in mean. | Withdraw promotion of this S32 configuration. Lower comparative error or passing retention is not sufficient absolute competence. GRUs share units too; this does not reject shared recurrence generally. |
| Shared-unit interventions | Targeted state-coordinate lesions affect both functions, including effects beyond readout masking. Action shift and zero-A increase error. | All six causal contrasts miss width limits despite positive adjusted lower bounds and means above practical minima. Preserve sensitivity evidence; the full frozen causal claim is unresolved. No semantic-neuron, basis-invariant, or concurrent-binding claim. |
| Attraction | S32 perturbation gaps often halve, but the zero-S control contracts faster while recall approaches error 1. | Recovery diagnostic fails usefulness/advantage conditions. Contraction alone is insufficient evidence of useful memory, global attraction, or Lyapunov stability. |

In the zero-command recall control with the symmetric matrix removed, the frozen rule reduces to `h_next = 0.5*h + 0.5*tanh(b)`. Two states with the same bias therefore halve their difference each step in exact arithmetic. This is a deduction from the supplied equation, not a newly fitted explanation. S32's probe is only ten-step recovery toward an unperturbed trajectory without sensory reinjection. Recovery is reported separately; it is not substituted for the utility gate's earlier recall criterion.

The cause of inadequate recall remains unresolved. So do other mechanisms, objectives, capacities, online acquisition, concurrent binding, learned organization, and integrated applications. SOAM-052 stops this tested claim; dependent sharing-based work stays unready. **SOAM-059 is the next eligible routing decision**, authorized separately to choose at most one branch or stop. This publication selects no branch and launches no experiment.

## T32 equivalence and exact reproduction

T32 shares S32's parameter objects but has separate recall/transition state banks. Reset, single-role episodes make its intact predictions algebraically identical to S32. The gate rechecked **660 prediction arrays over 440 role/episode pairs**, including the repeat, for each of three properties: T32 intact equality; T32 opposite-bank isolation; D16 opposite-bank isolation. All differences were zero.

A lesion to one T32 bank leaves the other role unchanged, while selected S32 coordinates participate in both. This distinguishes state-coordinate intervention from weight tying without making physical overlap necessary for intact predictions. Lesioning four units in each T32 bank would affect eight total, not an equal four-unit intervention. T32's inactive bank can also be allocated lazily; nominal allocation does not prove an unavoidable memory saving.

The seven seed-11 reproduction fits matched **11,764 numerical arrays, 7,280 input references, and 9,603 records exactly**. Timing and ZIP-container bytes are excluded as frozen. This is same-environment repeatability, not cross-platform reproducibility, and adds no independent confirmation root.

## Evidence downloads and provenance

The snapshot below is byte-identical to committed compact evidence in SOAM at `a4ddf9479fad06240a44030726ce6f99d2f25eb2`. These downloads stand alone if the research repository is unavailable. Relative links inside the plain-text original reports retain their source-repository meaning.

- **Original records:** [full study]({{ '/assets/research/soam-e1-results/study-report.txt' | relative_url }}), [gate decision]({{ '/assets/research/soam-e1-results/gate-decision.txt' | relative_url }}), [historical verification]({{ '/assets/research/soam-e1-results/verification.json' | relative_url }}).
- **Numerical results:** [all statistics and root values]({{ '/assets/research/soam-e1-results/statistics.json' | relative_url }}), [root/model means]({{ '/assets/research/soam-e1-results/root-model-means.json' | relative_url }}), [complete tables]({{ '/assets/research/soam-e1-results/tables.md' | relative_url }}), [reproduction]({{ '/assets/research/soam-e1-results/reproduction.json' | relative_url }}).
- **Validity and resources:** [study audit]({{ '/assets/research/soam-e1-results/study-audit.json' | relative_url }}), [gate audit and cumulative ledger]({{ '/assets/research/soam-e1-results/gate-audit.json' | relative_url }}), [original study ledger]({{ '/assets/research/soam-e1-results/study-ledger.json' | relative_url }}), [resolved configuration]({{ '/assets/research/soam-e1-results/config.json' | relative_url }}), [execution provenance]({{ '/assets/research/soam-e1-results/execution-provenance.json' | relative_url }}).
- **Frozen authorities:** [E1 v1 protocol]({{ '/assets/research/soam-e1-results/protocol-v1.txt' | relative_url }}), [manifest]({{ '/assets/research/soam-e1-results/manifest-v1.json' | relative_url }}), [A1 archive addendum]({{ '/assets/research/soam-e1-results/archive-a1.txt' | relative_url }}).
- **Publication reproducibility:** [snapshot hashes and source paths]({{ '/assets/research/soam-e1-results/provenance.json' | relative_url }}), [figure renderer]({{ '/scripts/render_soam_e1_results.py' | relative_url }}). The figures only render archived estimates and intervals; they do not recompute inference.

Scientific source froze at `fe9925f796af0a835a509cbef3bded4be3783fa3`; execution used `7b3dea667cd65626af259a6ccbf0e17e0d8e96f6`. Source fingerprint: `b52329efaa0a4927337691e60a5b610ed08984b884aef8dd5b7b12801f2408c9`. Software: Python 3.12.13, PyTorch 2.14.1, NumPy 2.5.4, macOS 26.6.2 arm64; one CPU thread, deterministic algorithms, float32 model state and float64 metrics/simulation/ridge fitting.

The compact download is **not the full raw archive**. Preserved development: 48,382 files / 95,228,443 bytes, digest `3780bbb310ee7bc7d9b9ebf70afe58d0b39e0565a7234c704ea361f288d7c4fd`. Confirmation/repeat: 168,426 files / 538,869,653 bytes, digest `d8b3f8de2d1ec46f7e745a18ccf8df4c68fb36b1b8c5fb04df07ba0d91b44f68`. The research repo's local `runs/` archives retain the full inputs, checkpoints, optimizer tensors, losses, selections, targets, predictions, and records. Downloads do not promise those archives are publicly hosted.

The tables that follow preserve every published summary comparison and mandatory diagnostic, including negative and unresolved results. Values are rounded to six decimal places here; machine-readable statistics retain full precision.

## Model errors and resource differences

NMSE means and ordinary 95% paired-root bootstrap intervals. Episodes are averaged within root. T32 is an exact no-fit equality diagnostic and is excluded from superiority contrasts.

| Model | Parameters | Allocated / active neural units | Free-8 NMSE [95% CI] | Final recall NMSE [95% CI] | Free-32 NMSE [95% CI] | Grounded-32 NMSE [95% CI] |
| --- | ---: | ---: | --- | --- | --- | --- |
| S32 | 3,868 | 32 / 32 | 0.086825 [0.074820, 0.098609] | 0.077657 [0.068287, 0.086725] | 0.105189 [0.096956, 0.114223] | 0.040797 [0.032659, 0.049651] |
| D25 | 3,849 | 50 / 25 | 0.109691 [0.095181, 0.124404] | 0.087080 [0.074067, 0.100321] | 0.148344 [0.121749, 0.176806] | 0.056110 [0.049498, 0.062007] |
| D16 | 2,040 | 32 / 16 | 0.109546 [0.098235, 0.121679] | 0.088051 [0.077233, 0.100928] | 0.160046 [0.131496, 0.193435] | 0.051966 [0.044542, 0.059429] |
| G28 | 3,988 | 28 / 28 | 0.046443 [0.039819, 0.052585] | 0.019600 [0.016060, 0.023641] | 0.130604 [0.107026, 0.154261] | 0.017773 [0.015377, 0.020381] |
| G32 | 4,940 | 32 / 32 | 0.037692 [0.029909, 0.045716] | 0.020987 [0.016440, 0.025873] | 0.105513 [0.083600, 0.128401] | 0.013327 [0.011828, 0.014896] |
| L12 | 924 | 12 / 12 | 0.086426 [0.074559, 0.098219] | 0.087339 [0.076597, 0.098748] | 0.057183 [0.049471, 0.065107] | 0.329105 [0.314224, 0.343074] |
| SYM32 | 1,884 | 32 / 32 | 0.180056 [0.157610, 0.202286] | 0.078325 [0.066757, 0.091307] | 0.263691 [0.230260, 0.299059] | 0.059954 [0.053313, 0.066332] |
| T32 | 3,868 tied | 64 / 32 | 0.086825 [0.074820, 0.098609] | 0.077657 [0.068287, 0.086725] | 0.105189 [0.096956, 0.114223] | 0.040797 [0.032659, 0.049651] |

Two non-neural role flags are additional to every row. All fitted readouts are counted. T32 shares S32 parameter objects; its two state banks do not imply an unavoidable memory penalty over lazy single-role allocation. No exact simultaneous parameter/state/compute match is claimed.

## Primary benefit and recall guardrails

Positive relative gain favours S32. Required gain: mean ≥0.10, adjusted lower bound >0 and interval width ≤0.20 against **every** reference. Recall contrasts require adjusted upper bounds ≤0.005 NMSE. The seven contrasts share the frozen multiplicity adjustment.

| Contrast | Mean | Adjusted interval | Ordinary 95% interval | Adjusted width | Criterion |
| --- | ---: | --- | --- | ---: | --- |
| S32 gain over D25 | 0.201038 | [0.093428, 0.310170] | [0.123458, 0.279933] | 0.216742 | Does not pass; precision/margin limits retained |
| S32 gain over D16 | 0.211141 | [0.143127, 0.300183] | [0.158803, 0.272820] | 0.157056 | Pass |
| S32 gain over G28 | -0.938844 | [-1.384367, -0.556093] | [-1.262954, -0.635545] | 0.828274 | Does not pass; precision/margin limits retained |
| S32 gain over G32 | -1.526395 | [-2.333402, -0.866113] | [-2.115501, -0.999345] | 1.467289 | Does not pass; precision/margin limits retained |
| S32 gain over L12 | -0.021142 | [-0.221034, 0.103314] | [-0.159631, 0.081110] | 0.324348 | Does not pass; precision/margin limits retained |
| S32 final − S32 recall-only | -0.037492 | [-0.058497, -0.008635] | [-0.054005, -0.017751] | 0.049862 | Pass |
| S32 final − D25 final recall | -0.009423 | [-0.018227, 0.000726] | [-0.016207, -0.002085] | 0.018953 | Pass |

## Causal overlap and direction

The six contrasts share the separately frozen adjustment. Positive adjusted lower bounds are required. The four NMSE contrasts also require width ≤0.02; the two relative contrasts require width ≤0.20. A point estimate below its minimum alone is not a precise failure.

| Contrast | Practical minimum | Mean | Adjusted interval | Ordinary 95% interval | Width | Outcome |
| --- | ---: | ---: | --- | --- | ---: | --- |
| Targeted full − intact recall | 0.005 | 0.615460 | [0.513405, 0.737641] | [0.536295, 0.703950] | 0.224236 | Unresolved |
| Targeted full − intact free-8 | 0.005 | 0.501028 | [0.440196, 0.557538] | [0.456391, 0.544384] | 0.117342 | Unresolved |
| Full − readout-only recall | 0.002 | 0.429698 | [0.374571, 0.490024] | [0.387401, 0.474583] | 0.115452 | Unresolved |
| Full − readout-only free-8 | 0.002 | 0.233442 | [0.205424, 0.254275] | [0.213399, 0.250611] | 0.048851 | Unresolved |
| Shifted-action relative free-8 increase | 0.1 | 0.580384 | [0.324054, 0.898404] | [0.380489, 0.814939] | 0.574350 | Unresolved |
| Zero-A relative free-8 increase | 0.1 | 1.236030 | [0.820426, 1.662235] | [0.924143, 1.555274] | 0.841809 | Unresolved |

## All lesion and direction controls

Ordinary 95% paired-root intervals below are descriptive controls; they do not enlarge the preregistered test family. Random sets are reported individually; targeted lesions need not exceed random lesions.

| Condition | Error increase over intact [95% CI] |
| --- | --- |
| D16-bank-0-recall | 0.391208 [0.299251, 0.478535] |
| D16-bank-0-transition | 0.000000 [0.000000, 0.000000] |
| D16-bank-1-recall | 0.000000 [0.000000, 0.000000] |
| D16-bank-1-transition | 0.276722 [0.234940, 0.324892] |
| T32-bank-0-recall | 0.615460 [0.536295, 0.703950] |
| T32-bank-0-transition | 0.000000 [0.000000, 0.000000] |
| T32-bank-1-recall | 0.000000 [0.000000, 0.000000] |
| T32-bank-1-transition | 0.501028 [0.456391, 0.544384] |
| random-0-recall | 0.172486 [0.104455, 0.239824] |
| random-0-transition | 0.154986 [0.110321, 0.201306] |
| random-1-recall | 0.127081 [0.062223, 0.219183] |
| random-1-transition | 0.107764 [0.066503, 0.163646] |
| random-2-recall | 0.100183 [0.038533, 0.179246] |
| random-2-transition | 0.117619 [0.067813, 0.176450] |
| random-3-recall | 0.098258 [0.060316, 0.142368] |
| random-3-transition | 0.088031 [0.071931, 0.109323] |
| readout-recall | 0.185762 [0.145439, 0.233180] |
| readout-transition | 0.267585 [0.235648, 0.302831] |
| targeted-recall | 0.615460 [0.536295, 0.703950] |
| targeted-transition | 0.501028 [0.456391, 0.544384] |

| Transition control | Relative error increase over intact S32 [95% CI] |
| --- | --- |
| SYM32-transition | 1.150563 [0.839936, 1.476060] |
| action_shift | 0.580384 [0.380489, 0.814939] |
| zero_A | 1.236030 [0.924143, 1.555274] |

SYM32 is independently fitted; zero-A removes asymmetry from the fitted S32 copy. Their effects answer different questions. All absolute diagnostic means, including targeted/readout/random lesions, D16 and T32 bank masks, zero cue and all recovery paths, appear in the linked machine-readable statistics.

## Cue dependence and finite-horizon recovery

| Recall path | Endpoint NMSE [95% CI] |
| --- | --- |
| S32-recall_final | 0.077657 [0.068287, 0.086725] |
| zero_cue | 0.999546 [0.947019, 1.048037] |
| perturb | 0.108642 [0.095628, 0.123703] |
| zero_S | 0.984501 [0.934001, 1.032300] |
| zero_S_perturb | 0.984485 [0.933973, 1.032283] |

| Recovery criterion | Mean | Ordinary 95% interval | Frozen threshold |
| --- | ---: | --- | --- |
| halving_fraction | 0.975000 | [0.960000, 0.990000] | ≥0.90 |
| halving_advantage | -0.025000 | [-0.040000, -0.010000] | ≥0.20 over S=0 |
| perturbed_recall_nmse | 0.108642 | [0.095628, 0.123703] | ≤0.02 |
| false_recovery_fraction | 0.620000 | [0.545000, 0.690000] | ≤0.05 (recall error >0.05) |
| feature_variance_ratio | 1.045411 | [0.985684, 1.105515] | [0.8, 1.2] |

Frozen recovery classification: **diagnostic_criteria_not_met**. Recovery is separate from the utility gate and is limited to ten-step trajectory recovery, not global attraction or Lyapunov stability.

| Step | S32 hidden RMS distance ratio [95% CI] | S=0 ratio [95% CI] |
| ---: | --- | --- |
| 1 | 0.712299 [0.708227, 0.716088] | 0.500000 [0.500000, 0.500000] |
| 2 | 0.530411 [0.523874, 0.536700] | 0.250000 [0.250000, 0.250000] |
| 3 | 0.414308 [0.405672, 0.422591] | 0.125000 [0.125000, 0.125000] |
| 4 | 0.340476 [0.329931, 0.350707] | 0.062500 [0.062500, 0.062500] |
| 5 | 0.294205 [0.281743, 0.306286] | 0.031250 [0.031250, 0.031250] |
| 6 | 0.265889 [0.251707, 0.279676] | 0.015625 [0.015625, 0.015625] |
| 7 | 0.249153 [0.233422, 0.264431] | 0.007813 [0.007812, 0.007813] |
| 8 | 0.239780 [0.222852, 0.256216] | 0.003906 [0.003906, 0.003906] |
| 9 | 0.235017 [0.217096, 0.252357] | 0.001953 [0.001953, 0.001953] |
| 10 | 0.233106 [0.214363, 0.251083] | 0.000977 [0.000977, 0.000977] |

## Root-level primary results and failures

| Root | S32 free-8 | D25 | D16 | G28 | G32 | L12 | SYM32 | S32 pre-recall | S32 final recall | Fits/cells failed |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 11 | 0.083126 | 0.102175 | 0.100341 | 0.050160 | 0.019402 | 0.053284 | 0.154315 | 0.152672 | 0.079227 | 0 / 0 |
| 23 | 0.098939 | 0.127062 | 0.111662 | 0.044588 | 0.047828 | 0.100676 | 0.157517 | 0.129539 | 0.057026 | 0 / 0 |
| 47 | 0.078662 | 0.116072 | 0.113720 | 0.043424 | 0.048269 | 0.092629 | 0.223071 | 0.108516 | 0.064190 | 0 / 0 |
| 71 | 0.117946 | 0.123381 | 0.130482 | 0.043780 | 0.031162 | 0.113237 | 0.164844 | 0.123224 | 0.082936 | 0 / 0 |
| 101 | 0.067710 | 0.079045 | 0.085485 | 0.023298 | 0.023979 | 0.070339 | 0.135951 | 0.115487 | 0.101937 | 0 / 0 |
| 131 | 0.076042 | 0.090280 | 0.095050 | 0.057996 | 0.025589 | 0.084220 | 0.217193 | 0.115110 | 0.076652 | 0 / 0 |
| 173 | 0.110161 | 0.141351 | 0.145066 | 0.061228 | 0.061566 | 0.099687 | 0.201629 | 0.112139 | 0.086410 | 0 / 0 |
| 211 | 0.081207 | 0.079353 | 0.093899 | 0.041920 | 0.047803 | 0.076777 | 0.229367 | 0.108631 | 0.050143 | 0 / 0 |
| 257 | 0.104078 | 0.148249 | 0.131129 | 0.057547 | 0.039842 | 0.111973 | 0.193433 | 0.133836 | 0.091862 | 0 / 0 |
| 307 | 0.050377 | 0.089947 | 0.088628 | 0.040483 | 0.031475 | 0.061435 | 0.123241 | 0.052342 | 0.086193 | 0 / 0 |
