---
layout: post
title: "SOAM Memory Studies 3: Stored Information and Ordinary Cue Access"
date: 2026-11-26 00:03:00 -0600
permalink: /blog/soam-storage-and-cue-access/
description: "Arbitrary payloads were recoverable with supplied addresses, while ordinary neural retrieval still failed. Conventional and neural diagnostics separate stored content, access and reliability."
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/soam-study-d.css' | relative_url }}">
{% include soam-memory-series-nav.html %}

## A wrong answer leaves two questions

If a memory returns the wrong answer, did it fail to retain the information, or did the cue fail to reach information that remains usable? The distinction changes what we should repair.

The November 25 associative-information campaign separated the two. Each familiar 16-bit key was paired with an independently sampled 16-bit payload. Completing the key could not reveal the payload by itself; the association had to be acquired. Four independent banks provided the comparisons.

With a stable address supplied during learning and retrieval, both modulated and ungated sparse neural models recovered every payload on the tested clean and erased queries. The modulated addressed model even succeeded with zero sensory input and the correct supplied address. Ordinary partial-cue access remained much weaker. These are different access contracts, and the perfect result belongs to the assisted one. The [companion report]({{ '/research/soam-memory-studies-november-2026/' | relative_url }}#stored-payloads-and-access) gives the guards and counts.

## What an address gives the model

An address identifies which learned association to use. It need not contain the answer's sixteen payload bits. For sixteen entries, an external identity service can distinguish entries with four identifier bits, while the network supplies the associated content from its fitted parameters.

That makes perfect addressed recall meaningful evidence of representational achievability. But a system that receives the correct identifier has avoided the difficult job of inferring it from an incomplete cue. The addressed models also learned under their stable supports from the start. Their success is not a demonstration that changing the route of an ordinarily trained checkpoint is sufficient to fix it.

The ungated addressed model was equally successful. Modulation was therefore not necessary for this result. A direct paired table recovered the same payloads through ordinary queries on all four banks, using just **64 packed bytes** for sixteen keys and sixteen payloads, before scan workspace. The neural system's persistent storage alone was **65,600 bytes**.

## The ordinary retrieval comparison

Qualification required every clean read to be correct, at least 95% whole-payload recall on masked keys, at most 1% bit error, and at least 58 of 64 correct masked reads for every key.

At sixteen pairs, the direct table qualified on **four of four banks**. A conventional sparse distributed memory qualified on **three of four**. Cue-modulated sparse recurrence, cue-ungated sparse recurrence and compact RNN20 each qualified on **zero**.

Sparse distributed memory stores contributions in counters at distributed address locations and combines their votes during retrieval. The follow-up held its locations and counters fixed, then changed how strongly repeated support contributed to the vote. Squaring the multiplicities increased exact payload recall on every bank at 32 pairs. Yet bit errors increased on two banks, and particular keys lost too many correct responses on three. No bank became usable under the joint rule.

This repeats the lesson from the capacity campaign: aggregate repair can coexist with harm concentrated on a few memories.

## A useful diagnosis with privileged information

The neural follow-up held each checkpoint's correct clean-key support fixed. It then restored erased input signs to either the controller path or the content path. The controller influences recurrent computation and also has a direct learned route to the output decoder.

Restoring the controller input produced **1,024, 1,024, 998 and 1,024** exact payloads out of 1,024 per bank. Restoring the content input produced **942, 953, 950 and 971**. The controller intervention passed all four banks' relative localization guards. Absolute privileged usability passed three banks; in the remaining bank, one key was correct only 41 times out of 64.

That narrows a sensitivity in the tested computation. It does not give an ordinary query a way to recover its missing signs. Both the clean support and the restored signs came from evaluator knowledge. The direct controller-to-output path also prevents attributing the gain specifically to modulation. Ordinary retrieval scores were unchanged.

## Counting information once

Sixteen independent sixteen-bit payloads contain 256 assigned payload bits under the generating distribution. Querying each item through 64 masks does not multiply the stored content by 64. Those repeated queries measure accessibility and robustness.

Likewise, inactive neurons still carry stored weights, and a learned decoder still costs memory. Source payload entropy, implementation bytes and successful recall under a declared cue contract answer different questions. Keeping them separate prevents a large or privileged system from appearing efficient because only its active units or successful responses were counted.

The campaign established assisted storage achievability and a scoped controller-input diagnosis. It retained the exact table as the practical reference for these separated familiar keys. Learned organization, persistent revision and a modulation-specific advantage remain open. The [final post]({{ '/blog/soam-cue-completion-and-retained-guesses/' | relative_url }}) examines whether recurrent cue completion and retained alternatives make ordinary access more useful.
