# Study B2: robust correction succeeds within an identifiable fault class

Completed 2026-11-12, SOAM-074–077. **A compact statistical corrector can retain
FILTER2's ordinary accuracy and rapid genuine-change response while greatly reducing
identifiable sensor corruption. It does not solve coherent false evidence, and this
Torch implementation does not retain a measured inference-latency advantage over PC16.**

Recommend **ADAPT1**, a bounded scalar measurement-variance estimate from disagreement
among observed channels, as the stronger conventional reference. Retain **NISEMP** as
the simpler hard-gate reference. Both pass the frozen primary benefit and accuracy
checks. This is a scoped result in a supplied two-dimensional feature model, not a
universal corruption detector or evidence for recurrent-memory architecture claims.
The [decision and Study C handoff](STUDY_B2_DECISION.md) activate no next experiment.

## Main confirmation result

Ten independently fitted roots; paired observations/actions; twenty episodes/cell;
64 physical steps. Values below are means. [Complete tables](study-b2/tables.md)
include ordinary 95% root intervals; [machine-readable statistics](study-b2/statistics.json)
contain the frozen 12-contrast family and all guard intervals.

| Model | Ordinary J | Balanced corruption C | Original corruption | Genuine change |
| --- | --- | --- | --- | --- |
| FILTER2 | 0.04394 | 0.23540 | 0.37082 | 0.05907 |
| PC16 | 0.06395 | 0.14282 | 0.11048 | 0.10994 |
| R100, fixed conservative covariance | 0.01763 | 0.10651 | 0.10338 | 0.09986 |
| NIS99, nominal hard gate | 0.03159 | 0.02810 | 0.00228 | 0.54167 |
| CHANNEL2, marginal Huber weighting | 0.03526 | 0.16164 | 0.16240 | 0.06013 |
| NISEMP, development-calibrated gate | 0.04392 | 0.12918 | 0.01384 | 0.05907 |
| ADAPT1, channel-disagreement covariance | 0.02034 | 0.11111 | 0.00613 | 0.05909 |

STABLE, the solve/Joseph numerical control, matches FILTER2 to displayed precision.
Historical Study B numbers are preserved; this table is **fresh B2 confirmation**.
Its normalization is 0.030742605990558128 from an independent training-distribution
stream. J has Study B's intermittent-sensing definition. C equally weights seven
corruption conditions; the historical corruption score is also shown separately.
Neither is an outlier-classification percentage.

ADAPT1's paired-root C improvement is **52.69%**, family-adjusted interval
**[50.11%,55.06%]**. NISEMP's improvement is **45.01% [42.23%,47.58%]**.
Both exceed the frozen 30% mean benefit, positive lower bound and precision rule.
Both meet J<=.05, original corruption<=.15 and genuine change<=.07. Every adjusted
upper difference for J, change, clean, gap and free32 is below the unchanged .01
margin. The largest relevant ADAPT1 genuine-change difference is only
+.000022 NMSE, adjusted interval[+.0000025,+.0000432]. This is a tiny measured
increase, not exact equality. No threshold was relaxed after confirmation.

ADAPT1's J is 0.02034 [0.01979,0.02087], corruption 0.00613 [0.00527,0.00724],
and genuine-change error 0.05909 [0.05538,0.06255], using ordinary 95% intervals.
NISEMP is a useful smaller mechanism, but does little for ordinary high-noise
accuracy. R100 has even lower mean J and C than ADAPT1 but fails genuine-change
protection. NIS99's excellent corruption score accompanies severe rejection of real
changes. Choosing by the smallest corruption error alone would be misleading.

![Accuracy, corruption and inference cost](study-b2/pareto.png)

## What was tested and frozen

