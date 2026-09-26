---
layout: post
title: "Predictive Sensorimotor Grouping: From Motifs to Persistent Things"
date: 2026-09-22 22:36:00 -0500
last_modified_at: 2026-09-26
permalink: /blog/predictive-sensorimotor-grouping/
description: "A working architecture for streaming evidence-hypothesis association through time, with persistent revisable groups and staged predictive extensions."
---

{% include ai-assisted-author-note.html %}

**Working research note · architecture under active review.** Predictive Sensorimotor Grouping (PSG) is an exploratory design, not an experimentally validated model. The architecture has changed as the research question has become more precise.

The current V1 no longer assumes that Slot Attention is the grouping mechanism. Slot Attention remains an important baseline and source of ideas, but the more general PSG picture is now:

> **At each moment, local evidence and persistent hypotheses form a soft bipartite association problem. Those associations evolve through time. Persistence is the continuity of that evolving evidence-hypothesis structure, not merely the recurrence of a fixed slot vector.**

Prediction, action conditioning, tactile sensing, active sensing, hierarchy, and lifelong object recall remain staged extensions rather than requirements for V1.

## The problem: how does experience become a thing?

A robot does not receive objects. It receives streams.

A camera produces changing pixel values. Touch sensors produce pressure or contact histories. Encoders and inertial sensors estimate how the robot itself moved. Motor commands change what can be sensed next.

Somewhere between those streams and a useful model of the world, the robot needs to form provisional **piles of evidence**:

- these visual changes may belong together;
- this new feature may support one continuing hypothesis strongly and another weakly;
- this feature disappeared during an occlusion but may still belong to the same continuing source;
- two groups that currently move together may later separate;
- one group may contain evidence from two different things and need to split;
- two provisional groups may later turn out to describe one thing;
- an assignment that looked reasonable a moment ago may need to remain uncertain until later evidence resolves it.

The word **object** is intentionally loose. A useful persistent group might eventually represent an object, a part, a surface, a place, an articulated component, or another recurring structure.

PSG asks whether object-like organization can emerge from streaming evidence without supplying object identity as an input.

A simple counterexample motivates the broader research direction. Suppose a system successfully predicts a black seam on a basketball. Later it successfully predicts a black court line. Both predictions can be excellent. That does not mean the seam and the court line belong to the same physical entity.

**Prediction is evidence about regularity. It is not, by itself, evidence of ownership.**

PSG therefore separates three concepts:

1. A **motif** is a reusable local sensory or sensory-motion pattern.
2. An **occurrence** is one particular observation of a motif at a place and time.
3. A **persistent hypothesis** is the system's revisable claim that some changing set of occurrences shares a continuing source.

The third item is the difficult one. A persistent thing does not need to be represented by the same pixels from frame to frame. Its supporting evidence may change continuously.

## Architecture at a glance

The central V1 object is a changing association structure between **evidence occurrences** and **persistent hypotheses**.

At one physical time \(t\), define an association value

$$
W_t(i,k)
=
\text{support between evidence occurrence } e_i(t)
\text{ and hypothesis } H_k(t).
$$

\(W_t(i,k)\) does not have to be a calibrated probability in the first prototype. It can be a learned support or compatibility score.

Each time slice therefore looks like a soft bipartite graph:

~~~text
evidence occurrences                 persistent hypotheses

e1  -------------------------------> H1
 | \                                  ^
 |  \-------------------------------> H2
 |
e2  -------------------------------> H2
 |  \-------------------------------> H3
 |
e3  -------------------------------> H1
    \-------------------------------> H3
~~~

The key addition is **time**.

Stack the association slices conceptually and PSG becomes a three-dimensional structure:

~~~text
                     physical time
                          ^
                          |
                  [ W(t+2) ]
                 /         /
                /         /
               [ W(t+1) ]
              /         /
             /         /
            [  W(t)  ]

      evidence x hypotheses in each slice
~~~

This is a conceptual volume, not necessarily a literal dense tensor stored in memory. The number and identity of evidence occurrences can change from moment to moment.

The current research hypothesis is:

> **A persistent thing can be represented as a temporally coherent path through a changing field of evidence-hypothesis associations.**

That framing makes uncertainty useful. PSG does not have to force a complete partition of the current frame before moving forward. An ambiguous occurrence can support several hypotheses until later temporal evidence distinguishes them.

### V1, V2, and V3

The implementation sequence is now:

