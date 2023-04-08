import fs from "fs";
import readline from "readline";

import { GraphNode } from "./graphNode";
import { orderedInsert } from "./orderedInsert";
import { connectNodes } from "./connectNodes";

const fileStream = fs.createReadStream("data/pages.out", {
  highWaterMark: 1024 * 1024,
});

const rl = readline.createInterface({
  input: fileStream,
});

const nodes = new Array<GraphNode>();
let currentNode: GraphNode | undefined;
let counter = 0;

rl.on("line", (line) => {
  counter++;

  if (counter % 100000 === 0) {
    console.log(`Line ${counter}`);
  }

  if (line.startsWith("  ")) {
    currentNode!.edges.push(new GraphNode(line.trim()));
  } else {
    currentNode = new GraphNode(line);
    orderedInsert(nodes, currentNode);
  }
});

rl.on("close", () => {
  console.log("End of file");
  connectNodes(nodes);
  // console.log(nodes.map((n) => [n.name, n.edges.length].join(", ")).join("\n"));
});
