---
layout: post
title: "Self-Organizing Attractor Memory: Learning a World You Can Navigate"
date: 2026-10-28 19:10:00 -0500
permalink: /blog/self-organizing-attractor-memory/
description: "Why an embodied intelligence may need memory that organizes itself into navigable places, reusable relationships, and compositional structures—not just stored patterns."
---

{% include ai-assisted-author-note.html %}

**Working research hypothesis · conceptual introduction.** This is a proposal for an architecture, not a report of a working system. I'm deliberately focusing on the motivation and theoretical inspirations here. A later post will examine recurrent dynamics, learning rules, memory writing, and experiments in more detail.

When I think about the kind of intelligence I want a robot to develop, I keep coming back to a deceptively simple question:

**What would it mean for a machine to remember something in a way that it can explore?**

Recognizing a coffee mug is useful. Recalling what it looks like is useful. But if I imagine a familiar mug, I can also shift my attention from its rim to its handle, picture it from another angle, or consider how I would grasp it. The memory feels less like a photograph and more like a structure that I can move through.

The exact neural mechanisms behind such imagination are still under investigation. But the experience suggests an architectural possibility: perhaps useful memory should be **navigable**, not merely retrievable.

That is the motivation for *Self-Organizing Attractor Memory* (SOAM).

## Memory is more than recollection

Most machine-learning discussions of memory begin with storage and retrieval. Given an input, find a matching representation. Given a cue, recover something previously learned.

For embodied intelligence, that seems incomplete.

A robot encounters the world incrementally. Its camera sees one view at a time. A hand touches one part of an object at a time. Every movement changes which evidence is available, and the robot may get only a handful of opportunities to interact with something unfamiliar.

A useful memory should therefore help answer more than "Have I seen this before?"

It should also support questions such as:

- Where am I within the thing I recognize?
- What should I expect to perceive if I move?
- Which parts of this experience have I encountered elsewhere?
- How is this object connected to other objects, places, and actions?
- When should I revise the organization of what I thought I knew?

These aren't merely retrieval questions. They are questions about **structure, prediction, and control**.

My motivation is to investigate whether a single kind of adaptive neural substrate could gradually build that structure for itself.

## Why attractors are interesting

In an attractor network, neurons interact recurrently: their activity feeds back into the same network. Under the right conditions, the network can settle into stable or persistent patterns of activity.

A familiar analogy is a landscape of valleys. Start a ball at different nearby positions, and it may roll into the same valley. In an attractor memory, different incomplete or noisy cues can lead to the same learned activity pattern.

John Hopfield's classic work showed how recurrent neural networks can perform this kind of *content-addressable memory*: a partial cue can recover a larger stored pattern.

That is an appealing foundation for an embodied learner. A robot should not need an exact match to recognize something it has seen before.

But pattern completion alone is not enough.

If an attractor can recover the memory of a mug, what lets the robot navigate from its rim to its handle? How does it know which changes in activity correspond to turning the mug, shifting gaze, or entering the representation of one of its components?

A collection of retrievable patterns is not yet an organized world model.

**The research question is whether recurrent memory can learn not only stable patterns, but also the relationships and movements between them.**

## The inspiration from cognitive maps

Neuroscience offers a remarkable precedent for memories that are organized around navigation.

Place cells in the hippocampus respond to locations in an environment. Grid cells in the entorhinal cortex exhibit repeating spatial firing patterns associated with position. These discoveries helped motivate the idea that the brain builds internal representations useful for moving through space.

Continuous-attractor models offer a possible computational explanation for some of these phenomena. A population of neurons can maintain an activity pattern whose position shifts as movement signals arrive.

What I find most interesting is the possibility of extending this beyond physical navigation.

Imagine inspecting a mug. As your eyes move from one part to another, a location-like neural representation might track where the current observation belongs within an object-centered frame. Recognized features would help correct that location, and the current location could help predict which feature should come next.

An imagined movement might use some of the same predictive machinery without executing the physical movement.

