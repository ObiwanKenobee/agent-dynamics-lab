import { motion } from "framer-motion";

const metrics = [
  { label: "Scenario Status", value: "ACTIVE", sub: "Carbon Tax Sim", color: "text-primary" },
  { label: "Dominant Behavior", value: "ADAPTATION", sub: "Shifting to compliance", color: "text-success" },
  { label: "Conflict Intensity", value: "MODERATE", sub: "3 friction zones", color: "text-warning" },
  { label: "Adaptation Score", value: "67/100", sub: "+12 from baseline", color: "text-primary" },
  { label: "Uncertainty Band", value: "±18%", sub: "High variance sectors", color: "text-accent" },
];

export function TopMetrics() {
  return (
    <div className="grid grid-cols-5 gap-3">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="metric-card"
        >
          <p className="data-label mb-1">{m.label}</p>
          <p className={`font-mono text-lg font-bold ${m.color}`}>{m.value}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{m.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}
