import express from "express";
export const app = express();
const version = process.env.APP_VERSION || "dev";
export function add(a, b) {
return a + b;
}
app.get("/", (req, res) => {
res.send(`<h1>ITSD 85 CI/CD Lab</h1><p>Deployed version: ${version}</p>`);
});
app.get("/health", (req, res) => {
    res.json({ status: "ok", version });
});
app.get("/api/add", (req, res) => {
const a = Number(req.query.a);
const b = Number(req.query.b);
if (Number.isNaN(a) || Number.isNaN(b)) {
return res.status(400).json({ error: "a and b must be numbers" });
}
res.json({ result: add(a, b) });
});