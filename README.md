# Spa Monitor Card

Home Assistant Lovelace card for HotSpring/ESP-IQ2020 water quality monitoring with vertical bar gauges, triangle indicators, and integrated salt system controls.

Fork of [pool-monitor-card](https://github.com/wilsto/pool-monitor-card) by [wilsto](https://github.com/wilsto), redesigned for salt water care systems.

![screenshot](docs/screenshot.png)

Screenshot from the published v0.1.1; current development retains the gauges and
adds optional trend captions beneath their readings.

---

## Features

- **Vertical bar gauges** with color-coded gradients (red/yellow/green zones)
- **3D triangle indicators** positioned by current sensor value
- **Salt system controls**: bounded output stepper and acknowledged Boost on/off requests
- **4 theme modes**: auto, light, dark, and glass (visionOS-style)
- **Visual config editor** with expandable sensor groups, device-scoped suggestions and validated reading options
- **Optional trend captions** from explicit numeric rate entities, with units, hysteresis and sample-age checks
- **Glassmorphism design** with backdrop blur and translucent surfaces
- **Fully customizable** via CSS custom properties and card-mod

---

## Installation

### HACS (recommended)

1. Open [HACS](https://hacs.xyz/) > Frontend > three-dot menu > Custom repositories
2. Add `https://github.com/JoeQuantum/spa-monitor-card` with category **Plugin**
3. Search for **Spa Monitor Card**, install, and reload your browser

### Manual

1. Download `spa-monitor-card.js` from the [latest release](https://github.com/JoeQuantum/spa-monitor-card/releases)
2. Copy to `config/www/spa-monitor-card/spa-monitor-card.js`
3. Add resource in Settings > Dashboards > Resources:
   - URL: `/local/spa-monitor-card/spa-monitor-card.js`
   - Type: JavaScript Module

---

## Configuration

The card includes a **visual config editor** with expandable sensor groups.
The starter uses `sensor.replace_with_spa_ph`; select your own entity before use.
It intentionally selects no real device when several spas may be present. Each
group includes entity, label, unit, range, decimals, gradient, display format,
IQ reserve/conversion, attribute, availability, sample age, history and trend options.
The entity IDs below are illustrative, not discovered or verified Aria mappings.
Confirm your ESP-IQ2020 entities and units, especially the source of the salt value.

The editor scopes suggestions to the one device represented by the configured
sensor/control entities, using HA's entity registry rather than names. An optional
top-level `device_id`, also available in the device selector, explicitly selects
the suggestion scope. A mixed-device
configuration is flagged; without an explicit scope it suggests no additional
entities. This never rewrites existing selections. Existing helper/offline IDs
remain selectable in their own field, and custom IDs can be entered deliberately.
Device scope filters suggestions only, not the data the card displays. Availability,
timestamp, history and trend pickers allow explicit helper sources outside that device.
Existing custom sensor entries also appear in the editor. Add new custom sensor
definitions and edit custom breakpoint arrays in YAML; the editor preserves them.

Field edits apply when you leave the field and the full configuration is valid.
Errors keep the draft visible without replacing HA's last accepted configuration.
Correct the fields before saving, or use **Discard pending edits**. A genuinely
different YAML configuration replaces the draft. Invalid local edits do not
survive closing the editor or reloading the page.

Blank numeric/label overrides restore the preset; preset values appear as
placeholders. A blank **Unit** explicitly hides its unit; **Use default unit**
removes that override. Zero is retained. The **Use a linear scale** checkbox
temporarily replaces preset/custom breakpoints; switching it off restores the
previous breakpoints during that editor session. Custom sensors still need
valid bounds. Availability/freshness switches and the reading-action selector
likewise preserve removed advanced options for restoration within the session.

The editor shows maximum sample age in **minutes** and stores `freshness.max_age`
in **seconds**. Enabling availability or freshness creates an incomplete draft
until its required source/settings are supplied; no device state, timestamp or
sampling deadline is guessed. Unknown YAML extension fields are retained.

### Full example

```yaml
type: custom:spa-monitor-card
title: Water Quality
theme: auto
sensors:
  chlorine:
    entity: sensor.hot_tub_iq_chlorine
  ph:
    entity: sensor.hot_tub_iq_ph
  salt:
    entity: sensor.hot_tub_iq_salt
  iq_sensor:
    entity: sensor.hot_tub_iq_hours_left
controls:
  output_level:
    entity: number.hot_spring_aria_salt_power
  boost:
    entity: switch.hot_spring_aria_salt_boost
```

### Card options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | *(none)* | Card title. Omit to hide the header row. |
| `theme` | string | `auto` | `auto`, `light`, `dark`, or `glass`. See [Themes](#themes). |
| `sensors` | object | **required** | At least one sensor must be defined. |
| `controls` | object | *(none)* | Optional salt system controls. Omit to hide the controls row. |
| `device_id` | string | *(inferred when possible)* | Optional HA device registry ID to scope editor suggestions. It does not change configured entities. |

### Predefined sensors

The four sensors below have built-in defaults. Just provide an `entity` and the rest is filled in automatically.

| Sensor ID | Name | Unit | Min | Max | Green Range | Gradient | Display Format |
|-----------|------|------|-----|-----|-------------|----------|----------------|
| `chlorine` | Chlorine | ppm | 0 | 10 | 1.0 – 5.0 ppm | standard | numeric |
| `ph` | pH | *(none)* | 6.0 | 9.0 | 7.2 – 7.8 | standard | numeric |
| `salt` | Salt | ppm | 1000 | 3000 | 1500 – 2000 ppm | standard | numeric |
| `iq_sensor` | IQ Sensor | hours | 508 | 10000 | 1969+ hours (~2+ mo) | depletion | hours_to_months |

The chemistry target bands retain the project's FreshWater reference ranges.
Other breakpoints, bar proportions and the IQ countdown bands are project display
choices. A green band is not proof of water safety or sensor health. The IQ reserve
is based on owner observations, not a universal manufacturer expiry threshold.
See [preset provenance](docs/range-provenance.md) for manual editions, PDF pages,
units, owner reports and the distinction between documented ranges and display choices.

### Per-sensor options

Any preset default can be overridden:

```yaml
sensors:
  chlorine:
    entity: sensor.hot_tub_iq_chlorine
    name: "Free Cl"
    unit: "ppm"
    min: 0
    max: 10
    decimals: 1
    gradient: standard
    display_format: null
```

| Option | Type | Description |
|--------|------|-------------|
| `entity` | string | **Required.** A `sensor.*` entity ID, or another HA domain when reading an explicit numeric `attribute`. It need not be loaded when configuration is saved. |
| `name` | string | Override the display label above the bar. |
| `unit` | string | Override the unit shown after the value. |
| `min` | number | Finite lower bound, less than `max`; see scale overrides below. |
| `max` | number | Finite upper bound, greater than `min`; see scale overrides below. |
| `decimals` | integer | Decimal places, 0–100 (default varies by sensor). |
| `gradient` | string | `standard` (red-yellow-green-yellow-red) or `depletion` (green-yellow-red). |
| `display_format` | string or null | `numeric` or `null` shows the number; `hours_to_months` shows an estimated month count. |
| `zones` | array or null | Ordered value/position breakpoints; `null` explicitly selects a linear min/max scale. |
| `attribute` | string | Optional exact attribute name on the source entity. Missing/invalid attributes never fall back to its state. |
| `availability` | object | Optional `{entity: binary_sensor.monitoring, state: "on"}` condition; `state` defaults to `on`. Unknown/missing availability does not pass. |
| `freshness` | object | Explicit sample timestamp source and positive `max_age` in seconds; see below. No freshness inference is enabled by default. |
| `tap_action` | object | Optional `{action: more-info}` to open HA history/details; `entity` can explicitly override the source. Default action is `none`. |
| `trend` | object | Optional numeric rate source and exact reported unit, displayed below the reading; see [Trend captions](#trend-captions). |
| `hours_reserve` | number | Hours subtracted from the value before the months conversion. Defaults to `0`; the `iq_sensor` preset uses an owner-reported `508`-hour reserve, configurable for your installation. |
| `hours_per_month` | number | Divisor used by `hours_to_months`. Defaults to `730.5` (365.25 × 24 / 12). |

#### display_format: hours_to_months

The `hours_to_months` format computes `max(0, (value − hours_reserve) / hours_per_month)` and rounds to the nearest integer. This is the default for the `iq_sensor` preset.

`hours_per_month` must be a finite number greater than zero, and `hours_reserve`
must be a finite nonnegative number. Invalid options produce a field-specific
configuration error. Malformed or nonfinite sensor states show `---` without a
marker; numeric zero remains a valid reading.

Two owners reported IQ monitoring stopping with 508 hours still displayed:
[first report](https://github.com/Ylianst/ESP-IQ2020/issues/42#issuecomment-3287918736)
and [second report](https://github.com/Ylianst/ESP-IQ2020/issues/42#issuecomment-3324424968).
The preset retains this configurable reserve. The calculation gives about 13
average months from 10,000 raw hours; it is not a guaranteed calendar service life.
A rounded `0 mo` does not by itself establish expiry. The gauge tooltip and
accessible description retain raw hours and identify the displayed month estimate.
This measuring sensor is distinct from the chlorine-generating salt cartridge.

#### Validation and scale overrides

`sensors` must be a nonempty object; each sensor and optional control must be an
object. Entities use `sensor.*` for state readings (other domains require an
explicit numeric attribute), `number.*` for output, and `switch.*` for Boost.
Known options are checked before the card is rendered, including options supplied
while their display format is inactive. Errors identify the YAML field. Unknown
extension fields on the card, sensors and supported controls are preserved.

A custom sensor needs an entity, a nonempty `name` and a complete finite scale:
`min` and `max`, or a `zones` array whose endpoints provide those bounds. Unit
(default empty), decimals (default 1) and gradient (default `standard`) are optional.

Preset `min`/`max` overrides replace only the outer scale endpoints. The existing
interior thresholds retain their values and positions. For example, chlorine
`max: 20` extends the top segment while 1–5 ppm remains at 20–80% from the bottom.
A bound that crosses an interior threshold is rejected; supply explicit `zones`
for a different piecewise scale, or `zones: null` for an intentionally linear scale.
This is a behavior change from older builds that silently ignored preset bounds.

Each zone has finite `value` and `position`. List values in strictly descending
order and positions in strictly increasing order, from 0 (top) to 100 (bottom).
The endpoints must match any explicitly supplied max/min. With explicit zones
and no explicit bounds, the endpoints determine max/min. Duplicate, reversed or
incomplete scales produce a configuration error.

```yaml
sensors:
  custom_reading:
    entity: sensor.my_spa_reading
    name: Custom reading
    unit: units
    decimals: 0
    min: 0
    max: 100
    zones:
      - {value: 100, position: 0}
      - {value: 60, position: 20}
      - {value: 20, position: 80}
      - {value: 0, position: 100}
```

The bar colors stay at their documented percentage bands. The scale maps readings
to those positions piecewise; there is no automatic chemical-range inference for
custom sensors. `setpoint` is retained as finite metadata and does not draw a marker
or alter the scale.

### Reading sources, availability and sample age

```yaml
type: custom:spa-monitor-card
sensors:
  ph:
    entity: sensor.my_spa_measurements
    attribute: ph
    availability:
      entity: binary_sensor.my_spa_monitoring
      state: "on"
    freshness:
      attribute: sampled_at
      max_age: 5400
    tap_action:
      action: more-info
```

This is an illustrative contract, not a discovered ESP-IQ2020 configuration or a
recommended sampling deadline. Only enable freshness when the configured source
really identifies the chemical sample time. `freshness.attribute` refers to an
attribute of the reading's entity unless `freshness.entity` names another entity.
Without an attribute, an explicit timestamp entity's state supplies the time.
For example, `freshness: {entity: sensor.my_spa_sample_time, max_age: 5400}`.

Timestamps must be ISO 8601 strings with seconds and a timezone, such as
`2026-11-14T12:00:00Z` or `2026-11-14T04:00:00-08:00`. Missing, malformed or future
sample times yield an unknown reading. At `max_age` the value changes to `Stale`
and the marker is hidden, even if HA sends no further updates. A newer timestamp
can restore an unchanged numeric value. Numeric Unix timestamps are not accepted
implicitly; convert them explicitly in your source configuration.

HA's `last_changed`, `last_updated` and ordinary ESPHome polling are never used
as a substitute for a chemical sample time. With no freshness option, the card
continues displaying valid reported values without asserting that they are fresh.
Availability/freshness conditions suppress only the configured gauge; they do
not acknowledge a test, change salt output, or decode IQ faults. An unavailable
source remains unavailable even if its cached attributes contain numbers.

The optional `more-info` action opens Home Assistant's standard entity dialog
using click, Enter or Space. It sends no spa service command and is also useful
for inspecting history while a current reading is unavailable. A trend caption
shares the gauge's configured history action; it does not change its target.

### Trend captions

Enable **Show trend caption** in a sensor group, select a numeric derivative
entity and enter its exact reported rate unit. The entity picker allows helpers
outside the selected spa device. The caption uses the approved Gauges with
captions treatment: `Rising 0.02 /h`, `Falling 0.12 ppm/h`, or a signed numeric
rate within the direction deadband. Estimated month readings also show
`Estimate`. Direction and the unrounded rate are included in the gauge's
accessible description. Captions wrap at narrow widths.

```yaml
sensors:
  ph:
    entity: sensor.spa_ph
    trend:
      entity: sensor.spa_ph_derivative
      unit: /h  # Must match this entity's unit_of_measurement exactly.
      decimals: 2
      deadband: 0.02
      hysteresis: 0.005
```

These IDs and thresholds are illustrative, not discovered Aria entities or
recommended noise limits. With those example thresholds, a rising direction
starts at `0.025 /h` and clears at `0.015 /h`; falling uses the negative
counterparts. Between those thresholds the previous direction is retained.
Zero has no direction. Tiny nonzero changes display, for example,
`Rising < 0.01 /h` instead of a directed zero.

| Trend option | Default | Meaning |
|---|---|---|
| `entity` | Required | Numeric `sensor.*` rate; other domains require an explicit numeric `attribute`. |
| `unit` | Required | Exact entity `unit_of_measurement`, ending in `/s`, `/min`, `/h` or `/d`. Unitless inputs may produce `/h`. No unit conversion or relabeling occurs. |
| `attribute` | None | Exact numeric attribute to read instead of state; missing attributes never fall back. The containing entity must report the declared rate unit. |
| `decimals` | `2` | Integer from 0 to 6. |
| `deadband` | `0` | Finite nonnegative direction threshold in the declared rate unit. |
| `hysteresis` | `0` | Finite value between zero and deadband; expands the entry threshold and lowers the exit threshold. |
| `availability` | None | Same explicit entity/state condition as the primary reading. |
| `freshness` | None | Same explicit timestamp and `max_age` contract as the primary reading; seconds in YAML, minutes in the editor. |

Both the primary reading and rate must be valid and pass their configured
availability/age checks. A missing or mismatched rate unit hides the caption.
Age checks expire without another HA report. Direction resets on unavailable
data, elapsed freshness, reconfiguration and card removal. Omitting `trend`
disables it; toggling it off/on in the editor preserves its options within that
session. Incomplete settings stay as an invalid draft until corrected.

Use Home Assistant's numeric [Derivative helper](https://www.home-assistant.io/integrations/derivative/),
not the boolean Trend helper. Configure averaging and time units upstream;
the card does not estimate rates from browser updates or smooth values itself.
Choose a window and thresholds after inspecting actual sample cadence and noise.
HA may recalculate a derivative without a new measurement when its optional
max sub-interval is configured. Such updates, and a flat rate, do not prove
sample freshness. No age limit is inferred; provide trustworthy sample-time
sources explicitly when available. A trend is not a water-safety or dosing
recommendation.

### Controls

| Control | Type | Entity pattern | Description |
|---------|------|----------------|-------------|
| `output_level` | number | `number.*_salt_power` | Salt system output stepper. Min/max/step come from the entity; unavailable or invalid states disable control. |
| `boost` | switch | `switch.*_salt_boost` | Explicit Boost on/off request. The keyboard-accessible button displays reported state. |

Both controls are optional. Omit the `controls` section entirely to hide the controls row and divider.

Output clicks build on the latest requested value while the displayed number
continues to show the device report. Calls are serialized; clicks during a call
coalesce to the latest target. The output control's tooltip identifies pending,
failed or timed-out requests. A matching report settles the request; service
success alone does not. Pending intent clears after 15 seconds without matching
feedback, on service failure, unavailability, changed constraints/entity, or
removing the card. No automatic retries or reconnect replay are performed.

Boost sends `switch.turn_on` or `switch.turn_off` from the reported state. It stays
disabled while waiting for a matching report so repeated taps cannot reverse an
unconfirmed request. Service success alone does not settle the request. A service
error, 15-second timeout, invalid/unavailable report, entity change or removal
clears pending intent; an old promise cannot affect a newer request. No remaining
Boost duration is inferred. Boost and configured output level stay separate.
Physical panel/firmware timing still needs validation; a timeout cannot recall an
already-sent command.

Both controls support Tab navigation, Enter/Space activation and visible focus.
Reported values, pending/failure status and gauge band/range descriptions are
available to assistive technology. Gauge tooltips expose the same text without
changing the existing layout.

---

## Sensor Ranges

Each gauge uses a piecewise scale. Percentages below are measured **from the
bottom**; raw zone positions in YAML are measured from the top. Indicator centers
are padded to 5–95%, while the underlying scale and color bands span 0–100%.
Readings outside min/max remain visible numerically and have explicit below/above
range text; they do not extend the indicator outside the bar.

| Preset | Red low: 0–10% | Yellow low: 10–20% | Green: 20–80% | Yellow high: 80–90% | Red high: 90–100% |
|---|---|---|---|---|---|
| Chlorine (ppm) | 0–0.5 | 0.5–1 | 1–5 | 5–8 | 8–10 |
| pH | 6–6.8 | 6.8–7.2 | 7.2–7.8 | 7.8–8.2 | 8.2–9 |
| Salt (ppm) | 1000–1250 | 1250–1500 | 1500–2000 | 2000–2500 | 2500–3000 |

At shared boundaries, green includes its endpoints; yellow includes the boundary
shared with red. These are display classifications, not alarm thresholds. Confirm
that the configured salt entity represents the expected quantity and units; this
card does not establish a conductivity-to-salt conversion or equate a salt-system
status indicator with an IQ concentration field.

The IQ measuring-sensor countdown uses a depletion scale:

| Configured band | Raw hours | Position from bottom |
|---|---|---|
| Red | 508–654 | 0–10% |
| Yellow | 654–1969 | 10–20% |
| Green | 1969–10000 | 20–100% |

654 is included in yellow and 1969 in green. Values below 508 have an explicit
below-range description. These project bands and the configurable reserve do not
decode an IQ fault or prove a sensor is expired. Monitoring status and confirmed
faults require separate integration evidence; a nonzero countdown is not a sensor
health check.

---

## Home Assistant layout

The card uses Home Assistant's native `ha-card` wrapper and keeps its existing
appearance and public `--spa-*` style overrides. Masonry sizing follows the
rendered height. In Sections, the card requests 12 columns and content-driven
height (`rows: auto`); one or two gauges can use a six-column minimum, while
three or more retain the full-section minimum. Additional layout treatments are
not included in this change.

Keep height automatic when using larger bars, longer labels or controls.
Explicit user-supplied grid sizing and custom CSS can still require adjustment.
See the [HA custom-card contract](https://contributors.home-assistant.io/frontend/custom-ui/card/).
The native wrapper and public variables were checked with card-mod v4.2.1 in the
temporary HA 2026.11.1 lab; this does not certify every installed theme or backdrop.

## Themes

The `theme` option controls the card's appearance. All themes use glassmorphism (translucent backgrounds with backdrop blur).

| Value | Description |
|-------|-------------|
| `auto` | Detects dark/light from Home Assistant's active theme (`hass.themes.darkMode`). |
| `light` | Forces light mode — translucent white card with dark text. |
| `dark` | Forces dark mode — translucent dark card with light text. |
| `glass` | visionOS-style glassmorphism — highly translucent with light text, designed for wallpaper-style dashboard backgrounds. |

The `glass` theme is designed for visionOS-style dashboards where cards float over rich background images. It uses a more translucent background (`rgba(255, 255, 255, 0.08)`) with stronger backdrop blur for a frosted glass effect.

---

## CSS Custom Properties

Theme defaults use private fallback properties so inherited or host-level `--spa-*` overrides work in every theme. Public colors and dimensions are exposed as CSS custom properties for [card-mod](https://github.com/thomasloven/lovelace-card-mod) overrides. All properties use the `--spa-` prefix.

### Card container

| Variable | Default (light) | Description |
|----------|-----------------|-------------|
| `--spa-card-bg` | `rgba(255, 255, 255, 0.72)` | Card background color |
| `--spa-card-border` | `rgba(0, 0, 0, 0.12)` | Card border color |
| `--spa-card-shadow` | `0 2px 16px rgba(0,0,0,0.08), ...` | Card box shadow |
| `--spa-card-radius` | `16px` | Card border radius |
| `--spa-card-blur` | `40px` | Card backdrop blur amount |
| `--spa-card-padding` | `16px` | Card inner padding |

### Typography

| Variable | Default (light) | Description |
|----------|-----------------|-------------|
| `--spa-header-color` | `rgba(0, 0, 0, 0.75)` | Header title text color |
| `--spa-label-color` | `rgba(0, 0, 0, 0.6)` | Sensor label and Output Level label color |
| `--spa-value-color` | `rgba(0, 0, 0, 0.45)` | Sensor value text color |
| `--spa-trend-color` | Uses label color | Trend and estimate caption text color |

### Bar gauges

| Variable | Default (light) | Description |
|----------|-----------------|-------------|
| `--spa-bar-width` | `44px` | Bar gauge width |
| `--spa-bar-height` | `130px` | Bar gauge height |
| `--spa-bar-radius` | `3px` | Bar gauge border radius |
| `--spa-bar-border` | `rgba(0, 0, 0, 0.1)` | Bar gauge inset border color |

### Gradient colors

| Variable | Default | Description |
|----------|---------|-------------|
| `--spa-color-danger` | `#dc2626` | Gradient danger zone color (red) |
| `--spa-color-caution` | `#ca8a04` | Gradient caution zone color (yellow) |
| `--spa-color-ideal` | `#16a34a` | Gradient ideal zone color (green) |

### Controls

| Variable | Default (light) | Description |
|----------|-----------------|-------------|
| `--spa-control-bg` | `rgba(0, 0, 0, 0.035)` | Control background color |
| `--spa-control-border` | `rgba(0, 0, 0, 0.08)` | Control border color |
| `--spa-control-active-bg` | `rgba(0, 0, 0, 0.14)` | Active control background (boost on) |
| `--spa-control-active-border` | `rgba(0, 0, 0, 0.25)` | Active control border (boost on) |
| `--spa-text-primary` | `rgba(0, 0, 0, 0.8)` | Primary text color (output level value) |
| `--spa-text-secondary` | `rgba(0, 0, 0, 0.5)` | Secondary text color (buttons, labels) |
| `--spa-text-tertiary` | `rgba(0, 0, 0, 0.3)` | Tertiary text color (boost state) |

### Divider

| Variable | Default (light) | Description |
|----------|-----------------|-------------|
| `--spa-divider-color` | `rgba(0, 0, 0, 0.06)` | Divider line color |

### Example card-mod override

Add this block to a complete configuration with your `sensors` entries.

```yaml
type: custom:spa-monitor-card
card_mod:
  style: |
    :host {
      --spa-color-ideal: #22c55e;
      --spa-bar-height: 160px;
    }
```

---

## Visual Config Editor

The card includes a built-in visual editor accessible from the HA dashboard UI. The editor provides:

- **Title** text input
- **Theme** dropdown (Auto / Light / Dark / Glass)
- **Sensor entity pickers** for all 4 predefined sensors (Chlorine, pH, Salt, IQ Sensor)
- **Control entity pickers** for Output Level (number domain) and Boost (switch domain)

All entity pickers support domain filtering and custom entity input. Clearing and reselecting a sensor/control in the same editor session restores its advanced options. Saving the cleared configuration still removes that entity; restoration does not survive closing the editor.

---

## Credits

For source, tests and release instructions, see [Development](DEVELOPMENT.md).

- Fork of [pool-monitor-card](https://github.com/wilsto/pool-monitor-card) by [wilsto](https://github.com/wilsto)
- Built for the [ESP-IQ2020](https://github.com/Ylianst/ESP-IQ2020) integration by [Ylianst](https://github.com/Ylianst)

## License

MIT
