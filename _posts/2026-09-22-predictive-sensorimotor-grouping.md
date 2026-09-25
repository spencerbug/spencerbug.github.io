---
layout: post
title: "Predictive Sensorimotor Grouping: From Motifs to Persistent Things"
date: 2026-09-22 22:36:00 -0500
last_modified_at: 2026-09-25
permalink: /blog/predictive-sensorimotor-grouping/
description: "A working architecture for streaming, revisable grouping of sensory evidence into persistent hypotheses."
---

{% include ai-assisted-author-note.html %}

**Working research note · architecture under active review.** Predictive Sensorimotor Grouping (PSG) is an exploratory design, not an experimentally validated model. This page now separates the long-term research direction from the minimum first prototype. The first prototype is intentionally narrower: **streaming visual grouping with persistent recurrent slots and short- and long-timescale evidence memory.** Prediction, action conditioning, tactile sensing, active sensing, and lifelong object recall are staged extensions rather than requirements for V1.

## The problem: how does experience become a thing?

A robot does not receive objects. It receives streams.

A camera produces changing pixel values. Touch sensors produce pressure or contact histories. Encoders and inertial sensors estimate how the robot itself moved. Motor commands change what can be sensed next.

Somewhere between those streams and a useful model of the world, the robot needs to form provisional **piles of evidence**:

- these visual changes may belong together;
- this feature may still belong to the same continuing thing after its appearance changes;
- this feature disappeared during an occlusion but may still exist;
- these two piles may really be one thing;
- this pile may contain evidence from two different things and need to split;
- an assignment that looked reasonable a moment ago may need to be revised.

The word **object** is intentionally loose. A useful persistent group might eventually represent an object, a part, a surface, a place, or another recurring structure. PSG asks whether object-like organization can emerge from streaming evidence without supplying object identity as an input.

A simple counterexample motivates the broader research direction. Suppose a system successfully predicts a black seam on a basketball. Later it successfully predicts a black court line. Both predictions can be excellent. That does not mean the seam and the court line belong to the same physical entity.

**Prediction is evidence about regularity. It is not, by itself, evidence of ownership.**

PSG therefore separates three concepts:

1. A **motif** is a reusable sensory or sensory-motion pattern.
2. An **occurrence** is one particular observation of a motif at a place and time.
3. A **persistent hypothesis** is the system's revisable claim that multiple occurrences share a continuing source.

For V1, the persistent hypotheses are implemented as a small working set of recurrent slots. Later versions can ask how prediction, action, touch, and long-term recall improve those hypotheses.

## Architecture at a glance

The long-term PSG research program is larger than the first prototype. The implementation sequence matters because each additional mechanism should earn its complexity experimentally.

~~~mermaid
flowchart TD
    V["V1 · streaming video"] --> E["local visual evidence tokens"]
    E --> S["recurrent soft slot competition"]
    S --> M["per-slot short + long evidence memory"]
    M --> S
    S --> O["online ownership / segmentation"]

    O --> P["V2 · passive future-evidence prediction"]
    P --> S

    P --> A["V3 · action-conditioned prediction"]
    A --> T["visual + tactile sensorimotor evidence"]

    T --> X["V4+ · active sensing, hierarchy, lifelong recall"]
~~~

The immediate V1 question is deliberately simple:

> **Can recurrent Slot Attention with short- and long-timescale per-slot evidence memory maintain stable unsupervised groupings in a continuous video stream better than static or memoryless Slot Attention?**

That question can be tested before PSG makes any claim about motor control.

### Why start from Slot Attention?

PSG borrows a useful idea from Slot Attention: a bounded set of exchangeable candidate slots can compete softly for ownership of many input features. The first PSG prototype does not need to replace that mechanism.

The difference is that a streaming robot cannot treat each image as an independent scene. The active slots need to persist through time and accumulate evidence about what they have been explaining.

So V1 changes the mental model from:

~~~text
one image
   |
   v
features
   |
   v
slots
   |
   v
segmentation
~~~

to:

~~~text
frame t
   |
   v
