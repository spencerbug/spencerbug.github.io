# Study B v1 review: preserve the tradeoff and complete magnitude inputs

2026-11-11. SOAM-069 decision: **revise** the scope coverage before the final Study B
interface recommendation. The v1 execution is valid and complete; its primary
scientific outcome remains **tradeoff**. This is not a rewrite or invalidation of
the measured result, and it does not unblock dependent implementation by itself.

All 256 fits completed. All 80 reproduction checks match, and independent
reduction of 1920 headline values agrees with saved results. No scientific source,
configuration or criterion changed after confirmation exposure. See the
[report](STUDY_B.md), [tables](study-b/tables.md),
[primary decision](study-b/primary-decision.json) and
[audit](study-b/extended-audit.json).

GA32 gains only 3.44% over PC32 (adjusted interval −0.86% to 7.86%), excluding the
prespecified 10% practical gain. Its corruption NMSE increases by 0.03435
[0.02811,0.03972], above the 0.01 guard margin. It improves over MIX32, so the
conclusion is a tradeoff, not blanket failure of correction. The small FILTER2
control leads primary accuracy but has much worse corruption error.

A coverage review identifies a concrete limitation: v1's sensory gate is a sigmoid
of an affine function of signed residual/state/action inputs. It has no explicit
residual or action magnitude, and cannot directly express sign-invariant magnitude
reliability. The owner requested action-magnitude-dependent correction. This limits
v1's interpretation and leaves that requested comparison incomplete. It does not
justify claiming that arbitrary adaptive gain or recurrence is ineffective.

Select exactly one corrective supplement, owned by a fresh SOAM-070 protocol
based on completed SOAM-068 evidence. Add residual RMS and action norm to the same
small gate, retain fixed/old-gate/filter controls, use fresh training/development/
confirmation streams, and preserve all v1 data and thresholds. The supplement uses
the original cumulative 7200 CPU / 14400 wall seconds and 2 GiB RSS/artifact ceiling;
it does not renew the allocation. No acquisition, attention, online learning or
additional branch is selected. No publication is authorized.
