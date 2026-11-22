---
layout: page
title: "SOAM E0 and E0-HOLD: Stationary Retention, Action Navigation and Local Recovery"
permalink: /research/soam-stationary-memory-and-navigation/
description: "Joint report of the single-population pilot and longer stationary-training intervention: frozen methods, complete comparisons, uncertainty, resource costs, provenance and limits."
soam_studies: "E0 + E0-HOLD"
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/soam-study-d.css' | relative_url }}">
{% include soam-studies-nav.html %}

## Scope and decisions

Completed November 21, 2026. [Companion article]({{ '/blog/soam-stationary-memory-and-navigation/' | relative_url }}). E0 is the bounded single-population navigable-state pilot under Study E; it is distinct from the earlier shared-population experiment named E1. E0-HOLD is its separately frozen stationary-training follow-up.

**E0:** NAV32 passes six of seven criteria, but its joint result is **inconclusive**. Zero-action drift is unfavorable and its adjusted interval exceeds the precision cap. No model passes the complete operational geometry claim.

**E0-HOLD:** NAV32 improves zero-action drift by 6.635° [5.017, 8.805], but residual error is 5.698° [5.259, 6.183], precisely above the five-degree target. Transverse-recovery noninferiority is unresolved. Eleven of thirteen criteria pass; the outcome is **negative for the declared joint fix**. Improvement does not erase the absolute failure.

Both executions are valid, with no failed fits, excluded roots, unavailable geometry, confirmation tuning or budget extension. SOAM-097 and SOAM-101 accept the scoped evidence; their “proceed” status is evidence acceptance, not a passed geometry gate. The historical E1 stop, D-R1 negative result and D-R2 inconclusive diagnosis remain unchanged. This publication selects no successor experiment.

**Terminology clarified November 22, 2026:** “Blindfolded action prediction” supplies actions but no new sensory observations after the initial cue. “Zero-action drift” supplies zero action and no new observations. “Blindfolded action NMSE (64 steps)” is the 64-step mean sensory prediction error; the zero-action endpoint is absolute pose error after 128 steps, including initialization error, in degrees. The archived identifiers `free_nmse`, `free_horizon` and `stationary_deg` are unchanged. Only reader-facing labels and figure titles were revised; all measurements, thresholds and decisions are unchanged.

## Task, supervision and information boundaries

One orientation evolves by adding a scalar angular action each physical step, modulo a full turn. There is no radial decay. The unchanged seed-1729 orthonormal 2-to-12 projection maps the unit-circle coordinates into twelve overlapping sensory features. The sensor is rank two; this known low-dimensional task is supplied scaffolding.

Inference receives noisy masked features, the mask and the action. A cue exposes six or twelve channels with noise standard deviation .01. The true angle and inverse sensory projection are evaluator-only. Offline fitting supplies complete clean sensory targets to every learner. Evaluation freezes parameters and buffers; blindfolded action rollouts receive no correct future observations or hidden world state. There is no online memory insertion, learned encoder comparison, routing, coupling, hierarchy or action selection.

The interface separates initialization, action prediction, sensory correction and readout. Prediction advances time once. Correction advances no time; absent evidence is an exact no-op. Neural initialization applies a learned tanh map to masked features and the mask. A linear readout predicts twelve features. When evidence exists, correction adds half a tanh-transformed map of the masked sensory residual and mask to the prior state.

Each original training episode has 24 transitions. Entirely stationary episodes are sampled with probability .25. Other episodes use four-step action blocks from {−.12, −.06, 0, .06, .12} radians. Half the episodes receive only an initial cue; the others receive cues every four steps. Development and confirmation use novel speeds {−.18, −.09, 0, .09, .18}. Interpolation, extrapolation and constant-direction streams are separate descriptive diagnostics.

## Models and optimization

All neural models have 32 state coordinates and the same initializer, readout and correction interfaces. For NAV32, h is the current state, a is the angular increment, b is a learned bias, and S and K are learned matrices. The intermediate drive u determines the next state:

$$
\begin{aligned}
u &= Sh+b+\frac{a}{0.12}Kh, \\
F(h,a) &= \tfrac12h+\tfrac12\tanh(u).
\end{aligned}
$$

