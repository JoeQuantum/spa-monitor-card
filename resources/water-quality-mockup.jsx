import { useState } from "react";

// Standard bars: 10% red | 10% yellow | 60% green | 10% yellow | 10% red
// Smooth blending between zones
const STANDARD_GRADIENT = [
  { pos: 0, color: "#dc2626" },
  { pos: 0.08, color: "#dc2626" },
  { pos: 0.10, color: "#ca8a04" },
  { pos: 0.18, color: "#ca8a04" },
  { pos: 0.20, color: "#16a34a" },
  { pos: 0.80, color: "#16a34a" },
  { pos: 0.82, color: "#ca8a04" },
  { pos: 0.90, color: "#ca8a04" },
  { pos: 0.92, color: "#dc2626" },
  { pos: 1, color: "#dc2626" },
];

// IQ Sensor: 10% red | 10% yellow | 80% green
const IQ_GRADIENT = [
  { pos: 0, color: "#dc2626" },
  { pos: 0.08, color: "#dc2626" },
  { pos: 0.10, color: "#ca8a04" },
  { pos: 0.18, color: "#ca8a04" },
  { pos: 0.20, color: "#16a34a" },
  { pos: 1, color: "#16a34a" },
];

const SENSORS = [
  { id: "chlorine", label: "Chlorine", value: 2.2, unit: "ppm", min: 0, max: 6, decimals: 1, gradient: STANDARD_GRADIENT },
  { id: "ph", label: "pH", value: 8.5, unit: "", min: 7.0, max: 8.0, decimals: 1, gradient: STANDARD_GRADIENT },
  { id: "salt", label: "Salt", value: 2228, unit: "ppm", min: 1200, max: 2400, decimals: 0, gradient: STANDARD_GRADIENT },
  { id: "iq", label: "IQ Sensor", value: 8643, displayValue: "10 mo", unit: "", min: 0, max: 10000, gradient: IQ_GRADIENT },
];

function getIndicatorPosition(sensor) {
  const { value, min, max } = sensor;
  const clamped = Math.max(min, Math.min(max, value));
  return ((clamped - min) / (max - min)) * 100;
}

function buildCSSGradient(sensor) {
  const stops = sensor.gradient.map((s) => `${s.color} ${(1 - s.pos) * 100}%`).reverse();
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

function formatValue(sensor) {
  if (sensor.displayValue) return sensor.displayValue;
  const dec = sensor.decimals ?? 1;
  const val = dec === 0 ? Math.round(sensor.value) : sensor.value.toFixed(dec);
  return sensor.unit ? `${val} ${sensor.unit}` : `${val}`;
}

function TriangleIndicator({ light }) {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18"
      style={{ filter: light ? "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))" : "drop-shadow(1px 1px 3px rgba(0,0,0,0.5))" }}>
      <defs>
        <linearGradient id={`triGrad${light ? "L" : "D"}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={light ? "#ffffff" : "#f0f0f0"} />
          <stop offset="40%" stopColor={light ? "#e8e8e8" : "#d8d8d8"} />
          <stop offset="100%" stopColor={light ? "#cccccc" : "#aaaaaa"} />
        </linearGradient>
      </defs>
      <polygon points="0,0 14,9 0,18" fill={`url(#triGrad${light ? "L" : "D"})`} />
      <line x1="0" y1="0.5" x2="13" y2="8.5" stroke={light ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)"} strokeWidth="1" />
      <line x1="0" y1="17.5" x2="13" y2="9.5" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
    </svg>
  );
}

function BarGauge({ sensor, light }) {
  const pipPct = getIndicatorPosition(sensor);
  const gradient = buildCSSGradient(sensor);
  const labelColor = light ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.85)";
  const valueColor = light ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.55)";
  const borderColor = light ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: labelColor, letterSpacing: "0.01em" }}>{sensor.label}</span>
      <div style={{ position: "relative", width: 44, height: 130 }}>
        <div style={{
          width: "100%", height: "100%", borderRadius: 3, background: gradient,
          border: `1.5px solid ${borderColor}`,
          boxShadow: light ? "inset 0 1px 2px rgba(0,0,0,0.08)" : "inset 0 1px 3px rgba(0,0,0,0.2)",
        }} />
        <div style={{ position: "absolute", left: -15, bottom: `${pipPct}%`, transform: "translateY(50%)", zIndex: 2, lineHeight: 0 }}>
          <TriangleIndicator light={light} />
        </div>
      </div>
      <span style={{ fontSize: 12, fontWeight: 500, color: valueColor }}>{formatValue(sensor)}</span>
    </div>
  );
}