This is an inspiration, not a claim that we have established this exact mechanism for eye movements or imagination.

The **Thousand Brains** framework argues that reference frames and sensorimotor movement may play a broader role in object understanding. The **Tolman–Eichenbaum Machine** offers a computational example of how learned relational structure can transfer between environments with different sensory contents.

Both encourage me to ask whether navigation might be a general principle of memory organization rather than a special-purpose feature of spatial reasoning.

## An address is not the memory

An important design choice follows from that question.

Perhaps the currently active attractor should not have to contain the entire sensory memory. Instead, it could help specify **where to retrieve information from**.

I'm considering two complementary states:

**Context** answers: *Which object, environment, or reference frame am I currently in?* A context might be represented by a relatively discrete, persistent attractor pattern.

**Place** answers: *Where am I within that context?* Place might be represented by a continuously movable pattern of activity.

Together they provide something like an address. The remembered visual, tactile, or other sensory features could be reconstructed from learned associations with that address.

This does not require building a literal database outside the neural system. The associations can live in neural connections, while recurrent activity supplies the current retrieval state.

The separation is attractive for another reason: if someone moves a chair in a familiar room, I should be able to update what is at a location without rebuilding my entire understanding of the room's geometry.

But this remains a hypothesis. It is possible that the best architecture will mix addressing and content much more deeply.

## Memory also needs relationships and actions

Context and place are not sufficient on their own. Knowing where I am does not tell me what I can do next.

There are at least two additional responsibilities.

**Relational memory** would preserve how structures connect: a handle is part of a mug, a doorway connects two rooms, or one reference frame sits at a particular orientation within another. Relations may include both spatial transformations and more abstract connections.

**Action and affordance control** would translate between the robot's real or imagined movements and transformations of the internal memory state. It should also help expose which operations are available from the current state.

For example, moving the eyes toward a handle and moving a hand toward that same handle are different physical actions. Yet both might share an object-centered description of *moving toward the handle*. A learned interface could map between those descriptions.

This suggests a useful separation of responsibilities:

- **Context:** What structure am I in?
- **Place:** Where am I within it?
- **Relations:** How does it connect to other structures?
- **Action/affordance interface:** How can I navigate or change the active state?
- **Feature associations:** What should I perceive at the current context and place?

I don't yet know whether all of these should be attractor networks. The action interface, in particular, may work better as a learned operator or control system. The names describe functional roles, not a requirement for five physically separate networks.

An encoder would help infer context and place from observations. A decoder would predict sensory information from the active memory state. Together they would form a loop between perception and expectation.

## A memory that reorganizes itself

This is the part that gives the project its name.

A fixed map would be useful, but a lifelong learner cannot assume it already knows how to divide the world into objects, parts, or reference frames.

Consider a robot discovering several mugs. At first it may store each mug as a mostly independent structure. Later, repeated experience might reveal that their handles share a reusable organization.

A self-organizing memory should be able to recognize that opportunity and reorganize what it has learned. It might establish a reusable handle representation and preserve the particular location, orientation, and appearance of each instance.

The same principle could extend to rooms, tools, articulated parts, and learned behaviors.

This is where I hope **compositionality** will emerge: complex memories built by combining reusable components rather than independently storing every possible configuration.

Compositionality could improve effective storage capacity dramatically, but it does not make physical memory capacity unlimited. A finite network still has finite resources. Its real limit depends on interference, precision, retrieval reliability, and how efficiently experiences can share structure.

Reorganization is also dangerous. Changing one memory can disturb others. A mistaken merge could make distinct objects indistinguishable. A poorly chosen new association could destabilize old attractors.

So I imagine memory writing as a controlled process: propose a change, compare predictions with genuinely new observations, and consolidate the change only when it preserves useful earlier knowledge.

A high prediction error doesn't automatically mean the robot discovered a new object. It might have localized incorrectly, misunderstood an action, or encountered temporary noise. The organizer must consider those alternatives.

