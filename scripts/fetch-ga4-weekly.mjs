import fs from "node:fs";
import path from "node:path";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const PROPERTY_ID = "545836381";
const CREDENTIALS_FILE = path.resolve(
  process.cwd(),
  ".secrets",
  "ga4-service-account.json",
);

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

function reportRows(response) {
  const dimensions = response.dimensionHeaders?.map((header) => header.name) || [];
  const metrics = response.metricHeaders?.map((header) => header.name) || [];
  return (response.rows || []).map((row) => {
    const result = {};
    dimensions.forEach((name, index) => {
      result[name] = row.dimensionValues?.[index]?.value || "";
    });
    metrics.forEach((name, index) => {
      result[name] = Number(row.metricValues?.[index]?.value || 0);
    });
    return result;
  });
}

const defaults = previousWeek();
const since = argument("since") || defaults.since;
const until = argument("until") || defaults.until;
if (!/^\d{4}-\d{2}-\d{2}$/.test(since) || !/^\d{4}-\d{2}-\d{2}$/.test(until)) {
  throw new Error("Dates must use YYYY-MM-DD.");
}
if (!fs.existsSync(CREDENTIALS_FILE)) {
  throw new Error("GA4 service-account credentials are missing.");
}

const analytics = new BetaAnalyticsDataClient({ keyFilename: CREDENTIALS_FILE });
const dateRanges = [{ startDate: since, endDate: until }];

async function runReport(request) {
  try {
    const [response] = await analytics.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges,
      limit: 100,
      ...request,
    });
    return { available: true, rows: reportRows(response) };
  } catch (error) {
    return {
      available: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

const [countries, pages, events, sources] = await Promise.all([
  runReport({
    dimensions: [{ name: "country" }],
    metrics: [
      { name: "activeUsers" },
      { name: "sessions" },
      { name: "engagedSessions" },
      { name: "userEngagementDuration" },
      { name: "screenPageViews" },
      { name: "eventCount" },
    ],
    orderBys: [{ metric: { metricName: "engagedSessions" }, desc: true }],
  }),
  runReport({
    dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
    metrics: [
      { name: "activeUsers" },
      { name: "screenPageViews" },
      { name: "userEngagementDuration" },
      { name: "eventCount" },
    ],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
  }),
  runReport({
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  }),
  runReport({
    dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
    metrics: [
      { name: "activeUsers" },
      { name: "sessions" },
      { name: "engagedSessions" },
    ],
    orderBys: [{ metric: { metricName: "engagedSessions" }, desc: true }],
  }),
]);

if (pages.available) {
  pages.rows = pages.rows.filter(
    (row) => !String(row.pagePath).includes("internal-exclusion"),
  );
}

const output = {
  generatedAt: new Date().toISOString(),
  timezone: "Asia/Ho_Chi_Minh",
  period: { since, until },
  propertyId: PROPERTY_ID,
  source: "Google Analytics 4 Data API (aggregated data)",
  note: "GA4 tracking began on 2026-07-16; earlier history is unavailable.",
  countries,
  pages,
  events,
  sources,
};

const outputArgument = argument("output");
const outputFile = outputArgument
  ? path.resolve(process.cwd(), outputArgument)
  : path.resolve(process.cwd(), "reports", "raw", `${since}-to-${until}-ga4.json`);
const workspace = `${path.resolve(process.cwd())}${path.sep}`;
if (!outputFile.startsWith(workspace)) {
  throw new Error("Output must stay inside the project directory.");
}
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify(output, null, 2)}\n`, "utf8");

console.log(`Aggregated GA4 data saved to ${outputFile}.`);
