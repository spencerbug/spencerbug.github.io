# Study B v1: temporal sensory assimilation

2026-11-11. SOAM-066 owns this protocol, lightweight RFC and fresh branch selection;
SOAM-067 implements, SOAM-068 measures, SOAM-069 interprets. Classification:
essential next. The owner explicitly selects Study B after Study A and approves
7200 CPU seconds / 14400 execution wall seconds / 2 GiB RSS / 2 GiB artifacts.
This is one experiment with prespecified comparisons, not activation of acquisition,
attention, multi-hypothesis state, persistent online learning or integration.
Historical SOAM-052 stop and all Study A outcomes remain unchanged.

## Evidence and architectural choices

[Study A](../reports/STUDY_A_DECISION.md) recommends ordinary fixed-leak R32 as a
competent small neural reference, accepting an accuracy cost. Adaptive-update
practical benefit was inconclusive. L2 captured low-order dynamics but its affine
partial-cue map and repeated correction were weak. Accordingly, search two ordinary
widths, correction mechanisms and bounded internal computation; add a learned-basis
filter with a mask-aware measurement solve. No symmetric-energy constraint or GRU
is required. The owner's prefatory correction supersedes the copied GRU requirement;
Study A's GRU results remain historical accuracy references, not information-matched
Study B scores. L2 is refitted on fresh Study B data as a historical-form control.

“50/50” is operationalized as fixed leak 0.5, fixed correction gain 0.5 and equal
recall/motion physical intervals with supplied role flags. It is not an unsupported
claim that half the neurons learn action and half learn features. Action and feature
affines have known input roles; all neural candidates maintain one state vector.

Request H1–H4 become B-H1 deliberate correction, B-H2 useful settling, B-H3 adaptive
sensory gain and B-H4 conventional recurrence sufficiency. They are subquestions
of historical H1/H6, not replacements for the hypothesis ledger's schema IDs.

## Information contract and event order

Inputs: 12 fixed projected features, 12 validity bits, 3 actions, two one-hot supplied
roles, and (only in the reliability-metadata comparison) nominal noise SD. The fixed
projection is unchanged (seed 1729). State initialization uses only the masked cue.
No model receives latent coordinates, projection coefficients/inverse, simulator
equations, corruption labels, state-change labels or future targets. Training uses
full feature targets equally for every candidate; inference receives scheduled
masked measurements only. Target supervision is counted separately from inference
observations. Transient state and fitted tensors are separate; no fast memory or
persistent write exists. Learned filter covariance is transient state.

At physical t, begin from posterior h. Execute exactly one environment transition
using action a_t and dt=1. Compute prior F(h,a_t,q_t) and decode it before revealing
the observation. The evaluator scores this prior against clean features at t+1.
Only then reveal permitted observation/mask/noise metadata, correct, and optionally
perform zero-time settling. Return the posterior for the next interval. Settling
has no environment API and uses zero action with recall role. It cannot perform
extra movement. Prediction accepts no target tensor. The simulator is a generator
separate from model inference; stress-event labels remain evaluator-only.

## Candidate inventory and equations

For neural width n, E0 maps [masked z,m] to tanh initial h; D is an affine readout.
Ordinary transition F(h,a,q)=0.5h+0.5tanh(Wh+Aa+Qq+b). Recall intervals have a=0.
F is fitted, including recall behavior: there is no guarantee it holds perfectly.
Internal S(h)=F(h,0,[1,0]) advances no physical time.

* MIX16/32: conventional simultaneous action/sensory RNN. The prior is F(h,a,q).
  When an observation arrives, recompute the posterior from the **previous** h:
  0.5h+0.5tanh(Wh+Aa+Qq+b+E[z,m]). This is a separate read-only predictive branch,
  not a second physical transition. No-observation posterior is the prior.
* PC16/32: prior F; residual r=m*(z-D(prior)); correction
  prior+0.5*tanh(E[r,m]). Skip correction for an empty mask. E has no bias.
* SET32: PC32 plus up to four S iterations after every sensed event, including
  the initial cue. No cue reinjection during S.
* REP32: PC32, then each extra iteration is 0.5h+0.5tanh(Wh+Q[1,0]+b+E[z,m]);
  counts repeated use of one observation, not extra grounded observations.
* MIXC32: MIX32 plus S iterations, the conventional equal-update control.
* GM32: PC32 with scalar gamma=sigmoid(g(m)); GR32 uses [m,r]; GS32 adds prior h;
  GA32 adds the action; GMETA32 adds nominal noise SD to GA32. All gains are learned
  offline. Mask/noise reliability and inferred reliability are kept separate.
* AM32: GA32 plus beta=sigmoid(b_gate([h,a,q]))*2 multiplying the action affine
  in F, independently of sensory gamma. beta initially 1; gamma initially 0.5.
