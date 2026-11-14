# Study C development and pre-confirmation review

November 14, 2026. SOAM-080. Development only; no confirmation stream has been generated.

Two independent development roots (26101/26107), sixteen neural fits and two shared conventional fits completed. Each neural fit used 1200 updates, identical observations/labels within root, and the frozen final-checkpoint rule. Joint selection used the declared eight LR/temperature combinations per neural width and four temperatures per conventional variant. All settings, including unselected PC40, are retained in [the full screen](study-c/development-settings.json).

| Candidate | Selected LR | Temperature | Mean development Brier |
| --- | --- | --- | --- |
| PC16 | 0.003 | 4 | 0.208957 |
| PC32 | 0.003 | 4 | 0.201005 |
| TWO16 | 0.01 | 4 | 0.184279 |
| ADAPT1-C | None | 1 | 0.186408 |
| ADAPT1-M | None | 4 | 0.184660 |
| FILTER2-C | None | 1 | 0.186435 |
| FILTER2-M | None | 4 | 0.184933 |
| NISEMP-C | None | 1 | 0.186511 |
| NISEMP-M | None | 4 | 0.186443 |
| PC40 | 0.003 | 4 | 0.202060 |

PC32 is the stronger development-selected capacity control; PC40 is not carried into confirmation. Every selected neural configuration passes the frozen <=20% late-improvement screen: PC16 8.12%, PC32 14.13%, TWO16 0.11%. The remaining slope is disclosed, not treated as proof of globally optimal fitting. All required controls and their selected temperatures remain.

All selected references meet the development competence limits. TWO16 and the conventional candidates remain exactly uncertain on paired no-information histories; learned single-state readouts show small excess ambiguity Brier. These are development observations only. They neither pass C-H1 nor select another experiment.

NISEMP six-channel thresholds are 20.2325694 (collapsed) and 18.1348956 (retained), derived from all true-candidate, pre-gating ordinary FILTER2 development innovations. The inherited 12-channel nominal threshold is unused after initialization; initial evidence seeds state without a belief update. Adequacy thresholds use all ordinary development minimum misfits. All thresholds and fitting exposure are recorded in [the selection](study-c/development-selection.json).

The fixture and development used 402.566294 numerical CPU seconds before calibration; calibration used 13.897708 seconds. Development peak RSS was 941,932,544 bytes, above the short-fixture projection but below the unchanged 2 GiB ceiling. A conservative 1.25x update is 1,177,415,680 bytes and remains feasible. This is a resource-projection correction, not an increased budget.

A pre-confirmation resource audit adds fitted residual-variance and adequacy scalars, selected temperature, temporary branch/posterior/confidence workspaces, and both decoder calls in the minimal timed loop. This changes accounting only; no fitted tensor, inference equation, observation stream, endpoint or selection changed. The development source snapshot preserves the earlier accounting.

Review: proceed to the frozen nine-model, ten-root confirmation. The original protocol thresholds remain unchanged. Confirmation must retain all failures, run the prescribed first-root repeat and independently reduce archived endpoints. Scheduling and other branches remain unselected.

Pre-confirmation verification: `uv run pytest` 285 passed in 26.93s; Ruff passed; ticket validation passed82 tickets. The immutable [receipt](study-c/confirmation-receipt.json) was written before any confirmation data. No post-freeze source or setting changes are permitted by the runner.