The symmetric zero-action matrix is S = (W + Wᵀ)/2; the skew action matrix is K = (V − Vᵀ)/2. S starts near identity and V near zero. These are supplied structural biases; the hidden state is not a hand-wired circle. This is a Hopfield-inspired rate network, with no assumed global asymmetric energy or guaranteed discrete-time energy decrease.

**SYM32** replaces K with (V + Vᵀ)/2. It controls the action-weight structure while preserving allocated matrix size; effective degrees of freedom differ. **GRU32** is a conventional GRUCell driven by a/.12, with the same sensory interfaces and losses. State width matches; parameter counts do not.

**PCA2** fits a two-dimensional basis and mean to training sensory targets. It regresses state change on the features a·h, a²·h and a³·h with ridge 1e−6, then uses fitted dynamics and Kalman correction. Rank two, polynomial action features and exact zero-action stationarity are supplied. It receives no true angle, projection inverse, exact rotation operator or radius normalization. Covariance and fitting costs are counted.

Neural loss is mean prior sensory NMSE plus .5 times mean posterior NMSE, normalized by the known feature power 1/12. Adam uses gradient clipping at one, batch size 32 and 600 fixed updates; the learning rate cosine-decays to 1% of its initial value. There is no geometry loss, restart or checkpoint selection. E0's complete tuning domain is initial rates {.001, .003}, selected by development blindfolded action error over 64 steps; all neural families select .003. PCA2 makes two deterministic passes over the same prefix data.

## Evaluation and geometry definitions

The primary prediction endpoint is sensory NMSE averaged over all 64 missing-input transitions in 128 fresh episodes per root. Separate streams measure grounded one-step prediction and returning-cue correction: 32 missing observations followed by eight partial noisy cues, scored at the final posterior.

A uniformly spaced 256-pose grid receives a random angular offset per root. Clean full-feature initialization followed by eight zero-action updates defines a sampled reference family. The stationary test starts directly from the initializer, executes 128 zero-action updates, and measures absolute circular pose error. Other geometry probes start at the eight-update family and run sixteen zero-action updates:

1. **Transverse separation ratio.** Estimate a local tangent by centered neighboring-state differences. Add one seeded orthogonal perturbation with norm .1 times the mean centered family radius. Evolve perturbed and unperturbed states, project their endpoint separation perpendicular to the unperturbed endpoint family's tangent, and divide by the injected norm. Average within root. PCA2 perturbs its two mean coordinates; covariance remains a counted resource, not an orientation coordinate.
2. **Perturbation-induced pose error.** Measure decoded angular displacement from the paired undisturbed endpoint. Reduced hidden separation cannot count as useful recovery if it changes the represented pose excessively.
3. **Tangent retention.** Start at two valid family states four grid bins apart, about .098 radians. Average their signed decoded angular separation after sixteen updates divided by their initial separation. Distinct valid poses should remain distinct; returning them to the same pose would discard information.

These are finite local proxies. Both members of a transverse pair can drift together. The ratio does not measure basin volume or convergence to an invariant manifold; mean tangent retention does not establish injectivity at every pose or indefinite memory. Nonfinite values, degenerate tangents or unavailable orientation cannot silently pass.

## E0 design and frozen outcome rules

Fixture root 9001, development roots 101 and 102, confirmation roots **201–210**, exact repeat 201. Protocol `soam-e0`, version 1, with separately derived train, development, confirmation and fixture streams. The inventory is 14 development fits, 40 confirmation fits and four repeats: **58 scientific fits**, plus four eight-update fixtures. The selected rates were committed before confirmation.

Intervals use 20,000 root bootstrap resamples, seed 12203, with a Bonferroni family of seven endpoints × four models at alpha .05/28 per interval. Independent fitted roots are the inferential units. Episodes, grid points and timesteps are averaged within roots. Ten roots and extreme adjusted quantiles limit precision.

| Endpoint | Required adjusted interval | Maximum width |
| --- | --- | --- |
| Blindfolded action NMSE (64 steps) | Upper ≤ .05 | .04 |
| Grounded one-step NMSE | Upper ≤ .05 | .04 |
| Zero-action drift at 128 (absolute pose error) | Upper ≤ 5° | 4° |
| Transverse ratio at 16 | Upper ≤ .5 | .4 |
| Perturbation-induced pose error | Upper ≤ 3° | 3° |
| Tangent retention | Contained in [.8, 1.2] | .4 |
| Final returning-cue NMSE | Upper ≤ .05 | .04 |

