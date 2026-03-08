import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";

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

export function ScenarioBuilder({ onRun }: { onRun: () => void }) {
  const [policy, setPolicy] = useState(policyLevers[0]);
  const [horizon, setHorizon] = useState(timeHorizons[2]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>(["Agriculture", "Energy"]);
  const [isRunning, setIsRunning] = useState(false);

  const toggleSector = (s: string) =>
    setSelectedSectors((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      onRun();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-lg glow-border p-5"
    >
      <h3 className="panel-header mb-4">Scenario Builder</h3>

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
          <div className="flex gap-1.5">
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

      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground font-mono text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Running Simulation...
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              Run Simulation
            </>
          )}
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded bg-secondary text-secondary-foreground font-mono text-xs hover:bg-secondary/80 transition-all">
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
        <div className="ml-auto text-[10px] font-mono text-muted-foreground">
          {selectedSectors.length} sectors · {horizon} horizon
        </div>
      </div>
    </motion.div>
  );
}
