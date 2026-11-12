---
layout: page
title: "SOAM Studies A and B Results Report"
permalink: /research/soam-studies-a-b/
description: "Methods, complete model comparisons, uncertainty, decisions, resources, and archived evidence for adaptive recurrent gates and temporal sensory assimilation."
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
{% include soam-studies-nav.html %}

<p class="e1-status"><strong>Follow-up, November 12:</strong> <a href="{{ '/research/soam-study-b2/' | relative_url }}">Study B2 adds robust Kalman correction results</a>. Its fresh evidence does not alter the frozen A/B records below.</p>

**Completed November 11, 2026.** Study A leaves the declared practical adaptive-update advantage **inconclusive**. Study B v1 finds an accuracy/robustness **tradeoff**; its fresh magnitude supplement yields **negative practical-advantage evidence** against the declared 10% gain. The retained interface separates prediction, sensory correction, and optional internal settling, with PC16 as the small robust neural reference and FILTER2 as the strong accuracy/resource reference.

This is the detailed companion to the [A/B article]({{ '/blog/soam-studies-a-b-gates-and-correction/' | relative_url }}) and the first results installment of [Studies A–F]({{ '/research/soam-studies/' | relative_url }}). These user-requested studies branch from E1 under new protocols. Historical E1/SOAM-052 remains **stop for its tested useful-sharing claim**. No next experiment is selected here.

<nav class="e1-toc" aria-label="Report contents">
  <a href="#study-a-design-and-results">Study A</a> ·
  <a href="#study-b-design-and-results">Study B</a> ·
  <a href="#the-magnitude-supplement">Magnitude supplement</a> ·
  <a href="#retained-interface-and-limits">Decision and limits</a> ·
  <a href="#execution-and-reproducibility">Execution</a> ·
  <a href="#evidence-downloads">Evidence downloads</a>
</nav>

## Shared task and statistical interpretation

The simulator has a two-dimensional physical state, three action channels, supplied recall/motion roles, and a fixed twelve-feature sensory projection. Models receive observations and masks, actions, and declared metadata. They do not receive true coordinates, the simulator equations, or a supplied projection inverse. Clean feature targets supervise offline training; persistent parameters are immutable during inference. Diagnostic coordinate probes do not feed the learner.

**NMSE** is squared feature error normalized by a fixed training-distribution variance. Lower is better. It is neither classification accuracy nor a probability. **Free** prediction receives no further sensory correction; **grounded** prediction is corrected after scoring. Independent fitted roots are the uncertainty units. Episodes and timesteps are reduced within root before paired bootstrap inference. Repeating a root verifies numerical repeatability without adding an independent sample.

The primary scores differ. Study A's J equally weights recall at update ten and mean free prediction error over eight steps. Study B's J measures pre-correction prediction under selected intermittent sensing conditions. Their absolute scores must not be interpreted as a cross-study performance ranking. Relative gains are averaged per paired root; they need not equal the ratio calculated from the displayed group means.

## Study A design and results

Study A isolates adaptive update and reset gates on the E1 task family. A noisy half-feature initial cue seeds either ten stationary reconstruction updates or an action-conditioned rollout. Twelve models cover full GRU (G32), constant-update variants (FU32/FU38), constant-reset FR32, both-constant FB32, retrained historical S32 and gated GS32, ordinary fixed-leak tanh R32/R52/R55, and fitted bilinear L12/L2 controls. The number denotes recurrent width. FU retains adaptive reset; FR retains adaptive update. R32 uses a fixed leak of 0.5.

V1's 800-update development screen revealed substantial undertraining. It closed without generating confirmation data. V2 used a common 1,600-update schedule and fixed decay, preserving v1 evidence and charging both versions to the cumulative budget. Development used roots 8419/8423. Ten fresh confirmation roots each supplied twenty paired episodes per main role. Each full fit saw 25,600 recall examples and 24,000 transition episodes, containing 216,000 clean transition records. Models reused matched archives; free and grounded losses did not count as distinct observations.

The primary resource comparison is G32 versus FU38: 4,940 versus 4,876 parameters, 32 versus 38 active hidden values, and 3,936 versus 3,724 counted linear MACs per advance/readout. Parameter and MAC ratios are 1.013 and 1.057; measured fitting CPU ratio is 1.134. Same-width FU32, parameter-matched R52, and MAC-matched R55 answer different control questions. Exact parameter/state/compute matching is not claimed.

