# Study C — explicit recurrent hypotheses help, with simpler conventional alternatives

Completed November 14, 2026, SOAM-078–081. **Two shared-parameter recurrent states
improve the frozen probability score over both PC16 and the larger single-state
PC32. They do not establish a meaningful accuracy advantage over the conventional
mixture. A conventional estimator retaining one Gaussian state is also sufficient
within the declared .01 Brier practical margin.** TWO16 is substantially faster
than the tested conventional implementations, so accuracy, retained memory,
fitting cost and inference latency do not have a single winner.

There is an important boundary: appropriate uncertainty in the nominal no-information
task does **not** extend to identical histories caused by genuine change versus
coherent corruption. TWO16 and the robust filters become strongly overconfident on
that constructed cause pair. No operating-mode, selective-computation, learned-
attention, shared-neuron or attractor claim follows.

The [decision](STUDY_C_DECISION.md) retains ADAPT1-C as the compact conventional
reference and TWO16 as the efficient recurrent alternative. It selects no subsequent
experiment. Historical E1 stop, A's inconclusive practical adaptive-update result,
and all B/B2 outcomes remain unchanged.

## Frozen comparison and principal results

[Protocol/RFC](../docs/STUDY_C_PROTOCOL.md), [manifest](../docs/protocols/study_c_v1.json),
[development review](STUDY_C_DEVELOPMENT.md), and the
[immutable confirmation receipt](study-c/confirmation-receipt.json) distinguish
design, selection and confirmation. Ten independently fitted roots each supplied
16 paired worlds per condition (32 episodes), 48 transitions, six primary and four
secondary conditions. Episodes and correlated time points were averaged within
root. The primary binary Brier score equally weights pre/post-reveal phases and
the six conditions. Its minimum meaningful improvement is **.01 absolute Brier**.
It is not a percentage classification-error threshold.

| Frozen comparison | Brier improvement [family-adjusted interval] | Outcome |
| --- | --- | --- |
| TWO16 over PC16 | .02048 [.01684, .02453] | Supported bounded benefit; all accuracy/resource guards pass |
| TWO16 over PC32 | .01819 [.01505, .02204] | Supported beyond this larger single-state capacity control |
| ADAPT1-M over ADAPT1-C | .00157 [.00136, .00183] | Small positive effect; precisely below the declared .01 practical benefit |
| TWO16 over ADAPT1-M | .00029 [-.00032, .00083] | Declared recurrent accuracy advantage precisely excluded |

These use 20, 000 paired-root bootstrap samples and the frozen sixteen-contrast
Bonferroni family: four benefits and twelve prediction/ambiguity/recovery guards.
All intervals, including guard uncertainty, are in [statistics](study-c/statistics.json).
No criterion, seed, temperature or fitted setting changed after confirmation.
A precise exclusion of .01 is not a claim of zero effect.

| Model | Primary Brier [ordinary 95% interval] | Prior feature NMSE | Final-eight informative Brier | Retained numerical scalars |
| --- | --- | --- | --- | --- |
| PC16 | .20495 [.20217, .20785] | .03786 | .06756 | 17 |
| PC32 | .20266 [.20032, .20527] | .03612 | .04502 | 33 |
| TWO16 | .18447 [.18418, .18483] | .03162 | .01895 | 33 |
| ADAPT1-C | .18633 [.18619, .18646] | .02586 | .01455 | 8 |
| ADAPT1-M | .18476 [.18459, .18493] | .02416 | .01446 | 15 |
| FILTER2-C | .18639 [.18623, .18652] | .02556 | .01446 | 7 |
| FILTER2-M | .18501 [.18486, .18516] | .02422 | .01443 | 13 |
| NISEMP-C | .18648 [.18631, .18661] | .07373 | .01437 | 7 |
| NISEMP-M | .18643 [.18614, .18669] | .03847 | .01538 | 13 |

The scalar count includes one retained confidence value and every covariance and
reliability value. Temporary branches are additional, discussed below. [Full tables](study-c/tables.md)
and [root/condition records](study-c/root-results.json) retain all models. Every
single-state reference met the frozen late-resolution and prediction competence
criteria. PC32's excess ambiguous Brier is a measured weakness, not a post hoc
reason to replace it with a weaker reference.

The supported neural benefit survives the capacity comparison: both TWO16 and PC32
retain 32 hidden values plus confidence. However, TWO16 also supplies explicit
conditional action semantics and shared decoder structure. This is a benefit of
the tested **conditional factorization**, not a proof that an unrestricted single
vector cannot implement the same function, nor a pure storage-only causal claim.

## What was observable and what was supplied

