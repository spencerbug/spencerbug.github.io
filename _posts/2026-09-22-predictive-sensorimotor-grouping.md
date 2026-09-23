---
layout: post
title: "Predictive Sensorimotor Grouping: From Motifs to Persistent Things"
date: 2026-09-22 22:36:00 -0500
last_modified_at: 2026-09-22
permalink: /blog/predictive-sensorimotor-grouping/
description: "A working architecture for grouping visual, tactile, motion, and action-conditioned evidence into revisable persistent hypotheses."
---

{% include ai-assisted-author-note.html %}

**Working research note · architecture under active review.** Predictive Sensorimotor Grouping (PSG) is an exploratory design, not an experimentally validated model. The mechanisms below deliberately distinguish requirements from proposed implementation choices so they can be replaced one at a time.

## The problem: how does experience become a thing?

A robot does not receive objects. It receives streams.

A camera produces changing pixel values. Touch sensors produce pressure or contact histories. Encoders and inertial sensors estimate how the robot itself moved. Motor commands change what can be sensed next.

Somewhere between those streams and a useful model of the world, the robot needs to form provisional **piles of evidence**:

- these visual changes may belong together;
- this touch sequence may concern the same continuing thing;
- this feature disappeared during an occlusion but may still exist;
- this new observation may contradict an earlier assignment;
- these two piles may really be one thing;
- this pile may contain evidence from two different things and need to split.

The word **object** is intentionally avoided at first. A useful persistent group might eventually represent an object, a part, a surface, a place, or another recurring structure. PSG asks whether object-like organization can emerge from sensorimotor evidence without supplying object identity as an input.

A simple counterexample motivates the problem. Suppose a camera successfully predicts a black seam on a basketball. Later it successfully predicts a black court line. Both predictions can be excellent. That does not mean the seam and the court line belong to the same physical entity.

**Prediction is evidence about regularity. It is not, by itself, evidence of ownership.**

PSG therefore separates three concepts:

1. A **motif** is a reusable sensory-motion pattern.
2. An **occurrence** is one particular observation of a motif at a place and time.
3. A **persistent hypothesis** is the system's revisable claim that multiple occurrences share a continuing source.

That distinction is the foundation of the architecture.

## Architecture at a glance

The current proposal has two nested loops.

The first loop rereads the same observation. A tentative persistent hypothesis predicts what evidence should exist and routes additional computation toward the places and feature types that could confirm, refine, or contradict it. This is the role of **Recurrent Predictive Routing (RPR)** inside PSG.

The second loop changes the observation itself. A hypothesis predicts the consequences of possible actions; the robot can then move, touch, push, rotate, or otherwise intervene to obtain evidence that passive inference cannot provide.

~~~mermaid
flowchart TD
    V["Visual history"] --> VE["1 · Visual motif encoder"]
    T["Touch history"] --> TE["1 · Tactile motif encoder"]
    M["Estimated self-motion"] --> VE
    M --> TE
    A0["Executed action history"] --> TE

    VE --> O["2 · Local motif occurrences"]
    TE --> O

    O --> G["3 · Soft ownership / grouping"]
    G --> H[("4 · Persistent hypotheses")]

    H --> P["5 · Action-conditioned predictions"]
    P --> D{"6 · What evidence is worth buying?"}

    D -->|"think harder"| R["RPR: route/gate another inference pass"]
    R --> VE
    R --> TE

    D -->|"act"| A1["Choose sensing / manipulation action"]
    A1 --> V
    A1 --> T

    D -->|"wait"| H
~~~

The diagram should not be read as saying that vision and touch need identical encoders. They probably should not. The common interface begins **after** modality-specific feature extraction.

The important architectural claim is narrower: scattered observations can compete for ownership by persistent hypotheses, and those hypotheses can then generate predictions that guide either more computation or new physical sensing.

## 1. Build local sensorimotor motifs before trying to build objects

The first stage deliberately avoids asking which object produced an observation.

Instead, it asks a smaller question:

> What local pattern of sensory change occurred while the sensor or body was moving this way?

### Visual motifs

For a small visual example, retain nine camera samples and therefore eight frame-to-frame differences. At each image location, start with three channels:

- change in intensity;
- estimated image-plane or camera-relative motion in x;
- estimated image-plane or camera-relative motion in y.

For a \(32\times32\) image:

$$
X_t^V \in \mathbb{R}^{3\times8\times32\times32}.
$$

The eight entries on the temporal axis are **differences**, not eight original frames. Producing eight differences requires nine samples unless the preceding difference has already been retained.

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

The exact widths are implementation choices, not PSG requirements.

