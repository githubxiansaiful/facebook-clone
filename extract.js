const fs = require("fs");

const content = fs.readFileSync("facebook-source.md", "utf8");
const svgRegex = /<svg[^>]*>([\s\S]*?)<\/svg>/gi;
let match;
let count = 0;
const results = [];

while ((match = svgRegex.exec(content)) !== null) {
  count++;
  results.push(match[0]);
}

console.log("Total SVGs found:", count);
results.forEach((s, idx) => {
  // Extract viewBox and paths
  const vb = (s.match(/viewBox="([^"]*)"/) || [])[1] || "none";
  const w = (s.match(/width="([^"]*)"/) || [])[1] || "";
  const h = (s.match(/height="([^"]*)"/) || [])[1] || "";
  const ariaLabel = (s.match(/aria-label="([^"]*)"/) || [])[1] || "";
  console.log(`[${idx + 1}] viewBox="${vb}" ${w}x${h} label="${ariaLabel}" snippet: ${s.substring(0, 120)}...`);
});
