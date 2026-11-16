# Layout integration and trend foundations

November 15, 2026. Base: merged master `63909faf22d46001cb3e12963bba0d8d6be15a30`.

This is the historical foundation result at `e204e2a`, before design approval.
The approved implementation and current validation are in
[Trend displays](trend-displays.md).

The nonvisual layout work uses native `ha-card`, preserves the existing gauge
appearance and public CSS variables, and exposes Sections defaults with automatic
height. Wider gauge sets retain the full-section minimum. Masonry uses measured
height. Tests exercise actual HA Sections and card-mod v4.2.1, pinned to commit
`11005313b240da0f7880b95aedc5a9876c293b83`. Temporary test resources/helpers are
removed and the baseline dashboard restored.

## Design boundary

Three representative treatments are prepared: Gauges with captions, Reading
tiles, and Gauges and trend list. The standing design preference requires a
selection/approval before applying a new presentation. None is selected by the
implementation. No new trend caption, additional reading, or new layout has
been rolled out. The existing approved Sensor groups editor is retained.

## Prepared trend contract

`src/trends.js` is an independently tested data module, not yet connected to
card rendering. Optional `sensors.<id>.trend` validation is also prepared:

- Explicit numeric entity (or numeric attribute) and a declared rate unit ending
  in `/s`, `/min`, `/h` or `/d`. The reported entity unit must match exactly.
- Finite nonnegative `deadband`, `hysteresis` between zero and deadband, and
  integer `decimals` from zero to six. Explicit nulls and malformed values fail.
- Direction enters at `deadband + hysteresis` and exits at
  `deadband - hysteresis`; decimal rounding tolerance avoids binary boundary
  accidents. Zero never creates a direction. Tiny nonzero rates do not display
  as a directed zero; flat rounded negative zero is normalized.
- The primary reading and derivative must both be available. Optional derivative
  availability/freshness uses the same explicit contracts as primary readings.
  Missing timestamps or units do not imply freshness or a valid quantity.

No rate is calculated from browser update timing. The actual HA Derivative helper
is tested with a disposable source; its declared `ppm/h` and rising/falling values
are passed to the production data reader. That case tests the helper/reader
boundary, not a rendered trend. Visual integration, editor exposure and rendered
trend expiry still await the design choice and subsequent implementation/tests.

## Tests and reproduction

The November 15 run passed **163 checks**: 35 unit/release, 56 built-browser,
41 existing HA browser, five native layout/helper, 19 native API/recorder and
seven restart/persistence cases. The built-browser run had zero skipped,
unexpected or flaky results. A fresh post-restart browser loaded one card with
the four expected readings and no JavaScript errors.

Run `PLAYWRIGHT_CHANNEL=chrome npm run check` using Node 22. Native checks used
HA Core 2026.11.1, frontend 20261028.5, Python 3.14.5 and aioesphomeapi 46.25.0.
The built, archived, installed and HTTP-served bundle matched SHA-256
`775517deb6636eae1e922a4aa55bc6c37ff2120f5f9b46c8ddfa44a3c5a92c9c`.
Dated logs and full case results are in the local project research directory
`research/card-layout-trends-2026-11-15`.

The lab manager briefly rejected the exiting HA PID's changed command during
shutdown. After verifying that process had exited and its port was closed, the
owned simulator was stopped normally and both processes started normally.
Both PIDs changed and all persistence checks passed against the pre-restart
baseline. No forced kill, weakened assertions or manager changes were needed.

The additional runner is `ha-lab/scripts/test_layout_trends.mjs` in the local
project. Install the exact current distributable with `dashboard.py --asset`, and
copy the pinned card-mod asset to the test URL before running it. The runner adds
and removes its own resource and Derivative helper. Run state-changing suites
sequentially; capture a fresh baseline before restarting both lab processes.
Do not rerun the one-time statistics migration against the repaired database.
The original migration evidence and existing regression scripts were verified
unchanged. The temporary Derivative source, helper/registry entry and card-mod
resource were removed; the baseline dashboard and sole candidate card resource
were verified after restart. The card-mod screenshot is a deliberately unusual
CSS override fixture, not an approved palette or accessibility assessment.

## Remaining work and sources

Actual Aria entity/unit/sample-time mappings, derivative smoothing windows and
noise thresholds need installation evidence. A flat rate does not prove a fresh
sample, safe water or a chemical dosing need. Physical Boost/output/report
acceptance, home themes/browsers and versioned installation/rollback remain open.

- [HA custom-card layout API](https://contributors.home-assistant.io/frontend/custom-ui/card/)
- [HA Derivative helper](https://www.home-assistant.io/integrations/derivative/)
- [HA Trend helper, whose boolean state is not a signed derivative](https://www.home-assistant.io/integrations/trend/)
- [card-mod](https://github.com/thomasloven/lovelace-card-mod)

The local Pool Monitor fork supplied the prior derivative/deadband concept. This
implementation uses explicit units and direction hysteresis; it does not copy a
universal derivative scale or multi-chevron magnitude buckets.
