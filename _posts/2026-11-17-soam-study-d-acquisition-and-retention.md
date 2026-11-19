---
layout: post
title: "SOAM Study D: Learning Quickly Is Not the Same as Remembering"
date: 2026-11-17 00:00:00 -0600
permalink: /blog/soam-study-d-acquisition-and-retention/
description: "All three memory writers learned isolated objects. Only explicit key-value storage passed sequential retention. What this establishes, what the linear fast-weight candidate did not test, and why recurrent retrieval is the next question."
soam_studies: "D"
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/soam-study-d.css' | relative_url }}">
{% include soam-studies-nav.html %}

**November 19 follow-up:** The subsequently selected D-R1 and D-R2 studies are now complete. [Read their joint article]({{ '/blog/soam-retrieval-and-decoding/' | relative_url }}) or [technical report]({{ '/research/soam-retrieval-and-decoding/' | relative_url }}). The original Study D account below remains a record of its November 17 evidence and decision.

## A memory has to survive the next thing it learns

Suppose a system learns something about an unfamiliar object from a few observations. We clear its working state, show it an incomplete cue, and ask it to predict what the object will look like after an action. If it succeeds, something useful survived in persistent memory.

Now let it learn seven more objects with similar appearances but different internal relationships. Can it still recover the first one?

**Study D0–D2 separates those two questions.** Three writing mechanisms learned isolated objects. Only the explicit key-value store passed the combined acquisition and sequential-retention criteria. Online regression and the tested fast-weight rule lost accuracy on earlier objects as new associations accumulated.

<div class="d-cards" aria-label="Accuracy on earlier objects after an eight-object acquisition sequence">
  <div><strong>100%</strong><span>Key-value memory</span></div>
  <div><strong>87.1%</strong><span>Online regression</span></div>
  <div><strong>6.0%</strong><span>Tested fast weights</span></div>
</div>
<p class="d-caption">Mean accuracy on the first seven objects after learning eight, across ten independent fitted roots. “Accurate” means canonical normalized squared error at most 0.1. This is raw retrieval accuracy, not object-ID classification or the fraction of queries accepted by a confidence gate. No observed KV failures is not a universal guarantee.</p>

The [companion report]({{ '/research/soam-study-d/' | relative_url }}) details the methods, uncertainty intervals, resources and reproducibility checks.

## What the experiment gives the learner

Earlier SOAM studies investigated recurrent updates, sensory correction and competing explanations. Study D asks whether new object-specific information can persist after the system's transient state is erased.

Each synthetic object has an observed **appearance key** and an independently generated **relationship**. The key is a stable 16-value feature vector. The relationship produces eight sensory features that change as the object rotates. Similar-looking objects can have different relationships, so appearance alone does not reveal the answer.

A common motion model is fitted offline. It learns two feature-space matrices within a supplied, reversible rotation formula. This is substantial scaffolding: the action family, fixed sensory projection, stable appearance and measured reference angle make correspondence and motion unusually easy. The question is whether a newly observed association can be stored and recovered.

Acquisition supplies one, two, four or eight full snapshots. Each permits one write. A known reference angle lets the fitted motion model express the observed relationship in a common orientation before storage.

<ol class="d-pipeline" aria-label="Implemented acquisition and query sequence">
  <li><b>1. Observe and write</b><span>Full appearance, relationship features and measured angle supply a new association.</span></li>
  <li><b>2. Reset</b><span>Clear all transient activity and nonpersistent caches. Keep only declared persistent memory.</span></li>
  <li><b>3. Retrieve</b><span>Show eight of sixteen appearance coordinates, with noise. Hide every relationship coordinate.</span></li>
  <li><b>4. Predict</b><span>Use the recovered relationship with the common fitted motion model for eight actions, without future observations.</span></li>
</ol>

This is the implemented task sequence. The evaluator knows the hidden relationship; the learner receives only the permitted observations, masks and actions. Querying old objects never trains the memory.

## The four mechanisms actually tested

All models use the same fitted action model. Their difference is how they retain and recover an object-specific association.

| Model | Persistent memory | Retrieval |
| --- | --- | --- |
| **NOWRITE** | No new associations | Returns a zero relationship after reset; establishes the need to acquire information |
| **KV** | Separate rows of appearance keys, averaged relationship values and counts | Finds the closest stored key on visible coordinates and returns its value |
| **REG** | Accumulated statistics for an online linear regression | Solves a regularized regression using the visible cue coordinates |
| **FAST** | A matrix updated once per snapshot by a normalized delta rule | Applies that matrix once to a normalized partial cue |

For KV, repeated observations update the running average in the matching row. Learning another object uses another row. Retrieval is an explicit nearest-neighbor search, followed by the common recurrent motion model.

FAST stores associations in a shared linear map. Its update reduces the difference between the current output and the newly observed target using an outer-product correction. The important implementation detail is **one matrix application at retrieval**. It is algebraically the same computation as a direct linear associative read.

**This experiment did not compare a table against a Hopfield network settling into a memory.** FAST is the name of this particular fast-weight implementation. It does not establish a distinct attractor mechanism, and its failure does not reject recurrent associative memory generally.

## Acquisition succeeds; retention separates the writers

With eight snapshots of an isolated object, KV, REG and FAST all achieved 100% sampled accuracy after reset. Their one-snapshot errors were also small. The no-write model remained much worse.

