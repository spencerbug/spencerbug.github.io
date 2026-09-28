---
layout: post
title: "Temporal Escrow Resonance: Fast Identity Memory on a Shared Predictive Substrate"
date: 2026-09-28 09:46:00 -0500
last_modified_at: 2026-09-28
permalink: /blog/temporal-escrow-resonance/
description: "A working embodied-intelligence architecture that combines open-ended object memory, ART-like resonance, shared deep predictive learning, active experiments, and temporal escrow against self-confirming evidence."
---

{% include ai-assisted-author-note.html %}

**Working research note · architecture under active review.** Temporal Escrow Resonance Network (TERN) is an exploratory architecture, not an experimentally validated model. It grew out of a narrower question about object identity: how can an embodied learner continuously create new identities, learn from them aggressively, and still prevent its own recurrent hypotheses from returning as counterfeit evidence?

The central proposal is:

> **Persistent identities should be fast nonparametric memories interpreted by a shared deep predictive substrate. A hypothesis may influence what is predicted or tested next, but evidence used to create that hypothesis is held in escrow: it cannot also validate the hypothesis. Validation must come from evidence that did not yet exist when the prediction was committed.**

This separates two jobs:

1. **Fast memory** creates and updates individual object hypotheses with little or no gradient descent.
2. **Shared deep learning** continuously updates the encoder, retrieval metric, predictor, vigilance machinery, grouping machinery, and later abstraction layers.

TERN therefore tries to preserve two attractive properties at once:

- one-shot or few-shot creation of a previously unknown identity;
- broad gradient updates that improve general machinery across many identities rather than changing only one local object artifact.

The architecture starts with fixed sensor patches, sparse approximate-nearest-neighbor retrieval, ART-like vigilance, active inference, and an unknown number of persistent identities. The longer-term hypothesis is that the same proposal/challenge/resonance rule can recurse into parts, objects, relations, scenes, affordances, and still higher abstractions.

## 1. The problem: open-ended identity without local-only learning

A conventional classifier usually ends in a fixed output vector:

\[
p(y\mid x)
=
[p(C_1),p(C_2),\ldots,p(C_K)].
\]

That assumes the identity vocabulary is known when the model is built.

An embodied learner has a different problem. It may encounter object \\(K+1\\) tomorrow, \\(K+2\\) next week, and millions more over its lifetime. Rebuilding and retraining a softmax head whenever a new identity appears is the wrong abstraction.

A more natural starting point is a shared encoder:

\[
z = E_\theta(x),
\]

with persistent identities represented separately in memory:

\[
M_1,M_2,\ldots,M_K.
\]

A new object can then be created by allocating a new memory artifact rather than a new output neuron.

But this creates a second problem.

If every persistent identity owns its own private predictor, matcher, or transition model, then experience with one object updates only that object. Learning becomes narrow. A new observation does not improve the machinery used by thousands of related and unrelated things.

That loses one of the major strengths of deep learning:

> **A single prediction error can update a large shared parameter set simultaneously.**

TERN therefore deliberately makes persistent identities mostly **memory**, while keeping most trainable machinery **shared**.

## 2. Architecture at a glance

TERN separates memory from computation.

~~~mermaid
flowchart TD
    X["fixed sensor patches"] --> E["shared encoder Eθ"]
    E --> Z["patch population codes"]
    Z --> R["shared ANN retrieval embedding"]
    R --> C["top-K candidate memories + UNKNOWN"]
    C --> V["shared vigilance / resonance matcher"]
    V --> H["provisional identity hypotheses"]
    H --> P["shared action-conditioned predictor Pθ"]
    P --> Q["commit predictions to temporal escrow"]
    Q --> A["action / passage of time"]
    A --> O["new sensory evidence"]
    O --> S["score committed predictions"]
    S --> RR{"resonate or reset?"}
    RR -->|resonate| M["update / promote persistent memory"]
    RR -->|reset| C
    S --> L["shared multi-objective gradient learning"]
    L --> E
    L --> R
    L --> V
    L --> P
    M --> R
~~~

A persistent object memory might contain data such as:

