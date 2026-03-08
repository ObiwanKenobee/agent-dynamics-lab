export type AgentType = {
  id: string;
  type: string;
  icon: string;
  count: number;
  influence: number;
  coordination: number;
  sentiment: "positive" | "neutral" | "negative" | "mixed";
  adaptability: number;
  compliance: number;
  volatility: number;
  subAgents: { name: string; region: string }[];
  profile: {
    goals: string[];
    constraints: string[];
    incentives: string[];
    riskTolerance: "low" | "medium" | "high" | "opportunistic" | "defensive";
    behaviorStyle: "reactive" | "strategic" | "cooperative" | "extractive" | "adaptive" | "resistant";
    trustRelationships: { agent: string; level: "trusts" | "distrusts" | "aligned" | "dependent" | "neutral" }[];
  };
};

export const agents: AgentType[] = [
  {
    id: "gov",
    type: "Governments",
    icon: "🏛️",
    count: 47,
    influence: 92,
    coordination: 68,
    sentiment: "neutral",
    adaptability: 45,
    compliance: 88,
    volatility: 32,
    subAgents: [
      { name: "National Treasury", region: "Federal" },
      { name: "Ministry of Environment", region: "Federal" },
      { name: "County Governments", region: "Regional" },
      { name: "Water Resource Authority", region: "Federal" },
    ],
    profile: {
      goals: ["Maximize voter approval", "Reduce fiscal deficit", "Meet climate targets", "Maintain stability"],
      constraints: ["Budget limits", "Political cycles", "Legal frameworks", "International obligations"],
      incentives: ["Donor funding", "Public reputation", "Trade agreements", "Carbon credit revenue"],
      riskTolerance: "low",
      behaviorStyle: "strategic",
      trustRelationships: [
        { agent: "Regulators", level: "aligned" },
        { agent: "Corporations", level: "neutral" },
        { agent: "Activists", level: "distrusts" },
        { agent: "International Institutions", level: "dependent" },
      ],
    },
  },
  {
    id: "corp",
    type: "Corporations",
    icon: "🏢",
    count: 234,
    influence: 87,
    coordination: 72,
    sentiment: "mixed",
    adaptability: 65,
    compliance: 58,
    volatility: 55,
    subAgents: [
      { name: "Agribusiness Firms", region: "Multi-regional" },
      { name: "Energy Companies", region: "National" },
      { name: "Exporters", region: "Global" },
      { name: "Logistics Companies", region: "Regional" },
    ],
    profile: {
      goals: ["Maximize revenue", "Reduce compliance cost", "Market expansion", "Supply chain security"],
      constraints: ["Regulatory requirements", "Capital availability", "Market competition", "ESG pressure"],
      incentives: ["Tax breaks", "Market access", "Carbon credit upside", "Brand reputation"],
      riskTolerance: "opportunistic",
      behaviorStyle: "adaptive",
      trustRelationships: [
        { agent: "Investors", level: "dependent" },
        { agent: "Governments", level: "neutral" },
        { agent: "Communities", level: "distrusts" },
        { agent: "Regulators", level: "neutral" },
      ],
    },
  },
  {
    id: "comm",
    type: "Communities",
    icon: "👥",
    count: 1840,
    influence: 45,
    coordination: 38,
    sentiment: "negative",
    adaptability: 72,
    compliance: 62,
    volatility: 68,
    subAgents: [
      { name: "Urban Settlements", region: "Metropolitan" },
      { name: "Rural Villages", region: "County" },
      { name: "Indigenous Groups", region: "Protected Areas" },
      { name: "Fishing Communities", region: "Coastal" },
    ],
    profile: {
      goals: ["Preserve livelihoods", "Access clean water", "Land tenure security", "Ecosystem health"],
      constraints: ["Infrastructure gaps", "Climate exposure", "Market access", "Political marginalization"],
      incentives: ["Subsidies", "Training programs", "Land rights", "Microfinance"],
      riskTolerance: "defensive",
      behaviorStyle: "reactive",
      trustRelationships: [
        { agent: "NGOs", level: "trusts" },
        { agent: "Governments", level: "distrusts" },
        { agent: "Corporations", level: "distrusts" },
        { agent: "Farmers", level: "aligned" },
      ],
    },
  },
  {
    id: "inv",
    type: "Investors",
    icon: "💰",
    count: 89,
    influence: 85,
    coordination: 55,
    sentiment: "positive",
    adaptability: 82,
    compliance: 70,
    volatility: 78,
    subAgents: [
      { name: "Institutional Investors", region: "Global" },
      { name: "Impact Funds", region: "Multi-regional" },
      { name: "Private Equity", region: "National" },
      { name: "Development Finance", region: "International" },
    ],
    profile: {
      goals: ["Risk-adjusted returns", "Portfolio diversification", "ESG compliance", "Market positioning"],
      constraints: ["Fiduciary duty", "Liquidity requirements", "Regulatory compliance", "Market sentiment"],
      incentives: ["Carbon credit upside", "Green bond premiums", "Tax incentives", "Reputation"],
      riskTolerance: "opportunistic",
      behaviorStyle: "strategic",
      trustRelationships: [
        { agent: "Corporations", level: "aligned" },
        { agent: "Governments", level: "neutral" },
        { agent: "Regulators", level: "trusts" },
        { agent: "Activists", level: "neutral" },
      ],
    },
  },
  {
    id: "act",
    type: "Activists",
    icon: "✊",
    count: 156,
    influence: 52,
    coordination: 78,
    sentiment: "negative",
    adaptability: 88,
    compliance: 25,
    volatility: 85,
    subAgents: [
      { name: "Environmental Orgs", region: "National" },
      { name: "Social Justice Groups", region: "Urban" },
      { name: "Climate Youth", region: "Global" },
    ],
    profile: {
      goals: ["Policy accountability", "Corporate transparency", "Environmental justice", "Public awareness"],
      constraints: ["Funding", "Legal restrictions", "Media access", "Political resistance"],
      incentives: ["Public support", "Donor funding", "International solidarity", "Legal victories"],
      riskTolerance: "high",
      behaviorStyle: "resistant",
      trustRelationships: [
        { agent: "NGOs", level: "aligned" },
        { agent: "Communities", level: "trusts" },
        { agent: "Corporations", level: "distrusts" },
        { agent: "Governments", level: "distrusts" },
      ],
    },
  },
  {
    id: "ngo",
    type: "NGOs",
    icon: "🌍",
    count: 73,
    influence: 58,
    coordination: 82,
    sentiment: "positive",
    adaptability: 75,
    compliance: 85,
    volatility: 28,
    subAgents: [
      { name: "Conservation NGOs", region: "National" },
      { name: "Development NGOs", region: "Regional" },
      { name: "Research Institutes", region: "Global" },
    ],
    profile: {
      goals: ["Ecosystem restoration", "Community empowerment", "Policy influence", "Knowledge sharing"],
      constraints: ["Donor dependency", "Government relations", "Capacity limits", "Political neutrality"],
      incentives: ["Grant funding", "Partnerships", "Impact metrics", "Public trust"],
      riskTolerance: "medium",
      behaviorStyle: "cooperative",
      trustRelationships: [
        { agent: "Communities", level: "trusts" },
        { agent: "Governments", level: "neutral" },
        { agent: "International Institutions", level: "aligned" },
        { agent: "Activists", level: "aligned" },
      ],
    },
  },
  {
    id: "reg",
    type: "Regulators",
    icon: "⚖️",
    count: 18,
    influence: 78,
    coordination: 60,
    sentiment: "neutral",
    adaptability: 35,
    compliance: 95,
    volatility: 15,
    subAgents: [
      { name: "Environmental Authority", region: "Federal" },
      { name: "Financial Regulator", region: "National" },
      { name: "Trade Standards Body", region: "Regional" },
    ],
    profile: {
      goals: ["Enforce compliance", "Market stability", "Environmental standards", "Consumer protection"],
      constraints: ["Mandate limits", "Resource constraints", "Political pressure", "Legal challenges"],
      incentives: ["Institutional credibility", "International benchmarks", "Budget allocation", "Public mandate"],
      riskTolerance: "low",
      behaviorStyle: "reactive",
      trustRelationships: [
        { agent: "Governments", level: "aligned" },
        { agent: "Corporations", level: "neutral" },
        { agent: "International Institutions", level: "trusts" },
      ],
    },
  },
  {
    id: "farm",
    type: "Farmers",
    icon: "🌾",
    count: 4200,
    influence: 35,
    coordination: 30,
    sentiment: "negative",
    adaptability: 55,
    compliance: 48,
    volatility: 72,
    subAgents: [
      { name: "Smallholder Farmers", region: "Rural Counties" },
      { name: "Commercial Farms", region: "Agricultural Belt" },
      { name: "Pastoral Communities", region: "Arid Lands" },
    ],
    profile: {
      goals: ["Stable income", "Input access", "Market prices", "Land security"],
      constraints: ["Climate variability", "Input costs", "Market access", "Land tenure"],
      incentives: ["Subsidies", "Extension services", "Market guarantees", "Insurance"],
      riskTolerance: "defensive",
      behaviorStyle: "reactive",
      trustRelationships: [
        { agent: "NGOs", level: "trusts" },
        { agent: "Governments", level: "distrusts" },
        { agent: "Communities", level: "aligned" },
        { agent: "Corporations", level: "dependent" },
      ],
    },
  },
  {
    id: "util",
    type: "Utilities",
    icon: "⚡",
    count: 24,
    influence: 65,
    coordination: 58,
    sentiment: "neutral",
    adaptability: 40,
    compliance: 80,
    volatility: 25,
    subAgents: [
      { name: "Power Generators", region: "National Grid" },
      { name: "Water Utilities", region: "Municipal" },
      { name: "Waste Management", region: "Urban" },
    ],
    profile: {
      goals: ["Service reliability", "Cost recovery", "Infrastructure expansion", "Efficiency gains"],
      constraints: ["Capital intensity", "Regulation", "Demand patterns", "Climate impact"],
      incentives: ["Tariff adjustments", "Green bonds", "Public-private partnerships", "Technology upgrades"],
      riskTolerance: "low",
      behaviorStyle: "adaptive",
      trustRelationships: [
        { agent: "Governments", level: "dependent" },
        { agent: "Regulators", level: "aligned" },
        { agent: "Communities", level: "neutral" },
      ],
    },
  },
  {
    id: "intl",
    type: "International Institutions",
    icon: "🌐",
    count: 12,
    influence: 75,
    coordination: 90,
    sentiment: "positive",
    adaptability: 50,
    compliance: 92,
    volatility: 10,
    subAgents: [
      { name: "World Bank", region: "Global" },
      { name: "UNEP", region: "Global" },
      { name: "Regional Development Banks", region: "Continental" },
    ],
    profile: {
      goals: ["Sustainable development", "Climate finance mobilization", "Governance improvement", "Knowledge transfer"],
      constraints: ["Mandate limitations", "Political dynamics", "Bureaucracy", "Donor conditionality"],
      incentives: ["Impact metrics", "Climate commitments", "Partnership expansion", "Innovation showcase"],
      riskTolerance: "low",
      behaviorStyle: "cooperative",
      trustRelationships: [
        { agent: "Governments", level: "aligned" },
        { agent: "NGOs", level: "trusts" },
        { agent: "Investors", level: "aligned" },
        { agent: "Regulators", level: "trusts" },
      ],
    },
  },
];

