---
layout: page
title: "Corrective Memory Writing: Evidence and Limits"
permalink: /research/soam-corrective-memory-writing/
description: "CB1, WR1 and WR2: local reconstructability, ordinary retrieval, ambiguity, verification and costs on four exposed PB1 banks."
---

<link rel="stylesheet" href="{{ '/assets/soam-writer.css' | relative_url }}">

This report accompanies [Teaching a Memory to Remember Both Twins]({{ '/blog/soam-corrective-memory-writing/' | relative_url }}). It covers the November 26 cue-basin diagnostic (CB1), fixed-code writer repair (WR1), and November 27 ordinary-retrieval follow-up (WR2). All numerical results below are archived development results. Publication rendered existing evidence; it ran no learning or retrieval trials.

**Decision:** corrective writing removes the measured local storage defect and substantially improves ordinary retrieval with unchanged codes and dynamics. Corrective restart remains the scoped recurrent comparator. All final arms fail ambiguity reliability, while exact-compatible lookup remains the practical reference on these noiseless aligned library keys. Neither maximum capacity nor biological validity is established.

## Task and information boundaries

Each of four PB1 banks has sixteen complete keys, arranged into eight similar pairs. A key has sixteen one-of-four groups, encoded in 64 components. Twins share twelve groups and differ in four; distinct pairs differ in at least eight. Each key has two context-selected sixteen-bit feature targets. The fixture is separate and excluded from scientific totals.

CB1 and WR1 test the acquired cue matrix W. WR2 also uses the original learned cue-to-feature matrix D and the original context-specific recurrent feature matrices R. The feature response starts at zero and performs four updates of `tanh(2*(u + .5*R*f))`. Sign at zero is positive; an output is accepted when its minimum absolute component is at least .5.

G1 reveals ten groups and is ambiguous between twins. G2 reveals two further disjoint groups. The resolving condition reveals one distinguishing group; the ambiguous condition leaves all four distinguishing groups hidden. Eight mask schedules, both members and two contexts contribute 256 feature decisions per final stratum per bank. Those masks and contexts are correlated, not independent replicates. Glimpse correspondence, symbol alignment, the library geometry and context selector are supplied.

WR2 replaces only W. Each writer recomputes its own G1 prefix. Both retain and restart use ordinary top-two pivot seeds, two cue sweeps with opposite group orders, the same support-score selection and the same feature receiver. Retention carries two inferred states; restart uses accumulated observations. Predictions are sealed before evaluator truth is loaded. No inference writes persistent parameters. No additional distinct grounded observations, twin IDs or evaluation masks enter WR1 fitting.

## Local storage and larger erasures

The frozen group update changes state only for a unique positive maximum strictly above the current field. Ties preserve state, including a missing group. Clean persistence therefore does not by itself establish missing-symbol reconstruction.

CB1 identified a distinguishing singleton defect in 28/32 pairs. WR1's primary pair criterion required **both** members to be clean-fixed and restore every singleton with strictly positive target advantage over active competitors and inactive zero, with the other fifteen groups clamped.

<div class="writer-scroll" tabindex="0" role="region" aria-label="Local storage results" markdown="1">

| Bank | Robust pairs old → new /8 | Free singleton old → new /512 | Corrective minimum local margin |
| --- | ---: | ---: | ---: |
| 1 | 0 → 8 | 126 → 512 | .519883 |
| 2 | 3 → 8 | 209 → 512 | .559186 |
| 3 | 0 → 8 | 51 → 512 | .536826 |
| 4 | 1 → 8 | 156 → 512 | .545545 |

</div>

Clean-fixed states improved 18/64→64/64. Strict clamped singleton restorations improved 953/1,024→1,024/1,024. In the separate free-singleton check, every group could move after one erasure: 542/2,048→2,048/2,048 exact two-sweep trajectories. No baseline robust pair was lost. These finite-bank criteria passed; they do not measure basin volume.

With visible groups clamped, corrective writing recovered all 768 tested two-distinction trajectories and 507/512 three-distinction trajectories. Five larger-erasure failures remained. Four ended with an unchanged final sweep; one was still changing. All selected shared-group erasures of sizes one through four recovered in both writers and both orders; those masks sample four hash-selected shared groups, not every subset of twelve shared groups.

