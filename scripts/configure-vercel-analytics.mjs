import fs from "node:fs";
import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const token = process.env.VERCEL_TOKEN;
if (!token) throw new Error("VERCEL_TOKEN is missing from .env.local.");

const headers = { Authorization: `Bearer ${token}` };

async function getJson(url) {
  const response = await fetch(url, { headers });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error?.message || `Vercel API returned ${response.status}.`);
  }
  return body;
}

const teams = await getJson("https://api.vercel.com/v2/teams");
const team = teams.teams?.find(
  (candidate) => candidate.slug === "lyducquangbn99-gifs-projects",
);
if (!team) throw new Error("The Booking by John Vercel team was not found.");

const project = await getJson(
  `https://api.vercel.com/v9/projects/booking-by-john?teamId=${encodeURIComponent(team.id)}`,
);

const envPath = `${process.cwd()}\\.env.local`;
let envText = fs.readFileSync(envPath, "utf8");
envText = envText
  .replace(/^VERCEL_TEAM_ID=.*\r?\n?/m, "")
  .replace(/^VERCEL_PROJECT_ID=.*\r?\n?/m, "")
  .trimEnd();
envText += `\nVERCEL_TEAM_ID=${team.id}\nVERCEL_PROJECT_ID=${project.id}\n`;
fs.writeFileSync(envPath, envText, "utf8");

console.log("Vercel analytics credentials configured for booking-by-john.");
