# Minimal recurrent experiment platform contract

Version 1, adopted 2026-11-05 by [SOAM-047](../tickets/SOAM-047-platform-contract.md).
Classification: **essential for the next experiment**. This document is the RFC
and interface contract; its appendices supply implementation detail, not another
design layer. It accepts a small measurement platform, not a scientific hypothesis.

## Decision and motivation

Proceed with an explicit-state, observed-data interface for E1: useful shared
feature recall and action-conditioned transitions. Implement the common runner in
[SOAM-048](../tickets/SOAM-048-platform-runner.md), freeze the scientific task and
candidate equations in [SOAM-049](../tickets/SOAM-049-shared-population-protocol.md),
then implement candidates in SOAM-050. No fitted E1 candidate or confirmation run
is authorized by this contract alone. Existing substrate, writer, and handover
entry points and scientific contracts remain intact.

The common abstraction is a deterministic recurrent transition with explicit
sensory correction and feature readout. It does not require an energy function,
fixed point, particular neuron partition, online writer, or task-specific controller.
One state tensor can contain a shared population or declared disjoint blocks;
allocation and connectivity must be reported separately from tensor packaging.

| Choice | Reason and tradeoff |
| --- | --- |
| Pure state-in/state-out methods, private persistent model | Makes prediction isolation and intervention auditable; callers must account for copies |
| Separate observation correction and action propagation | Exposes when evidence enters and prevents accidental future sensing; requires an explicit time convention |
| Task-owned simulation/scoring, model sees only numeric packets | Supports a second small task without embedding geometry in recurrence; provenance is still a trusted caller contract |
| Ordinary local factory dictionaries | Enough for two fixtures and E1; no plugin discovery, service, or backend hierarchy |
| Separate offline fitting from frozen evaluation | Supports supplied and fitted candidates; online transactions remain a later protocol |

Alternatives considered: extending the handover packet would embed its fixed
two-object/key/pose/controller assumptions; a single opaque `step(episode)` would
hide observation/target separation; a universal Hopfield-energy API would exclude
valid asymmetric and GRU comparisons. Reuse small compatible utilities rather than
refactor historical implementations to satisfy this interface.

