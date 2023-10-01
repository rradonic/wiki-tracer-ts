import fs from "fs";
import readline from "readline";

import { GraphNode } from "./models/graphNode";
import { orderedInsert } from "./orderedInsert";
import { connectEdges } from "./connectEdges";

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
    currentNode!.unconnectedEdges.push(line.trim());
  } else {
    currentNode = new GraphNode(line);
    orderedInsert(nodes, currentNode);
  }
});

rl.on("close", () => {
  console.log("End of file");
  console.log("Connecting edges...");

  counter = 0;

  nodes.forEach((node) => {
    counter++;

    if (counter % 10000 === 0) {
      console.log(`Node ${counter}`);
    }

    connectEdges(nodes, node);
  });
});
