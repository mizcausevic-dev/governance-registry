> ## ⚠️ Archived 2026-05-31 — superseded
>
> This repo is archived. The shape it set out to solve was already covered (and shipped) on the apex tool surface:
>
> **→ [https://kineticgain.com/trust/](https://kineticgain.com/trust/)** — Trust Pack — AI Vendor Intake + Subprocessor Disclosure + Risk Register collectively
>
> The apex surface is browser-only, no login, no telemetry, vanilla JS, aligned in vocabulary with NIST AI RMF / EU AI Act / ISO 42001 / SOC 2 / ISO 27018 / GDPR (never "compliant"/"certified" without external attestation).
>
> No migration needed — this repo never had production users; it was Codex-shipped scaffolding that landed in parallel with (and unaware of) the apex executive-tools layer.

---

# Governance Registry

Software-layer control plane that turns Kinetic Gain scorecards, briefs, diligence packs, owners, evidence objects, and board questions into one executive registry.

- Live: `http://registry.kineticgain.com/`
- Status: `v0.1-shipped`

## What it does

- registry lane covering owner, evidence state, board question, and next action
- evidence-object view tying proof packets back to live properties and company signals
- ownership map for exposure, investment asks, and accountability
- decision journal for latest decision, next review date, and next move
- reproducible CLI and static site from the same sample registry export

## Local run

```powershell
cd governance-registry
npm install
npm run verify
npm run prerender
```

Then open:

- `/`
- `/registry-lane`
- `/evidence-objects`
- `/ownership-map`
- `/decision-journal`
- `/verification`
- `/docs`

## CLI

```powershell
npx governance-registry fixtures/governance-registry.json --format summary
npx governance-registry fixtures/governance-registry-clean.json --format json
```

## Notes

- synthetic sample data only
- board-ready operating semantics, not audited production control records
- footer links point to GitHub, LinkedIn, and Kinetic Gain