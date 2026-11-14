# Numeric state and conversion validation

Malformed readings such as `7.5oops` previously produced a valid-looking marker;
nonfinite values and invalid number states could reach display/control paths.
A zero months-conversion divisor rendered `Infinity mo`. Complete finite-decimal
parsing now rejects invalid states, hides their markers, disables and guards
invalid number controls, and preserves zero/recovery. Invalid hours/month or
reserve options fail with field-specific configuration errors.

Validation date: November 13, 2026. These are stacked contributions: merge
`codex/card-test-foundation`, then `codex/card-numeric-validation`, then
`codex/card-output-intent`. Each branch builds and tests independently against
its declared base. No tag or release is created; package version 0.1.1 is retained
as an unreleased development candidate.

## Results and scope

- Nine unit/release tests pass, including strict parsing and number constraints.
- Fifteen normal browser cases pass; two explicit expected failures remain for
  entity step handling and rapid-click intent, which belong to the next PR.
- Seven of the nine HA-reproduced failures are fixed here: five malformed
  sensor states, invalid number control state and zero hours/month divisor.
- Zero, decimal/exponent strings, valid existing configuration and editor
  overrides continue to work. Empty/whitespace-only strings, boolean/object
  coercion, hexadecimal syntax and numeric overflow are rejected.
- The complete candidate later passed 21 real-HA browser checks; this branch's
  independent test claims are the nine unit and fifteen normal browser cases
  above. Full-stack HA evidence is supplied by the controls PR.

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

The broader configuration backlog remains open: nested shapes, entity domains,
scales/zones, decimal precision, enums and custom-sensor requirements are not
fully validated by this change. Step handling and latest-intent behavior are
deliberately left to the next PR. On the installed Aria, check actual unknown,
unavailable, zero and recovered states, and existing custom templates/overrides.
No water-quality thresholds or sensor-life interpretation are changed here.