### Primary decision

| Required comparison or protection | Observed result | Interpretation |
| --- | --- | --- |
| G32 relative J gain over FU38: mean at least 10%, positive adjusted lower bound, acceptable width | **9.9172%**, adjusted interval **[0.6950%, 19.5834%]**; ordinary 95% interval [3.7665%, 16.3209%] | Positive effect; mean misses the frozen practical minimum. Interval width passes. |
| Free-32 G32 minus FU38: adjusted upper bound at most +0.01 NMSE | **+0.006117**, adjusted **[−0.000024, +0.011991]** | Long-horizon non-regression remains unresolved. |
| G32 J gain over R52 | **50.84%**, adjusted **[45.85%, 55.66%]** | Required endpoint protections pass for this comparison. |
| G32 J gain over R55 | **48.63%**, adjusted **[36.55%, 58.63%]** | Required endpoint protections pass for this comparison. |

The frozen protocol adjusts across fifteen contrasts, limits gain-interval width to 0.40, and requires absolute recall NMSE ≤0.03 and free-8 NMSE ≤0.10 alongside finite numerics, resource, and development-convergence checks. Other FU38 endpoint protections pass. The frozen classifier returns **inconclusive**, not equivalence or a supported practical benefit. The short/long-horizon pattern is descriptively a tradeoff, but does not satisfy Study A's stronger formal mixed-outcome rule. [Full primary statistics]({{ '/assets/research/soam-studies-ab/study-a/statistics.json' | relative_url }}) · [V2 protocol]({{ '/assets/research/soam-studies-ab/STUDY_A_PROTOCOL_V2.txt' | relative_url }})

### All twelve models

Means and ordinary 95% root-bootstrap intervals. The resource columns count fitted readouts. Two supplied role flags are additional to active hidden state; the common fixed projection adds 24 supplied float32 values per model. MACs omit nonlinearities, elementwise arithmetic, matrix expansion, and backward computation.

| Model | Parameters | Active hidden | MACs per advance/readout | J | Recall-10 | Free-8 | Free-32 | Grounded-32 |
| --- | ---: | ---: | ---: | --- | --- | --- | --- | --- |
| G32 | 4940 | 32 | 3936 | 0.00380 [0.00304, 0.00501] | 0.00316 [0.00270, 0.00362] | 0.00444 [0.00317, 0.00651] | 0.01576 [0.01204, 0.01948] | 0.00102 [0.00089, 0.00115] |
| FU32 | 3724 | 32 | 2752 | 0.00474 [0.00393, 0.00608] | 0.00420 [0.00361, 0.00480] | 0.00527 [0.00375, 0.00780] | 0.01234 [0.00995, 0.01495] | 0.00126 [0.00099, 0.00155] |
| FU38 | 4876 | 38 | 3724 | 0.00427 [0.00337, 0.00571] | 0.00365 [0.00308, 0.00425] | 0.00490 [0.00327, 0.00753] | 0.00964 [0.00810, 0.01115] | 0.00109 [0.00097, 0.00124] |
| FR32 | 3724 | 32 | 2752 | 0.00463 [0.00366, 0.00600] | 0.00392 [0.00342, 0.00444] | 0.00534 [0.00379, 0.00771] | 0.03160 [0.02445, 0.03990] | 0.00110 [0.00098, 0.00122] |
| FB32 | 2508 | 32 | 1568 | 0.00750 [0.00592, 0.00975] | 0.00668 [0.00545, 0.00794] | 0.00832 [0.00586, 0.01211] | 0.01667 [0.01346, 0.02000] | 0.00229 [0.00189, 0.00269] |
| S32 | 3868 | 32 | 5600 | 0.00872 [0.00746, 0.01067] | 0.00881 [0.00731, 0.01043] | 0.00864 [0.00577, 0.01274] | 0.01322 [0.01094, 0.01622] | 0.00422 [0.00383, 0.00460] |
| GS32 | 5084 | 32 | 6784 | 0.00462 [0.00364, 0.00608] | 0.00388 [0.00336, 0.00444] | 0.00537 [0.00374, 0.00790] | 0.01772 [0.01363, 0.02300] | 0.00141 [0.00121, 0.00160] |
| R32 | 2412 | 32 | 1568 | 0.00840 [0.00653, 0.01112] | 0.00759 [0.00631, 0.00888] | 0.00921 [0.00597, 0.01447] | 0.01864 [0.01543, 0.02192] | 0.00254 [0.00210, 0.00301] |
| R52 | 4952 | 52 | 3588 | 0.00789 [0.00615, 0.01072] | 0.00674 [0.00580, 0.00788] | 0.00905 [0.00614, 0.01373] | 0.01426 [0.01172, 0.01821] | 0.00227 [0.00201, 0.00259] |
| R55 | 5402 | 55 | 3960 | 0.00737 [0.00623, 0.00890] | 0.00688 [0.00607, 0.00761] | 0.00786 [0.00603, 0.01046] | 0.01481 [0.01247, 0.01707] | 0.00207 [0.00185, 0.00230] |
| L12 | 924 | 12 | 624 | 0.08096 [0.07176, 0.09035] | 0.07891 [0.06861, 0.09073] | 0.08302 [0.06985, 0.09721] | 0.05531 [0.04669, 0.06444] | 0.32291 [0.30309, 0.34448] |
| L2 | 110 | 2 | 48 | 0.08096 [0.07176, 0.09035] | 0.07891 [0.06861, 0.09073] | 0.08302 [0.06985, 0.09721] | 0.05531 [0.04669, 0.06444] | 0.32273 [0.30284, 0.34428] |