\[
M_j=
\{
\text{prototypes},
\text{episodic traces},
\text{transition anchors},
\text{uncertainty},
\text{relations}
\}.
\]

The shared neural substrate contains functions such as:

\[
z_{i,t}=E_\theta(x_{i,t-L:t}),
\]

\[
k_{i,t}=R_\theta(z_{i,t}),
\]

\[
s_{ij}=V_\theta(z_{i,t},M_j),
\]

and

\[
\hat z_{i,t+1}
=
P_\theta(z_{i,t},M_j,a_t).
\]

The object does not get its own deep neural network. It supplies memory that the shared functions interpret.

That means a newly created identity can immediately use predictive machinery trained across every object encountered before it.

## 3. Fixed sensor patches and sparse identity retrieval

The first toy version assumes a visual field divided into fixed patches.

Each patch observes a short local history:

\[
x_{i,t-L:t}.
\]

The shared encoder produces a compact population code:

\[
z_{i,t}=E_\theta(x_{i,t-L:t}).
\]

A retrieval projection produces a stable key:

\[
k_{i,t}=R_\theta(z_{i,t}).
\]

Rather than score every persistent identity, each patch queries an approximate-nearest-neighbor index:

\[
C_i
=
\operatorname{ANN}_K(k_{i,t}).
\]

For example:

~~~text
patch 17 retrieves:
    object 42
    object 781
    object 19
    object 103
    UNKNOWN
~~~

Different patches may retrieve different candidate sets. Consensus does not require a globally enumerated ballot.

A stored object may contain many local prototypes or transition anchors rather than one global vector:

\[
M_j=
\{p_{j1},p_{j2},\ldots,p_{jn_j}\}.
\]

The ANN index can therefore retrieve local evidence and map each hit back to a persistent parent identity.

This resembles metric-learning approaches such as Prototypical Networks, where a neural network learns a representational space and classification can be performed by comparing an example with stored prototypes rather than by adding a fixed softmax output for every possible future class.

## 4. ART-like vigilance is a challenge, not a verdict

Nearest neighbor is only candidate generation.

A retrieved candidate must still survive a vigilance test:

\[
v_{ij}
=
V_\theta(z_i,M_j).
\]

If

\[
v_{ij}<\rho,
\]

candidate \\(M_j\\) is reset for that patch and another candidate may be tested.

If no stored identity passes vigilance, the legal outcome is:

\[
\text{UNKNOWN}.
\]

This is inspired by Adaptive Resonance Theory (ART), where bottom-up evidence activates a candidate category, the category supplies a top-down expectation, and mismatch can reset the candidate and continue search. High vigilance produces finer categories; lower vigilance permits broader categories.

TERN generalizes the interpretation:

> **A candidate identity is allowed to propose an expectation. The expectation itself is not evidence. It must survive comparison with evidence outside the proposal.**

That distinction becomes crucial once recurrence is introduced.

## 5. Temporal escrow: predict first, validate later

The central architectural rule is simple:

\[
\boxed{
\text{predict}
\rightarrow
\text{commit}
\rightarrow
\text{observe}
\rightarrow
\text{score}
\rightarrow
\text{learn}
}
\]

Suppose evidence through time \\(t\\) proposes object hypothesis \\(H\\).

That evidence is sufficient to create the hypothesis:

\[
E_{\le t}\rightarrow H.
\]

It is **not** allowed to confirm the hypothesis.

Before the next observation exists, the system commits a prediction:

\[
\hat E_{t+1}
=
P_\theta(H,E_{\le t},a_t).
\]

The prediction and relevant model state are placed in a conceptual escrow record:

~~~text
prediction ticket
-----------------
time: t
candidate identity: H
available evidence: E≤t
chosen action: a_t
predicted future evidence: Ê_{t+1}
model version: θ_t
~~~

Then the robot acts, or time passes.

Only afterward does reality produce:

\[
E_{t+1}.
\]

Now the hypothesis can earn evidence:

\[
\lambda(H)
=
\log
\frac
{p(E_{t+1}\mid H,E_{\le t},a_t)}
{p(E_{t+1}\mid U,E_{\le t},a_t)}.
\]

