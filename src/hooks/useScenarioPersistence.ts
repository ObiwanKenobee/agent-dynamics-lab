import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { simulationTimeline, behaviorMatrix, comparisonMetrics } from "@/data/mockAgents";
import { toast } from "sonner";

export interface ScenarioConfig {
  policy: string;
  horizon: string;
  sectors: string[];
  geography: string[];
}

export function useScenarioPersistence() {
  const [savedScenarios, setSavedScenarios] = useState<Array<{ id: string; name: string; config: ScenarioConfig; created_at: string }>>([]);
  const [isSaving, setIsSaving] = useState(false);

  const saveScenario = useCallback(async (config: ScenarioConfig, name?: string) => {
    setIsSaving(true);
    try {
      // Save scenario
      const { data: scenario, error: scenarioError } = await supabase
        .from("scenarios")
        .insert({
          name: name || `${config.policy} — ${config.horizon}`,
          policy_lever: config.policy,
          time_horizon: config.horizon,
          affected_sectors: config.sectors,
          geography: config.geography as any,
        })
        .select()
        .single();

      if (scenarioError) throw scenarioError;

      // Save mock results linked to scenario
      const { error: resultError } = await supabase
        .from("simulation_results")
        .insert({
          scenario_id: scenario.id,
          timeline_events: simulationTimeline as any,
          behavior_matrix: behaviorMatrix as any,
          comparison_metrics: comparisonMetrics as any,
        });

      if (resultError) throw resultError;

      toast.success("Scenario saved to Cloud");
      return scenario.id;
    } catch (err: any) {
      toast.error("Failed to save: " + err.message);
      return null;
    } finally {
      setIsSaving(false);
    }
  }, []);

  const loadScenarios = useCallback(async () => {
    const { data, error } = await supabase
      .from("scenarios")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      toast.error("Failed to load scenarios");
      return;
    }

    setSavedScenarios(
      (data || []).map((s) => ({
        id: s.id,
        name: s.name,
        config: {
          policy: s.policy_lever,
          horizon: s.time_horizon,
          sectors: s.affected_sectors || [],
          geography: (s.geography as string[]) || [],
        },
        created_at: s.created_at,
      }))
    );
  }, []);

  const deleteScenario = useCallback(async (id: string) => {
    const { error } = await supabase.from("scenarios").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      setSavedScenarios((prev) => prev.filter((s) => s.id !== id));
      toast.success("Scenario deleted");
    }
  }, []);

  return { savedScenarios, isSaving, saveScenario, loadScenarios, deleteScenario };
}
