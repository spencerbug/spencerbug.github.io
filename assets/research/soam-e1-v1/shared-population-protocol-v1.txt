# Shared recurrence benefit pilot

E1 protocol v1, 2026-11-05. Owner: [SOAM-049](../tickets/SOAM-049-shared-population-protocol.md).
Classification: **essential for the next experiment**. Numerical authority:
[shared_population_v1.json](protocols/shared_population_v1.json). This document
defines mechanisms and interpretation; the manifest fixes the finite inventory.
Both must be fingerprinted by SOAM-050. No trials or performance findings accompany
this protocol decision. The [platform contract](RECURRENT_PLATFORM_CONTRACT.md)
continues to govern data ownership, prediction isolation, artifacts and ceilings.

## Question, decision and claim limits

Does one population supporting feature reconstruction and action-conditioned
transitions outperform separated populations and competent ordinary recurrence,
without sacrificing reconstruction? Test one shared leaky-rate candidate with a
symmetric recurrent component and action-dependent skew-symmetric components.
Compare both parameter-matched and state-matched references. Independently test
whether the same units causally affect both functions through recurrence, rather
than only through a common output projection.

Proceed with this bounded protocol. The preferred mechanism is a hypothesis, not
an architecture requirement. The two functions occur on separate episodes with
supplied task-role labels. This tests cross-function reuse, not concurrent binding,
autonomous role discovery, online acquisition, object memory, or H5 composition.
The observations eventually identify physical state; this is not H6 belief recovery
under irreducible ambiguity. Those distinctions are explicit despite historical
ticket hypothesis tags. No graph-free superiority or biological equivalence claim.

An identifiability limit is central: on reset, single-role episodes, two separately
allocated states with tied S32 weights can exactly reproduce S32. Add T32, a no-fit
tied-weight/two-bank diagnostic. E1 can establish a useful shared implementation
and causal participation in its declared unit basis; it cannot establish that
sharing physical neurons causes a prediction advantage over parameter tying.
The primary estimand is the declared shared architecture versus independently
parameterized separated and ordinary references, not neuron overlap in isolation.
Testing that stronger claim needs a later identifiability protocol, not automatic
concurrency implementation.

