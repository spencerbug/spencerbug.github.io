---
layout: page
title: "Study B2 Report: Robust Kalman Correction"
permalink: /research/soam-study-b2/
description: "Correction designs, frozen confirmation, limits, measured costs, and downloadable evidence for SOAM's robust two-state estimator study."
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/soam-study-b2.css' | relative_url }}">
{% include soam-studies-nav.html %}

**Completed November 12, 2026.** B2 supports a bounded robust-correction benefit. The recommended **adaptive-variance filter** estimates measurement reliability from disagreement among observed channels. A **development-calibrated hard gate** is the simpler retained control. Both pass the frozen benefit and accuracy checks. Coherent false evidence remains unresolved; measured inference latency favors the neural reference.

Read the [visual article]({{ '/blog/soam-study-b2-robust-correction/' | relative_url }}) for the narrative. This report records the comparison and provides byte-identical evidence. B2 sits between completed B and conditional C in [Studies A–F]({{ '/research/soam-studies/' | relative_url }}); historical A/B and E1 decisions remain unchanged.

## What each corrector does

All filter variants inherit the same fitted two-dimensional observation and action-conditioned transition maps within each root. Prediction is scored **before** the current observation enters correction. Inference receives observations, masks, actions and supplied task roles; corruption/change labels and future evidence remain evaluator-only. Nominal noise metadata is unused.

| Design and archive ID | Correction mechanism |
| --- | --- |
| **Original two-state filter — FILTER2** | Fixed measurement variance 0.0001 and fitted process covariance; every valid observation receives the ordinary Kalman-style update. |
| **Stable numerical control — STABLE** | Same intended estimator, using float64 linear solves and the Joseph covariance update, which propagates uncertainty through the actual gain. Tests arithmetic rather than a new reliability rule. |
| **Conservative variance — R100** | Multiply measurement variance by 100 for every correction. This reduces trust even when evidence is correct. |
| **Nominal hard gate — NIS99** | Compute Normalized Innovation Squared: the full observed residual, weighted by inverse predicted innovation covariance. Reject a snapshot above its nominal Gaussian 99% threshold. Use the number of valid channels, not the two-dimensional signal rank, for nominal degrees of freedom. |
| **Calibrated hard gate — NISEMP** | Same statistic, with 99th-percentile thresholds from all ordinary pre-gating development innovations: 1128.6601 for six channels and 22.5534 for twelve. Accepted-only residuals do not determine calibration. |
| **Channel Huber — CHANNEL2** | For each observed channel, compare its residual with two predicted marginal standard deviations; inflate that channel's measurement variance when exceeded. Recompute the gain and matching uncertainty update. Correlated channels are not independent hypothesis tests. |
| **Adaptive variance — ADAPT1** | Project innovation onto the fitted observation model. Divide remaining squared disagreement by the number of redundant channels; clamp the scalar variance to [0.0001, 0.25]. Use it in both gain and Joseph covariance. The selected setting uses the current snapshot, carrying one scalar for missing/rank-deficient fallback. |
| **16-unit recurrent reference — PC16** | Study B's ordinary recurrent predictor with a separate fixed-gain sensory correction; 1,340 fitted scalars. Refitted with its inherited training settings on the same evidence. |

A rejected observation retains prior mean and covariance. Missing observations still allow process uncertainty to propagate. No correction changes persistent parameters. Adaptive variance is a bounded plug-in estimate, not an exact Bayesian posterior; fixed observation structure, redundancy and noise assumptions matter.

**Scope clarification, November 13:** richer environments may require nonlinear prediction, observation and correction models while retaining **predict → score before current evidence → correct**. B2 supports that interface within its tested setting; it does not validate ADAPT1's variance rule beyond redundant linear features. An unexplained residual may indicate model mismatch or genuine novelty rather than sensor noise. Carry forward the interface as a design principle, and test the estimator and reliability mechanism afresh instead of specializing the broader architecture to this environment.

## Bounded search and fresh confirmation

Development used two fitted roots and twelve paired episodes per cell. Phase 1 screened fourteen filter configurations plus original FILTER2 and PC16. Besides the confirmed controls, these included process-noise scaling, fixed gain attenuation, raw innovation weighting, normalized whole-vector Huber weighting and a second channel threshold.

