# Study A — what adaptive gates add on the E1 task family

2026-11-11. SOAM-064 complete; interpretation in [SOAM-065 / decision record](STUDY_A_DECISION.md).
Frozen scientific outcome: **inconclusive for a practically valuable adaptive-update
advantage across the required endpoints**. This is not evidence of zero gate effect.

Adaptive gates are **not necessary for basic E1 recall/prediction competence**:
the ordinary R32 tanh core works. The GRU parameterization substantially improves
short-horizon accuracy over the tested parameter/MAC-matched ungated controls, but
the isolated adaptive update gate does not pass its preregistered practical-benefit
rule. A learned constant update gate preserves much of the accuracy and improves
mean long-horizon error. Reset adaptation, optimization and the task's low-dimensional
structure all matter; no single explanation accounts for every endpoint.

The smallest tested neural core meeting the declared absolute competence limits is
**R32: 32 hidden units, fixed leak 0.5, 2,412 parameters**. Carry it forward as the
minimal competent starting core for a separately scoped Study B, accepting its
accuracy cost. Applying the protocol's G32 competence limits to select R32 is an
explicit post-study decision judgment, not a preregistered minimal-core test.
This is a decision about the tested inventory, not proof that 32 is
the minimum possible width. Study B has not been implemented or activated.

## Primary comparison and uncertainty

Primary J equally weights step-10 recall NMSE and free-8 NMSE. G32 is compared
with FU38, which retains adaptive reset but learns one input-independent retention
constant per unit. FU38 has 4,876 parameters versus G32's 4,940, 38 versus 32 active
hidden units, and 3,724 versus 3,936 advance/readout linear MACs. Parameter and MAC
ratios are 1.013 and 1.057; measured fitting CPU ratio is 1.134. Same-width FU32,
parameter-matched R52 and MAC-matched R55 answer separate resource questions.
There is no exact simultaneous parameter/state/compute match.

Across ten independent paired roots, G32's mean per-root relative J improvement
over FU38 is **9.9172%**, with the 15-contrast-adjusted interval **[0.6950%, 19.5834%]**.
The ordinary 95% interval is [3.7665%, 16.3209%]. The adjusted lower bound is positive,
but the point estimate misses the frozen **10%** practical minimum. Rounding 9.92%
to 10% would incorrectly change the decision. The interval width passes its limit.

G32-minus-FU38 free-32 NMSE is **+0.006117**, adjusted interval approximately
**[-0.000024, +0.011991]**; its upper bound exceeds the **+0.01** non-regression
margin. The ordinary 95% interval is [+0.002004, +0.010146]. Thus the required
long-horizon protection is unresolved. The other primary-control guardrails,
absolute competence, finite numerics, resources and development-convergence screen
pass. The frozen classifier returns **inconclusive**, not supported, equivalent,
negative, or formally mixed. Endpoint means show a short/long-horizon tradeoff;
that descriptive observation is distinct from the classifier's stronger mixed rule.

Against R52 and R55, G32's relative J gains are respectively **50.84%**
(adjusted interval [45.85%,55.66%]) and **48.63%** ([36.55%,58.63%]); their registered
endpoint guardrails pass. This rules out parameter count alone as a sufficient
explanation within this comparison. It does **not** isolate all optimization effects:
G32 takes approximately twice the fitting CPU of these ungated controls despite
similar linear-MAC counts and equal training records/updates. An equal-total-CPU
ungated retraining sweep was not run and cannot be claimed defeated.

![Primary mechanism contrasts and endpoint tradeoff](study-a/mechanism-comparison.png)

## Complete comparison

All values are mean NMSE; all 12 models, ordinary intervals, adjusted contrasts,
root results and diagnostic intervals are in the [comparison tables](study-a/tables.md),
[root table](study-a/root-results.md), [root JSON](study-a/root-results.json) and
[full statistics](study-a/statistics.json). No candidate or failed endpoint is omitted.

