import fs from "fs";

import { createParser } from "./createParser";

type Stringable = {
  toString(): string;
}

if (process.argv.length < 3) {
  console.log("Missing input file parameter.");
  process.exit();
}

const readStream = fs.createReadStream(process.argv[2], {
  highWaterMark: 1024 * 1024,
});

const writeStream = fs.createWriteStream("data/pages.out");
const parser = createParser(writeStream);

readStream.on("data", (chunk: Stringable) => {
  parser.write(chunk.toString());
});

readStream.on("end", () => {
  console.log("End of file");
});
