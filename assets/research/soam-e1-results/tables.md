## Model errors and resource differences

NMSE means and ordinary 95% paired-root bootstrap intervals. Episodes are averaged within root. T32 is an exact no-fit equality diagnostic and is excluded from superiority contrasts.

| Model | Parameters | Allocated / active neural units | Free-8 NMSE [95% CI] | Final recall NMSE [95% CI] | Free-32 NMSE [95% CI] | Grounded-32 NMSE [95% CI] |
| --- | ---: | ---: | --- | --- | --- | --- |
| S32 | 3,868 | 32 / 32 | 0.086825 [0.074820, 0.098609] | 0.077657 [0.068287, 0.086725] | 0.105189 [0.096956, 0.114223] | 0.040797 [0.032659, 0.049651] |
| D25 | 3,849 | 50 / 25 | 0.109691 [0.095181, 0.124404] | 0.087080 [0.074067, 0.100321] | 0.148344 [0.121749, 0.176806] | 0.056110 [0.049498, 0.062007] |
| D16 | 2,040 | 32 / 16 | 0.109546 [0.098235, 0.121679] | 0.088051 [0.077233, 0.100928] | 0.160046 [0.131496, 0.193435] | 0.051966 [0.044542, 0.059429] |
| G28 | 3,988 | 28 / 28 | 0.046443 [0.039819, 0.052585] | 0.019600 [0.016060, 0.023641] | 0.130604 [0.107026, 0.154261] | 0.017773 [0.015377, 0.020381] |
| G32 | 4,940 | 32 / 32 | 0.037692 [0.029909, 0.045716] | 0.020987 [0.016440, 0.025873] | 0.105513 [0.083600, 0.128401] | 0.013327 [0.011828, 0.014896] |
| L12 | 924 | 12 / 12 | 0.086426 [0.074559, 0.098219] | 0.087339 [0.076597, 0.098748] | 0.057183 [0.049471, 0.065107] | 0.329105 [0.314224, 0.343074] |
| SYM32 | 1,884 | 32 / 32 | 0.180056 [0.157610, 0.202286] | 0.078325 [0.066757, 0.091307] | 0.263691 [0.230260, 0.299059] | 0.059954 [0.053313, 0.066332] |
| T32 | 3,868 tied | 64 / 32 | 0.086825 [0.074820, 0.098609] | 0.077657 [0.068287, 0.086725] | 0.105189 [0.096956, 0.114223] | 0.040797 [0.032659, 0.049651] |

Two non-neural role flags are additional to every row. All fitted readouts are counted. T32 shares S32 parameter objects; its two state banks do not imply an unavoidable memory penalty over lazy single-role allocation. No exact simultaneous parameter/state/compute match is claimed.

## Primary benefit and recall guardrails

Positive relative gain favours S32. Required gain: mean ≥0.10, adjusted lower bound >0 and interval width ≤0.20 against **every** reference. Recall contrasts require adjusted upper bounds ≤0.005 NMSE. The seven contrasts share the frozen multiplicity adjustment.

| Contrast | Mean | Adjusted interval | Ordinary 95% interval | Adjusted width | Criterion |
| --- | ---: | --- | --- | ---: | --- |
| S32 gain over D25 | 0.201038 | [0.093428, 0.310170] | [0.123458, 0.279933] | 0.216742 | Does not pass; precision/margin limits retained |
| S32 gain over D16 | 0.211141 | [0.143127, 0.300183] | [0.158803, 0.272820] | 0.157056 | Pass |
| S32 gain over G28 | -0.938844 | [-1.384367, -0.556093] | [-1.262954, -0.635545] | 0.828274 | Does not pass; precision/margin limits retained |
| S32 gain over G32 | -1.526395 | [-2.333402, -0.866113] | [-2.115501, -0.999345] | 1.467289 | Does not pass; precision/margin limits retained |
| S32 gain over L12 | -0.021142 | [-0.221034, 0.103314] | [-0.159631, 0.081110] | 0.324348 | Does not pass; precision/margin limits retained |
| S32 final − S32 recall-only | -0.037492 | [-0.058497, -0.008635] | [-0.054005, -0.017751] | 0.049862 | Pass |
| S32 final − D25 final recall | -0.009423 | [-0.018227, 0.000726] | [-0.016207, -0.002085] | 0.018953 | Pass |

