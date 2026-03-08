import { useState } from "react";
import { AgentType } from "@/data/mockAgents";
import { TopMetrics } from "@/components/dashboard/TopMetrics";
import { AgentUniverseSidebar } from "@/components/dashboard/AgentUniverseSidebar";
import { AgentProfileDrawer } from "@/components/dashboard/AgentProfileDrawer";
import { ScenarioBuilder } from "@/components/dashboard/ScenarioBuilder";
import { SimulationTimeline } from "@/components/dashboard/SimulationTimeline";
import { BehaviorMatrix } from "@/components/dashboard/BehaviorMatrix";
import { SensitivityControls } from "@/components/dashboard/SensitivityControls";
import { ScenarioComparison } from "@/components/dashboard/ScenarioComparison";
import { NetworkGraph } from "@/components/dashboard/NetworkGraph";
import { Activity, Zap } from "lucide-react";

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const [simRan, setSimRan] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left: Agent Universe */}
      <AgentUniverseSidebar onSelectAgent={setSelectedAgent} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground tracking-tight">ATLAS — Agent Simulation Dashboard</h1>
              <p className="text-[10px] font-mono text-muted-foreground">Behavioral Systems Laboratory · Multi-Agent Policy Simulator</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="pulse-dot" />
            <span className="text-[10px] font-mono text-primary">SYSTEM ACTIVE</span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Top Metrics */}
          <TopMetrics />

          {/* Scenario Builder */}
          <ScenarioBuilder onRun={() => setSimRan(true)} />

          {/* Post-Simulation Sections */}
          {simRan && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mt-2">
                <Zap className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-mono text-accent">SIMULATION RESULTS</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <SimulationTimeline visible={simRan} />

              <div className="grid grid-cols-2 gap-4">
                <NetworkGraph visible={simRan} />
                <BehaviorMatrix visible={simRan} />
              </div>

              <SensitivityControls visible={simRan} />
              <ScenarioComparison visible={simRan} />
            </div>
          )}

          {!simRan && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Activity className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">No simulation running</p>
              <p className="text-xs text-muted-foreground/60 font-mono">Configure a scenario above and hit Run to begin</p>
            </div>
          )}
        </div>
      </div>

      {/* Agent Profile Drawer */}
      <AgentProfileDrawer agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
    </div>
  );
};

export default Index;
