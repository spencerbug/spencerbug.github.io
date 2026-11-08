# Shared-population gate — SOAM-052

2026-11-08. **Decision: stop** the tested useful-sharing claim for S32 under frozen
E1 v1 + A1. The scientific comparison is reviewable and complete; its governing
outcome is **`recall_interference_or_failure`**, specifically **absolute recall
failure**, not demonstrated destructive interference. S32 recall NMSE is 0.077657
(ordinary 95% root interval [0.068287, 0.086725]) against the frozen 0.02 maximum.
All ten root means exceed that maximum. Both relative retention guardrails pass.

This stops promotion of this tested candidate through the useful-sharing gate.
It does not stop the experiment platform, reject all shared recurrent models, or
select a replacement architecture. SOAM-051 remains a completed negative experiment.
SOAM-059 is the next eligible routing decision and is **not performed here**.
No new fit, observation, condition, experimental fork, gate threshold or budget was
introduced by this review.

## Evidence and review boundary

The [full study](SHARED_POPULATION_STUDY.md), its preserved development/readiness
history, [E1 v1 protocol](../docs/SHARED_POPULATION_PROTOCOL.md),
[numerical manifest](../docs/protocols/shared_population_v1.json) and
[A1 addendum](../docs/E1_ARCHIVE_A1.md) own the measurements and frozen criteria.
Earlier [harness failure](SHARED_POPULATION_HARNESS.md) and
[A1 correction](E1_ARCHIVE_A1.md) remain engineering evidence, not empirical gates.
SOAM-051 is done, its acceptance items are checked, and all SOAM-052 body conditions
are satisfied. This document is the consequential decision record in the existing
SOAM-052 ticket; it creates no additional protocol or approval layer.

Review base commit: `8e46d78`. Scientific source was frozen at
`fe9925f796af0a835a509cbef3bded4be3783fa3`; confirmation executed from
`7b3dea667cd65626af259a6ccbf0e17e0d8e96f6`. Source SHA-256:
`b52329efaa0a4927337691e60a5b610ed08984b884aef8dd5b7b12801f2408c9`.
The [gate audit](shared-population-gate/audit.json) and its
[read-only extractor](shared-population-gate/audit.py) independently check the
archived evidence. The [gate checksums](shared-population-gate/sha256.json) identify
this review's compact artifacts. Existing study evidence was not rewritten.

| Evidence question | Exact artifact / check | Assessment before interpreting benefit |
| --- | --- | --- |
| Frozen source and scientific settings | [Provenance](shared-population-study/confirmation/provenance.json), [resolved config](shared-population-study/confirmation/config.json), [accepted calibration](shared-population-study/continuation/calibration/cost-ledger.json); gate audit checks each source file against disk, execution commit and calibration | Same scientific source, E1 manifest/A1 and runtime; no post-result equation, configuration or threshold change |
| Complete inventory and failed seeds | [Inventory](shared-population-study/confirmation/inventory.json), [fit records](shared-population-study/confirmation/fit-records.json), raw per-root `result.json`; exact frozen cell-set check | 42 development + 70 confirmation + 7 repeat fits; 27,820 total cells. Zero scientific fit/cell failures, exclusions, replacements or retries |
| Integrity of inputs and numerical evidence | [SOAM-051 audit](shared-population-study/confirmation/audit.json), [numerical fingerprints](shared-population-study/confirmation/numerical-sha256.json); fresh whole-archive and compact-file hashes | Earlier 7,440-object / 80,080-reference / 129,404-array audit remains sealed. Raw development and confirmation/repeat digests match exactly |
| Reproduction | [Reproduction](shared-population-study/confirmation/reproduction.json); gate independently compares archived original/repeat | Exact 11,764 numerical arrays, 7,280 input references and 9,603 records; no extra independent root |
| Information and selection parity | [Development screen](shared-population-study/development/development-screen.json), [gate audit](shared-population-gate/audit.json), frozen execution/fitting/evaluation code | Same training inputs across all seven families; same base evaluation episodes; development-only configuration/lesion selection; no privileged free-rollout observations or writes |
| Resource validity and limitations | [Cumulative ledger](shared-population-study/confirmation/final-ledger.json), [reporting attempts](shared-population-study/confirmation/audit-attempts.json), resource discussion below | Scientific run remains inside every recorded runtime ceiling. Accounting and metadata caveats are retained, not silently treated as zero or perfect telemetry |
| Finiteness and implementation invariants | Full 190-test suite, original finite-array audit, frozen source and complete raw status rows | No identified numerical instability, broken isolation/equation, target leakage or missing required scientific row |