Exactly two candidate regimes reverse the sign of one action-dependent shear in
a two-dimensional system. Twelve features use the unchanged seed-1729 projection.
When the diagnostic action is zero, both state recurrences and the complete
permitted histories are identical. Initial positions, noise, masks, timestamps,
actions and lengths are paired; batch order is randomly permuted. The inference
interface contains only observations, masks and executed actions. Candidate signs
are constant supplied descriptions, not the identity of the true candidate.

A diagnostic action separates the predicted feature trajectories. The delayed
condition applies that movement during a sensing gap, with first new evidence at
step28. [Analytic and numerical observability checks](study-c/observability.json)
verify full-history equivalence and rank of the visible measurement map. Persistent
ambiguity and uninformative translations never acquire identifying evidence. Across
exactly paired equal-prior worlds, arbitrary early commitment cannot beat Brier .25.

All candidates receive equal clean **feature** supervision and regime-label
supervision during fitting. True physical coordinates and the sensor inverse are
evaluator-only. Filters learn a PCA observation basis and conditional bilinear
transition from those same records; rank two and candidate sign semantics are
declared structure. No known-dynamics oracle competes as an equal-information model.
This small, strongly scaffolded task does not establish discovery of candidate
identities, generalization to unknown observation geometry, or object memory.

Study C's PC16 retains B's fixed .5 recurrent leak, .5 sensory gain, motion gain 1,
and zero settling. Its added antisymmetric candidate decoder and probability
support are explicitly counted; its parameter count is therefore larger than
historical B's PC16. PC32/40 use the same extension. TWO16 uses one shared ordinary
PC core and two transient states. Identical initial states diverge through the
supplied signed action, not merely through slot indices. All states are fully
updated. There are no independent parameter banks, learned gates or scheduler.

ADAPT1-C retains one mean/covariance/reliability state and support. It forms two
temporary predictive/corrective branches each step and moment-matches them back
into one Gaussian. ADAPT1-M retains both states, with the same fitted maps and
correction rule. Both use the supplied .01 switching hazard. Thus the conventional
test concerns **retained trajectories**, not the removal of candidate reasoning:
the collapsed reference still scores two alternatives and retains their support.
Both alternatives preserve between-candidate uncertainty in a covariance.

ADAPT1's orthogonal-disagreement variance estimate and matching Joseph update are
inherited from B2; NISEMP's empirical threshold is recalibrated on ordinary development
innovations. This adaptation preserves the mechanisms while refitting for a new task.
Original FILTER2 and both NISEMP variants remain in every reported comparison.

## Evidence ordering, calibration and delayed recovery

Every action advances the prediction once. Candidate predictions and prior support
are recorded before current evidence. That observation produces one pair of scores
and one support update, followed by correction. Evaluating both candidates does
not multiply the number of independent observations. Inference changes no fitted
parameters. Poisoned-future and persistent-tensor tests verify this boundary.

Filter scores use predictive covariance and **previous** reliability, before the
current observation changes ADAPT1's correction variance. Neural scores use a
training-estimated diagonal residual variance. Development selects temperature;
per-observation log-odds contributions are clipped to [-6, 6]. These are calibrated
scoring rules, not exact Bayesian posteriors. Their supplied switching model and
covariance approximations remain assumptions. Normalized probabilities alone do
not establish calibration.

TWO16 and the conventional models achieve essentially .25 ambiguous-phase Brier;
PC16 averages .25814 and PC32 .26421. TWO16 has zero sampled false-confident
ambiguity events under the frozen >.95 definition. Its ambiguous Brier advantage
over PC32 is .01421, adjusted interval [.01046, .01950]. The reliability plot still
shows conditional frequency deviations elsewhere, so this is not globally perfect
calibration. [Calibration bins and root intervals](study-c/calibration.json) use
timesteps only for descriptive bin construction; uncertainty resamples roots.

![Belief trajectories](study-c/belief-trajectories.png)

The figure is the prespecified first paired + world of root 26303, not a selected
best episode. The grey delayed region has no observations. At its first revealing
cue, mean Brier is .05392 for PC16, .02242 for PC32, .00000611 for TWO16, .01363 for
ADAPT1-C and .00481 for ADAPT1-M. These are descriptive secondary measurements,
with [root intervals](study-c/delayed-resolution.json). The TWO16 floor reflects the
fixed log-odds cap, not perfect Bayesian certainty. The collapsed filter rapidly
catches up at later cues; its small full-endpoint deficit is consistent with that.

![Candidate trajectories through the gap](study-c/candidate-trajectories.png)

On misleading-cue recovery, mean capped delay after true cues resume is 10.47 steps
for PC16, 4.93 for PC32, .075 for TWO16 and 0 for the conventional variants. Zero means
the first eligible three-step run begins at the returning cue; it does not imply
zero error during the earlier misleading interval. TWO16's adjusted excess recovery
over ADAPT1-M is [.000, .313], within the four-step guard. Its prior NMSE is worse
than ADAPT1-M by .00746 [.00595, .01046], still inside the declared .02 guard. The
ordinary and tail errors, censoring and failure cases remain in the condition tables.

