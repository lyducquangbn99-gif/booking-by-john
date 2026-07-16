import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";
import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

function argument(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? "" : process.argv[index + 1] || "";
}

function workspaceFile(fileName) {
  const resolved = path.resolve(process.cwd(), fileName);
  const workspace = `${path.resolve(process.cwd())}${path.sep}`;
  if (!resolved.startsWith(workspace) || !fs.existsSync(resolved)) {
    throw new Error(`File is missing or outside the project: ${fileName}`);
  }
  return resolved;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const reportFile = workspaceFile(argument("file"));
const imageArgument = argument("image");
const imageFile = imageArgument ? workspaceFile(imageArgument) : "";
const subject = argument("subject") || "Booking by John — content ready for approval";
const sender = process.env.GMAIL_USER;
const password = process.env.GMAIL_PASS;
const recipient = argument("to") || process.env.REPORT_RECIPIENT_EMAIL || sender;

if (!sender || !password || !recipient) {
  throw new Error("GMAIL_USER, GMAIL_PASS and a recipient are required.");
}

const content = fs.readFileSync(reportFile, "utf8");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: sender, pass: password },
});

await transporter.sendMail({
  from: `Booking by John <${sender}>`,
  to: recipient,
  subject,
  text: content,
  html: `<div style="font-family:Arial,sans-serif;white-space:pre-wrap;line-height:1.55;color:#0b1f3a">${escapeHtml(content)}</div>`,
  attachments: imageFile
    ? [{ filename: path.basename(imageFile), path: imageFile }]
    : [],
});

console.log(`Review email sent to ${recipient}.`);
