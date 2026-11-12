# Study B magnitude supplement: a fresh bounded correction

2026-11-11. SOAM-070 is the protocol/RFC and named routing decision, based on
completed SOAM-068 evidence. SOAM-071 implements; SOAM-072 measures; SOAM-073 reviews
both versions. Classification: essential next to complete the owner's requested
magnitude-dependent correction comparison. SOAM-069's revise and v1's measured
tradeoff are preserved, not converted into a pass. No other experiment is selected.

## Why this supplement

[V1](STUDY_B_PROTOCOL.md) completed valid execution and an exact repeat. Its affine
sigmoid gates receive signed residuals/actions and cannot directly express a
sign-invariant magnitude rule. The owner requested gains depending on action
magnitude and prediction error. This is a concrete coverage/representation limit,
not permission to tune until a positive result appears. One bounded supplement
adds the missing magnitudes, with fresh streams and a frozen new comparison. No
threshold or outcome in v1 changes. No additional extension follows automatically.

## Interfaces and inventory

Keep the same E1-family task, evidence ordering, targets, fixed sensory projection,
physical roles, six schedules, nine conditions, no-write boundaries, training loss,
1200-update common decay, learning rates, ridge penalties, 20 episodes/cell and
64-step evaluation. Reuse v1's training-only variance normalization. The statistical
units remain ten independent paired roots. The [manifest](protocols/study_b_magnitude_v1.json)
owns all roots, counts and caps.

Seven candidates: PC16, PC32, GA32, GN32, GMN32, AMN32, FILTER2. PC16/32, GA32 and
FILTER2 are unchanged functional forms, freshly fitted. No checkpoint transfer.

GN32 is the same GA32 ordinary core and scalar sigmoid sensory gate, but appends
`residual_rms = sqrt(sum(mask * residual**2) / max(sum(mask),1) + 1e-12)` and
`action_norm = sqrt(sum(action**2))` to its existing [mask,residual,prior,action]
gate input. These are computed from permitted information, not corruption labels.
Two additional fitted coefficients and norm arithmetic are counted. The epsilon
only makes the residual derivative finite. Gamma still lies in [0,1].

GMN32 additionally receives nominal noise SD, as the explicitly supplied-reliability
comparison. AMN32 uses GN32 sensory correction plus independent beta in [0,2],
whose sigmoid input is [previous state, action, known role, action norm]. Its beta
multiplies only the action affine. The initial beta remains 1 and gamma 0.5.
All candidates have one posterior state. No confidence probability, new memory,
settling mechanism, attention, persistent online update or oracle is introduced.

## Fresh streams and bounded fitting

Map each nominal root r to `derived_seed("soam-study-b-magnitude",1,"root",r,0,"mapping")`
before passing it to v1's train/development/confirmation generator and initialization
seed derivation. This gives new component/split streams without altering v1's
historical generator. Record nominal and effective roots. Development roots 13103,
13109; confirmation 14207,14221,14243,14249,14251,14281,14293,14303,14321,14323;
repeat 14207. No confirmation generation precedes the immutable receipt.

Each candidate gets two development settings and the same training records.
Choose lowest mean J, numeric setting order breaks ties. The >20% late-improvement
flag from updates 1050 to 1200 applies to GN32, PC32 and GA32. No extra training,
configuration, architecture or retry is permitted. Fixture: seven 20-update fits;
development 28 fits; confirmation 70; repeat seven = **112 additional fits**.
All primary controls are mandatory; no best-confirmation model replaces GN32.

The original owner-approved **cumulative** ceiling remains 7200 CPU / 14400 execution
wall seconds, 2 GiB peak RSS and 2 GiB artifacts across v1 and this supplement.
Import the full closed v1 allocation, including its report and calibration audit.
Deduct v1 raw and compact artifact bytes from the available artifact allowance.
Fixture projection uses 1.5x timing/storage and 1.25x RSS margins; reserve 10% CPU.
A failed projection or exhausted budget yields incomplete/inconclusive work; no
further scientific extension. Local engineering tests/review remain separately
reported. Preserve old source and archive the supplemental source before fitting.

## Frozen primary rule and diagnostics

Primary J and guards are exactly v1's definitions, but compare **GN32 against PC32
and GA32**, not the old MIX32. Require >=10% paired gain, adjusted lower bound >0,
width <=0.40 for both; GN32 mean J<=0.15; finite inference; resolved finite optimization
screen. For each control, candidate-minus-control upper bound must be <=0.01 for
clean, corrupt, true-change and initial-only free32. Two gains plus eight guards
form a ten-contrast Bonferroni family with 20,000 bootstrap samples. Inference seed
15307 is fresh. Classification priority: invalid/incomplete; unresolved competence,
optimization or precision; supported; confidently harmful guard/tradeoff; precise
exclusion of the 10% practical benefit; otherwise inconclusive. Report all intervals,
including failed guards. These are engineering thresholds, not biological constants.

Mandatory secondary comparisons: GMN32 versus GN32 (supplied reliability), AMN32
versus GN32 (motion coupling), GN32 versus original GA32 (magnitude representation),
and all models against PC16/FILTER2 for robustness/resources. Do not pool v1 and
supplement roots or reuse one version's confirmation as the other's development.
Ordinary 95% intervals are descriptive for secondary endpoints. Report norm/gain
response diagnostics, correction/free/gap/recovery errors, data and fitting exposure,
parameter/state/MAC/CPU costs and fresh-input/checkpoint/trace/prediction repeat hashes.
The first study's settling and biological analyses remain evidence for those questions.

The final interface recommendation must discuss both versions, include simple-filter
corruption failures, distinguish supported benefit from a tradeoff or negative result,
and acknowledge that a finite ordinary-RNN search does not prove necessity against
all possible conventional recurrence. No remote publication is authorized.