evidence tokens
   |
   v
persistent recurrent slots <---- prior slot memories
   |
   v
soft ownership
   |
   v
update slot memories
   |
   +----------------------------> frame t+1
~~~

The interesting PSG question is therefore not whether slots can segment one image. It is whether a slot can become a **continuing evidence-bearing hypothesis** in a live stream.

## 1. Visual Motif Encoder: Build local sensorimotor motifs before trying to build objects {:#1-build-local-sensorimotor-motifs-before-trying-to-build-objects}

The first stage deliberately avoids asking which object produced an observation.

Instead, it asks a smaller question:

> What local pattern of visual change occurred here over a short recent history?

### V1 visual evidence

A minimal video prototype can begin with a short stack of frames or frame-to-frame differences. One illustrative design retains nine camera samples and therefore eight differences. At each image location, an encoder can receive channels such as:

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

The exact tensor widths are implementation choices, not PSG requirements. A simpler V1 could use a small CNN on individual frames plus a short temporal encoder. The important requirement is that the grouping stage receives **local evidence tokens with enough spatial and temporal support to remain separable**.

A crucial choice is what not to do next. Pooling an entire temporal or spatial region too aggressively can mix evidence from different physical sources before ownership has even been considered. A later grouping stage cannot reconstruct information that max pooling already discarded.

The first prototype should therefore preserve local spatial support until after slot competition.

An evidence occurrence might contain:

~~~text
feature embedding
sensor / spatial support
short temporal support
timestamp
uncertainty
~~~

The representation does not need an object-relative coordinate frame. Sensor-space support is enough for V1.

### Tactile motifs are a later extension

Touch should eventually get its own modality-specific encoder rather than being forced into the visual tensor. A tactile array may need longer temporal support for contact onset, sustained pressure, slip, release, and traversal across neighboring taxels.

That remains important to the broader PSG program, but it is intentionally **out of scope for V1**. The first prototype should establish persistent streaming grouping in passive video before adding multimodal correspondence.

## 2. Group occurrences into revisable persistent hypotheses

After local feature extraction, PSG maintains a small bounded set of active candidate records.

Call candidate \(k\):

$$
H_k.
$$

For V1, \(H_k\) is a recurrent slot: a continuing working-memory hypothesis that competes for current evidence and carries state forward into the next frame.

This is not a database of every object the system has ever encountered. It is the small set of things currently worth tracking in the active scene.

### One slot system, two evidence timescales

Each slot carries at least two temporal memories:

~~~text
H[k]
├── short-term evidence buffer
│   ├── recent occurrence embeddings
│   ├── ownership weights
│   ├── timestamps
│   └── dense recent temporal context
│
├── long-term evidence buffer
│   ├── older representative occurrences
│   ├── ownership weights
│   ├── timestamps
│   └── sparse persistent evidence
│
└── lifecycle state
    ├── active / inactive
    ├── confidence
    └── age / last-supported time
~~~

These are **not two independent Slot Attention systems**.

There is one current ownership competition. The two buffers provide different evidence to that competition.

The short-term buffer answers:

> What has this candidate looked like, and how has its evidence been changing, over the recent past?

The long-term buffer answers:

> What range of evidence has historically belonged to this continuing candidate?

The short buffer should update densely. The long buffer should update more slowly so that it does not become thousands of nearly identical copies of the most recent moment.

For V1, the long buffer does not need an elaborate learned consolidation algorithm. Reasonable baselines include periodic sampling, reservoir sampling, or a simple novelty gate. The research question is whether the second timescale helps persistent grouping, not whether PSG has already solved memory consolidation.

### Why literal evidence buffers?

A single recurrent vector can hide whether the model has actually retained several distinct modes of evidence or merely averaged them together.

Literal bounded evidence buffers give the first prototype an interpretable working memory. They also preserve the possibility of revising recent assignments.

A mug, for example, may generate very different evidence at its rim, side, handle, and base. The hypothesis should not be forced to compress all of that diversity into one average appearance before we know whether such compression is safe.

