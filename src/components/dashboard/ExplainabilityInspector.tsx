import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, AlertTriangle, Info } from "lucide-react";

type CausalEvent = {
  id: string;
  event: string;
  timestamp: string;
  uncertainty: "low" | "medium" | "high";
  drivingAgents: string[];
  strongestIncentives: string[];
  keyConstraints: string[];
  dataAssumptions: string[];
  alternativeOutcomes: string[];
};

const causalEvents: CausalEvent[] = [
  {
    id: "e1",
    event: "Corporations begin relocating operations",
    timestamp: "Month 6–12",
    uncertainty: "medium",
    drivingAgents: ["Large Corporations", "Investors", "Logistics Companies"],
    strongestIncentives: ["Carbon tax increased operating costs by 14%", "Neighboring regions have weaker enforcement", "Investor pressure favored low-risk jurisdictions"],
    keyConstraints: ["Supply chain flexibility was moderate-high", "Relocation costs partially offset by tax savings", "Skilled labor availability in target regions"],
    dataAssumptions: ["Baseline carbon price of $25/ton", "No retaliatory trade barriers assumed", "Stable political environment in alternative regions"],
    alternativeOutcomes: ["Corporations invest in on-site decarbonization instead (35% probability)", "Government introduces border adjustment tariff (20% probability)", "Relocation stalls due to infrastructure gaps (15% probability)"],
  },
  {
    id: "e2",
    event: "Community resistance emerges in rural counties",
    timestamp: "Month 8–18",
    uncertainty: "high",
    drivingAgents: ["Communities", "Farmers", "Activists"],
    strongestIncentives: ["Energy costs rose 22% in affected areas", "No transition support for smallholders", "Activist networks amplified local grievances"],
    keyConstraints: ["Limited government responsiveness", "Weak social safety nets", "Fragmented community leadership"],
    dataAssumptions: ["Income elasticity set at -0.6 for energy price shocks", "No emergency relief packages modeled", "Social media diffusion rate based on 2024 baselines"],
    alternativeOutcomes: ["Government fast-tracks targeted subsidies (40% probability)", "Resistance remains localized and fades (25% probability)", "Escalation triggers policy reversal (10% probability)"],
  },
  {
    id: "e3",
    event: "Carbon credit market reaches critical adoption",
    timestamp: "Month 8–14",
    uncertainty: "low",
    drivingAgents: ["Investors", "Corporations", "International Institutions"],
    strongestIncentives: ["Early-mover premium on carbon credits", "Regulatory compliance pathway", "ESG fund inflows doubled quarter-over-quarter"],
    keyConstraints: ["Market infrastructure maturity", "Verification and MRV capacity", "Price discovery in thin markets"],
    dataAssumptions: ["Carbon price floor at $20/ton", "Verification infrastructure scales linearly", "International demand remains stable"],
    alternativeOutcomes: ["Market fragmentation delays adoption (20% probability)", "Oversupply crashes credit prices (15% probability)", "Blockchain verification accelerates trust (30% probability)"],
  },
  {
    id: "e4",
    event: "Regenerative agriculture adoption accelerates",
    timestamp: "Year 1.5–3",
    uncertainty: "medium",
    drivingAgents: ["Farmers", "NGOs", "Government"],
    strongestIncentives: ["Subsidy support for transition costs", "Carbon credit revenue for regenerative practices", "NGO training and extension services"],
    keyConstraints: ["Knowledge gap among smallholders", "Upfront transition costs", "Market demand for regenerative products uncertain"],
    dataAssumptions: ["Subsidy covers 60% of transition costs", "Yield recovery within 2 seasons", "Premium market access for certified producers"],
    alternativeOutcomes: ["Adoption stalls without sustained subsidies (30% probability)", "Peer effects accelerate beyond projections (25% probability)", "Climate shocks disrupt transition timeline (20% probability)"],
  },
];

const uncertaintyConfig = {
  low: { color: "text-success", bg: "bg-success/10", label: "LOW" },
  medium: { color: "text-accent", bg: "bg-accent/10", label: "MEDIUM" },
  high: { color: "text-destructive", bg: "bg-destructive/10", label: "HIGH" },
};

export function ExplainabilityInspector({ visible }: { visible: boolean }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg glow-border p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="panel-header">Explainability Inspector</h3>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
          <Info className="w-3 h-3" />
          Click any event to inspect causal chain
        </div>
      </div>

      <div className="space-y-2">
        {causalEvents.map((event, i) => {
          const isExpanded = expandedId === event.id;
          const uc = uncertaintyConfig[event.uncertainty];

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="border border-border/50 rounded-lg overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : event.id)}
                className="w-full flex items-center gap-3 p-3 hover:bg-secondary/30 transition-colors text-left"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{event.event}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{event.timestamp}</p>
                </div>
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono ${uc.bg} ${uc.color}`}>
                  <AlertTriangle className="w-2.5 h-2.5" />
                  {uc.label} UNCERTAINTY
                </span>
              </button>

              {/* Expanded Detail */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-4 pt-1 space-y-4 border-t border-border/30">
                      {/* Driving Agents */}
                      <CausalSection title="Driving Agents">
                        <div className="flex flex-wrap gap-1.5">
                          {event.drivingAgents.map((a) => (
                            <span key={a} className="px-2 py-0.5 rounded text-[10px] font-mono bg-primary/10 text-primary border border-primary/20">
                              {a}
                            </span>
                          ))}
                        </div>
                      </CausalSection>

                      {/* Strongest Incentives */}
                      <CausalSection title="Strongest Incentives">
                        <div className="space-y-1">
                          {event.strongestIncentives.map((inc, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full bg-success mt-1.5 flex-shrink-0" />
                              <span className="text-[11px] text-foreground/80">{inc}</span>
                            </div>
                          ))}
                        </div>
                      </CausalSection>

                      {/* Key Constraints */}
                      <CausalSection title="Key Constraints">
                        <div className="space-y-1">
                          {event.keyConstraints.map((c, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                              <span className="text-[11px] text-foreground/80">{c}</span>
                            </div>
                          ))}
                        </div>
                      </CausalSection>

                      {/* Data Assumptions */}
                      <CausalSection title="Major Data Assumptions">
                        <div className="space-y-1">
                          {event.dataAssumptions.map((a, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                              <span className="text-[11px] text-muted-foreground">{a}</span>
                            </div>
                          ))}
                        </div>
                      </CausalSection>

                      {/* Alternative Outcomes */}
                      <CausalSection title="Alternative Plausible Outcomes">
                        <div className="space-y-1.5">
                          {event.alternativeOutcomes.map((alt, j) => (
                            <div key={j} className="flex items-start gap-2 bg-secondary/30 rounded px-2 py-1.5">
                              <span className="text-[11px] text-foreground/70">{alt}</span>
                            </div>
                          ))}
                        </div>
                      </CausalSection>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function CausalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="data-label mb-1.5">{title}</p>
      {children}
    </div>
  );
}
