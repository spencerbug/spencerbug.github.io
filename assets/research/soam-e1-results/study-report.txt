# Shared-population study — E1 v1 + A1

Review update, 2026-11-08: [SOAM-052](SHARED_POPULATION_GATE.md) is complete with
**stop for the tested S32 useful-sharing claim**. The measurements and phase-boundary
history below remain unchanged. SOAM-059 routing is next eligible and unstarted;
no follow-up experiment has been selected.

2026-11-07. **SOAM-051 is complete with a negative candidate result, not a positive
sharing gate.** All 70 prescribed confirmation fits, seven seed-11 reproduction
fits and 25,300 remaining cells completed. Together with preserved development,
the study contains **119 fits and 27,820 cells**, with no scientific failures,
exclusions, replacements, retries, retuning or allocation extensions. SOAM-052's
gate review and SOAM-059's fork decision have not started.

The frozen classifier returns **`recall_interference_or_failure`**, specifically
**absolute recall failure**: S32 mean recall NMSE is **0.077657**, above 0.02.
Both relative recall guardrails pass; this is not measured destructive interference.
S32's free-8 NMSE is **0.086825**, below the absolute transition ceiling 0.10,
but it does not establish the required benefit against all five references.
The preselected G32 and parameter-near G28 GRUs have lower free-8 error in every
confirmation root. GRUs also use shared recurrent state, so this comparison does
not reject shared neurons in general.

The S32 gain over D16 meets its individual benefit/precision criterion. The gain
over D25 is positive but exceeds the width cap; the L12 comparison is inconclusive.
G28/G32 contrast intervals lie below zero, but their widths exceed the protocol's
cap for a *precise no practical benefit* classification. Preserve that distinction:
the result is absolute recall failure, not a rewritten equivalence or broad null.

All six adjusted causal contrasts are positive and above their practical minima
in mean, but **none meets its frozen interval-width limit**. They are unresolved
under the prescribed precision rules, not precise causal failures. Lesions and
ablations demonstrate sensitivity in this supplied unit basis; they do not rescue
comparative utility or identify a uniquely physical-overlap benefit.

The separate recovery diagnostic is **`diagnostic_criteria_not_met`**. Hidden-state
distance halves in 97.5% of episodes, but the S=0 control achieves 100%; perturbed
recall error and false-recovery frequency fail their thresholds. The feature
variance ratio passes. Contraction alone therefore does not demonstrate useful
recovery, a global attractor, biological validity or compositionality.

![Frozen E1 primary comparisons and recall guardrails](shared-population-study/confirmation/primary-and-guardrails.png)

## Frozen execution, uncertainty and completeness

SOAM-050 done and SOAM-061 done/proceed, their body conditions, passing development
screen, full A1 calibration, source freeze and cumulative receipt were verified
before execution. The existing suite passed **190 tests in 14.45 seconds** first.
The [verified procedure](../docs/E1_CONFIRMATION_EXECUTION.md) was executed once:

```sh
uv run pytest
uv run python -m soam.shared.continuation --mode execute --readiness runs/e1-confirmation-readiness-v1 --output runs/e1-confirmation-v1-a1
```

These are completed commands, not instructions to repeat the experiment. The
readiness receipt is consumed; its claim and all output directories must remain.
The full raw archive is `runs/e1-confirmation-v1-a1`, alongside unchanged
`runs/e1-development-v1-a1`. Compact [audit](shared-population-study/confirmation/audit.json),
[statistics](shared-population-study/confirmation/statistics.json),
[fit records](shared-population-study/confirmation/fit-records.json),
[root means](shared-population-study/confirmation/root-model-means.json),
[all condition means](shared-population-study/confirmation/root-condition-means.json),
[numerical fingerprints](shared-population-study/confirmation/numerical-sha256.json)
and [checksums](shared-population-study/confirmation/sha256.json) accompany this report.
Raw checkpoints, optimizer tensors, traces, verified inputs, predictions, targets,
selection scores/masks and per-cell resource records remain local in the full archive;
compact evidence is not a replacement for those inputs.