| Model | Fitted scalars | J | Recall-10 | Free-8 | Free-32 | Grounded-32 | Free-128 diagnostic |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| G32: full GRU | 4,940 | 0.00380 | 0.00316 | 0.00444 | 0.01576 | 0.00102 | 0.08467 |
| FU32: learned constant update | 3,724 | 0.00474 | 0.00420 | 0.00527 | 0.01234 | 0.00126 | 0.06782 |
| FU38: parameter-near constant update | 4,876 | 0.00427 | 0.00365 | 0.00490 | 0.00964 | 0.00109 | 0.04805 |
| FR32: learned constant reset | 3,724 | 0.00463 | 0.00392 | 0.00534 | 0.03160 | 0.00110 | 0.17699 |
| FB32: both learned constants | 2,508 | 0.00750 | 0.00668 | 0.00832 | 0.01667 | 0.00229 | 0.07531 |
| S32: historical recurrence, retrained | 3,868 | 0.00872 | 0.00881 | 0.00864 | 0.01322 | 0.00422 | 0.08680 |
| GS32: adaptively gated S32 | 5,084 | 0.00462 | 0.00388 | 0.00537 | 0.01772 | 0.00141 | 0.20467 |
| R32: fixed-leak tanh | 2,412 | 0.00840 | 0.00759 | 0.00921 | 0.01864 | 0.00254 | 0.06902 |
| R52: parameter-matched tanh | 4,952 | 0.00789 | 0.00674 | 0.00905 | 0.01426 | 0.00227 | 0.04800 |
| R55: MAC-matched tanh | 5,402 | 0.00737 | 0.00688 | 0.00786 | 0.01481 | 0.00207 | 0.07453 |
| L12: observed-feature bilinear ridge | 924 | 0.08096 | 0.07891 | 0.08302 | 0.05531 | 0.32291 | 0.01848 |
| L2: learned two-state bilinear ridge | 110 | 0.08096 | 0.07891 | 0.08302 | 0.05531 | 0.32273 | 0.01848 |

Two supplied role flags are additional to every active hidden-state count. L2's
PCA decoder and mean are included. The fixed 12×2 sensory projection costs another
24 supplied float32 values shared by every model. No external associative store,
replay bank, online writer or learned sensory projection is introduced.

FR32 is algebraically a gated leaky tanh RNN after its constant reset and redundant
biases are folded into the core. This supplies the requested GL control without a
redundant independent fit. The folded implementation has 3,628 parameters; its
maximum output discrepancy over all confirmation recall/free-32 paths is
2.54e-7, from float32 operation ordering. It is not a second independent replicate.
Its long-horizon weakness remains the FR32 result, regardless of its name.

## Mechanistic findings

**A-H1 — adaptive retention.** Same-width removal increases mean J from 0.00380
to 0.00474; the descriptive paired difference G32−FU32 is -0.000938, 95% interval
[-0.001179,-0.000718]. Increasing the constant-update control to approximately
matched capacity narrows the gain to the inconclusive practical comparison above.
FU38 has lower mean free-32 and free-128 error. The supplied alternating-role
stress test also favors FU38 in mean (0.08338 versus G32 0.14739). These are
separate observations, not evidence that an adaptive update gate is necessary to
alternate maintenance and motion. The switching schedule is OOD and diagnostic.

**A-H2 — adaptive reset.** FR32 retains good reconstruction and short prediction,
but its free-32 error rises to 0.03160 and free-128 to 0.17699. G32−FR32 free-32
is -0.01585, descriptive 95% interval [-0.02294,-0.00943]. FU32 and FR32 have the
same 3,724 parameters and 32-unit state but markedly different horizon behavior:
retaining reset adaptation is more favorable for long rollout in this tested pair.
These results support a regime-specific reset contribution. They do not prove
reset necessity or cleanly exclude every parameterization/optimizer alternative.

