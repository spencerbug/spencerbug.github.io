# Study B2 decision and Study C handoff

2026-11-12. SOAM-077: **proceed with the scoped conventional-reference recommendation**.
B2 is complete and reviewed. This decision selects no next experiment and does not
implement or authorize Study C. Historical SOAM-052 stop, SOAM-069 revise, Study A's
inconclusive practical-gate result and Study B's final interface decision are preserved.

## Evidence and recommendation

The [scientific report](STUDY_B2.md), [frozen primary statistics](study-b2/statistics.json),
[FILTER2 audit](STUDY_B2_FILTER_AUDIT.md), and [development record](STUDY_B2_DEVELOPMENT.md)
support a bounded correction benefit. ADAPT1 improves balanced corruption by 52.69%
with adjusted interval [50.11%,55.06%]; NISEMP improves 45.01%[42.23%,47.58%]. Both pass
all frozen guards, absolute targets and precision. Their results reproduce exactly.
No baseline defect or scientific execution failure explains the benefit.

Use **ADAPT1 as the default robust single-hypothesis conventional reference** on this
fixed low-dimensional observation model. It estimates a bounded scalar measurement
variance from redundant channel disagreement and uses a matching Kalman/Joseph update.
It needs no learned reliability network or temporal change detector. Keep **NISEMP**
as the smaller hard-gate control: no extra history, one per-mask-count empirical
threshold, excellent original-outlier rejection, but little ordinary-noise improvement.
Retain original FILTER2 and PC16 for continuity and the unresolved Pareto tradeoff.

This is a post-study reference choice among a frozen finite inventory. It does not
claim global minimality. ADAPT1 uses 64 fitted scalars, one reliability scalar beyond
mean/covariance, and no added fit; it substantially reduces storage and fitting cost
relative to PC16. It does **not** win measured inference latency in this Torch
implementation. Coherent/sustained plausible offsets remain severe failures.

| Requested outcome | Decision |
| --- | --- |
| A: simple robust correction succeeds | Supported for empirical NIS gating on the balanced tested corruption endpoint, under all frozen guards; no general corruption guarantee |
| B: temporal change detection adds useful value | Development rescue reduces the hard gate's delay but fails the genuine-change target; hybrid also fails. Retain negative screens, no confirmation claim |
| C: heavy-tailed Bayesian filtering helps | Not tested after bounded routing selected covariance adaptation; no positive or negative mechanism conclusion |
| D: learned reliability helps | Not activated: statistical methods meet the target without another trained gate; previous B evidence is preserved, not reused as B2 confirmation |
| E: unresolved tradeoff / information limit | Applies to coherent plausible and sustained corruption; exact identical-evidence pair demonstrates lack of identifying information |
| F: original miscalibration explains the gap | Supported as part of the explanation: fixed R misses ordinary high noise and Q includes training changes. Fixed conservative recalibration alone fails change protection; no numerical-defect explanation |

The strongest tested practical choice is **measurement-disagreement covariance
adaptation**, with empirical NIS as a simpler alternative. It is a statistical
mechanism exploiting the supplied feature model, not evidence that general online
covariance learning or neural reliability estimation is solved.

## Study C handoff, without implementation

Essential for a future selected Study C protocol:

- Single hypothesis: ADAPT1 with frozen fitted maps, one mean, covariance and reliability
  scalar; NISEMP as the lean rejection control. Treat their remaining coherent-fault
  failure as a declared baseline limit, not something to silently repair during C.
- Multiple conventional hypotheses: independently maintained copies of the selected
  robust filter's **transient states/covariances**, with immutable fitted maps shared
  where appropriate. Count every active state, covariance, reliability/history buffer,
  solve, controller and supplied association. Shared weights do not mean shared neurons
  or shared instance state. C's protocol must choose a finite hypothesis count and
  define evidence allocation before implementation.
- Neural comparisons: PC16 as the robust recurrent reference; any shared recurrent
  hypothesis-state design needs its own causal/resource controls. A small attention or
  mode controller is conditional on C's question, not required by B2.
- Preserve `predict -> decode/score prior -> correct` and no-write inference. Separate
  measured state, desired successor, evidence allocation and motor authority. Corruption
  protection should be inherited explicitly so C can test hypothesis management.
- Include evidence-identical worlds and eventual disambiguation conditions. Maintaining
  alternatives can represent ambiguity but cannot reveal a hidden cause without new
  information. No B2 result establishes a need for primed/tracking/attended modes.

Parallel supporting research, if separately requested: characterize how observation
rank, biased/correlated noise, changing observation maps and implementation overhead
alter this reference. These are limitations, not activated experimental branches.
Future capabilities: active sensing or additional independent evidence; richer cause
models; a carefully scoped Student-t or learned controller only for a diagnosed gap.
No universal one-population or symmetric-energy claim follows.

## Validity, completion and communication

The primary experiment used ten independent fitted roots, paired episodes, immutable
source/configuration receipt, fixed budgets and multiplicity correction. The prescribed
repeat matches all eight candidates; independent reductions match 1040 values within
1.11e-16. Historical root 12007 refitting and 216 arrays reproduce exactly. One failed
storage projection is preserved, corrected before development without extending the
budget. All scientific fits completed; no roots were excluded. Detailed provenance,
resource ledger and tests are recorded in the experiment completion and final report.

The roadmap is now A complete, B complete, B2 complete, C/D/E future conditional,
F future planning. B2 satisfies C's review prerequisite, but a fresh named selection
and C-specific protocol are still required. No C implementation, remote GitHub issue,
blog publication or other research fork was started.

This result merits publication discussion because ordinary accuracy, outlier protection,
coherent ambiguity and measured runtime separate sharply even in a tiny estimator.
The owner was proactively informed; publication requires separate authorization.
