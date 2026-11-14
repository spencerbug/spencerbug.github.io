# Study C v1 — preserving two hypotheses under ambiguity

November 14, 2026. SOAM-078 owns this protocol, lightweight RFC and fresh routing
decision. The [owner request](requests/study_c_2026_11_14.md) selects C-H1 only;
SOAM-079 implements, SOAM-080 measures, SOAM-081 interprets. C-H2 selective
computation and C-H3 learned allocation remain conditional. This study does not
reactivate SOAM-037, pass SOAM-052, or activate SOAM-053's policy experiment.

## Historical basis and decision question

E1 stopped the tested S32 useful-sharing claim. A's practical adaptive-update
benefit was inconclusive and ordinary recurrence was competent. B retained separate
prediction/correction and PC16 with leak .5, correction gain .5, motion gain 1,
zero settling. B2 recommends ADAPT1 and NISEMP within its observation assumptions;
coherent corruption and measured Torch latency remain limitations. These are
historical decisions, not transferred numerical performance promises.

Reviewed sources include the research specifications, experiment contract,
hypothesis ledger, research paths, E1 gate, A v1/v2 and decision, B v1/magnitude
and decision, and B2 protocol/audit/development/results/decision. The published
[A/B article](https://spencerbug.github.io/blog/soam-studies-a-b-gates-and-correction/)
and [detailed report](https://spencerbug.github.io/research/soam-studies-a-b/) were
retrieved November 14; they preserve these distinctions and contain no Study C
result. The local Qwen worker was unavailable (`Transport closed`); review is direct.

Question: does retaining distinct candidate trajectories improve proper probability
scores beyond competent single-state inference, including a larger neural state and
a collapsed conventional mixture? A conventional mixture or a single state may win.
Separate state factorization, raw capacity and estimator-family effects. Shared
parameters with separate states are not shared neurons or simultaneous attractors.

## Task and observability

One supplied family has exactly two regimes k in {-1,+1}. Simulator coordinates
x=(x1,x2) evolve with unit time:

`x1'=.98*x1 + .08*k*a0*x2 + .03*a1; x2'=.98*x2 + .03*a2`.

The unchanged seed-1729 orthonormal sensory projection maps x to twelve features.
Inference never receives that matrix, its inverse, coordinates, true k, condition,
event time, random seed, future action/observation, or corruption flags. Training
provides clean feature targets and regime labels, equally to every model. The
bilinear family, two-dimensional filter rank, candidate descriptors {-1,+1}, and
the convention that k reverses a0 are supplied scaffolding. Transition/observation
coefficients are fitted afresh from those training records, not simulator formulas.

Every trial comprises a paired -/+ world with identical initial position, noise,
actions, masks and timing; pair members are randomly permuted in the batch. Initial
x1 is uniform [-.5,.5], |x2| uniform [.4,.8] with random sign. Actions a1/a2 are
bounded independent translations; a0 is zero before the declared probe. Initial
observation has all channels; later scheduled cues reveal six random channels with
SD .01 noise. All episodes have 48 transitions. No supplied focus/role differs by
truth; dt=1 and the candidate inventory are constants. Models have no batch-index
input or batch-normalization coupling.

If a0=0, both state recurrences are identical. By induction the full permitted
histories are identical, not merely their latest observations. With equal prior
weights the best attainable binary Brier score is .25 and accuracy is chance.
At a diagnostic step the candidate x1 separation is `.16*a0*x2`; initial |x2| is
bounded away from zero. A full-rank visible projection then carries discriminating
information (noise gives overlapping densities, not guaranteed identification).
During a sensing gap the states can diverge while every received history remains
identical. The first subsequent cue can distinguish the propagated trajectories.
Tests must verify masks, action histories, sequence lengths and all metadata too.

Six equally weighted primary conditions:

1. `later`: a0=1 from step 12, sensing every four steps.
2. `ambiguous`: a0=0 throughout, sensing every four steps.
3. `uninformative`: a0=0, larger prescribed translations, sensing every two steps.
4. `diagnostic`: a0=1 only at steps 12–15, sensing every two steps.
5. `misleading`: sustained probe from 12; cues at 12–19 follow the other static
   candidate, then true cues return. No fault flag is supplied.
6. `delayed`: sustained probe from 12, no cues during 12–27, first reveal at 28,
   then every four steps. Candidate trajectories must survive intervening motion.

Here steps denote the destination observation index (actions are indexed one lower).
Boundary conventions are tested. Prescribed actions are replayed equally; no policy
is learned. Persistent ambiguity and uninformative movement are distinct controls.

Secondary conditions use sustained diagnostic movement and every-four sensing:
independent channel corruption at 24–31; genuine regime reversal at 24; coherent
alternative evidence; and an unrepresented k=2 after 24. The coherent condition
receives exactly the genuine-change world's observations but retains the unchanged
world's evaluator targets and regime labels. This demonstrates a second identical-
evidence information limit. Unknown-regime rows have no correct two-way label after
24 and are excluded from Brier success claims. Report minimum predictive evidence
misfit and development-calibrated adequacy rejection separately from candidate choice.

## Representations, priors, and information parity

All models start from the same noisy initial cue, weights (.5,.5), and disclosed
candidate descriptions. No initialization uses an actual latent trajectory. The
supplied regime-switch hazard is .01 per step in all confidence updates. Training
includes represented changes; primary confirmation regimes are static. This mismatch
is explicit protection against an absorbing zero-probability hypothesis, not an
oracle event detector. Both candidate states are updated every physical step.

* **R1 / PC16:** one 16-value PC state with the retained fixed gains. Add a shared
  mean feature decoder D(h) and antisymmetric candidate decoder O(h), giving
  D(h)-O(h), D(h)+O(h), plus one support log-odds value. The single state may encode
  both candidates implicitly. Correction uses the support-weighted decoded prior
  residual and the original `.5*tanh(E[residual,mask])` rule. These extra decoders
  are the disclosed adaptation needed for candidate-conditioned prediction.
* **R2 / PCn:** same model with one development-selected width in {32,40}; choose
  the lowest development Brier, smaller width breaks ties. This brackets the 32
  hidden values in R3; parameter, workspace and arithmetic mismatches are reported.
* **R3 / TWO16:** two 16-value states with one shared PC16 initializer, transition,
  correction and decoder. Candidate k receives effective action (k*a0,a1,a2).
  Initially identical states acquire different meanings through this supplied
  conditional action; array position alone supplies no information about truth.
  Before prediction, mix previous states using normalized two-regime Markov
  transition weights (the same .01 hazard); this is a declared approximation for
  nonlinear hidden states. Then predict, score once, and correct both candidates.
* **F1 / ADAPT1-C:** one retained mean/covariance/reliability scalar and support
  weights. At each step form two temporary regime-conditioned predictive branches,
  score and ADAPT1-correct them, then immediately moment-match their posterior
  means/covariances using updated support. Retain the weighted reliability scalar.
  The next step starts both branches from this single Gaussian. Count the temporary
  two-branch workspace. This strong collapsed-mixture control retains uncertainty
  covariance rather than unfairly forcing a point estimate.
* **F2 / ADAPT1-M:** retain both candidate means/covariances/reliability scalars.
  Use standard conditional moment mixing under the declared Markov transition
  probabilities before predicting each regime. Immutable fitted maps are shared.
  Retained state multiplicity, not different training data, distinguishes F1/F2.
* **FILTER2-C/M and NISEMP-C/M:** mandatory continuity controls across all conditions.
  The same collapse/retain comparison uses original FILTER2 correction or B2's
  empirical rejection rule. No stronger alternative is dropped after confirmation.

The six conventional variants share one freshly fitted PCA/bilinear model per root.
PCA uses clean training features; ridge=.0001, nominal R=.0001, residual Q plus
1e-6 I. Effective signed actions use training regime labels only while fitting.
ADAPT1 reuses B2's orthogonal-disagreement estimate clipped [.0001,.25], alpha=1,
and matching Joseph covariance update. No new robust method is introduced. NISEMP
recalibrates its .99 pre-gating ordinary innovation thresholds on development by
visible-channel count. FILTER2 retains its historical float32 correction; ADAPT1
and NISEMP use float64 solves. The runner converts state dtype explicitly.

## Evidence, normalization and learning

`predict(previous,action) -> candidate prior predictions -> score current masked
observation -> update support once -> correct -> retain or collapse`.

Every observation contributes one pair of candidate scores to one belief update;
two likelihood evaluations do not constitute two independent observations. Prior
predictions and support-before-observation are archived separately from post-evidence
support and corrected outputs. Missing observations change no support except the
declared Markov prediction and perform no correction. Inference is no-write.

Filter scores use the Gaussian predictive covariance H C H' + R_previous I and
its log determinant on visible coordinates, before current-observation adaptation.
Neural scores use a diagonal predictive-residual variance estimated from a fixed
training calibration subset, floor .0001. Score differences are divided by one
development-selected temperature in {1,4,16,64}, then clipped to [-6,6]. Add them to
predicted log odds, normalize, and clamp probabilities only for logarithms at 1e-8.
These are calibrated scoring rules; approximate moments, clipping and plug-in
covariances prevent an assertion of exact Bayesian posteriors. Normalization alone
does not demonstrate calibration. Unknown-candidate adequacy uses each model's
development .99 quantile of its minimum untempered per-channel predictive misfit.

All neural models receive the same ordered training batches, with true-candidate
prior MSE, .5 times corrected reconstruction MSE and .05 times binary Brier loss.
No auxiliary counterfactual clean labels are given to one model alone. All supplied
regime labels and repeated use of training records are counted. Neural optimizer:
Adam, lr in {.003,.01}, betas .9/.999, eps1e-8, clipping1, no weight decay; 1200
updates, batch8, horizon48, cosine decay after600 to .01 times initial lr. Final
checkpoint only. Save training traces and development scores at1050/1200; >20%
late improvement flags unresolved competence and prevents a positive architecture
claim for that comparator. No automatic training extension.

Two development roots jointly select LR and temperature separately for PC16, PC32,
PC40, TWO16 (eight finite combinations each), then R2's width. Temperatures minimize
six-condition development Brier; finite inventory ties use numerical order. This
competence-oriented selection rule was fixed before the first fixture or fit. Conventional corrections share fitted maps and tuning
opportunity. Neural variance estimation uses the same 24 training batches for all;
development threshold/temperature fitting counts as additional calibration exposure.
Confirmation refits each selected model on independent training streams and applies
the globally frozen LR/width/temperature/NIS thresholds; no confirmation calibration.

## Endpoints, uncertainty and gates

Primary is binary Brier `(p(+1)-1[k=+1])²`, equivalent to half the two-class Brier
sum. For each episode weight the pre-reveal and post-reveal phases equally; split
at12 except delayed at28, including the misleading phase in post12. Persistent
ambiguity uses split12 solely for equal aggregation. Average episodes, six conditions,
then roots. The timestep after evidence uses updated support; prior Brier is separate.
No arbitrary early truth guess earns credit across exactly paired ambiguous worlds.

Ten independent fitted roots, 16 paired worlds per condition (32 episodes), same
histories for every model. Root means are independent statistical units. Use 20,000
paired-root bootstrap draws, ordinary95% intervals for every metric/guard, and a
fixed Bonferroni family of16 contrasts: four metrics for each comparison R3–R1,
R3–R2, F2–F1, R3–F2. Metrics: Brier improvement (reference minus candidate), prior
feature NMSE difference, ambiguous-phase Brier difference, misleading recovery-delay
difference. Recovery is first three consecutive p(true)>=.8 after true cues resume
at20, censored at episode end; report censoring and tail errors too.

An explicit-state benefit requires >=.01 mean absolute Brier improvement, adjusted
lower bound>0, adjusted width<=.04, and adjusted upper guard differences <=.02 NMSE,
<=.01 ambiguous Brier and <=4 physical steps recovery. Absolute candidate checks:
ambiguous Brier<=.26, informative final-eight Brier<=.15, prior NMSE<=.25, ordinary
95% upper false confident ambiguity rate (max p>.95)<=.05. Required reference
competence is final-eight informative Brier<=.18 and prior NMSE<=.30. Failure makes
that comparison inconclusive; it is not proof of candidate necessity. R3 must pass
both R1 and R2 comparisons for a neural multiplicity claim. Report F2–F1 separately.

Resource guards: R3 retained hidden/support capacity <=1.25 times R2; F2 retained
filter/support capacity <=2.5 times F1; candidate mean and p95 serial latency <=3
times its within-family single-state reference. R3–F2 reports a family tradeoff;
a recurrent advantage requires its Brier/accuracy guards and <=1.25 times F2 p95
latency. Count all persistent tensors, supplied constants, retained states,
temporary branches, covariances, confidence, initialization, calibration, fitting,
prediction/correction/evidence operations. Timing ratios receive ordinary paired-root
intervals; report their uncertainty alongside the prespecified point-ratio guard. A partial MAC count is not runtime.

Classification order: invalid execution; unresolved observability/competence or
precision; supported benefit; precise exclusion if the adjusted benefit upper
bound<.01 with width<=.04; otherwise inconclusive/tradeoff. A larger single state
accounting for R3's apparent advantage is a capacity explanation. If F2 is no worse
than R3 within .01 with a sufficiently precise interval and the declared cost guard,
the conventional mixture is sufficient. A wide interval is never equivalence.
Recommend the simplest competent supported architecture within this finite inventory.

Secondary diagnostics include candidate-conditioned and mixture prior/posterior
NMSE, Brier by condition/phase, NLL, reliability bins, wrong confident commitments,
post-reveal resolution/recovery, free prediction during gaps, unknown adequacy,
exact evidence-identical output equality, covariance PSD, failures and worst episodes.
Physical-coordinate visualizations use evaluator data only. No operating-mode,
selective-computation, attractor, learned-attention or neuroscientific claim follows.

## Finite allocation and stopping

Numerical manifest `protocols/study_c_v1.json` owns exact roots/counts. Separate
namespace `soam-study-c`, version1; train/development/confirmation/fixture/calibration
components use stable derived seeds. Commit baseline a552034, then immutable source
snapshot and per-file/aggregate hashes before each phase. Freeze the final selected
inventory/configs/source before generating any confirmation stream.

Ceilings: 7200 cumulative numerical CPU seconds, 14400 summed execution-wall seconds,
2 GiB peak RSS and 2 GiB artifacts, max70 base fits including fixtures/repeats; GPU0.
Reserve10% for validation/reduction. One CPU thread, deterministic Torch, float32
neural/FILTER2, float64 simulation/robust algebra/statistics. Fixture maximum40
updates per neural variant, one conventional fit; measured full-work projection
with1.5x CPU/storage and1.25x RSS must fit before development. Budget exhaustion,
nonfinite fit, invariant failure or incomplete mandatory inventory stops the study
as incomplete/invalid; no silent retry, seed replacement or budget extension.

Save every failed attempt and charge it. Source review, unit tests and unavailable
local-worker assistance are disclosed engineering overhead, outside numerical caps.
Save exact configs, input hashes, fitted checkpoints, per-root arrays, fitting traces,
environment versions, hardware, resource receipts, mean/p95/max warm inference
latency (batch1/32; three warmups,20 repeats), and report PNG/SVG figures. Repeat the
first confirmation root across the entire inventory, excluding timing from equality;
independently recompute endpoints from archived arrays. Refuse phase overwrites.

## Conditional follow-up gate

SOAM-081 must identify whether any unresolved result warrants a separately selected
complementary-state/scheduling study. Such a study would hold the selected multi-state
representation fixed, use two simultaneously valid independently moving components,
and compare full updates, freezing, motion-only updates, uniform/round-robin and
simple uncertainty/innovation schedules at matched observations/budget. Existence
weights would not be a mutually exclusive two-way distribution. Count deferred and
catch-up work, stale-state drift, switching continuity, interference and worst-case
cost; never reset from truth. Beating freezing alone is insufficient. Keep sensory,
motion, inference-compute and attention priorities independent. Learned allocation
requires a measured limitation of those fixed controls and fresh routing. None of
that work is implemented or automatically selected by this protocol.

## Protocol review — before implementation

SOAM-078: proceed with this bounded contract. The induction above establishes the
intended information limit; SOAM-079 must independently test the complete evidence
stream. The strong collapsed-Gaussian F1 and larger R2 prevent weak point-estimate
controls. Supplied sign semantics, label supervision, temporary branch work and
non-Bayesian score calibration are explicit. All historical prerequisites are done
and SOAM-077 proceeds for references; the owner's November14 selection supplies the
new routing condition. This accepts a test, not C-H1. Numeric feasibility and all
invariants remain required before scientific development. No other fork activates.
