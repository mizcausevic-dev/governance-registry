import { describe, expect, it } from "vitest";
import { decisionJournal, evidenceObjects, ownershipMap, payload, registryLane, riskMap, summary, verification } from "./verticalBriefService.js";

describe("governance registry service", () => {
  it("returns a board-level summary", () => {
    expect(summary().systems).toBeGreaterThan(0);
  });

  it("returns the registry lane", () => {
    expect(registryLane()[0]?.surfaceName).toBeTruthy();
  });

  it("returns the evidence-object map", () => {
    expect(evidenceObjects().length).toBeGreaterThan(0);
  });

  it("returns the ownership map", () => {
    expect(ownershipMap()[0]?.ownerRole).toBeTruthy();
  });

  it("returns the decision journal", () => {
    expect(decisionJournal()[0]?.latestDecision).toBeTruthy();
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
    expect(payload().verification.length).toBeGreaterThan(0);
  });
});