Two mechanism-specific extensions followed: current/smoothed disagreement-based variance and **temporal rescue**, which releases a nominal hard gate after two or three consistent, model-plausible displaced cues. One hybrid combined adaptive variance with two-cue rescue. Temporal rescue reduced development change error from 0.4672 to 0.1755, still above the 0.07 target; the hybrid reached 0.1755 too. These are preserved development failures, not confirmation hypothesis tests. No Student-t filter or learned reliability controller was implemented; both remained conditional options under the two-extension cap. [All screened configurations and resources]({{ '/assets/research/soam-study-b2/development-candidates.json' | relative_url }})

The frozen inventory contains eight designs and two primary challengers: adaptive variance and calibrated hard rejection. Confirmation uses **ten independently fitted roots**, twenty paired episodes per cell, 64 physical steps and 86 cells per model. The primary unit is a fitted root, not a timestep. Each base fit uses 9,600 episodes and 163,200 clean supervisory feature records; robust variants reuse the same filter fit. Their extra controller search is explicit unequal tuning opportunity relative to the inherited neural reference.

Ordinary **J** follows Study B's pre-correction intermittent partial/missing/noisy sensing definition. **C** averages seven corruption conditions equally: original corruption, isolated outliers, partial-channel faults, coherent snapshots, sustained plausible faults, heavy tails and biased/correlated noise. Original corruption averages five sensed schedules; new corruption conditions average four intermittent schedules. Genuine changes, changed dynamics, long gaps, free prediction and an identical-evidence ambiguity pair supply separate checks. The ambiguity pair is excluded from the performance gate.

## Confirmation results and decision

{% include soam-b2-confirmation-table.html %}

Values are fresh B2 mean NMSE, not copied historical Study B scores. The independent normalization variance is 0.030742605990558128. Smaller is better; NMSE is not a classification-error percentage.

<figure class="e1-figure">
  <a href="{{ '/assets/research/soam-study-b2/all-correctors.svg' | relative_url }}"><img src="{{ '/assets/research/soam-study-b2/all-correctors.svg' | relative_url }}" width="1000" height="680" alt="All eight confirmed correctors, with ordinary 95 percent intervals, across prediction, original corruption and genuine change. Conservative variance and nominal rejection fail the change target; adaptive variance and calibrated rejection pass all frozen criteria."></a>
  <figcaption>Descriptive root intervals; click for full size. Absolute-target lines are part of the gate, not its entire definition. Primary contrasts use a separate multiplicity adjustment.</figcaption>
</figure>

| Primary challenger versus original filter | Paired-root C improvement | Family-adjusted interval | Frozen outcome |
| --- | ---: | --- | --- |
| Adaptive variance | 52.69% | 50.11% to 55.06% | Supported bounded benefit |
| Calibrated hard rejection | 45.01% | 42.23% to 47.58% | Supported bounded benefit |

Both meet the frozen 30% mean benefit, positive adjusted lower bound and interval-width limit of 0.40. Both meet J ≤ 0.05, original corruption ≤ 0.15 and genuine change ≤ 0.07; all adjusted upper differences for J/change/clean/gap/free-32 stay below the 0.01 worsening margin. Twenty thousand paired root-bootstrap resamples use seed 15203; Bonferroni adjustment covers twelve primary contrasts. No thresholds or candidates changed after confirmation. [Full intervals and checks]({{ '/assets/research/soam-study-b2/statistics.json' | relative_url }})

The adaptive filter's change error is slightly higher by 0.000022 NMSE, adjusted interval [0.0000025, 0.0000432]; passing a practical margin does not mean exact equality. Mean post-correction change recovery is 0.896 steps versus the original filter's 0.828. Recovery is the first of three sufficiently accurate steps relative to a fixed pre-onset baseline, with censoring; it does not guarantee no later relapse. [Secondary intervals]({{ '/assets/research/soam-study-b2/condition-statistics.json' | relative_url }})

## Mechanism evidence and remaining failures

The original historical fit and 216 prediction arrays reproduce exactly. There is no baseline scientific defect. Its nominal variance understates the high-noise measurement variance by 100 times; 98.303% of the audited root's fitted transition-residual energy comes from genuine-change training episodes. That combination encourages strong correction. The solve/Joseph control changes predictions by at most numerical tolerance rather than repairing the corruption problem. [Failure analysis]({{ '/assets/research/soam-study-b2/STUDY_B2_FILTER_AUDIT.txt' | relative_url }})

Adaptive variance retains about 99.4% of nominal gain norm on clean partial cues and genuine changes, but about 53.5% under ordinary high noise, comparing gains at the same prior covariance and mask. High-noise prior-state 95% coverage improves from 66.75% to 95.99%; nominal partial-sensing coverage remains 100%, so calibration is still condition-dependent. [Gain audit]({{ '/assets/research/soam-study-b2/effective-gain.json' | relative_url }})