export type TimelineEvent = {
  month: string;
  title: string;
  description: string;
  agentType: string;
  impact: "positive" | "negative" | "neutral";
};

export const simulationTimeline: TimelineEvent[] = [
  { month: "Month 1", title: "Carbon tax announced", description: "Government formally introduces carbon pricing at $25/ton", agentType: "gov", impact: "neutral" },
  { month: "Month 2", title: "Industry lobbying intensifies", description: "Large manufacturers mobilize against implementation timeline", agentType: "corp", impact: "negative" },
  { month: "Month 3", title: "Investor capital rotation begins", description: "ESG funds increase allocation to low-emission supply chains", agentType: "inv", impact: "positive" },
  { month: "Month 5", title: "Smallholder input cost stress", description: "Fertilizer and fuel costs rise, affecting rural communities", agentType: "farm", impact: "negative" },
  { month: "Month 8", title: "Carbon credit platforms expand", description: "New market infrastructure accelerates adoption", agentType: "corp", impact: "positive" },
  { month: "Year 1", title: "Regulatory enforcement review", description: "Compliance rates assessed; enforcement adjustments proposed", agentType: "reg", impact: "neutral" },
  { month: "Year 1.5", title: "Community resistance emerges", description: "Rural protests over energy costs in 3 counties", agentType: "comm", impact: "negative" },
  { month: "Year 2", title: "Regenerative ag adoption rises", description: "Subsidy-supported counties show 34% increase in sustainable practices", agentType: "farm", impact: "positive" },
  { month: "Year 3", title: "Emissions reduction measurable", description: "8.2% reduction in covered sectors; ecosystem co-benefits emerging", agentType: "gov", impact: "positive" },
  { month: "Year 5", title: "System equilibrium shift", description: "New market norms established; remaining resistors face increasing cost", agentType: "intl", impact: "positive" },
];