All seven adequately precise passes are required for the bounded joint claim. An adequately precise interval wholly outside the acceptable range yields negative configured-model evidence; otherwise the result is inconclusive. Precision is checked before direction. A software failure would be invalid execution, not scientific falsification. NAV32-versus-control prediction differences are descriptive, not a preregistered superiority test.

| Endpoint | NAV32 | GRU32 | SYM32 | PCA2 |
| --- | --- | --- | --- | --- |
| Blindfolded action NMSE (64 steps); upper ≤ .05 | .03336 [.02891, .03869] | .06778 [.06106, .07446] | .29979 [.25114, .35166] | .000568 [.000499, .000651] |
| Grounded one-step NMSE; upper ≤ .05 | .00917 [.00554, .01437] | .00744 [.00622, .00909] | .03219 [.02799, .03676] | .0000479 [.0000384, .0000649] |
| Zero-action drift at 128 (absolute pose error); upper ≤ 5° | 13.861 [12.119, 16.278] | 15.163 [12.241, 18.296] | 18.790 [15.590, 22.650] | .00000162 [.00000149, .00000176] |
| Transverse separation ratio at 16; upper ≤ .5 | .1412 [.1083, .1687] | .1201 [.1094, .1342] | .2328 [.2061, .2616] | 1.000 [1.000, 1.000] |
| Perturbation-induced pose error; upper ≤ 3° | .2183 [.1948, .2433] | .9806 [.8890, 1.0872] | .9412 [.7988, 1.0587] | .00000751 [.00000673, .00000840] |
| Tangent retention; interval within [.8,1.2] | .9880 [.9790, .9955] | .9995 [.9976, 1.0016] | .9922 [.9832, 1.0020] | 1.000 [1.000, 1.000] |
| Final returning-cue NMSE; upper ≤ .05 | .003950 [.003552, .004303] | .007333 [.006189, .009157] | .013321 [.011305, .015318] | .0000425 [.0000367, .0000520] |

**NAV32 is inconclusive:** six criteria pass, but its zero-action interval width is 4.159°, above four degrees. **SYM32 is inconclusive:** its unfavorable action and zero-action intervals exceed their width caps. **GRU32 has negative configured-model evidence:** blindfolded action error over 64 steps precisely exceeds .05; the stationary result is also unfavorable but imprecise. **PCA2 is negative for the joint attraction claim:** its transverse ratio is one. It passes the other six criteria and remains the strongest prediction/state-size reference for this scaffold. This does not make it an unsuccessful filter.

NAV32 zero-action drift grows from .818° initially to 2.743° at step 24, 8.194° at 64 and 13.861° at 128. Every root's final mean exceeds 11°; mean displacement from its own initialized pose is 13.813°. This is accumulated drift, not just initial cue error. All three neural families show local transverse contraction, so that observation is not unique to the Hopfield-inspired core.

<figure>
  <a href="{{ '/assets/research/soam-e0/pilot-blindfolded.png' | relative_url }}"><img src="{{ '/assets/research/soam-e0/pilot-blindfolded.png' | relative_url }}" alt="E0 descriptive mean trajectories for zero-action drift, action prediction, transverse separation and cue return." loading="lazy"></a>
  <figcaption>E0 figure with clarified labels, ten roots. Curves have no confidence bands; endpoint inference uses the adjusted table above.</figcaption>
</figure>

## E0-HOLD intervention and confirmation

Twenty fresh paired roots **301–320** compare SHORT24 with LONG128 for NAV32, SYM32 and GRU32. PCA2 is fitted once per root as REFERENCE. Each pair starts with identical parameters and receives identical original 24-step prefixes, actions, masks and sensory evidence. LONG128 extends only entirely stationary episodes by 104 steps, with zero action and no additional cues, repeating the already supplied stationary target. Moving episodes remain unchanged.

Each episode keeps equal total loss weight: means over its prior and posterior time points are computed before the batch average. Stationary LONG128 episodes average 128 priors and 129 posteriors, including initialization, versus 24/25 in SHORT24. Changing the temporal average and backpropagation horizon are both part of the intervention. Repeated stationary targets are supplied invariance supervision, not new observations.

