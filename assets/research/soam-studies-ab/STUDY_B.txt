# Study B: temporal gating of sensory assimilation

Complete, 2026-11-11. Both frozen versions, numerical repeats and independent
reductions are complete: **368 fits, no failed fits, 108 exact repeat checks**.

Recommend **separate prediction and sensory correction**, using PC16 as the small
robust neural reference and retaining the fitted two-state filter as the strong
accuracy/resource reference. Adaptive sensory gain did not meet the declared 10%
practical-benefit criterion. Settling is useful in a bounded within-model comparison,
but its accuracy/robustness/resource tradeoff does not justify a mandatory default.
The [final interface decision](STUDY_B_DECISION.md) specifies these choices.

V1 classifies learned sensory gating as a **tradeoff**: GA32 gains 3.44% over PC32
(family-adjusted interval −0.86% to 7.86%), while corruption error increases by
0.03435 NMSE, beyond the 0.01 guard margin. A separately frozen fresh-stream
supplement supplies explicit residual and action magnitudes. Its GN32 gains 1.61%
over PC32 [0.52%,2.68%] and 0.035% over GA32 [−0.008%,0.088%]. These intervals
exclude the declared 10% advantage. The supplement is **negative practical
advantage**, not proof of zero effect. No thresholds changed after confirmation;
the two root sets are not pooled.

## Scientific scope and prior evidence

The owner-selected study asks whether separating prediction, sensory correction and
zero-time settling improves recurrent sensorimotor inference at controlled evidence
and explicit computational cost. Study A recommended ordinary R32 as a small
competent starting core, with an accuracy tradeoff, and found its formal adaptive
update benefit inconclusive. The owner removed the copied GRU requirement. This
study searches ordinary 16/32-unit tanh recurrences and correction/control variants;
it preserves the historical GRU scores without treating them as matched Study B
measurements. Study A's learned two-dimensional model motivates stronger mask-aware
reconstruction and filtering controls.

The task is a low-dimensional, projected state-estimation benchmark with heavy
supplied structure: three action channels, known recall/motion roles, a fixed
12-feature projection and offline supervised training. It does not establish
attractors, shared-neuron superiority, compositionality, unsupervised discovery,
control benefit, online learning or biological validity. SOAM-052's negative gate
and all historical results remain unchanged.

## Frozen design

[Protocol](../docs/STUDY_B_PROTOCOL.md), [manifest](../docs/protocols/study_b_v1.json),
[implementation verification](STUDY_B_IMPLEMENTATION.md) and
[biological note](STUDY_B_BIOLOGY.md) specify assumptions and evidence boundaries.

Six schedules (every 1/2/4/8, seeded irregular, initial-only) are crossed with nine
conditions: full features, partial features, missing events, high noise, transient
corruption, contradictory snapshots, genuine state change, altered movement and a
long sensing gap. There are 20 episodes per cell and 64 physical steps. All models
receive identical information for each paired root. Half the physical intervals
use each known role; action and feature inputs have declared roles, not empirically
discovered neuron semantics. Actual sensing schedules are supplied, not learned.

Every prior is recorded before accessing the current measurement. Corrections may
change the state; internal iterations apply no action or simulator time. The
conventional mixed model recomputes its posterior from the previous state using
both action and observation, with its extra prediction branch explicitly charged.
Ground truth enters training losses and evaluator reductions only.

Sixteen candidates cover mixed-input recurrence, residual correction, cue-free
settling, repeated-input and conventional extra-compute controls, mask/residual/
state/action/metadata gains, independent motion gain, historical-form L2, mask-aware
reset and a fitted Kalman-form filter. Neural parameters are trained offline with
identical records and two learning rates, 1200 updates, batch eight, horizon sixteen
and a common decay. Linear references fit PCA/bilinear dynamics from the same
feature targets using two ridge penalties. No simulator coordinates, formulas or
projection inverse are supplied to any competitor.

The primary endpoint is pre-correction NMSE averaged equally over the four
intermittent schedules and partial/missing/noise conditions, then reduced within
root. Its variance denominator comes from 2048 independent training-distribution
samples. GA32 versus PC32 and MIX32 is the fixed primary comparison. A 10% practical
gain, positive adjusted intervals, bounded interval width, absolute competence and
four guardrails per comparator are jointly required. Ten paired roots are the
uncertainty units; 20,000 bootstrap resamples and a ten-contrast Bonferroni family
were frozen before confirmation. All other model and settling comparisons are
prespecified descriptive analyses.

