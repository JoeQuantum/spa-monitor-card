# Preset ranges and evidence

Reviewed November 14, 2026 against the owner-supplied manuals listed below and
the previously reviewed ESP-IQ2020 owner reports. No preset values were changed
by the configuration/Boost fixes. These references explain display choices;
they are not a device calibration, dosing instruction or safety determination.

| Preset field | Value | Source and limit |
|---|---|---|
| Chlorine green band | 1–5 ppm | FreshWater Salt System Rev. C, PDF p. 6, Table 1; Smart Monitoring Rev. A, PDF p. 5. The manual notes regional requirements may differ. |
| pH green band | 7.2–7.8 | Salt System PDF p. 6 and Smart Monitoring PDF pp. 3, 5. The manual target is 7.4; the card's historical unused `setpoint: 7.5` does not draw or control anything. |
| Salt green band | 1500–2000 ppm | Salt System PDF p. 6 and Smart Monitoring PDF p. 5; documented salt target 1750 ppm. The actual integration entity, units and derivation must be confirmed per installation. |
| Chemistry outer bounds, intermediate yellow/red breakpoints, 10/20/80/90% positions | As listed in `src/sensors.js` | Project presentation choices. No universal manufacturer alarm or protocol threshold is claimed for these values. |
| IQ raw countdown | New-sensor values near 9999–10000; reported hourly decrement | [Owner explanation of field G](https://github.com/Ylianst/ESP-IQ2020/issues/43#issuecomment-2835956977). This is not a guaranteed calendar lifetime. |
| IQ reserve | 508 hours, configurable | [First owner report](https://github.com/Ylianst/ESP-IQ2020/issues/42#issuecomment-3287918736) and [second owner report](https://github.com/Ylianst/ESP-IQ2020/issues/42#issuecomment-3324424968). Not validated on this Aria and not a universal firmware specification. |
| IQ band endpoints | 508 / 654 / 1969 / 10000 hours at 100 / 90 / 80 / 0% from top | Project display choices. 1969 equals the chosen reserve plus two 730.5-hour months. They do not decode manufacturer sensor-condition states. |
| Estimated months | `max(0, (raw_hours - reserve) / 730.5)`, rounded | Project arithmetic using a 365.25-day year. Zero after rounding is not proof of expiry; the accessible description and tooltip retain raw hours. |

The Smart Monitoring manual (PDF pp. 4, 6, 8) distinguishes initialization,
monitoring availability and sensor condition from the salt-generator cartridge.
This card does not infer any of those states from countdown arithmetic. The
installation's entity mapping, actual sample freshness and hardware fault mapping
remain separate work. A reported green band does not establish that a reading is
fresh or that water is safe.

## Exact manual editions

The user supplied these files for the review. They are not redistributed in this
repository. Page references above are one-based PDF pages, not printed page labels.

| File | Edition | SHA-256 |
|---|---|---|
| `freshwater-salt-system-owners-manual.pdf` | Watkins Wellness #304262, Rev. C (10/22), English section | `c444bce2f1c32b5fb0862808150b1e3378ff3da31d87d065344cd4db7fb099c3` |
| `freshwater-smart-monitoring-owners-manual.pdf` | Watkins Wellness #305324, Rev. A (1/24) | `9ea47eef78387759d1551a25aa5d9f829122ea749dfaeb6d783bd79dddbbf67c` |

Different manual revisions or controller firmware may differ. The supplied
2025 Highlife manual identifies the user's model context; it does not validate
the integration's inferred wire fields or make a numerical display a diagnostic.