The important causal fact is that \\(E_{t+1}\\) could not have been used to construct the prediction that is now being tested against it.

This prevents a dangerous loop:

~~~text
hypothesis wins
    ↓
train model on the same evidence
    ↓
model fits that evidence better
    ↓
better fit is treated as confirmation
    ↓
hypothesis wins harder
~~~

TERN requires the opposite ordering:

~~~text
hypothesis proposed
    ↓
prediction frozen
    ↓
new evidence arrives
    ↓
prediction scored
    ↓
only now may learning occur
~~~

The escrow rule is not itself a neural learning algorithm. It is a **causal accounting rule for validation**.

## 6. Recurrent belief may circulate; evidence may not multiply

A recurrent network can pass a hypothesis through many nodes:

~~~text
A → B → C → D → A
~~~

That creates a classic danger in loopy inference: evidence originating at A can eventually return to A through another path and appear independent.

TERN does not initially try to solve arbitrary provenance bookkeeping.

Instead it imposes an evidence-conservation rule:

> **Internal messages may redistribute, refine, suppress, or select hypotheses. They cannot manufacture new likelihood. New confidence must ultimately be paid for by a new designated evidence event.**

A returned message may cause A to test a different prediction. It cannot increase global confidence merely because the hypothesis completed another circuit.

The recurrent network is free to ask:

- which candidate should be tested?
- which stored identity is most relevant?
- which neighbor should be queried?
- which action would distinguish two hypotheses?
- what should be predicted next?

But confirmation requires a new observation, a held-out observation, or another explicitly independent evidence channel.

The toy V1 uses **future sensory evidence** as the cleanest provenance boundary because time makes its independence easy to audit.

## 7. Active inference turns ambiguity into an experiment

Suppose two object hypotheses currently fit:

\[
H_1,\quad H_2.
\]

They predict similar present evidence, but different consequences under action \\(a\\):

\[
p(E_{t+1}\mid H_1,a)
\neq
p(E_{t+1}\mid H_2,a).
\]

The system can choose an action maximizing disagreement:

\[
a^*
=
\arg\max_a
D\left(
p(E_{t+1}\mid H_1,a),
p(E_{t+1}\mid H_2,a)
\right),
\]

or more generally maximizing expected information gain.

Conceptually:

~~~text
H1: "move right; the handle should enter these patches"
H2: "move right; no handle should appear"

               ↓

          move right

               ↓

          observe world

               ↓

     resonance / reset
~~~

This gives recurrent inference an escape hatch:

> **When internal messages become circular or ambiguous, ask the world a question.**

The action is not merely motor output. It is an experiment.

## 8. Fast identity memory and shared deep learning

Temporal escrow would be too slow if every object learned only through its own private weights.

TERN instead has two complementary update paths.

### Fast path: memory

A newly observed identity can be allocated immediately:

\[
M_{K+1}\leftarrow
\{\text{current prototypes and traces}\}.
\]

No global retraining is necessary just to create the identity.

A provisional identity may be promoted, revised, merged, or deleted as future escrowed evidence accumulates.

### Shared path: gradient learning

Once new evidence has been scored, the same transition can update many shared functions simultaneously.

A toy loss might be:

\[
\mathcal L_t
=
\lambda_p\mathcal L_{\text{prediction}}
+
\lambda_r\mathcal L_{\text{retrieval}}
+
\lambda_v\mathcal L_{\text{vigilance}}
+
\lambda_c\mathcal L_{\text{contrastive}}
+
\lambda_g\mathcal L_{\text{grouping}}
+
\lambda_h\mathcal L_{\text{hierarchy}}.
\]

All of these losses may backpropagate through overlapping shared parameters.

So learning object \\(M_{1001}\\) does not mean:

> update the circuitry belonging to object 1001.

It means:

> use this encounter as another constraint on the general machinery for encoding, retrieving, predicting, distinguishing, grouping, and composing things.

That is the mechanism by which learning can propagate widely.

## 9. Hard negatives turn local novelty into neighborhood learning

ANN retrieval provides more than computational efficiency.

It also tells the learner which existing memories were most confusing.