A crucial choice is what **not** to do next. Pooling an entire temporal or spatial region too aggressively can mix evidence from different physical sources before ownership has even been considered. A later split operator cannot reconstruct information that max pooling already discarded.

The first PSG prototype should therefore preserve local spatial support until grouping.

### Tactile motifs have a different shape

Touch should not be forced into the visual tensor merely to make the architecture symmetrical.

A tactile array might have fewer spatial channels but a longer useful temporal history. Contact onset, sustained pressure, slip, release, and traversal across neighboring taxels can unfold over different timescales.

Suppose a toy fingertip has four touch sensors:

~~~text
T0 -- T1 -- T2 -- T3
~~~

A ridge moving under the finger could produce:

~~~text
time ---------------------------------------->

T0       /\____
T1          /\____
T2             /\____
T3                /\____
~~~

Several kernel families could therefore coexist:

~~~text
single-sensor temporal kernel:
    1 sensor × 8, 16, or 32 samples

neighbor-pair kernel:
    2 neighboring sensors × 8, 16, or 32 samples

local tactile-group kernel:
    several physically adjacent sensors × temporal history
~~~

The tactile encoder can also receive executed joint motion, fingertip displacement, or force information. A rise in pressure means something different when the finger is stationary than when it is sweeping sideways across a surface.

The design principle is:

> **Each modality gets the raw geometry and temporal support appropriate to that modality, then emits a common kind of occurrence record for grouping.**

An occurrence might contain:

~~~text
feature embedding
sensor / spatial support
time support
estimated geometry
executed-motion context
uncertainty
source modality
~~~

Visual and tactile embeddings do not need to mean the same thing. Cross-modal correspondence is something PSG is supposed to discover, not something the input representation should assume.

## 2. Group occurrences into revisable persistent hypotheses

After local feature extraction, PSG maintains a small bounded set of candidate records.

Call candidate \(k\):

$$
H_k.
$$

A candidate is not simply a recurrent vector into which every compatible observation is permanently blended. It needs at least two timescales:

~~~text
H[k]
├── slow persistent state
│   ├── descriptor / learned state
│   ├── estimated geometry and motion
│   ├── uncertainty
│   └── lifecycle state
│
└── bounded recent evidence
    ├── occurrence references
    ├── ownership weights
    ├── timestamps
    └── assignment confidence
~~~

The bounded recent evidence acts like a small transaction log. If later evidence shows that an occurrence was assigned to the wrong candidate, PSG can repartition the recent evidence rather than attempting to mathematically invert a fully mixed latent vector.

This buffer is not free memory. Its storage and maintenance count against the architecture's memory budget.

### Soft ownership

Let \(f_i\) be local occurrence \(i\), and let \(H_k\) be candidate \(k\). The grouping stage computes compatibility using some combination of learned feature compatibility, predicted location, motion consistency, predicted sensory consequence, time, uncertainty, and candidate history.

For a small prototype, the ownership table can be explicit:

~~~text
                    candidate
              H0     H1     H2     H3    unassigned
occurrence 0   .      .      .      .        .
occurrence 1   .      .      .      .        .
occurrence 2   .      .      .      .        .
...
~~~

The **unassigned** column matters. Weak evidence for every existing candidate should not force an observation into the least-wrong pile.

Soft assignment initially means uncertainty about ownership. Genuine mixed observations—such as a convolutional receptive field spanning two surfaces—are a separate problem and should not be silently conflated with uncertainty.

Candidate records can eventually be born, retired, split, merged, or recovered. The first prototype does not need a sophisticated lifecycle algorithm; fixed candidate capacity plus inactive slots is enough to test the grouping mechanism.

## 3. A persistent hypothesis predicts consequences, not just appearance

Once a candidate has accumulated evidence, it should make predictions.

But there is an important extension beyond ordinary next-frame prediction: the prediction can be **conditioned on an action**.

For candidate \(H_k\) and possible action \(a_j\):

$$
F(H_k,a_j)
\rightarrow
\left(
\hat V_{k,j},
\hat T_{k,j},
\hat H'_{k,j},
U_{k,j}
\right).
$$

