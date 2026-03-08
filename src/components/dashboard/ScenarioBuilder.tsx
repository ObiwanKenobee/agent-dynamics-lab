import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Save, FolderOpen, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { KenyaMapSelector } from "./KenyaMapSelector";
import { useScenarioPersistence, ScenarioConfig } from "@/hooks/useScenarioPersistence";

const policyLevers = [
  "Introduce carbon tax",
  "Remove fertilizer subsidy",
  "Launch wetland restoration incentives",
  "Restrict floodplain construction",
  "Increase water tariffs",
  "Create biodiversity credits",
  "Expand public health campaign",
];

const timeHorizons = ["6 months", "1 year", "5 years", "10 years"];
const sectors = ["Agriculture", "Energy", "Logistics", "Real Estate", "Finance", "Health"];

export function ScenarioBuilder({ onRun, onConfigChange }: { onRun: () => void; onConfigChange?: (config: { policy: string; horizon: string; sectors: string[]; geography: string[] }) => void }) {
  const [policy, setPolicy] = useState(policyLevers[0]);
  const [horizon, setHorizon] = useState(timeHorizons[2]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>(["Agriculture", "Energy"]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const { savedScenarios, isSaving, saveScenario, loadScenarios, deleteScenario } = useScenarioPersistence();

  useEffect(() => {
    loadScenarios();
  }, [loadScenarios]);

  const toggleSector = (s: string) =>
    setSelectedSectors((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const toggleRegion = (id: string) =>
    setSelectedRegions((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      onRun();
    }, 1500);
  };

  const handleSave = () => {
    const config: ScenarioConfig = { policy, horizon, sectors: selectedSectors, geography: selectedRegions };
    saveScenario(config);
  };

  const handleLoad = (config: ScenarioConfig) => {
    setPolicy(config.policy);
    setHorizon(config.horizon);
    setSelectedSectors(config.sectors);
    setSelectedRegions(config.geography);
    setShowSaved(false);
  };

  const handleReset = () => {
    setPolicy(policyLevers[0]);
    setHorizon(timeHorizons[2]);
    setSelectedSectors(["Agriculture", "Energy"]);
    setSelectedRegions([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-lg glow-border p-4 md:p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="panel-header">Scenario Builder</h3>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { setShowSaved(!showSaved); if (!showSaved) loadScenarios(); }}
            className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <FolderOpen className="w-3 h-3" />
            <span className="hidden sm:inline">Saved ({savedScenarios.length})</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono bg-primary/20 text-primary hover:bg-primary/30 transition-colors disabled:opacity-50"
          >
            <Save className="w-3 h-3" />
            <span className="hidden sm:inline">{isSaving ? "Saving…" : "Save"}</span>
          </button>
        </div>
      </div>

      {/* Saved scenarios dropdown */}
      <AnimatePresence>
        {showSaved && savedScenarios.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="bg-secondary/50 rounded border border-border p-2 space-y-1 max-h-32 overflow-y-auto scrollbar-thin">
              {savedScenarios.map((s) => (
                <div key={s.id} className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-secondary/80 transition-colors">
                  <button onClick={() => handleLoad(s.config)} className="text-[11px] font-mono text-foreground truncate text-left flex-1">
                    {s.name}
                  </button>
                  <span className="text-[9px] font-mono text-muted-foreground mx-2 hidden sm:inline">
                    {new Date(s.created_at).toLocaleDateString()}
                  </span>
                  <button onClick={() => deleteScenario(s.id)} className="p-0.5 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Policy Lever */}
        <div>
          <p className="data-label mb-1.5">Policy Lever</p>
          <select
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
            className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {policyLevers.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Time Horizon */}
        <div>
          <p className="data-label mb-1.5">Time Horizon</p>
          <div className="flex flex-wrap gap-1.5">
            {timeHorizons.map((t) => (
              <button
                key={t}
                onClick={() => setHorizon(t)}
                className={`px-2.5 py-1.5 rounded text-xs font-mono transition-all ${
                  horizon === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Sectors */}
        <div>
          <p className="data-label mb-1.5">Affected Sectors</p>
          <div className="flex flex-wrap gap-1">
            {sectors.map((s) => (
              <button
                key={s}
                onClick={() => toggleSector(s)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-all ${
                  selectedSectors.includes(s)
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-secondary text-muted-foreground border border-transparent"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map toggle */}
      <div className="mt-4">
        <button
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          {showMap ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {showMap ? "Hide geography map" : "Select geography on map"}
        </button>

        <AnimatePresence>
          {showMap && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-2"
            >
              <KenyaMapSelector selected={selectedRegions} onToggle={toggleRegion} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-4 pt-4 border-t border-border/50">
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground font-mono text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Running…
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              Run Simulation
            </>
          )}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-2 rounded bg-secondary text-secondary-foreground font-mono text-xs hover:bg-secondary/80 transition-all"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
        <div className="ml-auto text-[10px] font-mono text-muted-foreground">
          {selectedSectors.length} sectors · {horizon} · {selectedRegions.length > 0 ? `${selectedRegions.length} regions` : "all regions"}
        </div>
      </div>
    </motion.div>
  );
}