~~~mermaid
flowchart TD
    V["V1 · streaming video"] --> E["local evidence occurrences"]
    E --> B["soft evidence ↔ hypothesis associations"]
    B --> H["persistent hypothesis state"]
    H --> B
    B --> T["association structure through time"]

    T --> P["V2 · predictive messages across time"]
    P --> B

    P --> A["V3 · action-conditioned transitions"]
    A --> S["sensorimotor persistence"]

    S --> X["V4+ · touch, active sensing, hierarchy, lifelong recall"]
~~~

The immediate V1 question is:

> **Can a recurrent evidence-hypothesis association process maintain stable unsupervised groupings in live video by combining current support with temporal continuity, without requiring a fixed competitive slot decomposition?**

Slot Attention is an important baseline for that question, not the definition of PSG.

## 1. Visual Motif Encoder: Build local sensorimotor motifs before trying to build objects {:#1-build-local-sensorimotor-motifs-before-trying-to-build-objects}

The first stage deliberately avoids asking which object produced an observation.

Instead, it asks:

> What local pattern of visual change occurred here over a short recent history?

### V1 visual evidence

A minimal video prototype can begin with a short stack of frames or frame-to-frame differences.

One illustrative design retains nine camera samples and therefore eight differences. At each image location, an encoder can receive channels such as:

- change in intensity;
- local image motion or optical-flow-like x change;
- local image motion or optical-flow-like y change.

For a \(32\times32\) toy image:

$$
X_t^V \in \mathbb{R}^{3\times8\times32\times32}.
$$

The eight entries on the temporal axis are differences, not eight original frames. Producing eight differences requires nine samples unless the preceding difference has already been retained.

One illustrative 3D convolution uses ten filters, each spanning all three input channels with temporal-height-width extent \(3\times3\times3\):

$$
[3,8,32,32]
\rightarrow
[10,6,30,30].
$$

~~~text
visual_history = [3, 8, 32, 32]

responses = conv3d(
    visual_history,
    out_channels = 10,
    kernel = [3, 3, 3],
    stride = 1,
    padding = 0
)

# responses: [10, 6, 30, 30]
~~~

The exact tensor widths are implementation choices, not PSG requirements. A simpler V1 could use a small CNN on individual frames plus a short temporal encoder.

The important requirement is that the grouping stage receives **local evidence occurrences with enough spatial and temporal support to remain separable**.

A crucial choice is what not to do next. Pooling an entire temporal or spatial region too aggressively can mix evidence from different physical sources before grouping has even begun. A later hypothesis cannot reconstruct information that was already destroyed.

An occurrence might contain:

~~~text
feature embedding
sensor-space support
short temporal support
timestamp
local motion estimate
uncertainty
~~~

The occurrence itself already contains a small amount of **micro-time**: it summarizes what happened locally over a short window.

The evidence-hypothesis association process then evolves over a longer **macro-time**. This distinction matters:

~~~text
short temporal motif
        |
        v
evidence occurrence
        |
        v
association through many video steps
        |
        v
persistent hypothesis
~~~

### Tactile motifs are a later extension

Touch should eventually get its own modality-specific encoder rather than being forced into the visual tensor. A tactile array may need longer temporal support for contact onset, sustained pressure, slip, release, and traversal across neighboring taxels.

That remains important to the broader PSG program, but it is intentionally out of scope for V1.

## 2. Group occurrences into revisable persistent hypotheses

After local feature extraction, PSG maintains a bounded active set of persistent hypotheses:

$$
H_1,H_2,\ldots,H_K.
$$

\(K\) is a computational budget, not a claim that the world contains exactly \(K\) objects.

A hypothesis can be activated, weakened, retired, recycled, split, or merged as evidence changes. V1 does not need sophisticated lifecycle logic, but it should avoid treating the active count as an ontological constant.

### Evidence can vote upward

A local occurrence can evaluate which hypotheses it supports.

Conceptually:

~~~text
occurrence e29 says:

H1: weak support
H2: strong support
H3: little support
H7: moderate support
~~~

The key point is that those values do **not** initially have to sum to one.

An ambiguous observation may legitimately support multiple explanations.

This is different from making every local feature immediately participate in a normalized winner-take-more competition.

### Hypotheses can answer downward

Inference can also run in the opposite direction.

A persistent hypothesis can inspect current occurrences and ask:

> Which evidence is consistent with the thing I have been explaining?

~~~text
hypothesis H7 says:

