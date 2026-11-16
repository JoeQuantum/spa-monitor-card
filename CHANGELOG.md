# Changelog

Notable changes to Spa Monitor Card. The [inherited pool changelog](docs/UPSTREAM_HISTORY.md) is archived separately.
The format follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Layout integration and trends

- Use the native Home Assistant card wrapper and content-driven Sections sizing while retaining the established gauge presentation and CSS overrides.
- Add the approved Gauges with captions treatment for optional numeric derivative sources, with exact rate units (including unitless `/h`), direction hysteresis and accessible unrounded values. Label displayed month counts as estimates.
- Hide trends when either reading fails availability/freshness checks; expire captions without a new report and reset direction across data gaps, reconfiguration and card removal.

### Added

- Read explicitly configured numeric attributes, gate readings on an availability entity, and expire readings using an explicit sample timestamp and maximum age.
- Open Home Assistant's history/details dialog from an opt-in gauge action, with pointer and keyboard support.
- Scope editor suggestions by registry device identity, retain configured helpers and expose existing custom sensor entries.
- Add the approved expandable sensor-group editor for ranges, units, precision, lifetime conversion, attributes, availability, sample age and history, plus a device scope selector. Preserve invalid drafts without publishing them and restore removed advanced options within the editor session.

### Fixed

- Wrap long gauge labels/values and report rendered height to the masonry layout when available.
- Validate nested configuration, entity domains, finite scales, decimals and supported display options before rendering, with field-specific errors.
- Apply preset min/max overrides to the scale endpoints while retaining interior thresholds; validate explicit zones and expose range/band text equivalents.
- Send explicit Boost on/off requests, suppress duplicate pending actions, and recover from service failure, missing reports and disconnects without replay.
- Support keyboard activation and visible focus for Boost/output controls, reported/pending state announcements and gauge text equivalents.
- Honor inherited `--spa-*` overrides across light, dark, glass and automatic themes without replacing theme defaults.
- Preserve advanced entity options when clearing/reselecting within the editor session; provide an unambiguous placeholder starter configuration.
- Correct scale documentation and label IQ months/reserve as a configurable estimate based on owner reports.
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