The GRU's roughly twofold fitting-CPU cost over R52/R55 limits a purely architectural explanation, despite matched updates and training records. An equal-total-CPU ungated sweep was not performed. R32 meets the protocol's absolute competence limits when applied in the final decision, but with higher error than G32. Its selection is an explicit post-study simplicity/accuracy judgment, not a preregistered proof that 32 is the minimum width.

### Mechanism and diagnostic findings

Removing update adaptation at the same width raises J from 0.00380 to 0.00474. Increasing the constant-update model's capacity narrows that difference. FU38 then has lower mean free-32 and free-128 error than G32. Removing reset adaptation instead raises FR32 free-32 error to 0.03160 and free-128 to 0.17699. This supports a regime-specific reset contribution; it does not isolate every optimization or parameterization alternative.

The 110-parameter L2 model reproduces L12's recall/free-8/free-32 errors to numerical precision using a PCA basis learned from training observations. Its poor cue reconstruction and strong 128-step prediction expose the importance of initialization and the low-dimensional contracting environment. G32 and R32 physical-coordinate probes are nearly linear (movement R² 0.99412 and 0.99024). These are diagnostic readouts, not evidence of discovered concepts.

After an RMS 0.15 state perturbation, only **44.5%** of G32 recall episodes combine halving the hidden gap with output NMSE ≤0.03, ordinary interval [39.0%, 48.5%]. FU38 reaches 62.0% [49.5%, 72.5%]. Contraction therefore does not establish reliably useful recovery. Post-training gate clamps are out-of-distribution interventions; separately retrained constant-gate controls provide stronger evidence about necessity. FR32's folded gated-leaky form is an algebraic control, not another independent fit.

The [original report]({{ '/assets/research/soam-studies-ab/STUDY_A.txt' | relative_url }}) and [complete numerical tables]({{ '/assets/research/soam-studies-ab/study-a/tables.txt' | relative_url }}) retain long-horizon, switching, gate, probe, and recovery diagnostics. Better retrained S32 results do not pass a new sharing gate or change historical E1.

## Study B design and results

Study B uses ordinary tanh cores and explicit correction/control variants after the requirement to use a GRU was removed. It tests six observation schedules: every 1/2/4/8 steps, seeded irregular sensing, and initial-only sensing. Each crosses nine conditions: full features, partial features, missing events, high noise, transient corruption, contradictory snapshots, genuine state changes, altered movement, and a long sensing gap. Each cell has twenty episodes of 64 physical steps, with half the intervals in each supplied role.

All models receive identical physical observations within paired roots. Every prior prediction is recorded before reading the current cue. Sensory correction changes the transient state; internal settling advances neither action nor simulator time. Mixed-input models recompute a posterior from the previous state with action and observation; their extra prediction branch is counted. Persistent weights remain fixed.