Later versions can test whether learned prototypes, memory tokens, or consolidated latent states replace the literal buffers without losing useful behavior.

### Soft ownership

Let \(f_i(t)\) be current evidence occurrence \(i\), and let \(H_k(t-1)\) be persistent candidate \(k\) entering the current frame.

The grouping stage computes a compatibility score using the current feature and both temporal memories:

$$
s_{ik}(t)
=
\alpha\,C_{\text{current}}(f_i(t),H_k)
+
\beta\,C_{\text{short}}(f_i(t),B_k^S)
+
\gamma\,C_{\text{long}}(f_i(t),B_k^L).
$$

Here \(B_k^S\) is the short-term buffer and \(B_k^L\) is the long-term buffer. The functions \(C\) and the weights are implementation choices.

The scores compete across the active slots and an unassigned option:

~~~text
                       active candidate
                 H0      H1      H2      H3     unassigned
evidence 0        .       .       .       .          .
evidence 1        .       .       .       .          .
evidence 2        .       .       .       .          .
...
~~~

The **unassigned** option matters. Weak evidence for every existing candidate should not force an observation into the least-wrong pile.

For V1, fixed candidate capacity plus inactive slots is enough. Sustained unassigned evidence can activate an unused slot. A slot that receives no support for long enough can become reusable.

More sophisticated birth, split, merge, and recovery logic can wait until the simpler mechanism has been tested.

## 3. Streaming recurrence comes before prediction

The central V1 mechanism is recurrence across physical time.

Ordinary Slot Attention contains an inner iterative refinement loop: current slots attend to current features, update, and may repeat several times before producing an output.

PSG V1 adds a different recurrence:

> The slot state that finishes frame \(t\) becomes the starting state for frame \(t+1\).

~~~mermaid
flowchart LR
    F0["frame t"] --> E0["evidence tokens"]
    P0["slots entering t"] --> SA0["slot competition at t"]
    E0 --> SA0
    SA0 --> U0["updated slot memories"]
    U0 --> P1["slots entering t+1"]
    F1["frame t+1"] --> E1["new evidence tokens"]
    P1 --> SA1["slot competition at t+1"]
    E1 --> SA1
~~~

This makes a slot more than a color-coded segment in one frame. It becomes a continuing state that has been explaining some subset of the stream.

### Three distinct recurrences in the broader architecture

It is useful to distinguish three loops because they can otherwise be conflated.

**Inner slot refinement:** repeated attention/update iterations over evidence available in one frame.

**Temporal recurrence:** slot state and evidence memory persist from frame \(t\) to frame \(t+1\).

**Predictive recurrence:** a later PSG version predicts future evidence from prior slot state and uses prediction success to influence the next ownership competition.

Only the first two are required for V1.

This separation is experimentally valuable. If persistent grouping improves before prediction is introduced, that benefit belongs to streaming recurrence and memory. Prediction can then be tested as an additional mechanism rather than receiving credit for everything at once.

### What does the short buffer represent?

The short buffer can carry something analogous to an implicit local state.

Suppose a camera is moving across the side of an object. The recent evidence trajectory may contain enough information to distinguish the current local condition without ever constructing an explicit object-relative coordinate such as:

$$
(x,y,z,\theta).
$$

That possibility becomes more important in V2 and V3, when the system begins predicting how recent evidence changes over time or under action.

For V1, however, no claim about learned geometry is necessary. The short buffer only needs to improve continuity and grouping.

## 4. Predictive Evidence Refinement: Thinking harder over available evidence {:#4-thinking-harder-means-another-pass-over-the-same-evidence}

Prediction-directed refinement remains part of the broader PSG research direction, but it is **not a V1 requirement**.

The first prototype should not simultaneously test streaming recurrence, future prediction, dynamic computation, active sensing, and motor control. If it succeeds or fails, there would be no clean way to know which mechanism mattered.

A later version can ask whether persistent hypotheses should request additional computation on evidence already available.

Two forms remain plausible.

### Fresh sensory operations

A hypothesis could request another operation on retained raw sensory history:

~~~text
raw sensory history
        |
        v
