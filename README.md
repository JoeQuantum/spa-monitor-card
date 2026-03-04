# Spa Monitor Card

Home Assistant Lovelace card for HotSpring/ESP-IQ2020 water quality monitoring with vertical bar gauges, triangle indicators, and integrated salt system controls.

Fork of [pool-monitor-card](https://github.com/wilsto/pool-monitor-card) by [wilsto](https://github.com/wilsto), redesigned for salt water care systems.

![screenshot](docs/screenshot.png)

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
| `theme` | string | `auto` | `auto`, `light`, or `dark`. Auto detects from HA theme. |
| `sensors` | object | **required** | At least one sensor must be defined. |
| `controls` | object | *(none)* | Optional salt system controls. Omit to hide the controls row. |

### Predefined sensors

The four sensors below have built-in defaults. Just provide an `entity` and the rest is filled in automatically.

| Sensor ID | Name | Unit | Min | Max | Gradient | Display Format |
|-----------|------|------|-----|-----|----------|----------------|
| `chlorine` | Chlorine | ppm | 0 | 6 | standard | numeric |
| `ph` | pH | *(none)* | 7.0 | 8.0 | standard | numeric |
| `salt` | Salt | ppm | 1200 | 2400 | standard | numeric |
| `iq_sensor` | IQ Sensor | hours | 0 | 10000 | depletion | hours_to_months |

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
    gradient: standard
    display_format: null
```

| Option | Type | Description |
|--------|------|-------------|
| `entity` | string | **Required.** Entity ID for the sensor. |
| `name` | string | Override the display label above the bar. |
| `unit` | string | Override the unit shown after the value. |
| `min` | number | Minimum value for the gauge range. |
| `max` | number | Maximum value for the gauge range. |
| `gradient` | string | `standard` (red-yellow-green-yellow-red) or `depletion` (red-yellow-green). |
| `display_format` | string | `hours_to_months` converts raw hours to months using `round(value / 720)` (720 hours per 30-day month). The FreshWater IQ sensor starts at ~10,000 hours when a new cartridge is installed. |

### Controls

| Control | Type | Entity pattern | Description |
|---------|------|----------------|-------------|
| `output_level` | number | `number.*_salt_power` | Salt system output level (0-10). Rendered as a stepper. |
| `boost` | switch | `switch.*_salt_boost` | Salt boost toggle. Rendered as a tap button. |

### Theme

| Value | Behavior |
|-------|----------|
| `auto` | Detects dark/light from Home Assistant's active theme. |
| `light` | Forces light mode (translucent white card). |
| `dark` | Forces dark mode (translucent dark card). |

---

## CSS Custom Properties

All colors and dimensions are exposed as CSS custom properties for [card-mod](https://github.com/thomasloven/lovelace-card-mod) overrides.

| Variable | Description |
|----------|-------------|
| `--spa-card-bg` | Card background color |
| `--spa-card-border` | Card border color |
| `--spa-card-shadow` | Card box shadow |
| `--spa-card-radius` | Card border radius |
| `--spa-card-blur` | Card backdrop blur amount |
| `--spa-card-padding` | Card inner padding |
| `--spa-header-color` | Header title text color |
| `--spa-label-color` | Sensor label and Output Level label color |
| `--spa-value-color` | Sensor value text color |
| `--spa-bar-width` | Bar gauge width |
| `--spa-bar-height` | Bar gauge height |
| `--spa-bar-radius` | Bar gauge border radius |
| `--spa-bar-border` | Bar gauge border color |
| `--spa-color-danger` | Gradient danger zone color (red) |
| `--spa-color-caution` | Gradient caution zone color (yellow) |
| `--spa-color-ideal` | Gradient ideal zone color (green) |
| `--spa-control-bg` | Control background color |
| `--spa-control-border` | Control border color |
| `--spa-control-active-bg` | Active control background (boost on) |
| `--spa-control-active-border` | Active control border (boost on) |
| `--spa-text-primary` | Primary text color (output level value) |
| `--spa-text-secondary` | Secondary text color (buttons, labels) |
| `--spa-text-tertiary` | Tertiary text color (boost state) |
| `--spa-divider-color` | Divider line color |

Example card-mod override:

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

## Credits

- Fork of [pool-monitor-card](https://github.com/wilsto/pool-monitor-card) by [wilsto](https://github.com/wilsto)
- Built for the [ESP-IQ2020](https://github.com/Ylianst/ESP-IQ2020) integration by [Ylianst](https://github.com/Ylianst)

## License

MIT
