---
layout: page
title: "SOAM Memory Studies November 24–26: Capacity, Access and Cue Completion"
permalink: /research/soam-memory-studies-november-2026/
description: "Companion evidence report for six completed development studies, preserving per-bank outcomes, joint reliability failures, privileged diagnostics, resources and source provenance."
---

<link rel="stylesheet" href="{{ '/assets/soam-e1-results.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/soam-study-d.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/soam-memory-series.css' | relative_url }}">
{% include soam-memory-series-nav.html %}

## Scope and evidence status

Published November 26, 2026. This report accompanies the four articles above and summarizes six completed SOAM development studies. Their common question is what useful storage and retrieval a recurrent mechanism provides beyond competent simpler controls. These are finite, synthetic memory experiments, with two or four independent banks per comparison. They are not fresh confirmation studies or estimates of an optimal capacity ceiling.

<div class="memory-evidence-table" markdown="1" tabindex="0" role="region" aria-label="Scrollable evidence table">

| Study | Completed | Scoped outcome |
| --- | --- | --- |
| GCAP-D1 capacity screen | Nov 24 | Gated recall qualifies at eight associations, fails at 32; larger recurrent and feedforward controls pass 32. Optimization adequacy unresolved. |
| GCAP-OPT | Nov 24 | Four interventions fail their two-bank joint rules. None makes GATE usable at the tested difficult cell. |
| Sparse modulation | Nov 25 | No qualifying capacity advantage at 20 active units. One route intervention is harmful versus ordinary routing; the other stops at feasibility. |
| Associative information | Nov 25 | Assisted payload storage succeeds. SDM vote weighting improves totals but fails reliability. Privileged controller-input localization passes relative guards; ordinary access is unchanged. |
| Symmetric cue assist | Nov 25 | One sweep helps; continued settling misses the practical gain on every bank and accepts wrong answers under irreducible ambiguity. |
| Passive branching | Nov 26 | Retention loses to matched restart on all four banks. Compatible-key lookup through the shared recurrent receiver is exact on identifiable cases and abstains on ambiguous cases. |

</div>

Banks or corpus/training roots are the independent units. Queries, bits, targets, contexts and repeated masks within a bank share data or fitted parameters. Counts below are descriptive development outcomes, not independent-binomial confidence intervals. Cross-bank totals do not add independent replications. The later interventions in the sparse and information campaigns reuse exposed banks and are not confirmation.

All studies separate persistent stores, transient inference and evaluator knowledge. Neural fitting is offline; the last two studies acquire their stores from supplied clean observations. Inference performs no persistent writes. Familiar libraries, sensory alphabets, masks, correspondence and context selectors are supplied where used. No agent chooses or executes an observation-gathering action. Learned organization, selective preservation during new writes, reference frames and play remain untested. Earlier SOAM gates retain their outcomes; this publication activates no further study.

## Capacity and optimization

GCAP-D1 stores separated 16-bit bipolar patterns. Minimum pairwise Hamming distance is six and each query erases four bits, preserving identifiability. Train, validation and screen masks are disjoint. Twelve cue-supported settling steps begin from reset. Roots 2026112401/2026112402 test loads eight and 32 at base widths 16 and 32, with learning rate .01 and a 1,200-update cap; 2026112400 is the separate fixture. Joint development requirements are at least 95% exact and identity recall, at most 1% bit error, and at least 90% exact recall for the worst association.

At base width 32 and load 32, GATE has 32 paired content/modulation units, or 64 retained scalars. MOD removes content-dependent modulation; FLAT supplies a flat comparison. RNN is the parameter-matched ordinary recurrent control, RNN2 the state-matched control; FF is feedforward and BANK explicit lookup.

<div class="memory-evidence-table" markdown="1" tabindex="0" role="region" aria-label="Scrollable evidence table">

| Method | Exact recall, roots 1 / 2 | Worst association, roots 1 / 2 | Both qualify? | Deployment estimate, bytes |
| --- | ---: | ---: | --- | ---: |
| GATE | 92.72% / 93.51% | 73.44% / 81.25% | No | 59,008 |
| MOD | 90.72% / 92.63% | 75.00% / 73.44% | No | 59,008 |
| FLAT | 97.27% / 96.00% | 87.50% / 85.94% | No | 58,752 |
| RNN | 88.87% / 93.02% | 71.88% / 81.25% | No | 25,216 |
| RNN2 | 98.44% / 98.73% | 90.62% / 90.62% | Yes | 57,472 |
| FF | 98.88% / 99.17% | 95.31% / 95.31% | Yes | 53,336 |
| BANK | 100% / 100% | 100% / 100% | Yes | 13,568 |