When all distinguishing groups were erased, corrective W completed every case to a compatible twin, half to each designated hidden label. Those are unsupported choices, not identified recall. Identical inputs had identical trajectories.

## Writer definition and acquisition cost

WR1 uses 1,920 independent symmetric cross-group weights and 1,024 linear inequalities. Each compares a target local field against one of three active rivals or inactive zero under the supplied complete pattern's other fifteen groups. From zero weights, cyclic Euclidean projection corrects inequalities below training margin 1. The stopping tolerance is 1e-10, with a 1,024-pass cap. This is offline replay, not demonstrated online acquisition.

Bank fits took 78,70,66,90 passes and 4,778/3,615/4,455/5,343 corrections. The final matrix is positively scaled to the old W's Frobenius norm, then rounded to a 2^-20 grid. Final norms differ from the reference by less than 0.000001. All final measured minimum margins remain positive. No representation or inference rule was changed.

The runtime W stays 32 KiB, with 8 KiB of complete replay keys and a 15 MiB constraint matrix used during training, plus temporary arrays. These training costs are part of the comparison. Other optimized writers were not tested; the result establishes feasibility and a baseline defect, not algorithmic novelty or optimality.

## Ordinary retrieval and frozen decisions

WR2 prespecified **corrective restart minus old restart** as primary, following the earlier PB1 policy comparison. A meaningful effect required ≥13 extra exact responses in at least three banks, a positive fourth, no increased resolving bit errors, and no member losing more than one of its sixteen resolving responses. It was not permissible to choose the better policy after outcomes.

<div class="writer-scroll" tabindex="0" role="region" aria-label="Ordinary recall results" markdown="1">

| Bank | Old restart | Corrective restart | Gain | Repairs / losses | Wrong bits old → new |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1 | 142 | 254 | +112 | 113 / 1 | 460 → 16 |
| 2 | 169 | 256 | +87 | 87 / 0 | 390 → 0 |
| 3 | 132 | 256 | +124 | 124 / 0 | 470 → 0 |
| 4 | 135 | 252 | +117 | 118 / 1 | 488 → 14 |
| Total /1,024 | 578 | 1,018 | +440 | 442 / 2 | 1,808 → 30 |

</div>

All primary effect and member/bit guards pass. Leaving out banks 1–4 gives total gains 328,353,316,323. These are descriptive censuses, not confidence intervals. Thirty pairs recovered all 32 resolving responses. Bank1 pair6/15 recovered 30/32; bank4 pair0/4 recovered 28/32. [All-pair CSV]({{ '/assets/research/soam-writer/pair-map.csv' | relative_url }}).

The secondary corrective retention-minus-restart contrast failed: gains were −18,−10,−4,−16, with bit/member guards failing in every bank. Corrective retention exact counts were 236,246,252,236 (970 total), versus 141,152,124,134 with old weights (551). Relative to corrective restart, retention repaired four responses and lost 52. This policy failure does not establish that all possible uses of history are harmful.

Repaired restart included an exact cue in 127,128,128,126 of 128 resolving sensory rows per bank and selected it whenever available. The corresponding old counts were 40,59,26,47. First-to-fourth feature exactness had zero repairs and zero losses in repaired arms. The remaining restart failures entered the feature stage without an exact cue; these traces do not require a trajectory-only readout to explain the improvement.

## Reliability and conventional references

Reliability was separate from effect: ≥231/256 accepted resolving responses and ≤12/256 accepted-wrong responses in **each** final stratum in every bank. Corrective restart's resolving accepted/wrong counts were 255/1,256/0,256/0,252/0; corrective retention's were 237/1,248/2,253/1,236/0. These resolving components pass.

Every corrected restart bank nevertheless accepted 256 ambiguous responses and got 128 wrong. Corrective retention accepted/wrong 256/128,256/128,256/128,252/126. All four arms fail joint reliability. Original restart's pooled ambiguous accepted/wrong counts were 500/250; repaired restart's are 1,024/512. A more decisive completion can worsen unsupported commitment.

The original raw-observation control had 54,60,65,58 exact resolving outputs. The original exact-compatible lookup had 256/256 on each bank, accepted all resolving outputs and rejected every ambiguous output. These are unchanged archived references, not newly fitted or newly executed controls. Their clean-cue feature ceilings and custody checks pass. Lookup has favorable task conditions and is not a solution to noisy cross-view association.