prediction-selected region / kernel / resolution
        |
        v
new local evidence
~~~

This would help when useful evidence existed in the raw observation but the first encoder failed to extract it.

### Composite evidence operations

A different failure occurs when the first pass found relevant pieces but did not relate them:

~~~text
edge A + spatial support A
edge B + spatial support B
motion motif + support
            |
            v
prediction-selected composition
            |
            v
higher-order geometric / dynamic evidence
~~~

This is closer to adding conditional depth over already-extracted occurrences.

The earlier **Recurrent Predictive Routing (RPR)** proposal explored a more specific version of predictive routing involving sliding input histories, compatibility-gated pairs, recurrent pair states, and future prediction. PSG should not assume that machinery belongs here. If some of it becomes useful, it should be reintroduced through explicit ablations.

## 5. Acting obtains evidence that does not exist yet

Motor action is another later extension.

The broader PSG idea is that physical intervention can resolve ambiguities that passive observation cannot.

Imagine two visually similar circles. One is a movable ball. The other is a painted circle on the floor.

A push produces different consequences:

~~~text
movable ball:

finger approaches
    -> touch onset
    -> push
    -> visual evidence moves


painted circle:

finger approaches
    -> contact with flat floor
    -> push
    -> marking remains fixed to floor
~~~

This motivates the future sensorimotor version of PSG:

> **A persistent hypothesis is a candidate common source of sensorimotor consequences.**

But V1 should not test that yet. First establish whether recurrent evidence memory can maintain stable visual hypotheses in passive video.

## 6. Prediction creates a choice: think, act, or remain uncertain

Once prediction, uncertainty, and action are added, PSG can eventually treat attention as a resource-allocation problem.

A controller might choose among:

~~~text
uncertain grouping
      |
      +---- THINK ----> build more evidence from what is already available
      |
      +---- ACT ------> change sensor/world relation and obtain new evidence
      |
      +---- WAIT -----> preserve uncertainty because resolving it is not worth the cost
~~~

One possible future objective is:

$$
j^*
=
\operatorname*{arg\,max}_j
\frac{\mathbb{E}[\Delta I_j]}{C_j}.
$$

Here \(\mathbb{E}[\Delta I_j]\) is expected useful reduction in uncertainty and \(C_j\) is the operation's cost.

This remains a research direction, not part of the first implementation.

## 7. Causality and timing have to stay explicit

V1 already needs physical time to stay explicit because slot state persists from one frame to the next.

Later predictive versions need an even stricter rule:

> A prediction used to help assign evidence at time \(t\) must have been generated before the evidence at time \(t\) was incorporated.

That prevents a dangerous self-confirming loop.

Without this separation, a slot could claim evidence, train its predictor on the evidence it just claimed, become better at reproducing that evidence, and then treat its own improved prediction as proof that the original ownership was correct.

The correct sequence is:

~~~text
slot state through t-1
        |
        v
forecast for t
        |
--------+---------------- observation t arrives
        |
        v
current evidence
        |
        v
ownership inference
        |
        v
update slot memories
        |
        v
slot state through t
~~~

That is analogous to a failure mode seen in earlier categorical memory experiments: if representational novelty automatically creates a new category, the new category can reinforce the encoder's decision that the observations were different. PSG should not let representation and ontology collapse into the same decision.

For V1 there is no predictive ownership term yet, so this particular loop cannot occur. Keeping the timing rule in the architecture now makes the V2 extension much cleaner.

## 8. A first falsifiable world

The original PSG prototype tried to test vision, touch, action-conditioned prediction, active sensing, and dynamic evidence refinement at once.

The revised V1 is intentionally smaller.

### V1 environment

Start with procedurally generated or otherwise controlled video containing:

- two to five moving objects;
- some objects with very similar or identical appearance;
- occasional contact or overlap;
- path crossings;
- short occlusions;
- appearance changes caused by rotation or lighting;
- a bounded number of recurrent slots;
- hidden simulator identities used only for evaluation.

The learner receives no object IDs or segmentation labels during training.