e3:  strong claim
e8:  weak claim
e29: strong claim
e44: moderate claim
~~~

Again, another hypothesis may also claim \(e_{29}\).

The association \(W_t(i,k)\) can therefore be understood as something negotiated from both directions rather than produced by only one side.

### Bidirectional message passing

A V1 update can alternate between:

~~~text
1. evidence -> hypothesis
   "which hypotheses do I support?"

2. hypothesis update
   integrate current messages with persistent memory

3. hypothesis -> evidence
   "which current occurrences are consistent with me?"

4. evidence update
   revise association strengths

5. repeat for a bounded number of inference iterations
~~~

This resembles learned message passing or belief refinement more than classical static segmentation.

It also makes recurrence natural. The same hypothesis nodes continue to exist while the evidence nodes change as video arrives.

### Collaboration first, competition where justified

Competition is still useful, but PSG should not assume that all evidence ownership is globally exclusive.

Some cases really do imply competition. If two hypotheses represent distinct physical objects and one highly local occurrence cannot plausibly come from both, then stronger support for one should suppress the other.

Other cases should remain collaborative:

- one occurrence may support an object and one of its parts;
- evidence may support both a local group and a future composite group;
- two hypotheses may both remain plausible during an occlusion;
- an occurrence may support a relation between hypotheses rather than either object alone.

So competition is better treated as a **constraint on particular relationships** than as the universal inference rule.

This leaves room for later hierarchy and compositionality without forcing every level to steal evidence from every other level.

## 3. Time is a third dimension of the matching problem

A single association matrix \(W_t\) is only one slice.

The more interesting PSG object is the history:

$$
W(i,k,t).
$$

Conceptually:

- the evidence axis asks which local observations are present;
- the hypothesis axis asks which persistent explanations are active;
- the time axis asks how those relationships evolve.

Persistence then becomes more precise.

Suppose \(H_7\) is supported by evidence \(e_2,e_3,e_4\) at one moment and by entirely different evidence \(e_{17},e_{21},e_{28}\) later.

~~~text
time t        time t+1       time t+2       time t+3

e2  --\
e3  ----> H7   e8  --\        e14 --\        e22 --\
e4  --/        e9  ----> H7   e15 ----> H7   e24 ----> H7
               e10 --/        e19 --/        e27 --/
~~~

The pixels and local motifs have changed.

What persists is the continuing hypothesis and the temporal coherence of the evidence supporting it.

This suggests a stronger working definition:

> **A persistent hypothesis is a temporally coherent trajectory through changing evidence associations.**

### Ambiguity can remain unresolved

This view changes how PSG should treat uncertain segmentation.

Suppose one time slice contains:

~~~text
             H1      H2

e17          .65     .62
e18          .70     .66
e19          .61     .64
~~~

A static decomposition would be pressured to decide.

PSG can preserve the ambiguity.

If later slices show that one subset of evidence evolves with \(H_1\) while another evolves with \(H_2\), the temporal trajectory resolves the earlier uncertainty.

So instead of asking only:

> Which hypothesis owns this evidence now?

PSG can ask:

> Which evolving assignment produces the most coherent explanation over time?

**Time itself becomes evidence.**

### The implementation does not store the whole volume

The full \(W(i,k,t)\) history may be useful conceptually but wasteful computationally.

A streaming implementation can retain:

~~~text
current association slice W[t]

recent association history
    W[t-L] ... W[t]

per-hypothesis recent evidence

per-hypothesis slower evidence memory

persistent hypothesis state
~~~

Older information can be consolidated or discarded.

The complete trajectory describes what the system has inferred. The online state only needs enough history to continue inference.

## 4. Short- and long-timescale evidence memory {:#4-thinking-harder-means-another-pass-over-the-same-evidence}

The earlier PSG draft attached short- and long-term buffers to recurrent slots. The buffers remain useful, but they now belong more generally to **persistent hypothesis nodes**.

A hypothesis can carry:

~~~text
H[k]
├── fast evidence memory
│   ├── recent occurrence references or embeddings
│   ├── recent association strengths
│   ├── timestamps
│   └── dense local temporal context
│
├── slow evidence memory
│   ├── older representative evidence
│   ├── historical association confidence
│   ├── sparse / consolidated samples
│   └── broader identity context
│
└── hypothesis state
    ├── activity / confidence
    ├── age / last support
    └── learned recurrent summary
~~~

The fast memory asks:

> What has been supporting this hypothesis recently?

The slow memory asks:

> What broader range of evidence has historically been compatible with this continuing hypothesis?

These memories can influence both directions of message passing.

An incoming occurrence can compare itself with recent and older evidence associated with a hypothesis.

A hypothesis can use both memories when deciding which current occurrences it expects to be relevant.

### Why keep literal evidence initially?

A single recurrent vector can hide whether the model retained several distinct modes or simply averaged them together.

Literal bounded evidence buffers make V1 easier to inspect and allow recent assignments to remain revisable.

A mug may generate very different evidence at its rim, side, handle, and base. The hypothesis should not be forced to compress all of that diversity into one average appearance before we know whether such compression is safe.

For V1, the slow buffer does not need an elaborate learned consolidation mechanism. Periodic sampling, reservoir sampling, or a simple novelty gate are enough to test whether a second timescale helps.

Later versions can replace literal buffers with learned prototypes, memory tokens, consolidated states, or another representation if experiments justify it.

## 5. Slot Attention is a baseline, not the ontology

Slot Attention remains relevant because it offers a clear solution to one nearby problem: a fixed number of latent slots can compete to explain features within an observation.

That makes it an important baseline.

But PSG now asks a more general question.

Slot Attention can be summarized roughly as:

~~~text
features
   |
   v
competitive assignment
   |
   v
fixed slot set
   |
   v
scene decomposition
~~~

The PSG candidate mechanism is:

~~~text
streaming evidence
      |
      v
evidence <----> persistent hypotheses
      |              |
      +---- messages-+
             |
             v
     associations through time
~~~

The difference is not that competition is forbidden. It is that **competition is no longer assumed to be the only or fundamental interaction**.

A useful experimental comparison is therefore:

- static Slot Attention;
- a recurrent/video Slot Attention baseline;
- one-way evidence-to-hypothesis assignment;
- bidirectional evidence-hypothesis message passing;
- message passing with fast memory;
- message passing with fast and slow memory.

If a simpler competitive recurrent-slot model performs equally well, PSG should prefer the simpler mechanism.

## 6. Prediction comes after streaming association

Prediction is deliberately moved out of V1.

First establish whether the evidence-hypothesis-time representation produces stable online grouping.

Then V2 can add predictive messages.

### V2: passive predictive persistence

At time \(t\), each hypothesis has:

- its current recurrent state;
- fast evidence history;
- slow evidence history;
- current association pattern.

Before time \(t+1\) arrives, it can predict the **kind of evidence and association change** it expects next.

The future evidence indices themselves do not yet exist, so the system need not literally predict a dense \(W_{t+1}\) matrix.

Instead, it can predict a distribution or latent expectation over future local evidence:

$$
\hat R_{k,t+1}
=
F(H_k(t),B_k^S,B_k^L).
$$

When actual evidence arrives, predictive compatibility becomes another message:

$$
m^{\text{pred}}_{ik}(t+1)
=
C\!\left(e_i(t+1),\hat R_{k,t+1}\right).
$$

The association process can then combine:

- bottom-up evidence support;
- hypothesis-to-evidence support;
- temporal continuity;
- predictive agreement.

The causal rule is strict:

> A prediction used to support an association at time \(t+1\) must have been generated before the evidence at \(t+1\) was incorporated.

Otherwise a hypothesis can claim evidence, train on it, and then cite its own reconstruction as proof of ownership.

## 7. Actions belong on the transitions, not as another axis

Action enters naturally after the time-indexed association model is established.

The evidence axis, hypothesis axis, and time axis describe the history of grouping.

Action is better understood as a **condition or label on the transition between time slices**.

Without action:

$$
\text{state at }t
\longrightarrow
\text{state at }t+1.
$$

With known action \(a_t\):

$$
(\text{state at }t,a_t)
\longrightarrow
\text{state at }t+1.
$$

For a hypothesis:

$$
\hat R_{k,t+1}
=
F(H_k(t),B_k^S,B_k^L,a_t).
$$

~~~text
association state at t
        +
known action a[t]
        |
        v
expected future evidence / support
        |
        v
actual evidence at t+1
        |
        v
new association slice
~~~

This gives action a useful role in persistence.

The system can ask not merely whether two observations occurred near each other in time, but whether a known intervention produced a predictable transformation in the evidence associated with one continuing hypothesis.

This also suggests a route to **implicit geometry**.