## A reproducible residual failure

The predetermined witness was the first corrective-restart resolving accepted error in bank/row/context order: bank1, q96, prefix48, context1, member6, twin15. The article provides an [interactive archived replay]({{ '/blog/soam-corrective-memory-writing/' | relative_url }}#explore-the-failure-that-remains), and its [trace excerpt is downloadable]({{ '/assets/research/soam-writer/trace.json' | relative_url }}).

Lane1 seeds group12 with true symbol3. After group15 is filled, with groups3 and5 still missing, group12's target/rival fields are .5400075912475586/.5627603530883789. The frozen update switches 3→4. Both lanes end wrong at groups3,5,12; support scores tie at .006771087646484375. The final feature response has wrong bits1,3,4,9,15 and minimum magnitude .5949657419403058, so it is accepted.

Corrective retention keeps the exact G1 memory in lane1 and selects it with support1.0679302215576172 over the erroneous lane's .006771087646484375. Old retain and restart both end wrong at group3 and reject their inexact feature response. Thus retention helps this witness but loses overall. Positive singleton margins do not guarantee multi-group access.

## Verification, provenance and resources

WR1 protocol/source froze at `eb6f074`, allocation custody at `a10fef9`, raw results at `4b65a5c`; closure `159dbbb`. Eight tests, an exact bank01 fit/history/evaluation repeat, and an independent check of 2,048 fields passed. Six fits (fixture, four banks, repeat) used 11.243267 CPU seconds, 15.389093 summed wall seconds and peak sampled tree RSS359,923,712 bytes. Conservative artifact accounting was 5.10 MiB. No failed fit; unused allocation closed.

WR2 protocol/source froze at `af67ac2`, byte custody `f88a3ff`, fresh zero-fit approval `a6cde74`, raw lock `5549cf9`, closure `0d0ba5c`. Six invariant tests passed. All original PB1 prefix/terminal arrays replayed exactly. The bank01 repeat matched every numerical array and result/error/DAG JSON. Eight independently reconstructed cue/feature paths passed exact cue checks and absolute feature tolerance1e-12. The selected witness is among them. No failed numerical jobs, exclusions, tuning or recovery attempt.

WR2's ten supervised jobs, including descriptive extraction, used 9.792969 CPU seconds and 17.502034 summed wall seconds; peak sampled tree RSS310,902,784 bytes. Conservative working-tree artifacts plus closure reserve were 8,327,737 bytes, excluding Git object duplicates. Both studies ran CPU float64, one thread, Qwen/GPU off. Python3.12.13, NumPy2.5.4, PyTorch2.14.1. One-second RSS sampling can miss peaks. These figures describe research execution, not complete publication effort.

Each WR2 physical root used 32,256 cue-group field reads, 2,560 D projections and 20,480 context feature updates. Six roots include the fixture and repeat; G1 is physically shared by policies but charged to both. Each recurrent arm stores W32 KiB, D16 KiB and R4 KiB. Retention carries two 64-component states (1,024 bytes). Lookup uses sixteen packed uint32 keys (64 bytes) plus D/R. Evaluator keys, traces, copies and runtime overhead are included in process RSS; they are not inference inputs. Historical training and external lookup memory are not free.

The public [source-digest manifest]({{ '/assets/research/soam-writer/source-manifest.json' | relative_url }}) records the source reports and evidence digests. This publication includes plotted counts and one witness excerpt, not the complete raw archives or a runnable implementation. Four exposed banks support a development finding; masks are not fresh confirmation. Independent numerical verification is not independent empirical replication.

## Interpretation and future work

The old writer was inadequate for a task the fixed representation could handle substantially better. Related corrective associative-memory and margin-projection methods predate this work. The article links the primary literature and distinguishes human replay observations from biological learning models.

Immediate uncertainties are residual multi-group access and evidence-sensitive abstention. Proposed selective replay and compact constraint summaries must count memory, maintenance, correction and audit costs, preserve vulnerable distinctions, and be tested against full replay. No constant-time or logarithmic-space guarantee is established. Prototype formation, online acquisition, cross-view identity, action selection and local biological implementation remain untested. This publication does not activate a successor experiment.