Coherent snapshot error barely changes: 0.16821 → 0.16729. Sustained plausible corruption stays 0.53437 → 0.53331. The neural reference is better on both. The worst adaptive-filter corruption episode has mean error 1.16744; tails and identities remain in the [failure archive]({{ '/assets/research/soam-study-b2/worst-cases.json' | relative_url }}). Identical-evidence worlds have different hidden targets, imposing an information limit regardless of the correction rule. [Construction checks and lower bound]({{ '/assets/research/soam-study-b2/identifiability.json' | relative_url }})

## Actual resource cost

{% include soam-b2-cost.html %}

The adaptive filter has 520 bytes of used parameter buffers, 920 allocated including an inherited unused buffer, and 56 bytes of transient mean/covariance/reliability state. The neural reference has 5,360 parameter bytes and 64 transient bytes. Mean base fitting CPU is 0.052 versus 2.860 seconds. The filter's 149.375 counted linear MACs per physical step versus 678 omit solves, eigenvalue checks and nonlinear work; these counts use every-four sensing and differ from historical B's averaging surface. **They do not establish equal computation or a speed win.** At batch twenty, measured per-episode step latency is 5.82 versus 1.96 μs. [Complete resources]({{ '/assets/research/soam-study-b2/resources.json' | relative_url }})

The study consumed 352.02 numerical CPU seconds, 352.63 execution-wall seconds, 775,749,632 bytes peak RSS and 480,468,054 artifact bytes, below its new 1800-second CPU / 3600-second wall / 2 GiB RSS / 1 GiB archive limits. Zero GPU time. These totals cover study phases, diagnostics and preserved engineering failures, not language-model assistance, engineering-test CPU or this later publication. [Ledger]({{ '/assets/research/soam-study-b2/resource-final.json' | relative_url }})

## Evidence downloads and provenance

This publication snapshots **26 compact evidence files**, byte-identical to the completed local study. B2 was executed from a frozen uncommitted source snapshot on base commit `bdb3bdcbb47c7a2a24301e044ebaaac6b50a18cd`; that commit alone does **not** contain the B2 implementation. The source fingerprint is `28d72614c9f2d61b0e48cdd4d2ebc896cff1d37bb7324a2d5c735a29cb69e1cd`. The [publication manifest]({{ '/assets/research/soam-study-b2/provenance.json' | relative_url }}) records every source path, size and SHA-256.

- Design: [protocol]({{ '/assets/research/soam-study-b2/STUDY_B2_PROTOCOL.txt' | relative_url }}), [numerical manifest]({{ '/assets/research/soam-study-b2/manifest.json' | relative_url }}), [literature and assumptions]({{ '/assets/research/soam-study-b2/STUDY_B2_LITERATURE.txt' | relative_url }}), [development routing]({{ '/assets/research/soam-study-b2/STUDY_B2_DEVELOPMENT.txt' | relative_url }}).
- Results: [full scientific report]({{ '/assets/research/soam-study-b2/STUDY_B2.txt' | relative_url }}), [root values]({{ '/assets/research/soam-study-b2/root-results.json' | relative_url }}), [confirmation receipt]({{ '/assets/research/soam-study-b2/confirmation-receipt.json' | relative_url }}), [decision and C handoff]({{ '/assets/research/soam-study-b2/STUDY_B2_DECISION.txt' | relative_url }}).
- Verification: [exact repeat]({{ '/assets/research/soam-study-b2/reproduction.json' | relative_url }}), [1,040 independent reductions]({{ '/assets/research/soam-study-b2/independent-reduction.json' | relative_url }}), [integrity audit and tests]({{ '/assets/research/soam-study-b2/verification.json' | relative_url }}). All 266 repository tests passed; no scientific fits failed or roots were excluded.

The downloads retain their original chronology and source-relative links: “no publication” describes study completion before this authorized article. Full raw episode arrays, checkpoints and frozen source snapshots remain in local `runs/study-b2-v1/`; this public compact archive is not a complete reproduction package. Figures are rendered from these archived estimates, with conceptual geometry explicitly labeled. No new fitting or inference was performed for publication.

The decision recommends adaptive variance as a single-hypothesis conventional reference and calibrated rejection as its simpler control. Future multi-hypothesis comparisons should maintain and count independent means, covariances and reliability states even if fitted maps are shared. **No Study C experiment is activated here**, and no result establishes useful attractors, shared neurons, persistent acquisition or biological validity.

{% include ai-assisted-author-note.html %}