Both arms use 600 updates and inherited initial rate .003. There is no new development search or separate optimization of LONG128. This tests one fixed recipe, not the best possible result for each horizon. Original E0 model and evaluator code is unchanged.

Fresh stream roots are obtained through `derived_seed("soam-e0-hold", 1, "root-map", root, 0, "streams")`, then passed to the inherited split-specific generator. Fixture root 9301; exact repeat root 301. Seven cells per root give 140 confirmation fits and seven repeats, **147 scientific fits**, plus seven eight-update fixtures. Sixty main neural pairs and three repeat pairs have identical initialization hashes; prefix hashes match across all cells within root.

The NAV32 confirmatory family contains thirteen quantities: seven LONG128 absolute criteria, stationary improvement SHORT minus LONG with lower bound ≥5° and width ≤4°, and five degradation guards LONG minus SHORT. Prediction, grounded and cue-return degradation each require upper ≤.01 NMSE and width ≤.02; transverse-ratio degradation requires upper ≤.05 and width ≤.10; induced-pose degradation requires upper ≤.5° and width ≤1°. Bootstrap uses 20,000 paired-root resamples, seed 32203, alpha .05/13 per interval.

All thirteen must pass for a joint fix. A precise degradation beyond its margin is a tradeoff result; otherwise a precise primary/absolute failure yields a negative joint fix; remaining cases are inconclusive. Mandatory controls use descriptive ordinary 95% intervals, not alternative confirmatory discoveries. No extra roots were added after inspection.

## E0-HOLD confirmatory results

| Quantity | Mean [adjusted interval] | Width | Requirement | Status |
| --- | --- | --- | --- | --- |
| LONG blindfolded action NMSE (64 steps) | 0.0365065 [0.032524, 0.0404439] | 0.00791993 | upper ≤ 0.05; width ≤ 0.04 | pass |
| LONG grounded NMSE | 0.00805349 [0.00710608, 0.00927468] | 0.00216861 | upper ≤ 0.05; width ≤ 0.04 | pass |
| LONG zero-action drift, ° | 5.69773 [5.25935, 6.18261] | 0.923261 | upper ≤ 5.0; width ≤ 4.0 | Precise failure |
| LONG transverse ratio | 0.139958 [0.113728, 0.163648] | 0.0499208 | upper ≤ 0.5; width ≤ 0.4 | pass |
| LONG induced pose error, ° | 0.221384 [0.196532, 0.244105] | 0.0475733 | upper ≤ 3.0; width ≤ 3.0 | pass |
| LONG tangent retention | 0.982743 [0.977872, 0.987488] | 0.00961568 | lower ≥ 0.8 and upper ≤ 1.2; width ≤ 0.4 | pass |
| LONG returning-cue NMSE | 0.00530636 [0.00490805, 0.00574642] | 0.00083837 | upper ≤ 0.05; width ≤ 0.04 | pass |
| Stationary gain, SHORT − LONG, ° | 6.63463 [5.01706, 8.80467] | 3.78762 | lower ≥ 5.0; width ≤ 4.0 | pass |
| Blindfolded action degradation (64 steps) | 0.00360598 [-0.0010272, 0.00673195] | 0.00775915 | upper ≤ 0.01; width ≤ 0.02 | pass |
| Grounded degradation | 0.00115804 [-0.00104343, 0.00267876] | 0.00372218 | upper ≤ 0.01; width ≤ 0.02 | pass |
| Returning-cue degradation | 0.00128296 [0.000913756, 0.00163179] | 0.000718033 | upper ≤ 0.01; width ≤ 0.02 | pass |
| Transverse-ratio degradation | 0.0331174 [0.00731248, 0.0621835] | 0.0548711 | upper ≤ 0.05; width ≤ 0.1 | unresolved |
| Induced-pose degradation, ° | 0.035141 [0.0103173, 0.0590619] | 0.0487446 | upper ≤ 0.5; width ≤ 1.0 | pass |

The gain passes, but residual zero-action drift is precisely unacceptable: width .923°, interval wholly above five degrees. The transverse proxy is weaker in the paired comparison, with an entirely positive increase interval crossing +.05. It establishes neither noninferiority within that margin nor harm definitively beyond it. Its absolute criterion still passes. The formal result is **negative declared joint fix**, with eleven of thirteen passes.

