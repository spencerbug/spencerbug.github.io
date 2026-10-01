---
layout: post
title: "Temporal Escrow Resonance: Continual Identity on an Equivariant Predictive Substrate"
date: 2026-09-28 09:46:00 -0500
last_modified_at: 2026-10-01
permalink: /blog/temporal-escrow-resonance/
description: "A working embodied-intelligence architecture combining open-ended identity memory, Lie-equivariant action dynamics, migratable shared representations, ART-like resonance, active experiments, and temporal escrow against self-confirming evidence."
---

{% include ai-assisted-author-note.html %}

**Working research note · architecture under active review.** Temporal Escrow Resonance Network (TERN) is an exploratory architecture, not an experimentally validated model. It grew out of a narrower question about object identity: how can an embodied learner continuously create new identities, learn from them aggressively, and still prevent its own recurrent hypotheses from returning as counterfeit evidence?

The proposal has now sharpened into three coupled problems:

1. **Persistent identity:** create a new object memory immediately, without adding a new classifier output or retraining the whole network.
2. **Structured sensorimotor dynamics:** use one shared equivariant encoder so actions move a representation along lawful, compositional transformation trajectories rather than through an arbitrary next-state predictor.
3. **Controlled plasticity:** when gradient descent improves the encoder, migrate old memories and learned dynamics into the new representational coordinates instead of silently invalidating them.

The central proposal is:

> **Persistent identities should be fast nonparametric memories interpreted by a shared equivariant predictive substrate. Physical action should induce structured motion through that substrate. When the substrate itself changes, old knowledge should migrate through an explicit compatibility transform and the update should remain in escrow until both old identities and old dynamics still work. A hypothesis may influence what is predicted or tested next, but evidence used to create that hypothesis cannot also validate it.**

This separates three jobs:

1. **Fast memory** creates and updates individual object hypotheses with little or no gradient descent.
2. **Fast equivariant dynamics** map actions into predictable transformations of patch representations.
3. **Slow shared plasticity** updates the encoder, identity readout, group-action model, retrieval metric, vigilance machinery, grouping machinery, and later abstraction layers under anti-forgetting constraints.

TERN therefore tries to preserve several attractive properties at once:

- one-shot or few-shot creation of a previously unknown identity;
- broad gradient updates that improve general machinery across many identities;
- action-conditioned prediction that reuses geometric structure instead of relearning every transition independently;
- explicit migration of old memories when the learned representation changes;
- temporal evidence accounting that prevents recurrent hypotheses from validating themselves.

Two different transformation structures appear and should not be conflated.

The **physical transformation group** describes lawful action and motion, for example \\(SE(3)\\) for rigid 3-D rotation and translation. Its action on the learned representation predicts how features should move when the camera, robot, or object moves.

The **representation-migration group** describes a change of coordinates between encoder versions. A useful first approximation is an orthogonal transform in feature space. It need not be the same group as the physical motion model.

The first toy architecture still begins with fixed sensor patches, sparse approximate-nearest-neighbor retrieval, ART-like vigilance, active experiments, and an unknown number of persistent identities. The longer-term hypothesis is that the same proposal/challenge/resonance and controlled-migration rules can recurse into parts, objects, relations, scenes, affordances, and still higher abstractions.

## 1. The problem: open-ended identity without local-only learning

A conventional classifier usually ends in a fixed output vector:

$$
p(y\mid x)
=
[p(C_1),p(C_2),\ldots,p(C_K)].
$$

That assumes the identity vocabulary is known when the model is built.

An embodied learner has a different problem. It may encounter object \\(K+1\\) tomorrow, \\(K+2\\) next week, and millions more over its lifetime. Rebuilding and retraining a softmax head whenever a new identity appears is the wrong abstraction.

A more natural starting point is a shared encoder:

$$
z = E_\theta(x),
$$

with persistent identities represented separately in memory:

$$
M_1,M_2,\ldots,M_K.
$$

A new object can then be created by allocating a new memory artifact rather than a new output neuron.

But this creates a second problem.

If every persistent identity owns its own private predictor, matcher, or transition model, then experience with one object updates only that object. Learning becomes narrow. A new observation does not improve the machinery used by thousands of related and unrelated things.

That loses one of the major strengths of deep learning:

> **A single prediction error can update a large shared parameter set simultaneously.**

TERN therefore deliberately makes persistent identities mostly **memory**, while keeping most trainable machinery **shared**.

## 2. Architecture at a glance

TERN now treats **identity and action dynamics as two readouts of the same shared representation**.

