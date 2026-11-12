# Study B implementation and verification

2026-11-11. SOAM-067 implements [Study B v1](../docs/STUDY_B_PROTOCOL.md).
Source: `soam/temporal/{data,models,engine,runner,statistics,render}.py`; historical
E1 and Study A implementation files are unchanged. Initial source commit: `0e03e0d`;
full source identities and snapshots live in `runs/study-b-v1/source.json` and
`runs/study-b-v1/source/`.

The data generator owns truth. `Evidence` contains observations, validity masks,
actions, known roles and nominal noise SD, with no target or world state. Rollout
records the predicted output before accessing the current observation. MIX models
recompute the posterior from the previous state; the prediction branch is charged
as computation and is not an additional executed physical movement. Correction
and zero-time internal updates are distinct. Linear controls learn their sensory
basis from training feature targets; the filter's covariance is transient.

Baseline before implementation: `uv run pytest`, **215 passed in 20.38s**. New
invariant tests: **18 passed**, covering causal observation access, identical
scheduled evidence, missing masks, equal physical roles, independent streams,
zero-time/no-cue settling, mixed-update equations, independent gain channels,
no-write fitting/evaluation boundaries, deterministic fit/data hashes, continuation
budgets, recovery censoring, independent-root inference and artifact limits.
Full suite: **233 passed in 15.61s**; Ruff and the 70-ticket validator pass.

The 16-candidate fixture completed without failed fits. `fixture-projection.json`
records 1555.57 projected CPU seconds, 839,313,600 projected artifact bytes, and
300,531,712 observed peak RSS; the stated margins pass the owner ceiling. The
fixture consumed 1.172013 CPU / 1.175647 wall seconds and generated 1,384,984 bytes.
Fixture errors are not scientific evidence or architecture-selection data.

Local Qwen bulk extraction returned an empty, uncited synthesis and was rejected.
A bounded little-coder read-only protocol review terminated at its output limit
without findings or pending actions. No worker action was approved or executed;
direct contract/equation review and tests supplied verification. Local inference
and repository tests are engineering costs outside the numerical experiment ledger.

Reproduction command sequence uses a new output path and the phases `fixture`,
`development`, `freeze`, `confirmation`, `repeat`, `report`:

```sh
uv run python -m soam.temporal.runner --phase PHASE --output runs/NEW-STUDY-B
```

Each phase refuses reentry. The immutable receipt pins source/protocol and all
settings before confirmation generation. Numerical input/checkpoint/trace/prediction
hashes must agree in the prescribed first-root repeat; timing is excluded. A new
full run is additional compute, not a renewal of this study's consumed allocation.

The MAC ledger estimates model inference arithmetic and omits evaluator-only
readouts/trajectory retention, elementwise nonlinear operations and small matrix
solves. Measured evaluation CPU includes those diagnostics and Python orchestration;
it is not an isolated production-inference benchmark. Logical recurrent state is
reported separately from the previous/prior workspace, current evidence (12 values,
12 mask bits, 3 actions, 2 role values, 1 nominal SD), decoded prediction, residual
and gain scalars. No hidden state clone persists as an additional hypothesis.
Full supervised training histories and optimizer/autograd buffers are engineering
working memory; peak RSS captures their process cost. FILTER2 allocates the common
linear-control buffers (including an unused historical cue map); actual persistent
bytes count them all, while inference-used coefficients are identified separately.

The initial biological note covers theta-phase manipulations, fly heading dynamics,
corollary discharge, conflicting accounts of mismatch responses and human state
estimation. It is a focused primary-source synthesis, not a systematic review or
biological validation of the benchmark.

## Completed execution and magnitude supplement

SOAM-068 completed v1's 256 fits and 80 exact repeat checks. SOAM-069 preserves its
tradeoff result and identifies the signed-input limitation. SOAM-070–072 deliver
one fresh bounded magnitude comparison in `soam/temporal/magnitude.py` under the
original cumulative cap. `tests/test_temporal_magnitude.py` adds five invariant
tests: norm inputs are permitted information, paired initial cores, independent
motion gain, stream separation and the new frozen decision rules. The pre-change
suite was 233 passed; the completed suite is **238 passed**.

The supplement source commit is `21084476c334dd4d683dde056f0522ad3947b547` and its
aggregate fingerprint is
`7c2b3d21e32ea875f5ae9e7914fd4e099bb57ceaa8abe68163fc5ebc77d8833b`.
All 112 additional fits complete without failure; all 28 repeat checks match.
Run the same six-phase sequence with `soam.temporal.magnitude` in place of
`soam.temporal.runner` and a separate output path. It imports the completed v1
ledger; preserve the original run directory when reproducing this cumulative study.
Source snapshots, data hashes and immutable receipts are retained for both versions.
The report CLI phases refuse reentry as well as numerical phases.

Independent postprocessing is separate from frozen fitting source:
`scripts/audit_study_b.py` independently reduced 1920 v1 values and audited filter
calibration; `scripts/finalize_study_b.py` reduced 840 supplement values and checked
all original source dependencies. All reductions agree. The latter transparently
repairs only recovery reporting, using the eight steps before disruption instead
of the potentially impaired interval before resumption. A synthetic diagnostic
case verified the three-step recovery and right-censoring rule. Original recovery
records and primary results are unchanged. The scripts record their own fingerprints.
They are one-shot audit scripts; rerunning finalization appends another charged
audit entry, so do not invoke it merely to read its saved results.

`scripts/plot_study_b.py` regenerates presentation figures from saved statistics;
legends and 95% intervals make dense candidates readable. Resource, settling,
condition, stress-response and supplement tradeoff PNGs were visually inspected.
The completed [resource ledger](study-b/resource-final.json) records 1422.60 CPU
seconds, 1422.72 execution wall seconds, 0.822 GiB peak RSS and 0.517 GiB artifacts,
including raw and compact duplicates at audit close. This is one cumulative
allocation with 368 fits, no exclusions and no numerical retries. Tests and
language-model review are separately identified engineering costs. Final command
outputs are captured in [verification](study-b/verification.json).