Raw development remains 48,382 files / 95,228,443 bytes, digest
`3780bbb310ee7bc7d9b9ebf70afe58d0b39e0565a7234c704ea361f288d7c4fd`.
Raw confirmation/repeat remains 168,426 files / 538,869,653 bytes, digest
`d8b3f8de2d1ec46f7e745a18ccf8df4c68fb36b1b8c5fb04df07ba0d91b44f68`.
These sorted relative-file digest mappings cover all archived input objects,
checkpoints, optimizer tensors, losses, selections, targets, predictions and records.
They remain under `runs/e1-development-v1-a1` and `runs/e1-confirmation-v1-a1`;
compact files do not replace full numerical archives. Reproduction excludes timing
and ZIP-container bytes, as frozen; it is not a cross-platform reproducibility claim.

## Information parity, tuning and resource audit

All families receive the same six-coordinate noisy masked initial feature cue,
validity mask, supplied role and executed commands. The projection is fixed at seed
1729. Clean observations correct grounded paths only after prediction; they never
enter free rollouts. The simulator state, projection inverse, split labels and future
features are evaluator/task data. [Fitting](../soam/shared/fitting.py) uses observed
clean records, not evaluator world states; [evaluation](../soam/shared/evaluation.py)
checks parameter/observation immutability. The passing ownership and poisoned-input
[tests](../tests/test_shared_evaluation.py) support these code checks.

The fresh gate audit compares **53,900 training input references** across 77 new
fits and **4,620 base scoring references** against each root's archived inputs.
All match. It checks all 77 full 400-step exposure traces, the L12 actual data counts,
and lesion-selection persistence before the first confirmation reference. The sealed
prior audit additionally checks all component seed keys and diagnostic references.
This combination supports information parity; identical seeds alone would not.

Each family had two frozen development configurations and three training roots
401/409/419. Final-checkpoint/free-8 development selection chose neural config 1
(learning rate 0.003), L12 config 0 (ridge lambda 0.0001), and primary reference G32.
G32's development transition/recall means 0.031548/0.015432 satisfy competence limits
0.15/0.03. No development or confirmation reference reaches the 1e-6 floor.
Confirmation roots 11, 23, 47, 71, 101, 131, 173, 211, 257, 307 use new **train**
streams for fitting and a distinct confirmation split for scoring. Lesion selection
uses its separate root-401 development-diagnostic stream. No recall result selected
or rescued a configuration. This is comparable finite tuning opportunity, not proof
of optimal training for every family.

Per fit, 6,400 recall source records and 4,800 transition episodes / 38,400 transitions
are shared across families. Free/grounded losses and repeated recall targets reuse
these records; they are not new grounded data. Across 13 unique training roots there
are 83,200 recall records and 499,200 transitions; summed over 119 fit instances,
761,600 recall records and 4,569,600 transitions. Normalization's 2,048 train-root-1801
records are separate. A1 deduplicates physical input files, not exposures or statistical
replicates. L12 uses three normalized float64 ridge solves per fit on the corresponding
observed records, with float32 evaluation; it does not perform 400 Adam updates.

| Family | Fitted scalars including readout | Allocated / active neurons | State bytes incl. role | Persistent weight bytes |
| --- | ---: | ---: | ---: | ---: |
| S32 | 3,868 | 32 / 32 | 136 | 15,472 |
| D25 | 3,849 | 50 / 25 | 208 | 15,396 |
| D16 | 2,040 | 32 / 16 | 136 | 8,160 |
| G28 | 3,988 | 28 / 28 | 120 | 15,952 |
| G32 | 4,940 | 32 / 32 | 136 | 19,760 |
| L12 | 924 | 12 / 12 | 56 | 3,696 |
| SYM32 | 1,884 | 32 / 32 | 136 | 7,536 |
| T32 | 3,868 tied, no fit | 64 / 32 | 264 | 15,472 aliased to S32 |

