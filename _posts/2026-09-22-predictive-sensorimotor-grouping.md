---
layout: post
title: "Predictive Sensorimotor Grouping: From Motifs to Persistent Things"
date: 2026-09-22 22:36:00 -0500
last_modified_at: 2026-09-26
permalink: /blog/predictive-sensorimotor-grouping/
description: "A working architecture for forming active tracks from recent evidence, matching them to persistent landmark models, and learning sensorimotor transitions."
---

{% include ai-assisted-author-note.html %}

**Working research note · architecture under active review.** Predictive Sensorimotor Grouping (PSG) is an exploratory design, not an experimentally validated model. The architecture has changed as the research question has become more precise.

The current V1 no longer assumes that Slot Attention is the grouping mechanism. Slot Attention remains an important baseline and source of ideas, but PSG now separates two problems that were previously conflated:

> **First, a recent evidence trail must be associated with a continuing active track: is this still the same currently observed thing? Second, that active track must be associated with a structured persistent object model: is this a known thing, and where is the current trail within its learned landmark topology?**

The recent trail supplies local state. The active track supplies continuity through the current encounter. The persistent object model stores evidence and transition structure that may not have been observed recently at all.

Prediction, action conditioning, tactile sensing, active sensing, hierarchy, and scalable lifelong retrieval remain staged extensions rather than requirements for the first tracking and object-model experiments.

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

The revised PSG architecture has three distinct temporal structures:

1. a **recent evidence trail**, containing what has just been observed;
2. an **active persistent track**, representing one currently traceable source through the ongoing encounter;
3. a **persistent object model**, retaining landmarks and transitions that can survive long absences from the current sensory stream.

The important distinction is:

> **Tracking asks whether current evidence belongs to the same continuing thing. Recognition asks whether that currently tracked thing corresponds to a durable object model encountered before.**

Those are two different association problems.

~~~mermaid
flowchart TD
    V["streaming video"] --> E["local motif occurrences"]
    E --> R["recent evidence trails"]
    R --> A1["association 1: trail ↔ active track"]
    A1 --> T["active persistent tracks"]
    T --> A2["association 2: track + trail ↔ object model"]
    R --> A2
    A2 --> M["persistent landmark / transition models"]
    M --> L["localize recent trail within object model"]
    R --> L
    L --> P["later: predict next trail / landmark transition"]
    M --> P
    X["known action or self-motion"] --> P
~~~

An active track can remain strong even when recognition is unresolved:

~~~text
active track H7

continuity confidence: high
persistent identity: unknown
~~~

That is a feature rather than a failure. A novel object should be trackable before the system knows whether it has seen that object before.

### First association: recent trail to active track

Let \(R_i(t)\) denote recent evidence trail \(i\), and let \(H_k(t)\) denote active track \(k\).

Define a soft association

$$
A_t(i,k)
=
\text{support that recent trail }R_i(t)
\text{ belongs to active track }H_k(t).
$$

At each time slice, this is a bipartite association problem:

~~~text
recent trails                         active tracks

R1  --------------------------------> H1
 | \                                  ^
 |  \-------------------------------> H2
 |
R2  --------------------------------> H2
 |  \-------------------------------> H3
 |
R3  --------------------------------> H1
    \-------------------------------> H3
~~~

Stack those association slices through physical time and the tracking problem becomes a conceptual volume

$$
A(i,k,t).
$$

A continuing thing is therefore not one fixed set of pixels. It is a coherent path through changing trail-to-track associations.

### Second association: active track to persistent object model

Now let \(M_j\) denote persistent object model \(j\).

A second relation asks whether active track \(H_k\), together with its accumulated and current trail evidence, corresponds to a known persistent object:

$$
B_t(k,j)
=
\text{support that active track }H_k(t)
\text{ corresponds to object model }M_j.
$$

Failure to recognize an object therefore does not break tracking. A high-confidence active track can remain associated with an UNKNOWN alternative while PSG gradually constructs a new object model.

### The persistent object model is structured

The long-term representation should not be only a FIFO of old evidence.

A persistent object model needs to retain evidence that may not have been observed recently and organize that evidence into something that can support relocalization and future transition prediction.

A minimal conceptual model is a set of landmarks plus learned transitions:

~~~text
persistent object M42

        [L1 rim]
        /      \
       /        \
 [L2 side] ---- [L4 opposite side]
      |
      |
 [L3 handle junction] ---- [L5 handle]
~~~

A landmark need not be a named semantic part or an explicit 3-D coordinate. It can be a learned recurring evidence state, a prototype, a local latent state, or another compact representation.

The edges encode observed reachability or transition structure. Later, those edges can be conditioned on known action or self-motion.

### The recent trail can act as the local coordinate

PSG does not necessarily need to encode the current location on an object as an explicit Euclidean pose such as

