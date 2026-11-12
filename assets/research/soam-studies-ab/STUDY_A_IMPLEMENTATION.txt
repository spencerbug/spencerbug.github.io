# Study A implementation and execution history

2026-11-11. Owners: SOAM-062/063/064. Historical E1 source and evidence are retained.
This engineering record accompanies [Study A v2](../docs/STUDY_A_PROTOCOL_V2.md),
not a new positive scientific gate. The final scientific report owns interpretation.

## Source and interfaces

Implementation: `soam/gating/{models,data,engine,diagnostics,runner,statistics,render}.py`.
Model operations accept masked sensory features, validity, transient hidden state,
actions and supplied role flags. Free rollout does not accept target tensors.
Grounded rollout accepts actual observations only after scoring the corresponding
prediction. Training receives observed records; diagnostic probes alone receive
simulator coordinates. No persistent writes occur during any evaluation.
The historical `soam/shared` implementation is unchanged.

`alpha` means update rate; PyTorch/E1 GRU `z` means retention (1-alpha). FU and FR
are trained constant logits, not frozen-at-test gates. Removed gate matrices are
absent. FR can be folded into an exactly equivalent gated leaky tanh core by
absorbing constant reset coefficients and redundant biases. The folded model is
implemented and tested; no independent duplicate GL trial was selected.
L2 learns its PCA subspace and bilinear transition from the same clean training
observations as L12; its two-dimensional bottleneck is a declared structural prior.
The fixed sensory projection remains the E1 12-by-2 map (seed 1729).

## Versioned calibration

V1 source commit: `f89751537bb22f8ad30610599b3a8e38845f854d`.
V1 source aggregate: `99efdb3e1f86bf719a714ecd405c7c08865685838a1d621f72811efa9df0a5fa`.
All 12 fixture and 48 development fits completed. R52/R55 still improved by
33.28%/55.64% in selected mean development J between updates 600 and 800, above
the declared 20% unresolved-optimization flag. V1 stopped before confirmation;
its results remain under `runs/study-a-v1`, with `closed.json` recording the reason.
No failed scientific hypothesis is inferred from this calibration outcome.

V2 development source commit: `7ed78f9` (full identity in raw source provenance).
Every candidate receives 1600 updates' worth of observed archives, compared with
800 in v1; neural optimizers use the same fixed cosine decay during the last 800
updates. The two base learning rates, ridge penalties, all widths, endpoints,
primary comparison and guardrails remain unchanged. V2 uses a new namespace
version and fresh development/confirmation roots. V1 cost is carried forward into
the original 3600 CPU / 7200 wall second and 2 GiB RAM/artifact ceiling.

V2 development completed 48 fits. The selected G32/FU38/R52/R55 late improvements
were 2.17%, 5.81%, 5.59%, 13.78%, below the 20% screen. All neural candidates select
base LR 0.01 with the declared decay; both ridge candidates select 0.0001. Passing
this finite screen does not establish globally optimal training or eliminate all
initialization/optimizer confounding.

## Receipt failure and exact source amendment

The first v2 freeze failed before generating any confirmation data: a NumPy boolean
in the resource-pass field was not JSON serializable. The failed freeze consumed
1.030256 CPU seconds and is preserved as `freeze-failed-serialization`; the ledger
retains that failed attempt. It is an orchestration failure, not a failed fit.

Reviewed source amendment `study-a-v2-receipt-repair-1`, commit `44824b7`, converts
that field to a Python boolean, corrects a fixture-budget display subtraction,
and permits only an exact, primary-reviewed source identity amendment. Regression
tests cover serialization and rejection of an unmatched amendment. Model,
optimizer, data-generation, evaluation, diagnostics, statistics and protocol hashes
are unchanged relative to v2 development. Original source and changed-file snapshots
are both archived. The amendment is not a silent retry or a scientific design change.

Confirmation source aggregate:
`6e05f7437dc1f37527da85cf0c4231fd0dcba082ec5747f8b4f141e534c43959`.
Immutable receipt structured-content SHA-256 (runner.digest, excluding its sha256 field):
`e51ce6c25e0f4dd56864672ac8fe64f1d488bba7ee726d9ee0706d7ec1acefc8`.
The explicit pre-confirmation review records 1263.88 projected CPU seconds versus
2867.91 remaining after reserve; 1,920,434,664 projected artifact bytes versus
2,147,483,648; and observed peak RSS 1,288,273,920 bytes (1.25× remains under cap).
The original v2 fixture display overstated remaining CPU by the already-spent
123.03 seconds, while runtime enforcement used the cumulative allocation. Its
preserved display audit confirms that feasibility still passes after correction.

## Verification and reproduction procedure

Baseline before code: 190 passed in 33.08s. V2 before receipt repair: full suite
214 passed in 26.11s. After repair, 25 Study A tests passed in 1.45s; final full-suite
result: **215 passed in 24.83s**. Completion checks are recorded in
[verification.json](study-a/verification.json). Tests cover independent
GRU/S32 equations, trained/frozen/dynamic gates, exact algebraic FR folding,
parameter/MAC matching, independent stream domains, masked cues, simulator updates,
no future-target access, no-write inference, diagnostic-only labels, deterministic
fits, root-level decisions, resource stopping and the common decay schedule.

The default uv cache was inaccessible. Commands use the existing environment with
`UV_CACHE_DIR=/tmp/soam-uv-cache uv run --offline`; this changes no package versions.
The source archive and uv.lock preserve the runtime dependency contract.

Fresh full reproduction with the *current v2 source* uses an unused output directory
and the phase order `fixture`, `development`, `freeze`, `confirmation`, `repeat`,
`report` through `python -m soam.gating.runner --phase PHASE --output NEW_DIRECTORY`.
The manifest deliberately imports the closed v1 allocation; reproduction never
renews the authorized experiment budget. Such a full new execution is not run here.
The prescribed root-9301 repeat instead reuses its archived input batches in the
same allocation. Existing phase directories refuse overwrite. Archived development
source can reproduce the original receipt failure; use the recorded source amendment
for the corrected orchestration. No cloud/GPU execution or remote publication occurs.
The final [resource ledger](study-a/resource-final.json) includes preserved v1,
all v2 phases and compact report storage. The receipt file-byte SHA-256 is
`8b0af3e98d970320acd8b7bd95173b17602d68e20557490b2030bc0f7a62ee20`;
this differs intentionally from the structured-content digest above.

Local Qwen extraction returned truncated, temporally confused evidence and was
rejected. Its later harness review proposed an unrelated directory-listing command;
that pending action was rejected and never executed. Direct equation/evidence review
and deterministic tests supplied verification. Worker inference and repository tests
are engineering work, separately from the numerical trial ledger.
