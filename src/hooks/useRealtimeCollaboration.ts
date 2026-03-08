import { useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RealtimeCallbacks {
  onScenarioChange?: (payload: any) => void;
  onResultChange?: (payload: any) => void;
}

export function useRealtimeCollaboration(callbacks: RealtimeCallbacks) {
  const channelRef = useRef<any>(null);

  useEffect(() => {
    const channel = supabase
      .channel("simulation-collab")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "scenarios" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            toast.info("New scenario created by collaborator");
          } else if (payload.eventType === "UPDATE") {
            toast.info("Scenario updated by collaborator");
          }
          callbacks.onScenarioChange?.(payload);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "simulation_results" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            toast.info("New simulation results available");
          }
          callbacks.onResultChange?.(payload);
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Realtime collaboration active");
        }
      });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const broadcastPresence = useCallback((state: Record<string, any>) => {
    channelRef.current?.track(state);
  }, []);

  return { broadcastPresence };
}
