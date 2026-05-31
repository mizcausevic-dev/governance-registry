export type ExecutiveDomain =
  | "AI_GOVERNANCE"
  | "PLATFORM_GOVERNANCE"
  | "IDENTITY_SECURITY"
  | "REGULATED_INFRASTRUCTURE"
  | "REVENUE_SYSTEMS"
  | "PORTFOLIO_BENCHMARKING"
  | "BOARD_INTELLIGENCE"
  | "DILIGENCE_PACKAGING";

export type EvidenceState = "CURRENT" | "STALE" | "MISSING";
export type DecisionStatus = "OPEN" | "IN_PROGRESS" | "LOCKED";

export interface GovernanceRegistryEntry {
  id: string;
  surfaceName: string;
  domain: ExecutiveDomain;
  ownerRole: string;
  boardQuestion: string;
  postureScore: number;
  benchmarkScore: number;
  annualExposureUsd: number;
  savingsOpportunityUsd: number;
  investmentAskUsd: number;
  evidenceState: EvidenceState;
  decisionStatus: DecisionStatus;
  companySignals: string[];
  liveProperties: string[];
  evidenceObjects: string[];
  latestDecision: string;
  nextReviewDate: string;
  nextAction: string;
}

export interface GovernanceRegistryExport {
  generatedAt: string;
  entries: GovernanceRegistryEntry[];
}

export type FindingCode =
  | "owner-gap"
  | "evidence-gap"
  | "benchmark-gap"
  | "board-exposure"
  | "open-decision"
  | "thin-proof";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  message: string;
  domain: ExecutiveDomain;
  surfaceName: string;
}

export interface GovernanceRegistryReport {
  generatedAt: string;
  systems: number;
  averageScore: number;
  benchmarkGap: number;
  openDecisions: number;
  staleEvidenceSystems: number;
  annualExposureUsd: number;
  modeledSavingsUsd: number;
  investmentQueueUsd: number;
  findingsList: Finding[];
  ok: boolean;
}