PSG may not need to build an explicit persistent object-relative coordinate frame. If recent evidence plus action reliably predicts the next local evidence state, the learned transition structure can encode the useful topology of the object without naming coordinates such as

$$
(x,y,z,\theta).
$$

That is a later hypothesis, not a V1 requirement.

## 8. Predictive Evidence Refinement and active sensing are later stages

Prediction can eventually do more than support temporal association.

A hypothesis might request extra computation on already available evidence or choose an action that obtains new evidence.

### Internal refinement

A hypothesis could request a fresh sensory operation:

~~~text
retained raw history
        |
        v
selected region / kernel / resolution
        |
        v
new local evidence occurrence
~~~

Or it could request a composite operation over existing occurrences:

~~~text
occurrence A
occurrence B
motion evidence
      |
      v
selected relation / composition
      |
      v
higher-order evidence
~~~

The earlier **Recurrent Predictive Routing (RPR)** proposal explored a more specific mechanism involving compatibility-gated pairs and recurrent pair states. PSG should not assume that machinery belongs here unless experiments show that it helps.

### External refinement

A robot can also act.

~~~text
uncertain grouping
      |
      +---- THINK ----> build more evidence from existing observations
      |
      +---- ACT ------> change the world/sensor relation
      |
      +---- WAIT -----> preserve uncertainty
~~~

This remains part of the broader PSG direction, but it should not contaminate the first streaming-grouping experiment.

## 9. A first falsifiable world

V1 should test the smallest mechanism that distinguishes the new formulation.

### V1 environment

Start with procedurally generated or controlled video containing:

- two to five moving objects;
- some objects with identical or near-identical appearance;
- occasional contact or overlap;
- path crossings;
- brief occlusions;
- temporary common motion followed by separation;
- appearance changes caused by rotation or lighting;
- hidden simulator identities used only for evaluation.

The learner receives no object IDs or segmentation labels during training.

The model operates continuously:

~~~text
video stream
    |
    v
local temporal encoder
    |
    v
evidence occurrences at t
    |
    v
evidence <----> persistent-hypothesis messages
    |
    v
soft association slice W[t]
    |
    +---- update fast evidence memory
    |
    +---- selectively update slow evidence memory
    |
    +---- update persistent hypothesis state
    |
    +------------------------------> t+1
~~~

The live demonstration can display a soft segmentation or ownership visualization derived from the associations.

The important result is not merely a good-looking mask. It is whether the **same persistent hypothesis remains connected to the same hidden physical source through time** when the evidence supports that conclusion.

### V1 ablations

A useful experimental ladder is:

| Variant | Grouping mechanism |
| --- | --- |
| **A0 — static Slot Attention** | Independent image decomposition. |
| **A1 — recurrent Slot Attention baseline** | Prior slot state carried into the next frame. |
| **B0 — one-way streaming association** | Evidence votes for persistent hypotheses through time. |
| **B1 — bidirectional association** | Evidence and hypotheses exchange iterative messages. |
| **B2 — bidirectional + fast memory** | Add dense recent per-hypothesis evidence. |
| **B3 — bidirectional + fast + slow memory** | Add a slower representative evidence history. |

The experiment should not assume B3 is best. If A1 or B0 gives the same persistence with less machinery, that is evidence against the more elaborate design.

### Metrics

Measure at least:

- per-frame grouping or segmentation quality;
- identity switches;
- hypothesis fragmentation;
- inappropriate merging;
- recovery after brief occlusion;
- recovery after appearance change;
- stability when two objects temporarily move together;
- ability to separate them when their trajectories diverge;
- calibration or entropy when the scene is genuinely ambiguous;
- compute and memory cost per streaming step.

For evaluation, assign a persistent hypothesis to a hidden simulator object and then **do not independently rematch identities every frame**. Otherwise the system can silently swap identities while receiving a good segmentation score.

There should also be intentionally unidentifiable cases. If two identical objects always move together, remain adjacent, disappear together, and reappear symmetrically, the evidence may not determine which is which.

A useful system should preserve uncertainty rather than manufacture a boundary.

### What would falsify the V1 idea?

Several outcomes would argue against the proposed machinery:

- recurrent Slot Attention performs just as well as bidirectional message passing;
- bidirectional messages produce no benefit over one-way association;
- the slow evidence memory increases stale lock-in;
- hypothesis persistence improves only when objects have distinct appearance;
- temporal ambiguity is resolved no better than a framewise baseline;
- the association process collapses into one dominant hypothesis or fragments into many unstable ones;
- improvements disappear when identity-aware evaluation prevents per-frame rematching.

