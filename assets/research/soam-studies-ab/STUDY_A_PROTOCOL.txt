# Study A v1: adaptive gating on the E1 task family

2026-11-11. Owner: SOAM-062; implementation SOAM-063; experiment SOAM-064;
interpretation SOAM-065. This is also the lightweight RFC and fresh routing record.
The [owner request](requests/study_a_2026_11_11.md) explicitly selects this diagnostic
before acquisition. It supersedes the *current selection* of SOAM-059, not that
completed decision or any E1 evidence. SOAM-039 returns to backlog pending fresh
routing. Study B, acquisition, concurrency and applications are not implemented.
Classification: essential next. H1–H4 in the request are **A-H1–A-H4**, mechanism
subquestions of historical H1, not replacements for the project's H1–H8 IDs.

## Question, alternatives, and equations

Does an adaptive retention gate add practical value after fair retraining, versus
learned constant retention, conventional recurrent capacity, and a learned compact
dynamical model? Separate update gating, reset gating, optimization and task rank.
All models receive the same 12 fixed projected sensory features, six-feature mask,
noise SD 0.01, three actions and two supplied role flags. Initial correction is
learned from u=[masked features, valid mask]; later correction gain is 0.5.
No model sees latent simulator coordinates or the sensory projection inverse.
Initial sensory projection seed 1729 is unchanged. Initial h=tanh(Eu+e), readout
Dh+d for neural models; affine correction and identity/learned PCA readout for
ridge baselines. Every free rollout gets only its initial cue and actions/roles.
Grounded predictions are scored before assimilating the next observed feature.

Let x=[a,q]. Full GRU follows the existing PyTorch/E1 convention:

```
r = sigmoid(W_rx + b_ir + U_rh + b_hr)
z = sigmoid(W_zx + b_iz + U_zh + b_hz)      # retention, not update rate
c = tanh(W_nx + b_in + r * (U_nh + b_hn))
h_next = z*h + (1-z)*c                    # update rate alpha=1-z
```

FU replaces z by sigmoid(theta_z), one trained constant per unit. FR similarly
replaces r by sigmoid(theta_r). FB replaces both. Removed dynamic-gate matrices
are absent, not counted as trainable padding. Constants initialize to zero logits.
A *frozen* gate is an explicit post-training override (0, 0.5, 1 or development
mean); it is distinct from retrained learned constants and dynamic gates.

R(n): c=tanh(Wh+Va+Tq+b); h_next=0.5*h+0.5*c. GL(n) replaces 0.5 by a
state/action/role-dependent sigmoid update rate. FR is exactly reparameterizable
as GL: absorb its learned constant reset into U_n and b_hn and merge biases,
negate its retention-gate logits. Implement/test this folding and report the
smaller folded parameter count. Omit a redundant independent GL fit; retain FR
as its trained representative. This algebraic omission precedes any new outcomes.

S32 is the unchanged E1 packed symmetric-plus-four-skew recurrence, fixed leak
0.5 and supplied transition role multiplying the skew drive. GS32 replaces only
that leak by sigmoid(Wh+V[a,q]+b). Initialize its gate to 0.5, so the initial
step agrees exactly with S32. No symmetry/energy guarantee is added.

L12 is the original observed-data ridge bilinear model. L2 fits a two-dimensional
PCA subspace from clean **training observations**, then fits the same masked-cue
map and bilinear transition in that subspace. Its decoder/mean and sufficient
statistics are counted. PCA dimension two is a supplied low-rank prior, not
latent supervision. Recall holds state, a supplied task scaffold in both models.
Neither baseline uses a simulator formula or inverse during fitting/prediction.