</div>

Deployment estimates include stored tensors, retained state and a conservative query-workspace allowance. They are not measured peak live allocations. GATE has 1,584 trainable parameters, RNN2 5,200 and FF 5,059. BANK's implemented float64 patterns occupy 4,096 bytes at this load; 64 packed bytes is only their storage lower bound. These systems are not simultaneously matched for state, parameters, compute and bytes.

GATE's largest qualifying tested load is eight at both sizes. Loads between eight and 32 were not measured. Twenty-eight of 48 neural fits did not reach the declared plateau; passing control loads are also lower bounds rather than maxima. Mean gates ranged from .9225 to .99985. Forced-open diagnostics were strongly root-dependent and cannot isolate learned organization. GATE's cue-change recall at the larger difficult cell was .049% / .146%, despite blind continuation retaining 89.31% / 82.03%. Cue-change was a diagnostic, not an added qualification rule.

GCAP-OPT then held base width and load at 32. Each round used two fresh roots and 2,048 paired screen cues per root. An intervention needed at least 41 extra exact responses on both roots, lower selected validation loss, at most one lost worst-association response and at most .001 extra bit-error rate. Absolute usability remained a separate joint rule, including at least 58/64 exact for every association.

<div class="memory-evidence-table" markdown="1" tabindex="0" role="region" aria-label="Scrollable evidence table">

| Intervention | Exact-recall change, percentage points, roots 1 / 2 | Interpretation |
| --- | ---: | --- |
| Late learning-rate decay | −0.195 / +3.125 | Smoother late loss and better selected loss did not reliably rescue recall. |
| Practice masks expanded from 32 to 600 | −2.539 / +4.688 | Equal presentations supplied more distinct synthetic cues; one bank lost 52 responses. |
| Gradient projection with alignment veto | −0.195 / −0.537 | Erased-bit errors increased; the mechanism signature failed. Numerical reduction differences limit attribution to rotations alone. |
| Balanced replay within 50-update blocks | +0.195 / +2.734 | Hard-subset gains did not pass the whole-bank and member guards. |

</div>

All four failed. FF and BANK qualified across the four fresh banks under evaluated policies. Balanced replay's first bank gained 46 responses on the baseline's hardest eight targets and lost 42 on the other 24. Candidate-ranked hard subsets reversed the apparent advantage. Optimization adequacy and maximum capacity remain unresolved.

## Sparse routing

Two designs used a 64-unit content reservoir with 20 active retrieval units including controllers. A used ten content plus ten controller units; B used sixteen plus four. Loads eight and 24 had two paired roots, disjoint mask pools and independently refitted nested target banks. Qualification required exact/identity recall at least .95, bit error at most .01 and every target at least 58/64. The capacity claim also required a cross-load/control advantage, at least 31 extra high-load exact responses and interference/causal guards.

<div class="memory-evidence-table" markdown="1" tabindex="0" role="region" aria-label="Scrollable evidence table">

| Method | Exact at load 24, out of 1,536, roots 1 / 2 | Qualifies at eight? | Qualifies at 24? | Deployment bytes |
| --- | ---: | --- | --- | ---: |
| A, learned addresses and modulation | 780 / 941 | Both | Neither | 78,640 |
| B, competitive support allocation | 1,218 / 1,225 | Neither | Neither | 69,704 |
| Compact RNN20 | 1,255 / 1,326 | Both | Neither | 10,368 |

</div>

FF20 also qualified only at eight; BANK was exact at both loads. Against their own ordinary sparse controls, A gained 47/216 responses and B 107/20. Neither earned the capacity claim. A's controller-only model and B's same-table feedforward model were stronger high-load alternatives. A's sigmoid-amplitude telemetry was missing in this campaign; verified support counts do not recover that measurement. Optimization adequacy remains unresolved.

Matching active width concerns retrieval participation. The installed populations were 74 and 68 units. Training used larger activity unions, and dense optimizer/regularization updates affected off-route parameters. The cross-load comparison is not sequential-write forgetting, and sparse reads do not establish protected writes.

The final no-fit diagnostic reused trained banks with new masks. A's privileged same-target historical donor replaced one route index. Ordinary / compatible / unrelated exact counts were 788 / 767 / 722 and 976 / 965 / 924. The compatible edit beat unrelated disruption by 45/41 but lost 21/11 against ordinary access; other guards failed. This is negative evidence for the specific local repair. B's whole-support proposal stopped at its historical opportunity audit: 27 eligible errors versus 31 required on one bank, and nine eligible hard-target errors versus eleven on the other. No treatment was run for B.