The [protocol/RFC](../docs/STUDY_B2_PROTOCOL.md),
[numerical manifest](../docs/protocols/study_b2_v1.json),
[development routing](STUDY_B2_DEVELOPMENT.md), and
[immutable confirmation receipt](study-b2/confirmation-receipt.json) distinguish phases.
The baseline test suite ran before modifications; the historical audit and invariant
tests preceded development; development preceded selection;
confirmation used fresh streams and immutable selected configurations. Persistent
observation/transition maps and process covariance are identical across each root's
filter variants. Every prediction is recorded before current sensory correction.
No corruption labels, actual noise magnitude, future evidence, simulator inverse or
true change indicator enters inference. Current nominal-SD metadata is unused.

Phase 1 screened 14 correction configurations plus original FILTER2 and PC16: R/Q/gain
one-factor controls, nominal/empirical NIS, raw and normalized soft weighting, and
channel Huber weights. Empirical NIS thresholds are the 99th percentiles of **all
pre-gating ordinary development innovations**: 1128.6601 for six observed channels,
22.5534 for twelve. High-noise ordinary sensing explains the large six-channel threshold.
Phase 2 evaluated ADAPT1/ADAPT05 and TEMP2/TEMP3; Phase 3 evaluated exactly one hybrid.
No unbounded sweep, additional training stream or confirmation-selected candidate ran.
[All screened configurations, costs and root results](study-b2/development-candidates.json)
retain negative results. Two distinct eligible challengers entered confirmation;
R100/NIS99/CHANNEL2 remained scientific controls alongside FILTER2/STABLE/PC16.

Temporal rescue reduced development genuine-change error from NIS99's .4672 to
.1755 with two consistent cues, but remained above .07. Three cues delayed more.
The hybrid reached .1755 and did not beat TEMP2's balanced C. They were excluded
before confirmation, so these are **development findings**, not confirmed negative
hypothesis tests. Heavy-tailed Bayesian filtering and a learned reliability controller
were deferred under the two-extension cap. The statistical methods met the study's
target without adding one; B2 does not establish superiority over every possible
learned gate or Student-t filter. PC16 is a neural estimator reference, not a newly
trained reliability classifier. Its inherited competent fitting settings and the
extra robust-controller search are explicit unequal tuning resources.

## Why the successful correction works

The [FILTER2 audit](STUDY_B2_FILTER_AUDIT.md) reproduces original root 12007 fitted
tensors and 216 archived arrays exactly. No baseline scientific defect was found.
Its fitted Q is large relative to nominal R: 98.303% of that root's transition-residual
energy comes from genuine-change training episodes. Nominal R=1e-4 also understates
Study B's high-noise observation variance by 100x. The filter therefore trusts cues
strongly and gives corrupted observations the same gain/covariance shrinkage as
clean ones with the same masks. An erroneous posterior then contaminates later priors.

Six observed features usually describe only two coordinates. For innovation r and
observed fitted matrix H, ADAPT1 estimates displacement
`u=solve(H'H,H'r)` and takes the residual `e=r-Hu`. Genuine state displacement lies
in col(H) and disappears from e. It estimates
`R=clip(||e||²/(valid_channels-2),1e-4,.25)`, with a rank check/fallback for insufficient
redundancy. It then performs an ordinary Kalman correction with this R and a matching
Joseph covariance update. One scalar is carried for fallback; on the tested six/twelve
channel masks the chosen alpha 1 uses the current snapshot, without a temporal window.
The smoother alpha.5 variant offered no selected corruption advantage.

This is **bounded, evidence-based measurement covariance adaptation** using supplied
low-dimensional structure. It changes the Kalman gain and its uncertainty update;
it does not clip hidden state. Under a correct fixed H and isotropic independent
noise, the redundant directions isolate measurement noise from state displacement.
Clamping, model error, correlation and same-sample plug-in estimation prevent claiming
an exact Bayesian posterior or globally calibrated covariance. The
[literature map](../docs/STUDY_B2_LITERATURE.md) identifies these assumptions and the
limits of innovation gating, saturation, Student-t and additive/innovative-outlier methods.

## Expanded faults, adaptation and calibration

