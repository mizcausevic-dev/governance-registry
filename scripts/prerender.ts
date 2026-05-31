import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  renderDecisionJournal,
  renderDocs,
  renderEvidenceObjects,
  renderOverview,
  renderOwnershipMap,
  renderRegistryLane,
  renderSample,
  renderVerification
} from "../src/services/render.js";
import {
  decisionJournal,
  evidenceObjects,
  ownershipMap,
  payload,
  registryLane,
  riskMap,
  summary,
  verification
} from "../src/services/verticalBriefService.js";

const outDir = path.resolve("site");

async function emit(filePath: string, contents: string) {
  const target = path.join(outDir, filePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
}

const files: Record<string, string> = {
  "index.html": renderOverview(),
  [path.join("registry-lane", "index.html")]: renderRegistryLane(),
  [path.join("evidence-objects", "index.html")]: renderEvidenceObjects(),
  [path.join("ownership-map", "index.html")]: renderOwnershipMap(),
  [path.join("decision-journal", "index.html")]: renderDecisionJournal(),
  [path.join("verification", "index.html")]: renderVerification(),
  [path.join("docs", "index.html")]: renderDocs(),
  "robots.txt": "User-agent: *\nAllow: /\nSitemap: https://registry.kineticgain.com/sitemap.xml\n",
  "sitemap.xml": `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://registry.kineticgain.com/</loc></url>
  <url><loc>https://registry.kineticgain.com/registry-lane/</loc></url>
  <url><loc>https://registry.kineticgain.com/evidence-objects/</loc></url>
  <url><loc>https://registry.kineticgain.com/ownership-map/</loc></url>
  <url><loc>https://registry.kineticgain.com/decision-journal/</loc></url>
  <url><loc>https://registry.kineticgain.com/verification/</loc></url>
  <url><loc>https://registry.kineticgain.com/docs/</loc></url>
</urlset>
`,
  [path.join("api", "dashboard-summary.json")]: JSON.stringify(summary(), null, 2),
  [path.join("api", "registry-lane.json")]: JSON.stringify(registryLane(), null, 2),
  [path.join("api", "evidence-objects.json")]: JSON.stringify(evidenceObjects(), null, 2),
  [path.join("api", "ownership-map.json")]: JSON.stringify(ownershipMap(), null, 2),
  [path.join("api", "decision-journal.json")]: JSON.stringify(decisionJournal(), null, 2),
  [path.join("api", "risk-map.json")]: JSON.stringify(riskMap(), null, 2),
  [path.join("api", "verification.json")]: JSON.stringify(verification(), null, 2),
  [path.join("api", "sample.json")]: renderSample(),
  [path.join("api", "payload.json")]: JSON.stringify(payload(), null, 2)
};

for (const [filePath, contents] of Object.entries(files)) {
  await emit(filePath, contents);
}