Suppose a new object retrieves:

\[
M_{17},M_{51},M_{983}.
\]

If future evidence confirms that none of them was correct, those are useful hard negatives.

A contrastive loss can use the confirmed identity \\(M_+\\) against its confusing neighbors:

\[
\mathcal L_{\text{metric}}
=
-\log
\frac{
\exp(\operatorname{sim}(z,M_+)/\tau)
}{
\exp(\operatorname{sim}(z,M_+)/\tau)
+
\sum_{k\in C^-}
\exp(\operatorname{sim}(z,M_k)/\tau)
}.
\]

This gives each new identity a **neighborhood learning radius**.

The update does not touch only the new artifact. It teaches the shared representation why this experience should separate from the things it most resembled.

## 10. Replay provides a global learning radius

Shared weights create another familiar problem: catastrophic interference.

A gradient step trained only on the newest object can make the global representation worse for older objects.

TERN therefore expects interleaved replay or another consolidation mechanism.

A simple batch might contain:

~~~text
25% current experience
25% ANN-confusable prior experiences
25% recent experiences
25% broadly sampled older experiences
~~~

The exact sampling policy is an experiment.

The important idea is that one current encounter is optimized in the context of previous experience.

That gives three learning radii:

~~~text
NEW EXPERIENCE
      │
      ├── fast/local
      │     update persistent memory artifact
      │
      ├── neighborhood
      │     contrast against ANN-confusable memories
      │
      └── global
            backprop current + replay losses
            through shared machinery
~~~

This resembles the computational motivation behind Complementary Learning Systems: rapid storage of individual experiences alongside slower distributed learning that extracts shared structure through interleaved experience.

TERN does not require a literal mapping from these artificial components onto hippocampus and neocortex. The relevant idea is computational: **fast memory and broad overlapping representation learning solve different problems.**

## 11. Encoder drift is a first-class memory problem

If object memories store embeddings,

\[
z=E_\theta(x),
\]

while \\(E_\theta\\) continues to learn, then old stored vectors eventually become stale.

The coordinate system itself moves.

A toy implementation should therefore avoid assuming that historical embeddings remain permanently meaningful.

Three possible mechanisms are:

1. **Store replayable sensory anchors** so important memories can be re-encoded later.
2. Use a slowly moving target or EMA encoder for retrieval keys:
   \[
   k=E_{\bar\theta}(x).
   \]
3. Periodically rebuild or partially refresh the ANN index during consolidation.

This suggests separating the rapidly adapting perceptual representation from the more slowly moving content-addressable memory key.

## 12. Spatial grouping can remain simple in V1

The architecture still needs to bind patch evidence into current instances.

The first version does not require pairwise cross-prediction among every patch.

Each patch instead produces sparse log evidence for retrieved identities:

\[
L_j(x_i)
=
\log
\frac{p(z_i\mid M_j)}
     {p(z_i\mid U)}.
\]

Those scores form a spatial evidence field for each candidate.

A local morphological operation in log space can encourage coherent regions without making it part of the identity-learning mechanism.

For example, a max-plus dilation can be written:

\[
(\delta_B L_j)(x)
=
\max_{u\in B}
[L_j(x-u)+b(u)],
\]

with erosion as the corresponding min-plus dual.

Opening, closing, connected components, or a later learned grouping module can turn sparse patch evidence into candidate current instances.

This keeps four questions separate:

1. **retrieval:** what stored things might explain this patch?
2. **vigilance:** does the raw evidence actually match?
3. **grouping:** which nearby patch supports belong to the same current instance?
4. **identity:** which persistent memory best survives future prediction?

An active track can then preserve current-instance continuity even when two visible instances correspond to the same learned category or object type.

## 13. A toy learning episode

Imagine a robot encounters a blue stapler that it has never seen before.

### Step 1: encode

Fixed patches produce local representations:

\[
x_i\rightarrow E_\theta\rightarrow z_i.
\]

### Step 2: retrieve

Several patches retrieve familiar neighbors:

~~~text
red stapler
tape dispenser
hole punch
UNKNOWN
~~~

