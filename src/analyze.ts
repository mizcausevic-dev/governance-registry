import type { Finding, GovernanceRegistryEntry, GovernanceRegistryExport, GovernanceRegistryReport } from "./types.js";

function finding(
  entry: GovernanceRegistryEntry,
  code: Finding["code"],
  severity: Finding["severity"],
  message: string
): Finding {
  return {
    code,
    severity,
    message,
    domain: entry.domain,
    surfaceName: entry.surfaceName
  };
}

function evaluateEntry(entry: GovernanceRegistryEntry): Finding[] {
  const findings: Finding[] = [];

  if (entry.evidenceState !== "CURRENT") {
    findings.push(
      finding(
        entry,
        "evidence-gap",
        entry.evidenceState === "MISSING" ? "high" : "medium",
        "Evidence objects are stale or missing, so leadership cannot rely on this registry item as board-grade proof."
      )
    );
  }

  if (entry.decisionStatus !== "LOCKED") {
    findings.push(
      finding(
        entry,
        "open-decision",
        entry.decisionStatus === "OPEN" ? "high" : "medium",
        "A board or executive decision is still open, which means the registry should keep this item in the active review queue."
      )
    );
  }

  if (entry.postureScore + 10 < entry.benchmarkScore) {
    findings.push(
      finding(
        entry,
        "benchmark-gap",
        "medium",
        "Benchmark pressure is still visible, so this system should stay in the next investment or remediation sequence."
      )
    );
  }

  if (entry.annualExposureUsd >= 450000) {
    findings.push(
      finding(
        entry,
        "board-exposure",
        "high",
        "Modeled annual exposure is large enough that the system belongs in the board-facing risk and investment story."
      )
    );
  }

  if (entry.ownerRole.includes("TBD")) {
    findings.push(
      finding(
        entry,
        "owner-gap",
        "high",
        "The owning function is not locked, so accountability is still weak for this registry item."
      )
    );
  }

  if (entry.evidenceObjects.length < 3) {
    findings.push(
      finding(
        entry,
        "thin-proof",
        "low",
        "The evidence packet is still thin, even if the narrative and live surface are already strong."
      )
    );
  }

  return findings;
}

export function analyze(entries: GovernanceRegistryEntry[], options: { now?: string } = {}): GovernanceRegistryReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = entries.flatMap(evaluateEntry);
  const systems = entries.length;
  const averageScore = Math.round(entries.reduce((sum, entry) => sum + entry.postureScore, 0) / systems);
  const averageBenchmark = Math.round(entries.reduce((sum, entry) => sum + entry.benchmarkScore, 0) / systems);
  const benchmarkGap = Math.max(0, averageBenchmark - averageScore);
  const openDecisions = entries.filter((entry) => entry.decisionStatus !== "LOCKED").length;
  const staleEvidenceSystems = entries.filter((entry) => entry.evidenceState !== "CURRENT").length;
  const annualExposureUsd = entries.reduce((sum, entry) => sum + entry.annualExposureUsd, 0);
  const modeledSavingsUsd = entries.reduce((sum, entry) => sum + entry.savingsOpportunityUsd, 0);
  const investmentQueueUsd = entries.reduce((sum, entry) => sum + entry.investmentAskUsd, 0);
  const highFindings = findingsList.filter((item) => item.severity === "high").length;
  const mediumFindings = findingsList.filter((item) => item.severity === "medium").length;
  const ok = averageScore >= 75 && staleEvidenceSystems <= 2 && openDecisions <= 4;
  const penalty = benchmarkGap + staleEvidenceSystems * 4 + openDecisions * 3 + highFindings * 2 + mediumFindings;

  return {
    generatedAt,
    systems,
    averageScore,
    benchmarkGap,
    openDecisions,
    staleEvidenceSystems,
    annualExposureUsd,
    modeledSavingsUsd,
    investmentQueueUsd,
    findingsList,
    ok: ok && penalty < 32
  };
}

export function toExport(entries: GovernanceRegistryEntry[], now?: string): GovernanceRegistryExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    entries
  };
}
