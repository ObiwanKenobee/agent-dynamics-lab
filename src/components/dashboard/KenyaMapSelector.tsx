import { useState } from "react";
import { motion } from "framer-motion";

export type KenyaRegion = {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: "county" | "watershed" | "ecosystem" | "urban";
};

const regions: KenyaRegion[] = [
  // Major counties / zones simplified as grid regions
  { id: "nairobi", name: "Nairobi", x: 185, y: 235, w: 22, h: 18, type: "urban" },
  { id: "mombasa", name: "Mombasa", x: 230, y: 310, w: 20, h: 16, type: "urban" },
  { id: "kisumu", name: "Kisumu", x: 105, y: 195, w: 24, h: 20, type: "urban" },
  { id: "nakuru", name: "Nakuru", x: 150, y: 200, w: 28, h: 24, type: "county" },
  { id: "eldoret", name: "Uasin Gishu", x: 130, y: 165, w: 26, h: 22, type: "county" },
  { id: "nyeri", name: "Nyeri", x: 175, y: 195, w: 24, h: 20, type: "county" },
  { id: "meru", name: "Meru", x: 200, y: 180, w: 28, h: 24, type: "county" },
  { id: "machakos", name: "Machakos", x: 195, y: 255, w: 30, h: 26, type: "county" },
  { id: "kajiado", name: "Kajiado", x: 165, y: 265, w: 32, h: 28, type: "county" },
  { id: "kilifi", name: "Kilifi", x: 235, y: 280, w: 24, h: 28, type: "county" },
  { id: "garissa", name: "Garissa", x: 250, y: 210, w: 40, h: 36, type: "county" },
  { id: "turkana", name: "Turkana", x: 130, y: 80, w: 45, h: 50, type: "county" },
  { id: "marsabit", name: "Marsabit", x: 200, y: 90, w: 50, h: 45, type: "county" },
  { id: "mandera", name: "Mandera", x: 270, y: 80, w: 35, h: 35, type: "county" },
  { id: "wajir", name: "Wajir", x: 265, y: 140, w: 40, h: 40, type: "county" },
  { id: "isiolo", name: "Isiolo", x: 215, y: 155, w: 35, h: 30, type: "county" },
  { id: "lamu", name: "Lamu", x: 260, y: 260, w: 22, h: 20, type: "county" },
  { id: "tanariver", name: "Tana River", x: 240, y: 235, w: 30, h: 30, type: "watershed" },
  { id: "kitui", name: "Kitui", x: 220, y: 240, w: 28, h: 30, type: "county" },
  { id: "makueni", name: "Makueni", x: 200, y: 280, w: 28, h: 26, type: "county" },
  { id: "nyandarua", name: "Nyandarua", x: 155, y: 185, w: 22, h: 18, type: "county" },
  { id: "laikipia", name: "Laikipia", x: 175, y: 165, w: 28, h: 22, type: "ecosystem" },
  { id: "samburu", name: "Samburu", x: 185, y: 135, w: 30, h: 28, type: "ecosystem" },
  { id: "westpokot", name: "West Pokot", x: 110, y: 140, w: 24, h: 22, type: "county" },
  { id: "baringo", name: "Baringo", x: 140, y: 155, w: 26, h: 24, type: "watershed" },
  { id: "nandi", name: "Nandi", x: 118, y: 185, w: 22, h: 18, type: "county" },
  { id: "kakamega", name: "Kakamega", x: 95, y: 175, w: 22, h: 20, type: "county" },
  { id: "bungoma", name: "Bungoma", x: 85, y: 165, w: 22, h: 18, type: "county" },
  { id: "transnzoia", name: "Trans Nzoia", x: 105, y: 155, w: 22, h: 18, type: "county" },
  { id: "narok", name: "Narok", x: 135, y: 235, w: 32, h: 28, type: "ecosystem" },
  { id: "bomet", name: "Bomet", x: 125, y: 225, w: 22, h: 18, type: "county" },
  { id: "kericho", name: "Kericho", x: 125, y: 210, w: 22, h: 18, type: "county" },
  { id: "kwale", name: "Kwale", x: 220, y: 320, w: 24, h: 20, type: "county" },
  { id: "taita", name: "Taita Taveta", x: 200, y: 305, w: 30, h: 24, type: "ecosystem" },
];

