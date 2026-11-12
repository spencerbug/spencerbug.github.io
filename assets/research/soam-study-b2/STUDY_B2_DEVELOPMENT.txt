# Study B2 development routing (not confirmation)

2026-11-12. SOAM-076. Entries below record successive decisions before confirmation.
 Phase 1 complete on fresh development roots 15101/15107;
12 paired episodes/cell. Original and solve/Joseph controls agree to numerical
tolerance. Full record: `runs/study-b2-v1/screen1/summary.json` and individual cells.
No confirmation stream has been generated. Frozen targets are unchanged.

| Candidate | J | Balanced C | Original corruption | Genuine change |
| --- | --- | --- | --- | --- |
| FILTER2 | .04594 | .24077 | .43408 | .05225 |
| PC16 | .05996 | .13724 | .12591 | .10041 |
| R100 | .01757 | .10687 | .12606 | .08999 |
| GAIN25 | .01526 | .05607 | .06127 | .18950 |
| NIS99 | .02533 | .02966 | .00224 | .46724 |
| NISEMP | .04531 | .12739 | .02400 | .05225 |
| HUBER99 | .03976 | .18174 | .22513 | .05274 |
| CHANNEL2 | .03556 | .15848 | .19456 | .05324 |

Fixed conservative correction improves ordinary high-noise performance and
corruption, but fails the genuine-change target. Nominal NIS reject-all rule has
excellent sensor-fault rejection and severe change delay. Empirical NIS retains
change performance and meets proposed ordinary/original-corruption targets, yet
sustained coherent corruption stays .49610. Huber's one-step R inflation is too
weak relative to this model's large process covariance. Channel weights help
partial-channel faults, without making them a general reliability detector.

## Phase 2 selection BEFORE extension implementation

Choose exactly two extensions, within the existing allocation:

1. **ADAPT1/ADAPT05:** infer scalar R from the innovation component orthogonal to
   the fitted observed H. Let d=number valid, u=least-squares state displacement,
   e=masked(r-Hu), s=clip(||e||²/(d-2),1e-4,.25). With >=3 channels and full rank,
   Rnext=alpha*s+(1-alpha)*Rprevious, alpha in {1,.5}; otherwise use previous R.
   Use Rnext in both gain and Joseph covariance. All observed innovations enter,
   regardless of correction acceptance. Missing events retain R. One bounded
   scalar of transient history; no persistent fitting. This addresses identifiable
   heteroscedastic/independent faults without mistaking an in-subspace change for
   measurement noise. It is a heuristic plug-in covariance, not unbiased Bayesian
   uncertainty. T9 and sparse-mask tests expose assumptions.
2. **TEMP2/TEMP3:** NIS99 plus a causal persistent-change rule. A suspicious cue
   must have orthogonal residual variance<=.0025 and projected displacement within
   .15*max(1,||u||) of the last displacement propagated through fitted action Jacobians.
   Accept on 2 or 3 such consecutive sensed cues. Reset the count on incompatible
   evidence, ordinary accepted cue, or >16 physical steps without a cue. Store
   displacement 2,count,age (4 scalars); no second state/covariance filter. A sustained
   coherent sensor alternative can pass exactly like a real change; test that failure.

These target distinct diagnosed failures; no Student-t/mixture or neural controller
is implemented. Heavy-tail Bayesian filtering remains a plausible future comparison,
not disproved by this selection. The two-extension cap prevents filling the backlog.
One hybrid may be selected only after these separate results. Primary confirmation
challengers are not yet selected. A coherent indistinguishable event cannot be fixed
by a more expressive single-state classifier without extra assumptions.

## Phase 2 results and Phase 3 routing — before hybrid evaluation

ADAPT1: J=.020267, C=.103024, corruption=.009778, change=.052321.
ADAPT05: J=.018673, C=.105906, corruption=.019331, change=.052296.
TEMP2: J=.025327, C=.070223, corruption=.002236, change=.175547.
TEMP3: J=.025327, C=.055107, corruption=.002236, change=.267183.

Current-snapshot disagreement (ADAPT1) wins the registered corruption selection
among adaptive settings, with good change tracking. EWMA has slightly lower ordinary
error but higher corruption error and more history dependence. Temporal rescue helps
change substantially versus NIS99, yet remains far above the .07 target and accepts
sustained coherent false evidence. These are development findings only.

Select the single permitted hybrid ADAPT1+TEMP2: adaptive R from all current
orthogonal residuals, then NIS99 under that R and the same two-cue temporal rescue.
Keep original constituents for comparison. The hypothesis is that reliable-noise
adaptation complements rejection of isolated coherent snapshots; the anticipated
change latency remains a serious risk. One fixed configuration, no new tuning.

## Phase 3 result and final selection

HYBRID: J=.020329, C=.075049, corruption=.003768, change=.175503.
It does not improve C over TEMP2 and fails the unchanged genuine-change .07 target.
Do not carry it or temporal rescue into confirmation; retain these negative screens.
No additional mechanism or setting is added.

Primary challengers: **ADAPT1** and **NISEMP**, the two distinct eligible mechanisms
with smallest C. Final eight-model inventory: FILTER2, STABLE, PC16, R100, NIS99,
CHANNEL2, NISEMP, ADAPT1. R100 is the best single-factor covariance control; NIS99
and CHANNEL2 preserve hard-versus-soft and whole-vector-versus-channel comparisons.
ADAPT05 is not separately confirmed because it duplicates the adaptive family with
slightly worse C. The frozen confirmatory family has 12 contrasts (6 per primary).

Before confirmation, a secondary recovery audit found that isolated/coherent faults
on irregular schedules can occur after time 24. Confirmation uses actual first
corrupted observation and fixes the baseline to eight PRE-onset steps, including
when measuring recovery after fault end. Development recovery fields are retained
as exploratory fixed-window diagnostics; no primary/selection metric changed.
