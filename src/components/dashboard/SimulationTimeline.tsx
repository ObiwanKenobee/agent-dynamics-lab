import { useState } from "react";
import { motion } from "framer-motion";
import { simulationTimeline, agents } from "@/data/mockAgents";

const impactColors = {
  positive: "bg-success",
  negative: "bg-destructive",
  neutral: "bg-muted-foreground",
};

const impactBorderColors = {
  positive: "border-success/30",
  negative: "border-destructive/30",
  neutral: "border-border",
};

export function SimulationTimeline({ visible }: { visible: boolean }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg glow-border p-5"
    >
      <h3 className="panel-header mb-4">Simulation Timeline</h3>

      <div className="relative">
        {/* Timeline track */}
        <div className="absolute top-3 left-0 right-0 h-px bg-border" />

        <div className="flex justify-between relative">
          {simulationTimeline.map((event, i) => {
            const agentData = agents.find((a) => a.id === event.agentType);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center cursor-pointer group relative"
                style={{ width: `${100 / simulationTimeline.length}%` }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Node */}
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-200 z-10 ${
                    activeIndex === i
                      ? `${impactColors[event.impact]} border-transparent shadow-[0_0_8px_hsl(var(--primary)/0.5)]`
                      : "bg-background border-muted-foreground/50"
                  }`}
                />

                {/* Label */}
                <p className="text-[9px] font-mono text-muted-foreground mt-2 text-center">{event.month}</p>

                {/* Tooltip */}
                {activeIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-surface-overlay border ${impactBorderColors[event.impact]} rounded-lg p-3 z-20 shadow-xl`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs">{agentData?.icon}</span>
                      <p className="text-xs font-semibold text-foreground">{event.title}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{event.description}</p>
                    <div className={`mt-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono ${
                      event.impact === "positive" ? "bg-success/10 text-success" :
                      event.impact === "negative" ? "bg-destructive/10 text-destructive" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      <div className={`w-1 h-1 rounded-full ${impactColors[event.impact]}`} />
                      {event.impact}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Playback hint */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="w-full max-w-md h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">SCRUB TIMELINE</span>
      </div>
    </motion.div>
  );
}