const typeColors: Record<string, { fill: string; label: string }> = {
  county: { fill: "hsl(var(--primary) / 0.3)", label: "County" },
  watershed: { fill: "hsl(var(--accent) / 0.4)", label: "Watershed" },
  ecosystem: { fill: "hsl(var(--success) / 0.35)", label: "Ecosystem" },
  urban: { fill: "hsl(var(--warning) / 0.4)", label: "Urban Zone" },
};

interface KenyaMapSelectorProps {
  selected: string[];
  onToggle: (regionId: string) => void;
}

export function KenyaMapSelector({ selected, onToggle }: KenyaMapSelectorProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <p className="data-label mb-1.5">Geography (click to select)</p>
      <div className="relative bg-secondary/50 rounded-lg border border-border overflow-hidden">
        <svg viewBox="60 50 270 310" className="w-full h-auto" style={{ maxHeight: 220 }}>
          {/* Kenya outline approximation */}
          <path
            d="M95 160 L85 155 L80 170 L85 190 L95 210 L105 220 L120 240 L130 260 L155 275 L170 290 L185 305 L200 320 L215 335 L235 330 L255 315 L265 295 L270 270 L275 250 L285 220 L300 185 L310 150 L305 120 L290 90 L270 75 L245 70 L220 75 L200 80 L180 90 L165 105 L145 120 L125 135 L110 148 Z"
            fill="hsl(var(--secondary))"
            stroke="hsl(var(--border))"
            strokeWidth="1.5"
            opacity="0.6"
          />

          {/* Lake Victoria approximation */}
          <ellipse cx="90" cy="200" rx="18" ry="22" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.8" />
          <text x="90" y="204" textAnchor="middle" fill="hsl(var(--primary) / 0.4)" fontSize="5" fontFamily="monospace">L. Victoria</text>

          {/* Regions */}
          {regions.map((r) => {
            const isSelected = selected.includes(r.id);
            const isHovered = hoveredRegion === r.id;
            const color = typeColors[r.type];

            return (
              <g key={r.id} onClick={() => onToggle(r.id)} onMouseEnter={() => setHoveredRegion(r.id)} onMouseLeave={() => setHoveredRegion(null)} style={{ cursor: "pointer" }}>
                <rect
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  rx={3}
                  fill={isSelected ? "hsl(var(--primary) / 0.5)" : color.fill}
                  stroke={isSelected ? "hsl(var(--primary))" : isHovered ? "hsl(var(--foreground) / 0.5)" : "hsl(var(--border) / 0.5)"}
                  strokeWidth={isSelected ? 1.5 : 0.8}
                  opacity={isHovered ? 1 : 0.85}
                />
                <text
                  x={r.x + r.w / 2}
                  y={r.y + r.h / 2 + 1.5}
                  textAnchor="middle"
                  fill={isSelected ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground) / 0.7)"}
                  fontSize={r.w < 24 ? "4" : "5"}
                  fontFamily="monospace"
                  pointerEvents="none"
                >
                  {r.name.length > 8 ? r.name.slice(0, 7) + "…" : r.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover tooltip */}
        {hoveredRegion && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-2 right-2 bg-card border border-border rounded px-2 py-1 text-[10px] font-mono shadow-lg"
          >
            <span className="text-foreground font-medium">
              {regions.find((r) => r.id === hoveredRegion)?.name}
            </span>
            <span className="text-muted-foreground ml-1.5">
              {typeColors[regions.find((r) => r.id === hoveredRegion)?.type || "county"].label}
            </span>
          </motion.div>
        )}
      </div>

      {/* Legend + selected count */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {Object.entries(typeColors).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm" style={{ background: val.fill }} />
              <span className="text-[9px] font-mono text-muted-foreground">{val.label}</span>
            </div>
          ))}
        </div>
        <span className="text-[10px] font-mono text-primary">{selected.length} selected</span>
      </div>
    </div>
  );
}