$$
(x,y,z,\theta).
$$

Instead, the recent trail can be matched against the object's learned landmark topology:

$$
\ell_t
=
\operatorname{Localize}(R_t,M_j).
$$

Here \(\ell_t\) may be a landmark, a probability distribution over landmarks, a short landmark path, or a learned local state.

The persistent object model provides global context. The recent trail says where the current encounter appears to be within that structure.

This gives the architecture a route to learned geometry without requiring a pre-specified geometric coordinate system.

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

## 2. First matching problem: recent trails to active persistent tracks

After local feature extraction, PSG groups temporally adjacent occurrences into short recent trails.

A trail is more informative than one raw pixel or one isolated feature. It can contain local appearance, motion, timing, and the order in which nearby motifs were encountered.

~~~text
recent trail R_i(t)

e(t-3) -> e(t-2) -> e(t-1) -> e(t)
~~~

PSG then maintains a bounded active set of tracks:

$$
H_1,H_2,\ldots,H_K.
$$

\(K\) is a computational budget, not a claim that the world contains exactly \(K\) objects.

The first association matrix \(A_t(i,k)\) asks:

> Which active track, if any, best explains the continuity of this recent trail?

### Trails can vote upward

A recent trail can support several active tracks while evidence is ambiguous:

~~~text
trail R29 says:

H1: weak support
H2: strong support
H3: little support
H7: moderate support
~~~

Those values do not initially have to sum to one.

Two visually similar objects may remain ambiguous during an overlap or occlusion. PSG should be allowed to defer the decision until later evidence separates their trajectories.

### Active tracks can answer downward

An active track can also inspect the current trails:

> Which recent trails are consistent with the physical source I have been following?

~~~text
active track H7 says:

R3:  strong continuity
R8:  weak continuity
R29: strong continuity
R44: moderate continuity
~~~

This makes the first matching problem naturally bidirectional.

A V1 update can alternate between:

~~~text
1. recent trail -> active track
   "which continuing source do I support?"

2. active-track update
   integrate support with recent continuity state

3. active track -> recent trail
   "which trails remain consistent with me?"

4. revise A[t]

5. repeat for a bounded number of inference iterations
~~~

Competition is still useful where physical ownership should be exclusive, but it is not assumed to be the universal operation.

### Time is the third dimension of tracking

A single \(A_t\) matrix describes only one physical moment.

The history

$$
A(i,k,t)
$$

describes how recent trails remain associated with active tracks over time.

Suppose \(H_7\) is supported by one collection of trails now and a different collection later:

~~~text
time t          time t+1        time t+2

R2 --\
R3 ----> H7      R8 --\          R14 --\
R4 --/           R9 ----> H7     R15 ----> H7
                  R10 --/         R19 --/
~~~

The individual evidence changes. The continuing source hypothesis persists.

This is the first meaning of persistence in PSG:

> **An active track is a temporally coherent path through changing recent evidence.**

The implementation does not need to store the entire \(A(i,k,t)\) volume. It can keep a bounded recent trail history plus recurrent track state.

## 3. Second matching problem: active tracks to persistent object models

Tracking continuity is not the same as recognizing a known object.

Once an active track has enough evidence, PSG can compare it with a collection of persistent object models:

$$
M_1,M_2,\ldots,M_N.
$$

The second association matrix

$$
B_t(k,j)
$$

asks:

> Does active track \(H_k\), together with its current trail and accumulated encounter evidence, correspond to persistent object model \(M_j\)?

This association can also remain uncertain.

~~~text
active track H7:

M12: 0.08
M42: 0.91
M77: 0.18
NEW: 0.11
~~~

The exact values need not be calibrated probabilities.

### Unknown but consistently traceable objects

A particularly important state is:

~~~text
H7

tracking continuity: strong
known object match: none
~~~

The system should be able to follow a previously unseen object for an extended encounter without prematurely forcing it into the nearest known identity.

As evidence accumulates, PSG can construct a new persistent object model from the active track.

Later, when the object disappears and reappears, the new active track can be matched back to that stored model.

### A persistent object is not a long FIFO

The previous PSG draft treated slower evidence memory as though it might itself become the object representation.

That is insufficient.

An object model needs to preserve evidence that is not currently or recently visible and organize it into a structure that can be revisited.

A candidate model is:

~~~text
M[j]
├── landmarks / persistent evidence states
│   ├── representative motif evidence
│   ├── uncertainty
│   └── modality-specific evidence later
│
├── transition structure
│   ├── observed landmark-to-landmark transitions
│   ├── transition confidence
│   └── later: action-conditioned transition models
│
└── identity-level state
    ├── accumulated encounters
    ├── model confidence
    └── lifecycle / consolidation state
~~~

The representation need not be an explicit metric mesh.