Source: [resource records](shared-population-study/confirmation/audit.json), key
`representative_resources`, and manifest `diagnostic_adapters`. D25/G28 approximately
match parameters; D16/G32 match allocated neural state. Active widths, parameter
counts, algorithm and compute differ. No exact simultaneous match or isolated causal
performance effect of overlap is claimed. In particular S32 versus D16 also changes
active width from 16 to 32. T32's inactive bank need not exist under lazy single-role
allocation, so the allocated-state difference is not an unavoidable memory saving.

Both disjoint banks, readouts, role flags, snapshots and optimizer/checkpoint storage
are counted. Four is the per-cell peak model-copy count; other resident models,
expanded matrices and archive work are covered by measured process RSS. There is no
inference-time replay memory or supplied pattern bank. The new roots record
4,820,893,440 evaluation linear MACs, including selection and repeat; these exclude
nonlinear/backward operations, ridge solves and I/O, and are not total training FLOPs.
Full CPU/wall measurements, not this partial operation estimate, enforce allocation.

| Resource | SOAM-051 cumulative recorded/charged value | Frozen cap |
| --- | ---: | ---: |
| Maximum individual new fit CPU | 36.121810 s | 90 s |
| Development phase CPU | 392.372820 s | 4,000 s |
| Confirmation phase CPU | 1,736.235285 s | 8,000 s |
| Repeat phase CPU | 316.280692 s | 1,200 s |
| Overhead CPU | 397.279517 s | 1,200 s |
| Total CPU | 2,842.168314 s | 14,400 s |
| Total wall | 2,871.456852 s | 28,800 s |
| Measured peak RSS | 853,032,960 B; scientific runner 417,562,624 B | 2,147,483,648 B |
| Artifact allocation incl. report reserve | 680,050,154 B | 8,589,934,592 B |

The carry includes earlier failed/complete calibration and engineering attempts;
the original failed v1 storage projection is preserved, not replaced by A1 success.
Actual maximum fit time and repeat-phase time exceed their calibration projections
(21.7414 and 282.7564 seconds respectively), but remain below the frozen runtime
ceilings. Projection margins were estimates, not new stopping thresholds.

Three caveats require an explicit validity judgment:

1. Raw `config_sha256` hashes the capture wrapper (`e6bec42b…`), whose defaults are
   engineering settings. The actual archived `config.json` has `fixture: false`,
   frozen selected configs and complete scientific inventory. Its separately
   verified canonical digest is
   `b9f125d176844963db9aaadf8ec32f43da76e70aa5429dd77bd637fc221c3f80`.
   Full traces, input streams and source establish what executed. This is a resolved
   metadata-label deficiency, not evidence that a fixture or wrong configuration ran.
2. L12 generic exposure fields describe neural loss shapes. Actual ridge traces,
   observation counts and source establish the three solves. Those fields must not
   be used as gradient-update or exact-compute-parity evidence.
3. Two reporting-only extractions were incomplete, after the scientific run.
   They remain conservatively charged 177+44 CPU/wall seconds; separate peak RSS
   and the first terminal diagnosis were not captured. The later regrouped-mean
   check uses 1e-12 tolerance with maximum discrepancy 6.66e-16. Numerical bootstrap,
   T32/isolation and reproduction remain exact. These reporting attempts neither
   refitted models nor altered scientific records.

**Validity judgment:** no demonstrated defect changes scientific equations, data,
comparisons, complete inventory or measurements. These caveats do not establish the
protocol's invalid-execution/accounting-mismatch condition. However, full RSS-cap
compliance for every post-run reporting attempt cannot be retrospectively certified;
unknown RSS is not assumed zero. We accept the complete scientific comparison for
this bounded negative gate, while withholding any claim of flawless end-to-end
telemetry or resource efficiency. If evidence of an actual execution/parity defect
later appears, preserve this review and issue a fresh corrective decision.

The gate audit itself used 62.041096 CPU / 83.136607 wall seconds. Conservatively
adding it, two seconds of metadata reserve and 128 KiB report reserve yields
2,906.209410 CPU / 2,956.593458 wall seconds, 461.320613 overhead CPU seconds and
680,181,226 artifact bytes, still inside the unchanged ceilings. The original ledger
is untouched; this is accounting continuation, not a renewed fit allowance. Tests
and local-worker review remain engineering review outside the trial ledger, as
previously declared. See `conservative_cumulative_ledger` in the gate audit.

