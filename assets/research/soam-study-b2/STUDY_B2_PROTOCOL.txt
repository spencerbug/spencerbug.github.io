# Study B2 v1: robust Kalman correction

2026-11-11. Owner-selected additional study, SOAM-074–077, between completed B
and conditional C. This protocol is the lightweight RFC owned by SOAM-074.
Historical A/B protocols, source, artifacts and decisions are immutable. B2 does
not activate C, acquisition, topology, or another research branch.

## Question and contract

Can a compact fitted two-state estimator retain ordinary prediction accuracy while
limiting corrupted evidence without rejecting genuine change? B2-Q1–Q6 in the
hypothesis ledger distinguish innovation reliability, soft/hard rejection,
measurement calibration, temporal evidence, learned reliability, and cost.
A two-dimensional representation, bilinear transition features, initial covariance
and clean offline training targets are supplied structure, not discovered physics.

Audit the actual FILTER2 first. Its P, mean, B, process covariance and initialization
remain fixed within each fitted root. Preserve original float32/information-inverse
FILTER2 and compare a solve/Joseph implementation explicitly. No learned mapping,
process fitting procedure, or training distribution is altered to favor robustness.
Prediction consumes only previous posterior, supplied action and task role. Decode
and record its prior BEFORE current observation access. Correction consumes only
prior mean/covariance, masked current features and transient past statistics.
No evaluator event labels, noise magnitudes, simulator inverse, future values, or
clean targets enter correction. All persistent tensors are immutable in evaluation.
A missing/rejected cue leaves both mean and covariance unchanged. Downweighted
correction uses the same effective measurement covariance for gain and Joseph
covariance update; data-dependent uncertainty remains approximate, to be calibrated.

## Finite staged search

Phase 0: reproduce historical root 12007 FILTER2 numerical outputs; audit masks,
PSD/symmetry, propagation, no writes, inverse versus solve/Joseph equivalence.
Phase 1: original and numerical-control FILTER2; one-factor R scales 10/100,
Q scales 0.1/10, gain scales 0.25/0.5; whole-vector NIS chi-square 99% and
pre-gating development 99% thresholds; raw-norm and covariance-normalized soft
Huber weighting, channel Huber thresholds 2/4; freshly fitted PC16. No extra
setting is added after results. R/Q/gain are separate controls, not a Cartesian grid.
Empirical NIS thresholds use all nominal development innovations, including rejected
ones and the ordinary high-noise condition, grouped by valid-channel count.

Phase 2: choose at most two distinct extensions after a written Phase 1 diagnosis:
(1) a single heavy-tail likelihood (Student-t or Gaussian mixture), OR bounded
measurement covariance adaptation if heteroscedastic/subspace residuals explain
failure; (2) a small temporal consistency rule if rejection delays change. Each gets
at most two settings. Learned reliability is deferred unless the statistical screen
reveals an identifiable limitation it could address; replacing an extension requires
a recorded decision BEFORE implementation, and no more than two are evaluated.
Phase 3: at most one hybrid, with one setting, only if constituents address distinct
failures; retain both constituents. No general filter framework or hypothesis manager.

All architecture choices use two development roots, paired batch 12/horizon 64.
At most three challengers enter primary confirmation. Baselines and necessary
constituents remain even when not primary. Select by lowest balanced corruption C
among J<=0.05 and genuine-change<=0.07 candidates; if none qualify retain the
Pareto tradeoff and declare it. Max three, prefer distinct mechanisms and lower cost.
Frozen receipt names the exact challengers, configurations and contrasts before any
confirmation generation. No change or extra candidate after that receipt.

## Data and controlled benchmark

Reuse Study B's generator with a new outer B2 seed namespace, independent train,
development, confirmation and normalization derivations. Same fixed projection 1729,
six-channel masks, supplied roles, actions, intermittent schedules, held-out sectors
and action checkerboard. Independent fits per root use exactly 1200 batches of eight,
horizon 16, the historical nine-condition/six-schedule cycle. FILTER2 ridge=0.0001;
PC16 Adam=0.01, 1200 updates with original decay, no early stopping. These settings
are inherited from completed B development; all new correction settings use B2 dev.
PC16 receives the same clean supervisory targets and permitted observations as FILTER2.
Extensions are evaluated on new stress conditions without adding training exposure.

Ordinary J is exactly Study B's 12-cell equally weighted pre-correction metric.
Historical corrupt/change metrics retain five sensed schedules and all 64 steps.
All original conditions/schedules remain. Extended stress uses every2/4/8/irregular:
T1 one SD0.5 outlier at first scheduled observation at/after24;
T2 two visible channels SD0.5 at times24–31;
T3 one coherent plausible displaced snapshot (a true-change alternative trajectory);
T4 that coherent alternative for times24–39;
T5 original genuine state sign reversal at24;
T6 unannounced dynamics change at24 (rotation multiplier2, translation multiplier2,
contraction0.995) thereafter, with original actions supplied;
T7 original gap17–48;
T8 independent Student-t3 noise scale0.05 after initialization;
T9 correlated common-mode SD0.10 plus fixed per-episode channel bias SD0.10 at24–47;
T10 exact paired evidence: true-change observations for both worlds, but target is
changed world versus unchanged world. Evidence equality is tested; this pair is an
identifiability diagnostic excluded from success scoring. At least one world must
incur squared error; report the midpoint lower bound and equal estimator outputs.

Primary C equally averages original corrupt and T1/T2/T3/T4/T8/T9 condition means
(all64 pre-correction steps; original five schedules, extensions four). Report each
component to prevent easy isolated faults concealing coherent/persistent failures.
No root/episode exclusions or automatic retries. Finite failures invalidate affected
comparisons rather than count as scientific falsification.