Sixteen candidates receive the same training records and target information. Neural fits use 1,200 updates, batch eight, horizon sixteen, two candidate learning rates, and a common decay. Linear controls fit observation bases and bilinear dynamics with two ridge penalties. J averages pre-correction error equally across every-2/4/8 and irregular sensing crossed with partial/missing/noisy conditions. Its denominator comes from 2,048 independent training-distribution samples.

The primary comparisons are GA32 against PC32 and MIX32. Support requires at least 10% mean gain, a positive adjusted lower bound, adjusted width ≤0.40, competence J≤0.15, and upper bounds ≤+0.01 NMSE for clean, corruption, genuine-change, and free-32 guards. Ten roots, 20,000 bootstrap resamples, and a ten-contrast Bonferroni family were frozen. Other comparisons below are descriptive. Development chose learning rate 0.01 for MIX32/PC32 and 0.003 for GA32; the finite convergence screen flagged none of them.

### All sixteen v1 models

J has ordinary 95% root-bootstrap intervals. Other endpoint entries are means; their intervals remain in the downloadable statistics. State counts are logical recurrent values, separate from transient prediction/correction workspace and evidence. Fit CPU is mean per fitted model/root. MACs are average counted linear operations per physical step, not total FLOPs or wall-clock latency.

| Model | Prior J [95% CI] | Free32 | Corrupt | True change | MAC/step | State | Scalars | Fit CPU s |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MIX16 | 0.08899 [0.08292, 0.09478] | 0.25318 | 0.11835 | 0.18707 | 764 | 16 | 1340 | 3.13 |
| MIX32 | 0.09383 [0.08886, 0.09855] | 0.25644 | 0.12736 | 0.19203 | 2204 | 32 | 3180 | 3.20 |
| PC16 | 0.06242 [0.06000, 0.06515] | 0.20136 | 0.11115 | 0.11235 | 718 | 16 | 1340 | 2.95 |
| PC32 | 0.06322 [0.05981, 0.06678] | 0.20347 | 0.11246 | 0.10991 | 1948 | 32 | 3180 | 3.03 |
| SET32 | 0.06163 [0.05802, 0.06562] | 0.19712 | 0.13027 | 0.11472 | 2313 | 32 | 3213 | 8.00 |
| REP32 | 0.06463 [0.06140, 0.06782] | 0.19179 | 0.12143 | 0.11624 | 3193 | 32 | 3180 | 7.59 |
| MIXC32 | 0.08846 [0.08433, 0.09252] | 0.25905 | 0.13514 | 0.14371 | 3664 | 32 | 3180 | 7.23 |
| GM32 | 0.06114 [0.05729, 0.06530] | 0.20592 | 0.14623 | 0.11464 | 1952 | 32 | 3193 | 3.20 |
| GR32 | 0.06114 [0.05729, 0.06531] | 0.20583 | 0.14622 | 0.11460 | 1956 | 32 | 3205 | 3.23 |
| GS32 | 0.06105 [0.05732, 0.06515] | 0.20552 | 0.14684 | 0.11312 | 1966 | 32 | 3237 | 3.25 |
| GA32 | 0.06104 [0.05730, 0.06514] | 0.20549 | 0.14681 | 0.11313 | 1967 | 32 | 3240 | 3.25 |
| GMETA32 | 0.06101 [0.05728, 0.06511] | 0.20549 | 0.14681 | 0.11312 | 1968 | 32 | 3241 | 3.25 |
| AM32 | 0.06154 [0.05822, 0.06512] | 0.19055 | 0.11860 | 0.10371 | 2004 | 32 | 3278 | 3.72 |
| L2 | 0.07194 [0.06867, 0.07559] | 0.11770 | 0.14590 | 0.14843 | 65 | 2 | 110 | 0.05 |
| FILTER2 | 0.04180 [0.04014, 0.04352] | 0.01331 | 0.37627 | 0.05872 | 110 | 6 | 65 | 0.05 |
| RESET2 | 0.04396 [0.04220, 0.04582] | 0.01331 | 0.40751 | 0.05868 | 78 | 2 | 61 | 0.05 |