**A-H3 — optimization/capacity.** Calibration found severe undertraining of the
ungated alternatives at 800 updates. The versioned revision doubled all candidates'
training exposure and added the same fixed decay. Within selected v2 development
fits, S32 J fell from 0.09010 at update 400 to 0.00930 at 1600; R52 from 0.10412
to 0.00882; G32 from 0.01280 to 0.00411. Optimization and extra observed training
exposure clearly affect rankings and absolute errors. This does not isolate extra
data from extra optimization, or establish optimal training. The final R52/R55
controls still do not recover the GRU's joint accuracy despite comparable parameter
or inference-MAC counts. Actual training CPU remains unmatched as disclosed above.

**A-H4 — low-dimensional task.** The 110-parameter, two-state L2 reproduces L12's
recall/free-8/free-32 errors to numerical precision, using a PCA basis fitted only
from clean training observations. G32's diagnostic linear latent-coordinate R² is
0.99412; the tested nonlinear random-feature probe is slightly worse at 0.99325.
Ordinary R32 is also nearly linearly decodable (R²=0.99024). This supports the
low-dimensional system-identification account; it does not demonstrate demanding
associative memory. L2 does not reproduce the neural models' cue reconstruction or
grounded accuracy. Its linear cue initializer and repeated-correction mismatch are
important limitations; no tiny nonlinear neural bottleneck was tested.

**Gated S32.** Adding the adaptive leak approximately halves J (0.00872→0.00462),
with a descriptive paired difference of -0.00410, 95% interval
[-0.00473,-0.00355]. It adds 31% more parameters and increases recurrence operations.
Free-128 error worsens from 0.08680 to 0.20467. This is a short-horizon improvement
with extra capacity and poor extrapolation, not a reason to retain the constrained
symmetric/skew mechanism or to revise the historical failed sharing gate.

## Gate behavior and interventions

The [update heatmaps](study-a/gate-trajectories.png) and
[reset heatmaps](study-a/reset-trajectories.png) show the preselected root 9301,
episode 0. All roots/units/timesteps are retained in raw diagnostics, with aggregate
intervals in the statistics file. G32 mean update rate is 0.36595 during recall and
0.37933 during movement; mean reset is 0.35982 versus 0.40805. Across-unit standard
deviation of mean update rates is 0.11934 in recall. There is heterogeneous state
retention, but only a small difference in population mean update rate between roles.

Holding hidden state fixed, zeroing action changes G32 update/reset values by
0.02203/0.05538 on average; toggling role changes them by 0.03831/0.03333.
Contradictory sensory cues change update rates by 0.08046 during motion. The mean
per-unit correlation between update rate and absolute state change is 0.33862;
its interpretation is limited because alpha mechanically multiplies the state
increment. Mean update-rate correlation with action magnitude is only 0.01567.
Neither these correlations nor gate heterogeneity establish semantic slow/fast
assemblies. [Gate-only timescale summaries](study-a/gate-timescale-description.json)
explicitly omit candidate feedback and are not measured memory time constants.

Clamping trained G32 update rates to 0.5 gives diagnostic free-8 NMSE 0.10351;
forcing reset to one gives 2.17669. Such disruptive post-training interventions
are OOD and do not show that independently retrained constant-gate models cannot
work. The development-mean gate override additionally transfers unit-index averages
across independent fits; units have no guaranteed cross-fit alignment. The
separately trained ablations carry the stronger evidential weight. Direct role
counterfactuals are diagnostic overrides, not valid contradictory evidence cues.

## State geometry, recovery and extrapolation

During movement, G32 hidden-state effective rank is about 4.59, with hidden/physical-distance
correlation 0.727. A recall-trained linear probe transfers to movement at R²=0.9744;
a movement-trained probe transfers to recall at 0.9945. This is useful reused
coordinate information, not evidence for reusable concepts or compositionality.
Probe labels and outputs never enter the recurrent learner. See
[state geometry](study-a/state-geometry.png) and
[decoded trajectories](study-a/decoded-trajectories.png).

