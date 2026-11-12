# Study B decision: separate correction with independent controls

2026-11-11. SOAM-073: **proceed with this interface recommendation**, accepting the
completed bounded study. This is not a pass for adaptive gating or useful sharing,
and selects no new experiment. SOAM-069 remains revise for v1's missing magnitude
comparison; SOAM-070–072 complete that comparison on fresh streams. SOAM-052 remains
stop, and SOAM-039/acquisition and other conditional branches remain unselected.

## Evidence and choice

Choose **option 2: a separate sensory correction operation**. Use the 16-unit
ordinary PC16 as the small robust neural reference. Keep FILTER2 as a mandatory
simple alternative when its low-dimensional dynamics and observation assumptions
are suitable. The [scientific report](STUDY_B.md) contains both versions, all
controls, uncertainty, resource costs and failure analysis.

| Candidate interface | Evidence in the bounded task | Decision |
| --- | --- | --- |
| Continuously mixed recurrence | MIX16/32 and extra-compute MIXC32 have worse prediction than separate correction | Retain as controls; no claim against all conventional RNNs |
| Separate fixed correction | PC16 gives J≈0.0624–0.0628, corruption≈0.110–0.111, 1340 fitted scalars, 718 linear MAC/step | Default neural reference |
| Periodic/event-driven snapshot plus settling | SET32 initially improves with extra iterations, then saturates; gains over cheap PC16 are uncertain and corruption is worse | Optional bounded refinement, zero iterations by default |
| Adaptive evidence source | V1 is a tradeoff; fresh magnitude gain is 1.61% versus PC32 and 0.035% versus GA32, both precisely below the frozen 10% practical benefit | Expose the channel; learned gating is not required |
| Learned two-state filter | Best J≈0.0418–0.0435 and free32≈0.012–0.013 at about 110 linear MAC/step, but corruption≈0.376–0.380 | Strong accuracy/resource reference with disclosed robustness failure |

The ranges above describe two separate root sets, not pooled confidence intervals.
The filter is fitted from the same observed feature targets, not simulator equations.
Its supplied two-dimensional structure and nominal-noise assumption are explicit.
Six observed features usually identify the two-dimensional state, limiting claims
about severe ambiguity or associative pattern completion.

GN32's family-adjusted gain versus PC32 is 1.61% [0.52%,2.68%], versus GA32 0.035%
[−0.008%,0.088%]. All eight supplement guard margins pass. V1 GA32's corruption guard
fails decisively. These are a precise negative practical-benefit result and a
tradeoff respectively, not universal evidence that adaptive gains cannot help.
The conventional alternative remains mandatory: the finite matched inventory does
not establish that temporal structure is necessary for every learnable recurrence.

Independent motion coupling reduces corruption and genuine-change errors in the
secondary comparisons, with no resolved primary gain. PC16's selection is an
explicit post-study simplicity/robustness judgment, accepting its modest primary
accuracy disadvantage to larger adaptive models and its free-prediction disadvantage
to the filter. It is the smallest tested neural width, not a global minimum.

## Recommended sensory/motion control interface

Keep one transient posterior state and immutable persistent parameters during
inference. Distinguish the temporary prior and its decoded prediction from the
posterior. The concrete contracts already implemented in `soam/temporal/` are:

1. `predict(previous, action, role)` returns the prior and motion gain. Apply action
   once per physical interval; record the decoded prediction before reading the
   new cue. Motion gain scales the action contribution independently of correction.
2. `correct(prior, ..., observation, mask, nominal_sd)` forms a masked residual and
   returns the posterior plus sensory gain. An absent observation leaves the prior
   unchanged. Reliability metadata must be labeled supplied; an unflagged corrupted
   observation cannot be presumed reliable because its residual is large.
3. `settle(posterior, ...)` performs optional bounded internal updates with no action
   execution or physical-time advance. Log reconstruction and subsequent prediction
   separately, along with every update and its cost.

For PC16, use the tested fixed sensory gain 0.5 and motion gain 1, with the tested
0.5 recurrent leak. These coefficients have different roles; they are not a claim
that action and sensory features deserve equal neural populations or information
weight. Default extra settling is zero. A measured deployment-specific benefit
would be needed to select a nonzero budget or event-driven continuation. Fixed
periodic schedules and a learned halt head did not establish a necessary benefit.

The current benchmark has unit physical intervals. A future variable-`dt` interface
must declare how action and time enter prediction and test that contract; these
results do not validate arbitrary time discretization. Optional covariance or
confidence must live in explicitly counted transient state. FILTER2's covariance
has task-dependent miscalibration; neural gamma/beta are control coefficients, not
probabilities. No extra persistent online updates, multi-hypothesis attention or
future framework implementation is included.

## Completion, limitations and research communication

The execution is valid and complete within its declared resources: 368 fits,
108 exact repeat hash checks, and independent reduction of 2760 endpoint/guard
values. A transparent post hoc repair uses pre-disruption recovery baselines;
original records remain available and no primary decision changes. The
[implementation record](STUDY_B_IMPLEMENTATION.md) and
[cumulative ledger](study-b/resource-final.json) identify source commits, seeds,
numerical settings, exposure and timing. The final suite has 238 passing tests.

The biological note distinguishes experimental phase/path-integration/corollary-
discharge findings from engineering analogy. It supplies no biological validation
of this network and no reason to impose a theta-like clock.

This result merits a joint report/blog treatment: good prediction under ordinary
sensing and resistance to corrupted evidence are separate design goals, and a
simple learned filter can excel at one while failing the other. That is measured
within this benchmark; broader neural/biological claims remain hypotheses. The
owner was notified during execution. Publication is not authorized or performed.
No further experiment is selected by this decision; any next fork requires a
fresh routing record based on the completed evidence.