PC denotes fixed residual correction; MIX blends observation and action in a conventional recurrence. SET adds cue-free internal settling; REP reuses the observation; MIXC supplies extra conventional computation. GM/GR/GS/GA progressively supply mask, residual, state, and action inputs to sensory gain. GMETA adds nominal noise metadata. AM independently controls motion gain. L2 is the historical-form fitted model, RESET2 reconstructs from the current mask, and FILTER2 is a learned Kalman-form reference with supplied two-dimensional structure. **GS32 has different meanings in Studies A and B**; model labels are study-local.

Separate correction improves J over the same-width mixed control: PC16−MIX16 **−0.02656 [−0.03180, −0.02090]** and PC32−MIX32 **−0.03062 [−0.03467, −0.02644]**, descriptive 95% paired intervals. This supports the tested interface, without proving every conventional recurrence incapable of learning correction.

### Adaptive gain and settling

GA32 improves J over MIX32 by **34.64% [28.03%, 40.94%]**, but only **3.44% [−0.86%, 7.86%]** over PC32. Its corruption excess over PC32 is **0.03435 [0.02811, 0.03972]**, decisively above the 0.01 margin. Free-32 protection is unresolved, with adjusted upper bound 0.02139. Clean and genuine-change protections pass their margins. The formal v1 outcome is **tradeoff**. These are family-adjusted intervals. [All ten decision contrasts]({{ '/assets/research/soam-studies-ab/study-b/primary-decision.json' | relative_url }})

Within SET32's same fitted weights, J for 0/1/2/4 extra iterations is **0.06395 / 0.06163 / 0.06103 / 0.06135**. Refinement initially helps, then saturates. At matched one extra iteration it beats REP32 by −0.00498 [−0.00744, −0.00197] and MIXC32 by −0.04088 [−0.04674, −0.03582]. Against independently trained PC16, however, the selected SET32 difference is **−0.00079 [−0.00279, 0.00125]**, with corruption worse by **0.01912 [0.01513, 0.02317]** and about **2,313 versus 718 MACs/step**. These are descriptive comparisons.

The event-driven continuation rule reaches J=0.06107 at about 2,529 MACs/step; fixed four-step settling gives 0.06135 at 3,408. A learned continuation head is nearly fixed-four in error and cost. Improved immediate cue reconstruction does not guarantee improved future prediction: REP32 worsens in J from two to four iterations while reconstruction continues improving. [Iteration statistics]({{ '/assets/research/soam-studies-ab/study-b/settling-statistics.json' | relative_url }})

### The strong simple reference and its failure

FILTER2 achieves J=**0.04180 [0.04014, 0.04352]**, with free-32 error 0.01331 and roughly 110 counted linear MACs/step, excluding solves. It has six recurrent values including covariance, 65 inference-used coefficients/hyperparameters, and 460 allocated persistent bytes including unused common buffers. Its corruption error is **0.37627**, versus PC16's **0.11115**: a descriptive difference **0.26512 [0.24261, 0.28909]**. RESET2 has a similar robustness problem. No model dominates accuracy, cost, and resistance to corrupted evidence.

A supplied-noise diagnostic improves the filter's J to approximately 0.01690. That is an explicitly privileged reliability input, not an inferred-reliability win. It does not identify unflagged corruption. Post hoc covariance calibration also shows task-dependent coverage rather than a general confidence guarantee. [Calibration records]({{ '/assets/research/soam-studies-ab/study-b/filter-calibration.json' | relative_url }})

## The magnitude supplement

V1's signed affine gate could not directly represent a sign-invariant magnitude rule. The separately frozen supplement adds masked residual RMS and action norm in GN32, nominal noise SD in GMN32, and independent motion control in AMN32. PC16, PC32, GA32, and FILTER2 are freshly fitted controls. Initial core weights are paired within the supplement; no checkpoints transfer from v1. Fresh roots and a separate seed namespace prevent reuse of confirmation evidence. The two versions are not pooled.

Development selects PC32 learning rate 0.003 instead of v1's 0.01. Thus cross-version differences cannot be attributed solely to the added magnitude inputs. The within-version comparisons are the relevant evidence.

