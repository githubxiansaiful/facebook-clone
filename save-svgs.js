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

const lines = [];
results.forEach((s, idx) => {
  lines.push(`\n================= SVG ${idx + 1} =================`);
  lines.push(s);
});

fs.writeFileSync("extracted-svgs.txt", lines.join("\n"));
console.log("Saved all extracted SVGs to extracted-svgs.txt");
