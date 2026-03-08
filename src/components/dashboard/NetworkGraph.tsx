import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { agents } from "@/data/mockAgents";

type Node = {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  influence: number;
};

type Edge = {
  from: string;
  to: string;
  type: "regulation" | "capital" | "pressure" | "dependency" | "trust" | "conflict";
  strength: number;
};

const edgeColors: Record<string, string> = {
  regulation: "hsl(180,70%,45%)",
  capital: "hsl(150,60%,42%)",
  pressure: "hsl(0,70%,50%)",
  dependency: "hsl(40,90%,55%)",
  trust: "hsl(210,80%,55%)",
  conflict: "hsl(0,70%,50%)",
};

const edges: Edge[] = [
  { from: "gov", to: "corp", type: "regulation", strength: 0.8 },
  { from: "inv", to: "corp", type: "capital", strength: 0.9 },
  { from: "act", to: "gov", type: "pressure", strength: 0.6 },
  { from: "comm", to: "gov", type: "pressure", strength: 0.5 },
  { from: "ngo", to: "farm", type: "trust", strength: 0.7 },
  { from: "corp", to: "comm", type: "dependency", strength: 0.6 },
  { from: "reg", to: "corp", type: "regulation", strength: 0.85 },
  { from: "intl", to: "gov", type: "capital", strength: 0.7 },
  { from: "gov", to: "farm", type: "regulation", strength: 0.5 },
  { from: "inv", to: "util", type: "capital", strength: 0.6 },
  { from: "act", to: "corp", type: "conflict", strength: 0.7 },
  { from: "ngo", to: "comm", type: "trust", strength: 0.8 },
];

export function NetworkGraph({ visible }: { visible: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const width = 600;
  const height = 380;
  const cx = width / 2;
  const cy = height / 2;

  // Position nodes in a circle
  const nodes: Node[] = agents.map((a, i) => {
    const angle = (i / agents.length) * 2 * Math.PI - Math.PI / 2;
    const radius = 150;
    return {
      id: a.id,
      label: a.type,
      icon: a.icon,
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
      influence: a.influence,
    };
  });

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg glow-border p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="panel-header">Interaction Network</h3>
        <div className="flex gap-3">
          {Object.entries(edgeColors).slice(0, 4).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1">
              <div className="w-3 h-0.5 rounded" style={{ backgroundColor: color }} />
              <span className="text-[9px] font-mono text-muted-foreground">{type}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="relative">
        <svg width={width} height={height} className="w-full" viewBox={`0 0 ${width} ${height}`}>
          {/* Edges */}
          {edges.map((e, i) => {
            const from = nodeMap[e.from];
            const to = nodeMap[e.to];
            if (!from || !to) return null;
            const isHighlighted = hoveredNode === e.from || hoveredNode === e.to;
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={edgeColors[e.type]}
                strokeWidth={isHighlighted ? 2 : 1}
                strokeOpacity={hoveredNode ? (isHighlighted ? 0.8 : 0.1) : 0.3}
                strokeDasharray={e.type === "conflict" ? "4,4" : undefined}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            const r = 18 + (node.influence / 100) * 8;
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={r}
                  fill="hsl(220,18%,10%)"
                  stroke={isHovered ? "hsl(180,70%,45%)" : "hsl(220,15%,18%)"}
                  strokeWidth={isHovered ? 2 : 1}
                  className="transition-all duration-200"
                />
                {isHovered && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={r + 4}
                    fill="none"
                    stroke="hsl(180,70%,45%)"
                    strokeWidth={1}
                    strokeOpacity={0.3}
                  />
                )}
                <text
                  x={node.x}
                  y={node.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="14"
                >
                  {node.icon}
                </text>
                <text
                  x={node.x}
                  y={node.y + r + 12}
                  textAnchor="middle"
                  fill={isHovered ? "hsl(200,20%,88%)" : "hsl(215,15%,50%)"}
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  className="transition-all duration-200"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </motion.div>
  );
}