## Robustness and the unresolved information limit

The secondary block distinguishes independent channel corruption, represented
regime change, coherent alternative evidence and an unrepresented k=2 regime.
These are bounded stress tests, not new primary hypotheses or grounds for retuning.

| Model | Sensor-fault prior NMSE | Genuine-change prior NMSE | Coherent-fault prior NMSE | Unknown-regime prior NMSE |
| --- | --- | --- | --- | --- |
| PC16 | .09251 | .02119 | .43127 | .06619 |
| PC32 | .09630 | .02013 | .43243 | .05865 |
| TWO16 | .07555 | .01241 | .52156 | .04797 |
| ADAPT1-C | .01847 | .00368 | .49309 | .01969 |
| ADAPT1-M | .05122 | .00568 | .49679 | .02999 |
| FILTER2-C | .05151 | .00327 | .49562 | .01785 |
| FILTER2-M | .07337 | .00512 | .49774 | .02819 |
| NISEMP-C | .04117 | .00813 | .46620 | .12996 |
| NISEMP-M | .04396 | .00553 | .49689 | .12382 |

All ordinary95% intervals are in `statistics.json` under `conditions`. ADAPT1-C's
corruption advantage supports carrying B2's robust correction forward; NISEMP's
prediction weakness and the mixture's remaining fault cost are retained. No claim
of perfect noise/dynamics discrimination follows.

The genuine-change and coherent-fault worlds receive **bit-identical complete
histories** but different evaluator truth. All 90 root/model comparisons emit exactly
identical candidate trajectories, state and support. That is the correct causal
invariance, but the emitted probabilities are not suitably uncertain over the two
possible causes. Under the constructed equal-prior cause pair, post24 Brier has
floor .25. It is .44481 [.44127, .44835] for TWO16, .44961 [.44790, .45131] for ADAPT1-C,
and .44940 [.44825, .45053] for ADAPT1-M. Their >.95 confidence fractions are respectively
69.10%,69.40%,66.79%. The corresponding [NLL/interval audit](study-c/ambiguity-limits.json)
also shows the failure. PC16/32 are less confident here, at the cost of weaker
ordinary resolution. None solves the cause ambiguity.

This diagnostic deliberately crosses the nominal model's assumptions: a switching
hazard and two represented regimes do not encode an alternative coherent sensor-fault
cause. More state copies cannot create identifying information. A future cause model,
prior or independent observation would require a separately selected protocol.
The scoped primary pass must not be relabeled a general ambiguity-handling pass.

Unknown-candidate adequacy is a separate minimum-misfit decision, not a two-way
probability. ADAPT1-C flags 79.82% [78.48%, 81.07%] of sensed post-change k=2 observations;
ADAPT1-M 65.80%, TWO16 27.19%, PC16/32 about 8–9%. These are per-observation descriptive
rates, not episode success or a universal unknown detector. Genuine-change rejection
is4.87% for ADAPT1-C versus .85% for ADAPT1-M. The [adequacy tables](study-c/adequacy.json)
retain false alarms and missed unknowns. Post24 unknown labels are excluded from
two-way Brier correctness rather than inventing a correct known candidate.

## Resources, exposure and inference cost

Apple M3 Max, Mac15, 10, 36 GiB memory; Python 3.12.13, Torch 2.14.1, NumPy 2.5.4,
macOS 26.6.2. One CPU thread, deterministic algorithms, no GPU. Neural and original
FILTER2 arithmetic use float32; robust algebra, simulation and reductions use
float64. This differs from a perfectly precision-matched implementation comparison.

TWO16 has 1340 gradient-fitted coefficients plus 12 fitted residual variances and one
adequacy threshold: 1353 fitted/calibrated scalars, plus one development-selected
temperature. PC16 has 1545 and PC32 has 3577, including the added candidate decoder
and identical calibration accounting. A filter has 64 base fitted scalars plus the
adequacy threshold; NISEMP adds one fitted six-channel rejection threshold.
Temperature, supplied rule constants and nominal unused 12-channel threshold are
separate. [The resource ledger](study-c/runtime.json) includes allocated inherited
buffers, all calibration settings, confidence, temporary branches and both decoder
calls. Python/Torch object overhead is reflected in process RSS rather than claimed
to equal numerical tensor storage.

