import type { GovernanceRegistryReport } from "./types.js";

export function formatSummary(report: GovernanceRegistryReport) {
  return [
    `generatedAt: ${report.generatedAt}`,
    `systems: ${report.systems}`,
    `averageScore: ${report.averageScore}`,
    `benchmarkGap: ${report.benchmarkGap}`,
    `openDecisions: ${report.openDecisions}`,
    `staleEvidenceSystems: ${report.staleEvidenceSystems}`,
    `annualExposureUsd: ${report.annualExposureUsd}`,
    `modeledSavingsUsd: ${report.modeledSavingsUsd}`,
    `investmentQueueUsd: ${report.investmentQueueUsd}`,
    `findings: ${report.findingsList.length}`,
    `ok: ${report.ok}`
  ].join("\n");
}

export function formatJson(report: GovernanceRegistryReport) {
  return JSON.stringify(report, null, 2);
}
