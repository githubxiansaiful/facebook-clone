const fs = require("fs");

const content = fs.readFileSync("facebook-source.md", "utf8");

// Search for all <i ... style="...background...-position..."> or elements with background-position
const regex = /<i[^>]*style="([^"]*background-position:[^"]*)"[^>]*>/gi;
let match;
const found = [];

while ((match = regex.exec(content)) !== null) {
  found.push(match[0]);
}

console.log("Total sprite <i> elements found:", found.length);
const unique = [...new Set(found)];
unique.forEach((u, i) => console.log(`[${i + 1}] ${u}\n`));