* L2: original Study A learned PCA/bilinear dynamics and affine masked-cue
  initializer, fixed 0.5 blend. Fresh fitting, no reused confirmation evidence.
* RESET2: same learned PCA/bilinear dynamics, reconstruct coordinates by a
  regularized least-squares solve using the available rows of the learned decoder;
  replace state on observation, propagate between observations.
* FILTER2: same learned dynamics/decoder, covariance propagation through the fitted
  bilinear Jacobian, and a Kalman-form masked measurement update. Process residual
  covariance is fitted from training; noise variance is nominal 0.01 squared in
  the ordinary comparison. A supplied-noise diagnostic uses the actual nominal SD.
  Neither version knows whether a cue is corrupted. Count covariance state and solves.

The filter's two-dimensional bottleneck and bilinear features are supplied
structural priors; PCA is fitted from training features. No oracle competitor is
needed. Simulator equations remain only the task/evaluator implementation.

SET32/REP32/MIXC32 train with four internal iterations and supervision at all
iterations. Development selects k in {0,1,2,4}; all durations remain diagnostic
outputs. SET32 additionally has a learned scalar continuation head on h, trained
to predict whether the next S iteration decreases clean-feature reconstruction
error. Its training label uses observed training targets only. At evaluation,
continue while sigmoid(head(h))>=0.5, maximum four; the head never sees the target.
The event-driven control instead continues while mean squared successive output
change exceeds 0.01 times training feature variance, with one mandatory iteration.
This is a scheduling heuristic, not evidence that contraction improves inference.
Fixed, event-driven and learned schedules use identical input events and max four
iterations; realized update/MAC cost is reported. A fixed-period control permits
settling only after sensed even physical times. It never changes sensing schedules.

## Fresh data, schedules and stress tests

Namespace/version, roots and finite inventory are in
[the manifest](protocols/study_b_v1.json). Use the unchanged E1 transition
x'=0.98R(0.30a0)x+0.03[a1,a2], recall holds x, initial radius [0.4,0.8]. Train uses
even angular sectors and action-bin checkerboard; held-out streams use odd sectors
and complementary action bins. Split/component seeds are independently derived.
Physical roles alternate in eight-step blocks with equal recall/motion exposure;
episode parity reverses the initial role. Actions vary each movement step.

Evaluation has 20 paired episodes/root, 64 physical steps, all six schedules:
every 1/2/4/8, a predetermined seeded irregular schedule with gaps 1–8, and only
initial cue. Identical clean trajectories, noise draws and potential masks are
reused across schedules within a condition. Initial cue is always available.
Conditions are crossed with all schedules:

| Condition | Permitted observations or evaluator intervention |
| --- | --- |
| clean | All 12 features, Gaussian SD 0.01 |
| partial | Six random valid features, SD 0.01 |
| missing | Six features; independently predetermined 25% scheduled event dropout |
| noise | Six features, SD 0.10 |
| corrupt | Six features, SD 0.01; additive SD 0.50 at times 24–31; metadata still 0.01 |
| contradict | Six features; negate observed signal at times 24–31, preserving masks |
| change | Genuine latent sign reversal at time 24, then normal dynamics; observation is accurate |
| motion | Action magnitude doubles and direction reverses at times 24–39; commanded action supplied |
| gap | No observations at times 17–48, then the original schedule resumes |

Corruption and genuine-change cases explicitly separate an untrustworthy snapshot
from a valid surprising observation. Training cycles over the six schedules and
nine conditions with event windows scaled to the 16-step training horizon.
The clean target is the full sensory projection of the training world, not hidden
coordinate supervision. All candidates receive exactly the same training records,
targets, tuning alternatives and evaluation observations for a root. Baselines fit
the same clean transitions; differently structured training computation is costed.

## Training, selection and stopping

Two development roots; each candidate gets two settings: Adam LR 0.003/0.01 or
ridge penalty 0.0001/0.01. Neural batch 8, 1200 updates, horizon 16, clip norm 1,
Adam defaults, no weight decay. Common cosine decay over updates 601–1200 to 0.01
of base LR. No early stopping or best checkpoint. Loss is pre-correction MSE plus
0.5 times the mean reconstruction MSE across correction/internal stages (including
initial cue), plus SET32's 0.01 continuation BCE. The stage mean prevents four
settles from quadrupling a loss coefficient. Extra training operations remain a
resource difference, not a temporal causal effect.

