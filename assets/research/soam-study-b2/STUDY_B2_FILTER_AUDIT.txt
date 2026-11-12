# FILTER2 audit and failure mechanism

Study B2, SOAM-074–076, 2026-11-12. Historical Study B code is unchanged.
The audit refitted root 12007 from its original 1200 training batches: fitted tensors
match exactly, as do all 216 archived prediction/error arrays. Original dependency
fingerprints also match. Receipt: `runs/study-b2-v1/audit/baseline-audit.json`.
This is historical reproduction, not a new independent root.

## What the implementation actually does

[Linear](../soam/temporal/models.py) has a supplied two-state bottleneck. The fitting
routine in [temporal engine](../soam/temporal/engine.py) uses clean **feature** targets
for offline PCA, canonicalizes basis signs, fits the mean and an action-conditioned
bilinear transition by ridge regression, and estimates process covariance from
training transition residuals plus 1e-6 I. No simulator equation, true coordinate
label, or ground-truth projection inverse is supplied to this fitter.

Call the fitted observation matrix H (the source buffer is named P), state covariance
C, transition Jacobian F(a), process covariance Q. Initialization solves masked
ridge reconstruction; C0=(H'MH/1e-4+I)^-1. The mean initialization's ridge penalty
is 1e-4. Prediction uses the fitted bilinear map, or holds the mean in the supplied
recall role. Covariance always advances as F C F'+Q, including recall where F=I.

Correction is an information-form Kalman update:

`precision=(C+1e-10 I)^-1 + H'MH/R`

`Cpost=precision^-1`

`xpost=Cpost[(C+1e-10 I)^-1 xprior + H'M(z-mean)/R]`.

R is fixed 1e-4 per visible channel unless the explicitly labeled metadata diagnostic
is requested. The nominal SD argument is otherwise unused. Invalid features are
masked from both information and RHS. An entirely missing cue returns the entire
prior unchanged; the historical runner also skips its correction. No residual-size
check, robust likelihood or sensor reliability inference is present. Parameters are
buffers and correction changes only returned transient state/covariance.

The new STABLE control uses float64 solves and Joseph form with exactly the same
fitted maps/Q/initialization. It drops the historical 1e-10 jitter from the solve
because covariance is positive definite. Tests compare with a dense measurement-space
Kalman update and historical trajectories. Rejection returns prior mean/covariance;
scaled gains and effective R use matching Joseph uncertainty updates. PSD is tested,
not treated as proof of probabilistic calibration. No baseline scientific defect was
found; the explicit inverses are a numerical engineering limitation, not the cause
of the measured corruption failure.

## Diagnosed causes, with interventions

The root 12007 fitted Q eigenvalues are .00387608 and .00435293. This is **not** a
low-Q filter that assumes almost-perfect dynamics. Of 631.8343 total training residual
squared energy,621.1102 (98.303%) comes from genuine-change episodes. Their supplied
state sign reversal enters ordinary transition residual fitting. It is part of the
frozen training contract, preserved in B2. Other ordinary-condition residual sums
are about 1.05–1.13 each; altered-command motion contributes 3.1122.

Thus the filter is relatively uncertain about its prediction and extremely confident
about each nominal measurement. Development every 4 gain Frobenius norm is about 2.24–2.26,
for both clean and corrupted cues. Sensor outliers change innovation and posterior
mean, but not the gain or post-correction covariance for a fixed mask/action history.
A corrupted posterior then seeds subsequent action predictions until useful evidence
corrects it. Large invalid displacements can coexist with very small reported
posterior covariance. The stored residual, gain, covariance and error traces show
this path directly; repeated clean/corrupt masks isolate it.

The nominal high-noise condition has actual SD.10 versus assumed.01: 100x variance
mismatch. Development pre-gating NIS averages about 393–394 for six observed channels
on every 4, versus 3.96–3.97 for nominal partial sensing. The latter is below six,
consistent with Q overconservatism in the two signal directions and roughly four
noise-only directions. Ordinary state coverage is overly broad in clean conditions
and poor under high noise. A nominal chi-square threshold is therefore not an
appropriately calibrated detector across the task mixture.

Single-factor interventions support these explanations. R100 or Q/10 reduces the
relative weight of measurements and improves noisy/corrupt performance, with real
change delay. Scaling the correction gain also protects against faults but delays
change. R10 and Q/10 have nearly identical steady behavior; initial covariance
semantics make them distinct controls. One-step Huber inflation is often too small
relative to this large Q to prevent an aggressive correction. The new methods do
not jointly refit Q, H, B or any transition parameter.

## Reliability information and limits

The fixed learned feature manifold is two-dimensional. Six valid channels usually
provide four redundant residual directions. Errors outside this manifold can be
identified as measurement-model disagreement; a genuine state displacement cannot
produce them under a correct H. ADAPT1 uses this evidence to estimate scalar sensor
variance. It is an explicitly supplied statistical mechanism, not learned detection.
Its plug-in covariance can be biased and cannot describe arbitrary correlation or
latent observation-model drift; coverage and T9 remain essential diagnostics.

An error inside col(H) looks like a different valid state. The T10 pair supplies
exactly the same observations, masks, actions, roles and nominal SD to two worlds
with different hidden causes. Any deterministic filter must emit identical outputs.
At equal prior weights the midpoint minimizes paired squared loss, with lower bound
||target 1-target 2||²/4. There is no evidence here from which to infer the true cause.
T3/T4 additionally expose isolated and sustained plausible alternatives. Temporal
consistency can shorten real-change delay while also trusting sustained false data.

All NIS summaries use pre-gating innovations; accepted-only statistics are separately
reported and are selected distributions. Empirical thresholds were calibrated from
all ordinary development innovations, not accepted-only observations. ADAPT1's NIS
uses a current-measurement plug-in R, so it is not a nominal predictive chi-square
statistic. None of these robust weights is claimed to be an inlier probability.

See [primary literature and assumption map](../docs/STUDY_B2_LITERATURE.md),
[development routing](STUDY_B2_DEVELOPMENT.md), and the final scientific report.
