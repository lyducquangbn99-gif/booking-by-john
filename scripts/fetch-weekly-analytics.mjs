import fs from "node:fs";
import path from "node:path";
import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const required = ["VERCEL_TOKEN", "VERCEL_TEAM_ID", "VERCEL_PROJECT_ID"];
for (const name of required) {
  if (!process.env[name]) throw new Error(`${name} is missing from .env.local.`);
}

function argument(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? "" : process.argv[index + 1] || "";
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function previousWeek() {
  const vietnamNow = new Date(Date.now() + 7 * 60 * 60 * 1000);
  const today = new Date(
    Date.UTC(
      vietnamNow.getUTCFullYear(),
      vietnamNow.getUTCMonth(),
      vietnamNow.getUTCDate(),
    ),
  );
  const daysSinceMonday = (today.getUTCDay() + 6) % 7;
  const thisMonday = new Date(today);
  thisMonday.setUTCDate(today.getUTCDate() - daysSinceMonday);
  const since = new Date(thisMonday);
  since.setUTCDate(thisMonday.getUTCDate() - 7);
  const until = new Date(thisMonday);
  until.setUTCDate(thisMonday.getUTCDate() - 1);
  return { since: isoDate(since), until: isoDate(until) };
}

const defaults = previousWeek();
const since = argument("since") || defaults.since;
const until = argument("until") || defaults.until;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
if (!datePattern.test(since) || !datePattern.test(until)) {
  throw new Error("Dates must use YYYY-MM-DD.");
}

const baseUrl = "https://api.vercel.com/v1/query/web-analytics";
const headers = { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` };

async function query(dataset, style, params = {}) {
  const search = new URLSearchParams({
    teamId: process.env.VERCEL_TEAM_ID,
    projectId: process.env.VERCEL_PROJECT_ID,
    since,
    until,
    ...params,
  });
  const response = await fetch(`${baseUrl}/${dataset}/${style}?${search}`, {
    headers,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    return {
      available: false,
      status: response.status,
      error: body.error?.message || body.message || "Analytics query failed.",
    };
  }
  return { available: true, data: body.data };
}

const [totals, countries, pages, referrers, events] = await Promise.all([
  query("visits", "count"),
  query("visits", "aggregate", { by: "country", limit: "25" }),
  query("visits", "aggregate", { by: "requestPath", limit: "50" }),
  query("visits", "aggregate", { by: "referrerHostname", limit: "25" }),
  query("events", "aggregate", { by: "eventName", limit: "50" }),
]);

const output = {
  generatedAt: new Date().toISOString(),
  timezone: "Asia/Ho_Chi_Minh",
  period: { since, until },
  source: "Vercel Web Analytics aggregated API",
  note: "Tracking began on 2026-07-16; earlier history is unavailable.",
  totals,
  countries,
  pages,
  referrers,
  events,
};

const outputArgument = argument("output");
const outputFile = outputArgument
  ? path.resolve(process.cwd(), outputArgument)
  : path.resolve(process.cwd(), "reports", "raw", `${since}-to-${until}.json`);
const workspace = `${path.resolve(process.cwd())}${path.sep}`;
if (!outputFile.startsWith(workspace)) {
  throw new Error("Output must stay inside the project directory.");
}
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify(output, null, 2)}\n`, "utf8");

console.log(`Aggregated analytics saved to ${outputFile}.`);