## Uncertainty, guardrails and outcome precedence

There are **ten independent paired confirmation roots**, not 27,820 independent
cells. Episodes are averaged within root; seed-11 repetition adds no independent
sample. The audit exactly recomputed all adjusted and ordinary bounds from 10,000
fixed PCG64 resamples (inference root 8675309). The five reference gains and two
recall contrasts use tails 0.05/14; the six causal contrasts use tails 0.05/12.
Ordinary 95% recovery and descriptive intervals remain separate. No new confidence
level, endpoint, seed or precision threshold was selected after seeing results.

| Frozen precedence | Audit finding | Consequence |
| --- | --- | --- |
| 1. Invalid execution/comparison | No demonstrated leakage, wrong source/equation, unmatched information, broken isolation or missing scientific rows; qualified reporting metadata/telemetry as above | Does not supersede measured scientific outcome |
| 2. Incomplete/floor/reference instability | Full inventory, finite runs, competence screen passes, minimum reference/root primary error 0.019402 >1e-6; no exhausted cap or replacement | Does not apply |
| 3. Recall interference/failure | S32 absolute recall 0.077657 >0.02; every root fails the absolute limit. Both relative guards pass | **Governing outcome: absolute recall failure** |
| 4. Directional failure | Transition mean 0.086825 ≤0.10; neither action test is a precise failure; recall is already inadequate | Not the governing class |
| 5. Useful sharing supported | Absolute recall fails, utility does not pass all references, all six causal criteria miss width caps | Cannot proceed |
| 6. Precise no practical benefit | No required-reference gain has both upper bound <0.10 and width ≤0.20 | Do not relabel as this class or equivalence |
| 7. Remaining inconclusive/mechanism unresolved | Several component estimates are unresolved | Retain component uncertainty; it does not erase earlier clear recall failure |

The two relative recall contrasts (negative favours S32) are:

| Contrast | Mean NMSE difference | Adjusted interval | Guardrail upper limit |
| --- | ---: | --- | ---: |
| S32 final − recall-only | -0.037492 | [-0.058497, -0.008635] | 0.005 — pass |
| S32 final − D25 final | -0.009423 | [-0.018227, 0.000726] | 0.005 — pass |

These guard mean retention during joint **offline** fitting. They do not establish
online forgetting resistance, no interference in every root, or adequate recall.
Root 307, for example, worsens from 0.052342 to 0.086193 despite the mean guard pass.
The absolute-recall ordinary interval [0.068287, 0.086725] and root range
[0.050143, 0.101937] make this a clear failed practical requirement. The stop is not
inferred from a wide comparative interval or from one unlucky seed.

## Predictive utility

Primary S32 free-8 NMSE is 0.086825 [0.074820, 0.098609] (ordinary 95%). G28 is
0.046443 [0.039819, 0.052585] and preselected G32 is 0.037692 [0.029909, 0.045716].
Both GRUs have lower primary error in every root. The required paired gains are
means of per-root relative reductions, not ratios of pooled mean errors:

| S32 gain over | Mean | Adjusted interval | Width ≤0.20? | Frozen individual benefit criterion |
| --- | ---: | --- | --- | --- |
| D25 | 0.201038 | [0.093428, 0.310170] | No, 0.216742 | Does not pass precision cap |
| D16 | 0.211141 | [0.143127, 0.300183] | Yes, 0.157056 | Pass; not enough to pass all references |
| G28 | -0.938844 | [-1.384367, -0.556093] | No, 0.828274 | Lower-error GRU; no frozen precise-no-benefit classification |
| G32 | -1.526395 | [-2.333402, -0.866113] | No, 1.467289 | Lower-error GRU; no frozen precise-no-benefit classification |
| L12 | -0.021142 | [-0.221034, 0.103314] | No, 0.324348 | Inconclusive comparison |

The [complete table](shared-population-study/confirmation/tables.md) and
[statistics](shared-population-study/confirmation/statistics.json) retain ordinary
intervals, all models, secondary free-32/grounded-32 errors, and every diagnostic.
S32 free-32 is 0.105189, similar in mean to G32 0.105513; L12 has free-32 0.057183
but grounded-32 0.329105. These mixed secondary results do not replace the frozen
free-8 endpoint. SYM32 free-8 is 0.180056; it is a separately fitted mechanism control,
not a sixth mandatory superiority reference. The result rejects promotion of this
S32 configuration/task/allocation, not all recurrence: GRUs share recurrent units too.