## Causal overlap and direction

The six contrasts share the separately frozen adjustment. Positive adjusted lower bounds are required. The four NMSE contrasts also require width ≤0.02; the two relative contrasts require width ≤0.20. A point estimate below its minimum alone is not a precise failure.

| Contrast | Practical minimum | Mean | Adjusted interval | Ordinary 95% interval | Width | Outcome |
| --- | ---: | ---: | --- | --- | ---: | --- |
| Targeted full − intact recall | 0.005 | 0.615460 | [0.513405, 0.737641] | [0.536295, 0.703950] | 0.224236 | Unresolved |
| Targeted full − intact free-8 | 0.005 | 0.501028 | [0.440196, 0.557538] | [0.456391, 0.544384] | 0.117342 | Unresolved |
| Full − readout-only recall | 0.002 | 0.429698 | [0.374571, 0.490024] | [0.387401, 0.474583] | 0.115452 | Unresolved |
| Full − readout-only free-8 | 0.002 | 0.233442 | [0.205424, 0.254275] | [0.213399, 0.250611] | 0.048851 | Unresolved |
| Shifted-action relative free-8 increase | 0.1 | 0.580384 | [0.324054, 0.898404] | [0.380489, 0.814939] | 0.574350 | Unresolved |
| Zero-A relative free-8 increase | 0.1 | 1.236030 | [0.820426, 1.662235] | [0.924143, 1.555274] | 0.841809 | Unresolved |

## All lesion and direction controls

Ordinary 95% paired-root intervals below are descriptive controls; they do not enlarge the preregistered test family. Random sets are reported individually; targeted lesions need not exceed random lesions.

| Condition | Error increase over intact [95% CI] |
| --- | --- |
| D16-bank-0-recall | 0.391208 [0.299251, 0.478535] |
| D16-bank-0-transition | 0.000000 [0.000000, 0.000000] |
| D16-bank-1-recall | 0.000000 [0.000000, 0.000000] |
| D16-bank-1-transition | 0.276722 [0.234940, 0.324892] |
| T32-bank-0-recall | 0.615460 [0.536295, 0.703950] |
| T32-bank-0-transition | 0.000000 [0.000000, 0.000000] |
| T32-bank-1-recall | 0.000000 [0.000000, 0.000000] |
| T32-bank-1-transition | 0.501028 [0.456391, 0.544384] |
| random-0-recall | 0.172486 [0.104455, 0.239824] |
| random-0-transition | 0.154986 [0.110321, 0.201306] |
| random-1-recall | 0.127081 [0.062223, 0.219183] |
| random-1-transition | 0.107764 [0.066503, 0.163646] |
| random-2-recall | 0.100183 [0.038533, 0.179246] |
| random-2-transition | 0.117619 [0.067813, 0.176450] |
| random-3-recall | 0.098258 [0.060316, 0.142368] |
| random-3-transition | 0.088031 [0.071931, 0.109323] |
| readout-recall | 0.185762 [0.145439, 0.233180] |
| readout-transition | 0.267585 [0.235648, 0.302831] |
| targeted-recall | 0.615460 [0.536295, 0.703950] |
| targeted-transition | 0.501028 [0.456391, 0.544384] |

| Transition control | Relative error increase over intact S32 [95% CI] |
| --- | --- |
| SYM32-transition | 1.150563 [0.839936, 1.476060] |
| action_shift | 0.580384 [0.380489, 0.814939] |
| zero_A | 1.236030 [0.924143, 1.555274] |

SYM32 is independently fitted; zero-A removes asymmetry from the fitted S32 copy. Their effects answer different questions. All absolute diagnostic means, including targeted/readout/random lesions, D16 and T32 bank masks, zero cue and all recovery paths, appear in the linked machine-readable statistics.

## Cue dependence and finite-horizon recovery

| Recall path | Endpoint NMSE [95% CI] |
| --- | --- |
| S32-recall_final | 0.077657 [0.068287, 0.086725] |
| zero_cue | 0.999546 [0.947019, 1.048037] |
| perturb | 0.108642 [0.095628, 0.123703] |
| zero_S | 0.984501 [0.934001, 1.032300] |
| zero_S_perturb | 0.984485 [0.933973, 1.032283] |