T1 isolated outliers, T2 two corrupted channels, T3 plausible coherent snapshots,
T4 sustained coherent alternatives, T5 genuine sign reversal, T6 unannounced changed
dynamics, T7 long gaps, T8 Student-t3 measurement noise, T9 correlated/biased noise
and T10 identical-evidence ambiguity are implemented in
[the evaluator](../soam/robust/data.py). Study B masks, schedules, initial cue,
ordinary distribution and all original conditions remain. T10 is excluded from the
gate. Extended corruption training was not added to either baseline.

ADAPT1 improves isolated-fault error from .25215 to .00494, two-channel corruption
from .13223 to .00687, heavy tails from .08643 to .02895 and biased/correlated noise
from .10359 to .03027. It preserves changed-dynamics error (.02130 versus .02131),
gap error (.00736 versus .00737) and free32 (.01340 for both). Its improvement on T9
is partial: a scalar variance cannot model all correlated or persistent bias.

Genuine-change post-correction recovery is .896[.760,1.051] physical steps versus
FILTER2's .828[.688,.981], averaged over sensed schedules. R100 takes 12.219 and
NIS99 takes 13.684. Every change episode in the filter variants recovers by this
threshold within the horizon. The first unexpected **pre-correction** error is
unavoidable under the information contract. Recovery is first of three low-error
steps, not a guarantee against later relapse; especially NIS99 may initially reject
sustained corruption then accept it as uncertainty grows. Fault-end delays, censoring
and complete curves prevent treating an early crossing as permanent safety.

![Adaptation and plausible corruption](study-b2/adaptation.png)

At fault events on every 4, FILTER2's posterior NMSE is 3.2099 on original corruption;
ADAPT1's is .03439. Counterfactual clean-cue correction at the **same actual prior and
history** confirms greatly reduced contamination (influence 3.2162 versus .03596).
Counterfactuals are evaluator-only and never propagated. Complete root intervals are
in [influence.json](study-b2/influence.json).

Under ordinary high noise, prior state 95% coverage in the fitted basis improves from
.6675[.6587,.6769] to .9599[.9564,.9633]. Nominal partial-sensing coverage remains 1.0,
so the overall covariance is still too conservative in some conditions. NIS99 wrongly
rejects 99.73% of valid high-noise cues; NISEMP rejects 2.65%. ADAPT1 never hard-rejects,
but frequently lowers measurement precision. Its reported precision multiplier is
not the actual relative Kalman gain or an inlier probability. `downweighted` means
that multiplier is below .5; R100's constant multiplier relative to its own baseline
is 1, so consult gain norms/covariances rather than comparing these indicators blindly.
A separate [actual-gain audit](study-b2/effective-gain.json) compares the gain matrix
with nominal-R correction at the same prior covariance and mask. ADAPT1 retains
99.40% of the nominal gain norm on clean partial observations and genuine changes;
none fall below half gain. Under ordinary high noise the mean ratio is 53.54%,
with 44.66% below half. R100 averages 49.32% even on clean partial observations and
changes. These ratios are diagnostics, not correctness probabilities.

Accepted-only NIS is separately retained; empty accepted sets have a zero storage
placeholder and must not be interpreted as measured zero NIS. ADAPT1's same-snapshot
R makes its NIS a diagnostic, not a nominal predictive chi-square statistic.

Software tests are engineering evidence, separate from the scientific gate. No nonfinite scientific run or excluded
root occurred. Covariances remain positive; the audited nominal prior condition
number is at most 1.54. Full guard/secondary intervals are in
[condition-statistics](study-b2/condition-statistics.json).

## The unresolved failure is substantial

ADAPT1's coherent snapshot error is .16729 versus FILTER2's .16821; sustained coherent
error is .53331 versus .53437. About 90% of its remaining balanced C comes from these
two conditions. PC16 is better on both (.11960 and .44719), despite worse ordinary
and original-corruption performance. This is a real Pareto tradeoff, not a general
robustness victory.