Classical Hopfield memory motivates testing recovery from incomplete cues
([Hopfield, 1982](https://pmc.ncbi.nlm.nih.gov/articles/PMC346238/)). Asymmetric sequence
memory is a precedent for particular directional rules, not proof of action-conditioned
generalization ([Chaudhry et al., 2023](https://arxiv.org/abs/2306.04532)). The present
rate rule is a deliberately simple proposed mechanism, not a reproduction of either
paper or a certified energy descent. A symmetric component alone does not prove
convergence of this discrete, driven update. GRU is a conventional control using
the [PyTorch 2.14 cell equations](https://docs.pytorch.org/docs/2.14/generated/torch.nn.GRUCell.html).

## 1. Task and information supplied

Use x in R², a fixed orthonormal projection P in R^(12×2), and z=P x. Reuse the
existing projection construction with seed 1729; pin its matrix. The task owns P
and the simulator. Models receive encoded observations, never P's inverse, x,
rotation matrices, phase/radius, split labels, future features or target readouts.

The supplied role q is one-hot: recall (1,0) or transition (0,1). It is presented
once in the initial Observation cue and retained as two counted, non-neural state
floats. This role is task scaffolding, not a learned semantic representation. In a
recall episode, x stays fixed and every command is zero. In a transition episode:

`x[t+1] = 0.98 * R(0.30*a[t,0]) @ x[t] + 0.03*a[t,1:3]`.

R is the usual counterclockwise planar rotation. All model families see identical
inputs and commanded actions. Initial radius is uniform [0.4,0.8]. Initial phase
is sampled uniformly within one of eight equal sectors of [0,2π): even sectors for
training, odd sectors for development and confirmation. Recall uses the same initial
state distribution as transitions. There are no discrete stored target-pattern IDs.

For each transition command, divide each of a0 and a1 in [-1,1] into four half-open
bins of width 0.5 (the final bin includes 1). Choose uniformly among the eight bin
pairs whose index sum is even in training, odd in development/confirmation; sample
uniformly inside each selected bin. a2 is independently uniform [-1,1]. Draw anew
each step. Training and evaluation therefore withhold initial sectors and joint
action cells while preserving each action's marginal support. Subsequent states may
overlap; do not call this disjoint state-space support or novel transformation
composition. All models face this same moderate distribution shift.

Initially retain six uniformly selected feature coordinates, add independent
N(0,0.01²) noise only there, and zero the rest with their validity mask false.
Subsequent transition observations are full clean z, but become available only
after the corresponding prediction. The initial clean sensor record supplies the
recall target; its corrupted version is a synthetic cue, not a second independent
grounded observation. Clean observed records may supply training loss targets;
the clean recall target never enters the model's cue or a free rollout.

Simulate x and rotations in float64. Cast drawn actions to float32 before applying
them in the simulator, so the executed values equal the model's commands. Promote
the fixed float32 P to float64 for projection, then cast z to float32. Select bins
and phase sectors in ascending lexicographic order using their component RNGs;
sample radius, phase, commands, masks and noise from separate archived stream keys.

Training transitions have horizon 8; evaluation generates 32 commands, with free
steps 1–8 the primary endpoint and 1–32 a secondary diagnostic. Recall uses ten
zero-action updates after cue correction. No observation/cue refresh occurs during
either free rollout. Grounded one-step error uses the same transition episode and
corrects once after each score. q is constant; no role switching or state transport.

## 2. Exact candidates and state organization

All neural models start at zero activity with q=(0,0). Initial correction sets q
from the valid cue. Let `u=[masked_z, valid_as_float]` (24 inputs). Use
`g=tanh(E u + e)`, then `h=g` initially and `h=0.5*h+0.5*g` for subsequent
grounded correction. Future cues are absent; a contradictory role cue is invalid.
All parameters are fixed during evaluation. No layer norm, dropout, clipping of
activity, hidden cache, external memory, extra settling loop, or adaptive substeps.

For the shared rate model S32, one 32-unit h serves both roles:

```
W(a,q) = S + q_transition * (A0 + a0*A1 + a1*A2 + a2*A3)
h_next = 0.5*h + 0.5*tanh(W(a,q)@h + U@a + b + v*q_transition)
z_hat = D@h + d
```

One call to advance is one update (dt/tau=0.5). S is symmetric, with one trainable
coefficient per upper-triangular entry including diagonal; each Aj is skew-symmetric,
with one coefficient per strictly upper-triangular entry, opposite sign below and
zero diagonal. These are separate weights on the **same units**, not separate states.
The native unit basis is fixed by implementation; results are not basis-invariant
proofs of semantic neurons. E/e/U/b/v/D/d are fitted too. Readout is affine, without
an observation/action skip path or a separate recurrent decoder.

Disjoint D25 has independent 25-unit recall and transition banks. Only the bank
selected by the supplied role is corrected, advanced and read out; inactive activity
is zero. There are no bank-to-bank edges, common recurrent cache, shared fitted
initializer/readout or state copies. Each bank receives the same observation
permissions. Recall uses symmetric S and no A/U/v (actions are zero); transition
uses S and A0..A3 and U, with its own bias absorbing the constant role term.
This is the constrained separated form of the rate mechanism, with a total of 50
available neurons and 50+2 state floats. D16 is the identical constraint at 16 units
per bank: it matches S32's total available activity size but has fewer parameters.
Both banks are counted even though only one is active per episode.
Thus "state-matched" means allocated state in this declared implementation, not
equal simultaneously active neurons. Report active-bank sizes and possible lazy
allocation separately; no unavoidable storage saving follows from these episodes.

G28 and G32 have respectively 28 and 32 GRU units, the same correction/readout
forms as above, and `GRUCell(input=[a,q], hidden=h)` for each advance. GRU biases
are included. q's two stored flags are counted in addition to h. SYM32 is a fitted
control identical to S32 except all Aj are absent; U, b and v remain. It is not
guaranteed incapable of directional behavior or guaranteed to have an energy.

L12 is the cheap observed-data bilinear reference. It learns a ridge map
`L:[masked_z,valid,1] -> clean_z` for cue correction (initial gain 1, later gain
0.5). Its transient state is z_hat plus q. Recall leaves z_hat unchanged. Transition
uses a fitted ridge map `B:[z_hat,a0*z_hat,a1*z_hat,a2*z_hat,a,1] -> next_z`.
Readout is identity. It receives the same clean training records, with no simulator
inverse or analytic R. Its hold operation is declared task scaffolding. A strong
low-cost reference is useful even if it defeats the preferred candidate.

| ID | Fitted scalars | Available recurrent units + role flags | Comparison role |
| --- | ---: | ---: | --- |
| S32 | 3,868 | 32+2 | Preferred candidate |
| D25 | 3,849 | 50+2 | Parameter-matched separated reference |
| D16 | 2,040 | 32+2 | State-matched separated reference |
| G28 | 3,988 | 28+2 | Parameter-matched GRU |
| G32 | 4,940 | 32+2 | State-matched, larger-parameter GRU |
| L12 | 924 | 12+2 | Cheap bilinear reference |
| SYM32 | 1,884 | 32+2 | Symmetric-only fitted mechanism control |

T32 is constructed from each final S32 checkpoint without refitting: the same
physical parameter objects serve independent 32-unit recall and transition state
banks, with only the role-selected bank initialized/updated/read out. Available
state is 64+2 floats, with inactive banks zero. Its intact outputs must match S32
exactly on both roles. Clamping S32's selected four indices in only one T32 bank
must leave the opposite role exactly unchanged. Clamping both banks would affect
eight units, not the four used in S32. Count physical allocation and active state
separately: a lazy single-role implementation need not allocate the inactive bank,
so v1 cannot claim an unavoidable peak-memory advantage over tied-state alternatives.
T32 is excluded from superiority testing because equality is algebraically expected,
not because of observed performance; publish that equality beside the primary table.

Counts are derived, not measured implementation storage. S(n)=2.5n²+40.5n+12;
D(k)=3k²+78k+24; G(n)=3n²+58n+12; SYM(n)=0.5n²+42.5n+12. L has 12×25 and
12×52 coefficients. Count projection/scaffolds, masks/indices, expanded matrices,
optimizer, snapshots and physical tensor storage separately in SOAM-050. Packed
weights avoid counting nonexistent trainable duplicates; expanded symmetric/skew
matrices still cost workspace or persistent bytes if cached. Do not invent padding
parameters to claim a match. Width choices are fixed, not tuned. This is a two-point
resource comparison: no claim of exact simultaneous parameter/state/compute parity.

### Initialization and fitting

For rate models initialize S diagonal to 0.5 and its off-diagonal packed coefficients
independently N(0,0.1²/n); Aj packed coefficients independently N(0,0.01²/n).
E, U and D entries are uniform ±1/sqrt(input_width); all affine biases and v start
at zero. GRUCell uses PyTorch's default uniform ±1/sqrt(n); its E/D follow the same
initializer convention. Independent initialization streams are recorded. No claim
of identical weight initialization across differently parameterized families.

Each fit has 100 recall-only Adam updates, save a recall checkpoint, then 300 joint
updates. Each update has batch 16; every joint update uses a fresh recall batch and
a fresh eight-transition batch. Losses average features, steps and batch equally:
`L_pre=MSE_recall_steps_1_to_10`; `L_joint=L_recall+L_free_1_to_8+0.3*L_grounded_1_to_8`.
Grounded and free terms use the same actual observed sequence, not independently
invented targets. No detach inside free training rollout. Adam has betas (0.9,0.999),
epsilon 1e-8, weight decay 0 and gradient norm clipping 1.0. Only learning rates
0.001 and 0.003 are eligible. Use the final checkpoint; no best-step selection or
early success stop. A failed numerical fit stays failed, with no rescue rerun.

For L12, solve float64 normalized ridge normal equations (including regularized bias)
with lambda 0.0001 or 0.01; evaluate float32. Fit the initial L on the first 100
recall batches, retain that checkpoint, then refit L on all 400 recall batches and B
on all 300 transition batches' clean observed pairs. No recurrent gradient iterations.
Report its different algorithm and actual cost, not fictitious equal update counts.
No family gets extra records, hyperparameter trials or auxiliary training tasks.

There are two configurations per family, fitted on roots 401/409/419 using training
streams. Choose each family's config by mean development free-8 NMSE, ties within
1e-12 resolved by smaller config index. Preselect the strongest required reference
by this same development score (ID order breaks ties); still report/gate against
all five required references D25/D16/G28/G32/L12. Recall/guardrail failures cannot
trigger alternate config selection. Confirmation refits the chosen config with new
training streams for each confirmation root, not confirmation observations.

Before confirmation, the best selected GRU must have mean development transition
NMSE <=0.15 and recall NMSE <=0.03. Otherwise baseline competence is unresolved:
finish the planned development record and stop this version as inconclusive; no
preferred-architecture superiority claim. If any required reference's development
transition NMSE <=1e-6, stop for an uninformative floor. Neither rule authorizes tuning
beyond the two declared settings. This screen is a sanity check, not a guarantee
that the GRU is optimally trained.

## 3. Metrics, uncertainty and frozen decisions

Generate 2,048 training-distribution clean initial sensor records with normalization
root 1801 in a distinct `normalization` component. Set denominator V to their mean
squared deviation from the per-feature mean, floored at 1e-6. V is shared across all
models, horizons and roles; save samples/hash/mean/V. Normalization data are not
extra fitting examples. NMSE is mean feature squared error divided by V, using
float64 reductions. Recall error is the ten-step endpoint; recall training still
uses all ten outputs. Transition primary error averages free steps 1–8. Report
per-step, free-32 and grounded-32 errors as secondary quantities.

Use 20 paired episodes per root per role, same initial state/noise/mask and command
streams across models. Development and confirmation have distinct split keys;
sectors/action bins agree but instances do not. Aggregate episodes within root.
Inference resamples the ten independent confirmation roots, never timesteps or
episodes as if independent model replications. Predefine 10,000 paired bootstrap
resamples using inference root 8675309 and NumPy's linear quantile rule. No extra
seeds may be added in response to interval width.

For each required reference j and root s, `g_js=(E_js-E_Ss)/max(E_js,1e-6)`.
Estimate mean g across roots and its paired interval. The five benefit contrasts
and two recall contrasts form a seven-contrast family: use two-sided percentile
intervals with tails `0.05/(2*7)`. All seven intervals must be reported, together
with ordinary paired 95% intervals for readability. This conservative adjustment
protects the fixed comparison family; it is not a power guarantee with ten roots.

Utility passes only if all five point gains >=0.10, all adjusted lower bounds >0,
and each gain interval width <=0.20. Also require S32 mean transition NMSE <=0.10
and mean recall NMSE <=0.02. Recall guardrails are adjusted upper bounds <=0.005
for (S32 final minus its recall-only checkpoint) and (S32 final minus D25 final).
This operationalizes retention under joint offline fitting, not online forgetting.
All S32 confirmation/probe trajectories must be finite; all required reference
primary trajectories must also be finite for a valid superiority comparison.
Finiteness checks include parameters, preactivations, losses and outputs, not just
bounded post-tanh activity. A failed fit emits failure/status rows for evaluations
that cannot run; it receives no successful score or automatic replacement.
Any required reference error <=1e-6 on any confirmation root makes relative-benefit
classification floor-limited/inconclusive, not an enormous or guaranteed gain.

Interpret outcomes in this order; retain secondary flags even when an earlier rule wins:

1. **Invalid execution/comparison:** leakage, wrong source/manifest, broken equations,
   information mismatch, missing required rows, unsupported operation, or implementation
   accounting mismatch. A faithfully executed unstable model is a numerical failure
   of that candidate; it must not be erased as a software bug without evidence.
2. **Incomplete/inconclusive:** budget exhausted, development screen fails, floor
   dominated, or a mandatory reference is numerically unstable. S32 instability
   is a failed tested candidate, without establishing an advantage for survivors.
3. **Interference/recall failure:** either recall contrast lower bound >0.005, or
   absolute recall error >0.02. A guardrail interval straddling 0.005 is inconclusive.
4. **Directional failure:** recall is adequate but transition error >0.10, or the
   action-dependence tests below fail with adequate precision. Uncertain effects
   remain inconclusive. Good reconstruction alone cannot pass the pilot.
5. **Useful sharing supported:** all utility, guardrail, finite-run and causal/directional
   requirements pass. Attraction diagnostics are reported separately, not required.
6. **Precise no practical benefit:** at least one required-reference gain interval has
   upper bound <0.10 and width <=0.20. This rejects superiority over the declared
   reference set on this task/budget, not all recurrent or shared architectures.
7. All remaining mixed/underpowered outcomes are **inconclusive or mechanism-unresolved**.

SOAM-052 interprets these results; SOAM-059 selects at most one next experiment.
Neither a protocol proceed nor an ordinary prediction win automatically advances
attraction, concurrency, acquisition, application integration, or H1 in full.

## 4. Causal overlap, direction and recovery

No fitting on interventions. All lesion selection uses a fixed separate development
diagnostic set, root 401, 20 paired episodes; each confirmation model is evaluated
on this same set after refitting. Freeze its selected unit IDs before opening its
confirmation stream. These diagnostics do not select checkpoints or hyperparameters.

For each S32 unit i, measure the increase in recall endpoint and free-8 NMSE after
clamping that unit. Divide each nonnegative increase by max(unlesioned role error,
1e-6); rank by the smaller of the two role scores, ties by unit index. Select the top
four units. Independently sample four random four-unit sets uniformly without
replacement within each set; sets may overlap. Full lesions clamp after correction,
before readout, and after every recurrent update for the entire rollout. Keep q
flags untouched. No decoder refit. Also evaluate the targeted mask **only in the
readout**, leaving unlesioned activity to evolve normally. These controls separate
recurrent-state contribution from a common decoder bottleneck.

Causal criteria: targeted full-clamp increases both role errors by >=0.005 NMSE,
with positive adjusted lower bounds; full-clamp minus readout-only error is >=0.002
NMSE in both roles, also with positive lower bounds. Compare and report random-mask
effects, but do not require targeted effects to exceed random ones: distributed
sharing may be homogeneous. These are causal effects in the implemented unit basis,
not proof that four units encode named concepts or that no alternative realization
exists. D16 recall-bank first-four and transition-bank first-four masks are equal-size
disjoint controls: the opposite role's outputs must be exactly unchanged. Violation
invalidates the isolation implementation. D16's total units match S32; effects are
not normalized into a false parameter match.

T32's independent-bank interventions distinguish shared parameters from intervention
on the same state coordinates. Their intact equivalence explicitly limits causal
attribution of the performance advantage to neuron overlap alone.

Direction controls on S32: cyclically shift its observed command schedule by one
position within each 32-command episode, scoring against the original targets;
and separately set A0..A3 to zero in a frozen checkpoint copy. Both must worsen
free-8 NMSE by >=10% relative to intact S32 with positive adjusted lower bounds
for the directional mechanism claim. SYM32's separately fitted result tests whether
asymmetry was necessary after retraining; equality/better performance limits that
necessity claim even if removal from the fitted S32 is harmful. The six causal and
directional contrasts use paired bootstrap intervals with tails `0.05/(2*6)`.
Require relative-effect interval widths <=0.20 and NMSE-effect widths <=0.02;
wide intervals never establish absence. A precise failure of an overlap criterion
leaves useful prediction possible but shared-recurrent attribution unsupported.

For each causal criterion, an upper bound below its practical minimum with interval
width within the stated cap is a precise failure; otherwise a nonpassing criterion
is unresolved. No conclusion about absence follows merely from a point estimate
below a threshold.

Continuous unseen command sequences and the action-shift control test dependence
on actions rather than a single stored script; no sequence ID is supplied. They do
not exhaust every possible replay strategy. A strong L12 result suggests that
ordinary local system identification suffices. D16/D25 distinguish unit allocation
from capacity only partially; report both along with G28/G32 rather than attributing
all masked-network differences solely to sharing.

For a small recovery probe, perturb S32's corrected neural state with a Gaussian
direction normalized to RMS 0.1; hold q fixed. Run ten zero-command recall updates
without any further sensory cue, comparing to the unperturbed trajectory. Repeat
both paths with S=0 (A is already inactive in recall); same forcing, perturbation
and decode. Record hidden RMS distance ratio at steps 1..10 and recall error.
Also zero the initial sensory cue/mask while retaining the supplied role; this
tests whether location-specific recall depends on evidence. No target re-injection.

Report recovery evidence separately: at least 90% of episodes halve the perturbation
distance by step 10, at least 20 percentage points more than S=0; perturbed mean
recall NMSE <=0.02, fraction with recall NMSE >0.05 <=5%, and predicted-feature
variance/target variance in [0.8,1.2]. Report ordinary root-bootstrap 95% intervals
and call this diagnostic inconclusive if threshold uncertainty overlaps. Variance
and accuracy guard against trivial collapse. This is finite-horizon recovery toward
an unperturbed trajectory family, not proof of a global attractor/manifold, autonomous
sequence memory or Lyapunov stability. No optional partial-overlap topology is added
to v1; a specific failure could motivate one later diagnostic under a fresh decision.

## 5. Inventory, provenance and resource stopping

The manifest fixes seven fitted families × two development configurations × three
development roots = 42 fits, seven × ten confirmation roots = 70 refits, and seven
full seed-11 repeat fits = 7. Total: 119 fit instances (102 neural Adam fits and
17 ridge fits), with no retries. Each development fit scores final recall, saved
recall checkpoint, and free/grounded transitions on 20 episodes per role. The same
base scoring accompanies each confirmation/repeat fit. No empirical tests occur
in SOAM-049 or the SOAM-048 engineering fixture task.

This inventory is the maximum planned execution when screens pass. Preregistered
screen/budget exits retain an explicit ledger of unexecuted cells and their reasons;
they are incomplete/inconclusive outcomes, not unexpected missing-data corruption.

Every confirmation root and its seed-11 repeat additionally executes: 32 singleton
S32 lesions and their intact baselines on each of two roles on the fixed development selection set; intact
and six final S32 lesion modes (targeted full, targeted readout-only, four random)
on both roles; D16's two bank masks on both roles; shifted-action and A=0 transition
controls; zero-cue recall; and three additional recall trajectories for perturbed,
unperturbed-S=0 and perturbed-S=0 recovery. Intact paths are reused, not counted as
new evidence. The manifest gives cell counts; one cell is one model/condition/episode,
not an independent statistical replication. Archive all required cells and exposures.

Also score intact T32 and its two separate-bank targeted masks on both roles.
These add 120 no-fit cells per confirmation/repeat root and must satisfy the exact
equivalence/isolation checks. Including diagnostic selection, the total is 27,820
scoring cells, not 27,820 independent samples.

Data streams follow the platform SHA-256 convention with protocol ID `soam-e1-shared`
and version 1. Use explicit split/component names, including phase/action/noise/mask,
fit-initialization, normalization, lesion-selection, random-lesions, perturbations
and inference-resampling. Training packet indices are update_index*16+batch_index;
recall updates span 0..399, transitions 100..399. Streams omit family/config for
paired data; model initialization includes them. Development/confirmation indices
are 0..19; diagnostics-selection uses its own component at root 401. Repeat restores
archived source inputs and seeds, refits, and compares numerical artifacts exactly;
it is not an eleventh independent confirmation root.

One fit uses 6,400 distinct recall source records and 4,800 transition episodes
(38,400 executed transitions). Count repeated recall targets, free/grounded reuse,
readout losses and development inspections separately from distinct source records.
No synthetic perturbation/imagined output is added as grounded learning data.
All training records/seed keys, normalization data, checkpoints before/after joint
fitting, selected configs/lesions, observations versus evaluator truth, outputs,
failures, timing and source/software fingerprints remain reproducible artifacts.

Adopt the platform's complete-study ceilings: 14,400 CPU seconds, 28,800 wall
seconds, 2 GiB peak RSS and 8 GiB aggregate artifacts, including failed attempts,
development, confirmation and repeat. Per-fit CPU limit 90 seconds, identical for
all neural families/configs and an upper bound for ridge fits. Development phase
CPU ceiling 4,000 seconds, confirmation 8,000, repeat 1,200; remaining 1,200 covers
preflight/normalization/aggregation and overhead. The overall ceiling always wins.
These ceilings are allocations, not measured runtime predictions.

SOAM-050 must time the prescribed shape-equivalent unfitted operations (ten after
one warm-up, no optimization/model selection) within the platform's 120-second
preflight allowance. Project **all** fits, singleton-selection probes, evaluation,
reproduction and artifacts with the required 2× margin. Freeze the cost ledger
before SOAM-051 starts fitting. If any phase or total is infeasible, record the
failure and revise before fitting; no dropping baselines/seeds, increasing caps,
changing thresholds or silently selecting a smaller task after results. Check
budgets between bounded operations, record overshoot, and stop subsequent work.

Implementation checks in SOAM-050 must verify packed parameter formulas, symmetry
and skew signs, independent-bank isolation, role flags and readout selection,
zero-state/first-correction timing, loss exposure counts, sensory/target exclusion,
no-write snapshots, clamp timing, matched perturbation norms, seed partitioning,
bootstrap root pairing, normalization and frozen outcome precedence. Tiny fixtures
may verify mechanics; they are not a training pilot or evidence of benefit.

Any material amendment gets a new protocol/manifest version and decision record;
keep v1 and its outcome intact. Fresh confirmation streams are required when prior
confirmation data have informed the amendment.

## 6. Decision consequences and publication

The review defaults are retained: ten fixed confirmation roots, 20 episodes per
root/condition, 10% benefit, 0.005 recall guardrail and all-seed finiteness. Additions
are the explicit absolute competence screens, adjusted intervals, precision limits,
two resource-matching reference sizes and operational causal criteria. They are
preregistered engineering judgments without empirical calibration, not claimed
universal scientific thresholds. An inconclusive result is a legitimate completion.

The T32 equivalence narrows the causal claim relative to an unrestricted reading of
"benefit of shared neurons". This is a design/identifiability finding, not an empirical
negative result. SOAM-052 must retain that limitation even after a positive pilot.

SOAM-048 remains the next engineering task; SOAM-050 waits for it and this proceed.
SOAM-051 performs measurements; SOAM-052 assesses useful sharing; SOAM-059 selects
one follow-up. Broader architectures and applications remain **future capabilities**;
source/theory work is **parallel research** only when it answers a concrete question.

This distinction between utility, causal shared-unit evidence and recovery is a
potential methods-blog concept. It is a proposed experiment, not a finding; any
publication should link this protocol and its eventual full report, including
negative or inconclusive results and the declared scaffolding/resource differences.