All neural families retain development config 1 (Adam learning rate 0.003), L12
config 0 (ridge lambda 0.0001); G32 remains the primary reference. Confirmation roots
are 11, 23, 47, 71, 101, 131, 173, 211, 257 and 307. Each root has seven fits,
420 base cells and 1,880 diagnostic cells. The latter include 1,320 development-only
selection cells; targeted/random masks were persisted before any confirmation
observation for that fitted root. Each role/condition uses 20 paired episodes.
All five mandatory references, SYM32, four random lesions, readout lesions, D16
bank lesions, action shift, zero-A, zero cue, recovery controls and T32 were retained.
The repeat adds no independent confirmation root.

Episodes are averaged within roots. The frozen PCG64 bootstrap uses 10,000 draws
of the ten paired roots, inference root 8675309 and derived seed
7170790573829272725. Utility's five relative gains and two recall guards use
seven-family Bonferroni percentile intervals (tail 0.05/14); the six causal
contrasts use tail 0.05/12. Ordinary 95% intervals are also reported. Recovery
and ancillary controls use ordinary root intervals, not timestep replicates.
The audit independently reconstructed bootstrap indices and adjusted bounds,
checked all archived base metric reductions, and reaggregated every condition.
No required reference/root reached the 1e-6 floor. Full-precision JSON governs
threshold checks; table values are rounded to six decimals.

## T32 identifiability and scientific reproduction

T32's tied parameters and separate state banks produce **exactly the same free
and grounded predictions as S32** on these reset, single-role episodes. The audit
checked 440 intact episode pairs and 660 prediction arrays across confirmation
and repeat, with maximum difference zero. The same 440-pair/660-array audit passes
for T32 opposite-bank masks and D16 opposite-bank masks. On-role mask effects are
reported below. There were no tolerance relaxations: these equality tests remain
bitwise exact, with the frozen zero tolerance.

This is an identifiability limit, not a superiority comparison: sequential roles
cannot distinguish physical overlap from tied parameters. Allocating two state
banks also does not establish an unavoidable memory advantage over lazy single-role
allocation. The fitted GRUs, separated states and linear model remain substantive
comparators, with their actual resource differences disclosed.

The seven seed-11 models were refit from **archived inputs**, without simulator
regeneration. [Reproduction](shared-population-study/confirmation/reproduction.json)
is exact across **11,764 numerical arrays, 7,280 input references and 9,603 records**,
including checkpoints, optimizer state, losses, exposure, selections and metrics.
Timing and ZIP-container bytes are excluded. The read-only audit independently
repeated those comparisons; it performed no fitting or new scientific evaluation.

## Model errors and resource differences

NMSE means and ordinary 95% paired-root bootstrap intervals. Episodes are averaged within root. Grounded-32 averages 32 grounded one-step errors; free-8 and free-32 use the same free-rollout prefix/path. T32 is an exact no-fit equality diagnostic and is excluded from superiority contrasts.

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

## Exposure, scaffolding and resource accounting

The fixed sensory projection uses seed 1729. Supplied role flags, task geometry,
phase/action split rules, schedules, clamp definitions and finite capacities remain
as frozen; they were not learned organization or discovered functional partitions.
Each neural fit used 100 recall-only plus 300 joint Adam updates at batch 16;
only final checkpoints were used. Each fit saw 6,400 distinct recall source records,
4,800 transition episodes, 38,400 executed transitions and 43,200 clean transition
sensor records. Free and grounded losses reuse those observations; they are not
additional independent data. Normalization uses a separate 2,048-record train stream
at root 1801, with variance 0.03096017249093924.

Across 13 distinct training roots (three development and ten confirmation), there
are 83,200 recall records, 62,400 transition episodes and 499,200 transitions. The
119 fit instances reuse those roots across families/configurations: their summed
exposures are 761,600 recall records, 571,200 transition episodes and 4,569,600
transitions. Reproduction reuses root 11 and adds no independent data. A1 input
sharing changes physical archive storage, not any model's exposure.

L12 uses three ridge solves per fit (recall L, final L and B), not 400 Adam updates.
Its trace's final counts are 6,400 cue records and 38,400 observed transition pairs;
the generic exposure record also carries neural loss-shape fields, which must not
be read as ridge gradient iterations. Readouts and offline fitting are counted.
No replay store or supplied pattern bank is used for model inference. Evaluation
records verify zero fitting updates and zero free-rollout future-observation reads.
Persistent-parameter hashes and exact reproduction protect no-write inference.

