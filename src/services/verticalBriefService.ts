import { analyze } from "../analyze.js";
import { sampleGovernanceRegistry } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleGovernanceRegistry, { now: "2026-05-31T16:40:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    systems: report.systems,
    averageScore: report.averageScore,
    benchmarkGap: report.benchmarkGap,
    openDecisions: report.openDecisions,
    staleEvidenceSystems: report.staleEvidenceSystems,
    annualExposureUsd: report.annualExposureUsd,
    modeledSavingsUsd: report.modeledSavingsUsd,
    investmentQueueUsd: report.investmentQueueUsd,
    highFindings,
    recommendation:
      "Run the registry as the operating source for owners, evidence objects, and board asks; lead with identity, platform margin, and regulated-infrastructure cleanup first."
  };
}

export function registryLane() {
  return sampleGovernanceRegistry.map((entry) => ({
    surfaceName: entry.surfaceName,
    ownerRole: entry.ownerRole,
    score: entry.postureScore,
    status: entry.decisionStatus === "OPEN" ? "red" : entry.decisionStatus === "IN_PROGRESS" ? "yellow" : "green",
    boardQuestion: entry.boardQuestion,
    evidenceState: entry.evidenceState,
    nextAction: entry.nextAction
  }));
}

export function evidenceObjects() {
  return sampleGovernanceRegistry.map((entry) => ({
    surfaceName: entry.surfaceName,
    evidenceState: entry.evidenceState,
    evidenceObjects: entry.evidenceObjects,
    liveProperties: entry.liveProperties,
    companySignals: entry.companySignals
  }));
}

export function ownershipMap() {
  return sampleGovernanceRegistry.map((entry) => ({
    surfaceName: entry.surfaceName,
    ownerRole: entry.ownerRole,
    decisionStatus: entry.decisionStatus,
    annualExposureUsd: entry.annualExposureUsd,
    investmentAskUsd: entry.investmentAskUsd
  }));
}

export function decisionJournal() {
  return sampleGovernanceRegistry.map((entry) => ({
    surfaceName: entry.surfaceName,
    latestDecision: entry.latestDecision,
    nextReviewDate: entry.nextReviewDate,
    nextAction: entry.nextAction,
    postureScore: entry.postureScore,
    benchmarkScore: entry.benchmarkScore
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return report.findingsList
    .map((finding) => ({
      ...finding,
      owner:
        finding.domain === "AI_GOVERNANCE" || finding.domain === "IDENTITY_SECURITY"
          ? "Trust cluster"
          : finding.domain === "REVENUE_SYSTEMS" || finding.domain === "PORTFOLIO_BENCHMARKING"
            ? "Commercial cluster"
            : "Executive systems cluster"
    }))
    .sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic sample registry only - no live customer system, board packet, or investor diligence artifact is included.",
    "Scores, findings, exposure, savings, and investment asks are modeled from the sample registry entries in this repo.",
    "This registry is read-only and designed to show how scorecards, briefs, and diligence packs can resolve into one operating layer.",
    "Evidence objects, review dates, and ownership fields are synthetic decision aids rather than audited control records.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    registryLane: registryLane(),
    evidenceObjects: evidenceObjects(),
    ownershipMap: ownershipMap(),
    decisionJournal: decisionJournal(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleGovernanceRegistry
  };
}