The paired comparison is **12.332° → 5.698°**, not the historical pilot's 13.861° versus the new long arm. The roughly 54% reduction is a descriptive ratio of means; the confirmatory effect is the paired degree difference and its interval.

Mixed-action prediction passes its degradation guard, but this does not imply unchanged behavior for every action stream. Constant positive/negative NAV32 errors rise from .03844/.03643 to .05352/.05223. Returning-cue error and perturbation-induced pose error also increase slightly within their allowed margins. “Without harm” was operationalized by those margins, not exact equality.

<figure>
  <a href="{{ '/assets/research/soam-e0/hold-blindfolded.png' | relative_url }}"><img src="{{ '/assets/research/soam-e0/hold-blindfolded.png' | relative_url }}" alt="E0-HOLD NAV32 SHORT24 and LONG128 descriptive mean trajectories across twenty paired roots." loading="lazy"></a>
  <figcaption>Follow-up figure with clarified labels. Descriptive means have no confidence bands; the thirteen adjusted criteria above own the decision.</figcaption>
</figure>

## Mandatory controls and diagnostic limits

| Model | Zero-action drift SHORT → LONG | Blindfolded action NMSE (64 steps) SHORT → LONG | Transverse ratio SHORT → LONG |
| --- | --- | --- | --- |
| NAV32 | 12.332° → 5.698° | .03290 → .03651 | .10684 → .13996 |
| SYM32 | 17.085° → 5.388° | .32763 → .35428 | .22372 → .21948 |
| GRU32 | 12.975° → 2.631° | .07717 → .26582 | .12052 → .11924 |
| PCA2, one reference | .00000167° | .0005688 | 1.000 |

These means are descriptive; complete ordinary 95% root intervals and paired differences appear below. GRU32's improved holding accompanies markedly worse navigation in this recipe. SYM32 retains poor action prediction. PCA2 is the compact accuracy reference, with supplied zero-action identity and no transverse restoration. None establishes a universal Hopfield advantage or a necessary stability–navigation tradeoff.

## Resources, exposure and reproducibility

| Model | Persistent scalars / bytes | Active state floats | Prediction MAC proxy |
| --- | --- | --- | --- |
| NAV32 | 4,044 / 16,176 | 32 | 2,048 |
| SYM32 | 4,044 / 16,176 | 32 | 2,048 |
| GRU32 | 5,324 / 21,296 | 32 | 3,168 |
| PCA2 | 52 / 208 | 6: two means, four covariance entries | 36 |

Counts include initializers, readouts and correction layers. Allocated symmetric/skew matrices have redundant coordinates; effective core matrix degrees of freedom are 1,024 for NAV32 and 1,056 for SYM32. Each model uses a prior workspace of its state size. The shared fixed projection adds 24 float32 values, 96 bytes. There are no stored training exemplars, cloned populations or external retrieval store at inference. Optimizer state, data and diagnostics are included in process RSS and artifacts, not persistent model memory. MAC proxies omit nonlinearities, elementwise operations, symmetrization and small inverses; evaluation timings include diagnostics and are not production latency measurements.

Each fit uses 19,200 original prefix episodes and 480,000 distinct original sensory snapshots. Neural fits perform 600 updates. LONG128 adds a mean **501,248.8 stationary transition evaluations and repeated target comparisons**, with zero new observations. NAV32 fit CPU increases from 2.9008 to 9.6263 seconds, about 3.32×. This is not compute-matched. PCA2 uses two prefix passes and no optimizer steps. The extended loss's final hundred-update mean remains below the previous hundred's (.03861 versus .04204 for NAV32); that is a motivation to test optimization effort, not proof of underfitting.

