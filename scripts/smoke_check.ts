import { createServer } from "node:http";
import { AddressInfo } from "node:net";
import { once } from "node:events";
import { createApp } from "../src/app.js";

const app = createApp();
const server = createServer(app);
server.listen(0, "127.0.0.1");
await once(server, "listening");

const address = server.address() as AddressInfo;
const base = `http://127.0.0.1:${address.port}`;

const htmlRoutes = ["/", "/registry-lane", "/evidence-objects", "/ownership-map", "/decision-journal", "/verification", "/docs"];
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

for (const route of htmlRoutes.concat(jsonRoutes)) {
  const response = await fetch(`${base}${route}`);
  if (!response.ok) {
    throw new Error(`Route ${route} returned ${response.status}`);
  }
}

server.close();