## Development and execution

All 64 development fits completed using roots 11003 and 11027. Selected primary
settings: MIX32 and PC32 LR 0.01, GA32 LR 0.003. SET32 selects one extra iteration,
REP32 two, MIXC32 four. Other settings and late learning curves are retained in the
receipt. None of the three primary models crossed the >20% late-improvement flag;
this finite screen does not prove optimizer optimality.

The immutable confirmation receipt is
`ea64dceeda1dd283e8fda8af11e434e0a63159561822f762cf40a395429b701d`
(structured-content digest, excluding its own hash field).
Source commit `0e03e0dfb22f309c40f8339cd643b26d0be84f44`; aggregate source fingerprint
`ae6754ce8e177d17ad5ee4590814e5176190bb3e301907a81603c996acb06602`.
The 79-file snapshot includes the model/data/evaluator/statistics code, tests,
manifest, protocol and dependency lock. No source change separates development
from confirmation.

Confirmation roots: 12007, 12011, 12037, 12041, 12043, 12049, 12071, 12073, 12097,
12101. Root 12007 is the prescribed complete numerical repeat. Hardware is an
Apple M3 Max, Mac15,10, 36 GiB system memory. Runtime: Python 3.12.13, PyTorch
2.14.1, NumPy 2.5.4, macOS 26.6.2 arm64; local CPU, one Torch thread, deterministic
algorithms, float32 neural operations and float64 fitting/reductions.

## V1 findings and the four competing hypotheses

**B-H1: separate correction.** Residual correction outperforms the tested
simultaneous-input recurrence. PC16-minus-MIX16 J is −0.02656 (descriptive 95% paired
interval [−0.03180,−0.02090]); PC32-minus-MIX32 is −0.03062
[−0.03467,−0.02644]. These are matched observations and state-update counts with
different arithmetic, not a proof that every conventional RNN is incapable of
learning correction. The conventional extra-compute model remains worse.

**B-H2: settling.** SET32's same-weight J at k=0/1/2/4 is
0.06395/0.06163/0.06103/0.06135. More iterations improve the estimate initially,
then saturate/slightly worsen it. At matched k=1, SET32 beats repeated-input REP32
by −0.00498 [−0.00744,−0.00197] and MIXC32 by −0.04088
[−0.04674,−0.03582]. However, against the much cheaper independently trained PC16,
selected SET32 gains only −0.00079 J [−0.00279,0.00125], while corruption error rises
0.01912 [0.01513,0.02317]. It uses about 2313 versus 718 linear MAC/physical step.
There is useful bounded refinement within SET32; this does not justify mandatory
settling in the default interface.

The event-driven rule reaches J=0.06107 at about 2529 MAC/step, versus fixed-k=4
J=0.06135 at 3408. The learned continuation head is nearly fixed-k=4 in both error
(J=0.06134) and cost (3412 MAC/step including its overhead). The fixed-period rule
has J=0.06141 at 3002 MAC/step. These are matched maximum update budgets with
observations fixed; average costs differ and are reported. The event-driven
heuristic is competitive here, not established as universally optimal.

Initial-cue reconstruction in SET32 decreases from 0.22398 through
0.14147/0.11356/0.09987 to 0.09322 NMSE over four internal iterations. Its across-cue
output variance does not collapse over that interval (0.01946→0.02234). However,
REP32's future-prediction J worsens from k=2 to k=4 even while initial reconstruction
continues improving. Better immediate completion is therefore not the same as
better next-observation prediction. The [iteration records](study-b/cue-retention.json)
and [settling plot](study-b/settling-frontier.png) preserve both metrics; no attractor
claim follows.

