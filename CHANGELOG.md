# Changelog

Notable changes to Spa Monitor Card. The [inherited pool changelog](docs/UPSTREAM_HISTORY.md) is archived separately.
The format follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Fixed

- Reject malformed and nonfinite readings without drawing a gauge marker; preserve valid zero values and recovery.
- Disable output controls for invalid states or constraints and reject invalid service values.
- Validate positive finite `hours_per_month` and finite nonnegative `hours_reserve` with field-specific errors.
- Honor output entity min/max/step, including fractional steps; disable ineffective boundary actions.
- Retain the latest requested output across rapid clicks, serialize/coalesce service calls, and keep displaying reported state. Clear pending intent on failure, a 15-second report timeout, disconnection or an entity change; never retry automatically.

### Development

- Test the shipped JavaScript bundle in a browser and explicitly track known failing cases.
- Verify source hashes, artifact hashes, versions and release notes before publishing the tested asset.
- Remove the unused TypeScript implementation, inherited pool bundles and assets; preserve upstream attribution and historical documentation.
- Update the Rollup build tools while retaining the current LitElement 2 runtime family.

## [0.1.1] - 2026-05-29

### Fixed

- IQ sensor months-left math now accounts for the FreshWater IQ's 508-hour forced-stop reserve and uses an accurate 730.5 hours/month (was dividing raw hours by 720 with no reserve offset).

### Added

- `hours_reserve` and `hours_per_month` sensor preset fields (overridable per-sensor) for the `hours_to_months` display format.

### Changed

- `iq_sensor` preset zones recalibrated to the usable 508–10,000 hour range so the gauge arrow reaches the bottom at the forced-stop threshold rather than at 0 hours.