The mean cell 95th-percentile episode error under original corruption drops from
.8383 to .01657. Under sustained plausible corruption it stays near .905. The worst
ADAPT1 corrupted episode has mean NMSE 1.16744 (root 15349, sustained/irregular,
episode 12). [Worst-case identities](study-b2/worst-cases.json) retain failures for
every model; no examples were excluded to improve the gate.

T10 has exactly identical evidence but different targets. All 40 root/schedule
identity checks and saved example predictions agree. Its equal-prior midpoint loss
lower bound is .28911[.27456,.30265] NMSE. A controller cannot identify the hidden
cause from these observations alone. Additional evidence, an explicit cause prior,
or an informative action is required; maintaining multiple hypotheses does not by
itself create identifying information. This is an analytic limitation demonstrated
by construction, not a classification failure scored against the model.

## Computation and storage

Apple M3 Max CPU, one Torch thread, deterministic algorithms, Python 3.12.13,
Torch 2.14.1, NumPy 2.5.4. Original/PC16 use float32; robust algebra/reductions use
float64. Timing uses identical minimal predict/decode/correct loops, no diagnostics,
three warm-ups and 20 timed repetitions, every 4 sensing. Full mean/p95/max timing,
solve dimensions, nonlinear calls, exposure and fitting/search costs are in
[resources](study-b2/resources.json) and [all development candidates](study-b2/development-candidates.json).

ADAPT1 has 64 fitted tensor scalars versus PC16's1340. Its used parameter buffers
occupy 520 bytes, allocated buffers 920 bytes (including the inherited unused L),
versus 5360 bytes for PC16. State/covariance/history occupy 56 versus 64 bytes. Mean
base fitting CPU is .052 versus 2.860 seconds; all correctors share one FILTER2 fit
per root. Each complete fit sees 9600 episodes and 163200 clean supervisory feature
records, plus identical permitted sensory evidence. No replay or persistent online
learning is added. The unused L fit/storage is disclosed rather than silently erased.

Profiled linear MACs are 149.375/step for ADAPT1 versus 678 for PC16 on this schedule,
excluding solve/eigen and elementwise work. ADAPT1 additionally uses three 2x2 solves
and one 2x2 eigenvalue check per sensed correction; NISEMP uses two 2x2 solves.
The 14-column solve RHS includes padded masked channels. No iterative robust likelihood
loop is used. These counts differ from historical Study B's54-cell MAC proxy.

**Measured latency favors PC16.** Single-episode ADAPT1 is 102.78 μs/step, NISEMP 89.17,
original FILTER2 68.20, PC16 28.73. At batch 20 the respective per-episode step costs are
5.82,5.00,4.02 and 1.96 μs. ADAPT1 is about 3.58x PC16's serial latency, despite cheaper
fitting and fewer weights/MACs. Small-matrix solves, dtype and Torch/Python dispatch
matter. B2 does not establish an inference-speed advantage, nor claim that a future
optimized implementation would necessarily reverse the result.

## Reproduction, resource limits and artifacts

Base commit `bdb3bdcbb47c7a2a24301e044ebaaac6b50a18cd`; branch
`codex/soam-v0.2-attractor-dynamics`. Exact dirty-source snapshots accompany each
phase; confirmation fingerprint
`28d72614c9f2d61b0e48cdd4d2ebc896cff1d37bb7324a2d5c735a29cb69e1cd`.
The receipt includes all dependency hashes, hardware/software, roots, settings and
normalization. Train/development/confirmation have separate B2 outer seed namespaces.
Root 15307 was refitted and repeated exactly: all eight candidates' arrays/headlines/
input hashes match; both base models' fitted tensors and training traces match.
Independent array-only reduction verifies 1040 values to maximum error 1.11e-16.
Historical A/B dependencies and gates remain unchanged.

