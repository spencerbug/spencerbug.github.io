# Study A decision — retain a simple core and preserve the accuracy references

2026-11-11. SOAM-065: **proceed with the R32 recommendation only**. This accepts
the completed scientific comparison and selects a starting reference; it does not
pass the adaptive-update hypothesis, the historical sharing gate, or any acquisition
gate. No Study B implementation or next experiment is activated.

## Answer to the research question

Adaptive gating is **not necessary for basic E1-family recall and prediction**
within the tested inventory. Ordinary fixed-leak recurrence is competent. The full
GRU parameterization provides substantially better short-horizon accuracy than the
tested ungated models at comparable parameter or inference-MAC counts, so gating
cannot be dismissed as useless. However, a practically valuable adaptive-update
advantage across the required endpoints is **inconclusive** under the frozen rule.

G32 improves paired-root joint error over the parameter-near learned-constant-update
FU38 by 9.9172% (adjusted interval [0.6950%,19.5834%]), below the required 10% point
estimate. Its free-32 guardrail upper bound is 0.011991 NMSE, above the 0.01 limit.
A positive effect estimate does not pass that conjunction, and uncertainty does not
establish equivalence. The descriptive short/long-horizon tradeoff does not meet
the protocol's stronger formal mixed criterion either.

The [scientific report](STUDY_A.md), [frozen v2 protocol](../docs/STUDY_A_PROTOCOL_V2.md),
[receipt](study-a/confirmation-receipt.json), [tables](study-a/tables.md) and
[root evidence](study-a/root-results.md) own the measurements. No criterion,
configuration, candidate or root changed after confirmation exposure.

## Smallest supported starting core

Retain **R32: 32-unit tanh recurrence with fixed leak 0.5, 2,412 fitted scalars**,
including sensory cue initialization and readout. It needs 1,568 linear MACs per
advance/readout and 34 active state/role floats; initialization has its own cost.
The 24-value fixed sensory projection remains supplied and separate.

This is a **post-study architectural judgment**: apply the protocol's absolute
G32 competence limits to the full inventory and prefer the smallest tested neural
candidate that meets them, accepting higher error. It is not a new confirmatory
minimum-size claim. The protocol originally applied those limits to G32, and no
neural widths below 32 were tested.

| R32 endpoint | Mean NMSE [ordinary 95% root interval] | Worst of ten roots |
| --- | --- | ---: |
| Recall-10 | 0.00759 [0.00631,0.00888] | 0.01102 |
| Free-8 | 0.00921 [0.00597,0.01447] | 0.03127 |
| Free-32 | 0.01864 [0.01543,0.02192] | 0.02770 |
| Grounded-32 | 0.00254 [0.00210,0.00301] | 0.00400 |

Even the worst sampled R32 recall/free-8 roots are below the 0.03/0.10 competence
limits; this is sample evidence, not an all-future-roots guarantee. Mean J is 0.00840
versus G32's 0.00380: about 2.21 times the error, with 49% of the fitted scalars and
47% of measured fit CPU. The recommendation optimizes simplicity subject to basic
competence, not best accuracy or an equal-performance resource frontier. If a future
study requires G32-level error, R32 cannot be represented as interchangeable.

L2 is smaller (110 fitted scalars, two active coordinates), but recall 0.07891
fails the competence limit and grounded-32 error is 0.32273. Its linear cue
initializer/correction limits matter; this does not rule out a better tiny nonlinear
model. It remains a strong low-order dynamics control, especially at long horizons.

## Mechanisms to retain, compare or defer

| Mechanism | Disposition | Evidence and limit |
| --- | --- | --- |
| Ordinary fixed-leak recurrence, learned cue initializer/readout | Retain as R32 starting core | Competent on sampled E1 endpoints with the smallest tested neural parameter count; accepts an accuracy cost |
| Full GRU | Preserve as accuracy reference | Roughly 49–51% lower J than R52/R55; approximately twice their training CPU, so equal-total-CPU alternatives remain unresolved |
| Learned constant update with adaptive reset | Preserve FU38 as mechanism reference | Near-G32 short accuracy and lower mean free-32/free-128 error; not the smallest model |
| Adaptive reset | Retain as an optional comparison mechanism | FR32 loses long-horizon accuracy; FU32/FR32 have equal width and count, but optimization/parameterization confounding remains |
| Adaptive update / gated leaky RNN | Do not require in the starting core | Primary practical claim inconclusive; FR is algebraically the gated-leaky control, with long-horizon weakness; disruptive test-time clamps do not establish necessity |
| Symmetric-plus-skew S32 or gated S32 | Defer as a default architecture requirement | Gating improves short error with extra capacity, while GS32 extrapolation worsens; no useful-sharing or energy guarantee follows |
| Compact learned bilinear dynamics | Preserve L2 and historical L12 as structural controls | L2 reproduces L12 free prediction; both beat neural models at 128 steps but fail cue/grounded competence |
| Common decay and adequate development allocation | Retain the calibration practice | The 800-update controls were undertrained; 1600-update screening improves fairness, not proof of optimizer optimality |

The original GRUs' free-32 disadvantage is predominantly accumulated angular drift,
with radial distortion, in a contracting low-dimensional environment. The
[historical reanalysis](study-a/historical-drift.json) uses 600 already-exposed E1
cells, not fresh confirmation. New stronger training reverses the free-32 ranking,
while L2/L12 regain the advantage at 128. Gate heterogeneity, linear latent probes
and hidden-gap contraction establish neither semantic components nor useful global
attractors. E1 is a useful controlled system-identification test, not evidence of
associative-memory complexity, compositionality or biological validity.

## Scope, evidence acceptance and future routing

SOAM-064 is complete: 120 fresh confirmation fits, exact 12-model root-9301 repeat,
all 252 planned fits across versions, independent reduction of 600 headline metrics,
215 passing tests and resources inside the owner ceiling. Preserve the closed v1
undertraining outcome and failed v2 receipt attempt. [Engineering history](STUDY_A_IMPLEMENTATION.md),
[audit](study-a/audit.json), [reproduction](study-a/reproduction.json),
[resources](study-a/resource-final.json) and [completion checks](study-a/verification.json)
make that acceptance reviewable.

Classification: the completed mechanism study is **essential next work delivered**;
equal-total-CPU or smaller nonlinear-core tests are **parallel research ideas only**;
Study B, acquisition, learned scopes and integration are **future capability**.
No additional sweep is authorized by these suggestions. A later selected protocol
must define its own competence, retention and learning tests with fresh data and
budget. R32's E1 competence says nothing about its ability to acquire or retain new
dynamics through persistent writes.

SOAM-052 remains done/stop. SOAM-039 remains backlog after the owner's Study A
override; SOAM-059's historical proceed decision is preserved but does not silently
reactivate acquisition. No sharing-dependent child changes, no Study B ticket or
implementation is created, and no remote issue or publication is sent.

The distinction between short-horizon accuracy and long-horizon structure merits
an owner-reviewed blog with this report. The owner was notified; publication remains
outside this assignment.
