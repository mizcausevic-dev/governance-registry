import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("governance-registry app", () => {
  it("serves the HTML routes", async () => {
    const htmlRoutes = ["/", "/registry-lane", "/evidence-objects", "/ownership-map", "/decision-journal", "/verification", "/docs"];

    for (const route of htmlRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
    }
  });

  it("serves the JSON routes", async () => {
    const jsonRoutes = [
      "/api/dashboard/summary",
      "/api/registry-lane",
      "/api/evidence-objects",
      "/api/ownership-map",
      "/api/decision-journal",
      "/api/risk-map",
      "/api/verification",
      "/api/sample",
      "/api/payload"
    ];

    for (const route of jsonRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
    }
  });
});