| Model | J [95% CI] | Corrupt | True change | Free32 | MAC/step | Fitted scalars |
| --- | --- | --- | --- | --- | --- | --- |
| PC16 | 0.06279 [0.06061, 0.06596] | 0.11045 | 0.10366 | 0.20352 | 718 | 1340 |
| PC32 | 0.06099 [0.05875, 0.06366] | 0.14001 | 0.10696 | 0.20806 | 1948 | 3180 |
| GA32 | 0.06000 [0.05799, 0.06234] | 0.14616 | 0.10380 | 0.19983 | 1967 | 3240 |
| GN32 | 0.05997 [0.05798, 0.06230] | 0.14541 | 0.10385 | 0.19980 | 1968 | 3242 |
| GMN32 | 0.05994 [0.05795, 0.06228] | 0.14542 | 0.10385 | 0.19980 | 1968 | 3243 |
| AMN32 | 0.06100 [0.05858, 0.06372] | 0.11709 | 0.09626 | 0.18818 | 2006 | 3281 |
| FILTER2 | 0.04352 [0.04208, 0.04523] | 0.38011 | 0.05651 | 0.01198 | 110 | 65 |

GN32's primary gain versus PC32 is **1.6122% [0.5234%, 2.6781%]**; versus GA32 it is **0.0348% [−0.0080%, 0.0875%]**, family-adjusted intervals. Both precisely exclude the required 10%. All eight guard margins pass, although corruption rises by **0.00540 [0.00282, 0.00810]** relative to PC32. The frozen classification is **negative practical advantage**, not evidence of zero effect or a general rejection of adaptive gain. [Full decision record]({{ '/assets/research/soam-studies-ab/study-b-magnitude/primary-decision.json' | relative_url }})

Independent motion gain reduces corruption and genuine-change error in secondary comparisons, without a resolved primary gain. Relative to PC16, GN32 improves J by 0.00281 [0.00139, 0.00436] but increases corruption error by 0.03497 [0.03060, 0.03941] and uses about 2.74 times the counted linear MACs. The fitted filter again has the strongest primary prediction and the highest corruption error among these candidates.

## Retained interface and limits

The final decision retains **separate prediction and sensory correction**. PC16 is the smallest tested neural width and the small robust reference, with recurrent leak 0.5, fixed sensory gain 0.5, motion gain 1, and zero extra settling by default. These coefficients serve different functions. Selecting PC16 accepts some primary accuracy cost to larger models and substantial free-prediction cost to FILTER2. It is a post-study engineering judgment, not proof of a globally minimal model.

The interface permits optional internal settling and independently controlled motion and sensory gains. It does not require learned gates or a periodic clock. The study tests unit physical intervals, so arbitrary variable-time updates need a separate contract. FILTER2 remains a strong mandatory simple comparison with explicit observation assumptions. [Final decision]({{ '/assets/research/soam-studies-ab/STUDY_B_DECISION.txt' | relative_url }})

A **post hoc recovery-reporting repair** replaces a baseline that could already include impaired steps with the eight steps before disruption. It requires three consecutive errors below max(0.01, twice that baseline), caps unresolved recovery at the horizon, and reports censoring. Saved posterior errors are reused; there is no refitting or change to primary tests. For v1 every-four sensing, mean capped corruption recovery is 4.01 steps for PC16, 4.95 for GA32, and 0.17 for FILTER2, with 1%, 0.5%, and 0% censored. The filter's rapid recovery after wrong cues stop coexists with its large errors while they persist. Model-relative baselines prevent interpreting these times as a common absolute accuracy test. [Repaired records]({{ '/assets/research/soam-studies-ab/study-b/recovery-pre-disruption.json' | relative_url }})

The evidence is limited to a low-dimensional supervised estimation task with supplied roles and sensing schedules. It does not test many-pattern associative load, learned observation acquisition, object discovery, online persistent learning, concurrent binding, downstream control, or neuroscientific validity. Bounded neural activity, useful prediction, and smooth hidden geometry are insufficient to establish attractors. Preserving these limits leaves Studies C–F as research questions rather than implied capabilities.

## Execution and reproducibility

