# Configuration, Boost and related offline fixes

Validated November 14, 2026 against merged-master base
`66c92077fd0fe5f5da21bdb7ee79b95177aadcd6`. This candidate completes the offline
configuration/scale, Boost, keyboard, theme-override and documentation fixes.
The existing visual layout, preset values and Lit runtime are retained.

## Behavior and compatibility

- Configuration errors identify the exact nested field. Validation covers
  object shapes, entity domains, finite bounds, decimals, supported formats,
  conversion settings, custom sensors and ordered zones. Startup does not
  require entities to be loaded. Validation leaves a previous valid config
  intact and does not mutate supplied YAML or presets.
- Preset min/max changes update the outer endpoints and preserve interior
  breakpoints. Bounds crossing an interior breakpoint need explicit `zones`
  or `zones: null` for a linear scale. Earlier builds silently ignored those
  bounds. Explicit zones infer missing bounds; declared bounds must match.
  Text identifies configured bands and below/above-range readings.
- Boost sends explicit `switch.turn_on`/`switch.turn_off`. Repeated pending
  actions are suppressed. The display follows reports, and service success
  alone is insufficient. Failure, invalid/unavailable state, removal, changed
  entity or a 15-second feedback timeout clears intent without retry/replay.
  Old service failures cannot cancel a newer request. Boost does not change
  the separate configured salt-output value or infer a remaining duration.
- Boost is a native keyboard button. Controls expose reported/pending/error
  state and visible keyboard focus; gauges have textual accessible descriptions
  and tooltips. The existing visual palette is retained; this is not a blanket
  WCAG or assistive-device certification.
- Public `--spa-*` overrides take precedence in all four themes. Defaults
  remain private fallbacks. Explicit opaque text/background overrides were
  checked for contrast using actual HA computed styles; translucent default
  contrast remains dependent on the chosen backdrop.
- Editor clear/reselect retains advanced options during the same editor
  session. A placeholder starter avoids silently choosing one of several spas.
  Broader editor fields/device-based suggestions remain planned work.
- README scales now match the actual piecewise mapping. The IQ reserve/months
  calculation is attributed to owner evidence and identified as an estimate;
  raw hours remain in the tooltip/accessible description. See
  [range provenance](../range-provenance.md). No fault decoder or new range was
  invented, and missing theme-image references were removed.

## Results

| Suite | Result |
|---|---|
| Unit and release-contract tests | 19 passed |
| Actual built bundle / Chrome | 38 passed |
| Real HA Lovelace / Chrome | 30 passed |
| HA/native ESPHome API | 19 passed |
| HA and API-peer restart persistence | 7 passed |
| Total | **113 passed; no failures or expected failures** |
| Fresh browser after restart | Four expected readings; no JS errors |
| Build manifest and HTTP-served bundle after restart | Passed; exact matching bytes |

Candidate SHA-256:
`2c656f30d54bdc7281e2f9766fdff5212973182a67b7080ad08099cf3ee3858e`.
The case list and runtime versions are in
[offline-ha-results.json](offline-ha-results.json).

Reproduce the repository checks with Node 22 and the lockfile:

```sh
npm ci --ignore-scripts
npx playwright install chromium
npm run check
```

Installed Chrome can be selected with `PLAYWRIGHT_CHANNEL=chrome npm run check`.
The run used Node 22.23.5 / Playwright 1.65.0. Built-bundle tests mock the HA
object/service boundary. Separate Core 2026.11.1 tests use HA's actual entities,
services, Lovelace and editor with a synthetic ESPHome native API peer.

The HA additions verify nested YAML errors in dashboard editing mode, custom
zero values/startup entities, endpoint overrides, duplicate Boost requests,
an actual 15-second timeout, unavailable/malformed reports, reconnect cleanup,
keyboard interaction and all theme overrides. Service-rejection and
unresolved-promise ordering are covered by the standalone harness; they are not
claimed as physical controller or real-HA backend fault injection.

The initial tests exposed five defect groups. Two test assumptions were corrected:
a scale sample inside the intentional 5–95% indicator padding, and checking
focus after activation had disabled the button. The corrected scale reproducer
uses value 12/max 20: baseline displays 95%, candidate 93.3333%. Focus is checked
after Tab navigation before activation. Prior evidence was retained rather than
rewritten. No expected-failure annotation hides these regressions.

## Remaining physical and planned work

The fixture does not run ESP-IQ2020 firmware or emulate RS485. Validate Boost
and output against the installed 2025 Aria: panel interaction, actual reporting,
ACK timing, delayed/conflicting state, output zero and reconnects. Both feedback
deadlines need physical acceptance; a timeout cannot recall a sent command.
Aria Boost issue [#87](https://github.com/Ylianst/ESP-IQ2020/issues/87) remains
an upstream hardware/integration question, not a defect proven fixed here.

Actual entity/measurement mapping, sensor freshness/fault/lifetime semantics,
new layouts, expanded editor options, attributes/availability, trends, locale
support and extra sensor displays remain separate planned work. New visual
directions still require design selection. The one-time statistics migration
experiment was preserved; no repaired database was reset to repeat it.

This validation did not flash firmware, contact home HA, merge a new PR, publish
a release or send a physical spa command. Package version remains 0.1.1 with
these changes under Unreleased; the older public v0.1.1 asset is unchanged.
