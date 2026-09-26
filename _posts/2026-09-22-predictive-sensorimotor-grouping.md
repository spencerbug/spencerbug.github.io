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

The revised architecture suggests that V1 should be split into several experiments rather than jumping directly to motor prediction.

### V1a: streaming track formation

Start with controlled video containing:

- two to five moving objects;
- identical or near-identical appearances;
- path crossings;
- brief occlusions;
- temporary common motion followed by separation;
- hidden simulator identities used only for evaluation.

Test whether recent evidence trails can remain associated with stable active tracks.

Relevant metrics include identity switches, fragmentation, inappropriate merging, recovery after occlusion, and uncertainty during genuinely ambiguous intervals.

### V1b: persistent object-model construction

Next, expose one tracked object through changing views.

The model should accumulate landmark-like evidence states and transition structure that survives after individual landmarks leave the recent trail.

For example:

~~~text
encounter over time:

rim
 -> side
 -> handle junction
 -> handle
 -> side
 -> bottom

persistent model after encounter:

L1 rim
L2 side
L3 handle junction
L4 handle
L5 bottom

plus learned transition relationships
~~~

The important test is whether old landmarks remain available after they have left recent memory.

### V1c: recognition and relocalization

Let the object leave the scene.

Later reintroduce it under a different starting view.

The system forms a new active track first. It should then:

1. match that track to the previously learned object model;
2. localize the recent trail within the stored landmark structure;
3. preserve the possibility of UNKNOWN when evidence is insufficient.

This directly tests the separation between tracking and recognition.

### Baselines and ablations

A useful experimental ladder is:

| Variant | Capability |
| --- | --- |
| **A0 — framewise segmentation baseline** | No temporal object continuity. |
| **A1 — recurrent/video Slot Attention baseline** | Persistent competitive latent slots. |
| **B0 — trail-to-track association** | Recent trails maintain active tracks. |
| **B1 — bidirectional trail↔track messages** | Collaborative recurrent tracking. |
| **C0 — landmark store without structure** | Persistent bag of object evidence. |
| **C1 — structured landmark/transition model** | Durable object topology. |
| **C2 — track→object matching** | Recognition of a current track as a stored object. |
| **C3 — recognition + trail localization** | Current trail localized within the persistent model. |

The experiment should not assume the larger model is best.

If a bag of old landmarks performs as well as a structured transition model, the topology may be unnecessary.

If recognition works without a distinct active-track layer, the two-stage association may be unnecessary.

If recurrent Slot Attention matches the full tracking performance with much less machinery, PSG should retain the simpler mechanism.

### What would falsify the current formulation?

Useful negative results include:

- active tracks fragment whenever appearance changes;
- track-to-object recognition merely memorizes recent appearance;
- persistent landmark models fail to retain unobserved parts;
- relocalization fails after an object leaves and reappears;
- the structured landmark graph gives no benefit over an unstructured memory bank;
- unknown objects are incorrectly forced into known identities;
- introducing recognition destabilizes otherwise-correct active tracking.

V1 exists to discover which separations are actually necessary.

## Persistent object models and scalable lifelong retrieval are separate layers

A persistent object model is now part of the core architecture: it is the durable landmark and transition structure that represents one learned thing across encounters.

But **retrieving one object model from a lifetime containing millions of models** is still a separate scaling problem.

The distinction is:

~~~text
core persistent model:
    what is stored for one object?

global retrieval:
    which stored object models should be considered now?
~~~

A future sparse associative index, dense approximate-nearest-neighbor system, or hybrid mechanism could nominate candidate persistent models for the second bipartite association.

The important architectural rule remains:

> **Global retrieval may nominate persistent object models; it should not decide object identity by itself.**

An unstable retrieval encoder can create a destructive positive feedback loop: failure to retrieve a known model creates a new object, and the existence of separate objects then teaches the encoder to preserve a distinction that may have been accidental.

The active tracking layer protects against this failure. A novel or poorly recognized object can remain one coherent active track while recognition stays unresolved.

First solve what one persistent model should contain and how an active track maps into it. Then solve retrieval across a very large model library.

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

The current research program separates four claims.

### V1a tracking claim

> **A recent evidence trail can be associated through time with an active persistent track, allowing physical continuity to remain stable even while the visible evidence changes.**

### V1b/V1c object-memory claim

> **A currently tracked thing can be matched separately to a durable landmark/transition model, allowing recognition and relocalization without making long-term identity a prerequisite for tracking.**

### Predictive claim

> **Once a recent trail is localized within a persistent object model, the model and current local state can predict likely future trail transitions.**

### Sensorimotor claim

> **Known actions may condition those landmark transitions, allowing the persistent object model to acquire useful sensorimotor geometry without requiring an explicit object-relative Cartesian coordinate system.**

Several pieces remain unresolved:

- how local occurrences should be compressed into recent trails;
- whether trail↔track inference should be competitive, collaborative, or hybrid;
- how active tracks should be born, split, merged, retired, and recovered;
- what constitutes a useful landmark;
- whether landmarks should be prototypes, learned latent states, short paths, or something else;
- how transition structure should be represented and consolidated;
- how a novel active track should become a new persistent object model;
- how track→object association should avoid premature recognition;
- what form localization \(\ell_t\) should take;
- how prediction should influence tracking, recognition, and localization without self-confirmation;
- how action-conditioned transitions should be learned;
- how touch should add landmarks or transition evidence;
- how part-whole hierarchy should interact with object identity;
- how global retrieval should nominate persistent models without controlling ontology.

Those are not details to hide. PSG is useful only if they can be converted into small falsifiable experiments rather than protected by adding machinery after failure.

## The mental model to keep

The current shortest picture is:

~~~text
sensory stream
      |
      v
local motif occurrences
      |
      v
recent evidence trail
      |
      v
+-------------------------------+
| MATCH 1                       |
| trail <-> active track        |
| "is this still the same       |
|  currently observed thing?"   |
+-------------------------------+
      |
      v
active persistent track
      |
      v
+-------------------------------+
| MATCH 2                       |
| track + trail <-> object      |
| "is this a known thing?"      |
+-------------------------------+
      |
      v
persistent landmark /
transition model
      |
      v
localize recent trail
within persistent model
      |
      v
later:
model + local trail + action
      |
      v
predicted next landmark /
evidence transition
~~~

The architecture therefore separates three kinds of state:

~~~text
RECENT TRAIL
where the current evidence has just been

ACTIVE TRACK
which continuing physical source is being followed

PERSISTENT OBJECT MODEL
what has been learned about that source across
views and encounters, including landmarks that
have not been seen recently
~~~

The time-indexed trail↔track association still matters. It describes continuity through the current encounter.

The persistent object model sits above that tracking process. It supplies durable structure against which the current trail can be recognized and localized.

Action-conditioned prediction then operates on the combination:

$$
(\text{persistent model},\text{localized recent trail},\text{action})
\rightarrow
\text{predicted next trail / landmark transition}.
$$

The robot does not need to decide immediately what every observation *is*.

It needs a disciplined way to maintain provisional explanations, let evidence and hypotheses influence each other, preserve uncertainty when the present moment is insufficient, and use time to discover which explanations actually persist.