~~~mermaid
flowchart TD
    X["fixed sensor patches"] --> E["shared equivariant encoder Eθ"]
    E --> Z["equivariant patch latents zᵢ"]

    A["motor / camera / object action aₜ"] --> XI["action → Lie algebra ξₜ"]
    XI --> G["exp(ξₜ Δt) → group element gₜ"]
    G --> D["local group action ρᵢ(gₜ)"]

    Z --> I["invariant identity / retrieval readout Iφ"]
    I --> ANN["ANN top-K candidate memories + UNKNOWN"]
    ANN --> V["shared vigilance / resonance matcher"]
    V --> H["provisional identity hypotheses"]

    Z --> D
    H --> D
    D --> P["predicted next patch latents"]
    P --> Q["commit prediction to temporal escrow"]
    Q --> ACT["act / passage of time"]
    ACT --> O["new sensory evidence"]
    O --> EN["encode new evidence"]
    EN --> S["score prediction + identity"]
    S --> RR{"resonate or reset?"}
    RR -->|resonate| M["update / promote persistent memory"]
    RR -->|reset| ANN

    S --> U["candidate shared SGD update"]
    U --> MIG["fit / enforce migration transform Q"]
    MIG --> REVIEW{"old identities + old dynamics still valid?"}
    REVIEW -->|yes| COMMIT["commit encoder + migrate memories/dynamics"]
    REVIEW -->|no| REJECT["reject / revise candidate update"]
    COMMIT --> E
    M --> ANN
~~~

For patch \\(\,i\,\\) at time \\(\,t\,\\), the shared encoder produces a structured latent:

$$
z_{i,t}=E_\theta(x_{i,t-L:t}).
$$

An identity/retrieval readout extracts information intended to remain stable across lawful transformations:

$$
k_{i,t}=I_\phi(z_{i,t}).
$$

The full latent is not forced to be invariant. Instead, action should move it predictably. A motor command and context are mapped into a Lie-algebra element:

$$
\xi_t=f_\psi(a_t,c_t)\in\mathfrak g,
$$

then into a finite transformation:

$$
g_t=\exp(\xi_t\Delta t).
$$

A patch-specific representation of that group predicts the next local latent:

$$
\hat z_{i,t+1}
=
\rho_i(g_t)z_{i,t}
+
r_\omega(z_{i,t},a_t,c_t).
$$

The first term is the structured equivariant transition. The residual \\(\,r_\omega\,\\) is reserved for effects that are not well described by the chosen group: occlusion, deformation, contact changes, illumination changes, independent agents, or other non-rigid events.

A persistent object memory can contain both identity anchors and transformation history:

$$
M_j=
\{
\text{latent prototypes},
\text{identity keys},
\text{orbit / transition anchors},
\text{episodic traces},
\text{model version},
\text{uncertainty},
\text{relations}
\}.
$$

The object still does not get its own deep neural network. It supplies memory that shared functions interpret.

A newly created identity can therefore immediately use action dynamics learned across many earlier objects.