## Stored payloads and access

Independent random 16-bit payloads were assigned to separated 16-bit keys. Four independent banks tested neural storage at sixteen pairs and conventional references, including sparse distributed memory (SDM) and a direct paired table. Usability required all clean reads correct, at least 95% exact masked payloads, at most 1% bit error and at least 58/64 exact for every key.

<div class="memory-evidence-table" markdown="1" tabindex="0" role="region" aria-label="Scrollable evidence table">

| Ordinary method at sixteen pairs | Usable banks out of four |
| --- | ---: |
| Direct paired table | 4 |
| SDM | 3 |
| Cue-modulated sparse recurrence | 0 |
| Cue-ungated sparse recurrence | 0 |
| Compact RNN20 | 0 |

</div>

Separately fitted models with supplied stable addresses recovered all payloads with or without modulation. The modulated addressed model also recovered them with zero sensory input and the correct address. This is assisted representational achievability. Stable addressing changes both training and retrieval; it is not a clean within-checkpoint routing repair.

The final diagnostics held stores fixed and reused the four exposed banks and masks. SDM squared vote multiplicities gave the following 32-pair results:

<div class="memory-evidence-table" markdown="1" tabindex="0" role="region" aria-label="Scrollable evidence table">

| Bank | Original exact / 2,048 | Squared-weight exact / 2,048 |
| --- | ---: | ---: |
| 1 | 1,817 | 1,894 |
| 2 | 1,825 | 1,911 |
| 3 | 1,905 | 1,945 |
| 4 | 1,897 | 1,938 |

</div>

Expected exact recall over fair tie coins also improved. Bit errors rose on two banks, and some keys lost more than two responses on three. No squared-weight bank qualified. Flat weighting was worse.

For neural checkpoints, the correct clean support was held fixed while missing signs were restored separately to controller or content input. Opposite signs formed a disruption control. Every restored sign and support was evaluator assistance.

<div class="memory-evidence-table" markdown="1" tabindex="0" role="region" aria-label="Scrollable evidence table">

| Bank | Original clean-support latch / 1,024 | Controller restored | Content restored |
| --- | ---: | ---: | ---: |
| 1 | 943 | 1,024 | 942 |
| 2 | 951 | 1,024 | 953 |
| 3 | 923 | 998 | 950 |
| 4 | 968 | 1,024 | 971 |

</div>

Controller localization passed all four relative guard sets; absolute privileged usability passed three. The fourth bank's worst key remained 41/64. The controller has feedback and a direct learned decoder path, so the intervention does not identify modulation as the cause. It supplies no ordinary reconstruction algorithm; ordinary access remains unchanged.

The packed table stores keys and payloads in 64 bytes at sixteen pairs or 128 at 32. SDM uses 133,120 live bytes for fixed addresses and float64 counters, with a full 1,024-address scan. Neural persistent storage is 65,600 bytes before privileged route metadata, state and workspace. The source payload entropy is sixteen times the number of pairs in bits over the generating ensemble. Repeated masks measure access, not additional stored payload entropy.

## Cue completion and passive retention

The cue-assist study used four fresh banks, each with sixteen clean sensory keys and 32 context-specific payload bindings. A symmetric sensory memory completed partial views. A context-conditioned linear decoder was fitted once per bank and shared across all arms. The alphabet, alignment and context selector were supplied; queries used unseen masks.

The following condition uses both views, with the earlier observation distinguishing the alternatives. Exact recall scores outputs whether accepted or not. Each bank has 256 sixteen-bit decisions, or 4,096 payload-bit opportunities.

<div class="memory-evidence-table" markdown="1" tabindex="0" role="region" aria-label="Scrollable evidence table">

| Cue source | Bank 1 | Bank 2 | Bank 3 | Bank 4 |
| --- | ---: | ---: | ---: | ---: |
| Observed symbols only | 65 | 64 | 51 | 67 |
| One symmetric sweep | 158 | 144 | 124 | 127 |
| Full settling | 144 | 145 | 131 | 121 |
| Compatible-key lookup | 256 | 256 | 256 | 256 |

</div>

Full minus one sweep was −14/+1/+7/−6; no bank reached +13. Full settling had more wrong bits than raw observed input in both resolvable conditions on every bank. On bank 3 in the displayed condition, one-sweep bit errors were 486 and full-settling errors 576, despite seven more exact payloads. Under indistinguishable twins with different payloads, full settling accepted 96/64/64/32 responses; half were wrong in each bank. Lookup's receiver abstained on every ambiguous case and accepted every identifiable answer correctly.