These are useful failures. V1 exists to learn which pieces are actually necessary.

## Long-term object memory is a separate problem

A live scene may contain a small active set of hypotheses. A lifetime may contain millions.

Those are different scaling problems.

One future direction is a sparse associative index inspired by sparse distributed representations or other approximate retrieval methods.

The retrieval system could compress evidence into a search-oriented representation and nominate a small number of long-term memories.

But the important architectural rule remains:

> **Retrieval may nominate hypotheses; it should not decide that representational novelty means a new object exists.**

An unstable encoder can create a destructive positive feedback loop: failure to match creates a new object, and the existence of separate objects then teaches the encoder to distinguish evidence that should perhaps have remained together.

That failure mode appeared in earlier categorical state/transition experiments and is a reason to keep global recall out of V1.

First establish how active hypotheses form and persist. Then ask how to store and retrieve them efficiently.

## Relationship to Thousand Brains / Monty

PSG and the Thousand Brains / Monty direction share several motivations: local sensing, temporal persistence, multiple hypotheses, movement, and eventually compositional behavior.

One conceptual difference is what must become explicit.

A reference-frame-centered system can represent features at locations in an object-relative model and infer identity and pose.

PSG explores a weaker commitment.

A persistent hypothesis can instead be defined by:

- its accumulated evidence;
- its current support relations;
- the temporal trajectory of those relations;
- later, the predictable consequences of action.

An action-conditioned predictor can eventually learn:

$$
P(R_{t+1}\mid R_t,M,a_t),
$$

where \(R_t\) is the recent local evidence state and \(M\) is broader persistent context.

If that is sufficient for useful prediction and grouping, explicit object-relative geometry may not be required. The topology of predictable transitions can itself become the useful geometry.

That is a hypothesis, not yet a result.

## What PSG is claiming—and what it is not

The current research program now separates three claims.

### V1 claim

> **Persistent objects may be recoverable as temporally coherent trajectories in a recurrent evidence-hypothesis association process, without requiring every video frame to be independently partitioned into a fixed set of competitive slots.**

### V2 predictive claim

> **Pre-observation predictions about future local evidence may provide additional support for persistence and ownership when current appearance is ambiguous.**

### V3 sensorimotor claim

> **Known actions may condition transitions between association states, allowing predictable sensorimotor consequences to strengthen persistent grouping without requiring an explicit object-relative geometric model.**

Several pieces remain unresolved:

- what the exact evidence occurrence representation should be;
- whether bidirectional message passing outperforms simpler one-way assignment;
- when association values should be normalized;
- which relationships should be exclusive and which should remain collaborative;
- how many within-timestep message-passing iterations are useful;
- how fast and slow evidence memories should be encoded;
- how the slow memory should sample or consolidate evidence;
- how hypothesis birth, retirement, split, and merge should work;
- how uncertainty should be represented through time;
- what future evidence representation V2 should predict;
- how predictive messages should avoid self-confirmation;
- how action should condition V3 transitions;
- how touch should join visual evidence;
- how hierarchy should distinguish part support from mutually exclusive object ownership;
- how long-term retrieval should nominate old hypotheses without controlling ontology.

Those are not details to hide. PSG is useful only if they can be converted into small falsifiable experiments rather than protected by adding machinery after failure.

## The mental model to keep

For V1:

~~~text
                   TIME --->

      t                t+1               t+2

 evidence           evidence           evidence
    ^  |               ^  |               ^  |
    |  v               |  v               |  v
 hypotheses        hypotheses        hypotheses
    |                  |                  |
    +---- persistent state / memory ------+
~~~

Within each vertical slice:

> **Evidence and hypotheses negotiate association.**

Across slices:

> **Temporal continuity turns those associations into persistence.**

Later:

~~~text
V1
evidence <-> hypothesis association through time
        |
        v
V2
+ predictive messages across time
        |
        v
V3
+ actions conditioning those transitions
        |
        v
V4+
+ touch
+ active sensing
+ conditional computation
+ hierarchy
+ lifelong recall
~~~

The robot does not need to decide immediately what every observation *is*.

It needs a disciplined way to maintain provisional explanations, let evidence and hypotheses influence each other, preserve uncertainty when the present moment is insufficient, and use time to discover which explanations actually persist.
