import { useState } from "react";
import { motion } from "framer-motion";

type SliderParam = {
  label: string;
  key: string;
  defaultValue: number;
  unit?: string;
};

const params: SliderParam[] = [
  { label: "Policy Enforcement Strength", key: "enforcement", defaultValue: 65, unit: "%" },
  { label: "Subsidy Generosity", key: "subsidy", defaultValue: 50, unit: "%" },
  { label: "Investor Patience", key: "patience", defaultValue: 40, unit: "%" },
  { label: "Public Trust", key: "trust", defaultValue: 55, unit: "%" },
  { label: "Market Volatility", key: "volatility", defaultValue: 60, unit: "%" },
  { label: "Climate Shock Severity", key: "climate", defaultValue: 45, unit: "%" },
  { label: "Agent Coordination Capacity", key: "coordination", defaultValue: 52, unit: "%" },
];

export function SensitivityControls({ visible }: { visible: boolean }) {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(params.map((p) => [p.key, p.defaultValue]))
  );

  if (!visible) return null;

  const updateValue = (key: string, val: number) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg glow-border p-5"
    >
      <h3 className="panel-header mb-4">Incentive Sensitivity Controls</h3>
      <p className="text-[11px] text-muted-foreground mb-4">Adjust assumptions and rerun the simulation</p>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {params.map((p) => (
          <div key={p.key}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-foreground">{p.label}</span>
              <span className="text-xs font-mono text-primary">{values[p.key]}{p.unit}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={values[p.key]}
              onChange={(e) => updateValue(p.key, Number(e.target.value))}
              className="sensitivity-slider w-full h-1 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_6px_hsl(var(--primary)/0.5)]"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