### Step 3: vigilance

None of the known candidates explains enough of the observation.

A provisional identity is created:

\[
M_{\text{new}}.
\]

The current observations may initialize its memory, but they are marked as **proposal evidence**.

They cannot validate the identity they just created.

### Step 4: commit a prediction

Before another frame exists, the shared predictor uses the provisional memory and an intended camera movement:

\[
\hat z_{t+1}
=
P_\theta(z_t,M_{\text{new}},a_t).
\]

Known alternatives make their own predictions.

### Step 5: act

The camera moves right.

### Step 6: acquire independent evidence

A new image arrives.

The predictions were fixed before these pixels existed.

### Step 7: resonance or reset

If the provisional identity predicts the new patch transitions better than the alternatives, it gains evidence.

If it fails badly, it can be revised, merged with a known identity, or reset.

### Step 8: learn widely

Only after scoring, gradient descent uses the transition to improve:

- the shared local encoder;
- the action-conditioned predictor;
- the ANN retrieval metric;
- vigilance calibration;
- hard-negative separation from the red stapler, tape dispenser, and hole punch;
- grouping behavior;
- eventually higher abstraction machinery.

Replay interleaves older experiences.

The new identity itself may have been created in one encounter, while its experience contributes to general learning across the whole system.

## 14. Deep abstraction uses the same protocol recursively

TERN is intended to be recursive.

At the lowest level, nodes represent local sensory states.

Higher levels may represent:

\[
\text{features}
\rightarrow
\text{parts}
\rightarrow
\text{objects}
\rightarrow
\text{relations}
\rightarrow
\text{scenes}
\rightarrow
\text{affordances}
\rightarrow
\text{tasks}.
\]

The architectural rule does not have to change.

A higher-level model \\(H^{(\ell+1)}\\) can be proposed from lower-level states:

\[
H^{(\ell+1)}
=
G_{\theta_\ell}
(z_1^{(\ell)},\ldots,z_n^{(\ell)}).
\]

But those same child states cannot be counted again as independent validation.

The higher model must earn support by predicting something else:

\[
\hat z_{t+1}^{(\ell)}
=
P_{\theta_\ell}
(H^{(\ell+1)},z_t^{(\ell)},a_t).
\]

If the prediction survives new evidence, resonance strengthens the abstraction.

This gives a possible operational criterion for creating abstractions:

> **A higher-level model earns persistence when it compresses existing structure and predicts held-out or future consequences that its constituent memories do not explain as well individually.**

A reusable "door-opening" model, for example, might combine a handle, hinge, panel, grasp action, and predictable transition. It becomes a persistent higher-level model only if the composition consistently earns new predictive evidence.

## 15. What TERN is not claiming

This architecture borrows ideas from several established traditions but should not be confused with any one of them.

- **Adaptive Resonance Theory** motivates vigilance, reset, resonance, and dynamic category creation.
- **Metric and prototype learning** motivate separating a shared representation from an open-ended collection of identities.
- **Belief propagation** motivates careful treatment of recurrent messages and the danger of double-counting in loops.
- **Complementary Learning Systems** motivates separating rapid item memory from slower distributed structure learning.
- **Active inference and information-seeking control** motivate choosing actions that discriminate among competing hypotheses.

TERN's specific combination—especially **temporal escrow as an evidence-provenance rule for recurrent embodied identity learning**—is a working research proposal.

It should be judged experimentally.

## 16. Minimal prototype

A useful first experiment should be smaller than the full architecture.

### Environment

Use a simulated camera observing a small world containing reusable rigid objects.

Requirements:

- objects can leave and later return;
- new identities can be introduced continuously;
- multiple similar objects can exist;
- the agent can move its camera;
- ground-truth identity is available only for evaluation, not training.

### Model

Use:

1. fixed image patches;
2. shared predictive encoder;
3. ANN index over persistent local prototypes;
4. ART-like vigilance threshold;
5. **UNKNOWN** as a legal candidate;
6. provisional object memories;
7. one-step temporal escrow predictions;
8. action-conditioned next-patch prediction;
9. replay buffer;
10. simple spatial grouping and active tracks.

