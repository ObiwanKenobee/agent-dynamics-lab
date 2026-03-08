import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { agents, AgentType } from "@/data/mockAgents";

const sentimentColors = {
  positive: "text-success",
  neutral: "text-muted-foreground",
  negative: "text-destructive",
  mixed: "text-accent",
};

function MiniBar({ value, max = 100 }: { value: number; max?: number }) {
  return (
    <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
      <div
        className="h-full bg-primary rounded-full transition-all duration-500"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
}

function AgentCard({ agent, onSelect }: { agent: AgentType; onSelect: (a: AgentType) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="agent-card"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{agent.icon}</span>
          <div>
            <p className="text-sm font-medium text-foreground">{agent.type}</p>
            <p className="text-[10px] text-muted-foreground font-mono">{agent.count} agents</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-mono ${sentimentColors[agent.sentiment]}`}>
            {agent.sentiment.toUpperCase()}
          </span>
          {expanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-2 border-t border-border/50 pt-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                <div>
                  <p className="data-label">Influence</p>
                  <MiniBar value={agent.influence} />
                </div>
                <div>
                  <p className="data-label">Coordination</p>
                  <MiniBar value={agent.coordination} />
                </div>
                <div>
                  <p className="data-label">Adaptability</p>
                  <MiniBar value={agent.adaptability} />
                </div>
                <div>
                  <p className="data-label">Compliance</p>
                  <MiniBar value={agent.compliance} />
                </div>
                <div>
                  <p className="data-label">Volatility</p>
                  <MiniBar value={agent.volatility} />
                </div>
              </div>

              <div className="space-y-1 mt-2">
                <p className="data-label">Sub-agents</p>
                {agent.subAgents.map((s) => (
                  <button
                    key={s.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(agent);
                    }}
                    className="w-full text-left px-2 py-1 rounded text-xs hover:bg-secondary/80 transition-colors flex justify-between items-center"
                  >
                    <span className="text-foreground">{s.name}</span>
                    <span className="text-muted-foreground text-[10px] font-mono">{s.region}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function AgentUniverseSidebar({ onSelectAgent }: { onSelectAgent: (a: AgentType) => void }) {
  return (
    <div className="w-72 flex-shrink-0 bg-card/50 border-r border-border overflow-y-auto scrollbar-thin h-full">
      <div className="p-4">
        <h2 className="panel-header mb-1">Agent Universe</h2>
        <p className="text-[11px] text-muted-foreground mb-4">{agents.length} classes · {agents.reduce((s, a) => s + a.count, 0).toLocaleString()} total agents</p>
        <div className="space-y-2">
          {agents.map((agent, i) => (
            <motion.div key={agent.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <AgentCard agent={agent} onSelect={onSelectAgent} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