The subsequent passive study used four new banks and a recurrent feature receiver. Both policies received an ambiguous ten-group first view and two further observed groups, ran two candidate cue trajectories and used four feature updates per lane. Restart retained the observed first view; retention additionally carried two inferred cue states. G2 reseeded one of four missing groups in both methods, leaving three able to carry prior guesses.

<div class="memory-evidence-table" markdown="1" tabindex="0" role="region" aria-label="Scrollable evidence table">

| Exact resolving features / 256 | Bank 1 | Bank 2 | Bank 3 | Bank 4 | Descriptive total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Raw views through receiver | 54 | 60 | 65 | 58 | 237 |
| Two-lane restart | 142 | 169 | 132 | 135 | 578 |
| Two retained candidates | 141 | 152 | 124 | 134 | 551 |
| Lookup through receiver | 256 | 256 | 256 | 256 | 1,024 |

</div>

Retention repaired 19 and lost 46 exact answers relative to restart. The required gain was +13 in three banks and positive in the fourth; every sign was adverse. Restart bit-error counts were 460/390/470/488; retention's were 485/488/507/475, each out of 4,096 bits. Both policies failed practical coverage and ambiguity guards. Feature updates one to four added 23 exact responses for retention and 24 for restart across banks, with some losses in both. These sums are descriptive, not independent replications.

On 74–104 of 128 first-view sensory rows per bank, the two terminal candidates were identical. Retention adds 1,024 bytes for two 64-component float64 cue states. Per final sensory row both policies performed four pivot fields, sixteen cue-update fields, four support reads, two cue-to-feature projections and sixteen feature-vector updates across candidates and contexts. Shared first-view work was charged to both. This matches scheduled operations, not all memory or measured uncontended latency.

Lookup is deliberately strong on acquired familiar keys with noiseless aligned erasures. It was exact on identifiable cases and abstained on ambiguous ones in both experiments. These outcomes leave noisy observations, unfamiliar items, different candidate generators and learned correspondence open.

## Reproducibility and resources

These are recorded study costs, not publication-work costs. Fit/acquisition accounting differs across campaigns and must not be summed as if every attempt were identical. CPU and summed job-wall figures include the components stated below; concurrent jobs do not establish uncontended latency. Sampled RSS can miss short peaks.

<div class="memory-evidence-table" markdown="1" tabindex="0" role="region" aria-label="Scrollable evidence table">

| Study | Recorded work and verification | Recorded resources |
| --- | --- | --- |
| GCAP-D1 | 48 neural screen fits, eight BANK cells, six fixtures, one exact repeat; 1,320 scalar metrics and 264 prediction arrays independently recomputed | 79.821 CPU / 89.202 wall seconds for fixture, screen and report; audit adds .944 CPU / .437 wall; peak RSS 323,665,920 bytes |
| GCAP-OPT | 179 fitting attempts: 109 regression attempts, 62 scientific fits, four fixtures, four exact repeats; four BANK cells | About 240.4 CPU / 258.3 summed wall seconds in recorded components; some startup/read-only work unmeasured; concurrent sampled RSS charge 686,178,304 bytes |
| Sparse modulation | 50 attempts: 36 scientific neural fits, two fixtures, two neural repeats, ten compiler attempts; final diagnostics use zero fits | 144.785 CPU / 153.268 summed wall seconds; concurrent sampled RSS charge 694,681,600 bytes |
| Associative information | 54 physical acquisitions/fits, eighteen constructed checks, two exact fitting repeats; final diagnostics use zero fits | 114.247 CPU / 125.460 summed wall seconds; concurrent sampled RSS charge 714,948,608 bytes |
| Cue assist | Four scored banks plus one fixture; five symmetric stores, five conventional stores and five shared decoders acquired | 3,072 labeled queries, 24,576 ordinary arm responses; per bank 32,768 persistent symmetric bytes, 64 packed cue-table bytes, 16,384 shared decoder bytes |
| Passive branching | Four scored banks plus one fixture; 25 shared structures acquired; two selected error paths independently replayed through both stages | Each arm: 1,024 final sensory rows and 2,048 context-specific decisions, including resolving and ambiguous cases; 1,024 extra carried bytes for retention |

</div>

