# spa-monitor-card: Implementation Plan

Fork of [pool-monitor-card](https://github.com/wilsto/pool-monitor-card) v2.9.0, redesigned for HotSpring/ESP-IQ2020 salt water care systems with vertical bar gauges, triangle indicators, and integrated salt system controls.

GitHub repo: https://github.com/JoeQuantum/spa-monitor-card

## Target audience

ESP-IQ2020 users (github.com/Ylianst/ESP-IQ2020) and HotSpring hot tub owners who want a water quality visualization that matches their physical control panel's Water Care screen.

---

## What to keep from pool-monitor-card

- **Build system**: rollup.config.js, package.json (rename, update deps)
- **HACS packaging**: hacs.json, dist/ output pattern
- **LitElement base class pattern**: extends LitElement, implements LovelaceCard interface
- **Config lifecycle**: setConfig(), getConfig(), static getConfigElement() stubs
- **Sensor config schema style**: `sensors:` object with entity/name/unit/setpoint/step per sensor
- **Color config pattern**: `colors:` object with CSS custom property overrides
- **i18n structure**: language support (can strip down to English initially)

## What to gut/replace

- **All rendering code**: horizontal bars become vertical bars with triangle indicators
- **SVG gradient generation**: replace with CSS linear-gradient approach
- **Sensor presets**: strip 20 pool sensors down to 4 watercare sensors + custom
- **Display modes**: remove compact/gradient toggle, replace with single vertical layout
- **Min/max ticker rendering**: remove (not needed for watercare)
- **All CSS**: replace with glassmorphism theme system

---

## Card design spec (locked)

Reference: React mockup in `reference/water-quality-mockup.jsx`

### Layout (top to bottom)
1. **Header row**: droplet icon + "Water Quality" label
2. **Bar gauge row**: 4 vertical bars, space-evenly, with left padding for triangle overflow
3. **Divider**: 1px line
4. **Controls row**: Output Level stepper (flex:1) + Boost toggle (fixed 100px)

### Bar gauge anatomy
- **Label** above bar (12px, semibold)
- **Bar**: 44px wide, 130px tall, border-radius 3px
- **Gradient fill**: CSS linear-gradient, bottom-to-top
  - Standard sensors (Chlorine, pH, Salt): 10% red, 10% yellow, 60% green, 10% yellow, 10% red
  - Depletion sensor (IQ Sensor): 10% red, 10% yellow, 80% green
- **Triangle indicator**: SVG, 14x18px, positioned on left edge at current value %, gradient fill white-to-gray with highlight/shadow edges for 3D effect
- **Value label** below bar (12px, medium weight)

### Controls
- **Output Level**: label + stepper row (minus button, numeric value, plus button). Entity: `number.*_salt_power`, range 0-10
- **Boost**: tappable card with lightning SVG icon, "Boost" label, "On"/"Off" sublabel. Entity: `switch.*_salt_boost`. Active state: slightly more prominent gray bg + border (theme-neutral, no accent color)

### Theming
- CSS custom properties for all colors (prefix: `--spa-*`), enabling visionOS light/dark and user overrides
- Glassmorphism card: translucent bg, backdrop-filter blur, soft border, subtle shadow
- No accent colors on controls (gray active states only)

---

## Sensor configuration

### Predefined sensors (with defaults)

| Sensor ID | Name | Unit | Min | Max | Gradient | Entity pattern |
|-----------|------|------|-----|-----|----------|----------------|
| chlorine | Chlorine | ppm | 0 | 6 | standard | sensor.*_iq_chlorine |
| ph | pH | (none) | 7.0 | 8.0 | standard | sensor.*_iq_ph |
| salt | Salt | ppm | 1200 | 2400 | standard | sensor.*_iq_salt |
| iq_sensor | IQ Sensor | (none) | 0 | 10000 | depletion | sensor.*_iq_hours_left |

### Control entities (separate config section)

| Control ID | Type | Entity pattern | Config key |
|------------|------|----------------|------------|
| output_level | number (0-10) | number.*_salt_power | controls.output_level |
| boost | switch | switch.*_salt_boost | controls.boost |

### Example YAML config

```yaml
type: custom:spa-monitor-card
sensors:
  chlorine:
    entity: sensor.hot_tub_iq_chlorine
  ph:
    entity: sensor.hot_tub_iq_ph
  salt:
    entity: sensor.hot_tub_iq_salt
  iq_sensor:
    entity: sensor.hot_tub_iq_hours_left
    display_value_entity: sensor.hot_tub_iq_months_left  # optional: show "10 mo" instead of raw hours
controls:
  output_level:
    entity: number.hot_spring_aria_salt_power
  boost:
    entity: switch.hot_spring_aria_salt_boost
```

### Overridable per-sensor options (matching pool-monitor-card pattern)

```yaml
sensors:
  chlorine:
    entity: sensor.hot_tub_iq_chlorine
    name: "Free Cl"           # override label
    unit: "ppm"               # override unit
    min: 0                    # override range min
    max: 10                   # override range max
    setpoint: 3               # ideal center value (for future badge use)
    gradient: standard        # standard | depletion | custom
    icon: mdi:flask           # optional icon override
```

---

## CSS custom properties

```css
/* Card container */
--spa-card-bg: rgba(255,255,255,0.72);
--spa-card-border: rgba(0,0,0,0.06);
--spa-card-shadow: 0 2px 16px rgba(0,0,0,0.04);
--spa-card-radius: 16px;
--spa-card-blur: 40px;
--spa-card-padding: 16px;

/* Typography */
--spa-header-color: rgba(0,0,0,0.75);
--spa-label-color: rgba(0,0,0,0.6);
--spa-value-color: rgba(0,0,0,0.45);

/* Bar gauges */
--spa-bar-width: 44px;
--spa-bar-height: 130px;
--spa-bar-radius: 3px;
--spa-bar-border: rgba(0,0,0,0.1);

/* Gradient colors */
--spa-color-danger: #dc2626;
--spa-color-caution: #ca8a04;
--spa-color-ideal: #16a34a;

/* Controls */
--spa-control-bg: rgba(0,0,0,0.035);
--spa-control-border: rgba(0,0,0,0.08);
--spa-control-active-bg: rgba(0,0,0,0.14);
--spa-control-active-border: rgba(0,0,0,0.25);
--spa-text-primary: rgba(0,0,0,0.8);
--spa-text-secondary: rgba(0,0,0,0.5);
--spa-text-tertiary: rgba(0,0,0,0.3);

/* Divider */
--spa-divider-color: rgba(0,0,0,0.06);
```

---

## File structure

```
spa-monitor-card/
  dist/
    spa-monitor-card.js             # rollup output (single bundle)
  src/
    spa-monitor-card.js             # main LitElement card class
    sensors.js                      # sensor presets, gradient defs, CSS builder, indicator math
    styles.js                       # CSS template literals with --spa-* custom properties
  reference/
    water-quality-mockup.jsx        # approved React mockup (pixel reference)
  docs/
    README.md                       # user-facing docs
  hacs.json
  package.json
  rollup.config.js
  LICENSE                           # MIT (same as pool-monitor-card)
  IMPLEMENTATION_PLAN.md            # this file
```

---

## Implementation phases

### Phase 1: Scaffold (15 min)
- Delete pool-monitor-card src/ contents
- Drop in new src/ files (spa-monitor-card.js, sensors.js, styles.js)
- Replace package.json, rollup.config.js, hacs.json
- Copy React mockup to reference/
- Run `npm install && npm run build` to verify it compiles
- Commit: "chore: scaffold spa-monitor-card from pool-monitor-card fork"

### Phase 2: Config + Sensor model (20 min)
- Verify setConfig() with validation works
- Confirm 4 predefined sensors load with defaults (chlorine, ph, salt, iq_sensor)
- Confirm controls config (output_level, boost) parses
- Wire hass property setter to read entity states
- No rendering yet, just console.log state to verify

### Phase 3: Bar gauge rendering (45 min)
- Implement gradient builder (standard 10/10/60/10/10, depletion 10/10/80)
- Render vertical bars with CSS linear-gradient
- Implement SVG triangle indicator positioned by value percentage
- Render labels (name above, value below)
- Layout: flexbox row, space-evenly, left padding for triangle overflow
- Wire to live entity values
- **Known issue**: CSS var() inside inline style gradient won't resolve from :host.
  Claude Code must resolve actual color values in JS before building the gradient string,
  OR use a <style> tag in the shadow DOM with a CSS class per gradient type.

### Phase 4: Controls rendering (30 min)
- Output Level stepper: read from number entity, call number.set_value service
- Boost toggle: read from switch entity, call switch.toggle service
- Layout: flex row below divider
- Active state styling (gray, theme-neutral)

### Phase 5: Theming + CSS custom properties (20 min)
- Verify all hardcoded colors are extracted to --spa-* custom properties
- Implement glassmorphism card container
- Test with visionOS light theme
- Test with default HA dark theme
- Verify custom property overrides work via card-mod

### Phase 6: Polish + edge cases (20 min)
- Handle unavailable/unknown entity states gracefully
- Handle missing optional controls config (hide controls row)
- Handle missing sensors (only render configured ones)
- Clamp indicator to 0-100% range
- Add display_value_entity support for IQ Sensor ("10 mo" display)
- Error card rendering for bad config

### Phase 7: Package + publish (15 min)
- Final rollup build
- Test HACS install from custom repo
- Write docs/README.md with config examples
- Tag v0.1.0 release

**Total estimated: ~2.75 hours of Claude Code time**

---

## Entity references (verified from HA Integration Catalog)

```yaml
# Water quality sensors
sensor.hot_tub_iq_chlorine        # current: 6.7
sensor.hot_tub_iq_ph              # current: 7.5
sensor.hot_tub_iq_salt            # current: 2197
sensor.hot_tub_iq_hours_left      # current: 8643

# Salt system controls
number.hot_spring_aria_salt_power # current: 0 (range 0-10)
switch.hot_spring_aria_salt_boost # current: off

# Supplementary (may use later)
sensor.hot_spring_aria_salt_content           # current: 3.0
binary_sensor.hot_spring_aria_salt_level_confirmed  # current: on
```

---

## Service calls

```javascript
// Output Level stepper
this.hass.callService('number', 'set_value', {
  entity_id: this._config.controls.output_level.entity,
  value: newValue
});

// Boost toggle
this.hass.callService('switch', 'toggle', {
  entity_id: this._config.controls.boost.entity
});
```

---

## Key decisions for Claude Code session

1. **LitElement, not Lit 3**: pool-monitor-card uses LitElement directly. Keep this for compatibility. Don't upgrade to Lit 3.
2. **JavaScript, not TypeScript**: match pool-monitor-card. TypeScript migration is a future concern.
3. **No visual editor yet**: YAML config only (matching pool-monitor-card v2's current state).
4. **Rollup, not webpack**: match pool-monitor-card build system.
5. **Single bundle output**: dist/spa-monitor-card.js, no chunks.
6. **SVG triangle is inline**: render in lit-html template, not external file. Use unique gradient IDs per sensor to avoid SVG ID collisions.
7. **Gradient is CSS, not SVG**: use `linear-gradient()` in style attribute on the bar div.
8. **No haptic feedback**: keep it simple for v0.1.
9. **card-mod compatible**: CSS custom properties work with card-mod overrides out of the box.

---

## Reference artifacts

- **React mockup**: `reference/water-quality-mockup.jsx` (approved design, use as pixel reference)
- **Physical panel photo**: HotSpring Aria Water Care screen (gradient proportions reference)
- **pool-monitor-card source**: github.com/wilsto/pool-monitor-card (fork base, v2.9.0)
- **ESP-IQ2020 integration**: github.com/Ylianst/ESP-IQ2020 (entity patterns)
