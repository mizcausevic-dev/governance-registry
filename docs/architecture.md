# Architecture

Governance Registry is a static-friendly TypeScript executive-intelligence software layer.

- `src/analyze.ts` computes registry-wide posture, evidence, decision, and exposure rollups.
- `src/services/verticalBriefService.ts` exposes the registry-safe data packets used by both the app and prerender step.
- `src/services/render.ts` renders the static HTML routes.
- `scripts/prerender.ts` emits the GitHub Pages payload and machine-readable JSON snapshots.
- `scripts/render_readme_assets.ps1` generates the README proof images.