After a hidden perturbation of RMS 0.15, G32's recall hidden gap contracts to 0.252
of its injected size, but endpoint output NMSE is 0.05223. Only 44.5% of episodes
combine halving with output NMSE≤0.03 (95% interval [39%,48.5%]); FU38 reaches
62% ([49.5%,72.5%]). Contraction is not reliable useful recovery. No global or
neuroscientific attractor claim follows. The [perturbation plot](study-a/perturbation-recovery.png)
shows both roles; the tables retain accuracy alongside state-distance measures.

At 128 steps, L2/L12 again beat the neural candidates (0.01848 versus G32 0.08467),
while full GRU wins their free-32 comparison after stronger training. G32's late
output variance is about 2.98× the target variance, GS32's 10.37×; this does not
support universal collapse to one generic state. Phase/radial drift and excessive
motion also occur. The contracting simulator makes long-horizon averaging easier
for a faithful low-order model as initial cue errors decay. These results do not
establish general long-horizon memory. [Horizon diagnostics](study-a/long-horizon.png)
use the preselected root; aggregate root intervals are in the tables.

## Why historical L12 beat the historical GRUs at free-32

This question was checked directly against **600 original E1 transition cells**,
not inferred solely from the new fits. All recomputed free-32 metrics match the
archived records. The descriptive [reanalysis](study-a/historical-drift.json) uses
exposed historical data and does not change E1's frozen inference or gate.

| Original model | First 8 NMSE | Last 8 NMSE | Angular contribution, all 32 | Radial contribution, all 32 | Mean absolute phase error, early→late |
| --- | ---: | ---: | ---: | ---: | ---: |
| G28 | 0.04644 | 0.22195 | 0.09128 | 0.03726 | 0.134→0.493 rad |
| G32 | 0.03769 | 0.17771 | 0.07344 | 0.03048 | 0.117→0.529 rad |
| L12 | 0.08643 | 0.03359 | 0.02596 | 0.03122 | 0.186→0.200 rad |

Angular error accounts for about 70% of both GRUs' total free-32 error. Out-of-plane
feature error is small (G32 0.00159 NMSE) and decreases late; it is not the main
failure. L12 starts with worse cue reconstruction but largely maintains phase,
while its absolute error shrinks with the contracting dynamics. This supports
accumulated phase drift, with radial distortion, as the direct explanation of the
historical horizon reversal. A learned bilinear dynamics prior fits this task's
structure well. It is not proof that GRUs inherently cannot extrapolate: stronger
training reverses the free-32 ranking in Study A, though L12/L2 win again at 128.

![Original E1 horizon-error decomposition](study-a/historical-drift.png)

## Execution, resources and provenance

Contracts: [v1](../docs/STUDY_A_PROTOCOL.md), [v2](../docs/STUDY_A_PROTOCOL_V2.md),
[v2 manifest](../docs/protocols/study_a_v2.json),
[confirmation receipt](study-a/confirmation-receipt.json),
[preconfirmation review](study-a/preconfirmation-review.json), and
[engineering history](STUDY_A_IMPLEMENTATION.md).

There were **252 fitted executions**: 24 calibration fits across two versions,
96 development fits, 120 fresh confirmation fits and 12 prescribed reproduction
fits. All fits completed without numerical failure, exclusion or replacement.
V1 stopped after development; no v1 confirmation data were generated. One v2
receipt-serialization attempt failed before confirmation and was preserved and
charged. Its exact source repair did not change model/data/training/statistical
code. There was no confirmation-driven retuning, seed extension or threshold change.

