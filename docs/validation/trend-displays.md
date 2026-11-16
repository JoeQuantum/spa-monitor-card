# Approved trend captions and editor options

November 15, 2026. This follows local foundation commit `e204e2a` and the user's
explicit approval of **Gauges with captions**. The existing Sensor groups editor
direction is retained. The temperature row in the proof is not included in this
trend implementation; temperature conversion/ORP remain separate scope.

## Behavior and review points

- Optional rate captions follow each gauge value, use the existing theme text
  tokens and wrap at phone widths. Estimated month counts show `Estimate`.
  The gauge's accessible name includes direction and the unrounded reported
  rate; captions do not introduce a duplicate focus target or service action.
- Rate units must match the reported entity unit exactly. `/h` is supported for
  unitless HA Derivative sources. A missing/mismatched unit or invalid numeric
  state hides the caption. Attribute sources do not fall back to state.
- Hysteresis is isolated by reading, processes each HA snapshot (including
  coalesced unavailable reports), and clears after data gaps, reconfiguration
  and detach. Detached Lit updates do not repopulate direction state.
- The shared expiry scheduler tracks both primary and derivative deadlines.
  Expiry works with no further HA update, across render/schedule races and
  suspended tabs receiving a new sample before their old timer runs.
- Trend options live inside the approved sensor group. Helper selections are
  not filtered out by spa device scope. Three-level availability/freshness
  patches preserve siblings and unknown YAML extensions. Invalid drafts stay
  visible without being published. Zero and empty/default semantics remain
  distinct; maximum ages use minutes in the editor and seconds in YAML.

## Verification

The November 15 run passed **184 checks**: 37 unit/release, 67 built-browser,
41 existing HA browser, eight new rendered-trend/editor, five existing native
layout/helper, 19 native API/recorder and seven restart/persistence checks.
There were no skipped, unexpected or flaky built-browser results. Desktop and
phone-width screenshots of the actual captions and editor were inspected.

Both managed lab processes restarted normally with new PIDs. The fresh browser
loaded one card with the expected four baseline readings and no JavaScript
errors. The built, archived, installed and HTTP-served bundle matched SHA-256
`14b45a051668961169c5eed49db9c75ebc66683f3e1fded17d15384a83c1ae86`.
Final documentation changes rebuilt to the same tested JavaScript; the updated
manifest verified. No tag or release was published.

Run `PLAYWRIGHT_CHANNEL=chrome npm run check` with Node 22. The suite includes
37 unit/release and 67 built-browser cases. New regressions exercise rendered
rates, optional captions, raw accessible values, unit mismatch, bad values,
direction thresholds, independent sources, invalid drafts, helper selection,
nested option round trips, expiry and disconnect cleanup.

The native lab adds `ha-lab/scripts/test_trend_display.mjs` in the local project.
It exercises eight cases with real HA helpers, states, editor and dashboard:
two actual Derivative sources (`ppm/h` and `/h`), invalid data/hysteresis,
elapsed expiry, editor creation/save/reopen, nested settings/toggles, actual
Sections/theme/phone widths and history interaction, and browser exceptions.
The helper window is deliberately zero and samples accelerated for the test;
these are not recommended spa rates or smoothing parameters.

The existing five layout/helper, 41 HA browser, 19 native API/recorder and seven
restart/persistence checks are also rerun against the candidate. Exact counts,
logs, hashes and native screenshots are recorded in the dated project evidence
directory `research/card-trend-display-2026-11-15`. Temporary fixtures/helpers
are removed and the baseline dashboard/resources restored by the runners.

## Remaining validation

The native lab uses actual HA Core 2026.11.1 and frontend 20261028.5 with a
synthetic native ESPHome API peer. It does not run ESP-IQ2020 firmware or a
physical spa. Aria entity/attribute IDs, reported units, trustworthy chemical
sample timestamps, sensible averaging windows and noise thresholds still
require installation evidence. Physical commands/report acceptance, home
themes/browsers and versioned install/cache/rollback remain open.

No rate is calculated from browser update timing. A flat rate does not prove
freshness, safe water or dosing need. See the
[HA Derivative documentation](https://www.home-assistant.io/integrations/derivative/)
for upstream averaging/time units and optional recalculation without a new
sample. The locally installed Core implementation confirms that a source with
no unit yields `/h` when configured per hour.
