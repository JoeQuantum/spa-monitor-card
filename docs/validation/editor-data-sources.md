# Editor suggestions, reading sources and history

Historical candidate: the user subsequently approved the grouped editor.
See [the implemented sensor-group editor](editor-groups.md) for its later
validation; the results below retain the preceding candidate's exact scope.

Offline follow-up to merged PRs #4–#7, based on master
`d263d0dc1b529280e211a247b99529012527f570`. Package version remains 0.1.1;
these are Unreleased changes. This work preserves the four-gauge presentation
and the existing visual editor's arrangement.

## Behavior reviewed

- **C09, partial:** Suggestions use HA entity-registry device IDs. One configured
  device supplies an implicit scope; optional `device_id` selects one explicitly.
  Mixed-device configuration displays a warning and does not choose a device.
  Existing helper/offline selections remain available in their own fields, and
  custom IDs can be entered deliberately. Scope affects suggestions, never the
  configured source. With no registry metadata or identifiable device, no
  identity is inferred from a name. Existing custom sensor entries are editable;
  clearing one keeps its row and options available for re-selection in that
  editor session. YAML extensions and numeric zero survive changes.
- **C10, offline implementation complete:** A requested numeric attribute never
  falls back to unrelated state. Missing/malformed values and unavailable sources
  hide the marker. Optional availability conditions distinguish an unknown gate
  from a known nonmatching state. An explicit sample-time source plus positive
  `max_age` enables expiry. Only valid ISO timestamps with timezone are accepted;
  missing/future times remain unknown. Stale values are labeled and suppressed.
  A fresh timestamp can restore the same numeric reading. HA transport timestamps
  are never substituted for sample time. No default expiry threshold is invented.
- **Freshness lifecycle:** The timer refreshes at the earliest rendered sample's
  expiry without waiting for HA. The render-to-scheduling boundary is covered;
  removal/reconfiguration clears the timer, and visibility changes refresh age.
- **C11, partial:** Opt-in `tap_action: {action: more-info}` opens HA's native
  entity dialog by click, Enter or Space, with an optional explicit history entity.
  Repeated keydown is suppressed. Default behavior is unchanged. The interaction
  sends no spa service command and remains available for unavailable readings.
- **C08, partial:** Long labels wrap, and masonry size uses rendered card height
  when available, with an initial estimate before layout. Existing supported
  widths, themes and optional controls remain covered. New layouts, a wrapper
  change and Sections grid options are not included.

New nested options are validated with field-specific errors without mutating
input. Existing configurations retain their reading behavior unless the new
options are explicitly supplied. Numeric attributes can come from other HA
domains; ordinary state readings still require `sensor.*`.

## Validation

Validated November 14, 2026:

| Suite | Result |
|---|---:|
| Unit/release contracts | 28 passed |
| Built distributable / Chrome | 46 passed |
| Actual HA dashboard/editor / Chrome | 36 passed |
| HA/native ESPHome API and recorder | 19 passed |
| HA and native-peer restart persistence | 7 passed |
| Total | **136 passed; zero final failures or expected failures** |

A fresh browser after restart loaded one card, the four expected readings and
no JavaScript exceptions. Dashboard/resources, entity identities, fixture reports,
statistics and Marketplace authorization persisted. The old public card remains
uninstalled in the lab to prevent duplicate custom-element registration.

The built, installed and HTTP-served assets match SHA-256
`09fe60fb7bb129e959da27606b31c516938791987cda7ad42383ba0b6ad1b70c`.
The build manifest and whitespace check also pass. The case list and versions
are in [editor-data-results.json](editor-data-results.json).

Repository checks use `PLAYWRIGHT_CHANNEL=chrome npm run check` with Node
22.23.5 / Playwright 1.65.0 and the committed lockfile. Standalone tests load the
built distributable. Separate tests use Core 2026.11.1, frontend 20261028.5,
Python 3.14.5 and aioesphomeapi 46.25.0 with actual Lovelace/services and a
synthetic native ESPHome API peer. The existing one-time unitless-statistics
migration was not rerun; current metadata/history and persistence were checked.

Earlier runs retained two harness failures. The history test initially waited
for a zero-size outer dialog host even though the native dialog was open; it
now checks its visible Close control. The new mobile layout test initially
measured during HA's asynchronous masonry-column transition. Five reproductions
showed a transient 55px card settling to 374px with no overflow; the test now
waits for the mobile column before separately asserting overflow and row size.
Neither correction weakened the final behavior assertion. The complete HA
browser suite then passed on the final bundle. No expected-failure annotations
were added.

## Remaining work and limits

Three representative expanded-editor treatments were prepared: a continuous
form, sensor groups and focused tabs. The new form is not implemented pending
the user's choice and approval under the standing design instructions. Existing
editor behavior improvements above are independent of that new arrangement.
Ranges, units, reserve, attribute, availability and freshness fields remain YAML
options. C09 is therefore partial, not complete.

C11 derivative units, windows, smoothing and trend presentation remain separate.
C12 localization/RTL and C13 temperature conversion/ORP presentation are still
planned. No new chemistry thresholds, IQ fault decoder, warm-up state mapping,
maintenance automation or dosing command is introduced.

Actual Aria entity IDs/units, sample-time provenance, monitoring state, warm-up,
lifetime and fault meanings still need installation/protocol evidence (W01/W06/
W07). Configurable contracts do not establish that ESP-IQ2020 exposes a true
sample timestamp. The example age limit is illustrative, not a validated IQ
deadline. The fixture does not run ESP-IQ2020 firmware or the RS485 bus.

Physical Boost/output/panel/report timing, output zero, reconnect behavior,
home HA themes/card-mod and installed-browser acceptance remain open. No home
HA connection, physical command, firmware flash, PR publication or release is
part of this pass. The previous one-time statistics migration is preserved.

## API references

- [HA custom card API](https://contributors.home-assistant.io/frontend/custom-ui/card/)
  defines masonry sizing and more-info events.
- [HA custom editor API](https://contributors.home-assistant.io/frontend/custom-ui/card-editor/)
  defines configuration event integration.
- [HA entity picker source](https://github.com/home-assistant/frontend/blob/dev/src/components/entity/ha-entity-picker.ts)
  documents the picker properties examined during implementation. Compatibility
  is also exercised against the pinned lab frontend, rather than assumed from
  current upstream source alone.
