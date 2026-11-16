# Trend options in the approved sensor-group editor: PR validation

Packaging date: November 16, 2026. Stage 3 of three stacked PRs:
native HA layout → trend captions/data → trend editor options.
Each successor targets the previous branch, so its diff contains its own scope.
Merge in order and retarget the next PR to master. If squash-merging, rebase the
remaining stack first to avoid repeating prerequisite commits.

## Behavior and compatibility

Expose trend entity/attribute, exact unit, precision, deadband/hysteresis, availability and sample age inside the approved Sensor groups editor. Deep patches preserve nested extensions and siblings; incomplete drafts are withheld from HA until valid. Toggle restoration, zero/default semantics, helper selection and focused-field save are covered. This stage does not change caption rendering or its data semantics.

The Gauges with captions proof was explicitly approved on November 15, as was
the prior Sensor groups editor treatment. Packaging introduces no new design.

## Branch validation

This stage passed **37 unit/release and 67 built-browser checks** with
Node 22.23.5, Playwright 1.65.0 and installed Chrome. Fresh results and hosted
workflow links are recorded in the PR body. Counts are cumulative per stage,
not separate sets of unique tests. Each branch receives a clean lockfile install,
production build, source/artifact verification and whitespace check; the built
bundle and manifest are committed with that stage. Later tests enter with their
implementation. GitHub checks use pinned Playwright Chromium and HACS validation.

```sh
npm ci --ignore-scripts
npx playwright install chromium
npm run check
git diff --exit-code -- dist/spa-monitor-card.js dist/build-manifest.json
```

Use `PLAYWRIGHT_CHANNEL=chrome npm run check` for locally installed Chrome.

## Previous complete-candidate HA run

Candidate `6e993afd750d13bc1c877e7d0074f637fd245055` passed **184 checks on November 15**:
37 unit/release, 67 built-browser, 41 actual HA browser, eight rendered-trend/editor,
five layout/helper, 19 native API/recorder and seven restart/persistence checks.
Packaging reruns each branch's local checks, not that earlier HA experiment;
partial stages are not separately installed in the lab. The final stack must
reproduce the candidate's production/test/build inputs, bundle and manifest.

Candidate bundle SHA-256:
`14b45a051668961169c5eed49db9c75ebc66683f3e1fded17d15384a83c1ae86`.
Candidate manifest SHA-256:
`21b54d13a96a26e50a2c0f5df4240387b9e22c1ca27f9e4789de5be8f3140b8b`.

The HA lab uses Core 2026.11.1/frontend 20261028.5, Python 3.14.5 and
aioesphomeapi 46.25.0 with a synthetic native API peer. It runs actual Lovelace,
helpers, editor, services and recorder, but no ESP-IQ2020 firmware or spa bus.
Actual `ppm/h` and `/h` helpers, both rate signs, editor save/reopen, invalid
drafts, nested options, sample expiry, themes, phone widths and native history
were tested. Accelerated rates and zero averaging windows are fixtures, not
recommended spa settings. Both managed processes restarted normally; baseline
resources/entities/history and Marketplace authorization persisted.

## Remaining hardware and installation validation

Confirm actual Aria helper/source selection, units and sample-time provenance in the home editor. Invalid drafts remain local to the current editor session; closing/reloading does not save them. New custom sensor definitions and breakpoint arrays remain YAML tasks.

Across the stack, physical Boost/output zero, panel interaction, ACK/report
timing, delayed/conflicting reports, reconnect behavior and feedback deadlines
remain unvalidated on the Aria. A timeout cannot recall a sent command. A flat
rate, color or month estimate does not establish freshness, water safety, IQ
health, expiry or a dosing need. No dosing control or firmware change is added.
Home themes/browsers and versioned installation/cache/rollback remain release
acceptance work. Optional additional-reading layouts, localization/RTL and
temperature/ORP are outside this stack.

The original dirty checkout and completed candidate branch are preserved.
Packaging does not access home HA, issue physical spa commands, merge PRs, flash
firmware, tag or publish a release. Version remains 0.1.1 with Unreleased notes.

## Review evidence

[All prior candidate case names and counts](trend-candidate-results.json) and
[implementation validation](trend-displays.md) are committed with this stage.

Actual HA screenshots use simulated readings, not live spa data:
[desktop captions](trend-captions-desktop.png), [mobile captions](trend-captions-mobile.png),
[desktop editor](trend-editor-desktop.png), [mobile editor](trend-editor-mobile.png).
The large derivative in the editor fixture comes from accelerated test updates.
