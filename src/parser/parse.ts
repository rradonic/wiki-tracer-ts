import fs from "fs";

import { prisma } from "../prisma";
import { createParser } from "./createParser";

if (process.argv.length < 3) {
  console.log("Missing input file parameter.");
  process.exit();
}

// using then() because there's no top level await yet in node's module system
prisma.page.deleteMany({}).then(() => {
  const readStream = fs.createReadStream(process.argv[2], {
    highWaterMark: 1024 * 1024,
  });

  const parser = createParser();

  type Stringable = {
    toString(): string;
  };

  readStream.on("data", (chunk: Stringable) => {
    parser.write(chunk.toString());
  });

  readStream.on("end", async () => {
    console.log("End of file");
  });
});
