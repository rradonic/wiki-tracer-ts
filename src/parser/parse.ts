import fs from "fs";

import { Parser } from "./parser";

if (process.argv.length < 3) {
  console.log("Missing input file parameter.");
  process.exit();
}

const readStream = fs.createReadStream(process.argv[2], {
  highWaterMark: 1024 * 1024,
});

const parser = new Parser(readStream);
parser.parse();
