import fs from "fs";
import readline from "readline";

import { GraphNode } from "./graphNode";

const fileStream = fs.createReadStream("data/pages.out", {
  highWaterMark: 1024 * 1024,
});

const rl = readline.createInterface({
  input: fileStream,
});

let nodes = new Array<GraphNode>();
let counter = 0;

rl.on("line", (line) => {
  counter++;
  console.log(`Line ${counter}`);

  // if(line.startsWith('  ')) {
  //   node.at(-1).edges.push()
  // }
  // nodes.push(new GraphNode(name:))
});

rl.on("close", () => {
  console.log("End of file");
});