| Record | Study A, both versions | Study B, v1 plus supplement |
| --- | --- | --- |
| Fitted executions | **252**: 24 calibration, 96 development, 120 confirmation, 12 repeat | **368**: v1 16 fixture + 64 development + 160 confirmation + 16 repeat; supplement 7 + 28 + 70 + 7 |
| Failed/excluded/replaced fits | 0 / 0 / 0 | No failed or excluded fits |
| Numerical repeat | Root 9301 across all 12 models; exact retained numerical hashes | Roots 12007 and 14207; **108/108** hash checks exact |
| Independent reduction | 600 headline metrics, maximum discrepancy **1.11e−16** | **2,760** endpoint/guard values (1,920 + 840), all agree |
| Recorded numerical CPU | **1,067.70 s** (17.80 min) | **1,422.60 s** (23.71 min) |
| Summed execution-phase wall | **1,067.04 s** | **1,422.72 s** |
| Peak process RSS | **1,288,273,920 bytes** (1.20 GiB) | **882,196,480 bytes** (0.822 GiB) |
| Archived artifacts | **1,522,075,328 bytes** upper bound (1.42 GiB) | **554,836,761 bytes** (0.517 GiB) |
| Completed-study test suite | **215 passed** | **238 passed** |

Both stayed within their declared CPU/wall and 2 GiB memory/artifact limits. Study A includes one failed preconfirmation receipt-serialization attempt, charged and repaired without changing numerical code; it is not a failed fit. There were no confirmation-driven threshold changes, seed extensions, or budget extensions. Study A's archive retains status-file modification times, not separately recorded absolute start/end times.

The ledgers describe executed numerical phases, not elapsed conversation time or total project labor. Engineering tests and language-model assistance are separate. Study B also excludes import/source-copy setup from phase timers. Timing is measured on the local CPU and varies between executions. Counted MACs omit nonlinear arithmetic, solves, and evaluator-only work; measured evaluation CPU includes diagnostic work and Python orchestration, so it is not isolated deployment latency.

Runtime: Python 3.12.13, PyTorch 2.14.1, NumPy 2.5.4, macOS arm64; one Torch thread, deterministic algorithms, float32 neural computation and float64 simulation/fitting/reductions. Study B records Apple M3 Max, Mac15,10, 36 GiB system memory, macOS 26.6.2. Exact repeats establish same-environment repeatability, not cross-platform reproducibility. The historical test counts above are study-completion records, not new experimental runs for this publication.

| Version | Development roots | Confirmation roots | Execution source |
| --- | --- | --- | --- |
| A v2 | 8419, 8423 | 9301, 9311, 9319, 9323, 9337, 9341, 9343, 9349, 9371, 9377 | `44824b7884965bb4ad49166143427bdd43e87452` (orchestration); development `7ed78f9` |
| B v1 | 11003, 11027 | 12007, 12011, 12037, 12041, 12043, 12049, 12071, 12073, 12097, 12101 | `0e03e0dfb22f309c40f8339cd643b26d0be84f44` |
| B magnitude | 13103, 13109 | 14207, 14221, 14243, 14249, 14251, 14281, 14293, 14303, 14321, 14323 | `21084476c334dd4d683dde056f0522ad3947b547` |

The manifests and receipts record namespace/version seed mapping, selected configurations, fingerprints, and inference rules. A's source fingerprint is `6e05f7437dc1f37527da85cf0c4231fd0dcba082ec5747f8b4f141e534c43959`; B v1's is `ae6754ce8e177d17ad5ee4590814e5176190bb3e301907a81603c996acb06602`; the magnitude supplement's is `7c2b3d21e32ea875f5ae9e7914fd4e099bb57ceaa8abe68163fc5ebc77d8833b`.

## Evidence downloads

This publication snapshots compact evidence from SOAM commit **`bdb3bdcbb47c7a2a24301e044ebaaac6b50a18cd`**. Downloads are byte-identical to the selected source files; Markdown originals are served as plain text. The [provenance manifest]({{ '/assets/research/soam-studies-ab/provenance.json' | relative_url }}) lists every source path, byte count, and SHA-256. These files remain usable if the research repository is unavailable.