Here \(\hat V_{k,j}\) is predicted visual evidence, \(\hat T_{k,j}\) is predicted tactile evidence, \(\hat H'_{k,j}\) is the predicted candidate state after the action, and \(U_{k,j}\) represents predictive uncertainty.

~~~text
for candidate in active_candidates:
    for action in candidate_actions:
        futures[candidate, action] =
            predict(candidate.state, action)
~~~

This does **not** mean an object owns one canonical action. A cup might support looking from another angle, touching, pushing, grasping, lifting, rotating, or releasing. The candidate supplies a state against which possible actions can be queried.

This also creates a natural bridge between modalities. PSG does not need to force a visual black edge and a tactile ridge into identical embeddings. Instead, one persistent hypothesis can predict both:

~~~text
persistent hypothesis H[k]
          +
     finger sweep
          |
          +----> expected visual change
          |
          +----> expected tactile sequence
          |
          +----> expected contact geometry
~~~

If the predicted consequences occur together, they provide evidence for the common hypothesis.

## 4. Thinking harder means another pass over the same evidence

PSG has two fundamentally different ways to resolve uncertainty.

The first is internal.

Suppose the initial visual pass produces a tentative hypothesis: *there may be one continuing round structure here*. That hypothesis predicts where its boundary should continue and which motif families would be informative.

Those predictions can be scattered back toward the sensory front end and used to route or gate another pass over the **same observation**.

Let \(t\) denote physical time and \(r\) denote the inference iteration within time \(t\):

$$
H_t^{(0)}
\rightarrow
H_t^{(1)}
\rightarrow
H_t^{(2)}
\rightarrow \cdots
$$

~~~text
for r in inference_budget:
    guidance = scatter(predictions(H[r]))

    features = selectively_encode(
        same_raw_input,
        guidance
    )

    ownership = regroup(features, H[r])
    H[r + 1] = revise(H[r], ownership)
~~~

This is where Recurrent Predictive Routing fits inside PSG.

~~~mermaid
flowchart LR
    X["Same observation at time t"] --> K["Routed / gated motif kernels"]
    K --> C["Local compression"]
    C --> G["Ownership / grouping"]
    G --> H["Persistent hypotheses"]
    H --> P["Predictions"]
    P --> S["Scatter spatial + feature guidance"]
    S --> K
~~~

Iteration \(r+1\) has not observed the future. It is a revised interpretation of evidence already available at physical time \(t\).

The feedback must also remain distinguishable from evidence. A hypothesis should not inject a predicted feature into the sensory stream and then count its own injected feature as independent confirmation. Prediction can control routing, gating, comparison, and compute allocation while the actual observation remains separately identifiable.

If routing is intended to save compute, later iterations should not blindly rerun the entire front end. Prediction should determine which regions, kernels, temporal histories, or resolutions receive additional execution.

## 5. Acting obtains evidence that does not exist yet

The second way to resolve uncertainty is external.

The robot can act.

~~~text
uncertain grouping
      |
      +---- THINK ----> reread same evidence with another routed pass
      |
      +---- ACT ------> change sensor/world relation and obtain new evidence
      |
      +---- WAIT -----> preserve uncertainty because resolving it is not worth the cost
~~~

This distinction becomes especially powerful for grouping.

Imagine two visually similar circles. One is a movable ball. The other is a painted circle on the floor. Passive appearance can make them difficult to distinguish.

A finger sweep or push produces very different consequences.

~~~text
movable ball:

finger approaches
    -> touch onset
    -> curved tactile traversal
    -> push
    -> visual features move together


painted circle:

finger approaches
    -> contact with flat floor
    -> no raised contour
    -> push
    -> visual marking remains fixed to floor
~~~

The intervention supplies evidence that passive prediction did not contain.

This suggests a stronger interpretation of a persistent group:

> **A persistent hypothesis is a candidate common source of sensorimotor consequences.**

Two features that merely look similar need not belong together. Two scattered observations whose visual, tactile, geometric, and action-conditioned consequences remain mutually consistent have a much stronger case.

## 6. Prediction creates a choice: think, act, or remain uncertain

Once the architecture can estimate uncertainty and predict consequences, attention becomes a resource-allocation problem.

A difficult ambiguity does not automatically deserve resolution.

The system can spend computation on another recursive inference pass, spend physical time and energy on an informative action, or retain competing hypotheses and continue without resolving them.

A future controller could compare an operation's expected information value with its cost:

$$
j^*
=
\operatorname*{arg\,max}_j
\frac{\mathbb{E}[\Delta I_j]}{C_j}.
$$

Here \(\mathbb{E}[\Delta I_j]\) is the expected useful reduction in uncertainty and \(C_j\) is the operation's cost.

~~~text
for option in possible_operations:
    gain = expected_information_gain(option)
    cost = resource_cost(option)

choose useful_option(gain, cost)
~~~

This equation is a research direction, not yet the PSG attention policy. "Cost" is multidimensional. Thinking consumes compute, memory bandwidth, energy, and latency. Acting consumes time and energy and may disturb the world or carry physical risk.

The interesting recursive relationship is that **thinking can decide how to act, and acting can decide where to think**.

~~~mermaid
flowchart TD
    U["Ambiguous ownership"] --> C["Cheap inference"]
    C --> Q["Which observation would distinguish the hypotheses?"]
    Q --> A["Move / touch / push / change viewpoint"]
    A --> E["New sensory evidence"]
    E --> R["Route extra computation to informative regions/features"]
    R --> H["Revise persistent hypotheses"]
~~~

This makes predictive attention broader than visual salience. It becomes a candidate **budgeted evidence-acquisition mechanism** spanning both internal computation and physical interaction.

## 7. Causality and timing have to stay explicit

A prediction evaluated at physical time \(t\) must have been produced before the observation it is scored against.

The architecture therefore needs two clocks: physical time \(t\), and inference iteration \(r\).

~~~text
information through t-1
        |
        v
persistent H[t-1]
        |
        v
forecast for t
        |
--------+---------------- observation t arrives
        |
        v
motif occurrences
        |
        v
ownership / posterior inference
        |
        v
H[t, r=0]
        |
        +---- recursive inference over same observation
        |       H[t,1] -> H[t,2] -> ...
        |
        v
final H[t]
        |
        v
forecast / action candidates for t+1
~~~

Repeated inference after observing time \(t\) is useful, but it is not forecasting \(t\). Keeping that distinction explicit prevents a recurrent model from receiving credit for predictions that already had access to their targets.

## 8. A first falsifiable world

The architecture should earn complexity gradually.

A useful first PSG environment could contain a \(32\times32\) grayscale camera, two visually similar circular features, one movable object, one marking attached to the background, a four-sensor tactile finger, known but noisy camera and fingertip motion, an occluder, and a bounded number of persistent candidates.

The learner receives no object IDs. The simulator can retain hidden identities strictly for evaluation.

The first experiment asks four separate questions:

**Prediction:** Does the system predict future visual and tactile changes?

**Grouping:** Do occurrences that share a physical source accumulate in a stable candidate more often than unrelated but visually similar occurrences?

**Recursive attention:** Under a fixed compute budget, do additional RPR passes spend computation where it improves inference rather than simply rerunning everything?

**Active sensing:** When passive evidence is ambiguous, does an action-conditioned policy choose interventions whose consequences reduce the ambiguity?

Those metrics must remain separate. Better next-frame prediction does not prove better correspondence. Better correspondence does not prove compute-efficient attention. A successful touch intervention does not prove that the same architecture would choose that action autonomously.

A particularly important test is occlusion:

~~~text
A and B look similar
      |
      v
their paths cross
      |
      v
A disappears
      |
      v
B remains visible
      |
      v
A reappears where its motion made plausible
~~~

For evaluation, match a persistent candidate to a hidden simulator object and then **do not rematch it independently every frame**. Otherwise a system can silently swap candidate identities while receiving a good per-frame grouping score.

There should also be intentionally unidentifiable cases. If two identical objects always move together, remain adjacent, undergo identical interactions, disappear together, and reappear symmetrically, the evidence may simply not determine which is which. A useful architecture should preserve uncertainty rather than invent certainty.

## What PSG is claiming—and what it is not

The current proposal is not that CNN kernels discover objects, that prediction error defines attention, or that slots automatically solve persistent identity.

The narrower research hypothesis is:

> **Local sensorimotor motifs, bounded revisable ownership, persistent hypotheses, action-conditioned prediction, and recurrent predictive routing may together provide enough structure for useful persistent groups to emerge without supplying object identities.**

Several pieces remain unresolved:

- how candidate birth, retirement, split, and merge should work;
- how much recent evidence must remain editable;
- whether dense ownership matrices are necessary or sparse retrieval is enough;
- how tactile sensor topology should be represented;
- how action candidates should be generated;
- how information value should be estimated;
- how to prevent feedback from becoming self-confirming;
- when a persistent group should represent a part rather than a whole object;
- how this mechanism should eventually compose hierarchically.

Those are features of the research program, not details to hide. PSG is useful only if each can be turned into a small falsifiable experiment rather than protected by adding more machinery.

## The mental model to keep

For now, the shortest useful picture is:

~~~text
sensor change + self-motion + executed action
                    |
                    v
          modality-specific motifs
                    |
                    v
             local occurrences
                    |
                    v
           revisable ownership
                    |
                    v
         persistent hypotheses
                    |
                    v
      action-conditioned predictions
                    |
             +------+------+
             |             |
             v             v
        THINK HARDER       ACT
        same evidence      new evidence
             |             |
             +------+------+
                    |
                    v
             revise the piles
                    |
                    +----> repeat
~~~

The robot does not need to decide immediately what every observation *is*. It needs a disciplined way to keep provisional explanations alive, spend resources when ambiguity matters, and revise those explanations when the world disagrees.
