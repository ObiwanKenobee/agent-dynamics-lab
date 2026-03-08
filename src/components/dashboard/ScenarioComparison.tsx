import { motion } from "framer-motion";
import { scenarios, comparisonMetrics } from "@/data/mockAgents";

export function ScenarioComparison({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg glow-border p-5"
    >
      <h3 className="panel-header mb-4">Outcome Comparison</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="data-label text-left py-2 pr-4">Metric</th>
              {scenarios.map((s) => (
                <th key={s.id} className="data-label text-left py-2 pr-4">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${
                      s.color === "primary" ? "bg-primary" :
                      s.color === "success" ? "bg-success" : "bg-accent"
                    }`} />
                    {s.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonMetrics.map((row, i) => (
              <motion.tr
                key={row.metric}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
              >
                <td className="py-2 pr-4 text-xs font-medium text-foreground">{row.metric}</td>
                <td className="py-2 pr-4 text-xs font-mono text-muted-foreground">{row.a}</td>
                <td className="py-2 pr-4 text-xs font-mono text-muted-foreground">{row.b}</td>
                <td className="py-2 text-xs font-mono text-primary font-medium">{row.c}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