The model should operate online:

~~~text
frame t
    |
    v
visual encoder
    |
    v
local evidence tokens
    |
    v
recurrent soft slot competition
    |
    +----> short-term evidence buffer
    |
    +----> long-term evidence buffer
    |
    v
current soft segmentation / ownership
    |
    +------------------------------> frame t+1
~~~

A live demonstration could display the video with each active slot overlaid as a different segmentation mask. The important behavior is not merely attractive per-frame segmentation. The same slot should continue to represent the same hidden object through time whenever the evidence supports doing so.

### V1 ablations

A useful experiment ladder is:

| Variant | Persistent information across frames |
| --- | --- |
| **A0 — static Slot Attention** | No persistent slot state; process each frame independently. |
| **A1 — recurrent slots** | Previous slot states initialize the next frame. |
| **A2 — recurrent + short memory** | Add dense recent per-slot evidence FIFO. |
| **A3 — recurrent + short + long memory** | Add sparse longer-timescale per-slot evidence memory. |

The main V1 claim is supported only if the memory-bearing variants improve persistent grouping on situations that actually require history.

### Metrics

Measure at least:

- per-frame grouping or segmentation quality;
- identity switches;
- slot fragmentation, where one hidden object repeatedly becomes several slots;
- slot merging, where several hidden objects collapse into one slot;
- recovery after short occlusion;
- recovery after appearance change;
- slot drift or takeover after one object leaves;
- confidence calibration when the scene is genuinely ambiguous.

For evaluation, match a persistent candidate to a hidden simulator object and then **do not independently rematch it every frame**. Otherwise a model can silently swap identities while receiving a good segmentation score.

There should also be intentionally unidentifiable cases. If two identical objects move together, remain adjacent, undergo identical changes, disappear together, and reappear symmetrically, the evidence may not determine which is which. A useful system should preserve uncertainty rather than invent certainty.

### What would falsify the V1 idea?

Several outcomes would argue against the added memory machinery:

- recurrent slot initialization alone performs as well as both evidence buffers;
- the long buffer causes stale evidence to increase identity errors;
- short and long buffers encourage slot lock-in and prevent legitimate reassignment;
- the system remembers appearance but does not improve identity persistence;
- gains disappear when evaluation prevents per-frame identity rematching.

Those are useful failures. V1 exists to determine whether explicit two-timescale evidence memory is worth keeping.

## From V1 to predictive PSG

If V1 establishes stable streaming grouping, prediction becomes the next controlled experiment.

### V2: passive predictive grouping

Each slot predicts future local evidence from its state and recent history:

$$
\hat E_{k,t+1}
=
F(B_k^S,B_k^L).
$$

The prediction must be generated before frame \(t+1\) arrives.

When the next evidence appears, predictive agreement can become an additional ownership term:

$$
s_{ik}(t+1)
=
s_{ik}^{\text{memory}}
+
\lambda_p C_{\text{pred}}(f_i(t+1),\hat E_{k,t+1}).
$$

The scientific question is then clean:

> Does future-evidence prediction improve grouping beyond recurrence and memory alone?

### V3: action-conditioned sensorimotor grouping

Once passive prediction has earned its place, condition the predictor on known action or camera/body motion:

$$
\hat E_{k,t+1}
=
F(B_k^S,B_k^L,a_t).
$$

Now the system can begin learning that the same current evidence evolves differently under different actions.

This is also where the distinction from an explicit geometric object model becomes interesting. PSG does not necessarily need to reconstruct a persistent object-relative coordinate system. If the recent evidence state plus action is sufficient to predict the next local evidence state, the learned transition structure can act as an **implicit geometry**.

### V4+: multimodal and active PSG

Later stages can add:

- tactile evidence;
- active sensing and information-seeking actions;
- prediction-directed internal computation;
- hierarchical or compositional grouping;
- long-term storage and recall of previously encountered objects;
- scalable associative retrieval.

These should remain separate experiments rather than being folded into V1.

## Long-term object memory is a separate problem

A live scene contains only a small active set of hypotheses. A lifetime may contain millions.