<figure>
  <a href="{{ '/assets/research/soam-study-d/acquisition.png' | relative_url }}"><img src="{{ '/assets/research/soam-study-d/acquisition.png' | relative_url }}" alt="Post-reset prediction error falls sharply for KV, REG and FAST after observing a new object, while NOWRITE remains near one." loading="lazy"></a>
  <figcaption>Archived D1 results. Lower normalized prediction error is better; the vertical axis is logarithmic. Shading shows ordinary 95% intervals over independent roots, not the family-adjusted decision intervals. Select the image for full resolution.</figcaption>
</figure>

D2 then acquired eight similar objects sequentially. After every acquisition, the learner was reset and asked about all objects seen so far. The same motion model remained fixed.

<figure>
  <a href="{{ '/assets/research/soam-study-d/old-object-accuracy.png' | relative_url }}"><img src="{{ '/assets/research/soam-study-d/old-object-accuracy.png' | relative_url }}" alt="Earlier-object accuracy after learning eight objects: KV 100 percent, REG 87.1 percent and FAST 6.0 percent. Dots show ten independent roots." loading="lazy"></a>
  <figcaption>Final D2 accuracy on the first seven objects. Dots are independent fitted roots; intervals are the frozen family-adjusted bootstrap intervals. This figure renders archived results and runs no new experiment.</figcaption>
</figure>

The retention criterion also measured how much earlier-object prediction error increased. The allowed increase was **0.02**. KV had zero measured change. REG increased by **0.0511**, with an adjusted interval of **[0.0332, 0.0716]**. FAST increased by **1.3957**, with **[1.1115, 1.7691]**. Both lower bounds exceeded the allowed margin.

That is why REG's fairly high raw accuracy still did not pass the complete reliability test. A criterion requiring both acquisition and protection of old memories can fail even when a learner acquires new information effectively.

The frozen practical-advantage claim for FAST was also negative against both KV and REG. The report includes those comparisons and their uncertainty. The larger scientific issue is the sequential failure: good isolated-object results concealed destructive interference.

## Why the simple table had an advantage

KV had a favorable setting: stable keys, separate storage rows, and room for 32 objects while the experiment used eight. Adding a row does not change the values in existing rows. A noisy or ambiguous cue can still retrieve the wrong row, but the storage operation itself avoids overwriting an old association through shared weights.

FAST uses overlapping directions of one matrix to represent different associations. Algebraically, its unclipped update changes the response to an old key in proportion to that key's dot product with the new key. Similar keys therefore create a route for interference when their target relationships differ. This explains a vulnerability of the rule; it is not a measured key-correlation ablation.

Resources were bounded, but actual allocations were unequal. KV used **7,448 numerical persistent bytes**, including the common motion core and settings; REG and FAST each used **4,120**. A common memory ceiling does not make those allocations identical. KV's measured mean recall time was about 33 microseconds, FAST's 35, and REG's 59 in this implementation. Those timings are descriptive, not general hardware claims.

The motion model's parameters stayed unchanged. The observed failure was in retaining or recovering associations, not in overwriting the common rotation model.

## What this result leaves open

The full study was deliberately stopped at D0–D2. The stage labels describe tests:

| Stage | Question | Status |
| --- | --- | --- |
| D0 | Are reset, no-write inference and evidence boundaries implemented correctly? | Complete |
| D1 | Can a new association survive reset and support prediction? | Complete |
| D2 | Do earlier associations survive learning similar objects? | Complete |
| D3 | Can writing handle bad measurements, wrong correspondence and genuine changes? | Deferred |
| D4 | How does memory degrade as the number of associations grows at fixed storage? | Deferred |

Unknown-cue and wrong-recall diagnostics exposed further limitations, but the experiment did not establish a robust learned write gate. The familiarity thresholds were calibrated on known development objects; their scores are not probabilities.

Nor did this study establish that a recurrent population needs an external cache. It tested a particular linear writer/readout against conventional memory. Iterative associative retrieval remains a missing comparison.

## Why test a recurrent retrieval population next?

The next selected direction is a bounded recurrent-retrieval pilot, starting with a fresh protocol. It will ask whether a competent associative population can recover newly acquired memories through recurrent settling and retain them while similar associations are added. The motion model can remain fixed so that retrieval is the mechanism under examination. KV remains a strong reference.

The motivation extends beyond replacing a table with a neural implementation. **If retrieval and tracking can operate on a similar recurrent substrate, a future system might learn where those functions belong and how they should communicate.** A population could become useful for retrieval because of its learned connections and operating conditions, rather than because a designer permanently assigned it a separate cache interface.

That is a research direction, not a result of D0–D2. A hand-designed retrieval population would establish a component capability. Demonstrating self-organization would require later evidence that specialization, routing or allocation emerges through learning, improves adaptation or scaling, and survives strong simpler controls.

The roles also need not correspond to permanently separate populations. A continuous-attractor integrator can itself perform dynamic prediction. Translation and gating might reside in connecting weights or shared activity patterns. The question is which arrangements learn useful behavior without sacrificing retained knowledge.

Hopfield's original work supplies a concrete precedent for content-addressable retrieval through recurrent dynamics. It does not decide which architecture, learning rule or capacity tradeoff will work for this task. [Hopfield, 1982](https://doi.org/10.1073/pnas.79.8.2554)

For now, D0–D2 supplies a reliable explicit-memory reference, an informative interference failure, and a clearer requirement for the next neural candidate: it must demonstrate persistent retrieval and retention through the mechanism we actually want to understand.

[Read the methods, uncertainty and resources →]({{ '/research/soam-study-d/' | relative_url }})