export type BehaviorRow = {
  agent: string;
  initial: string;
  midTerm: string;
  longTerm: string;
  sentiment: "positive" | "negative" | "neutral" | "mixed";
};

export const behaviorMatrix: BehaviorRow[] = [
  { agent: "National Government", initial: "Implements tax", midTerm: "Faces lobbying pressure", longTerm: "Adjusts policy bands", sentiment: "neutral" },
  { agent: "Large Corporations", initial: "Cost shock", midTerm: "Restructure suppliers", longTerm: "Invest in lower-carbon ops", sentiment: "mixed" },
  { agent: "Farmers", initial: "Mixed adoption", midTerm: "Shift with incentives", longTerm: "Higher regenerative uptake", sentiment: "positive" },
  { agent: "Investors", initial: "Pause exposure", midTerm: "Reprice sector risk", longTerm: "Redirect to green assets", sentiment: "positive" },
  { agent: "Activists", initial: "Public support", midTerm: "Monitor loopholes", longTerm: "Push for accountability", sentiment: "neutral" },
  { agent: "Communities", initial: "Uncertainty", midTerm: "Protest & adapt", longTerm: "Stabilize with support", sentiment: "mixed" },
  { agent: "Regulators", initial: "Prepare frameworks", midTerm: "Enforce & iterate", longTerm: "Mature oversight", sentiment: "positive" },
];

export const scenarios = [
  { id: "a", name: "Carbon Tax Only", color: "primary" as const },
  { id: "b", name: "Carbon Tax + Regenerative Subsidy", color: "success" as const },
  { id: "c", name: "Carbon Tax + Subsidy + Transition Finance", color: "accent" as const },
];

export const comparisonMetrics = [
  { metric: "Emissions Reduced", a: "12%", b: "18%", c: "24%" },
  { metric: "Ecosystem Restoration", a: "Low", b: "Medium", c: "High" },
  { metric: "Food Price Impact", a: "+8%", b: "+4%", c: "+2%" },
  { metric: "Investor Response", a: "Cautious", b: "Moderate", c: "Strong" },
  { metric: "Public Approval", a: "42%", b: "58%", c: "67%" },
  { metric: "Political Resistance", a: "High", b: "Medium", c: "Low" },
  { metric: "Rural Income Stability", a: "-5%", b: "+2%", c: "+8%" },
  { metric: "Adaptation Speed", a: "Slow", b: "Moderate", c: "Fast" },
];
