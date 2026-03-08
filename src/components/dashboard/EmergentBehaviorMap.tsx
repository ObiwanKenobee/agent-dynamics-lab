import { useState } from "react";
import { motion } from "framer-motion";

type Zone = {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: "cooperation" | "resistance" | "adaptation" | "capital" | "stress";
  intensity: number;
  description: string;
};

const zoneColors: Record<string, { fill: string; stroke: string; label: string }> = {
  cooperation: { fill: "hsl(180,70%,45%)", stroke: "hsl(180,70%,55%)", label: "Cooperation Hotspot" },
  resistance: { fill: "hsl(0,70%,50%)", stroke: "hsl(0,70%,60%)", label: "Resistance Zone" },
  adaptation: { fill: "hsl(150,60%,42%)", stroke: "hsl(150,60%,52%)", label: "High Adaptation" },
  capital: { fill: "hsl(40,90%,55%)", stroke: "hsl(40,90%,65%)", label: "Capital Corridor" },
  stress: { fill: "hsl(280,60%,50%)", stroke: "hsl(280,60%,60%)", label: "Social Stress" },
};

const zones: Zone[] = [
  { id: "z1", name: "Central Highlands", x: 280, y: 80, w: 120, h: 90, type: "cooperation", intensity: 0.8, description: "NGO-farmer alliances driving regenerative adoption" },
  { id: "z2", name: "Western Basin", x: 80, y: 140, w: 140, h: 70, type: "resistance", intensity: 0.7, description: "Community protests against energy cost increases" },
  { id: "z3", name: "Eastern Corridor", x: 440, y: 120, w: 100, h: 110, type: "capital", intensity: 0.85, description: "Investor capital flowing into green infrastructure" },
  { id: "z4", name: "Northern Agricultural Belt", x: 200, y: 30, w: 160, h: 60, type: "adaptation", intensity: 0.65, description: "Subsidy-supported counties shifting to sustainable practices" },
  { id: "z5", name: "Southern Urban Zone", x: 240, y: 230, w: 130, h: 80, type: "stress", intensity: 0.6, description: "Rising unemployment from industrial transition" },
  { id: "z6", name: "Coastal Region", x: 470, y: 250, w: 90, h: 70, type: "cooperation", intensity: 0.55, description: "Fishing communities and regulators aligning on marine protections" },
  { id: "z7", name: "Southwest Arid Zone", x: 60, y: 240, w: 110, h: 65, type: "resistance", intensity: 0.5, description: "Pastoral communities resist new water tariff policies" },
  { id: "z8", name: "Metro Capital", x: 320, y: 180, w: 80, h: 60, type: "capital", intensity: 0.9, description: "Regulatory and financial institutions driving compliance infrastructure" },
];

const flowPaths = [
  { from: { x: 460, y: 170 }, to: { x: 340, y: 200 }, label: "Capital inflow" },
  { from: { x: 300, y: 110 }, to: { x: 260, y: 60 }, label: "Policy support" },
  { from: { x: 140, y: 170 }, to: { x: 240, y: 250 }, label: "Migration pressure" },
];

export function EmergentBehaviorMap({ visible }: { visible: boolean }) {
  const [hoveredZone, setHoveredZone] = useState<Zone | null>(null);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg glow-border p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="panel-header">Emergent Behavior Map</h3>
        <div className="flex gap-3 flex-wrap">
          {Object.entries(zoneColors).map(([type, config]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: config.fill, opacity: 0.6 }} />
              <span className="text-[9px] font-mono text-muted-foreground">{config.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <svg width="600" height="340" className="w-full" viewBox="0 0 600 340">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="hsl(220,15%,15%)" strokeWidth="0.5" />
            </pattern>
            {/* Glow filters */}
            {Object.entries(zoneColors).map(([type, config]) => (
              <filter key={type} id={`glow-${type}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feFlood floodColor={config.fill} floodOpacity="0.3" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          <rect width="600" height="340" fill="url(#grid)" />

          {/* Landmass outline - abstract region shape */}
          <path
            d="M60,30 Q150,10 300,25 Q450,15 540,60 Q570,120 550,200 Q540,280 480,310 Q380,330 280,320 Q180,330 100,300 Q40,270 50,200 Q30,130 60,30Z"
            fill="none"
            stroke="hsl(220,15%,22%)"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />

          {/* Flow paths (capital corridors) */}
          {flowPaths.map((flow, i) => (
            <g key={i}>
              <line
                x1={flow.from.x} y1={flow.from.y}
                x2={flow.to.x} y2={flow.to.y}
                stroke="hsl(40,90%,55%)"
                strokeWidth="1"
                strokeOpacity="0.3"
                strokeDasharray="6,4"
              >
                <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite" />
              </line>
              {/* Arrow */}
              <circle cx={flow.to.x} cy={flow.to.y} r="2" fill="hsl(40,90%,55%)" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>
          ))}

          {/* Zones */}
          {zones.map((zone) => {
            const colors = zoneColors[zone.type];
            const isHovered = hoveredZone?.id === zone.id;
            return (
              <g
                key={zone.id}
                onMouseEnter={() => setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
                className="cursor-pointer"
              >
                <rect
                  x={zone.x}
                  y={zone.y}
                  width={zone.w}
                  height={zone.h}
                  rx="6"
                  fill={colors.fill}
                  fillOpacity={isHovered ? zone.intensity * 0.4 : zone.intensity * 0.15}
                  stroke={colors.stroke}
                  strokeWidth={isHovered ? 1.5 : 0.5}
                  strokeOpacity={isHovered ? 0.8 : 0.3}
                  filter={isHovered ? `url(#glow-${zone.type})` : undefined}
                  className="transition-all duration-300"
                />
                {/* Pulse for high intensity */}
                {zone.intensity > 0.7 && (
                  <circle
                    cx={zone.x + zone.w / 2}
                    cy={zone.y + zone.h / 2}
                    r="4"
                    fill={colors.fill}
                    opacity="0.6"
                  >
                    <animate attributeName="r" values="3;8;3" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite" />
                  </circle>
                )}
                <text
                  x={zone.x + zone.w / 2}
                  y={zone.y + zone.h / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={colors.fill}
                  fillOpacity={isHovered ? 1 : 0.7}
                  fontSize="8"
                  fontFamily="JetBrains Mono, monospace"
                  className="pointer-events-none"
                >
                  {zone.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoveredZone && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 bg-surface-overlay border border-border rounded-lg p-3 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: zoneColors[hoveredZone.type].fill }}
              />
              <span className="text-xs font-semibold text-foreground">{hoveredZone.name}</span>
              <span className="ml-auto text-[9px] font-mono px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
                {zoneColors[hoveredZone.type].label}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">{hoveredZone.description}</p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="data-label">Intensity</span>
              <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${hoveredZone.intensity * 100}%`, backgroundColor: zoneColors[hoveredZone.type].fill }}
                />
              </div>
              <span className="text-[10px] font-mono text-foreground">{Math.round(hoveredZone.intensity * 100)}%</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
