# Output steps, requested state and HA validation

With a reported output of 3, three rapid increments previously sent `4,4,4`;
an entity step of 2 was ignored. The card now uses current min/max/step and a
separate desired value. Calls serialize and coalesce to the latest target while
the number on screen continues to show reported state. Service success is not
treated as a device acknowledgement.

Validation date: November 13, 2026. These are stacked contributions: merge
`codex/card-test-foundation`, then `codex/card-numeric-validation`, then
`codex/card-output-intent`. Each branch builds and tests independently against
its declared base. No tag or release is created; package version 0.1.1 is retained
as an unreleased development candidate.

## Results

| Check | Result |
|---|---|
| Unit/release-contract tests | 11 passed |
| Built bundle in Chrome | 23 passed; no expected failures |
| Real HA Lovelace/Chrome | 21 passed; no expected failures |
| HA/native ESPHome API integration | 19 passed |
| HA and API-peer restart persistence | 7 passed |

The real HA results are recorded for the same complete distributable, SHA-256
`e7ab9b00b300fa69013f2dc2159c07c01170f3aca7af428fb6dceceed9e9a5d8`.
The independent packaging build verifies that exact hash again. A sanitized
case-by-case record is included in [ha-results.json](ha-results.json).

The nine original failures now pass: five malformed sensor readings, invalid
number state, zero conversion divisor, step 2 and rapid increments. Additional
coverage checks fractional steps/nonzero minima/bounds, serialized/coalesced
calls, request reversal, intermediate reports, service failure, timeout and
unavailability/entity cleanup. Failure/pending details use the existing tooltip
and ARIA state; the visual baseline is retained.

## Real HA boundary

The local lab runs HA Core 2026.11.1, frontend 20261028.5, Python 3.14.5 and
aioesphomeapi 46.25.0. Its HA integration, entities, recorder, Lovelace and editor
are stock. A synthetic plaintext ESPHome native API peer supplies reports and
records commands; it does not run ESP-IQ2020 firmware or emulate the RS485 bus.
The development runner exposes no Bluetooth adapters. Arbitrary malformed
strings were injected through HA's state API because native float reports cannot
carry them. Service rejection/unresolved promise ordering are exercised in the
standalone browser harness; real HA verifies reports, a real 15-second timeout,
unavailability/reconnect and ordinary native API command delivery.

HA checks covered the actual entity picker, preservation of YAML overrides,
normal and invalid configuration, theme modes, 1280/768/390/320 px layouts,
multiple-card identifiers and loading the exact served bundle after restart.
The public v0.1.1 Marketplace install/redownload/removal was tested separately;
that older release is not represented as containing these fixes.

## Reproduce

Use Node 22 and the committed lockfile:

```sh
npm ci --ignore-scripts
npx playwright install chromium
npm run check
git diff --exit-code -- dist/spa-monitor-card.js dist/build-manifest.json
```

Locally installed Chrome can be used with `PLAYWRIGHT_CHANNEL=chrome npm run check`.
The packaging checks used Node 22.23.5 and Playwright 1.65.0. CI uses the pinned
Playwright Chromium build on Linux. The browser harness loads the actual built
distributable but mocks the HA object/service boundary; it is not physical-device
validation. The final committed asset and manifest must match a clean rebuild.

## Remaining physical acceptance

- Verify on the 2025 Hot Spring Aria with its installed ESP-IQ2020 firmware: rapid
  increment/decrement sequences, late/conflicting reports, min/max/step, output
  zero acceptance, panel changes and reconnect behavior. FreshWater/ACE physical
  output-zero acceptance remains unverified.
- Confirm the installed component publishes controller reports as expected;
  this lab cannot prove firmware ACK/retry behavior. ESP-IQ2020 control fixes
  are tracked separately in upstream PR #136.
- A matching report settles intent; failure, invalid/unavailable state, changed
  constraints/entity, removal or 15 seconds without feedback clears it. No
  automatic retry or reconnect replay is introduced. Test that deadline on the
  real controller. It cannot recall a command already sent, and the underlying
  protocol has no sequence ID to identify arbitrary stale reports.
- Confirm the actual home HA version, custom YAML/templates, dashboard caching
  and desired interaction with other controls before releasing.
- Boost semantics/accessibility, broader C02 validation, freshness, dosing,
  sensor-lifetime meanings and water-quality ranges remain separate work.

No firmware was flashed, home HA accessed, release published or physical spa
command sent during these tests. Recorder migration evidence from the separate
component PR is historical; the already repaired lab database was not rewritten
to manufacture another migration pass.