## Frozen inference and decisions

Ten independently fitted confirmation roots, 20 paired episodes/cell, horizon64.
Root means are statistical units. 20,000 paired-root bootstrap samples, seed15203.
Descriptive 95% intervals for all primary/secondary metrics. For each of at most
three declared challengers, simultaneous Bonferroni percentile intervals for six
contrasts: relative C gain; J difference; genuine-change difference; clean difference;
gap difference; free32 difference. Family size is 6 times declared challenger count.
Success requires mean C gain>=30%, adjusted lower bound>0 and width<=0.40;
mean J<=0.05; mean historical corruption<=0.15; mean change<=0.07; and adjusted
upper differences<=0.01 on all five guards. These proposed engineering targets are
adopted BEFORE screening; no retrospective loosening. Report PC16 contrasts as
secondary, not a primary family. No candidate is declared a universal solution.

A/B/C/D/F outcome labels describe supported mechanisms/calibration, while E describes
unresolved tradeoffs. Validity precedes benefit. An adjusted gain upper bound<30%
with width<=0.40 is precise negative practical evidence; a failing guard is tradeoff;
wide intervals or insufficient competence are inconclusive. A hybrid needs >=10%
mean C advantage over each constituent with positive ordinary paired interval and
no >0.01 ordinary/change regression; otherwise prefer the simpler constituent.

Secondary: posterior error/contamination, clean rejection/downweight, corrupted
influence relative to paired clean correction, recovery (three consecutive errors
below max(0.01, twice mean PRE-event8)), censoring, dynamics adaptation, free8/32,
episode95th/max and example index, pre-gate versus accepted NIS, channel contributions,
prior/posterior covariance and feature/state coverage, nonfinite/divergence counts.
State coverage is in the fitted sensory basis, not oracle physical coordinates.
Uncertainty for guardrails is mandatory; correlated timesteps are never replicates.
No calibration is estimated only from accepted innovations.

## Allocation, provenance and stopping

Separate B2 allocation: 1800 cumulative numerical CPU seconds; 3600 summed execution
wall seconds; 2 GiB peak RSS; 1 GiB artifacts. Reserve10% for verification/reduction.
One CPU thread, deterministic Torch, float32 historical/neural, float64 robust
linear algebra and reductions. GPU time=0. At most 32 base fits including fixture,
audit/repeat; two base models/root shared by all correctors, no hidden refitting.
Fixture projects full work with1.5x time/storage and1.25x RSS before development.
Stop on ceiling without extending it. Failed attempts charged and preserved.
Tests, source review/literature, and local worker are engineering overhead outside
this numerical ceiling, disclosed separately. Selected extensions share the ceiling.

Save source commit plus exact dirty source snapshot/hashes, numerical config,
software/hardware/BLAS/thread versions, seed derivations, exposure and array hashes,
checkpoints, per-root/cell results, and immutable freeze receipt. Refuse overwriting
completed phase directories. Prescribed full repeat of first confirmation root
checks inputs, fitted tensors and predictions, excluding timings. Independently
recompute key endpoint reductions from saved error arrays. Keep audit/screening and
confirmation separate. Measured inference microbenchmarks use identical hardware,
single-episode and batch20, diagnostic collection disabled, warm-up then20 repeats;
report mean/p95/max. Count matrices, solves/dimensions, nonlinear/iterations, state,
history, offline fit/search, allocated versus used bytes; MACs alone are not cost.

Deliver local scientific report, failure analysis, architecture/search tables,
trajectory/innovation/weight/covariance/error plots and accuracy/robustness/cost
Pareto plot, decision and C baseline handoff. No remote publication or C implementation.

## Engineering archive addendum A1 — 2026-11-12, before development

The initial storage projection omitted batch-size scaling. Corrected full-detail
projection was1.429GB, failing the unchanged1GiB ceiling. Preserve both receipts.
A1 archives all per-episode errors and calibration scalar arrays, with detailed
feature/channel traces only for every4 and the first4 episodes of first confirmation
root. Diagnostic examples are preselected, not cherry-picked by error. At most8
confirmation models including constituents:32 Phase1 evaluations+8extensions+2hybrid
+80confirmation+8repeat=130; reserve10 equivalent evaluations for archive projection.
This changes no model, observations, endpoint, threshold or scientific contrast.
Require passing measured compressed-storage projection before development.

## Phase2 registered mechanism details — 2026-11-12

[Development routing](../reports/STUDY_B2_DEVELOPMENT.md) selects ADAPT1/ADAPT05
and TEMP2/TEMP3 before their implementation/evaluation. It specifies their exact
formulas and two-setting limits. These are permitted pre-confirmation architecture
choices under Phase2, not changes to frozen endpoints or targets. Heavy-tail and
learned-gate extensions are deferred; this is not negative evidence against them.

## Confirmation selection and secondary audit — 2026-11-12, before freeze

Final inventory and exclusions are recorded in the development routing report.
ADAPT1 and NISEMP are the only primary challengers (12-contrast family). Eight total
models; no temporal/hybrid confirmation after their development guard failures.
Recovery onset for isolated/coherent and other sensor events is the actual first
corrupted observation on the supplied schedule. Report both onset-relative and
fault-end-relative delays, always using the eight PRE-onset errors as the baseline;
no exposed event is explicitly labeled. Detailed first-root/every4 traces also save
full prior/posterior state/covariance for the same first4 episodes. These small
secondary archive additions fit within A1's30MiB reserve and change no primary gate.
