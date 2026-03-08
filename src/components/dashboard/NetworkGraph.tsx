import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { agents } from "@/data/mockAgents";
import { Play, Pause, RotateCcw } from "lucide-react";

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
  baseStrength: number;
  // Keyframes: strength at different simulation phases
  phases: [number, number, number, number]; // initial, early, mid, late
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
  { from: "gov", to: "corp", type: "regulation", baseStrength: 0.8, phases: [0.5, 0.8, 0.9, 0.7] },
  { from: "inv", to: "corp", type: "capital", baseStrength: 0.9, phases: [0.9, 0.6, 0.7, 0.85] },
  { from: "act", to: "gov", type: "pressure", baseStrength: 0.6, phases: [0.3, 0.6, 0.9, 0.7] },
  { from: "comm", to: "gov", type: "pressure", baseStrength: 0.5, phases: [0.2, 0.5, 0.8, 0.6] },
  { from: "ngo", to: "farm", type: "trust", baseStrength: 0.7, phases: [0.7, 0.75, 0.85, 0.9] },
  { from: "corp", to: "comm", type: "dependency", baseStrength: 0.6, phases: [0.6, 0.5, 0.4, 0.3] },
  { from: "reg", to: "corp", type: "regulation", baseStrength: 0.85, phases: [0.4, 0.7, 0.9, 0.85] },
  { from: "intl", to: "gov", type: "capital", baseStrength: 0.7, phases: [0.7, 0.8, 0.75, 0.7] },
  { from: "gov", to: "farm", type: "regulation", baseStrength: 0.5, phases: [0.3, 0.5, 0.6, 0.5] },
  { from: "inv", to: "util", type: "capital", baseStrength: 0.6, phases: [0.4, 0.5, 0.7, 0.8] },
  { from: "act", to: "corp", type: "conflict", baseStrength: 0.7, phases: [0.4, 0.7, 0.9, 0.6] },
  { from: "ngo", to: "comm", type: "trust", baseStrength: 0.8, phases: [0.8, 0.82, 0.88, 0.92] },
];

const phaseLabels = ["Pre-Policy", "Early Response", "Mid-Term Shift", "Long-Term Equilibrium"];

export function NetworkGraph({ visible }: { visible: boolean }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

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

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setPhase((p) => {
          if (p >= 3) {
            setPlaying(false);
            return 3;
          }
          return p + 1;
        });
      }, 2000);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  const handlePlay = () => {
    if (phase >= 3) setPhase(0);
    setPlaying(true);
  };

  const handleReset = () => {
    setPlaying(false);
    setPhase(0);
  };

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

      <div className="relative">
        <svg width={width} height={height} className="w-full" viewBox={`0 0 ${width} ${height}`}>
          {/* Edges */}
          {edges.map((e, i) => {
            const from = nodeMap[e.from];
            const to = nodeMap[e.to];
            if (!from || !to) return null;
            const isHighlighted = hoveredNode === e.from || hoveredNode === e.to;
            const strength = e.phases[phase];
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={edgeColors[e.type]}
                strokeWidth={Math.max(0.5, strength * 3)}
                strokeOpacity={hoveredNode ? (isHighlighted ? strength : 0.05) : strength * 0.6}
                strokeDasharray={e.type === "conflict" ? "4,4" : undefined}
                className="transition-all duration-1000"
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

      {/* Playback Controls */}
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/30">
        <button
          onClick={playing ? () => setPlaying(false) : handlePlay}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary/10 text-primary text-xs font-mono hover:bg-primary/20 transition-colors"
        >
          {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          {playing ? "Pause" : "Animate"}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-secondary text-secondary-foreground text-xs font-mono hover:bg-secondary/80 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
        </button>

        {/* Phase indicator */}
        <div className="flex-1 flex items-center gap-1">
          {phaseLabels.map((label, i) => (
            <button
              key={i}
              onClick={() => { setPlaying(false); setPhase(i); }}
              className={`flex-1 text-center py-1 rounded text-[9px] font-mono transition-all duration-300 ${
                i === phase
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : i < phase
                  ? "bg-secondary/80 text-muted-foreground"
                  : "bg-secondary/30 text-muted-foreground/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
