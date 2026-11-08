# E1 archive correction A1 — SOAM-061

Defined 2026-11-06 before replacement calibration. This versioned engineering
addendum supplements E1 scientific protocol v1; it does not change its stream
version, 119 fits, 27,820 cells, data exposure, models, thresholds or budgets.
The failed v1 ledger remains at reports/shared-population-harness/preflight-cost-ledger.json.
Scientific execution requires SOAM-061 proceed plus a passing A1 calibration.

Store immutable observed/clean/evaluator input batches in a run-owned object store.
The SHA-256 identity covers named tensor shapes/dtypes/values and canonical stream
metadata. Each fit/cell directory records the object digest and manifest digest in
input-ref.json. Objects retain the existing four-file input format; observations,
clean learning records and evaluator truth remain separate. Model APIs are unchanged.
Readers receive the store root explicitly; references cannot choose a filesystem
root. Digests must be 64 lowercase hexadecimal characters. Reject symlink objects,
unexpected files, mismatched manifest or file hashes and incomplete objects.
Verify existing content before reuse; a mismatch stops execution without overwrite.
This single-writer format does not support concurrent writers or garbage collection.
Failed attempts and partially written objects remain charged to the enclosing run.
Object-store writes and reference writes use the same bounded Budget owner.

Replay resolves and verifies archived references, then restores arrays without
simulator regeneration. Checkpoints, optimizer state, loss traces and predictions
remain separate per fit/cell. Reusing inputs does not merge statistical replicates.

Project 13 distinct training roots (three development plus ten confirmation), each
with 400 recall and 300 transition batches. Configurations and families reuse these
inputs; the seed-11 repeat restores the original input objects. Charge all 119 fits
for checkpoints/traces plus 700 references of at most 1,024 bytes each. Add 4,096
bytes per unique batch for object manifests. Retain the old conservative maximum
transition payload/input allowance for every scoring cell; no cell is dropped.
Keep the 64 MiB miscellaneous allowance and apply the original 2× margin to all
terms. Calibrate fresh object writes, not only cheap reference reuse. All original
timing, memory, phase and total ceilings still apply. Artifact counts are physical
bytes, while exposure counts continue to describe every fit's observations.

Alternatives: raising the budget is unnecessary before testing avoidable duplication;
assuming compression of unfitted arrays is unsafe; storing only random seeds would
not satisfy replay from archived inputs. This correction therefore preserves full
inputs and all outputs while removing repeated physical copies of identical inputs.
