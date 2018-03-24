const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: fs.createReadStream("crimeData.txt")
});

rl.on("line", function(line) {
  console.log("Line from file:", line);
});