**B-H3: adaptive sensory gain.** The formal v1 result is **tradeoff**. GA32 beats
MIX32 by 34.64% [28.03%,40.94%] on the paired primary gain, but improves only 3.44%
[−0.86%,7.86%] over fixed correction PC32. The latter interval excludes the frozen
10% practical benefit. Its corruption guard fails decisively: GA32-minus-PC32
0.03435 [0.02811,0.03972] NMSE. Free32 protection versus PC32 is also unresolved
(upper adjusted bound 0.02139 against 0.01). These are simultaneous family-adjusted
intervals; clean and genuine-change protection versus PC32 pass the numerical
margins. The [full ten-contrast table](study-b/primary-decision.json) includes every
check. V1's signed affine gate is a limited representation, motivating the explicit
magnitude supplement rather than a claim against all adaptive gating.

Independent motion gain AM32 does not improve primary J relative to GA32
(difference 0.00051, descriptive interval [−0.00219,0.00312]), though it reduces
corruption, true-change and free32 errors. It is a secondary resource/robustness
tradeoff, not a reason to require learned motion gain in every core.

**B-H4: simpler alternatives.** Conventional mixed-input recurrence is inferior in
this finite inventory, but ordinary recurrence with a separate correction is
competitive at much lower neural cost. PC16 uses 1340 fitted scalars and sixteen
recurrent values, versus PC32's 3180 and thirty-two, with similar primary error.
Neither a global minimum width nor equivalence to every GRU is established.

The fitted two-state FILTER2 is the strongest primary-accuracy/resource reference:
J=0.04180 [0.04014,0.04352], free32=0.01331 and roughly 110 linear MAC/step (matrix
solves excluded). It uses six recurrent values including covariance, 65 inference-used
coefficients/hyperparameters, and 460 allocated persistent bytes including unused
common buffers. But its corruption NMSE is 0.37627, compared with PC16's 0.11115.
The difference is 0.26512 [0.24261,0.28909]. RESET2 behaves similarly: very small,
accurate with reliable evidence, and highly vulnerable to erroneous snapshots.
There is no single model that dominates accuracy, robustness and cost.

The supplied-noise FILTER2 diagnostic improves J by 0.02490
[0.02369,0.02626], giving J≈0.01690, without changing corruption or genuine-change
scores because those cases still report nominal SD 0.01. This is an explicit
information advantage, not a fair inferred-reliability win. Its ordinary-noise
covariance is poorly calibrated when actual SD is 0.10: every-four 95% coverage is
71.61%, compared with 97.97% when nominal reliability is supplied. Coverage on clean
partial observations is 100%, also not nominal calibration. Covariance does not
supply a general guarantee of trustworthiness.

Complete endpoint/root/condition uncertainty is in [tables](study-b/tables.md),
[statistics](study-b/statistics.json), [condition statistics](study-b/condition-statistics.json),
[calibration](study-b/filter-calibration.json) and [resource records](study-b/resources.json).

## Fresh magnitude supplement

The [supplement protocol](../docs/STUDY_B_MAGNITUDE_PROTOCOL.md) closes a specific
representation gap: v1's affine signed inputs cannot directly express a
sign-invariant magnitude rule. GN32 appends masked residual RMS and action norm to
GA32; GMN32 also receives nominal noise SD; AMN32 independently controls motion.
PC16, PC32, GA32 and FILTER2 are freshly fitted controls. The initial core weights
are paired, with no checkpoint transfer. V1's result and SOAM-069 revise are retained.

Development roots 13103/13109 select LR 0.003 for PC32/GA32/GN32/GMN32, 0.01 for
PC16/AMN32 and ridge 0.0001 for FILTER2. No primary candidate triggers the frozen
late-optimization flag. The change from v1's PC32 LR 0.01 is development-selected;
cross-version changes cannot be attributed solely to gate architecture.

Confirmation roots are 14207,14221,14243,14249,14251,14281,14293,14303,14321,14323;
14207 is repeated. Nominal roots map through the separately namespaced seed
function in the protocol; [data provenance](study-b-magnitude/data-provenance.json)
records effective roots and hashes. The source commit is
`21084476c334dd4d683dde056f0522ad3947b547`, aggregate fingerprint
`7c2b3d21e32ea875f5ae9e7914fd4e099bb57ceaa8abe68163fc5ebc77d8833b`.
The immutable receipt is
`4d6ee69672cb521b924a59d475c0282b451520503411f78964e3da76b96b2dfb`.

