# Study C decision — retain compact conventional inference and a fast recurrent alternative

November 14, 2026. SOAM-081: **proceed with acceptance of the scoped C-H1 result and
reference recommendations only**. The [report](STUDY_C.md) and
[frozen statistics](study-c/statistics.json) support a neural factorization benefit,
precisely exclude the declared practical conventional multiplicity benefit, and
retain a substantial coherent-cause uncertainty failure. No next experiment is selected.

## Answers to the five research questions

1. **Did explicit candidate states improve inference?** Yes within the tested
   recurrent family: TWO16 improves primary Brier over PC16 by .02048
   [.01684, .02453], exceeding the frozen .01 minimum with all guards passing.
   Conventional retained multiplicity adds only.00157 [.00136, .00183] over the
   collapsed ADAPT1 control: real, precise, and below the declared practical threshold.
2. **Did the neural benefit survive the larger capacity control?** Yes. TWO16 and
   PC32 each retain 32 hidden values plus support. The Brier gain is .01819
   [.01505, .02204]. PC32 was selected over PC40 on development, and its fitting
   convergence/competence checks passed. This does not isolate storage alone:
   explicit conditional action semantics, decoder structure and optimization are
   part of the factorized treatment. A single vector could in principle encode it.
3. **Did recurrent states beat a conventional mixture?** No declared practical
   accuracy gain: TWO16 over ADAPT1-M is .00029 [-.00032, .00083], precisely below .01.
   TWO16 is nevertheless about 3.5 times faster at the measured serial p95, while
   ADAPT1-M has lower feature prediction error, fewer fitted coefficients and much
   cheaper fitting. Report the tradeoff instead of selecting by Brier alone.
4. **Did models remain uncertain when truth was unidentifiable?** TWO16 and the
   conventional models preserve (.5, .5) in the nominal paired ambiguity conditions;
   learned single-state heads show excess certainty. **No general pass:** on the
   identical-evidence genuine-change/coherent-fault pair, TWO16 and ADAPT1 variants
   are highly overconfident, with paired post-change Brier about .445–.450 versus
   the .25 information-limit optimum. More candidate states do not supply missing
   information or represent an omitted fault cause.
5. **What warrants selective computation next?** Nothing in this experiment
   establishes it. All states were fully updated; no complementary-object or
   scheduling control ran. TWO16's p95 overhead over PC32 is only about 12% here.
   The unresolved coherent-cause failure concerns model assumptions and information,
   not demonstrated wasted unattended computation. Defer C-H2 and C-H3.

Intervals above are family-adjusted, except descriptive runtime comparisons.
Negative practical evidence is scoped to the tested task, finite mechanisms and
resource allocation; it is neither zero effect nor universal single-state sufficiency.

## Simplest supported architecture for this task

Use **ADAPT1-C** as the compact robust conventional reference when retained state,
training cost and prediction accuracy matter: one two-dimensional mean, covariance,
reliability scalar and support log odds. Its eight retained numerical scalars include
all those quantities. It still computes two temporary candidate predictions/corrections
per step and moment-matches them; this recommendation does not eliminate explicit
candidate knowledge, evidence scoring or transient branching.

Retain **TWO16** when this Torch implementation's inference latency matters. It uses
one shared ordinary PC16 function, two separate 16-value transient states and support.
Its additional state over PC16 earns a supported probability-quality benefit; the
same total hidden width in PC32 does not account for it. It has many more fitted
coefficients and higher offline fitting cost than the conventional alternative.
It is shared-parameter, separate-state inference, not a shared-neuron result.

ADAPT1-M remains the explicit conventional-trajectory reference for future selected
comparisons, preserving its modest delayed-cue benefit. FILTER2-C/M and NISEMP-C/M
remain historical-continuity controls with the measured robustness differences.
The collapsed filter's storage saving does not imply a proportional runtime saving:
both conventional variants execute two temporary branches and probability scoring.
No globally minimal architecture or exact information-resource equivalence is claimed.

Essential next work for this assignment is complete: protocol, observability,
tested implementation, finite development, fresh confirmation, uncertainty/cost
analysis, exact repeat and this interpretation. Parallel research ideas only include
the effect of stronger single-state structural constraints or coherent-fault cause
models; they are not selected experiments. C-H2/C-H3 and richer integration remain
future capabilities, with no new ticket automatically activated.

## Conditional scheduling gate, without implementation

A later owner-selected study would need a new protocol and complementary components
that can both exist and move independently. Their existence cannot be forced into
one mutually exclusive distribution. Fix the selected representation first and
cross observation availability with computation allocation. Compare full updates,
freezing, motion-only tracking, uniform/round-robin, and a simple uncertainty or
innovation rule at a frozen resource budget. Beating freezing alone is insufficient.

Count deferred/catch-up work, candidate association, state/covariance/confidence
storage, tails and all supplied focus schedules. Test continuity after attention
switches, stale-state error, interference and long-horizon drift. No reset may use
ground truth. Keep sensory priority, motion-update priority, inference budget and
attention priority independent before assigning primed/tracking/attended labels.
A learned controller requires a measured limitation of those simpler schedules
and another explicit routing decision. This document selects none of them.

## Validity and historical gates

All 67 fitted executions completed; no scientific run or root was excluded. Ten
independent confirmation roots and the preselected repeated root used the sealed
source/configuration receipt. Four base-fit inputs, tensors and traces and 1530
prediction arrays reproduce exactly; independent reduction checks 810 values to
1.6653e-16. Resource limits pass, including the disclosed short-fixture RSS
underestimate corrected before confirmation. The full core suite passed 285 tests.
Secondary calibration/information-limit analysis and plot layout repair add no fit,
new confirmation stream, threshold relaxation or selected mechanism.

Historical SOAM-052 stays stop, SOAM-069 stays revise, and A/B/B2 conclusions retain
their meanings. SOAM-037 is not reactivated; its useful-sharing prerequisite is
unsatisfied. SOAM-053 supplied conceptual observability guidance only. Acquisition,
object memory and all other branches remain unselected. Completing C-H1 does not
authorize scheduling or the rest of the A–F sequence.

The owner was notified that the neural benefit/conventional alternative and the
coherent-cause failure warrant a joint blog/report discussion. Publication remains
separate; no remote issue, blog post or push was performed.