The GCAP-OPT regression run had an instrumentation-induced setup error, later corrected: its 358 baseline cases passed across the original run and correction, not one clean full-suite run. This did not alter scientific results. Cue-assist's first audit supervisor stopped when process sampling was denied; a separately reserved verifier completed. Both receipts remained counted. A sparse diagnostic's feasibility stop is distinct from software failure. No new scientific fits or confirmation data were generated for these articles.

Independent adjudication rechecked raw results within each campaign. It is verification of the same experiments, not independent empirical replication. In the information campaign, the final audit rebuilt all 24,576 SDM read vectors and rescored neural banks, with 256 mixed neural responses independently replayed; maximum logit difference was 6.44e−15. In passive branching, the judge replayed one selected final episode per arm, starting from archived first-glimpse terminals; it did not independently regenerate every trajectory.

## Source provenance

The publication's [source manifest]({{ '/assets/research/soam-memory-2026/source-manifest.json' | relative_url }}) records the exact local report paths, SHA-256 digests and repository revision used for this synthesis. The [figure data]({{ '/assets/research/soam-memory-2026/passive-recall.csv' | relative_url }}) preserve the plotted counts. These small publication artifacts do not constitute the raw experimental archive or a runnable reproduction bundle.

<div class="memory-evidence-table" markdown="1" tabindex="0" role="region" aria-label="Scrollable evidence table">

| Study | Owning reports and scientific identity |
| --- | --- |
| GCAP-D1, SOAM-109–111 | `reports/STUDY_GCAP_DEV.md`; generating commit `a207ffac07f944914dfdb67f35fe644231273b24`; source fingerprint `24dacaed28355cfad83b6d0e4d0efa5b729aa8127238fdee944d11681e6b608a` |
| GCAP-OPT, SOAM-112–116 | `reports/GCAP_OPT_CAMPAIGN.md`; roots 24112401–04; R1 fingerprint `f2e977d84199ad89c67db3af8eb5b4609cce079de35b036dfc5771e5b36bea5a`; R2 `d45fe8ce40d51fcff2118088dee645360927888717ac8fc6d0780cb36befb7b8` |
| Sparse modulation, SOAM-117–121 | `reports/SPARSE_MODULATION_CAMPAIGN.md`; roots 25112501/02, final masks stream 25112577; initial fingerprint `dc659e6916287b00ad8101994b0305b36ea604625f35b2f4324f74311e57f317`; final `01858632fa84865366ef5ec955094342f892314b6bf1450e21d02ebccb6debda` |
| Associative information, SOAM-122–126 | `reports/ASSOCIATIVE_INFORMATION_CAMPAIGN.md`; neural roots 251125101–104; initial neural generating commit `6fb0c473ca1288098c70264d1ac2d76784da1c88`; fingerprint `bfc09c08e7a428c48a73767da348f0d39e5bd4ba8659d1541ff9adeb6798651e`; final release `e9523d2` |
| Cue assist, SOAM-127–129 | `reports/SYMMETRIC_CUE_ASSIST.md`; protocol `3f416fd`; locked A/B submissions `a1e2f76f988503959fe6d7327432bd45a3d76e16` / `411d1c50cfc332987dbfccd2ff73f657eaccd563` |
| Passive branching, SOAM-130–132 | `reports/PASSIVE_BRANCH_COMPLETION.md`; protocol `93876b1`; locked A/B submissions `30409124f08d79abbc1a04ae9cc6b3899be9b37f` / `99954ca615d8fb132b5ddfa189e8aea067719239` |

</div>

Cue-assist's source fingerprint is `b448c5f1a15984be4c26bd280c4e4d0fde317ccbac14ffa1e9d7ff29824327ef`; the `SOAM-127/cue-assist-v1` namespace separates `fixture00` from `bank01`–`bank04` and their acquisition/mask streams. Passive branching uses `PB1-fixture` and `PB1-bank01`–`PB1-bank04`, with fingerprint `264910dceace22b4294a1635a7ce03d30302648360249440bd983f983cb94b7d`. Shared receipts retain the nested seed inputs. Its A/B generating commits are `fc15b2a4aaec39b5a9473772b6c8361f0fea5ae5` / `b73429e21c1575fa1578b888eb4bd88444b7d03c`.

Generating source identities differ from submission and integration commits. GCAP-OPT, sparse, neural information, cue-assist and passive reports record Python 3.12.13, NumPy 2.5.4 and PyTorch 2.14.1, CPU float64 execution, with one numerical thread per workload. Complete per-fit configuration, stream tokens, software receipts and raw manifests remain in the owning experiment archives. The public report is a bounded synthesis of that evidence; it preserves development status, unsuccessful guards and unresolved explanations.