| Model | Primary J | Corruption NMSE | Free32 NMSE | Linear MAC/step |
| --- | ---: | ---: | ---: | ---: |
| PC16 | 0.06279 | 0.11045 | 0.20352 | 718 |
| PC32 | 0.06099 | 0.14001 | 0.20806 | 1948 |
| GA32 | 0.06000 | 0.14616 | 0.19983 | 1967 |
| GN32 | 0.05997 | 0.14541 | 0.19980 | 1968 |
| GMN32 | 0.05994 | 0.14542 | 0.19980 | 1968 |
| AMN32 | 0.06100 | 0.11709 | 0.18818 | 2006 |
| FILTER2 | 0.04352 | 0.38011 | 0.01198 | 110 |

All eight adjusted guard bounds pass the 0.01 margin for GN32 against PC32/GA32,
though corruption still increases by 0.00540 [0.00282,0.00810] against PC32.
The two primary gain intervals precisely exclude 10%. This is a completed negative
practical-advantage result within the tested models and budget. Every contrast is
in the [primary decision record](study-b-magnitude/primary-decision.json).

The two extra magnitude coefficients yield a very small effect, not a robust
corruption rejection mechanism. Across the recorded every-step-sensing response windows,
GN32's mean gain is about 0.717 in partial/noisy/change conditions and 0.719 under
corruption. Nominal SD changes GMN32's high-noise gain to about 0.715; its descriptive
J difference from GN32 is −0.0000299 [−0.0000381,−0.0000209]. These are gain-response
diagnostics, not calibration or causal proof of cue trustworthiness.

AMN32 reduces corruption by 0.02832 [0.02651,0.03017] and genuine-change error by
0.00759 [0.00495,0.01017] relative to GN32, while its J difference is +0.00102
[−0.00217,0.00468]. Its free32 improvement remains uncertain. Motion coupling is
therefore a secondary tradeoff, not a demonstrated primary advantage. Relative to
PC16, GN32 improves J by 0.00281 [0.00139,0.00436], but increases corruption error
by 0.03497 [0.03060,0.03941] and costs about 2.74 times as many linear MACs.
These are descriptive 95% intervals; they do not replace the primary family.

The filter again has the lowest J and free32 error, and the highest corruption
error among these candidates. The [tables](study-b-magnitude/tables.md),
[secondary contrasts](study-b-magnitude/secondary-comparisons.json),
[full statistics](study-b-magnitude/statistics.json),
[gain responses](study-b-magnitude/gain-summaries.json) and
[tradeoff figure](study-b-magnitude/tradeoffs.png) retain all required controls.

## Prediction, reconstruction and recovery

Immediate sensory reconstruction is distinct from prediction before the next cue.
In v1, the primary-cell prior/posterior means are PC16 0.06242/0.05465,
PC32 0.06322/0.05491, GA32 0.06104/0.05399 and SET32 0.06163/0.05478.
FILTER2 is 0.04180/0.04295: under this noisy mixture, correction can worsen the
current estimate even while the filter remains the strongest future predictor.
The [full statistics](study-b/statistics.json) include free8/free32; the
[condition records](study-b/condition-statistics.json) and
[raw per-step and gap-age profiles](../runs/study-b-v1/confirmation/) retain error growth across sensing gaps.
The [stress trajectories](study-b/stress-responses.png) show both corruption
susceptibility and response to genuine changes. They are mean curves; independent
root intervals are retained in the machine-readable records.

A **post hoc reporting repair** changes only the descriptive recovery baseline.
The original evaluator compared against the eight steps just before recovery
began; for corruption/gaps those could already be impaired, making recovery look
artificially immediate. Original `recovery.json` and raw records are preserved.
The [repaired analysis](study-b/recovery-pre-disruption.json) instead uses the eight
steps before disruption, requires three consecutive steps below
`max(0.01, 2 * baseline)`, caps unresolved times at the horizon and reports censoring.
It reuses saved posterior errors without refitting or affecting primary endpoints.

For every-four sensing in v1, mean capped recovery after corruption is 4.01 steps
for PC16 (1% censored), 4.95 for GA32 (0.5%) and 0.17 for FILTER2 (0%). After genuine
change these are 8.16 (0.5%), 8.13 (0%) and 0.38 (0%). The filter's rapid recovery
coexists with large errors while wrong cues persist. Supplement PC16/FILTER2
corruption recovery is 3.53/0.15 steps, both uncensored; gap recovery is 4.08/2.31,
with 0.5%/0% censored. Baselines differ by model, so these are model-relative
recovery descriptions, not a common absolute competence test.

