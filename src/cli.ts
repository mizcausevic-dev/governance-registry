import { readFile } from "node:fs/promises";
import { analyze } from "./analyze.js";
import { formatJson, formatSummary } from "./format.js";
import type { GovernanceRegistryEntry } from "./types.js";

const [, , filePath = "fixtures/governance-registry.json", format = "--format", output = "summary"] = process.argv;

if (format !== "--format" || !["summary", "json"].includes(output)) {
  console.error("usage: governance-registry <file> --format <summary|json>");
  process.exit(1);
}

const entries = JSON.parse(await readFile(filePath, "utf8")) as GovernanceRegistryEntry[];
const report = analyze(entries);
console.log(output === "json" ? formatJson(report) : formatSummary(report));