The parameter/unit table above includes readouts and both allocated disjoint banks.
Persistent float32 storage is 15,472 bytes for S32; 15,396 D25; 8,160 D16; 15,952 G28;
19,760 G32; 3,696 L12; and 7,536 SYM32. State, including two role flags, is respectively
136, 208, 136, 120, 136, 56 and 136 bytes. T32 aliases S32's 15,472 parameter bytes
and allocates 264 state bytes, with 32 active neurons per role. Evaluation records
count a peak of four model copies; optimizer/checkpoint arrays, matrix expansions,
returned trajectories, input objects and hash/copy temporaries are separately
archived or covered by process RSS. These are not exact simultaneous resource matches.

The 11 new roots each record 438,263,040 evaluation linear MACs: **4,820,893,440**
in total, including diagnostic selection and repeat. This estimator excludes
nonlinear operations, backward passes, ridge solves, archive I/O and audit work;
it is not total training FLOPs. Measured CPU includes those execution costs.
New-fit CPU sums to 1,075.422336 seconds; the maximum fit is 36.121810 seconds.

| Allocation | Recorded CPU seconds | Frozen ceiling |
| --- | ---: | ---: |
| Preserved development phase | 392.372820 | 4,000 |
| Confirmation phase, including diagnostics | 1,736.235285 | 8,000 |
| Reproduction phase, including comparison | 316.280692 | 1,200 |
| Cumulative overhead, including audit/report charges | 397.279517 | 1,200 |
| Cumulative total | 2,842.168314 | 14,400 |

Total charged wall time is **2,871.456852 seconds**, below 28,800. Measured peak RSS is
**853,032,960 bytes** (scientific runner: 417,562,624), below 2 GiB. Charged artifacts
are **680,050,154 bytes**, including compact evidence and a 2 MiB final-report reserve,
below 8 GiB. The raw confirmation/repeat archive contains 168,426 files and
538,869,653 bytes; its sorted relative-file digest is
`d8b3f8de2d1ec46f7e745a18ccf8df4c68fb36b1b8c5fb04df07ba0d91b44f68`.
The original readiness carry of 454.075947 CPU seconds / 129,092,588 artifact bytes
was retained, including earlier failed engineering attempts. No allocation was reset.
The [final ledger](shared-population-study/confirmation/final-ledger.json) distinguishes
scientific execution, audit, conservative reporting charges and reserved storage.

Two reporting-only extraction attempts were incomplete before the successful audit;
there were no failed scientific fits or cells. The second hit an exact-equality
assertion after lexicographic regrouping changed the order of floating-point sums.
The successful extractor uses an absolute 1e-12 reporting check; its observed maximum
difference was **6.66e-16**. Scientific bootstrap results and T32/reproduction checks
remain exact. The first attempt's terminal diagnosis was not retained. Both attempts
are preserved in [audit-attempts.json](shared-population-study/confirmation/audit-attempts.json)
and conservatively charged 177 and 44 CPU/wall seconds using elapsed-time bounds
with margin. Their separate peak RSS was not captured; the displayed peak is the
measured runner/successful-audit peak, not a reconstructed measurement of those
reporting attempts. This reporting telemetry limitation does not change any
scientific data or the runner's verified resource stops. No failed extraction was
used as evidence for or against the mechanism.

## Source, configuration and validation

Execution HEAD was `7b3dea667cd65626af259a6ccbf0e17e0d8e96f6`, containing the reviewed
source freeze `fe9925f796af0a835a509cbef3bded4be3783fa3`.
Aggregate source SHA-256 remains
`b52329efaa0a4927337691e60a5b610ed08984b884aef8dd5b7b12801f2408c9`.
Protocol SHA-256 is
`98846328f3ad6803a7e85d910fc2be2f8075c5d44e75d19351ad311d9eae12bf`;
manifest SHA-256 is
`beda95e9aba660c4b912339dfe26f331363e8de7cbc715af132e95fd1821d83e`.
All scientific source/configuration and earlier development artifacts were preserved.
Only report extraction/rendering and documentation were added in this execution turn.

