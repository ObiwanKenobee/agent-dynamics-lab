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
import { EmergentBehaviorMap } from "@/components/dashboard/EmergentBehaviorMap";
import { ExplainabilityInspector } from "@/components/dashboard/ExplainabilityInspector";
import { useAuth } from "@/contexts/AuthContext";
import { useRealtimeCollaboration } from "@/hooks/useRealtimeCollaboration";
import { generatePolicyBrief } from "@/lib/pdfExport";
import { Activity, Zap, PanelLeftClose, PanelLeft, FileDown, LogOut, Users } from "lucide-react";

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const [simRan, setSimRan] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [scenarioConfig, setScenarioConfig] = useState({ policy: "", horizon: "", sectors: [] as string[], geography: [] as string[] });
  const { user, profile, signOut } = useAuth();

  // Real-time collaboration
  useRealtimeCollaboration({
    onScenarioChange: () => { /* Could refresh saved scenarios list */ },
    onResultChange: () => { /* Could refresh results */ },
  });

  const handleExportPDF = () => {
    generatePolicyBrief("Current Scenario", scenarioConfig);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {sidebarOpen && (
        <div className="hidden md:block">
          <AgentUniverseSidebar onSelectAgent={setSelectedAgent} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto scrollbar-thin min-w-0">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-4 md:px-6 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0"
              title={sidebarOpen ? "Hide agents" : "Show agents"}
            >
              {sidebarOpen ? (
                <PanelLeftClose className="w-4 h-4 text-muted-foreground" />
              ) : (
                <PanelLeft className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xs md:text-sm font-semibold text-foreground tracking-tight truncate">ATLAS — Agent Simulation Dashboard</h1>
              <p className="text-[10px] font-mono text-muted-foreground hidden sm:block">Behavioral Systems Laboratory · Multi-Agent Policy Simulator</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="pulse-dot" />
            <span className="text-[10px] font-mono text-primary hidden sm:inline">LIVE</span>

            <div className="hidden sm:flex items-center gap-1 ml-2 px-2 py-1 rounded bg-secondary/50">
              <Users className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[100px]">
                {profile?.display_name || user?.email}
              </span>
            </div>

            {simRan && (
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                title="Export Policy Brief"
              >
                <FileDown className="w-3 h-3" />
                <span className="hidden sm:inline">Export PDF</span>
              </button>
            )}

            <button
              onClick={signOut}
              className="p-1.5 rounded hover:bg-secondary transition-colors"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="p-3 md:p-6 space-y-4">
          {!sidebarOpen && (
            <div className="md:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-full p-3 rounded-lg bg-card border border-border text-xs font-mono text-muted-foreground hover:border-primary/30 transition-colors text-center"
              >
                Open Agent Universe Panel
              </button>
            </div>
          )}

          {sidebarOpen && (
            <div className="md:hidden fixed inset-0 z-40 flex">
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
              <div className="relative z-50">
                <AgentUniverseSidebar onSelectAgent={(a) => { setSelectedAgent(a); setSidebarOpen(false); }} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
            <TopMetrics />
          </div>

          <ScenarioBuilder
            onRun={() => setSimRan(true)}
            onConfigChange={setScenarioConfig}
          />

          {simRan && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mt-2">
                <Zap className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-mono text-accent">SIMULATION RESULTS</span>
                <div className="flex-1 h-px bg-border" />
                <button
                  onClick={handleExportPDF}
                  className="flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-mono bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <FileDown className="w-3 h-3" />
                  Export Policy Brief (PDF)
                </button>
              </div>

              <SimulationTimeline visible={simRan} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <NetworkGraph visible={simRan} />
                <EmergentBehaviorMap visible={simRan} />
              </div>

              <BehaviorMatrix visible={simRan} />
              <ExplainabilityInspector visible={simRan} />
              <SensitivityControls visible={simRan} />
              <ScenarioComparison visible={simRan} />
            </div>
          )}

          {!simRan && (
            <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Activity className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">No simulation running</p>
              <p className="text-xs text-muted-foreground/60 font-mono">Configure a scenario above and hit Run to begin</p>
            </div>
          )}
        </div>
      </div>

      <AgentProfileDrawer agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
    </div>
  );
};

export default Index;