TWO16 retains 132 bytes, the same as PC32, with 5408 persistent tensor bytes plus
16 bytes of external numerical calibration settings. ADAPT1-C retains 64 bytes,
ADAPT1-M120; both allocate 920 persistent tensor bytes, including inherited unused
buffers, plus 16 bytes of external calibration settings. The collapsed estimator
still needs 14 temporary prior values and 14 posterior values, candidate predictions
and confidence workspace. Thus retaining one state does not halve inference work.

| Model | Mean serial μs/step | Mean root p95 μs/step | Batch32 mean μs/episode-step | Mean base fit CPU seconds |
| --- | --- | --- | --- | --- |
| PC16 | 102.76 | 108.17 | 4.02 | 24.41 |
| PC32 | 101.65 | 104.39 | 4.27 | 24.70 |
| TWO16 | 113.77 | 116.18 | 4.81 | 25.04 |
| ADAPT1-C | 402.58 | 410.09 | 16.16 | .219 shared base |
| ADAPT1-M | 405.50 | 407.73 | 16.49 | .219 shared base |

Three warmups and twenty repeats per fitted root measure the same minimal causal
loop at batch1/32; no diagnostic trajectory collection is timed. All states are
updated at every step, including the implementation's empty-mask arithmetic. Mean,
p95 and maximum samples for every control are retained. TWO16's paired p95 ratio
to PC32 is 1.116 [1.059, 1.183]; to ADAPT1-M it is .285 [.278, .297]. Its measured inference
advantage coexists with the conventional model's cheaper fitting and smaller state.
Partial linear-MAC proxies omit solves, mixing and nonlinear work and are not
presented as total cost or perfect resource matching.

![Accuracy and measured cost](study-c/accuracy-cost.png)

Each full base fit receives 9600 episodes, 470400 clean feature records, 148800 grounded
records and 470400 regime labels. These are the same records for each model in a root;
repeated use across candidate fits, losses and the 24-batch variance calibration is
counted as reuse, not new observations. Conventional variants share one base fit.
Development calibrates scores on two separate roots; confirmation has fresh train
and evaluation streams and frozen global calibration. Total67 fitted executions:
five fixture, 18 development, 40 confirmation and four prescribed repeats. There are
zero failed fits, exclusions, replacement roots or extra training extensions.

## Reproduction and completion

Base commit `a552034b3badeee2d242c40103cb4e1243f4be30` records the preceding B2 work.
Study C's exact source snapshot and 95 frozen file hashes have aggregate
`18caccec2e5e72657d48559bff6782416b7ad373ccfc486e8932dc14aa0870b2`.
Dirty working-tree status is disclosed. Root26303 repeats all four base fits exactly:
inputs, fitted tensors and training traces match. All 1530 saved arrays across nine
candidates and ten conditions match exactly. [Independent reduction](study-c/verification.json)
checks 810 endpoint values, maximum discrepancy 1.6653e-16. Same-environment repeatability
is established; cross-platform bitwise equality is not claimed.

The initial suite passed 266 tests before C code changes; the completed core passed
285 tests, including 19 scientific invariants, before confirmation. Ruff and ticket
checks pass. The [final integrity audit](study-c/final-verification.json) verifies
frozen source, historical B2 dependencies, all required fits and the raw artifact
index. [Final resources](study-c/resource-final.json) remain below7200 CPU seconds,
14400 execution-wall seconds, 2 GiB RSS and 2 GiB artifacts. Instrumented numerical
phases use about 1350 CPU seconds, peak RSS 941932544 bytes and under .7 GB artifacts.
Timers cover the recorded numerical phases; process/import startup, repository
tests, source review and document drafting are separate uninstrumented engineering
overhead. Local Qwen assistance was unavailable (`Transport closed`); review and
execution proceeded directly. No cloud/GPU trial work occurred.

Raw archives live in `runs/study-c-v1/`. Reproduction commands, in order, are
`uv run python -m soam.ambiguity.runner fixture`, `development`, `calibrate`, `freeze`,
`confirmation`, `repeat`, `report` (substitute each phase argument). Existing phase
directories refuse overwrite. Post-confirmation saved-array analysis is
`uv run python scripts/analyze_study_c_ambiguity.py`; presentation-only repair is
`uv run python scripts/render_study_c_figures.py`. Their separate provenance records
preserve the original plots and change no scientific source, primary endpoint or fit.
Final audit: `uv run python scripts/finalize_study_c.py`. The integrity audit passed;
its first resource-summary export raised a key-name error. A documented
`--resources-only` repair completed that export without rerunning scientific work.
The original audit script is preserved, and the resource-export provenance records
the repaired script hash. This reporting error is separate from the zero failed fits.

The measured neural factorization benefit, conventional sufficiency and coherent-
cause overconfidence merit joint blog/report discussion. The owner was notified;
no publication, remote issue, push or further study was performed. Scheduling,
complementary objects, learned allocation, persistent acquisition and integration
remain separate conditional work.
