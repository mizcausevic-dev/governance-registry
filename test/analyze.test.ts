import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleGovernanceRegistry } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected system count", () => {
    const report = analyze(sampleGovernanceRegistry, { now: "2026-05-31T16:45:00Z" });
    expect(report.systems).toBe(8);
  });

  it("computes a positive benchmark gap", () => {
    const report = analyze(sampleGovernanceRegistry, { now: "2026-05-31T16:45:00Z" });
    expect(report.averageScore).toBeGreaterThanOrEqual(70);
    expect(report.benchmarkGap).toBeGreaterThan(0);
  });

  it("counts open decisions and stale evidence", () => {
    const report = analyze(sampleGovernanceRegistry, { now: "2026-05-31T16:45:00Z" });
    expect(report.openDecisions).toBeGreaterThanOrEqual(1);
    expect(report.staleEvidenceSystems).toBeGreaterThanOrEqual(1);
  });

  it("emits evidence findings", () => {
    const report = analyze(sampleGovernanceRegistry, { now: "2026-05-31T16:45:00Z" });
    expect(report.findingsList.some((finding) => finding.code === "evidence-gap")).toBe(true);
  });

  it("rolls up savings, exposure, and investment queue", () => {
    const report = analyze(sampleGovernanceRegistry, { now: "2026-05-31T16:45:00Z" });
    expect(report.modeledSavingsUsd).toBeGreaterThan(0);
    expect(report.annualExposureUsd).toBeGreaterThan(0);
    expect(report.investmentQueueUsd).toBeGreaterThan(0);
  });
});