## Shared-unit intervention evidence and T32

| Six prespecified causal contrasts | Mean | Adjusted interval | Width / frozen cap | Gate evidence |
| --- | ---: | --- | --- | --- |
| Full targeted − intact recall | 0.615460 | [0.513405, 0.737641] | 0.224236 / 0.02 | Unresolved |
| Full targeted − intact free-8 | 0.501028 | [0.440196, 0.557538] | 0.117342 / 0.02 | Unresolved |
| Full − readout-only recall | 0.429698 | [0.374571, 0.490024] | 0.115452 / 0.02 | Unresolved |
| Full − readout-only free-8 | 0.233442 | [0.205424, 0.254275] | 0.048851 / 0.02 | Unresolved |
| Shifted-action relative increase | 0.580384 | [0.324054, 0.898404] | 0.574350 / 0.20 | Unresolved |
| Zero-A relative increase | 1.236030 | [0.820426, 1.662235] | 0.841809 / 0.20 | Unresolved |

All six means exceed their practical minima and all adjusted lower bounds are
positive. None meets its width cap and none is a precise failure. Thus the data
show substantial intervention sensitivity in the declared unit basis, including
an effect beyond masking readout alone, while **the full preregistered causal
claim is unresolved**. Large positive point estimates cannot waive precision rules;
wide intervals cannot establish absence. Four matched random lesions, both D16
bank masks and all readout/action/symmetry controls remain in the linked tables.
Targeted lesions need not exceed random lesions under the protocol.

T32 intact and S32 free/grounded predictions are exactly equal. T32 and D16 opposite
bank interventions leave the other role exactly unchanged. The gate independently
rechecks 660 prediction arrays for each of these three properties across 440
role/episode pairs including repeat. T32 uses the same parameter objects and two
separate activity banks. S32's selected four coordinates affect both functions;
a one-bank T32 intervention affects only that bank. This distinguishes intervention
on the same state coordinates from tying weights, without making physical overlap
necessary for the intact behavior. Four units in each T32 bank would be eight total,
not an equal four-unit intervention.

T32 equality is an algebraically expected identifiability limit, not a superiority
failure or an optional control. Even a future positive utility score on this exact
single-role design could not establish a prediction advantage uniquely caused by
physical overlap. Unit lesions do not establish semantic feature/action neurons,
basis-invariant concepts, concurrent binding or an ontology. Action shift and zero-A
show sensitivity of fitted S32; comparison with retrained SYM32 asks a different
question and does not prove asymmetry universally necessary.

## Attraction evidence, separately

The frozen recovery diagnostic is **`diagnostic_criteria_not_met`**:

| Criterion | Mean | Ordinary 95% root interval | Interpretation |
| --- | ---: | --- | --- |
| Distance-halving fraction | 0.975000 | [0.960000, 0.990000] | Pass ≥0.90 |
| Advantage over S=0 | -0.025000 | [-0.040000, -0.010000] | Fail ≥0.20 |
| Perturbed recall NMSE | 0.108642 | [0.095628, 0.123703] | Fail ≤0.02 |
| False-recovery fraction | 0.620000 | [0.545000, 0.690000] | Fail ≤0.05 |
| Feature variance ratio | 1.045411 | [0.985684, 1.105515] | Pass [0.8, 1.2] |

Zero-cue recall NMSE is 0.999546 [0.947019, 1.048037]: location-specific output
depends on evidence, but cue dependence is not successful recall. S=0 halves the
gap in every episode while recall is about 0.9845. An analytic explanation follows
from the frozen [rate equation](../soam/shared/models.py): in zero-command recall,
with S=0 and identical bias, `h_next = 0.5*h + 0.5*tanh(b)`, so paired perturbation
differences contract by 0.5 each step in exact arithmetic. The archived ratios
approximately follow 2^-t. This is a deduction from the supplied rule, not a new
trial or a fitted explanation; trivial contraction can erase useful content.

The S32 probe is ten-step recovery toward an unperturbed trajectory under supplied
role labels, with no sensory reinjection. It does not prove a global attractor,
Lyapunov descent, autonomous sequence memory or biological equivalence. The failed
usefulness/advantage criteria provide no positive attraction evidence for advancement.
Attraction was not a required utility-gate criterion, so its failure is reported
separately and is not substituted for the earlier recall rule.