The architecture also adds an explicit rule for encoder evolution. If a candidate encoder \\(\,E_{\theta'}\,\\) changes the feature coordinates, TERN tries to explain old-state movement using a shared migration transform \\(\,Q\,\\):

$$
E_{\theta'}(x)
\approx
Q E_\theta(x)+r_{\text{new}}(x).
$$

For an orthogonal first implementation:

$$
Q=\exp(A),
\qquad
A^\top=-A.
$$

The \\(\,Q\,\\) term carries forward old geometry; \\(\,r_{\text{new}}\,\\) provides plastic capacity for distinctions the previous representation could not express.

This is the new division of labor:

~~~text
same shared latent
      │
      ├── invariant readout → "what persistent thing is this?"
      │
      ├── equivariant dynamics → "how should this representation move?"
      │
      └── controlled migration → "how may this space itself change?"
~~~

## 3. Fixed sensor patches and sparse identity retrieval

The first toy version assumes a visual field divided into fixed patches.

Each patch observes a short local history:

$$
x_{i,t-L:t}.
$$

The shared encoder produces a compact **equivariant** population code:

$$
z_{i,t}=E_\theta(x_{i,t-L:t}).
$$

The key distinction is that \\(\,z_{i,t}\,\\) is allowed to change predictably under motion. TERN should not throw away pose and transformation information merely to make re-identification easier.

A separate invariant or approximately invariant readout produces the retrieval key:

$$
k_{i,t}=I_\phi(z_{i,t}).
$$

For a lawful transformation \\(\,g\,\\), the desired relationship is:

$$
E_\theta(g\cdot x)
\approx
\rho(g)E_\theta(x),
$$

while identity remains stable:

$$
I_\phi(\rho(g)z)
\approx
I_\phi(z).
$$

Rather than score every persistent identity, each patch queries an approximate-nearest-neighbor index:

$$
C_i
=
\operatorname{ANN}_K(k_{i,t}).
$$

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

A stored object may contain many local prototypes, transformation-orbit anchors, or transition anchors rather than one global vector:

$$
M_j=
\{p_{j1},p_{j2},\ldots,p_{jn_j}\}.
$$

The ANN index can therefore retrieve local evidence and map each hit back to a persistent parent identity.

This changes the re-identification question. Instead of asking only whether a new vector is near one stored point, TERN can eventually ask whether an observation is compatible with a **reachable transformation orbit** of a known object:

$$
\mathcal O_j
=
\{
\rho(g)p
\mid
p\in M_j,\;
g\in G
\}.
$$

In other words:

> **Can this observation be explained as another lawful view or state of something I already know?**

This resembles metric-learning approaches such as Prototypical Networks, where a neural network learns a representational space and classification can be performed by comparing an example with stored prototypes rather than by adding a fixed softmax output for every possible future class. TERN adds the stronger requirement that the representation should also retain enough transformation structure to predict how those prototypes move under action.

## 4. ART-like vigilance is a challenge, not a verdict

Nearest neighbor is only candidate generation.

A retrieved candidate must still survive a vigilance test:

$$
v_{ij}
=
V_\theta(z_i,M_j).
$$

If

$$
v_{ij}<\rho,
$$

candidate \\(M_j\\) is reset for that patch and another candidate may be tested.

If no stored identity passes vigilance, the legal outcome is:

$$
\text{UNKNOWN}.
$$

This is inspired by Adaptive Resonance Theory (ART), where bottom-up evidence activates a candidate category, the category supplies a top-down expectation, and mismatch can reset the candidate and continue search. High vigilance produces finer categories; lower vigilance permits broader categories.

TERN generalizes the interpretation:

> **A candidate identity is allowed to propose an expectation. The expectation itself is not evidence. It must survive comparison with evidence outside the proposal.**

That distinction becomes crucial once recurrence is introduced.

## 5. Temporal escrow: predict first, validate later

The central architectural rule is simple:

$$
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
$$

Suppose evidence through time \\(t\\) proposes object hypothesis \\(H\\).

That evidence is sufficient to create the hypothesis:

$$
E_{\le t}\rightarrow H.
$$

It is **not** allowed to confirm the hypothesis.

Before the next observation exists, the system commits a prediction:

$$
\hat E_{t+1}
=
P_\theta(H,E_{\le t},a_t).
$$

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

$$
E_{t+1}.
$$

Now the hypothesis can earn evidence:

$$
\lambda(H)
=
\log
\frac
{p(E_{t+1}\mid H,E_{\le t},a_t)}
{p(E_{t+1}\mid U,E_{\le t},a_t)}.
$$

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

$$
H_1,\quad H_2.
$$

They predict similar present evidence, but different consequences under action \\(a\\):

$$
p(E_{t+1}\mid H_1,a)
\neq
p(E_{t+1}\mid H_2,a).
$$

The system can choose an action maximizing disagreement:

$$
a^*
=
\arg\max_a
D\left(
p(E_{t+1}\mid H_1,a),
p(E_{t+1}\mid H_2,a)
\right),
$$

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

## 8. Fast identity memory and shared equivariant learning

Temporal escrow would be too slow if every object learned only through its own private weights.

TERN instead has three complementary update paths.

### Fast path: persistent identity memory

A newly observed identity can be allocated immediately:

$$
M_{K+1}
\leftarrow
\{
\text{current prototypes, keys, orbit anchors, and traces}
\}.
$$

No global retraining is necessary just to create the identity.

A provisional identity may be promoted, revised, merged, or deleted as future escrowed evidence accumulates.

### Fast path: action-conditioned group dynamics

The same encoder used for identity should also support structured prediction.

A physical action is mapped into a local generator:

$$
a_t
\rightarrow
\xi_t
\in
\mathfrak g.
$$

The exponential map produces a finite group element:

$$
g_t
=
\exp(\xi_t\Delta t).
$$

The representation then moves under a learned group representation:

$$
\hat z_{t+1}
=
\rho(g_t)z_t.
$$

For rigid 3-D motion, a natural candidate is the special Euclidean group \\(\,SE(3)\,\\) with Lie algebra \\(\,\mathfrak{se}(3)\,\\). A twist combines infinitesimal translation and rotation. Unit dual quaternions are one compact way to represent the corresponding finite rigid transforms.

The important architectural claim is not that every sensory transition is rigid-body motion. It is that the system should explain as much transition structure as possible through reusable, compositional transformations before spending unconstrained model capacity on residual dynamics.

A more realistic predictor is therefore:

$$
\hat z_{t+1}
=
\rho(g_t)z_t
+
r_\omega(z_t,a_t,c_t).
$$

### Slow path: shared gradient learning

Once new evidence has been scored, the same transition can update many shared functions simultaneously.

A toy loss can now include identity, prediction, equivariance, migration, and grouping terms:

$$
\mathcal L_t
=
\lambda_p\mathcal L_{\text{prediction}}
+
\lambda_e\mathcal L_{\text{equivariance}}
+
\lambda_r\mathcal L_{\text{retrieval}}
+
\lambda_v\mathcal L_{\text{vigilance}}
+
\lambda_c\mathcal L_{\text{contrastive}}
+
\lambda_g\mathcal L_{\text{grouping}}
+
\lambda_m\mathcal L_{\text{migration}}
+
\lambda_h\mathcal L_{\text{hierarchy}}.
$$

The equivariance loss asks the new observation to agree with the action-conditioned transformation:

$$
\mathcal L_{\text{equivariance}}
=
\left\|
E_\theta(x_{t+1})
-
\rho(\exp(\xi_t\Delta t))E_\theta(x_t)
\right\|^2.
$$

All of these losses may backpropagate through overlapping shared parameters.

So learning object \\(\,M_{1001}\,\\) does not mean:

> update the circuitry belonging to object 1001.

It means:

> use this encounter as another constraint on the general machinery for encoding, retrieving, predicting, transforming, distinguishing, grouping, and composing things.

This is also why the same encoder can serve both identity and group dynamics. The equivariant latent retains transformation information; the invariant readout extracts persistent identity from that same latent.

~~~text
observation
    ↓
shared equivariant encoder
    ↓
structured latent
   /          \
  /            \
identity       action dynamics
readout        ρ(exp(ξ))
  |              |
memory        predicted future latent
~~~

The two objectives constrain each other. Features that remain stable across correctly predicted transformations are candidates for identity-bearing information. Features that change should change in a lawful way.

That is the mechanism by which one embodied experience can simultaneously teach **what persists** and **how appearance changes**.

## 9. Hard negatives turn local novelty into neighborhood learning

ANN retrieval provides more than computational efficiency.

It also tells the learner which existing memories were most confusing.

Suppose a new object retrieves:

$$
M_{17},M_{51},M_{983}.
$$

If future evidence confirms that none of them was correct, those are useful hard negatives.

A contrastive loss can use the confirmed identity \\(M_+\\) against its confusing neighbors:

$$
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
$$

This gives each new identity a **neighborhood learning radius**.

The update does not touch only the new artifact. It teaches the shared representation why this experience should separate from the things it most resembled.

## 10. Replay and migration provide a global learning radius

Shared weights create a familiar problem: catastrophic interference.

A gradient step trained only on the newest object can make the global representation worse for older objects. Replay remains useful because it exposes candidate updates to old experiences and hard negatives.

A simple batch might contain:

~~~text
25% current experience
25% ANN-confusable prior experiences
25% recent experiences
25% broadly sampled older experiences
~~~

The exact sampling policy is an experiment.

But replay is no longer the only anti-forgetting mechanism.

TERN also asks whether the change between encoder versions can be explained by an explicit migration transform. A candidate update should preserve old knowledge either because replay keeps it stable or because old embeddings can be transported into the new coordinates with low distortion.

That gives four learning radii:

~~~text
NEW EXPERIENCE
      │
      ├── fast/local
      │     update persistent memory artifact
      │
      ├── sensorimotor
      │     refine shared group dynamics / residual dynamics
      │
      ├── neighborhood
      │     contrast against ANN-confusable memories
      │
      └── global
            backprop current + replay losses
            fit/test representation migration
            commit only if old knowledge survives
~~~

This resembles the computational motivation behind Complementary Learning Systems: rapid storage of individual experiences alongside slower distributed learning that extracts shared structure through interleaved experience.

TERN does not require a literal mapping from these artificial components onto hippocampus and neocortex. The relevant idea is computational: **fast memory, lawful state transformation, and broad overlapping representation learning solve different problems.**

## 11. Encoder drift becomes explicit representation migration

If object memories store embeddings,

$$
z=E_\theta(x),
$$

while \\(\,E_\theta\,\\) continues to learn, old stored vectors eventually become stale.

The coordinate system itself moves.

Rather than treating this only as a maintenance problem, TERN makes **migration compatibility part of the learning objective**.

Let the frozen previous encoder be \\(\,E_0\,\\) and a candidate updated encoder be \\(\,E_1\,\\). TERN tries to decompose representational change into:

$$
E_1(x)
\approx
Q E_0(x)
+
r(x).
$$

Here:

- \\(\,Q\,\\) is a shared, invertible coordinate migration that carries old knowledge forward;
- \\(\,r(x)\,\\) is residual plasticity that can add distinctions the old representation could not express.

A simple first choice is an orthogonal migration:

$$
Q\in SO(d)
$$

parameterized through the Lie algebra:

$$
Q=\exp(A),
\qquad
A^\top=-A.
$$

Because an orthogonal map preserves inner products and Euclidean distances,

$$
\|Qz_i-Qz_j\|
=
\|z_i-z_j\|,
$$

the old identity geometry is preserved exactly inside the migrated subspace.

### Train SGD to prefer migratable updates

During an escrowed encoder update, keep \\(\,E_0\,\\) frozen and jointly train \\(\,E_1\,\\) and the migration transform.

A compatibility loss can be:

$$
\mathcal L_{\text{migration}}
=
\sum_{x\in\mathcal A}
\left\|
E_1(x)
-
Q E_0(x)
-
r(x)
\right\|^2,
$$

where \\(\,\mathcal A\,\\) is a set of historical anchors or replay examples.

The goal is not to force every update to be a pure rotation. That would preserve old distances so perfectly that it could not repair an inadequate representation.

A more useful stability/plasticity split is:

$$
E_1(x)
=
\begin{bmatrix}
Q E_0(x)\\
r(x)
\end{bmatrix},
$$

or an equivalent architecture in which protected/migratable capacity coexists with new plastic capacity.

The old representation can then move coherently while the residual learns genuinely new distinctions.

### Commit only after migration review

After the candidate update, TERN evaluates at least four things:

1. **old identity compatibility** — do historical objects still retrieve and resonate correctly?
2. **migration residual** — how much old-state movement cannot be explained by \\(\,Q\,\\)?
3. **old action dynamics** — do previously learned transformations still predict correctly?
4. **new utility** — did the update actually improve the failure that triggered plasticity?

Conceptually:

~~~text
candidate SGD update
        ↓
fit / refine Q
        ↓
migrate old anchors in escrow
        ↓
test identity + dynamics + new task
        ↓
   commit / reject
~~~

If the update is accepted, stored full-latent prototypes can migrate:

$$
m_j^{\text{new}}
=
Qm_j^{\text{old}},
$$

and invariant ANN keys can either be regenerated from the migrated prototypes or migrated through their own explicitly learned compatibility map.

This database migration can be eager or versioned/lazy. A memory can store the encoder version that created it, and the required migration transforms can be composed when that memory is touched.

### The learned dynamics must migrate too

Suppose the old representation obeys:

$$
z'
=
\rho_0(g)z.
$$

After the coordinate change

$$
z_{\text{new}}=Qz,
$$

the same physical transformation should be represented as:

$$
\rho_1(g)
=
Q\rho_0(g)Q^{-1}.
$$

This is a change of basis, not new physics.

It gives TERN a strong anti-forgetting condition: an encoder update should preserve not only old object identities but also the **lawful transition structure** previously learned in the latent space.

### Physical motion and encoder migration are different groups

This distinction is important.

~~~text
physical symmetry
    SE(3), SO(3), learned local groups
            ↓
    action-conditioned latent motion

representation migration
    SO(d) or another feature-space group
            ↓
    encoder-version compatibility
~~~

The same Lie-group language is useful in both places, but they solve different problems.

The physical group says:

> how should a representation change because the world or robot moved?

The migration group says:

> how should an old representation be transported because the encoder changed?

TERN needs both.

## 12. Spatial grouping can exploit local transformation consistency

The architecture still needs to bind patch evidence into current instances.

The first version does not require pairwise cross-prediction among every patch. Each patch still produces sparse evidence for retrieved identities:

$$
L_j(x_i)
=
\log
\frac{p(k_i\mid M_j)}
     {p(k_i\mid U)}.
$$

Those scores form a spatial evidence field for each candidate.

But the equivariant architecture adds a second grouping cue: **patches belonging to the same rigid or approximately coherent thing should often be explainable by the same underlying physical transformation.**

A global camera or object twist can be written:

$$
\xi_{\text{global}}
\in
\mathfrak{se}(3).
$$

Its local effect on patch \\(\,i\,\\) can depend on depth, image position, orientation, object ownership, and other local context:

$$
\xi_i
=
J_i\xi_{\text{global}},
$$

followed by:

$$
\hat z_{i,t+1}
=
\rho_i(\exp(\xi_i\Delta t))z_{i,t}.
$$

The matrices or learned operators \\(\,J_i\,\\) need not literally be analytic camera Jacobians in the first prototype. The important constraint is that local patch transitions should be **coordinated consequences of a shared cause**, not unrelated transforms invented independently by every patch.

This suggests a useful grouping signal:

> **If several patches are best explained by one shared object-motion hypothesis, that transformation coherence is evidence that they belong to the same current thing.**

Conceptually:

~~~text
shared object / camera motion
          ↓
   local frame effects
    /      |       \
 patch 1 patch 2  patch 3
    \      |       /
     coherent transition
          ↓
     grouping evidence
~~~

A local morphological operation in log space can still encourage coherent regions without making it part of the identity-learning mechanism.

For example, a max-plus dilation can be written:

$$
(\delta_B L_j)(x)
=
\max_{u\in B}
[L_j(x-u)+b(u)],
$$

with erosion as the corresponding min-plus dual.

Opening, closing, connected components, transformation consistency, or a later learned grouping module can turn sparse patch evidence into candidate current instances.

This keeps five questions separate:

1. **retrieval:** what stored things might explain this patch?
2. **vigilance:** does the raw evidence actually match?
3. **equivariance:** does the patch change as the action model predicts?
4. **grouping:** which nearby patches share a coherent current cause?
5. **identity:** which persistent memory best survives future prediction?

The anti-forgetting migration should be more global than the physical patch dynamics. TERN should not begin by allowing an arbitrary independent encoder-migration transform for every patch; that would make it too easy to preserve patches individually while destroying cross-patch geometry. A shared migration \\(\,Q\,\\) plus small constrained local residuals is the safer starting point.

## 13. A toy learning episode

Imagine a robot encounters a blue stapler that it has never seen before.

### Step 1: encode

Fixed patches produce local equivariant representations:

$$
x_i
\rightarrow
E_\theta
\rightarrow
z_i.
$$

The identity readout produces retrieval keys:

$$
k_i=I_\phi(z_i).
$$

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

$$
M_{\text{new}}.
$$

The current observations may initialize its prototypes, identity keys, and orbit anchors, but they are marked as **proposal evidence**.

They cannot validate the identity they just created.

### Step 4: commit an action-conditioned prediction

The robot intends to move the camera right.

The action model maps that command into a Lie-algebra element:

$$
a_t
\rightarrow
\xi_t.
$$

The finite transformation is:

$$
g_t
=
\exp(\xi_t\Delta t).
$$

Each visible patch receives a locally conditioned consequence of that shared motion:

$$
\hat z_{i,t+1}
=
\rho_i(g_t)z_{i,t}
+
r_\omega(z_{i,t},a_t,c_t).
$$

The provisional blue-stapler identity and known alternatives can therefore make different predictions about **which patches should remain the same thing and how their representations should move**.

These predictions are frozen in temporal escrow before the next image exists.

### Step 5: act

The camera moves right.

### Step 6: acquire independent evidence

A new image arrives and is encoded:

$$
z_{i,t+1}
=
E_\theta(x_{i,t+1}).
$$

The predictions were fixed before these pixels existed.

### Step 7: resonance or reset

If the provisional identity predicts the new patch transitions better than the alternatives, it gains evidence.

If it fails badly, it can be revised, merged with a known identity, or reset.

Transformation coherence across several patches can also strengthen the grouping hypothesis that those patches belong to one rigid object.

### Step 8: learn widely

Only after scoring, gradient descent may improve:

- the shared equivariant encoder;
- the invariant identity/retrieval readout;
- the action-to-Lie-algebra map;
- the latent group representation;
- residual dynamics for non-group effects;
- vigilance calibration;
- hard-negative separation from the red stapler, tape dispenser, and hole punch;
- grouping behavior;
- eventually higher abstraction machinery.

Replay interleaves older experiences.

### Step 9: escrow the encoder update itself

Suppose this episode exposed a genuine weakness in the representation: blue and red staplers were too difficult to distinguish.

TERN does not immediately replace the deployed encoder.

It trains a candidate \\(\,E_1\,\\), fits a migration transform \\(\,Q\,\\), and asks whether old representations satisfy approximately:

$$
E_1(x_{\text{old}})
\approx
Q E_0(x_{\text{old}}).
$$

It also verifies that old physical transformations remain valid under the changed basis:

$$
\rho_1(g)
=
Q\rho_0(g)Q^{-1}.
$$

Only after old identities, old dynamics, and the new discrimination problem all pass review is the new encoder committed.

Stored prototypes are migrated or lazily version-transformed, ANN keys are refreshed as needed, and the new residual capacity becomes part of the shared substrate.

The new identity itself may have been created in one encounter, while its experience contributes to general learning across the whole system without silently erasing earlier things.

## 14. Deep abstraction uses the same protocol recursively

TERN is intended to be recursive.

At the lowest level, nodes represent local sensory states.

Higher levels may represent:

$$
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
$$

The architectural rule does not have to change.

A higher-level model \\(H^{(\ell+1)}\\) can be proposed from lower-level states:

$$
H^{(\ell+1)}
=
G_{\theta_\ell}
(z_1^{(\ell)},\ldots,z_n^{(\ell)}).
$$

But those same child states cannot be counted again as independent validation.

The higher model must earn support by predicting something else:

$$
\hat z_{t+1}^{(\ell)}
=
P_{\theta_\ell}
(H^{(\ell+1)},z_t^{(\ell)},a_t).
$$

If the prediction survives new evidence, resonance strengthens the abstraction.

This gives a possible operational criterion for creating abstractions:

> **A higher-level model earns persistence when it compresses existing structure and predicts held-out or future consequences that its constituent memories do not explain as well individually.**

A reusable "door-opening" model, for example, might combine a handle, hinge, panel, grasp action, and predictable transition. It becomes a persistent higher-level model only if the composition consistently earns new predictive evidence.

## 15. What TERN is not claiming

This architecture borrows ideas from several established traditions but should not be confused with any one of them.

- **Adaptive Resonance Theory** motivates vigilance, reset, resonance, and dynamic category creation.
- **Metric and prototype learning** motivate separating a shared representation from an open-ended collection of identities.
- **Group-equivariant representation learning** motivates representations whose changes under transformations are structured rather than arbitrary.
- **Lie groups and Lie algebras in robotics** motivate representing continuous rigid motion through generators, exponential maps, twists, and compositional transformations such as \\(\,SE(3)\,\\).
- **Backward-compatible representation learning** motivates explicitly preserving interoperability between old stored embeddings and newer encoders.
- **Belief propagation** motivates careful treatment of recurrent messages and the danger of double-counting in loops.
- **Complementary Learning Systems** motivates separating rapid item memory from slower distributed structure learning.
- **Active inference and information-seeking control** motivate choosing actions that discriminate among competing hypotheses.

TERN's specific combination is a working research proposal:

> **temporal evidence escrow + open-ended identity memory + a shared equivariant sensorimotor substrate + explicit representation migration under continual learning.**

The architecture does **not** assume that every sensory change is a Lie-group action. Rigid motion is the cleanest case. Occlusion, contact, topology changes, deformation, lighting, articulation, and independent agents may require local groups, piecewise models, or residual dynamics.

It also does not assume that the physical motion group and the encoder-migration group are the same object. They are deliberately separated.

The proposal should be judged experimentally.

## 16. Minimal prototype

A useful first experiment should be smaller than the full architecture.

### Environment

Use a simulated camera observing a small world containing reusable rigid objects.

Requirements:

- objects can leave and later return;
- new identities can be introduced continuously;
- multiple similar objects can exist;
- the agent can translate and rotate its camera;
- selected objects can be translated or rotated independently;
- ground-truth identity and pose are available only for evaluation, not identity training.

### Model

Use:

1. fixed image patches;
2. one shared equivariant predictive encoder;
3. an invariant identity/retrieval readout;
4. ANN index over persistent local prototypes;
5. ART-like vigilance threshold;
6. **UNKNOWN** as a legal candidate;
7. provisional object memories with latent prototypes and orbit anchors;
8. action-to-Lie-algebra mapping;
9. a simple \\(\,SE(2)\,\\) or \\(\,SE(3)\,\\) latent group-action model;
10. optional residual dynamics for effects the group model cannot explain;
11. one-step temporal escrow predictions;
12. replay buffer;
13. simple spatial grouping plus transformation-consistency grouping;
14. candidate encoder updates trained with migration compatibility;
15. versioned memory migration after accepted encoder changes.

The first prototype should prefer a low-dimensional known physical group over trying to discover every symmetry from scratch. Once the control loop is working, the harder experiment is to learn some generators from sensorimotor trajectories.

### Encoder-update protocol

When a sustained prediction or re-identification failure triggers plasticity:

1. freeze the deployed encoder \\(\,E_0\,\\);
2. clone a candidate encoder \\(\,E_1\,\\);
3. train on current + replay data;
4. jointly fit a migration transform \\(\,Q\,\\);
5. measure migration residual on old anchors;
6. test old identity retrieval after migration;
7. test old action transitions after conjugating their latent operators;
8. test the new failure case;
9. commit only if the candidate improves the target problem without unacceptable historical degradation.

### Baselines

Compare against:

- fixed softmax classification with periodic retraining;
- nearest-prototype memory without vigilance;
- prototype memory + vigilance without temporal escrow;
- temporal escrow with a generic unconstrained next-latent predictor;
- equivariant action prediction without encoder migration constraints;
- migration-compatible learning without replay;
- replay without migration-compatible learning;
- full re-encoding of the historical gallery after every encoder update;
- versioned \\(\,Q\,)-based migration of stored representations.

### Main measurements

Measure:

- new-identity creation precision and recall;
- false merges of distinct objects;
- false splits of one object into multiple identities;
- re-identification after absence;
- cross-view and cross-pose re-identification;
- action-conditioned latent prediction accuracy;
- group composition error;
- inverse-consistency error where applicable;
- residual-dynamics magnitude;
- transformation-coherence quality as a grouping cue;
- catastrophic forgetting on old objects;
- cross-version retrieval compatibility;
- migration residual after encoder updates;
- historical identity geometry distortion;
- historical dynamics error before and after migration;
- sample efficiency for new objects;
- ANN retrieval quality as the identity library grows;
- calibration of resonance confidence;
- performance when visually similar objects require action to disambiguate.

Three ablations are especially important.

First:

> **Does Lie-structured action prediction generalize to unseen action compositions better than an unconstrained next-state predictor?**

Second:

> **Does migration-compatible encoder training preserve historical identities and dynamics better than replay alone without requiring a complete gallery backfill?**

Third:

> **Does temporal escrow reduce self-confirming identity errors when identity, action dynamics, and encoder plasticity are all recurrently coupled?**

## 17. Failure modes to expect

TERN has obvious ways to fail.

### Provisional identity explosion

If vigilance is too strict, normal viewpoint variation may create a new object every few frames.

The system then repeats an old failure mode: representational novelty becomes ontological novelty.

Equivariant orbit modeling should reduce this failure if viewpoint changes are explainable as lawful transformations of one identity.

### Identity collapse

If vigilance is too permissive, distinct similar objects merge.

### Wrong group assumption

A rigid transformation model can be confidently wrong when the actual event involves deformation, articulation, occlusion, contact, illumination, or independent motion.

The residual model must be allowed to explain non-group effects without becoming an unrestricted escape hatch.

### Residual takeover

If \\(\,r_\omega\,\\) is too expressive or weakly regularized, the system may ignore the structured group path and learn every transition in the residual.

The prototype should track the fraction of prediction improvement attributable to the equivariant path versus the residual.

### Patchwise gauge drift

If every patch is allowed an arbitrary independent migration transform, local memories may remain individually compatible while cross-patch geometry becomes incoherent.

The first implementation should therefore prefer a shared migration transform with only limited local correction.

### Overconstrained migration

If the encoder update is required to be almost exactly a global orthogonal transform, the system cannot repair genuinely poor historical geometry.

TERN needs a protected migratable subspace plus controlled new capacity, not perfect rigidity.

### Migration-chain accumulation

Versioned lazy migrations can accumulate numerical or modeling error after many encoder revisions.

Periodic consolidation may still need to re-encode high-value sensory anchors or collapse a chain of transforms into a fresh canonical version.

### Correlated "new" evidence

The next frame is technically new but may contain almost the same information as the current frame.

Temporal separation is a causal provenance boundary, not a guarantee of statistical independence.

Longer temporal holds, withheld patches, new viewpoints, touch, or active experiments may provide stronger validation.

### Shared-model contamination

Temporal escrow protects inference ordering, but aggressive SGD can still overfit recent experience or distort the representation.

Replay, migration review, and consolidation remain necessary.

### Memory-key drift

Even if full latent prototypes migrate cleanly, a separately trained invariant retrieval head can drift.

ANN keys must therefore be regenerated, migrated through their own compatibility map, or produced by a sufficiently stable readout.

### Confirmation through action policy

If the current hypothesis determines actions, it can choose observations that are easy for itself to predict.

An information-seeking policy should therefore prefer actions that discriminate competing hypotheses rather than merely maximize expected fit to the leading one.

### Dynamics-preserving but identity-damaging updates

A coordinate migration may preserve the algebra of old transformations while still damaging the invariant identity readout.

TERN must test both. Neither is sufficient alone.

### Deep abstraction explosion

If every coincident group of lower-level models can create a higher-level memory, the hierarchy can grow combinatorially.

Higher abstractions will need stronger persistence criteria than one successful prediction.

## 18. Research principle

TERN can now be compressed into three coupled rules.

### Rule 1: evidence cannot validate itself

> **A model may use prior evidence to decide what to predict next. It may not count the success of a prediction unless the validating evidence was unavailable when that prediction was committed.**

That is temporal escrow:

$$
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
$$

### Rule 2: actions should move representations lawfully

A shared latent should preserve the distinction between identity and transformation.

The full representation is equivariant:

$$
E(g\cdot x)
\approx
\rho(g)E(x),
$$

while identity is read out invariantly:

$$
I(\rho(g)z)
\approx
I(z).
$$

Motor action should map into generators of predictable latent motion:

$$
a
\rightarrow
\xi
\rightarrow
\exp(\xi)
\rightarrow
\rho(\exp(\xi))z.
$$

The system therefore learns not only **what state it is in**, but also the lawful directions in which that state can move.

### Rule 3: plasticity must carry old knowledge forward

When SGD improves the shared substrate, old memories should not simply become stale.

A candidate encoder revision should try to decompose its change into migratable old structure plus new capacity:

$$
E_1(x)
\approx
Q E_0(x)
+
r(x).
$$

The update remains in escrow until historical identities and historical action transitions survive the change.

If committed, both memory and dynamics move with the coordinate system:

$$
m^{\text{new}}
=
Qm^{\text{old}},
$$

$$
\rho_{\text{new}}(g)
=
Q\rho_{\text{old}}(g)Q^{-1}.
$$

Around these rules, three complementary functions emerge:

$$
\boxed{
\text{fast open-ended identity memory}
+
\text{equivariant sensorimotor dynamics}
+
\text{controlled shared plasticity}
}
$$

The first lets an embodied agent remember a new thing immediately.

The second lets actions predict how that same thing should appear as the robot and world move.

The third lets the common representation improve without silently invalidating the things and transformations already learned.

This also suggests a different interpretation of re-identification. A persistent thing need not be represented only as one fixed point. It can be represented by an anchor together with its reachable orbit under learned transformations:

$$
\mathcal O_j
=
\{
\rho(g)z_j
\mid
g\in G
\}.
$$

Re-identification can then ask whether new evidence belongs to a lawful trajectory of a known thing rather than relying only on static nearest-neighbor similarity.

If these rules can recurse through layers of learned models, object identity may be only the first use case.

The larger hypothesis is that an embodied intelligence could build an open-ended hierarchy of persistent models whose internal state is defined partly by **what it is** and partly by **how it can lawfully transform**, while retaining the aggressive distributed learning advantage of deep neural networks and without allowing recurrence or plasticity to erase its own history.

## References and conceptual precedents

- Carpenter, G. A. & Grossberg, S. **Adaptive Resonance Theory**. See the [Scholarpedia overview](https://www.scholarpedia.org/article/Adaptive_resonance_theory).
- McClelland, J. L., McNaughton, B. L., & O'Reilly, R. C. (1995). [Why there are complementary learning systems in the hippocampus and neocortex](https://pubmed.ncbi.nlm.nih.gov/7624455/).
- Snell, J., Swersky, K., & Zemel, R. S. (2017). [Prototypical Networks for Few-shot Learning](https://arxiv.org/abs/1703.05175).
- Cohen, T. & Welling, M. (2016). [Group Equivariant Convolutional Networks](https://arxiv.org/abs/1602.07576).
- Bronstein, M. M., Bruna, J., Cohen, T., & Veličković, P. (2021). [Geometric Deep Learning: Grids, Groups, Graphs, Geodesics, and Gauges](https://arxiv.org/abs/2104.13478).
- Shen, Y. et al. (2020). [Towards Backward-Compatible Representation Learning](https://arxiv.org/abs/2003.11942).
- Backward-compatible and orthogonal feature-alignment methods motivate the idea that an encoder revision can preserve an older feature geometry through an explicit transformation while allocating additional capacity for new information.
- Lie-group state estimation and robotics provide the standard mathematical machinery for \\(\,SO(3)\,\\), \\(\,SE(3)\,\\), twists, exponential maps, adjoint transforms, and compositional rigid-body motion.
- Unit dual quaternions provide a compact representation of rigid-body rotation and translation and are a possible implementation choice for the \\(\,SE(3)\,\\) action path; they are not required by TERN.
- Active inference and epistemic action provide one family of approaches for choosing actions that reduce uncertainty; TERN uses that family of ideas only as a starting point for action selection.
- Standard treatments of loopy belief propagation illustrate the double-counting problem when evidence circulates around cycles; TERN's first prototype avoids solving general message ancestry by restricting new evidence credit to temporally escrowed observations.
