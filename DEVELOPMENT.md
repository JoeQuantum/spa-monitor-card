# Developing Spa Monitor Card

Use **Node 22** (`.nvmrc`) and the committed npm lockfile. Node 22.23.5 was used
for the foundation checks on November 13, 2026.

```sh
npm ci --ignore-scripts
npx playwright install chromium
npm run check
```

On Linux, Playwright may need `npx playwright install --with-deps chromium`.
For an already installed Chrome browser, `PLAYWRIGHT_CHANNEL=chrome npm run check`
is an alternative local check. CI uses Playwright's pinned Chromium.

## Supported implementation

| File | Responsibility |
|---|---|
| `src/spa-monitor-card.js` | Lovelace card, readings and service interactions |
| `src/readings.js` | Explicit attribute, availability and sample-age contracts |
| `src/config.js` | Field-specific validation and scale resolution without entity discovery |
| `src/spa-monitor-card-editor.js` | Visual configuration editor |
| `src/sensors.js` | Presets and piecewise indicator positioning |
| `src/numbers.js` | Strict numeric parsing and bounded number-entity steps |
| `src/styles.js` | Existing visual presentation |
| `rollup.config.js` | Builds the distributable and records its inputs |
| `dist/spa-monitor-card.js` | The single HACS and manual-installation asset |

The unused inherited TypeScript implementation, its tests, pool bundles and pool
images are removed. The original plan and upstream changelog are under `docs/`
as historical records, not supported features. `reference/water-quality-mockup.jsx`
is a design reference only; it is not compiled or installed. MIT notices are
retained in `LICENSE` and in the distributed bundle.

## Tests

`npm test` checks the active sensor module and release verification. The artifact
test deliberately changes source, a bundle, a filename, a tag and release notes
inside a temporary fixture to prove those failures are rejected.

`npm run test:browser` loads **the built distributable** into a real browser. It
does not import a substitute card implementation. Home Assistant state and
`callService` are mocked; outbound page requests are blocked. Coverage includes
configuration, readings, unavailable states, lifecycle formatting, controls,
editor preservation, theme rendering, multiple instances and narrow widths.
It is not an end-to-end test inside a real Home Assistant dashboard.

This branch has **25 unit/release checks** and **45 built-browser checks**,
with no expected failures. Current PR scope: C08 partial: wrapping and rendered-height masonry sizing; the existing card layout remains.
See `docs/validation/packaged-layout-sizing.md` for stage checks and remaining hardware validation.
Earlier dated validation reports retain their historical scope.

Keep the existing design baseline while fixing behavior. New visual directions
require representative options, a selection and approval before rollout.

## Build and release contract

`npm run check` runs unit tests, builds, tests that bundle in Chromium, then
verifies the artifact. `npm run build` fills the console version from
`package.json` and writes `dist/build-manifest.json`. The manifest hashes the
entire source directory, build scripts, package/lockfile, license, HACS metadata,
changelog and distributable. It contains no timestamps or machine-specific paths.

Commit the rebuilt bundle and manifest with a source change. CI rebuilds from
`npm ci` and rejects a difference from the committed artifacts. This comparison,
together with browser testing, establishes that the committed and tested asset
come from the checked-out source. A hash manifest alone is not a security signature.

Before a release:

1. Update `package.json` and the lockfile version, and add a nonempty exact-version
   section to `CHANGELOG.md`.
2. Run `npm run check` and `npm run verify:artifact -- vX.Y.Z` with that version.
3. Commit source, metadata, bundle and manifest together, then use the matching tag.

The release workflow calls the same verification workflow, checks the tag and
notes, and uploads the verified build as a workflow artifact. Its separate
publish job downloads that artifact, rechecks its hash and version, and publishes
it without rebuilding. Only the publish job has `contents: write`. HACS's
`filename` and manual installation both use `spa-monitor-card.js`.

The foundation work keeps package version 0.1.1 and adds an Unreleased changelog
entry. It does not publish or retag an existing release. Real HA validation of the
complete candidate is described in `docs/validation/packaged-editor.md`; physical
acceptance remains separate.

## Dependency decisions — November 13, 2026

- Build tools: Rollup 4.68.3, node-resolve 16.0.3, terser plugin 1.0.2; all pinned.
  The lockfile also updates picomatch to 4.0.7, beyond the
  [4.0.4 security fix](https://github.com/advisories/GHSA-c2c7-rcm5-vvqj).
- Runtime: retain and pin LitElement 2.5.1 / lit-html 1.4.1, the existing resolved
  runtime family. A Lit 3 migration needs its own HA compatibility work and is
  not necessary for the foundation or the upcoming correctness fixes.
- Browser harness: Playwright 1.65.0, pinned with its Chromium revision.
- `npm audit` leaves two low-severity entries for **one underlying advisory**:
  [deepmerge prototype poisoning](https://github.com/advisories/GHSA-gcqx-w48m-w2h4),
  plus its dependent node-resolve package. The advisory lists no patched release;
  npm suggests downgrading node-resolve to 7.1.3. Retain node-resolve 16 and track
  an upstream patch instead of downgrading the supported build pipeline.
  This dependency processes repository-controlled build configuration and is not
  included in the browser runtime. `npm audit --omit=dev` reports no advisories.

Recheck advisories when updating the lockfile. The decision above records a
specific residual build dependency, not a claim that the complete tree is free
of advisories. Build-tool upgrades were tested before pinning the unchanged
runtime versions, followed by a clean installation and the complete card checks.
