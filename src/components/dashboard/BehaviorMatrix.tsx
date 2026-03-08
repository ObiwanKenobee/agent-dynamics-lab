import { motion } from "framer-motion";
import { behaviorMatrix } from "@/data/mockAgents";

const sentimentDot = {
  positive: "bg-success",
  negative: "bg-destructive",
  neutral: "bg-muted-foreground",
  mixed: "bg-accent",
};

export function BehaviorMatrix({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg glow-border p-5"
    >
      <h3 className="panel-header mb-4">Behavioral Response Matrix</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="data-label text-left py-2 pr-4">Agent</th>
              <th className="data-label text-left py-2 pr-4">Initial Response</th>
              <th className="data-label text-left py-2 pr-4">Mid-Term Response</th>
              <th className="data-label text-left py-2">Long-Term Outcome</th>
            </tr>
          </thead>
          <tbody>
            {behaviorMatrix.map((row, i) => (
              <motion.tr
                key={row.agent}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
              >
                <td className="py-2.5 pr-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${sentimentDot[row.sentiment]}`} />
                    <span className="text-foreground font-medium text-xs">{row.agent}</span>
                  </div>
                </td>
                <td className="py-2.5 pr-4 text-xs text-muted-foreground">{row.initial}</td>
                <td className="py-2.5 pr-4 text-xs text-muted-foreground">{row.midTerm}</td>
                <td className="py-2.5 text-xs text-foreground">{row.longTerm}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
