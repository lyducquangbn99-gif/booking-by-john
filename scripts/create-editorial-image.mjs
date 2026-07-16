import fs from "node:fs";
import path from "node:path";
import { createCanvas } from "@napi-rs/canvas";

function argument(name, fallback = "") {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

const title = argument("title", "Vietnam trade and logistics update");
const subtitle = argument("subtitle", "Verified context for importers and exporters");
const category = argument("category", "BOOKING BY JOHN INTELLIGENCE").toUpperCase();
const output = argument("output", "public/blog/editorial-update.png");

const canvas = createCanvas(1600, 900);
const context = canvas.getContext("2d");

context.fillStyle = "#071B33";
context.fillRect(0, 0, 1600, 900);

const gradient = context.createLinearGradient(0, 0, 1600, 900);
gradient.addColorStop(0, "rgba(20, 92, 160, 0.58)");
gradient.addColorStop(1, "rgba(7, 27, 51, 0)");
context.fillStyle = gradient;
context.fillRect(0, 0, 1600, 900);

context.strokeStyle = "rgba(255,255,255,0.10)";
context.lineWidth = 2;
for (let x = 80; x < 1600; x += 120) {
  context.beginPath();
  context.moveTo(x, 0);
  context.lineTo(x, 900);
  context.stroke();
}
for (let y = 60; y < 900; y += 120) {
  context.beginPath();
  context.moveTo(0, y);
  context.lineTo(1600, y);
  context.stroke();
}

context.strokeStyle = "#FF6B2C";
context.lineWidth = 10;
context.beginPath();
context.moveTo(130, 690);
context.bezierCurveTo(450, 410, 790, 780, 1450, 240);
context.stroke();

for (const [x, y] of [[130, 690], [780, 585], [1450, 240]]) {
  context.fillStyle = "#FF6B2C";
  context.beginPath();
  context.arc(x, y, 18, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "rgba(255,255,255,0.85)";
  context.lineWidth = 5;
  context.beginPath();
  context.arc(x, y, 31, 0, Math.PI * 2);
  context.stroke();
}

context.fillStyle = "rgba(255,255,255,0.96)";
context.font = "700 28px Arial";
context.fillText(category, 120, 120);

function wrap(text, x, y, maxWidth, lineHeight, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines - 1) break;
    } else {
      line = candidate;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  lines.forEach((value, index) => context.fillText(value, x, y + index * lineHeight));
}

context.fillStyle = "#FFFFFF";
context.font = "700 70px Arial";
wrap(title, 120, 230, 1050, 82, 4);

context.fillStyle = "rgba(255,255,255,0.76)";
context.font = "400 31px Arial";
wrap(subtitle, 120, 585, 820, 43, 2);

context.fillStyle = "#FF6B2C";
context.fillRect(120, 790, 220, 8);
context.fillStyle = "rgba(255,255,255,0.90)";
context.font = "700 27px Arial";
context.fillText("BOOKINGBYJOHNLY.COM", 120, 845);

const absoluteOutput = path.resolve(output);
fs.mkdirSync(path.dirname(absoluteOutput), { recursive: true });
fs.writeFileSync(absoluteOutput, canvas.toBuffer("image/png"));
console.log(absoluteOutput);