Fitted inventory: G32, FU32, FU38, FR32, FB32, S32, GS32, R32, R52, R55, L12, L2.
Historical G28/G32/S32/L12 results remain historical, not new holdout observations.
G32–FU32 isolates update adaptivity at equal state width with unequal capacity;
G32–FU38 is primary at approximately matched parameters and operations;
G32–R52 matches parameters; G32–R55 matches advance-plus-readout linear MACs.
No exact simultaneous parameter/state/operation parity is claimed. Count biases,
readouts, constants, role flags, initialization, fitting and diagnostics separately.

## Data and bounded development

New namespace `soam-study-a`, version 1, with distinct train/development/confirmation,
fixture, probe_train and diagnostic keys. Use E1's radius [0.4,0.8], even training
and odd evaluation angular sectors and action-bin checkerboard. Dynamics remain
x_next=0.98 R(0.30*a0)x+0.03*[a1,a2]; recall holds x. Vectorized generation has
independently derived component seeds; record all input hashes and archive paired
batches. Train/dev/test observations and roots are separate. Data are identical
across variants/configurations for a root. Different models use the same root-derived
initialization seed; overlapping affine blocks match where meaningful, not every
parameter of different shapes.

Development roots 8401, 8409; confirmation roots 9101, 9109, 9127, 9133, 9151,
9161, 9173, 9181, 9199, 9203. Two configurations per candidate: Adam learning rates
0.003/0.01; ridge penalties 0.0001/0.01. Adam betas 0.9/0.999, eps 1e-8, no weight
decay, gradient clipping 1.0. Batch 16, 100 recall-only then 700 joint updates.
Loss=mean recall steps 1–10 + free steps 1–8 + 0.3 grounded steps 1–8.
No early stopping or best-checkpoint selection. Save development metrics at
updates 100,400,600,800, losses and gradients. Select each candidate's setting
by mean J=(recall_10+free_8)/2 at update 800 across two development roots;
ID/config order breaks ties. All candidates receive equal records and tuning
opportunities; ridge solves use the same archives without fictitious gradient steps.
L2 PCA uses training records only and receives no additional observations.

Check convergence using 600→800 development J improvement, loss/gradient curves
and configuration sensitivity. A primary comparator still improving >20% in mean
is labeled optimization-unresolved; do not claim gating attribution. No extra
unregistered training. Development also calibrates thresholds/noise scale and the
full inventory resource projection before confirmation. Freeze a separate immutable
confirmation receipt with selected configs, source/protocol/manifest/data hashes,
numerical thresholds, development rationale and budget remainder before generating
any confirmation data. No confirmation outcome may change variants or allocation.

## Endpoints and frozen decision rule

20 paired evaluation episodes per root/role, averaged within root. Shared NMSE
variance from 2,048 fresh training-distribution initial observations, normalization
root 8801; float64 reduction, floor 1e-6. Recall is the step-10 endpoint; free-8
and free-32 are prefixes of the same free trajectory; grounded-32 is 32 one-step
predictions. Free-128 is a diagnostic extension. J equally weights recall/free-8,
so improving only one task cannot conceal a failed guardrail.

Primary contrast: per-root gain (J_FU38-J_G32)/max(J_FU38,1e-6).
Report same-width FU32, reset FR32, FB32, S/GS and all controls regardless of result.
To support practical *update* gating, require primary gain mean >=10%, lower
confidence bound >0, interval width <=0.40, and corresponding advantage over both
R52 and R55. The three gain contrasts plus four guards per comparator form a
15-contrast family, Bonferroni two-sided percentile intervals, 20,000 bootstrap
resamples of ten paired roots, fixed inference seed 8675311. Ordinary 95% root
intervals are also reported; secondary diagnostic intervals are descriptive.

For each of FU38/R52/R55, G32-minus-control upper bounds must be <=0.005 for
recall, free-8, grounded-32, and <=0.01 for free-32. G32 absolute mean recall
must be <=0.03, free-8 <=0.10; all inference finite. Parameter and linear-MAC
ratio against primary control <=1.10; measured training CPU ratio <=1.5.
Primary-control development J must be <0.15 and >1e-6. Model convergence and
resource mismatches qualify attribution rather than masquerading as falsification.
Margins are predeclared engineering proposals; development must justify keeping
or versioning them before confirmation. No threshold changes afterward.