### Baselines

Compare against:

- fixed softmax classification with periodic retraining;
- nearest-prototype memory without vigilance;
- prototype memory + vigilance without temporal escrow;
- temporal escrow without replay;
- temporal escrow with object-specific predictors instead of a shared predictor.

### Main measurements

Measure:

- new-identity creation precision and recall;
- false merges of distinct objects;
- false splits of one object into multiple identities;
- re-identification after absence;
- prediction accuracy;
- catastrophic forgetting on old objects;
- sample efficiency for new objects;
- number of parameters that receive useful gradient signal per encounter;
- ANN retrieval quality as the identity library grows;
- calibration of resonance confidence;
- performance when visually similar objects require action to disambiguate.

The central ablation is simple:

> **Does temporal escrow reduce self-confirming identity errors while shared gradient learning preserves or improves the data efficiency of open-ended memory?**

## 17. Failure modes to expect

TERN has obvious ways to fail.

### Provisional identity explosion

If vigilance is too strict, normal viewpoint variation may create a new object every few frames.

The system then repeats an old failure mode: representational novelty becomes ontological novelty.

### Identity collapse

If vigilance is too permissive, distinct similar objects merge.

### Correlated "new" evidence

The next frame is technically new but may contain almost the same information as the current frame.

Temporal separation is a causal provenance boundary, not a guarantee of statistical independence.

Longer temporal holds, withheld patches, new viewpoints, touch, or active experiments may provide stronger validation.

### Shared-model contamination

The escrow protects inference ordering, but aggressive SGD can still overfit recent experience or distort the representation.

Replay and consolidation remain necessary.

### Memory-key drift

A rapidly changing encoder can invalidate old ANN keys.

### Confirmation through action policy

If the current hypothesis determines actions, it can choose observations that are easy for itself to predict.

An information-seeking policy should therefore prefer actions that discriminate competing hypotheses rather than merely maximize expected fit to the leading one.

### Deep abstraction explosion

If every coincident group of lower-level models can create a higher-level memory, the hierarchy can grow combinatorially.

Higher abstractions will need stronger persistence criteria than one successful prediction.

## 18. Research principle

The architecture can be compressed into one rule:

> **A model may use prior evidence to decide what to predict next. It may not count the success of a prediction unless the validating evidence was unavailable when that prediction was committed.**

Around that rule, two complementary memory systems emerge:

\[
\boxed{
\text{fast open-ended identity memory}
+
\text{shared deep predictive learning}
}
\]

The first allows an embodied agent to remember a new thing immediately.

The second allows every new thing to improve the machinery used to understand many things.

Temporal escrow sits between them as an epistemic firewall:

\[
\boxed{
\text{proposal}
\rightarrow
\text{committed prediction}
\rightarrow
\text{new evidence}
\rightarrow
\text{resonance/reset}
\rightarrow
\text{learning}
}
\]

If that rule can recurse through layers of learned models, then object identity may be only the first use case.

The larger hypothesis is that an embodied intelligence could build an open-ended hierarchy of persistent models while retaining the aggressive, distributed learning advantage of deep neural networks—and without allowing recurrence to manufacture its own evidence.

## References and conceptual precedents

- Carpenter, G. A. & Grossberg, S. **Adaptive Resonance Theory**. See the [Scholarpedia overview](https://www.scholarpedia.org/article/Adaptive_resonance_theory).
- McClelland, J. L., McNaughton, B. L., & O'Reilly, R. C. (1995). [Why there are complementary learning systems in the hippocampus and neocortex](https://pubmed.ncbi.nlm.nih.gov/7624455/).
- Snell, J., Swersky, K., & Zemel, R. S. (2017). [Prototypical Networks for Few-shot Learning](https://arxiv.org/abs/1703.05175).
- Active inference and epistemic action provide one family of approaches for choosing actions that reduce uncertainty; TERN uses that family of ideas only as a starting point for action selection.
- Standard treatments of loopy belief propagation illustrate the double-counting problem when evidence circulates around cycles; TERN's first prototype avoids solving general message ancestry by restricting new evidence credit to temporally escrowed observations.