| Execution record | E0 | E0-HOLD |
| --- | ---: | ---: |
| Scientific fits, all complete | 58 | 147 |
| Additional fixture fits | 4 | 7 |
| Independent confirmation roots | 10 | 20 paired |
| Numerical CPU / execution-wall seconds | 150.927601 / 151.144840 | 826.872116 / 827.135330 |
| Audit, tables and figures CPU / wall seconds | 2.035203 / 2.041270 | 2.023757 / 2.026321 |
| Peak RSS, bytes | 336,904,192 | 354,746,368 |
| Raw artifact bytes | 155,163,746 | 544,009,667 |
| Exact repeated arrays / checkpoint tensors | 108 / 29 | 189 / 54 |
| Independently checked root metrics / adjusted intervals | 280 / 28 | 980 / 13 |
| Final-source passing tests | 339 | 348 |

E0 limits were 3,600 CPU / 7,200 execution-wall seconds, 2 GiB RSS and 1 GiB artifacts. E0-HOLD limits were 7,200 / 14,400 seconds, 2 GiB RSS and 2 GiB artifacts. All passed. Fixtures, development where applicable, confirmation, repeats and numerical reporting were charged; software engineering and tests are separate. E0's postprocessing total includes two audit/figure passes, preserving the first pass history. Neither pass fitted models. Each run stopped after its frozen inventory, with no retry or budget extension.

Both used Python 3.12.13, NumPy 2.5.4 and PyTorch 2.14.1 on macOS 26.6.2 arm64: deterministic CPU Torch, one thread, float32 recurrent models, float64 PCA/ridge and statistical reductions. E0 verified 148 frozen source files and 124 checkpoint/array hashes. E0-HOLD verified 153 current source files, all 148 historical E0 files unchanged, 308 checkpoint/array hashes and a 621-file raw archive inventory. Invariant tests cover data separation, no-write inference, reproducibility, matched initializations/prefixes, tail restrictions and equal episode weights.

### Configuration and source identity

E0 protocol/manifest: `docs/STUDY_E0_PROTOCOL.md`, `docs/protocols/study_e0_v1.json`. Harness commit `7168e2e`; development began at `7b07dd4`; selection and confirmation source commit `95e7fd076084522829bcc78ada70c391a52571f3`.

- Scientific source fingerprint: `4dd66fc4194336388dc8a96a742d157eab7eceac521112760f385744d5b21622`.
- Manifest SHA-256: `2bfe858e5aaa4bc5bc4d218313fa4bfc03868cb49d0eb451b4e5351f64c69973`.
- Configuration SHA-256: `9a51051df6b6dc6cb5a1e146551d7e3218520af7aecb28618ba13cb229db7a74`.

E0-HOLD protocol/manifest: `docs/STUDY_E0_HOLD_PROTOCOL.md`, `docs/protocols/study_e0_hold_v1.json`. Harness commit `6733775`; confirmation source commit `cff19dd3597606941458bc1691c3f1a9a27cd256`.

- Scientific source fingerprint: `6501d4de87f6fd9c7b352c6142eb98ccc4353a813bd46fa5052eafec05a8c307`.
- Manifest SHA-256: `a00dfbf23ef1c2b1a781f6481cb7f950085a37f03556fded8af007d62c0693cd`.
- Configuration SHA-256: `0634f6691b22eb9e5591d0b07d3efebe98a35e6233f2c5cabe9a10b08ec9874c`.

The project records are `reports/STUDY_E0.md`, `reports/STUDY_E0_HOLD.md`, their decision reports and the corresponding `reports/study-e0/` and `reports/study-e0-hold/` receipts, root tables, analysis scripts and checksum inventories. Full raw archives remain local under `runs/study-e0-v1` and `runs/study-e0-hold-v1`. These paths identify project records; they are not download links. This publication includes methods, aggregate results and figures with clarified labels, without publishing source or raw-data bundles. No fitting or new bootstrap estimation was performed for publication.

## Interpretation and conditional recommendation

These experiments separate stationary retention, action-conditioned prediction and local disturbance response. Supplied rank-two sensory geometry, clean target supervision, inherited tuning, finite horizons, small perturbations and bounded independent-root counts restrict the claim. They establish no continuous invariant manifold, capacity gain, learned reference frame, shared-neuron benefit, compositionality, acquisition capability or neuroscience validation.

SOAM-101 recommends, conditionally, one fixed optimization-budget comparison at the 128-step stationary horizon. It would replay the same prefix corpus, predeclare one larger update count, use fresh roots and resource controls, and retain navigation/recovery guardrails. The completed run is not extended. More optimization is not assumed to fix drift or recovery. Coupling, translation, RIM-like routing, hierarchy and sparse encoding remain future capabilities; no numerical successor is activated here.