## Architectural beliefs and decision consequences

| Belief | Required update from this evidence | What remains unresolved |
| --- | --- | --- |
| This shared symmetric-plus-skew S32 should be the platform's validated core | Withdraw that promotion under E1 v1; it misses recall and comparative utility despite finite dynamics and reproducibility | Whether a different frozen mechanism, objective, capacity or task could work; this study does not isolate the cause of poor recall |
| Passing retention guards means the memory is useful | Separate absolute competence from relative retention; joint training improves mean S32 recall from an already inadequate checkpoint | Online persistent acquisition/forgetting and task-specific interference outside this offline schedule |
| Overlap itself explains better prediction or unavoidable memory savings | T32 makes that stronger attribution unidentifiable here; active width and resource differences further limit disjoint comparisons | Whether physical overlap has an advantage in a different identifiable setting; no concurrency experiment is authorized |
| Positive lesions/action ablations validate useful shared dynamics | Retain observed sensitivity, but require comparative utility and the frozen precision criteria separately | Formal causal/directional pass, semantic neurons and basis-invariant shared structure |
| Fast perturbation contraction demonstrates useful attraction | Reject that shortcut: zero-S contracts faster while discarding task information | Useful attractor behavior for other systems/conditions; symmetry alone gives no guarantee for this driven discrete rule |
| Ordinary recurrence or simpler models are fallback conveniences | Treat G28/G32 and L12 as substantive architectural alternatives with task/horizon/resource trade-offs | Which learner or application to pursue; this belongs to SOAM-059, not this gate |

**Why stop rather than proceed or revise:** proceed requires all useful-sharing,
causal and guardrail conditions, which are not met. A revise decision is appropriate
for a bounded unresolved/confounded gate result. Here, uncertainty in causal effects
and the L12/D25 comparisons coexists with a clear earlier absolute-recall failure;
no identified scientific confound explains that failure away. Stopping the tested
claim preserves the frozen precedence. Hypothetical better tuning is not a confound
or permission to revise E1 after seeing its confirmation data.

SOAM-052 is complete with `decision: "stop"`. Its dependent sharing-based concurrency,
control, composition-planning and organization work remains unready; no dependency
is removed or converted to proceed. SOAM-059 may separately select at most one
bounded alternative/diagnostic or stop, using the complete negative evidence. Any
corrective experiment requires a fresh protocol, fresh confirmation streams as
applicable and a fresh empirical review; SOAM-052's failed decision remains intact.
No replacement candidate, branch, new ticket, implementation or experiment is selected.
Historical Gate 1, writer and handover branches retain their recorded meanings.

Classification of recommendations: **essential next** is only SOAM-059's routing
decision (R6/R12); **parallel research** remains focused, unactivated SOAM-030 theory
on a concrete question (R8); concurrency, acquisition, applications, learned
organization and integration remain **future capabilities** until their own
selection/protocol/gate conditions hold. This is traceability, not a work order.

## Verification and publication flag

`uv run pytest`: **190 passed in 15.80s** before review edits.
`uv run python reports/shared-population-gate/audit.py`: passes all read-only archive,
source/config, parity, completeness, bootstrap, T32/isolation and reproduction checks.
Final ticket/schema/link validation and whitespace checks are recorded in
[verification.json](shared-population-gate/verification.json). Scientific source,
protocol/manifest/A1, configurations, consumed receipt and all study evidence remain
unchanged. Only the gate record and current status/claim mirrors change.

The bounded Qwen extraction (`560aa77ad2dc464f80ece38f35dde2b6`) falsely claimed
telemetry was absent and offered no usable citations despite explicit ledger fields.
It was rejected; the primary agent checked the evidence directly. No worker chose
a gate outcome, ran trials, edited source or changed allocations.

**Joint blog/report flag:** the reviewed negative gate is substantive: absolute
competence, relative retention, causal participation, physical identifiability and
useful recovery can disagree. The exact T32 equality and S=0 contraction control
make those distinctions unusually concrete. Any post should pair this decision
with the full study, disclose unresolved precision and reporting telemetry, and
scope the conclusion to E1 v1 S32. Nothing was published or sent externally.
