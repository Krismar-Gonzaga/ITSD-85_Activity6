import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { app, add } from "../src/app.js";
let server;
let baseUrl;
before(async () => {
server = app.listen(0); // 0 = any free port
await once(server, "listening");
baseUrl = `http://localhost:${server.address().port}`;
});
after(() => server.close());
test("add() sums two numbers", () => {
assert.equal(add(2, 3), 5);
});
test("GET /health returns ok", async () => {
const res = await fetch(`${baseUrl}/health`);
assert.equal(res.status, 200);
const body = await res.json();
assert.equal(body.status, "ok");
});
test("GET /api/add rejects non-numbers", async () => {
const res = await fetch(`${baseUrl}/api/add?a=x&b=2`);
assert.equal(res.status, 400);
});