## Reproducibility, resource use and deliverables

V1 contains 16 fixture + 64 development + 160 confirmation + 16 repeat fits;
the supplement adds 7 + 28 + 70 + 7. All **368 fits** completed. The prescribed
repeats match **108/108** input/checkpoint/trace/prediction-related hash checks.
Independent audits regenerate data identities and recompute 1920 v1 plus 840
supplement endpoint/guard values from saved errors. All match. No fitting-source
dependency changed between the frozen executions and final audit.

The [cumulative ledger](study-b/resource-final.json) records 1422.60 CPU seconds
(23.71 minutes), 1422.72 execution wall seconds, 882,196,480 peak RSS bytes
(0.822 GiB) and 554,836,761 artifact bytes at audit close (0.517 GiB). These are below
the accepted 7200/14400 seconds and 2 GiB RSS/artifact limits. The ledger counts v1
once, including diagnostic and reproduction costs. Import/source-copy setup is
outside phase timers; repository tests, local-worker attempts and report writing
are separately identified engineering activity, not included numerical CPU.
There were no excluded or failed fits and no budget extensions.

Raw checkpoints, evidence/error arrays, timing, fit traces, source snapshots,
receipts and ledgers remain in `runs/study-b-v1/` and
`runs/study-b-magnitude-v1/`. Versioned compact records and figures are in
`reports/study-b/` and `reports/study-b-magnitude/`. Raw run directories follow the
repository's ignored-artifact convention; reproduction instructions and source
identities are in the [implementation record](STUDY_B_IMPLEMENTATION.md).
Plots include [accuracy/resources](study-b/resource-frontier.png),
[settling/compute](study-b/settling-frontier.png),
[conditions/schedules](study-b/conditions.png) and the supplement tradeoffs above.
The final full suite has **238 passing tests**, plus Ruff and ticket validation.

## Interpretation constraints

Matched physical observations and state-update counts do not imply identical
MACs, parameter counts or training CPU. SET32, REP32 and MIXC32 train with four
internal iterations; testing smaller k is a controlled inference intervention on
those trained weights. The conventional/repeated-input controls are necessary to
interpret a benefit; a worse k=0 result alone cannot prove a general need for
settling. SET32's learned continuation head has additional parameters and auxiliary
supervision from training reconstruction improvements. Its gain is not a confidence
probability. Neural probabilistic confidence calibration is therefore not claimed.

The filter receives a supplied two-dimensional prior and learns its observation
basis and bilinear transition. Its covariance is transient; the ordinary comparator
assumes noise SD 0.01. The separate supplied-noise diagnostic receives actual nominal
SD, while corruption remains unflagged. Neither is an oracle. Discrete abrupt state
changes are unpredictable before their first revealing observation and impose an
irreducible component of error on every model.

Training sees full sensory targets, including unexpected-change examples, while
inference sees scheduled partial measurements. Training targets are equally
available to all competitors and separately counted. Six observed feature channels generally span the supplied two-dimensional
state; partial sensing therefore need not be fundamentally ambiguous. There is
no many-pattern associative-memory load in this task. The state-estimation task,
loss, horizon and role switching differ from Study A, so its endpoint numbers
cannot be compared as if they were new paired observations.

The repaired recovery statistics use the explicitly described pre-disruption
baseline and censoring rule, not success in a downstream control task. Update/MAC figures exclude
universal evaluator diagnostics, matrix inverses/solves and nonlinear arithmetic;
measured evaluation CPU includes diagnostics and Python orchestration. Both must
be read together. Independent-root intervals describe this finite task and fitting
procedure, not arbitrary environments or all possible architectures.

The filter's covariance is additionally assessed by a **post hoc descriptive**
calibration audit: 90%/95% Gaussian ellipse coverage, squared Mahalanobis error and
Gaussian negative log likelihood in its learned two-dimensional sensory basis.
This uses existing frozen checkpoints and observation streams and does not affect
selection, primary tests, or decision thresholds. Neural sensory gains and the
settling continuation head are not interpreted as calibrated probabilities.