The raw provenance field `config_sha256` identifies the runtime-capture wrapper
(`e6bec42b26641ee42ccc5ddd4a0bc70eaab7e55c432d85078c5bc87394bc3399`), not the
resolved study settings. The latter are explicit in [config.json](shared-population-study/confirmation/config.json),
with canonical resolved digest
`b9f125d176844963db9aaadf8ec32f43da76e70aa5429dd77bd637fc221c3f80`.
The audit preserves both hashes and the file-byte digest. Actual fits have
`fixture: false`, the selected configurations, full 400-step traces, prescribed
streams and complete scientific inventory; the capture wrapper does not imply a
fixture was substituted. This metadata distinction is disclosed without rewriting
the original provenance or rerunning science.

Runtime: Python 3.12.13, PyTorch 2.14.1, NumPy 2.5.4, macOS 26.6.2 arm64, CPU;
one Torch thread and deterministic algorithms. Model state is float32; simulator,
metrics and ridge fitting use float64 as specified. Every per-fit initialization
seed and component stream key is archived; the audit verifies derivation, split,
root, index and batch count for all references.

The primary agent executed deterministic code. Qwen performed bounded read-only
procedure extraction (job `e37dd66cffd04625866499fcf7a04eba`), which was checked
against the actual procedure; it neither selected settings nor controlled trials.
[Verification](shared-population-study/confirmation/verification.json) records the
pre-execution 190-test pass, final ticket/schema validation, source/calibration and
prior-archive checks, reporting checks and figure inspection. The unrelated Draw.io
temporary files remain untouched. Nothing was pushed, published or sent externally.

## Interpretation, remaining uncertainty and next eligible action

This experiment supports a scoped negative result for **this S32 mechanism on this
supplied recall/transition task at this finite tuning/data/compute allocation**.
The relative guardrails pass even though absolute recall is inadequate. Both GRUs
outperform S32 at the prespecified free-8 endpoint; secondary horizon behavior is
mixed, including low L12 free-32 error despite poor grounded error. It would be
incorrect to select a new primary horizon after seeing those results. The causal
width limits remain unresolved, and recovery accuracy fails despite contraction.
The study does not establish useful shared recurrence, a unique overlap advantage,
concurrent binding, online acquisition, learned organization, global attractors,
full historical H1/H5/H6 claims or neuroscientific validation.

Ten roots and the frozen two-configuration development search leave uncertainty
about alternative mechanisms, capacities, schedules, tasks and longer horizons.
The required T32 equality means a physical-overlap advantage is not identifiable
from these separate-role episodes. None of these limits licenses extra seeds,
retuning or post hoc threshold changes within E1 v1.

SOAM-051's acceptance criteria permit documented negative results and are satisfied.
**Next eligible action is SOAM-052's review of this complete evidence.** It has not
started and no gate decision is recorded here. SOAM-059 remains a separate later
routing decision; no experiment or integrated architecture branch has been activated.

**Joint blog/report flag:** the confirmed separation between retention and absolute
competence, strong conventional baselines, exact tied-state equivalence, and
contraction without useful recovery is a substantive methods result. It explains
why positive lesions or bounded recurrent trajectories alone cannot validate a
useful sharing claim. Prepare a post and accompanying report together after review;
this flag does not authorize publication and none occurred.

## Preserved development and readiness history

The following records describe what was known at each earlier phase boundary.
Their statements that confirmation was unopened are historical, superseded by the
completed execution above; their measurements, source provenance and failed
engineering attempts remain unchanged.

# Historical record: development phase

2026-11-06. SOAM-051 is **in progress**. All 42 prescribed development fits and
2,520 base evaluation cells completed without numerical failures or retries.
The frozen development screen **passes**; confirmation is permitted but has not
started. This is a partial phase of the 119-fit/27,820-cell study, not a completed
scientific comparison or a positive shared-population gate.

## Prespecified screen and selections

Selected GRU G32 has development free-8 NMSE 0.031548 (limit 0.15) and recall
NMSE 0.015432 (limit 0.03). No required reference reaches the 1e-6 error floor.
G32 is therefore the preselected primary reference, with all five required
references still mandatory in confirmation. Config index 1 is selected for every
neural family (learning rate 0.003); L12 selects index 0 (ridge lambda 0.0001).
Selection used mean development free-8 NMSE only, as frozen; recall did not choose
or rescue a configuration.

