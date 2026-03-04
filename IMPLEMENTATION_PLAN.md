# spa-monitor-card: Implementation Plan

Fork of [pool-monitor-card](https://github.com/wilsto/pool-monitor-card) v2.9.0, redesigned for HotSpring/ESP-IQ2020 salt water care systems with vertical bar gauges, triangle indicators, and integrated salt system controls.

GitHub repo: https://github.com/JoeQuantum/spa-monitor-card

## Target audience

ESP-IQ2020 users (github.com/Ylianst/ESP-IQ2020) and HotSpring hot tub owners who want a water quality visualization that matches their physical control panel's Water Care screen.

---

## What was kept from pool-monitor-card

- **Build system**: rollup.config.js, package.json (renamed, updated deps)
- **HACS packaging**: hacs.json, dist/ output pattern
- **LitElement base class pattern**: extends LitElement, implements LovelaceCard interface
- **Config lifecycle**: setConfig(), getConfig(), static getConfigElement()
- **Sensor config schema style**: `sensors:` object with entity/name/unit/setpoint/step per sensor
- **Color config pattern**: CSS custom properties with `--spa-*` prefix

## What was gutted/replaced

- **All rendering code**: horizontal bars replaced with vertical bars + triangle indicators
- **SVG gradient generation**: replaced with CSS linear-gradient classes
- **Sensor presets**: 20 pool sensors stripped down to 4 watercare sensors
- **Display modes**: compact/gradient toggle removed, single vertical layout
- **Min/max ticker rendering**: removed (not needed for watercare)
- **All CSS**: replaced with glassmorphism theme system (auto/light/dark/glass)
- **i18n**: removed (English only for v0.1)

---

## Card design spec (as built)

Reference: React mockup in `reference/water-quality-mockup.jsx`

### Layout (top to bottom)
1. **Header row**: title label (optional — hidden when title is empty/omitted)
2. **Bar gauge row**: vertical bars, space-evenly, with left padding for triangle overflow
3. **Divider**: 1px line (only shown when controls are configured)
4. **Controls row**: Output Level stepper (flex:1) + Boost toggle (fixed 100px)

### Bar gauge anatomy
- **Label** above bar (12px, semibold)
- **Bar**: 44px wide, 130px tall, border-radius 3px
- **Gradient fill**: CSS linear-gradient via class (not inline style — see [Technical fixes](#technical-fixes))
  - Standard sensors (Chlorine, pH, Salt): 10% red, 10% yellow, 60% green, 10% yellow, 10% red
  - Depletion sensor (IQ Sensor): 10% red, 10% yellow, 80% green
- **Triangle indicator**: SVG, 14x18px, positioned on left edge at current value %, gradient fill white-to-gray with highlight/shadow edges for 3D effect. Uses instance-unique gradient IDs to avoid SVG collisions when multiple cards are on a dashboard.
- **Value label** below bar (12px, medium weight)
- **Inset box-shadow border**: replaces traditional border to prevent gradient bleed at rounded corners

### Controls
- **Output Level**: label above stepper row (minus button, numeric value, plus button). Entity: `number.*_salt_power`, min/max read from entity attributes
- **Boost**: tappable card with lightning SVG icon, "Boost" label, "On"/"Off" sublabel. Entity: `switch.*_salt_boost`. Active state: slightly more prominent gray bg + border (theme-neutral, no accent color)

### Theming
- 4 themes: `auto`, `light`, `dark`, `glass`
- CSS custom properties for all colors (prefix: `--spa-*`), enabling user overrides via card-mod
- Glassmorphism card: translucent bg, backdrop-filter blur, soft border, subtle shadow
- No accent colors on controls (gray active states only)
- `glass` theme designed for visionOS-style dashboards with wallpaper backgrounds

---

## Sensor configuration

### Predefined sensors (with defaults)

| Sensor ID | Name | Unit | Min | Max | Gradient | Display Format | Entity pattern |
|-----------|------|------|-----|-----|----------|----------------|----------------|
| chlorine | Chlorine | ppm | 0 | 6 | standard | numeric | sensor.*_iq_chlorine |
| ph | pH | (none) | 7.0 | 8.0 | standard | numeric | sensor.*_iq_ph |
| salt | Salt | ppm | 1200 | 2400 | standard | numeric | sensor.*_iq_salt |
| iq_sensor | IQ Sensor | (none) | 0 | 10000 | depletion | hours_to_months | sensor.*_iq_hours_left |

### Display format: hours_to_months

The IQ Sensor preset uses `display_format: 'hours_to_months'` which converts the raw hours value to months: `Math.round(value / 720)` (720 hours per 30-day month). The FreshWater IQ sensor starts at ~10,000 hours (~14 months) when a new cartridge is installed.

### Control entities

| Control ID | Type | Entity pattern | Config key |
|------------|------|----------------|------------|
| output_level | number (0-10) | number.*_salt_power | controls.output_level |
| boost | switch | switch.*_salt_boost | controls.boost |

### Example YAML config

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

### Overridable per-sensor options

```yaml
sensors:
  chlorine:
    entity: sensor.hot_tub_iq_chlorine
    name: "Free Cl"           # override label
    unit: "ppm"               # override unit
    min: 0                    # override range min
    max: 10                   # override range max
    decimals: 1               # decimal places
    setpoint: 3               # ideal center value (for future badge use)
    gradient: standard        # standard | depletion
    display_format: null      # hours_to_months | null
```

---

## CSS custom properties

```css
/* Card container */
--spa-card-bg: rgba(255,255,255,0.72);
--spa-card-border: rgba(0,0,0,0.12);
--spa-card-shadow: 0 2px 16px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.06);
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

## File structure (as built)

```
spa-monitor-card/
  dist/
    spa-monitor-card.js             # rollup output (single bundle, 44,626 bytes)
  src/
    spa-monitor-card.js             # main LitElement card class
    spa-monitor-card-editor.js      # visual config editor (entity pickers, theme selector)
    sensors.js                      # sensor presets and indicator position math
    styles.js                       # CSS template literals with --spa-* custom properties
  reference/
    water-quality-mockup.jsx        # approved React mockup (pixel reference)
  docs/
    screenshot.png                  # card screenshot for README
  .github/
    ISSUE_TEMPLATE/
      bug_report.md
  hacs.json
  package.json
  rollup.config.js
  LICENSE                           # MIT (same as pool-monitor-card)
  IMPLEMENTATION_PLAN.md            # this file
  README.md                         # user-facing docs
```

---

## Implementation phases (all complete)

### Phase 1: Scaffold ✅
- Deleted pool-monitor-card src/ contents
- Dropped in new src/ files (spa-monitor-card.js, sensors.js, styles.js)
- Replaced package.json, rollup.config.js, hacs.json
- Fixed rollup-plugin-terser → @rollup/plugin-terser (peer dep conflict with rollup 3)
- Added "type": "module" to package.json
- Verified build with `npm run build`

### Phase 2: Config + Sensor model ✅
- setConfig() with validation (requires ≥1 sensor, validates theme)
- 4 predefined sensors load with defaults (chlorine, ph, salt, iq_sensor)
- Controls config (output_level, boost) parses correctly
- hass property setter reads entity states

### Phase 3: Bar gauge rendering ✅
- Gradient classes (.gauge-bar.gradient-standard, .gauge-bar.gradient-depletion) in CSS
- Vertical bars with CSS linear-gradient (bottom-to-top direction)
- SVG triangle indicator positioned by value percentage
- Labels (name above, value below)
- Layout: flexbox row, space-evenly, left padding for triangle overflow

### Phase 4: Controls rendering ✅
- Output Level stepper: reads from number entity, calls number.set_value service
- Boost toggle: reads from switch entity, calls switch.toggle service
- Layout: flex row below divider, bottom-aligned
- Active state styling (gray, theme-neutral)

### Phase 5: Theming + CSS custom properties ✅
- All colors extracted to --spa-* custom properties on :host
- 4 themes implemented: auto, light, dark, glass
- .card.dark and .card.glass CSS class overrides
- Auto detection via this.hass.themes.darkMode
- Glass theme for visionOS-style dashboards
- card-mod compatible

### Phase 6: Polish + edge cases ✅
- Unavailable/unknown entity states handled (grayed out, disabled controls)
- Missing optional controls config hides controls row and divider
- Only configured sensors render
- Indicator clamped to 0-100% range
- display_format: 'hours_to_months' for IQ Sensor (Math.round(value / 720))
- Error card rendering for bad config (throws Error in setConfig)

### Phase 7: Visual editor ✅ (added beyond original plan)
- spa-monitor-card-editor.js with LitElement
- Title text input, theme dropdown (auto/light/dark/glass)
- ha-entity-picker for all 4 sensors (sensor domain) and 2 controls (number/switch domains)
- Registered via static getConfigElement()

### Phase 8: Package + publish ✅
- Final rollup build (44,626 bytes)
- HACS custom repo install verified
- README.md with full config examples
- Tagged v0.1.0

---

## Technical fixes (discovered during implementation)

### CSS var() in inline style gradients
**Problem**: CSS `var()` inside inline `style="background: linear-gradient(...)"` attributes does not resolve custom properties defined on `:host` in shadow DOM.

**Solution**: Moved gradients from inline styles to CSS classes (`.gauge-bar.gradient-standard`, `.gauge-bar.gradient-depletion`) in the stylesheet where `var()` resolves correctly. The JS just applies the appropriate class name.

### Gradient bleed at rounded corners
**Problem**: Semi-transparent borders on `.gauge-bar` allowed the gradient to show through at rounded corners, creating thin colored lines at the bar edges.

**Attempted fixes**:
1. `background-clip: padding-box` — reduced but didn't eliminate the bleed
2. Gradient stop ordering fixes — didn't address the root cause

**Final solution**: Replaced `border: 1.5px solid var(--spa-bar-border)` with `box-shadow: inset 0 0 0 1.5px var(--spa-bar-border), inset 0 1px 2px rgba(0,0,0,0.08)`. This separates the border visual from background rendering and eliminates the bleed entirely.

### SVG gradient ID collisions
**Problem**: When multiple spa-monitor-cards are on the same dashboard, SVG `<linearGradient>` elements with the same `id` attribute collide in the shared document scope, causing all triangles to reference the first card's gradient.

**Solution**: Added a module-level `cardInstanceId` counter that increments per card instance. Each triangle's gradient ID is `triGrad-${instanceId}-${sensorId}`, ensuring uniqueness across cards.

### Boost SVG stroke with CSS var()
**Problem**: SVG attribute `stroke="var(--spa-text-secondary)"` doesn't resolve CSS custom properties.

**Solution**: Moved stroke styling to a CSS class (`.boost-icon { stroke: var(...) }`) where custom properties resolve correctly.

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

## Key decisions

1. **LitElement, not Lit 3**: pool-monitor-card uses LitElement directly. Kept for compatibility.
2. **JavaScript, not TypeScript**: match pool-monitor-card. TypeScript migration is a future concern.
3. **Visual editor included**: YAML config plus visual editor with entity pickers.
4. **Rollup, not webpack**: match pool-monitor-card build system. @rollup/plugin-terser for rollup 3 compat.
5. **Single bundle output**: dist/spa-monitor-card.js, no chunks.
6. **SVG triangle is inline**: rendered in lit-html template with instance-unique gradient IDs.
7. **Gradient is CSS classes, not inline styles**: avoids var() resolution issues in shadow DOM.
8. **No haptic feedback**: kept simple for v0.1.
9. **card-mod compatible**: CSS custom properties work with card-mod overrides out of the box.
10. **4 themes**: auto (detects from HA), light, dark, glass (visionOS-style).

---

## Reference artifacts

- **React mockup**: `reference/water-quality-mockup.jsx` (approved design, used as pixel reference)
- **Physical panel photo**: HotSpring Aria Water Care screen (gradient proportions reference)
- **pool-monitor-card source**: github.com/wilsto/pool-monitor-card (fork base, v2.9.0)
- **ESP-IQ2020 integration**: github.com/Ylianst/ESP-IQ2020 (entity patterns)
