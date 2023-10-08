import fs from "fs";

import prisma from "../prisma";
import { ObservableQueue } from "./models/observableQueue";
import { Page } from "./models/page";
import { createParser } from "./createParser";

if (process.argv.length < 3) {
  console.log("Missing input file parameter.");
  process.exit();
}

prisma.page.deleteMany({}).then(() => {
  const readStream = fs.createReadStream(process.argv[2], {
    highWaterMark: 1024 * 1024,
  });

  const queue = new ObservableQueue<Page>((queue) => {
    console.log(`[Consumer] Queue length before splice is ${queue.length}`);
    const removed = queue.splice(0, queue.length);
    removed[0].save();
    console.log(`[Consumer] Queue length after removing ${removed.length} elements is ${queue.length}`);
  });

  const parser = createParser(queue);

  type Stringable = {
    toString(): string;
  };

  readStream.on("data", (chunk: Stringable) => {
    parser.write(chunk.toString());
  });

  readStream.on("end", () => {
    console.log("End of file");
    console.log(`${queue.length()} pages in the queue`);
  });
});