Priority: invalid/incomplete execution first; unresolved competence/optimization
or precision gives inconclusive attribution. Otherwise supported requires all
criteria above. Mixed: a confident task/horizon improvement coexists with a
confident guardrail breach. Negative practical advantage: primary or fairly tuned
capacity control has gain upper bound <0.10 with width <=0.40; this excludes the
declared meaningful gain, not universal gate necessity. Remaining cases inconclusive.
Report endpoint-specific evidence even when attribution is inconclusive.
No finite comparison proves that all ungated dynamics cannot implement a function.

## Diagnostics (never tune on these)

For each confirmation model/root, save hidden trajectories, candidate states,
retention/update and reset gates by time/unit/role/action magnitude. Evaluate
maintenance, movement, corrupted/contradictory sensory cues (negated initial cue),
and direct role/action interventions at identical h and observation. Contradictory
role flags remain invalid for the historical interface; direct role toggles here
are labeled OOD diagnostic interventions, not evidence-bearing assimilation.
Save per-unit update-rate/state-change correlations and between-unit timescales.
Post-training gate clamps use 0.5 and development-derived mean gates, plus reset=1;
compare with separately retrained ablations without treating the clamp as necessity.

Diagnostic-only latent decoders: ridge linear and fixed-random-tanh-feature nonlinear
probes fitted on independent probe_train episodes, tested on diagnostic episodes.
Coordinates never enter core fitting or inference. Report held-out R², pairwise
position/hidden distance correlation, effective rank, recall-to-transition probe
transfer, action-induced motion alignment, and late output variance/collapse.
Inject fixed-RMS 0.15 hidden perturbations; compare same-forcing distance ratios
and output accuracy/excess error over time, for recall and movement. No unqualified
attractor claim follows from contraction. Long-horizon decoded feature trajectories
use the inverse projection only in the evaluator: radial error, angular/phase error,
bias, motion energy and finite/norm behavior distinguish drift and collapse.
Use same initial sensory cues for L12/L2/GRU long-horizon comparisons.
A supplied eight-step alternating recall/movement role schedule is an OOD diagnostic,
with no state reset, to probe A-H1's switching claim without relabeling E1 episodes.

## Resource ceiling, artifacts, and reproducibility

Owner-approved ceiling: local CPU only, one Torch thread, 3,600 cumulative CPU
seconds, 7,200 execution wall seconds, 2 GiB peak RSS, 2 GiB cumulative artifacts.
Count scientific calibration, failed attempts, development, confirmation,
reproduction, diagnostics and reporting. Local language-model work and repository
tests are engineering, outside numerical trial compute, and disclosed separately.
No cloud/GPU. Check budgets before each fit/update and diagnostic batch; reserve
10% CPU for finishing/checks, and stop with unexecuted rows on exhaustion.

Inventory: 48 development fits (12×2×2), 120 confirmation fits (12×10), 12
preselected root-9101 reproduction fits, plus 12 short fixture fits for calibration.
Maximum 192 fit attempts; no automatic retries. Reproduction compares checkpoint,
trace, input, prediction and diagnostic numerical hashes (timing excluded).
Independent roots, not timesteps or repeats, are uncertainty units. Record a
source commit and full source SHA-256 snapshot before numerical runs; preserve
failed attempts and unused rows. Source changes require new execution identity;
scientific design changes require a new protocol/version and fresh streams.

Deliver reports/STUDY_A.md, reports/STUDY_A_DECISION.md, compact machine-readable
root tables/CIs, frozen receipt, plots and resource ledger. Raw inputs/checkpoints
live under runs/study-a-v1 with hashes and an archived source snapshot. State
and weights are checked for inference mutation. Finish with the smallest supported
core recommendation for Study B; implementation of that study is outside scope.