The [hypothesis ledger](HYPOTHESES.md) owns claims, the E1 protocol owns task-specific
equations and criteria, and reports own evidence. Long Sequence Hopfield Memory
provides a precedent for particular asymmetric sequence rules, not a theorem for
arbitrary action-conditioned dynamics ([Chaudhry et al., 2023](https://arxiv.org/abs/2306.04532)).
The GRU control uses the documented PyTorch cell semantics, with its gates and
input/readout costs included ([PyTorch GRUCell](https://docs.pytorch.org/docs/2.14/generated/torch.nn.GRUCell.html)).

## Boundaries and minimum delivery

The model owns parameters and fixed buffers; the caller owns transient activity.
The task owns the simulator and evaluator truth. The runner owns observations,
history, random streams, interventions, time/resource ledgers, and artifacts.
The fitter receives only permitted training observations/actions and returns a new
model. Evaluators have no write authority. Predictions are not grounded evidence.

SOAM-048 delivers two deterministic fixture tasks through the same runner, with
a supplied leaky recurrence and supplied linear recurrence on each. Fixtures use
no optimization or model selection. They exercise the interfaces and a separate
known-failure case. They do not implement the E1 shared/disjoint comparison.
SOAM-050 supplies the scientifically specified shared asymmetric candidate,
constrained disjoint candidate, competent GRU, and action-conditioned linear/local
reference. All use the same observation/action permissions and scoring interface.

Deferred **future capabilities**: online write/commit/rollback plugins, learned
organization, general integrators, modern-Hopfield catalogue, automatic topology
search, concurrency, planning, SLAM, Monty integration, and distributed/GPU runners.
Supporting **parallel research** may inform SOAM-049 but does not expand this delivery.
Revisit this contract only when a selected experiment identifies a concrete missing
capability; version any semantic change and preserve prior evidence.

## Appendix A — concrete signatures and time convention

These are normative Python interface sketches, not implemented APIs. Use PyTorch
on CPU, float32 model tensors and float64 metric accumulation. `Tensor` below means
a dense tensor. `B` is batch size, `D` observation features, `A` action width,
`C` cue width (zero is allowed), and `N` explicitly declared recurrent-state width.
Each task/backend instance declares these dimensions once and validates every call.

```python
@dataclass(frozen=True)
class Observation:
    z: Tensor                 # [B, D], current permitted sensory features
    valid: Tensor             # bool [B, D]; unavailable values are exactly zero
    cue: Tensor               # [B, C], current externally supplied cue only
    cue_valid: Tensor         # bool [B, C]; unavailable values are exactly zero

@dataclass(frozen=True)
class Command:
    action: Tensor            # [B, A], executed or proposed command, never a target

class Dynamics(Protocol):
    def initial_state(self, batch_size: int) -> Tensor: ...  # zero [B, N]
    def assimilate(self, state: Tensor, observation: Observation) -> Tensor: ...
    def advance(self, state: Tensor, command: Command, *,
                clamp_units: Tensor | None = None) -> Tensor: ...
    def readout(self, state: Tensor) -> Tensor: ...          # [B, D]

def freeze(model: Dynamics, state: Tensor) -> PredictionSnapshot: ...
def predict(snapshot: PredictionSnapshot,
            commands: tuple[Command, ...]) -> PredictionTrace: ...
# PredictionTrace: features [H, B, D], states [H, B, N], operation counts.

class Task(Protocol):
    def episode(self, split: str, seed: int, index: int) -> Episode: ...
    def score(self, predictions: Tensor, targets: EvaluationTargets) -> MetricRows: ...

def fit_offline(initial_model: Dynamics, data: TrainingObservations,
                fit_spec: FitSpec, seed: int) -> FitResult: ...
```

`Episode` contains `observations: tuple[Observation, ...]` of length T+1,
`commands: tuple[Command, ...]` of length T, and a separate `EvaluationTargets`
record. The latter holds target features, target-valid masks, and task-specific
truth/condition labels. It is available only to scoring/diagnostics, never to a
backend or training adapter. Model constructors receive dimensions, declared fixed
scaffolds and initialization seed, not a Task, Episode, generator, or evaluator.
Per-episode IDs/split names remain runner metadata, not model inputs.

`TrainingObservations` contains only observed z/masks/cues and executed commands,
plus split/exposure/encoder metadata. Observed successor z may be a training loss
target, but enters a free prediction only after that prediction has been scored.
`FitSpec` fixes optimizer/update count/loss/schedule and caps; `FitResult` contains
the new model/checkpoint, trace and exposure/resource ledger. This is a separate
SOAM-050 fitting function, not a method on the inference snapshot. SOAM-048 need
only reject fitting requests and serialize supplied fixture checkpoints.

At observation time t, first correct the prior state with observation t exactly
once. `readout` reconstructs the current features. `advance(h_t, a_t)` predicts
time t+1; `readout` of that state is scored before seeing observation t+1. The
first observation corrects zero state without an invented previous action. Grounded
one-step evaluation alternates advance and correction; free evaluation corrects
only its prefix then advances H commands with no future observations or cue schedule.
Future actions are declared inputs, not oracle feedback from future hidden states.
Retaining a past cue across prediction requires counted transient state.

All methods return fresh outputs without modifying their arguments or any model
parameter/buffer, history, cache, counter, or global RNG. They remain differentiable
for offline fitting; frozen inference disables autograd. Zero-state initialization
is the default; any alternative supplied initial pattern belongs to the E1 manifest
and costs capacity, not evaluator knowledge. Masks, clipping, normalization and
internal recurrent substeps are declared parts of the rule, never silent repairs.

`freeze` deep-copies the complete persistent model and detached state; the result
has no optimizer, writer, task, or live-state reference. `predict` starts from a
private state copy and returns detached outputs. Subsequent model/state mutation
cannot alter the snapshot. Check persistent and live-state fingerprints before and
after evaluation, including exception paths. Frozen dataclasses alone do not make
tensor contents immutable; clone at ownership boundaries and test aliasing. This
is not a security sandbox for arbitrary Python extensions.

### Candidate and intervention contract

Every candidate specification declares state slices, masks/connectivity, fixed and
fitted tensors, observation/cue pathways, readout capacity, transition equations,
substep count and time step. `advance` implements those equations without access
to geometry, object identities, or scoring callbacks. For example, a supplied
fixture may use `h'=(1-alpha)*h + alpha*tanh(W@h + U@a + b)` and `z_hat=D@h`.
This is an illustrative recurrence, not the SOAM-049 mechanism selection or an
attraction claim. GRU and linear state-space alternatives need no energy method.

| Required E1 family | Contract-specific check |
| --- | --- |
| Shared asymmetric candidate | Same declared units contribute causally to recall and transitions; all role/cue masks exposed |
| Constrained disjoint form | Explicit zero cross-block couplings and state assignment; no hidden recurrence through adapters/readouts; differences in capacity counted |
| GRU | All gates and projection/readout tensors counted; same evidence and fitting opportunity |
| Linear/local reference | State/observation and action mapping declared; no analytic simulator inverse/transition unless labeled oracle |

Runner interventions are finite records: `kind`, `anchor`, `duration`, `seed`,
`units`, `amplitude`, and any referenced variant checkpoint hash. Supported kinds
for E1 are input masking/action shuffling, additive state perturbation, state-unit
lesion, and a separately constructed frozen rule variant (e.g. symmetric-only).
No arbitrary callback or free-form executable expression is allowed in a manifest.
Each kind validates relevant fields and rejects irrelevant/missing ones.

Observation interventions precede correction. State perturbation is applied to a
private corrected state before the anchored prediction; a duration-k unit lesion
clamps selected units before readout and after every internal recurrent substep
for those k transitions. The backend exposes this clamp through an optional
keyword `clamp_units: Tensor | None = None` on `advance`; unsupported requests fail,
never become no-ops. Clamp tensors are bool [N], never truth-derived labels.
Parameter/rule ablations are separately frozen model copies, not writes during
prediction. Action shuffling draws only from the declared command schedule/stream.
Loss on the unmodified target measures the action intervention's effect; do not
regenerate targets to make a wrong action correct. Lesion selection uses only
training/development diagnostics and is frozen before confirmation. SOAM-049 owns
matched random/disjoint lesion controls, norms, anchors, and readout-only controls.

## Appendix B — worked flow and reuse fixture

An E1 episode starts with observed feature z0 and declared cue c0. Initialize and
correct once; snapshot h0. From that snapshot, predict features for a0 through
a(H-1). Only then compare with held-out targets z1 through zH. Independently advance
the live h0 by a0, score its one-step prediction, and correct with z1 to continue
grounded evaluation. Do not initialize either path from the desired target.

```python
h = model.initial_state(batch_size=1)
h = model.assimilate(h, episode.observations[0])
snap = freeze(model, h)
free = predict(snap, episode.commands[:H])  # actions only
free_scores = task.score(free.features, held_out_targets)
for t, command in enumerate(episode.commands):
    prior = model.advance(h, command)
    prediction = model.readout(prior)       # scored before next correction
    h = model.assimilate(prior, episode.observations[t + 1])
```

The runner has access to the Episode; the called model does not. Branches reuse
the same corrected prefix without counting it as new evidence. Record each copy,
replay read and model call. Recall scoring uses a task-defined observed cue and
held-out reconstruction target with its own prefix/anchor contract; no target
passed to `assimilate` may also be called withheld. SOAM-049 specifies corruption,
recall retention reference, transition horizon, and recall timing explicitly.

SOAM-048's first fixture is 2D rotation with angular/translation commands, projected
to 12 features. Its second is 2D translation along one axis with a scalar command,
projected to 8 features. Both have three transitions, B=1, no cues, and projection
seed 1729; their distinct fixed matrices are fingerprinted. The task generates
`x_next=R(a[0])@x+a[1:]` or `x_next=x+[a[0],0]` and computes targets. The same
leaky/linear backend code handles each using only D/A/N and supplied tensors;
neither backend calls R, accesses x, or branches on task name. N=8 for both supplied
fixture backends. Initial x/commands and model tensors derive from the fixture
streams, not fitting. Accuracy is not an acceptance threshold for these fixtures.

Use fixture root seed 9001 and indices 0/1: two tasks × two backends × two episodes
= eight cells, plus one deliberately nonfinite-output failure cell and an exact
repeat in a new directory. A task factory and scorer registration suffices for
the second fixture without changing runner control flow. Shape/call counters and
sentinel truth/target mutations check the boundary, not impressive task performance.

## Appendix C — measurement and resource contract

Adopt the [review's E1 defaults](SCIENTIFIC_REVIEW_2026_11_05.md#measurement-and-reproducibility-contract-e--r3)
as the starting contract: 10% held-out transition-NMSE improvement with positive
paired 95% interval; recall-degradation upper bound at most 0.005 NMSE; finite
trajectories for all confirmation seeds; and separate causal-sharing/directional
diagnostics. These are decision margins, not measured results or biological constants.
SOAM-049 must bind these to exact tasks, endpoints and guardrail references, or
justify a versioned change before fitting; this document does not freeze an E1 study.

Confirmation roots: 11, 23, 47, 71, 101, 131, 173, 211, 257, 307; development roots:
401, 409, 419. Use at least 20 paired held-out episodes per seed/condition. Training,
development, confirmation, fixture and diagnostic components have disjoint stream
namespaces even when root numbers coincide. Derive component seeds from SHA-256 of
canonical JSON `[protocol_id, version, split, root, episode, component]`, first eight
digest bytes as unsigned big-endian integer. Archive those keys and derived seeds.
Data streams omit model IDs for paired observations; initialization streams include
the declared model/config ID in the component name. No Python process-randomized hash.

Average correlated timesteps/episodes within seed before seed-level inference.
SOAM-049 freezes the interval method, precision/inconclusive rule and any multiple
comparison policy. Normalize NMSE with a shared training/development-derived
denominator and floor. Relative benefit is `(reference-candidate)/max(reference,1e-6)`;
floor-dominated tasks are uninformative. Select the primary strongest comparator on
development only; report every mandatory reference and do not claim superiority
when a stronger required reference contradicts it. Separate same-width mechanism
ablations from budget-matched comparisons. Aim for total parameter/persistent and
live-state budgets within 10%; otherwise freeze a small resource curve or narrow
the claim. Capacity mismatch is not fixed by omitting buffers/readouts.

### Finite ceilings and calibration

| Phase | CPU seconds | Wall seconds | Peak RSS | Artifact bytes |
| --- | ---: | ---: | ---: | ---: |
| SOAM-048 fixture matrix, failure case and repeat combined | 60 | 120 | 1 GiB | 256 MiB |
| E1 preflight calibration, inside the E1 total below | 120 | 240 | 2 GiB | 256 MiB |
| E1 entire study, tuning + fits + evaluation + one full-seed repeat | 14,400 | 28,800 | 2 GiB | 8 GiB |

GiB/MiB use powers of two. These are ceilings, not allocations to consume. The
historical [handover fixture](../reports/handover-harness/status.json) used 9.021 CPU
seconds and 295,010,304 RSS bytes; its [repeat](../reports/handover-harness/repeat-status.json)
used 8.557 seconds and 298,958,848 bytes. The 60-second/1-GiB fixture ceiling gives
headroom over those actual runs for this much smaller matrix. It does **not** predict
training speed. The four-CPU-hour E1 ceiling is a deliberately bounded research
allocation, not an extrapolated measurement or a guarantee all candidates fit.

At most eight preregistered development configurations per fitted family, including
width/rank/optimizer/readout choices. Shared/disjoint/GRU get equal maximum config
counts, training exposures, update opportunities and per-fit CPU limits; a closed-form
linear reference records its smaller actual cost. No candidate-specific rescue
search. One selected config per family is refit for confirmation using training-only
streams; no fitting/selection uses confirmation targets. Supplied models are labeled
separately. Maximum per-fit CPU limit is 600 seconds; the total study ceiling always wins.

Before fitting, SOAM-049 specifies the full planned run inventory, update/data limits,
and equal per-fit limits within these ceilings. SOAM-050 then records shape-equivalent
fixture timings (unfitted forward/backward operations, no optimizer updates or
performance selection), projected total cost and expected artifact size. Use ten
operations per relevant shape after one warm-up; projections count all planned fits,
eval cells, repeats, and a 2× timing margin. SOAM-051 refuses fitting unless the
projection fits the ceilings and the accepted manifest is complete. If infeasible,
revise the protocol before tuning, not by dropping a weak baseline or test seeds
after seeing performance. Larger budgets require a recorded protocol decision;
restarts/failed runs count against the allocation. No new human approval layer.

Check budgets before and after each bounded operation/cell and artifact write;
reserve serialized output space before writing. CPU checks are cooperative, so
record any single-operation overshoot and abort subsequent work. Bound operation
shapes/workspaces in preflight; no claim of OS-enforced hard memory isolation.
Separate completed scientific outcomes from budget exhaustion/incomplete evidence.

### Ownership and accounting ledger

| Owner/lifetime | Required accounting |
| --- | --- |
| Model persistent | Trainable/fixed scalar counts and bytes; encoder, readouts, gates, masks, supplied patterns, external memory, checkpoint hash |
| Live state | All recurrent/cue/cache/counter tensors, logical bytes, independent instances and active widths |
| Prediction | Snapshot parameter copies, initial/rollout state copies, output trajectories and temporary workspace; count coexistence |
| Fitting | Optimizer/gradient storage, supplied initialization, steps, training passes and all offline time |
| Runner/data | Distinct observed transitions, target exposures, replay/history reads, buffers, copies and artifact bytes |
| Evaluation | Truth/targets stored separately; simulator/evaluator costs disclosed separately from model inference |

Report logical tensor bytes and physical unique-storage bytes separately; tied
views are not independent allocations, but separately cloned weights are. Peak RSS
includes interpreter/allocator costs and is not a parameter count. Inventory both
persistent capacity and peak simultaneously live storage. Count recurrent substeps,
linear MAC estimates, assimilation/readout calls and nonlinear operations separately;
do not add nested timers or present MAC estimates as measured hardware FLOPs.

## Appendix D — artifacts, failures and verification

Each run refuses an existing output directory. Minimum artifacts are resolved config
and manifest; protocol/document hashes; provenance; supplied/fitted checkpoints;
separate observation and evaluator-target archives; per-cell predictions, metric and
exposure/resource rows; timing-free deterministic summary; failure/status record;
artifact SHA-256 index; and repeat comparison. Metric rows carry metric ID, units,
task/candidate/condition/seed/episode/anchor/horizon, value, sample count and status.
Absent capability is `null` with a reason, never zero energy or a successful probe.
JSON rejects NaN/Infinity; raw arrays and failure locations preserve nonfinite cases.

Provenance records source commit, dirty status, per-source-file hashes/combined
fingerprint, configuration/manifest hashes, package versions/lockfile, hardware,
numerics/threads, full seed derivation, checkpoints and data exposure. CPU one Torch
thread, deterministic algorithms, fixed library versions and explicit local RNGs
are the reference. Exact repeat compares numerical arrays/metric records under the
same environment, excluding timing, PID, timestamps and archive-container bytes.
Do not promise cross-version/device bitwise equality ([PyTorch reproducibility](https://docs.pytorch.org/docs/2.14/notes/randomness.html)).
Repeat full confirmation seed 11 across all conditions; fixture reproduction alone
does not reproduce an E1 experiment. A repeat is not another independent sample.

Run statuses: `running`, `complete`, `invalid`, `budget_exhausted`, `interrupted`.
Outcome interpretation is separate: supported benefit, precise negative,
inconclusive, or invalid comparison. Nonfinite model output marks a failed numerical
condition with its seed retained; never silently skip it or count finite survivors
as all-seed success. A model failure under a valid protocol is stability evidence;
leakage, broken code, or corrupted provenance invalidates the affected comparison.
An unknown operation, shape/mask error, or missing capability fails before trials.
No automatic retry or partial-cell resume in v1. Restart into a fresh directory,
link the failed run and charge its cost; never overwrite completed evidence.

SOAM-048 verification must demonstrate: correct action indexing and first-step
handling; changing evaluator truth/future observations cannot change a fixed-prefix
prediction; current available observations can change correction; no double
assimilation; no writes or aliases across snapshots/live state even after errors;
isolated streams; accurate counts including clones; intervention timing/capability
rejection; finite/invalid/budget paths; exact fixture repeat; and historical tests.
SOAM-050 adds train-only fitting, control-equation and causal-intervention checks.

Preservation checks: baseline and final `uv run pytest` for code changes, relevant
invariants, `uv run python scripts/check_tickets.py`, and `git diff --check`. Keep
historical configs/protocol hashes/CLIs/reports unchanged. The existing
[writer contract](../soam/plasticity/README.md) supplies the snapshot/write separation
precedent; its width-37 rule is not a generic learning plugin. The
[handover interface](HANDOVER_HARNESS.md) supplies explicit observation/truth and
resource accounting precedents; its packet/counters must not enter this core.

## Decision limits and next review

SOAM-047 proceeds for the contract and fixture implementation only. SOAM-049 must
still freeze task distributions/withheld splits, recurrence and readout equations,
training objective, recall reference, horizons, numeric intervention matrix,
comparator selection, statistical precision, and exact finite inventory. SOAM-048
can implement these generic boundaries without pretending those decisions are made.
SOAM-050 depends on both; SOAM-051 requires completed feasibility checks before fits.
No H1/H6 gate, acquisition capability, attraction claim or application branch is passed.
