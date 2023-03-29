import fs from "fs";
import readline from "readline";

const fileStream = fs.createReadStream("data/pages.out", {
  highWaterMark: 1024 * 1024,
});

const rl = readline.createInterface({
  input: fileStream,
});

let counter = 0;

rl.on("line", (line) => {
  counter++;

  console.log(`Line ${counter} (${line.length})`);
});

rl.on("close", () => {
  console.log("End of file");
});