| Recovery criterion | Mean | Ordinary 95% interval | Frozen threshold |
| --- | ---: | --- | --- |
| halving_fraction | 0.975000 | [0.960000, 0.990000] | ≥0.90 |
| halving_advantage | -0.025000 | [-0.040000, -0.010000] | ≥0.20 over S=0 |
| perturbed_recall_nmse | 0.108642 | [0.095628, 0.123703] | ≤0.02 |
| false_recovery_fraction | 0.620000 | [0.545000, 0.690000] | ≤0.05 (recall error >0.05) |
| feature_variance_ratio | 1.045411 | [0.985684, 1.105515] | [0.8, 1.2] |

Frozen recovery classification: **diagnostic_criteria_not_met**. Recovery is separate from the utility gate and is limited to ten-step trajectory recovery, not global attraction or Lyapunov stability.

| Step | S32 hidden RMS distance ratio [95% CI] | S=0 ratio [95% CI] |
| ---: | --- | --- |
| 1 | 0.712299 [0.708227, 0.716088] | 0.500000 [0.500000, 0.500000] |
| 2 | 0.530411 [0.523874, 0.536700] | 0.250000 [0.250000, 0.250000] |
| 3 | 0.414308 [0.405672, 0.422591] | 0.125000 [0.125000, 0.125000] |
| 4 | 0.340476 [0.329931, 0.350707] | 0.062500 [0.062500, 0.062500] |
| 5 | 0.294205 [0.281743, 0.306286] | 0.031250 [0.031250, 0.031250] |
| 6 | 0.265889 [0.251707, 0.279676] | 0.015625 [0.015625, 0.015625] |
| 7 | 0.249153 [0.233422, 0.264431] | 0.007813 [0.007812, 0.007813] |
| 8 | 0.239780 [0.222852, 0.256216] | 0.003906 [0.003906, 0.003906] |
| 9 | 0.235017 [0.217096, 0.252357] | 0.001953 [0.001953, 0.001953] |
| 10 | 0.233106 [0.214363, 0.251083] | 0.000977 [0.000977, 0.000977] |

## Root-level primary results and failures

| Root | S32 free-8 | D25 | D16 | G28 | G32 | L12 | SYM32 | S32 pre-recall | S32 final recall | Fits/cells failed |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 11 | 0.083126 | 0.102175 | 0.100341 | 0.050160 | 0.019402 | 0.053284 | 0.154315 | 0.152672 | 0.079227 | 0 / 0 |
| 23 | 0.098939 | 0.127062 | 0.111662 | 0.044588 | 0.047828 | 0.100676 | 0.157517 | 0.129539 | 0.057026 | 0 / 0 |
| 47 | 0.078662 | 0.116072 | 0.113720 | 0.043424 | 0.048269 | 0.092629 | 0.223071 | 0.108516 | 0.064190 | 0 / 0 |
| 71 | 0.117946 | 0.123381 | 0.130482 | 0.043780 | 0.031162 | 0.113237 | 0.164844 | 0.123224 | 0.082936 | 0 / 0 |
| 101 | 0.067710 | 0.079045 | 0.085485 | 0.023298 | 0.023979 | 0.070339 | 0.135951 | 0.115487 | 0.101937 | 0 / 0 |
| 131 | 0.076042 | 0.090280 | 0.095050 | 0.057996 | 0.025589 | 0.084220 | 0.217193 | 0.115110 | 0.076652 | 0 / 0 |
| 173 | 0.110161 | 0.141351 | 0.145066 | 0.061228 | 0.061566 | 0.099687 | 0.201629 | 0.112139 | 0.086410 | 0 / 0 |
| 211 | 0.081207 | 0.079353 | 0.093899 | 0.041920 | 0.047803 | 0.076777 | 0.229367 | 0.108631 | 0.050143 | 0 / 0 |
| 257 | 0.104078 | 0.148249 | 0.131129 | 0.057547 | 0.039842 | 0.111973 | 0.193433 | 0.133836 | 0.091862 | 0 / 0 |
| 307 | 0.050377 | 0.089947 | 0.088628 | 0.040483 | 0.031475 | 0.061435 | 0.123241 | 0.052342 | 0.086193 | 0 / 0 |