Results below are means and sample standard deviations across the three independent
fit roots 401, 409 and 419, each scored on 20 development episodes per role.
These are descriptive development statistics, not confirmation confidence intervals.
Config 0/1 means learning rate 0.001/0.003 for neural models and lambda 0.0001/0.01
for L12. Lower NMSE is better; the same fixed normalization variance applies to all.

| Family | Config | Free-8 NMSE, mean ± SD | Recall NMSE, mean ± SD | Selected |
| --- | ---: | ---: | ---: | --- |
| S32 | 0 | 0.087671 ± 0.024196 | 0.087678 ± 0.008768 | No |
| S32 | 1 | 0.069605 ± 0.019474 | 0.063337 ± 0.013631 | Yes |
| D25 | 0 | 0.108620 ± 0.016765 | 0.086075 ± 0.005181 | No |
| D25 | 1 | 0.089745 ± 0.018857 | 0.076476 ± 0.006890 | Yes |
| D16 | 0 | 0.113326 ± 0.014940 | 0.083242 ± 0.008261 | No |
| D16 | 1 | 0.078360 ± 0.017748 | 0.078076 ± 0.006430 | Yes |
| G28 | 0 | 0.158020 ± 0.012479 | 0.069406 ± 0.004038 | No |
| G28 | 1 | 0.036545 ± 0.002515 | 0.018497 ± 0.005317 | Yes |
| G32 | 0 | 0.146721 ± 0.020197 | 0.064063 ± 0.012958 | No |
| G32 | 1 | 0.031548 ± 0.009656 | 0.015432 ± 0.002712 | Yes |
| L12 | 0 | 0.075852 ± 0.019501 | 0.073676 ± 0.009670 | Yes |
| L12 | 1 | 0.196939 ± 0.032233 | 0.132349 ± 0.017212 | No |
| SYM32 | 0 | 0.177285 ± 0.008836 | 0.093241 ± 0.010155 | No |
| SYM32 | 1 | 0.174653 ± 0.033979 | 0.072618 ± 0.027369 | Yes |

Development favours the conventional GRUs. Selected S32's transition mean is below
0.10, but its recall mean 0.063337 exceeds the eventual confirmation target 0.02.
That does not trigger an unregistered candidate-specific stop or authorize tuning:
the prespecified development gate checks baseline competence and floor effects.
Its passage is permission to perform the reserved test, not evidence for useful
sharing. Confirmation must retain S32's selected configuration despite this concern.
No hypothesis outcome is assigned from these selected development results.

This first measured comparison is a potential blog/report topic after confirmation:
strong conventional baselines materially change how a plausible shared-dynamics
mechanism should be assessed. Any publication must clearly label these preliminary
results and avoid treating a development win or loss as held-out confirmation.

## Execution and coverage

The [committed procedure](../docs/E1_DEVELOPMENT_EXECUTION.md) enumerated seven
families × two configurations × three roots in advance. Each fit used the complete
100-recall/300-joint schedule, batch 16; ridge used its corresponding observed-data
schedule. No shorter fixture schedule was substituted. Each fit archived 700 input
batch references and 60 evaluation cells (pre-recall, final-recall, transition).
Transition cells include free32/grounded32 and their free8 prefix; recall is scored
at update ten. Data split train supplies fitting and development supplies scoring.
Confirmation data have not been generated or inspected.

Verification counted 29,400 per-fit batch references and 2,520 cell-array archives,
with 2,220 unique A1 input objects. Shared objects preserve identical data across
families/configurations rather than erasing any fit's exposure. Each fit uses 6,400
recall source records and 4,800 transition episodes / 38,400 executed transitions.
Across the three unique training roots these are 19,200 recall records and 14,400
transition episodes, reused across model/config fits. Normalization's 2,048 records
are separate, not additional fitting examples.

Remaining, explicitly unexecuted: 70 confirmation fits and seven seed-11 repeat fits;
4,620 later base cells and 20,680 diagnostic cells. Causal lesions, T32 confirmation
identity, action ablations, finite-horizon recovery, paired ten-root uncertainty,
confirmation guards and exact scientific repeat remain outstanding. The next stage
must preserve selections and cumulative budgets and verify its execution source.
No scientific superiority, compositionality, attraction or neuroscience claim is made.

## Resources and provenance

- Development phase CPU: 392.372820 seconds, below its 4,000-second ceiling.
- Total allocated CPU so far: 406.208421 seconds; wall: 407.710123 seconds, including
  current and historical calibration charges. Future phases inherit these costs.
