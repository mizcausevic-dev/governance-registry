// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  decisionJournal,
  evidenceObjects,
  ownershipMap,
  payload,
  registryLane,
  summary,
  verification
} from "./verticalBriefService.js";

function layout(title: string, active: string, body: string) {
  const nav = [
    { href: "/", label: "Overview" },
    { href: "/registry-lane", label: "Registry Lane" },
    { href: "/evidence-objects", label: "Evidence Objects" },
    { href: "/ownership-map", label: "Ownership Map" },
    { href: "/decision-journal", label: "Decision Journal" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ];

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      :root{
        --bg:#070a0f; --panel:#0b1220; --line:rgba(120,255,170,.18); --line2:rgba(120,255,170,.10);
        --text:#e9f3ff; --muted:rgba(233,243,255,.72); --muted2:rgba(233,243,255,.55);
        --good:#37ff8b; --cyan:#19c7ff; --warn:#ffcc66; --bad:#ff5c7a;
        --shadow:0 18px 60px rgba(0,0,0,.55);
        --mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        --sans:ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
      }
      *{box-sizing:border-box} html,body{height:100%}
      body{margin:0;font-family:var(--sans);color:var(--text);background:
        radial-gradient(1200px 600px at 20% -10%, rgba(55,255,139,.18), transparent 60%),
        radial-gradient(900px 520px at 90% 0%, rgba(25,199,255,.16), transparent 55%),
        radial-gradient(1000px 600px at 50% 110%, rgba(55,255,139,.10), transparent 60%),
        linear-gradient(180deg, #05070c 0%, #070a0f 35%, #05070c 100%);}
      .wrap{max-width:1280px; margin:0 auto; padding:24px 22px 80px}
      .topbar{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;border-bottom:1px solid var(--line2);padding-bottom:14px;margin-bottom:22px;font-family:var(--mono);font-size:11px;letter-spacing:.16em;color:var(--muted);text-transform:uppercase;}
      .topbar .left{color:var(--good)} .topbar .right{text-align:right}.topbar .right div{margin-bottom:4px}
      .herorow{display:grid;grid-template-columns:1.5fr .9fr;gap:18px}
      @media (max-width:1000px){.herorow{grid-template-columns:1fr}}
      .hero,.corr,.bluf{background:linear-gradient(180deg, rgba(11,18,32,.95), rgba(8,14,26,.92)); border:1px solid var(--line); box-shadow:var(--shadow)}
      .hero{border-radius:22px;padding:28px 28px 24px;border-top:2px solid var(--cyan)}
      .hero h1{font-size:56px;line-height:.98;margin:0 0 16px;font-weight:800;letter-spacing:-.5px}
      @media (max-width:700px){.hero h1{font-size:40px}}
      .hero p{color:var(--muted);font-size:15px;line-height:1.55;max-width:680px;margin:0 0 18px}
      .chiprow,.navrow,.footer-links{display:flex;flex-wrap:wrap;gap:8px}
      .meta-chip,.navchip{font-family:var(--mono);font-size:11px;color:var(--muted);padding:8px 12px;border-radius:999px;border:1px solid var(--line);background:rgba(6,10,18,.4);text-decoration:none}
      .navchip.active{color:#071017;background:linear-gradient(135deg,var(--good),var(--cyan));font-weight:700}
      .side{display:flex;flex-direction:column;gap:14px}
      .corr,.bluf{border-radius:14px;padding:16px 18px}
      .corr{border-left:4px solid var(--good)} .bluf{border-left:4px solid var(--warn)}
      .corr .lbl,.bluf .lbl{font-family:var(--mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase}
      .corr .lbl{color:var(--good)} .bluf .lbl{color:var(--warn)}
      .corr p,.bluf p,.ttbl td,.ttbl th{color:var(--muted);line-height:1.55}
      .section{margin-top:34px}
      .sh{display:flex;justify-content:space-between;align-items:baseline;gap:14px;padding-bottom:10px;border-bottom:1px solid var(--line2);margin-bottom:14px}
      .sh h2{margin:0;font-size:24px} .sh .note{font-family:var(--mono);font-size:11px;color:var(--muted2);letter-spacing:.16em;text-transform:uppercase}
      .kpis{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}
      @media (max-width:1100px){.kpis{grid-template-columns:repeat(3,1fr)}} @media (max-width:640px){.kpis{grid-template-columns:repeat(2,1fr)}}
      .kpi{border:1px solid var(--line);border-radius:14px;padding:14px;background:linear-gradient(180deg, rgba(11,18,32,.85), rgba(8,14,26,.65))}
      .kpi .v{font-family:var(--mono);font-size:26px;font-weight:600;color:var(--cyan)}
      .kpi .lbl{font-family:var(--mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-top:6px}
      .kpi .h{font-size:12px;color:var(--muted);margin-top:8px}
      .stack,.board{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
      @media (max-width:1000px){.stack,.board{grid-template-columns:1fr}}
      .src,.pcard{border-radius:16px;padding:18px 20px;border:1px solid var(--line);background:linear-gradient(180deg, rgba(11,18,32,.85), rgba(8,14,26,.65))}
      .src .src-name{font-family:var(--mono);font-size:11px;color:var(--good);letter-spacing:.18em;text-transform:uppercase}
      .src .src-tit{margin:8px 0 6px;font-size:18px;font-weight:600}
      .ttbl{width:100%;border-collapse:separate;border-spacing:0;border:1px solid var(--line);border-radius:14px;overflow:hidden}
      .ttbl th,.ttbl td{padding:13px 14px;text-align:left;font-size:13.5px;vertical-align:top}
      .ttbl thead th{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted2);border-bottom:1px solid var(--line);background:rgba(11,18,32,.5)}
      .st{font-family:var(--mono);font-size:10px;padding:4px 9px;border-radius:6px;letter-spacing:.1em;text-transform:uppercase;border:1px solid currentColor;display:inline-block}
      .red{color:var(--bad)} .yellow{color:var(--warn)} .green{color:var(--good)} .info{color:var(--cyan)}
      .footer{margin-top:30px;padding-top:14px;border-top:1px dashed var(--line2);display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;font-family:var(--mono);font-size:11px;color:var(--muted2)}
      a{color:inherit}
      code{font-family:var(--mono);font-size:12px;color:var(--cyan);background:rgba(25,199,255,.08);padding:1px 6px;border-radius:5px;border:1px solid rgba(25,199,255,.18)}
    </style>
    <meta name="description" content="Governance Registry is the software-layer control plane that turns Kinetic Gain scorecards, briefs, diligence packs, owners, evidence objects, and board questions into one executive operating registry.">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Governance Registry">
    <meta property="og:description" content="Executive registry for ownership, evidence objects, decision journal, risk map, and investment queue across Kinetic Gain’s board-ready intelligence products.">
    <meta property="og:url" content="https://registry.kineticgain.com/">
    <meta property="og:site_name" content="Kinetic Gain">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="Governance Registry">
    <meta name="twitter:description" content="Control plane for ownership, evidence objects, board questions, and investment sequence across the Kinetic Gain executive-intelligence estate.">
  </head>
  <body>
    <div class="wrap">
      <div class="topbar">
        <div class="left">Kinetic Gain · Governance Registry</div>
        <div class="right">
          <div>software-layer operating registry · synthetic sample data only</div>
          <div>owners · evidence objects · board questions · decision journal</div>
        </div>
      </div>
      <div class="herorow">
        <section class="hero">
          <div class="chiprow">
            <span class="meta-chip">Software layer after scorecards, briefs, and diligence</span>
            <span class="meta-chip">Board-ready operating registry</span>
            <span class="meta-chip">Synthetic sample data only</span>
          </div>
          <h1>One operating registry that turns executive intelligence products into owned evidence, open decisions, and investment sequence.</h1>
          <p>This surface exists after the scorecards, board briefs, diligence packs, and recurring vertical brief. It holds the real operating objects leadership needs next: who owns what, which evidence packet is current, what question still sits open, and where the next board or investor ask belongs.</p>
          <div class="navrow">
            ${nav.map((link) => `<a class="navchip${active === link.href ? " active" : ""}" href="${link.href}">${link.label}</a>`).join("")}
          </div>
        </section>
        <aside class="side">
          <div class="bluf">
            <div class="lbl">Commercial Front Door</div>
            <p><strong>Executive-readable software layer for CEOs, CFOs, CTOs, COOs, CISO teams, and investors.</strong><br />One registry for owners, proof objects, decision packets, and board-sequenced investment asks.</p>
          </div>
          <div class="corr">
            <div class="lbl">Proof Layer</div>
            <p><strong>Offline analyzer plus registry control surface.</strong><br />This repo turns synthetic entries from the Kinetic Gain executive-intelligence estate into a registry lane, evidence-object map, ownership map, decision journal, and risk queue.</p>
          </div>
          <div class="corr">
            <div class="lbl">Why it matters</div>
            <p>Leadership needs more than a score. The registry is the operating answer to <strong>where are we exposed, where can we save, where should we invest, and who owns the next board-grade packet?</strong></p>
          </div>
        </aside>
      </div>
      ${body}
      <div class="footer">
        <div>governance-registry · synthetic sample data only</div>
        <div class="footer-links">
          <a class="meta-chip" href="https://github.com/mizcausevic-dev/">GitHub</a>
          <a class="meta-chip" href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
          <a class="meta-chip" href="https://kineticgain.com/">Kinetic Gain</a>
        </div>
      </div>
    </div>
  </body>
</html>`;
}

function severityClass(value: string) {
  if (value === "high" || value === "red") return "red";
  if (value === "medium" || value === "yellow") return "yellow";
  if (value === "green" || value === "low") return "green";
  return "info";
}

export function renderOverview() {
  const metrics = summary();
  return layout(
    "Governance Registry",
    "/",
    `<section class="section">
        <div class="sh"><h2>Registry Snapshot</h2><div class="note">systems · exposure · savings · ownership</div></div>
        <div class="kpis">
          <div class="kpi"><div class="v">${metrics.systems}</div><div class="lbl">registered systems</div><div class="h">Core products now held in one registry instead of separate scorecard or briefing surfaces.</div></div>
          <div class="kpi"><div class="v">${metrics.averageScore}</div><div class="lbl">average score</div><div class="h">Aggregate posture score across the current registry items.</div></div>
          <div class="kpi"><div class="v">${metrics.benchmarkGap}</div><div class="lbl">benchmark gap</div><div class="h">How far the estate still trails a cleaner peer operating picture.</div></div>
          <div class="kpi"><div class="v">${metrics.openDecisions}</div><div class="lbl">open decisions</div><div class="h">Registry items still waiting on a locked executive or board call.</div></div>
          <div class="kpi"><div class="v">${metrics.staleEvidenceSystems}</div><div class="lbl">stale evidence</div><div class="h">Systems whose evidence packets still need refresh before leadership review.</div></div>
          <div class="kpi"><div class="v">$${Math.round(metrics.investmentQueueUsd / 1000)}k</div><div class="lbl">investment queue</div><div class="h">Modeled spend waiting for ownership, evidence, and sequence discipline.</div></div>
        </div>
      </section>
      <section class="section">
        <div class="sh"><h2>What the registry resolves</h2><div class="note">owner · packet · board ask · next step</div></div>
        <div class="stack">
          <div class="src"><div class="src-name">owner clarity</div><div class="src-tit">Every system has an owner, a board question, and a next action</div><p>${metrics.recommendation}</p></div>
          <div class="src"><div class="src-name">proof discipline</div><div class="src-tit">Evidence objects stay attached to live properties and company signals</div><p>The registry keeps scorecards, briefs, and diligence packs grounded in reusable evidence instead of presentation-only copy.</p></div>
          <div class="src"><div class="src-name">board sequence</div><div class="src-tit">Investment asks and open decisions sit in one operating journal</div><p>This is the software layer that turns board-ready intelligence into a repeatable executive operating system.</p></div>
        </div>
      </section>`
  );
}

export function renderRegistryLane() {
  return layout(
    "Governance Registry — Registry Lane",
    "/registry-lane",
    `<section class="section">
        <div class="sh"><h2>Registry Lane</h2><div class="note">owner · evidence · board question</div></div>
        <table class="ttbl">
          <thead><tr><th>System</th><th>Owner</th><th>Decision</th><th>Score</th><th>Evidence</th><th>Board question</th><th>Next action</th></tr></thead>
          <tbody>
            ${registryLane().map((item) => `<tr><td><b>${item.surfaceName}</b></td><td>${item.ownerRole}</td><td><span class="st ${severityClass(item.status)}">${item.status}</span></td><td>${item.score}</td><td>${item.evidenceState}</td><td>${item.boardQuestion}</td><td>${item.nextAction}</td></tr>`).join("")}
          </tbody>
        </table>
      </section>`
  );
}

export function renderEvidenceObjects() {
  return layout(
    "Governance Registry — Evidence Objects",
    "/evidence-objects",
    `<section class="section">
        <div class="sh"><h2>Evidence Objects</h2><div class="note">proof packet · live surface · company signals</div></div>
        <table class="ttbl">
          <thead><tr><th>System</th><th>Status</th><th>Evidence objects</th><th>Live proof</th><th>Signals</th></tr></thead>
          <tbody>
            ${evidenceObjects().map((item) => `<tr><td><b>${item.surfaceName}</b></td><td><span class="st ${severityClass(item.evidenceState === "CURRENT" ? "green" : item.evidenceState === "STALE" ? "yellow" : "red")}">${item.evidenceState}</span></td><td>${item.evidenceObjects.join("<br />")}</td><td>${item.liveProperties.join("<br />")}</td><td>${item.companySignals.join(" · ")}</td></tr>`).join("")}
          </tbody>
        </table>
      </section>`
  );
}

export function renderOwnershipMap() {
  return layout(
    "Governance Registry — Ownership Map",
    "/ownership-map",
    `<section class="section">
        <div class="sh"><h2>Ownership Map</h2><div class="note">owner · exposure · investment ask</div></div>
        <div class="board">
          ${ownershipMap().map((item) => `<article class="pcard">
            <div class="src-name">${item.ownerRole}</div>
            <h3>${item.surfaceName}</h3>
            <p class="pdesc">Ownership should stay attached to exposure and the next funded step, not float separately in a deck.</p>
            <ul class="check">
              <li>Decision status: ${item.decisionStatus}</li>
              <li>Annual exposure: $${Math.round(item.annualExposureUsd / 1000)}k</li>
              <li>Investment ask: $${Math.round(item.investmentAskUsd / 1000)}k</li>
            </ul>
          </article>`).join("")}
        </div>
      </section>`
  );
}

export function renderDecisionJournal() {
  return layout(
    "Governance Registry — Decision Journal",
    "/decision-journal",
    `<section class="section">
        <div class="sh"><h2>Decision Journal</h2><div class="note">latest decision · review date · next action</div></div>
        <div class="board">
          ${decisionJournal().map((item) => `<article class="pcard">
            <div class="src-name">${item.nextReviewDate}</div>
            <h3>${item.surfaceName}</h3>
            <p class="pdesc">${item.latestDecision}</p>
            <ul class="check">
              <li>Current score: ${item.postureScore}</li>
              <li>Benchmark score: ${item.benchmarkScore}</li>
              <li>Next action: ${item.nextAction}</li>
            </ul>
          </article>`).join("")}
        </div>
      </section>`
  );
}

export function renderVerification() {
  return layout(
    "Governance Registry — Verification",
    "/verification",
    `<section class="section">
        <div class="sh"><h2>Verification</h2><div class="note">registry-safe claims only</div></div>
        <div class="stack">
          ${verification().map((item, index) => `<div class="src"><div class="src-name">verification ${index + 1}</div><div class="src-tit">${item}</div><p>The registry stays bounded to synthetic evidence objects and modeled operating decisions.</p></div>`).join("")}
        </div>
      </section>`
  );
}

export function renderDocs() {
  return layout(
    "Governance Registry — Docs",
    "/docs",
    `<section class="section">
        <div class="sh"><h2>Docs</h2><div class="note">cli · apis · operating layer</div></div>
        <div class="stack">
          <div class="src"><div class="src-name">cli</div><div class="src-tit">Offline registry generation</div><p><code>npx governance-registry fixtures/governance-registry.json --format summary</code> renders the same operating summary the dashboard exposes.</p></div>
          <div class="src"><div class="src-name">apis</div><div class="src-tit">Registry-safe JSON payloads</div><p>Use <code>/api/dashboard/summary</code>, <code>/api/registry-lane</code>, <code>/api/evidence-objects</code>, and <code>/api/decision-journal</code> as the canonical machine-readable layers.</p></div>
          <div class="src"><div class="src-name">product role</div><div class="src-tit">Software layer after scorecards and briefs</div><p>This registry is the connective layer between executive diagnostics and the board, investor, or operating packet that uses them.</p></div>
        </div>
      </section>`
  );
}

export function renderSample() {
  return JSON.stringify(payload().sample, null, 2);
}
