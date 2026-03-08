import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AgentType } from "@/data/mockAgents";

const trustColors = {
  trusts: "bg-success/20 text-success",
  distrusts: "bg-destructive/20 text-destructive",
  aligned: "bg-primary/20 text-primary",
  dependent: "bg-accent/20 text-accent",
  neutral: "bg-secondary text-secondary-foreground",
};

export function AgentProfileDrawer({ agent, onClose }: { agent: AgentType | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {agent && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-[420px] bg-card border-l border-border z-50 overflow-y-auto scrollbar-thin"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{agent.icon}</span>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{agent.type}</h2>
                    <p className="text-xs text-muted-foreground font-mono">{agent.count} agents in simulation</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 rounded hover:bg-secondary transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Decision Architecture */}
              <Section title="Goals">
                <div className="space-y-1">
                  {agent.profile.goals.map((g) => (
                    <div key={g} className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      <span className="text-foreground">{g}</span>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Constraints">
                <div className="flex flex-wrap gap-1.5">
                  {agent.profile.constraints.map((c) => (
                    <span key={c} className="scenario-badge">{c}</span>
                  ))}
                </div>
              </Section>

              <Section title="Incentives">
                <div className="flex flex-wrap gap-1.5">
                  {agent.profile.incentives.map((inc) => (
                    <span key={inc} className="px-2 py-0.5 rounded text-xs font-mono bg-primary/10 text-primary">{inc}</span>
                  ))}
                </div>
              </Section>

              <Section title="Risk Tolerance">
                <div className="flex items-center gap-2">
                  <RiskBadge level={agent.profile.riskTolerance} />
                </div>
              </Section>

              <Section title="Behavior Style">
                <span className="px-3 py-1 rounded-full text-xs font-mono border border-primary/30 text-primary">
                  {agent.profile.behaviorStyle}
                </span>
              </Section>

              <Section title="Trust Relationships">
                <div className="space-y-1.5">
                  {agent.profile.trustRelationships.map((tr) => (
                    <div key={tr.agent} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{tr.agent}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${trustColors[tr.level]}`}>
                        {tr.level}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Quick Stats */}
              <Section title="Simulation Metrics">
                <div className="grid grid-cols-2 gap-3">
                  <StatBox label="Influence" value={agent.influence} />
                  <StatBox label="Coordination" value={agent.coordination} />
                  <StatBox label="Adaptability" value={agent.adaptability} />
                  <StatBox label="Compliance" value={agent.compliance} />
                  <StatBox label="Volatility" value={agent.volatility} />
                </div>
              </Section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="data-label mb-2">{title}</p>
      {children}
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-secondary/50 rounded p-2">
      <p className="text-[10px] text-muted-foreground font-mono">{label}</p>
      <p className="text-lg font-mono font-bold text-foreground">{value}</p>
    </div>
  );
}

function RiskBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    low: "bg-success/20 text-success border-success/30",
    medium: "bg-accent/20 text-accent border-accent/30",
    high: "bg-destructive/20 text-destructive border-destructive/30",
    opportunistic: "bg-primary/20 text-primary border-primary/30",
    defensive: "bg-info/20 text-info border-info/30",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-mono border ${colors[level] || colors.medium}`}>
      {level}
    </span>
  );
}
