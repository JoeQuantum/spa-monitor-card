# Native Home Assistant history access: PR validation

Packaging date: November 14, 2026. Scope: C11 partial: optional native more-info access by click, Enter and Space; no trend display.

This is stage 2 of four stacked draft PRs: reading sources → native history →
layout sizing → sensor-group editor. Each later PR targets its predecessor.
Merge in that order, then retarget the next PR to master. If squash-merging,
rebase the remaining branches first to avoid repeating prerequisite commits.

## Behavior and compatibility

`tap_action: {action: more-info}` optionally opens the standard HA entity dialog; an explicit history entity can override the reading source. Keyboard repeat is suppressed. No action remains the default, and unavailable readings can still open history. Only none/more-info are supported; this is not a service-action dispatcher.

## Independent branch checks

Node 22.23.5 / Playwright 1.65.0 with installed Chrome: **25 unit/release
checks and 44 built-browser checks pass**, with no failures or expected
failures. Each stage gets a clean lockfile install, production build, artifact
verification and whitespace check. Later-scope tests enter with their code.
The committed distributable and manifest belong to this stage. Hosted workflow
results are recorded in the PR body and packaging report.

```sh
npm ci --ignore-scripts
npx playwright install chromium
npm run check
git diff --exit-code -- dist/spa-monitor-card.js dist/build-manifest.json
```

Installed Chrome can be selected with `PLAYWRIGHT_CHANNEL=chrome npm run check`.
CI uses pinned Playwright Chromium on Linux and includes HACS validation.
Counts on later branches are cumulative, not independent sets of unique behavior.

## Complete-candidate HA evidence

The completed candidate `c4f40360607939201d384d13171e986d93791d1e` passed **151 checks**:
30 unit, 54 built-browser, 41 actual HA browser, 19 HA/native API and 7 restart
checks. Its bundle SHA-256 is
`c002fccf9e532bb1476e8bd07885deb0b95cb49d7209a02a87a5095a36b6ba1d`.
Packaging checks that the final stack has the identical production inputs,
tests, bundle and manifest. Partial stages are not separately installed in HA,
and packaging does not rerun the previous HA experiment. The complete evidence
is included with stage 4 in `editor-groups-results.json` / `editor-groups.md`.

HA Core 2026.11.1, frontend 20261028.5, Python 3.14.5 and aioesphomeapi 46.25.0
exercise actual Lovelace/services with a synthetic ESPHome native API peer.
The fixture runs neither ESP-IQ2020 firmware nor the RS485 spa bus. Native HA
checks include save/reopen, invalid drafts, focused-field save, nested option
restoration, native history, actual sample expiry, mobile editor/layout and
prior control regressions. Standalone checks include rejected/unresolved service
promises; those are not physical device fault injection. The one-time statistics
migration is preserved, not rerun.

## Remaining hardware and installation validation

Confirm the intended source/history entity and recorder retention in home HA. Native history does not prove sample freshness or sensor health. Derivative units, smoothing/windows and trend presentation remain outside this PR. No service command, chemical action or fault inference is introduced.

Across the full stack, verify physical Boost/output zero, panel interaction,
ACK/report timing, conflicting/delayed reports, reconnect behavior and suitability
of the existing feedback deadlines. A timeout cannot recall a transmitted command.
No IQ health, expiry or water-safety verdict follows from a color or month estimate.
No dosing command, live-spa validation or firmware change is included. Versioned
installation/cache/rollback and physical acceptance remain release work.

The candidate branch and original dirty checkout are preserved. Packaging does
not connect to home HA, send a physical spa command, merge PRs, flash firmware,
tag or publish a release. Version remains 0.1.1 with changes under Unreleased.