function ControlsRow({ light }) {
  const [outputLevel, setOutputLevel] = useState(1);
  const [boostOn, setBoostOn] = useState(false);
  const bgSub = light ? "rgba(0,0,0,0.035)" : "rgba(255,255,255,0.06)";
  const borderSub = light ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)";
  const textPrimary = light ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.9)";
  const textSecondary = light ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)";
  const textTertiary = light ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.35)";
  const boostActiveBg = light ? "rgba(0, 0, 0, 0.14)" : "rgba(255, 255, 255, 0.18)";
  const boostActiveBorder = light ? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.3)";
  const boostActiveText = light ? "rgba(0, 0, 0, 0.75)" : "rgba(255, 255, 255, 0.9)";
  const btnStyle = (c) => ({
    width: 34, height: 34, borderRadius: 8, border: `1px solid ${borderSub}`,
    background: bgSub, color: c, fontSize: 18, fontWeight: 500, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
  });

  return (
    <div style={{ display: "flex", gap: 10, alignItems: "stretch" }}>
      <div style={{ flex: 1, background: bgSub, borderRadius: 12, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: textSecondary }}>Output Level</span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => setOutputLevel(Math.max(0, outputLevel - 1))} style={btnStyle(textSecondary)}>−</button>
          <span style={{ fontSize: 22, fontWeight: 700, color: textPrimary, minWidth: 30, textAlign: "center" }}>{outputLevel}</span>
          <button onClick={() => setOutputLevel(Math.min(10, outputLevel + 1))} style={btnStyle(textSecondary)}>+</button>
        </div>
      </div>
      <div onClick={() => setBoostOn(!boostOn)} style={{
        width: 100, background: boostOn ? boostActiveBg : bgSub, borderRadius: 12, padding: "10px 12px",
        cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        gap: 4, border: boostOn ? `1px solid ${boostActiveBorder}` : "1px solid transparent", transition: "all 0.2s ease", userSelect: "none",
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={boostOn ? boostActiveText : textSecondary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 600, color: boostOn ? boostActiveText : textSecondary }}>Boost</span>
        <span style={{ fontSize: 11, color: boostOn ? boostActiveText : textTertiary, fontWeight: 500, opacity: 0.8 }}>{boostOn ? "On" : "Off"}</span>
      </div>
    </div>
  );
}

function WaterQualityCard({ light }) {
  const cardBg = light ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.06)";
  const cardBorder = light ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.08)";
  const cardShadow = light ? "0 2px 16px rgba(0,0,0,0.04), 0 0 0 0.5px rgba(0,0,0,0.03)" : "0 4px 24px rgba(0,0,0,0.2)";
  const headerColor = light ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.85)";
  const dividerColor = light ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)";

  return (
    <div style={{ background: cardBg, backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", borderRadius: 16, border: cardBorder, padding: 16, boxShadow: cardShadow }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 14, opacity: light ? 0.5 : 0.6 }}>💧</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: headerColor }}>Water Quality</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "flex-start", paddingLeft: 12, marginBottom: 16 }}>
        {SENSORS.map((s) => (<BarGauge key={s.id} sensor={s} light={light} />))}
      </div>
      <div style={{ height: 1, background: dividerColor, margin: "4px 0 12px" }} />
      <ControlsRow light={light} />
    </div>
  );
}

export default function WaterQualityMockup() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 48, padding: 32, background: "linear-gradient(145deg, #2c2c2e 0%, #1c1c1e 100%)", fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif' }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <WaterQualityCard light={false} />
        <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>Dark Theme</p>
      </div>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <WaterQualityCard light={true} />
        <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>visionOS Light Theme</p>
      </div>
    </div>
  );
}