- Sum of fitting CPU: 355.569260 seconds; maximum individual fit: 9.749874 seconds,
  below the 90-second fit ceiling. Per-fit orchestration rows additionally count scoring.
- Process peak RSS: 320,487,424 bytes, below 2 GiB.
- Run directory: 95,228,443 bytes on disk. Budget ledger: 97,048,731 bytes including
  prior calibration allocations and reserved metadata; whole-study ceiling is 8 GiB.

Prerequisite implementation commit: a0e4e3f. Scientific execution commit:
`e2bf0ca9b9a6d24ff2197dee76a00590a60b8d3d`.
Source SHA-256: `e0585121bcd98d1bf1b49e6d21858a20279cd97f17849a91e4d1291c25f652bb`.
All calibrated source files matched both HEAD and disk before fitting and remained
unchanged afterward. The unrelated Draw.io temporary files were neither staged nor
used as inputs. One CPU Torch thread and deterministic algorithms were enforced;
models use float32, simulator/metrics use float64. Python/Torch/NumPy versions and
all constituent hashes are in the archived provenance.

The study setup had 176 passing tests, including fixed-inventory, calibration-gate
and atomic-checkpoint tests. The numerical and archive implementation remained
unchanged; a fresh A1 calibration including the orchestration source passed all
original limits before fitting. Qwen extracted the bounded execution checklist;
the primary agent invoked deterministic trial code and audited the output. No worker
selected parameters, ran autonomous trials or changed a stopping rule.

Commands (with UV_CACHE_DIR=/tmp/soam-uv-cache):

```sh
uv run pytest
uv run python -m soam.shared.runner --archive-revision a1 --mode preflight --output runs/e1-development-calibration
uv run python -m soam.shared.study --calibration runs/e1-development-calibration --output runs/e1-development-v1-a1
```

These record completed execution; do not rerun scientific fits to improve scores.
Output directories reject overwrites and this entry point does not automatically
resume or start confirmation. The full local run contains every input, checkpoint,
optimizer tensor, trace, target and output array.
[Compact evidence checksums](shared-population-study/development/sha256.json) index
[fit and per-episode metrics](shared-population-study/development/fit-results.json),
[inventory](shared-population-study/development/inventory.json),
[screen decision](shared-population-study/development/development-screen.json),
[provenance](shared-population-study/development/provenance.json), and
[resource status](shared-population-study/development/status.json).
The [accepted calibration](shared-population-study/calibration/cost-ledger.json)
retains its complete shape-equivalent timing and storage projection.

## Confirmation execution readiness — 2026-11-07

**Ready for a later explicitly requested execution; confirmation remains unopened.**
This continuation completes and verifies orchestration only. It performs no new
scientific fits, assigns no confirmation outcome and leaves SOAM-051 in progress.
The [concrete procedure](../docs/E1_CONFIRMATION_EXECUTION.md) records the next command,
ordering, failure handling and review requirements.

The initial audit verified the existing 42 fits/2,520 cells, all 31,920 A1 input
references and 2,220 unique objects, per-cell/compact metric agreement, checkpoint
finiteness, fitting exposure and 400-step traces. Recomputed development selections
match exactly. Normalization restores 2,048 samples and variance 0.03096017249093924;
its hash and statistics agree. All 48,382 raw files remain unchanged (95,228,443 bytes).
Development source matches both its recorded commit and current scientific files.
See the [audit](shared-population-study/continuation/development-audit.json).
The frozen protocol, manifest, A1 addendum, equations, data generator, fitting,
evaluation, inference rules and earlier development entry point were not edited.

New [root orchestration](../soam/shared/execution.py) orders fitting, development-only
lesion freeze, confirmation cells and archived-input repetition. The
[continuation entry point](../soam/shared/continuation.py) checks source/dependencies,
seals the prior evidence, carries cumulative budgets and prevents receipt reuse.
[Summary wiring](../soam/shared/study_summary.py) feeds complete paired root metrics
to the existing inference rules and retains all controls and separate recovery
summaries. The remaining inventory is 70 confirmation fits, seven repeat fits and
25,300 cells. Confirmation data cannot be opened by `prepare` or fixture mode.

