# Study B2: primary-source mechanism map

Reviewed 2026-11-11/12. These are scoped mechanism checks, not a systematic review.
Owner's [A/B article](https://spencerbug.github.io/blog/soam-studies-a-b-gates-and-correction/),
[report](https://spencerbug.github.io/research/soam-studies-a-b/) and
[series](https://spencerbug.github.io/research/soam-studies/) were retrieved directly
when the web reader failed. They agree with the local preserved Study B decisions:
FILTER2 ordinary advantage, corruption failure, and no declared practical learned-gain
benefit. Their completed results are motivation, not B2 confirmation data.

| Source | Relevant result and assumptions | B2 use / limit |
| --- | --- | --- |
| [Piché, Online tests of Kalman filter consistency (2016)](https://researchportal.tuni.fi/en/publications/online-tests-of-kalman-filter-consistency/), DOI10.1002/acs.2571 | NIS evaluates predictive consistency without knowing true state or future data. Nominal reference needs an appropriate predictive model. | Test pre-gating statistics. FILTER2's fitted process residuals include abrupt changes and its R ignores high-noise episodes, so nominal chi-square calibration cannot be presumed. |
| [Fang, Haile & Wang (2018)](https://www.merl.com/publications/TR2018-173), [paper](https://www.merl.com/publications/docs/TR2018-173.pdf) | Saturating innovations limits outlier influence; the paper derives adaptive bounds and bounded-error results under its stated bounded-outlier/system assumptions. | Motivates comparing hard rejection with bounded influence. B2 uses declared one-step Huber covariance inflation, not a claimed replication of their adaptive saturation algorithm or proof. No hidden-state clipping. |
| [Roth, Özkan & Gustafsson (2013)](https://people.isy.liu.se/en/rt/roth/tfilter.pdf), DOI10.1109/ICASSP.2013.6638770 | Student-t state/noise distributions permit heavy tails; tractable recursive filtering requires joint-distribution approximations. Scale is not covariance; finite degrees of freedom matter. | A representative heavy-tail extension is conditional on a distinct remaining failure. It must be compared with simpler weighting, and its iterations/solves counted. A Student-t-shaped weight alone is not the full published filter. |
| [Roth et al. (2017)](https://arxiv.org/html/1703.02428v1) | Explains joint-t approximations, nonlinear measurement-dependent matrix updates and problems with moment matching; gives a KL-based approximation. | FILTER2's action-conditioned transition is linear in state for fixed action, but learned model mismatch and unknown observation regimes violate a clean correctly specified model. Covariance coverage must be measured rather than inferred from PSD. |
| [Fisch, Eckley & Fearnhead](https://arxiv.org/abs/2007.03238), [author manuscript](https://eprints.lancs.ac.uk/145566/2/Robust_Kalman_All_REVISION_2.pdf) | CE-BASS represents additive and innovative outliers with a particle mixture; past-state resampling handles delayed visibility and multimodality. | Motivates distinguishing sensor faults from state/dynamics changes and measuring latency. The multi-hypothesis particle machinery is beyond this compact-corrector study; no implication that history resolves identical evidence. |
| [Or, Selection-Induced Contraction of Innovation Statistics in Gated Kalman Filters](https://cris.technion.ac.il/en/publications/selection-induced-contraction-of-innovation-statistics-in-gated-k/), DOI10.1109/TAES.2026.3738755, institutional record accepted/in press2026 | Ellipsoidal gating conditions the innovation distribution and contracts its covariance even for a correctly specified Gaussian model; association adds selection. Reviewed institutional abstract, not a full proof audit. | Archive all pre-gating innovations and accepted-only statistics separately. Never tune nominal R from accepted-only sample variance. A bounded adaptive estimate may be intentionally biased for robustness; report it as a control rule, not an unbiased covariance estimator. |

For z=Hx+e with full-rank R, innovation dimension is the number of observed
channels, even though signal rank is two. S=HCH'+R is generally correlated. A
masked six-channel innovation has six nominal chi-square degrees of freedom,
not two. Channel marginal tests are dependent; B2 does not interpret their
individual weights as independent probabilities.

Given H of rank2 and m>2, projection onto the orthogonal complement of col(H)
removes any state displacement, exposing measurement-model disagreement. This
can inform observation reliability from evidence alone under a fixed correct H.
It cannot detect errors H d that look exactly like a new state. With m<=2 there
may be no redundant measurement direction; B2 masks use6/12, and tests cover
arbitrary masks without claiming that the benchmark establishes sparse-sensor power.

If two worlds have the same permitted evidence history and actions, any deterministic
estimator has identical outputs. For equal-prior targets u and v the smallest mean
squared error across the pair is ||u-v||²/4 (the midpoint). Longer history helps only
when the scenarios eventually generate different evidence. A coherent persistent
sensor alternative can remain indistinguishable from a genuine trajectory change.