It can instead be a learned topology: a structured memory of which evidence states tend to follow or become reachable from which others.

### Object construction and recognition are reciprocal

During a novel encounter:

~~~text
recent trail
    |
    v
active track H_new
    |
    v
accumulate landmarks / transitions
    |
    v
new persistent model M_new
~~~

During a later encounter:

~~~text
recent trail
    |
    v
active track H7
    |
    v
match H7 + trail against stored models
    |
    v
recognize M_new
~~~

This separation prevents representational novelty from automatically becoming ontological novelty. Failure to match a known model can remain uncertain while tracking continues.

## 4. Recent trails localize within persistent object models {:#4-thinking-harder-means-another-pass-over-the-same-evidence}

Once an active track has a plausible object-model match, the recent trail provides the current local state within that object's learned topology.

Let the currently favored model be \(M_j\).

PSG can infer

$$
\ell_t
=
\operatorname{Localize}(R_t,M_j),
$$

where \(\ell_t\) is the current position in the learned landmark structure.

This position does not have to be a Cartesian coordinate.

It could be:

- one landmark;
- a soft distribution over landmarks;
- a short sequence such as \(L_{12}\rightarrow L_{13}\rightarrow L_{19}\);
- a learned latent state associated with a neighborhood of the object model.

### Example: building a mug model

A persistent mug model might eventually contain:

~~~text
L1: circular rim evidence
L2: smooth side evidence
L3: handle junction evidence
L4: handle outer-curve evidence
L5: bottom-transition evidence

learned topology:

L1 -> L2
L2 -> L3
L3 -> L4
L2 -> L5
~~~

Now suppose the current recent trail contains:

~~~text
circular edge
    ->
smooth vertical surface
    ->
small horizontal protrusion
~~~

The trail can match approximately to

~~~text
L1 -> L2 -> L3
~~~

inside the persistent model.

That gives the system both identity context and local state:

~~~text
active track: H7
recognized model: M42
localized trail: near L3
~~~

This is more informative than a long-term bag of historical evidence. Evidence that has not appeared for a long time can still remain part of \(M_{42}\) and become relevant again when the recent trail reaches that region.

### Recent memory and persistent memory now have different jobs

The short recent trail answers:

> Where am I in the currently experienced evidence topology, and how did I get here?

The persistent object model answers:

> What broader landmark and transition structure has been learned for this thing, including evidence not seen recently?

That distinction replaces the earlier fast-buffer / slow-buffer picture.

A small recent FIFO may still be an implementation detail, but the long-lived object representation should be structured rather than merely older evidence.

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

## 6. Prediction comes after tracking and object localization

Prediction is deliberately staged after PSG can maintain active tracks and construct or recognize persistent object models.

The architecture now gives prediction a much more specific input.

At time \(t\), PSG may know:

- persistent object model \(M_j\);
- current local state \(\ell_t\), inferred from the recent trail;
- recent trail \(R_t\);
- later, known action or self-motion \(a_t\).

A passive predictive version can begin with:

$$
\hat R_{t+1}
=
F(M_j,\ell_t,R_t).
$$

When new evidence arrives, the predicted trail can provide additional support for both track continuity and localization.

The causal rule remains strict:

> A prediction used to support an association at time \(t+1\) must have been generated before the evidence at \(t+1\) was incorporated.

Otherwise a hypothesis can claim evidence, train on it, and then cite its own reconstruction as proof of ownership.

## 7. Actions condition transitions in the persistent trail

Action fits naturally once the object has a learned landmark or transition structure.

The key prediction becomes:

$$
(\hat \ell_{t+1},\hat R_{t+1})
=
F(M_j,\ell_t,R_t,a_t).
$$

The terms now have distinct roles:

- \(M_j\): the persistent object model;
- \(\ell_t\): current localization within that model;
- \(R_t\): immediate recent evidence trail;
- \(a_t\): executed action or known self-motion;
- \(\hat \ell_{t+1}\): predicted next local state;
- \(\hat R_{t+1}\): predicted next evidence trail.

~~~text
persistent object model M42
          +
current local trail near L3
          +
known move-right action
          |
          v
predict transition toward L4
          |
          v
predict handle-like evidence
          |
          v
actual next trail
~~~

If the expected transition occurs, several beliefs strengthen together:

- the active track is probably still following the same thing;
- the recognition match to \(M_{42}\) becomes stronger;
- localization within \(M_{42}\) advances toward the predicted region.

This gives PSG a form of **sensorimotor geometry**.

The model need not explicitly store an object-relative coordinate such as

$$
(x,y,z,\theta).
$$

Instead, the landmark topology plus learned action-conditioned transitions can encode which local evidence states are reachable from which others.

Actions therefore label or condition transitions through the persistent object model rather than becoming another axis of the representation.

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