Baseline before edits: **176 passed in 6.53s**. Final `uv run pytest`: **190 passed
in 14.03s**. Targeted Ruff check/format and the 62-ticket/two-template validator pass.
The tests verify selection-before-observation ordering, all prescribed root/config
routing using stubs, archive-only replay with simulator calls prohibited, corruption
and missing-file rejection, grounded-output isolation, normalization restoration,
source additions, consumed receipts, numerical failure/no retry, phase/overhead
limits and complete 2,300-cell failure records under storage exhaustion.

Both continuation fixtures passed with isolated root 9001 streams, two episodes
per condition and one update per fitting stage at batch two. Each performed 14
fixture fits, 230 cells per execution and exact comparison of **1,576 numerical
arrays, 259 input references and 512 records**. The repeat created no new input
objects. These are engineering fixtures, not the required full seed-11 scientific
repeat. The final fixture used 8.373325 CPU / 8.491413 wall seconds and 307,249,152
bytes peak RSS. Earlier fixture evidence is retained and charged.

The complete fresh A1 calibration used ten measurements after one warm-up, zero
optimizer updates and no confirmation data. All checks pass, with the unchanged
119-fit/27,820-cell projection and 2× margin:

| Check | Projection including margin | Frozen ceiling |
| --- | ---: | ---: |
| Slowest fit CPU | 21.7414 s | 90 s |
| Development CPU | 964.15056 s | 4,000 s |
| Confirmation CPU | 2,827.564 s | 8,000 s |
| Repeat CPU | 282.7564 s | 1,200 s |
| Total CPU | 5,274.47096 s | 14,400 s |
| Total wall | 5,284.81089 s | 28,800 s |
| Peak RSS ×2 | 595,492,864 B | 2 GiB |
| Artifacts ×2 | 5,661,352,816 B (5.27 GiB) | 8 GiB |

The historical failed v1 projection and earlier passing A1 ledgers are unchanged.
The [new calibration](shared-population-study/continuation/calibration/cost-ledger.json)
and final fixture share source fingerprint
`b52329efaa0a4927337691e60a5b610ed08984b884aef8dd5b7b12801f2408c9`.
Reviewed source was then committed as `fe9925f796af0a835a509cbef3bded4be3783fa3`;
readiness verified every calibrated source hash against disk and HEAD. Calibration
provenance honestly records its earlier base commit plus then-uncommitted additions.
Runtime remains Python 3.12.13, Torch 2.14.1, NumPy 2.5.4, CPU/one thread,
deterministic algorithms, float32 models and float64 simulation/metrics.

The [cumulative receipt](shared-population-study/continuation/readiness/readiness.json)
retains the original 406.208421 CPU-second development allocation, which already
includes three preflights. It adds four preserved historical fixture attempts
(including the failed A1 replay), both continuation fixtures, this calibration and
measured readiness preparation. Carried allocation is **454.075947 CPU seconds,
460.089971 wall seconds and 129,092,588 artifact bytes**, with 320,487,424-byte
historical peak RSS. Component entries distinguish measured physical bytes from
conservative metadata reservations. Ordinary regression tests and code review are
engineering verification, separate from the measured run ledger. Preparation and
future execution audits are charged to overhead. The remaining projection, including
that prefix and the full overhead allowance, is 4,764.396347 CPU / 4,777.155039 wall
seconds and 5,790,445,404 bytes; all remain inside the original ceilings. Projections
do not guarantee actual completion, so runtime enforcement remains mandatory.

Qwen's extraction omitted the requested orchestration gaps. Its later bounded
review harness aborted after a path error and proposed an unnecessary search;
the primary agent rejected that action and completed review directly. No worker
ran or controlled trials. [Verification and checksums](shared-population-study/continuation/sha256.json)
include fixture/config/source records, audit, calibration, readiness and commands.
The unrelated Draw.io temporary files and prior development artifacts were preserved.

The evidence supports engineering readiness and preserves the development screen.
It does not resolve S32's preliminary recall weakness, comparative utility, causal
sharing, recovery, ten-root uncertainty or full scientific reproduction. Those
remain SOAM-051's next eligible action under the recorded procedure. SOAM-052/059
remain backlog. The development-only GRU advantage and T32 identifiability limitation
remain worth a joint methods blog post and report once paired with confirmation;
this is a publication flag, not a new scientific finding or authorization to publish.