**Memory, in this view, isn't a passive archive. It is an evolving organization of hypotheses about the world.**

## Does memory have to be discrete or continuous?

This remains an open question in the design.

One possibility is a collection of discrete context attractors, each associated with a continuous place attractor. Another is a graph of learned states whose local connections support smooth movement. A third is a recurrent network whose dynamics naturally form several navigable regions connected by more abrupt transitions.

These may not be entirely different ideas.

A finite network of discrete neurons can support approximately continuous activity patterns. Conversely, a continuous space can be represented by a sufficiently structured collection of discrete samples. But an arbitrary graph does not become a meaningful geometric space merely by adding nodes.

The distinction between **the connectivity of the neurons** and **the structure represented by their collective activity** is crucial.

I want to keep this question open rather than decide the answer from the outset. The useful representation should be judged by what it can learn, predict, navigate, and reorganize—not just how elegantly its diagram is drawn.

## What would convince me this is working?

The first meaningful demonstration does not need a humanoid robot or a rich simulated world.

A small agent with a movable observation window could explore unfamiliar shapes. It would receive sensory observations and movement signals, then attempt to build memories it can revisit.

After exploration, remove the sensory input. Can the agent move through its learned memory using imagined actions and predict what it would see at each location?

Then introduce related shapes and shared components. Can the agent reuse what it has learned without duplicating every observation or corrupting old memories?

The strongest evidence would include:

- Accurate prediction after movements that were not explicitly memorized.
- Recognition and localization from short, ambiguous sequences.
- Learning a new object from limited experience without retraining a fixed vocabulary of identities.
- Reuse of learned parts and relations in unfamiliar combinations.
- Preservation of old memories as new experiences are written and structures reorganized.

A system that simply stores a predefined graph and follows its edges would not establish the central hypothesis. The interesting result would be **the emergence of a useful navigable organization from experience**.

## Why pursue this?

Modern AI systems are extraordinarily capable at extracting patterns from data, yet I remain interested in a different requirement: a machine that learns continuously from its own interaction with the world, builds persistent internal structures, and can reason by moving through them.

The motivation is not to claim that the brain has already revealed a complete blueprint. It hasn't. Nor is this proposal a replacement for learned sensory encoders, predictive models, or conventional control.

The hope is to connect those capabilities with a memory system that does more than answer a query.

A memory that can be entered, traversed, revised, and composed might provide a useful foundation for embodied intelligence.

For now, Self-Organizing Attractor Memory is a set of architectural hypotheses and research questions. The next step is to make them precise enough to test—and to find out which of the appealing intuitions survive contact with experiments.

**Next:** A follow-up post will examine the proposed recurrent populations, action-conditioned transitions, associative writing, self-organization rules, and the experiments needed to distinguish this idea from ordinary graph memory or existing world models.

---

### Selected inspirations

- John Hopfield (1982), [Neural networks and physical systems with emergent collective computational abilities](https://doi.org/10.1073/pnas.79.8.2554) — recurrent content-addressable memory.
- John O'Keefe and Jonathan Dostrovsky (1971), [The hippocampus as a spatial map](https://pubmed.ncbi.nlm.nih.gov/5124915/) — the original place-cell finding.
- Hafting and colleagues (2005), [Microstructure of a spatial map in the entorhinal cortex](https://doi.org/10.1038/nature03721) — grid cells and spatial representation.
- Hawkins and colleagues (2019), [A Framework for Intelligence and Cortical Function Based on Grid Cells in the Neocortex](https://pmc.ncbi.nlm.nih.gov/articles/PMC6336927/) — a reference-frame hypothesis for object understanding.
- Whittington and colleagues (2020), [The Tolman–Eichenbaum Machine](https://pmc.ncbi.nlm.nih.gov/articles/PMC7707106/) — shared relational structure across different sensory environments.

For earlier work on object representations and controlled plasticity, see my [MORPH research note](/blog/morph/). SOAM takes a different starting point: the organization and navigation of persistent recurrent memory.