| Evidence | Study A | Study B v1 | B magnitude supplement |
| --- | --- | --- | --- |
| Scientific report | [A report]({{ '/assets/research/soam-studies-ab/STUDY_A.txt' | relative_url }}) | [B combined report]({{ '/assets/research/soam-studies-ab/STUDY_B.txt' | relative_url }}) | Covered in B report |
| Protocol | [V1]({{ '/assets/research/soam-studies-ab/STUDY_A_PROTOCOL.txt' | relative_url }}) · [V2]({{ '/assets/research/soam-studies-ab/STUDY_A_PROTOCOL_V2.txt' | relative_url }}) | [V1]({{ '/assets/research/soam-studies-ab/STUDY_B_PROTOCOL.txt' | relative_url }}) | [Supplement]({{ '/assets/research/soam-studies-ab/STUDY_B_MAGNITUDE_PROTOCOL.txt' | relative_url }}) |
| Manifest | [A]({{ '/assets/research/soam-studies-ab/study-a/manifest.json' | relative_url }}) | [B]({{ '/assets/research/soam-studies-ab/study-b/manifest.json' | relative_url }}) | [Supplement]({{ '/assets/research/soam-studies-ab/study-b-magnitude/manifest.json' | relative_url }}) |
| Frozen receipt | [A]({{ '/assets/research/soam-studies-ab/study-a/confirmation-receipt.json' | relative_url }}) | [B]({{ '/assets/research/soam-studies-ab/study-b/confirmation-receipt.json' | relative_url }}) | [Supplement]({{ '/assets/research/soam-studies-ab/study-b-magnitude/confirmation-receipt.json' | relative_url }}) |
| Statistics | [A]({{ '/assets/research/soam-studies-ab/study-a/statistics.json' | relative_url }}) | [B]({{ '/assets/research/soam-studies-ab/study-b/statistics.json' | relative_url }}) | [Supplement]({{ '/assets/research/soam-studies-ab/study-b-magnitude/statistics.json' | relative_url }}) |
| Root values | [A]({{ '/assets/research/soam-studies-ab/study-a/root-results.json' | relative_url }}) | [B]({{ '/assets/research/soam-studies-ab/study-b/root-results.json' | relative_url }}) | [Supplement]({{ '/assets/research/soam-studies-ab/study-b-magnitude/root-results.json' | relative_url }}) |
| Complete tables | [A]({{ '/assets/research/soam-studies-ab/study-a/tables.txt' | relative_url }}) | [B]({{ '/assets/research/soam-studies-ab/study-b/tables.txt' | relative_url }}) | [Supplement]({{ '/assets/research/soam-studies-ab/study-b-magnitude/tables.txt' | relative_url }}) |
| Reproduction | [A]({{ '/assets/research/soam-studies-ab/study-a/reproduction.json' | relative_url }}) | [B]({{ '/assets/research/soam-studies-ab/study-b/reproduction.json' | relative_url }}) | [Supplement]({{ '/assets/research/soam-studies-ab/study-b-magnitude/reproduction.json' | relative_url }}) |
| Audit | [A]({{ '/assets/research/soam-studies-ab/study-a/audit.json' | relative_url }}) | [B]({{ '/assets/research/soam-studies-ab/study-b/audit.json' | relative_url }}) | [Supplement]({{ '/assets/research/soam-studies-ab/study-b-magnitude/audit.json' | relative_url }}) |
| Cumulative resources | [A]({{ '/assets/research/soam-studies-ab/study-a/resource-final.json' | relative_url }}) | [B including supplement]({{ '/assets/research/soam-studies-ab/study-b/resource-final.json' | relative_url }}) | Counted in B ledger |
| Decision | [A]({{ '/assets/research/soam-studies-ab/STUDY_A_DECISION.txt' | relative_url }}) | [V1 review]({{ '/assets/research/soam-studies-ab/STUDY_B_V1_DECISION.txt' | relative_url }}) | [Final B decision]({{ '/assets/research/soam-studies-ab/STUDY_B_DECISION.txt' | relative_url }}) |
| Implementation and reproduction instructions | [A]({{ '/assets/research/soam-studies-ab/STUDY_A_IMPLEMENTATION.txt' | relative_url }}) | [B, both versions]({{ '/assets/research/soam-studies-ab/STUDY_B_IMPLEMENTATION.txt' | relative_url }}) | Covered in B implementation record |

Original reports retain their historical chronology and source-relative links. For example, A's statement that B had not yet started describes the time of A's decision; the completed B evidence above supersedes that status. This public snapshot is **not the full raw archive**: checkpoints, optimizer state, complete episode arrays, and source snapshots remain in the original local `runs/` directories. Reproduction requires the corresponding implementation and raw execution workflow, not just these summaries.

Publication charts are rendered from the archived estimates by [this script]({{ '/scripts/render_soam_studies_ab.py' | relative_url }}), which verifies snapshot hashes before plotting. It runs no model fitting or new statistical inference.