## Full descriptive follow-up tables

The following tables reproduce the archived reductions. All intervals here are ordinary descriptive 95% intervals over the twenty roots, distinct from the thirteen adjusted confirmatory intervals above. Lower is better except tangent retention, whose target is near one. Paired differences are LONG128 minus SHORT24. Degenerate PCA intervals reflect the supplied zero-action identity, not a general zero-risk guarantee.

### NAV32 endpoints

| Endpoint | SHORT24 | LONG128 |
| --- | --- | --- |
| Blindfolded action NMSE (64 steps) | 0.0329005 [0.0295632, 0.0371969] | 0.0365065 [0.0338843, 0.0392005] |
| Grounded NMSE | 0.00689544 [0.00581089, 0.00826015] | 0.00805349 [0.00735645, 0.00884529] |
| Zero-action drift, ° | 12.3324 [11.2445, 13.6428] | 5.69773 [5.38681, 6.0163] |
| Transverse ratio | 0.10684 [0.0945697, 0.119538] | 0.139958 [0.122521, 0.156568] |
| Induced pose error, ° | 0.186243 [0.177003, 0.195486] | 0.221384 [0.204545, 0.237333] |
| Tangent retention | 0.987359 [0.983262, 0.991063] | 0.982743 [0.979427, 0.986044] |
| Returning-cue NMSE | 0.00402339 [0.00377164, 0.00429183] | 0.00530636 [0.00502794, 0.00560204] |

### SYM32 endpoints

| Endpoint | SHORT24 | LONG128 |
| --- | --- | --- |
| Blindfolded action NMSE (64 steps) | 0.327634 [0.303794, 0.352675] | 0.354281 [0.328374, 0.37977] |
| Grounded NMSE | 0.0301367 [0.0288127, 0.0314533] | 0.0356162 [0.0338523, 0.0372869] |
| Zero-action drift, ° | 17.0849 [15.5292, 18.7912] | 5.38794 [5.07228, 5.70147] |
| Transverse ratio | 0.223715 [0.213173, 0.234865] | 0.21948 [0.208644, 0.229673] |
| Induced pose error, ° | 0.87642 [0.831257, 0.925656] | 0.652449 [0.630196, 0.675487] |
| Tangent retention | 0.990595 [0.98527, 0.995265] | 0.984764 [0.981605, 0.987671] |
| Returning-cue NMSE | 0.0128774 [0.0118318, 0.0139723] | 0.0157859 [0.014418, 0.017217] |

### GRU32 endpoints

| Endpoint | SHORT24 | LONG128 |
| --- | --- | --- |
| Blindfolded action NMSE (64 steps) | 0.0771703 [0.0682723, 0.0874571] | 0.265815 [0.237733, 0.294108] |
| Grounded NMSE | 0.00735498 [0.00699708, 0.00775162] | 0.0132893 [0.01235, 0.0143347] |
| Zero-action drift, ° | 12.9749 [11.2569, 14.8145] | 2.63115 [2.38296, 2.87429] |
| Transverse ratio | 0.120523 [0.113435, 0.127281] | 0.119239 [0.113648, 0.124772] |
| Induced pose error, ° | 0.986031 [0.953409, 1.01723] | 0.838072 [0.804717, 0.870595] |
| Tangent retention | 0.999761 [0.998878, 1.0006] | 0.99985 [0.999045, 1.00072] |
| Returning-cue NMSE | 0.0071584 [0.00679334, 0.00754419] | 0.0122636 [0.0115378, 0.0130297] |

### PCA2 reference

| Endpoint | Mean [95% interval] |
| --- | --- |
| Blindfolded action NMSE (64 steps) | 0.000568776 [0.000534997, 0.000609759] |
| Grounded NMSE | 4.5372e-05 [4.14395e-05, 5.03748e-05] |
| Zero-action drift, ° | 1.66684e-06 [1.58038e-06, 1.76415e-06] |
| Transverse ratio | 1 [1, 1] |
| Induced pose error, ° | 9.60871e-06 [7.9509e-06, 1.17784e-05] |
| Tangent retention | 1 [1, 1] |
| Returning-cue NMSE | 4.03087e-05 [3.73023e-05, 4.37565e-05] |

