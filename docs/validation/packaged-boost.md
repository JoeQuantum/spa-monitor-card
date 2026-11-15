# Boost PR validation

Packaging date: November 14, 2026. Scope: C05 and remaining C06: explicit Boost requests, report confirmation, failure/timeout/cleanup behavior and native keyboard controls.

This is stage 2 of four stacked PRs. Merge configuration/scales, Boost,
theme overrides, then editor preservation. Each later PR targets its predecessor.
After merging a predecessor, retarget the next PR to master; if squash-merging,
rebase the next branch first to avoid repeating prerequisite changes.

## Independent branch checks

Node 22.23.5 / Playwright 1.65.0 with installed Chrome: **19 unit/release tests
and 34 built-browser tests pass**, with zero expected failures. A clean
lockfile installation, production rebuild and source/artifact checks pass.
Tests for later PR scopes are introduced with their implementation, not counted
as passes on this branch. GitHub workflow results are recorded in the PR body.

Reproduce with Node 22:

```sh
npm ci --ignore-scripts
npx playwright install chromium
npm run check
git diff --exit-code -- dist/spa-monitor-card.js dist/build-manifest.json
```

`PLAYWRIGHT_CHANNEL=chrome npm run check` uses an installed Chrome locally.
CI uses pinned Playwright Chromium on Linux. The distributable and its manifest
are committed with this stage.

## Complete-candidate HA evidence

The completed original candidate at `a6e5a151146a8da1cb86a21816e936ce3049876e`
passed 19 unit, 38 standalone browser, 30 real-HA browser, 19 HA/native API and
7 restart checks: 113 passes. Its bundle SHA-256 is
`2c656f30d54bdc7281e2f9766fdff5212973182a67b7080ad08099cf3ee3858e`.
Packaging verifies that the complete final stack retains those exact production
modules and bytes. The partial stages were not separately installed in HA;
complete-candidate results do not establish physical behavior for any stage.

HA Core 2026.11.1, frontend 20261028.5, Python 3.14.5 and aioesphomeapi 46.25.0
run stock entities/services/Lovelace against a synthetic native ESPHome API peer.
The peer does not execute ESP-IQ2020 firmware or emulate the spa/RS485 bus.
Service rejection and unresolved-promise ordering are standalone-harness tests;
real HA verifies ordinary commands, reports, timeouts and reconnects.

## Remaining validation

Validate physical Boost/output behavior, panel interaction, report/ACK timing, delayed/conflicting reports, output zero and reconnects. The 15-second feedback deadline needs Aria acceptance and cannot recall an already-sent command. No physical fix for ESP-IQ2020 issue #87 is claimed.

Actual entity mapping, sample freshness, IQ fault/lifetime interpretation and
new visual directions remain separate work. No sensor-health or water-safety
verdict is established by a gauge color or month estimate. No home HA connection,
firmware flash, physical spa command, release/tag or PR merge is part of packaging.
The public v0.1.1 asset is unchanged.
