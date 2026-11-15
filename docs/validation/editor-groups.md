# Approved sensor-group editor

The user explicitly approved **Sensor groups** from the three representative
proofs on November 14, 2026. This follow-up implements that treatment on the
data-source candidate `166b41632e56d40d485dc2a8f10a378308b7e7af`.
It completes C09's offline editor scope; actual installation mapping remains W01.
The dashboard card's visual treatment is unchanged.

## Editable configuration

| Area | Fields |
|---|---|
| General | Title, theme and registry device for primary entity suggestions |
| Reading | Entity, label, unit, minimum/maximum, linear scale, decimals, gradient |
| Lifetime | Display format, reserve hours and hours per estimated month |
| Data source | Exact numeric attribute; optional availability entity/state |
| Freshness | Explicit timestamp entity/attribute and maximum sample age in minutes |
| Interaction | Default/none/more-info action and optional history entity |
| Controls | Existing output and Boost entity selection/removal |

Native `details`/`summary` groups support keyboard expansion and retain their
open state through unrelated edits. The layout uses the approved grouped form,
paired bounds, existing HA theme variables and native entity pickers. Device
names come from HA registry metadata; duplicate names are disambiguated with IDs.
Explicit offline scopes remain selectable. Choosing a scope never rewrites a
configured source. Helper pickers permit deliberate sources outside that device.

New custom sensor definitions and breakpoint arrays remain YAML editing tasks.
Existing custom entries appear in the editor. Breakpoints, `setpoint` metadata
and unknown extensions are preserved; they are not silently flattened to presets.
The linear checkbox restores prior custom breakpoints when switched off within
the same editor session. It still requires valid custom min/max bounds.

## Draft and reset behavior

Inputs apply when the field changes on blur. The same full-config validator used
by the card runs before publishing `config-changed`. Invalid drafts remain visible
with an alert and inline text-field feedback; HA keeps its last accepted config.
An echoed accepted config does not erase the draft. Correcting it publishes the
valid accumulated changes; **Discard pending edits** restores accepted values.
A different external YAML configuration replaces the draft. Pending edits are
local to the open editor and are not saved through closing/reloading it.

Numeric zero and explicit blank units are retained. Clearing a numeric/label
override restores its default. **Use default unit** removes the unit override,
whereas clearing Unit hides it. The sample-age field converts minutes to YAML
seconds without changing untouched input values. No age limit is guessed.

Availability/freshness enablement remains a draft until the required source and
settings are complete. Turning optional settings off and back on retains nested
extensions within the session, as does clearing/reselecting custom sensors or
controls. Action changes retain an explicit history source and its extensions.

## Validation

Validated November 14, 2026:

| Suite | Result |
|---|---:|
| Unit/release contracts | 30 passed |
| Built distributable / Chrome | 54 passed |
| Actual HA dashboard/editor / Chrome | 41 passed |
| HA/native ESPHome API and recorder | 19 passed |
| Both lab processes restarted / persistence | 7 passed |
| Total | **151 passed; no failures or expected failures** |

The build/manifest and whitespace checks also pass. Built, installed and
HTTP-served assets match SHA-256:
`c002fccf9e532bb1476e8bd07885deb0b95cb49d7209a02a87a5095a36b6ba1d`.
The complete case list is in [editor-groups-results.json](editor-groups-results.json).

The implementation is tested from the built distributable with Node 22.23.5
and Playwright 1.65.0 / installed Chrome. Standalone tests exercise the documented
HA picker event boundary and recovery from malformed `device_id` YAML without
crashing the selector. Actual HA tests exercise native pickers, save/reopen,
saving the last focused field, invalid-draft correction, nested option toggles,
device selection and the phone-width dialog. Desktop/mobile screenshots were
visually inspected. The five new HA cases pass alongside all prior regressions.

The lab uses Core 2026.11.1, frontend 20261028.5, Python 3.14.5 and aioesphomeapi
46.25.0. Both processes restarted gracefully. Resources/dashboard, entity
identities/reports, statistics and Marketplace authorization persisted. A fresh
browser loaded the four expected readings without JavaScript errors. The old
public card stays uninstalled in the lab to avoid duplicate registration. Test
state entities were removed and the baseline dashboard restored.

The one-time unitless-statistics experiment remains unchanged; this pass checks
current metadata/history and persistence. No source or unit migration was
recreated. Earlier validation records retain their original scope and counts.

## Remaining acceptance

This is a local Unreleased candidate, not a published release. Real Aria entity
IDs/units, sample-time provenance, monitoring/warm-up/lifetime/fault mappings,
physical Boost/output/report timing and home theme/card-mod/browser acceptance
remain open. The lab uses a synthetic native ESPHome API peer, not ESP-IQ2020
firmware or RS485 traffic. No home HA, spa command or firmware flash is involved.

C08 layout extensions, C11 derivative/trend presentation, C12 localization/RTL
and C13 temperature/ORP presentation remain separate planned work. No sampling
deadline, fault decoder, chemical threshold or dosing behavior was added here.

See the [README](../../README.md#configuration) for configuration/reset semantics,
and [the preceding validation](editor-data-sources.md) for data-source contracts.