V2 development roots: 8419,8423. Confirmation: 9301,9311,9319,9323,9337,9341,9343,
9349,9371,9377. Namespace `soam-study-a`, version 2; independent train/development/
confirmation/probe/diagnostic components, even/odd state-sector and action-bin
split as in E1. Each root uses 20 paired episodes per main role. Each full fit sees
25,600 recall examples and 24,000 transition episodes (216,000 clean transition
records); the same archives are reused across models/configurations. Free and
grounded losses do not count as distinct observations. Reproduction adds no new
independent root or training data. PCA and ridge moment computation are offline
fitting and counted; diagnostic coordinate probes are separate and counted in the
[audit's storage records](study-a/audit.json).

CPU only, one Torch thread, deterministic algorithms; float32 models, float64
simulator/metric reductions. Python 3.12.13, Torch 2.14.1, NumPy 2.5.4, macOS ARM64.
V2 development commit `7ed78f9`; confirmation orchestration commit
`44824b7884965bb4ad49166143427bdd43e87452` with source aggregate
`6e05f7437dc1f37527da85cf0c4231fd0dcba082ec5747f8b4f141e534c43959`.
Tracked ticket-status edits and pre-existing untracked user documents were disclosed
in provenance; numerical source was committed and fingerprinted. Source snapshots
for both versions and the exact orchestration amendment are retained.

Numerical work used approximately **17.8 CPU minutes**, with **1.20 GiB peak RSS**
and approximately **1.42 GiB archived outputs**, inside the approved 60 CPU-minute,
120 wall-minute, 2 GiB RAM/artifact ceiling. The exact final accounting is in
[resource-final.json](study-a/resource-final.json), including failed attempts,
historical reanalysis, reproduction, plotting and audit. Engineering tests and
language-model assistance are disclosed separately. No GPU/cloud training occurred.

The prescribed root-9301 repeat is **exact** for checkpoints, optimizer state,
training traces, inputs, predictions, diagnostic arrays and metric hashes;
[receipt](study-a/reproduction.json). The independent NumPy audit recomputed all
600 headline model/root metrics with maximum discrepancy 1.11e-16 and verified
source snapshots, paired inputs and stored tensor hashes. All historical E1 source
hashes still match. Final test suite: **215 passed in 24.83s**; ticket validation,
Ruff and local-link checks are recorded in the [completion verification artifact](study-a/verification.json).
Raw checkpoints, optimizer states, paired data and complete trajectories remain in
`runs/study-a-v1` and `runs/study-a-v2`; compact report files do not replace them.
The [execution index](study-a/execution-index.json) captures status-file modification
times for all 252 completed fits. Separate absolute start/end timestamps were not
recorded; these artifact times must not be represented as reconstructed start times.
The [phase ledger](study-a/execution-ledger.json) retains CPU/wall durations and the
[file checksums](study-a/artifact-sha256.json) identify the compact evidence package.

## Limits and decision implications

The primary practical benefit is inconclusive despite a positive average update-gate
effect. Ten roots and two development roots limit precision and tuning coverage;
passing the late-slope screen is not proof of optimizer optimality. Equal training
updates/exposure do not mean equal CPU cost. The reset and S32 comparisons lack
separate capacity matching for every ablation. Diagnostic intervals are descriptive,
not additional multiplicity-controlled confirmation claims. Post-training clamps
are OOD; the nonlinear probe is one fixed random-feature design, not a universal
nonlinear-decoding benchmark. Only one simple task family and supplied role cues
were tested; no latent labels fed the core, and no biological, compositional,
shared-neuron, online-learning or autonomous-policy claim is established.

The [decision record](STUDY_A_DECISION.md) retains R32 as the smallest tested
competent starting core, with explicit accuracy tradeoffs and the stronger GRU/
constant-update/low-order models preserved as references. Historical SOAM-052
remains **stop**; better S32 training here does not retroactively pass E1 or a new
sharing gate. Acquisition remains deferred, and no Study B work starts from this
report. The joint finding—gating improves some errors while simpler dynamics retain
long-horizon structure—is suitable for an owner-reviewed blog/report, not an
unqualified claim that gates are either necessary or useless.
