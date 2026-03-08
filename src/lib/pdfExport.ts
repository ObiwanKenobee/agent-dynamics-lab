import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { simulationTimeline, behaviorMatrix, comparisonMetrics, scenarios } from "@/data/mockAgents";

export function generatePolicyBrief(scenarioName: string, config: { policy: string; horizon: string; sectors: string[]; geography: string[] }) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFontSize(20);
  doc.setTextColor(30, 60, 80);
  doc.text("ATLAS Policy Brief", 14, 22);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated: ${new Date().toLocaleDateString()} | Agent Simulation Dashboard`, 14, 30);

  doc.setDrawColor(0, 180, 160);
  doc.setLineWidth(0.8);
  doc.line(14, 34, pageWidth - 14, 34);

  // Scenario Summary
  doc.setFontSize(14);
  doc.setTextColor(30, 60, 80);
  doc.text("Scenario Summary", 14, 44);

  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  let y = 52;
  const summaryItems = [
    ["Policy Lever", config.policy],
    ["Time Horizon", config.horizon],
    ["Affected Sectors", config.sectors.join(", ") || "All"],
    ["Geography", config.geography.length > 0 ? `${config.geography.length} regions selected` : "National"],
  ];
  summaryItems.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 14, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, 60, y);
    y += 7;
  });

  // Timeline
  y += 6;
  doc.setFontSize(14);
  doc.setTextColor(30, 60, 80);
  doc.text("Simulation Timeline", 14, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    head: [["Period", "Event", "Description", "Impact"]],
    body: simulationTimeline.map((e) => [e.month, e.title, e.description, e.impact]),
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [0, 140, 130], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 248, 248] },
    margin: { left: 14, right: 14 },
  });

  // Behavior Matrix
  y = (doc as any).lastAutoTable.finalY + 12;
  if (y > 250) { doc.addPage(); y = 20; }

  doc.setFontSize(14);
  doc.setTextColor(30, 60, 80);
  doc.text("Behavioral Response Matrix", 14, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    head: [["Agent", "Initial Response", "Mid-Term Response", "Long-Term Outcome"]],
    body: behaviorMatrix.map((r) => [r.agent, r.initial, r.midTerm, r.longTerm]),
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [0, 140, 130], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 248, 248] },
    margin: { left: 14, right: 14 },
  });

  // Scenario Comparison
  y = (doc as any).lastAutoTable.finalY + 12;
  if (y > 230) { doc.addPage(); y = 20; }

  doc.setFontSize(14);
  doc.setTextColor(30, 60, 80);
  doc.text("Scenario Comparison", 14, y);
  y += 4;

  autoTable(doc, {
    startY: y,
    head: [["Metric", ...scenarios.map((s) => s.name)]],
    body: comparisonMetrics.map((m) => [m.metric, m.a, m.b, m.c]),
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [0, 140, 130], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 248, 248] },
    margin: { left: 14, right: 14 },
  });

  // Recommendations
  y = (doc as any).lastAutoTable.finalY + 12;
  if (y > 240) { doc.addPage(); y = 20; }

  doc.setFontSize(14);
  doc.setTextColor(30, 60, 80);
  doc.text("Key Recommendations", 14, y);
  y += 8;

  const recommendations = [
    "Consider phased implementation to allow agent adaptation periods",
    "Pair regulatory pressure with incentive structures for vulnerable agents (farmers, communities)",
    "Monitor second-order effects in informal markets and border regions",
    "Establish feedback loops between enforcement agencies and affected communities",
    "Plan for investor sentiment shifts within first 6 months of policy announcement",
  ];

  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  recommendations.forEach((rec, i) => {
    doc.text(`${i + 1}. ${rec}`, 14, y);
    y += 6;
  });

  // Footer
  y += 6;
  doc.setDrawColor(0, 180, 160);
  doc.setLineWidth(0.5);
  doc.line(14, y, pageWidth - 14, y);
  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(140, 140, 140);
  doc.text("ATLAS — Behavioral Systems Laboratory · Multi-Agent Policy Simulator", 14, y);
  doc.text("This document is auto-generated. Results are based on simulation models and should inform, not replace, expert judgment.", 14, y + 5);

  doc.save(`atlas-policy-brief-${Date.now()}.pdf`);
}
