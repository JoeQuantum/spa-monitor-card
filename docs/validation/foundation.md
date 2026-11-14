# Active-card tests and reproducible release assets

The inherited tests exercised the obsolete pool implementation, and release jobs
could publish an unverified build. This change establishes one active JavaScript
source path and tests the shipped Spa Monitor bundle. It removes unused inherited
TypeScript, pool bundles/assets and tests, preserves MIT attribution and archives
historical documentation. LitElement 2 remains unchanged; build dependencies are
pinned in the lockfile.

Validation date: November 13, 2026. These are stacked contributions: merge
`codex/card-test-foundation`, then `codex/card-numeric-validation`, then
`codex/card-output-intent`. Each branch builds and tests independently against
its declared base. No tag or release is created; package version 0.1.1 is retained
as an unreleased development candidate.

## Results and scope

- Seven unit/release-contract tests pass, including deliberately altered source,
  bundles, filenames, tags and release notes that must be rejected.
- Seven normal browser tests pass; nine explicit expected failures reproduce
  the later numeric and output-control fixes. Expected failures are not fixes.
  Playwright may count expected failures among successful outcomes; the JSON
  report records each case's actual and expected status.
- The application source changes only the build-time version placeholder.
  The rebuilt bundle matches the previously tested foundation SHA-256
  `4dd1922cdaa8e908af5ecfbf2eac48d9402d1e0d6506f196370d04f32897a0ae`.
- Shared CI verifies source/build metadata and the committed distributable.
  Release publishing consumes that verified asset without rebuilding and is the
  only job with write permissions.

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

## Remaining validation

This prerequisite does not fix malformed readings, zero conversion divisors,
ignored entity steps or rapid-click intent. The next two PRs remove the nine
expected failures. No deployment, Home Assistant migration, chemical behavior or
physical Aria acceptance is established by this foundation. Test the complete
stack and installed firmware together before a release.
