const fs = require("fs");

const content = fs.readFileSync("facebook-source.md", "utf8");
const imgRegex = /<img[^>]*src="([^"]*)"[^>]*>/gi;
let match;
const imgs = [];
while ((match = imgRegex.exec(content)) !== null) {
  imgs.push(match[1]);
}

console.log("Total images found:", imgs.length);
const unique = [...new Set(imgs)];
unique.forEach((u, i) => console.log(`[${i + 1}] ${u.substring(0, 150)}`));