Those are different scaling problems.

One future direction is a sparse associative index inspired by ideas such as sparse distributed representations: compress evidence into a search-oriented representation, use reverse indexing or approximate retrieval to nominate a small number of relevant long-term memories, and then let active PSG inference decide whether any candidate actually matches.

The important architectural rule is:

> **Long-term retrieval may nominate candidates; it should not decide that representational novelty means a new object exists.**

A retrieval encoder can be unstable, especially during learning. If encoder mismatch automatically creates a new object, object proliferation can reinforce the encoder's initial distinction and produce a self-amplifying fragmentation loop.

Therefore global memory is deliberately excluded from V1. First learn how to group and persist objects in active working memory. Only then ask how to store and retrieve them efficiently.

## Relationship to Thousand Brains / Monty

PSG and the Thousand Brains / Monty direction share several motivations: local sensing, temporal persistence, multiple hypotheses, movement, and eventually compositional behavior.

One conceptual difference is what must become explicit.

A reference-frame-centered system can represent features at locations in an object-relative model and infer both identity and pose.

PSG explores a weaker representational commitment. A persistent hypothesis can instead maintain:

- a long-term collection of evidence associated with the continuing thing;
- a much smaller recent state representing the local condition being experienced now.

Later, an action-conditioned predictor can learn:

$$
P(R_{t+1}\mid R_t,M,a_t),
$$

where \(R_t\) is recent local evidence and \(M\) is the broader persistent evidence state.

If this is sufficient for prediction and grouping, explicit object-relative geometry may not be required. The topology of predictable transitions can itself provide the useful structure.

That is a hypothesis, not yet a result. V1 does not attempt to prove it; V1 only establishes the streaming persistent grouping substrate needed to test it later.

## What PSG is claiming—and what it is not

The revised research program makes fewer claims at once.

### V1 claim

> **A bounded set of recurrent competitive slots, augmented with short- and long-timescale evidence memory, may be sufficient to form more stable online visual groupings than static or memoryless slot inference.**

### Later predictive claim

> **Prediction of future evidence may provide additional evidence for ownership when appearance alone is ambiguous.**

### Later sensorimotor claim

> **Action-conditioned transitions may allow persistent groups to be organized by common sensorimotor consequences without requiring an explicit object-relative geometric model.**

Several pieces remain unresolved:

- how the short and long buffers should be encoded;
- how large each buffer should be;
- how the long buffer should sample or consolidate evidence;
- how inactive slots should freeze, retire, and be recycled;
- when an unused slot should activate;
- when explicit split or merge operations become necessary;
- how to prevent stale long-term evidence from causing slot lock-in;
- what future-evidence representation should be predicted in V2;
- how prediction should influence ownership without becoming self-confirming;
- how known actions or self-motion should condition prediction in V3;
- how touch should join visual evidence;
- how active sensing should trade information gain against cost;
- how persistent groups should eventually compose hierarchically;
- how long-term object memory and associative retrieval should be added without controlling object identity.

Those are features of the research program, not details to hide. PSG is useful only if each can be turned into a small falsifiable experiment rather than protected by adding more machinery.

## The mental model to keep

For V1, the shortest useful picture is:

~~~text
continuous video
      |
      v
local visual evidence
      |
      v
recurrent slot competition
      |
      +---- short-term evidence memory
      |
      +---- long-term evidence memory
      |
      v
persistent soft ownership
      |
      +--------------------> next frame
~~~

Then the roadmap adds mechanisms one at a time:

~~~text
V1  stream + recurrent slots + short/long memory
 |
 v
V2  + future-evidence prediction
 |
 v
V3  + known action / self-motion conditioning
 |
 v
V4+ + tactile evidence
     + active sensing
     + conditional computation
     + hierarchy
     + lifelong object recall
~~~

The robot does not need to decide immediately what every observation *is*. The first problem is smaller: maintain a disciplined, revisable set of continuing hypotheses over a live stream.

If that works, prediction and action can be added as controlled extensions rather than assumptions baked into the first experiment.
