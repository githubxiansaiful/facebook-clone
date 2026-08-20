const fs = require("fs");

const stats = fs.statSync("public/icons.webp");
console.log("icons.webp size in bytes:", stats.size);
