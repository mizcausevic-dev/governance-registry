import express from "express";
import {
  renderDecisionJournal,
  renderDocs,
  renderEvidenceObjects,
  renderOverview,
  renderOwnershipMap,
  renderRegistryLane,
  renderSample,
  renderVerification
} from "./services/render.js";
import {
  decisionJournal,
  evidenceObjects,
  ownershipMap,
  payload,
  registryLane,
  riskMap,
  summary,
  verification
} from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/registry-lane", (_req, res) => res.type("html").send(renderRegistryLane()));
  app.get("/evidence-objects", (_req, res) => res.type("html").send(renderEvidenceObjects()));
  app.get("/ownership-map", (_req, res) => res.type("html").send(renderOwnershipMap()));
  app.get("/decision-journal", (_req, res) => res.type("html").send(renderDecisionJournal()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/registry-lane", (_req, res) => res.json(registryLane()));
  app.get("/api/evidence-objects", (_req, res) => res.json(evidenceObjects()));
  app.get("/api/ownership-map", (_req, res) => res.json(ownershipMap()));
  app.get("/api/decision-journal", (_req, res) => res.json(decisionJournal()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.type("application/json").send(renderSample()));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? "3000");
  createApp().listen(port, () => {
    console.log(`governance-registry listening on http://127.0.0.1:${port}`);
  });
}