Select per-candidate settings and per-settling-candidate k by mean primary NMSE on
two development roots. Lexical config/k order breaks exact ties. Checkpoints
300/600/900/1050/1200 show training and development curves; >20% mean primary
improvement from 1050 to 1200 flags unresolved optimization. No automatic schedule
extension. Freeze source, manifest, data-generation identity, selected settings/k,
development metrics, resource projection and remaining budget in an immutable
receipt before any confirmation generation. Ten fresh confirmation roots and a
prespecified complete root-12007 repeat. At most 272 fits: 16 fixture + 64 development
+ 160 confirmation + 16 repeat = 256; the manifest's 272 ceiling includes at most
16 failed attempts, never automatic retries or new scientific configurations.

Fixture fits use 20 updates and small batches solely to calibrate resources and
software; their errors cannot select architectures. Before full fitting, project
all planned phases with 1.5x timing/storage and 1.25x peak-memory margin. Stop on
budget exhaustion with missing inventory visible. Scientific design changes need
a preserved version and fresh confirmation streams. The same source must fit
development and confirmation; exact reviewed orchestration amendments may preserve
scientific hashes, with original source and amendment recorded.

## Endpoints and decisions

Primary J: equally weighted root means of **pre-correction** NMSE over all 64 steps,
four intermittent schedules (2,4,8,irregular) and three conditions
(partial,missing,noise). Normalize by a 2048-sample independent training-distribution
feature variance, float64 reductions, floor 1e-6. Primary B-H3 contrast is
GA32 gain (J_control-J_GA32)/max(J_control,1e-6), separately versus PC32 and MIX32.
This makes mask/residual/state/action gating the predetermined test; architecture
search does not choose a new primary winner from confirmation.

Support requires >=10% mean gain, lower adjusted CI >0, width <=0.40 for both
contrasts; GA32 absolute J<=0.15; all finite; no unresolved optimization in the
three primary candidates. Guardrails are GA32-minus-control errors for clean,
corrupt, change and initial-only free32, each upper adjusted bound <=0.01 NMSE.
The two gains plus eight guards form one 10-contrast Bonferroni percentile family;
20,000 paired-root bootstrap samples, fixed seed 12203. Report ordinary 95% root
intervals for every endpoint as well. Timesteps are not independent replicates.
Thresholds are explicit engineering choices, not biological or universal margins.

Invalid/leaking/incomplete execution takes priority. Unresolved competence,
optimization or interval width makes attribution inconclusive. Supported requires
all criteria. A gain upper bound below 10% with adequate precision rules out that
declared practical gain against that control; confidently harmful guards give a
tradeoff, not a clean benefit. Other cases are inconclusive. Wide intervals are
never equivalence. B-H1, B-H2, motion coupling and the architecture frontier are
prespecified secondary comparisons with descriptive intervals, not new primary
hypothesis tests. Include all competitors and failed fits.

Report prior/posterior/internal-iteration errors, free8/free32 (initial-only,
average across the first 8/32 steps), gap error by age, observation-resumption
recovery, corruption and true-change responses, cue information retention,
noise effects, gamma/beta by context, actual update counts, linear MAC estimates,
nonlinear/solve costs, parameter bytes, transient state, initialization and total
training/inference CPU. Recovery is first of three consecutive post-event errors
below max(0.01 NMSE, twice pre-event baseline), otherwise right-censored at horizon.
Record cue-specific output variance and reconstruction during unforced settling;
state convergence alone is never useful recovery. No probabilistic neural confidence
is modeled; sigmoid gamma is a control gain, not a calibrated probability.

For equal-update settling comparisons, SET/REP/MIXC use the same k and receive the
same distinct observations; show all k. Exact MAC/parameter parity is not asserted.
Fixed-k versus adaptive schedules has matched maximum, not necessarily matched
average compute; show realized costs and accuracy Pareto plots, including the
simple filter. Training CPU is a separate axis. Claim temporal benefit only under
the demonstrated resource match, never from additional uncosted updates.

## Provenance and deliverables

CPU, float32 model operations, float64 fitting/reductions, one Torch thread and
deterministic algorithms. Save source commit, exact source snapshots/SHA-256,
software/hardware versions, seed derivations, data hashes, frozen receipt,
checkpoints, traces, per-root/per-condition metrics, internal errors and budget
ledger including failures. Deterministic generation plus archived source replaces
duplicated training archives; save numerical input hashes and reproduce them.
Repeat compares inputs, fitted tensors, traces and predictions, excluding time.

Deliver reports/STUDY_B.md, reports/STUDY_B_DECISION.md, a focused primary-source
biological note, machine-readable tables and static plots. The biological note
separates evidence about theta phases, landmark correction, corollary discharge and
mismatch responses from engineering analogies. It does not justify a fixed oscillator.
Tests cover event order, missing masks, zero-time settling, state/parameter separation,
causal input access, deterministic splits, filter fitting, resource stops and root-level
statistics. Repository tests and local-worker review are disclosed engineering costs
outside the numerical trial ceiling. No remote publication is authorized.