### Paired differences

| Endpoint | NAV32 | SYM32 | GRU32 |
| --- | --- | --- | --- |
| Blindfolded action NMSE (64 steps) | 0.00360598 [0.00067086, 0.00592524] | 0.026647 [-0.0015387, 0.0533523] | 0.188645 [0.164413, 0.213374] |
| Grounded NMSE | 0.00115804 [-0.000208432, 0.00226305] | 0.00547946 [0.00386384, 0.00711058] | 0.00593434 [0.00521388, 0.00675767] |
| Zero-action drift, ° | -6.63463 [-8.05516, -5.4285] | -11.6969 [-13.3172, -10.1601] | -10.3437 [-12.1392, -8.65834] |
| Transverse ratio | 0.0331174 [0.0155364, 0.0519631] | -0.00423446 [-0.0169767, 0.00777109] | -0.00128351 [-0.00660077, 0.00433345] |
| Induced pose error, ° | 0.035141 [0.0186508, 0.0515727] | -0.223971 [-0.272848, -0.180757] | -0.147959 [-0.170517, -0.126687] |
| Tangent retention | -0.00461644 [-0.00945553, 8.34246e-05] | -0.00583062 [-0.011708, 0.000534356] | 8.89921e-05 [-0.00120727, 0.0014077] |
| Returning-cue NMSE | 0.00128296 [0.00103356, 0.00153182] | 0.00290854 [0.00181662, 0.0040831] | 0.00510523 [0.00460612, 0.00562662] |

### Direction/speed diagnostics (root means; no confirmatory claim)

| Cell | Interpolation | Extrapolation | Positive constant action | Negative constant action |
| --- | --- | --- | --- | --- |
| NAV32/SHORT24 | 0.0306883 | 0.0328403 | 0.0384445 | 0.0364302 |
| NAV32/LONG128 | 0.0369944 | 0.0377133 | 0.0535167 | 0.052227 |
| SYM32/SHORT24 | 0.0895993 | 0.758702 | 1.55292 | 1.45803 |
| SYM32/LONG128 | 0.104007 | 0.767203 | 1.40658 | 1.49702 |
| GRU32/SHORT24 | 0.0301573 | 0.187609 | 0.0777692 | 0.0581635 |
| GRU32/LONG128 | 0.0859706 | 0.504425 | 0.697544 | 0.668857 |
| PCA2/REFERENCE | 0.000407857 | 0.000903689 | 0.000501483 | 0.000507971 |

### Resource and exposure means per fitted root

| Cell | Scalars / bytes | Active floats | Fit CPU s | Evaluation CPU s | Extra stationary transitions | Final 100 loss | Previous 100 loss |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NAV32/SHORT24 | 4044 / 16176 | 32 | 2.9008 | 0.0717 | 0.0 | 0.0308798 | 0.0329597 |
| NAV32/LONG128 | 4044 / 16176 | 32 | 9.6263 | 0.0723 | 501248.8 | 0.038609 | 0.0420363 |
| SYM32/SHORT24 | 4044 / 16176 | 32 | 2.8901 | 0.0715 | 0.0 | 0.0408989 | 0.043945 |
| SYM32/LONG128 | 4044 / 16176 | 32 | 9.5418 | 0.0718 | 501248.8 | 0.0461236 | 0.050601 |
| GRU32/SHORT24 | 5324 / 21296 | 32 | 2.8356 | 0.0767 | 0.0 | 0.0295213 | 0.0317592 |
| GRU32/LONG128 | 5324 / 21296 | 32 | 9.4985 | 0.0765 | 501248.8 | 0.0421591 | 0.0479763 |
| PCA2/REFERENCE | 52 / 208 | 6 | 0.4879 | 0.0872 | 0.0 | n/a | n/a |

Each neural fit has 19,200 original prefix episodes / 480,000 distinct original sensory snapshots and 600 optimizer updates. Extra stationary targets reuse existing supplied targets; they add no observations. PCA2 uses two passes over the original data and no optimizer steps. Model parameter counts include initializers/readouts/correction. The common fixed projection is 24 float32 values (96 bytes). Evaluation CPU includes geometry diagnostics and is not a production-latency benchmark.