There are 29 fitted executions: historical audit 1, fixture 2, development 4,
confirmation 20, prescribed repeat 2. No failed scientific fits or exclusions.
The initial storage estimate omitted batch scaling; its corrected 1.429 GB projection
failed the unchanged 1 GiB ceiling. Both receipts remain. Pre-development archive A1
retained every error array and bounded detailed traces, projecting .919 GB. No budget
was extended. [Final resource ledger](study-b2/resource-final.json) charges numerical
fitting, screening, repeats, diagnostics, profiling, rendering and the failed fixture
calibration. Tests, literature/source review and unsuccessful local-worker assistance
are disclosed engineering overhead outside the numerical allocation; their total CPU
was not instrumented. GPU time is zero.

The fixed ceilings are 1800 numerical CPU seconds, 3600 execution-wall seconds,
2 GiB peak RSS and 1 GiB artifacts. Completed use is 352.02 numerical CPU seconds,
352.63 execution-wall seconds, 775,749,632 bytes peak RSS and 480,468,054 artifact
bytes (including compact reports), with zero GPU time. All limits pass.
Detailed local checkpoints, immutable source snapshots, hashes and raw error arrays
are under `runs/study-b2-v1/`; compact reports and figures are under `reports/study-b2/`.
The first final-integrity checker expected a covariance field on PC16, which has
none; it stopped with a KeyError. The corrected read-only checker passed. Both
attempts are charged and preserved in the ledger; no experiment was rerun or altered.
Reporting scripts written after freeze are separately fingerprinted; they do not
change frozen inference source, selection or primary definitions.

Commands: `uv run python -m soam.robust.runner` with phases audit, fixture, screen1,
screen2, hybrid, freeze, confirmation, repeat, report; the recorded storage-calibration
addendum preceded screening. Output directories refuse overwrite. A fresh reproduction
should use a separate checkout/output location and the archived phase-specific source,
not overwrite completed records. Diagnostic/render/resource scripts are in `scripts/`.
The failed original storage calibration requires its archived source to reproduce;
the current script intentionally implements the passing A1 allocation.

## Final verification

`uv run pytest`: 266 passed in 15.65s; robust invariant subset: 28 passed.
`uv run ruff check soam tests scripts`, the ticket validator and `git diff --check`
pass. Broad `ruff check .` reports 16 pre-existing issues in frozen historical
shared-population report scripts; those historical artifacts remain unchanged.
The [integrity audit](study-b2/verification.json) verifies frozen source and historical
dependencies, all 88 confirmation/repeat evaluations, finite saved arrays, positive
filter covariances, exact repeat and independent reduction. An
[artifact SHA-256 index](study-b2/artifact-sha256.json) covers the completed numerical
records. These software checks are separate from the scientific benefit decision.

## Artifact index and scope

- [Protocol](../docs/STUDY_B2_PROTOCOL.md), [manifest](../docs/protocols/study_b2_v1.json), [literature](../docs/STUDY_B2_LITERATURE.md).
- [Failure analysis](STUDY_B2_FILTER_AUDIT.md), [development decisions](STUDY_B2_DEVELOPMENT.md), [decision/C handoff](STUDY_B2_DECISION.md).
- [All tables](study-b2/tables.md), [root values](study-b2/root-results.json), [adjusted statistics](study-b2/statistics.json), [independent verification](study-b2/independent-reduction.json), [repeat](study-b2/reproduction.json).
- [Trajectories](study-b2/trajectories.png), [correction/covariance](study-b2/correction-diagnostics.png), [innovation distributions](study-b2/innovations.png), [channel contributions](study-b2/channel-contributions.png), [Pareto comparison](study-b2/pareto.png). Each has an SVG counterpart.

This measured benefit and the coherent-evidence/runtime limits merit a joint blog and
report discussion; the owner was notified. No blog, remote issue, push or publication
was performed. Study C, D, E and F remain conditional. No attractor, shared-neuron,
compositionality, persistent-acquisition or neuroscientific claim follows from B2.
