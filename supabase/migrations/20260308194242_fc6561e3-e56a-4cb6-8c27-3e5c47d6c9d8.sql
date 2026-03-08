-- Create table for saved simulation scenarios
CREATE TABLE public.scenarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Untitled Scenario',
  policy_lever TEXT NOT NULL,
  time_horizon TEXT NOT NULL,
  geography JSONB DEFAULT '[]'::jsonb,
  affected_sectors TEXT[] DEFAULT '{}',
  assumptions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for simulation results
CREATE TABLE public.simulation_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario_id UUID NOT NULL REFERENCES public.scenarios(id) ON DELETE CASCADE,
  timeline_events JSONB DEFAULT '[]'::jsonb,
  behavior_matrix JSONB DEFAULT '[]'::jsonb,
  network_states JSONB DEFAULT '[]'::jsonb,
  emergent_behaviors JSONB DEFAULT '[]'::jsonb,
  comparison_metrics JSONB DEFAULT '{}'::jsonb,
  sensitivity_params JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulation_results ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for now (no auth yet)
CREATE POLICY "Anyone can read scenarios" ON public.scenarios FOR SELECT USING (true);
CREATE POLICY "Anyone can create scenarios" ON public.scenarios FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update scenarios" ON public.scenarios FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete scenarios" ON public.scenarios FOR DELETE USING (true);

CREATE POLICY "Anyone can read results" ON public.simulation_results FOR SELECT USING (true);
CREATE POLICY "Anyone can create results" ON public.simulation_results FOR INSERT WITH CHECK (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_scenarios_updated_at
  BEFORE UPDATE ON public.scenarios
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();