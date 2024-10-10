import { prisma } from "../prisma";
import { Page } from "@prisma/client";

import { GraphNode } from "./models/graphNode";
import { connectEdges } from "./connectEdges";

const nodes = new Array<GraphNode>();
let currentNode: GraphNode | undefined;

let cursor: { id: number };
let counter = 0;

// TODO try doing this as a generator
async function fetchBatch() {
  const batch = await prisma.page.findMany({
    take: 5000,
    skip: cursor ? 1 : 0,
    cursor: cursor ?? undefined,
    orderBy: {
      id: "asc",
    },
  });

  const last = batch.at(-1);

  if (last) {
    cursor = {
      id: last.id,
    };
  }

  return batch;
}

function next(batch: Page[]): Promise<Page[]> {
  counter++;
  process.stdout.write(".");
  console.log(counter);

  if (cursor && batch.length === 0) {
    return Promise.resolve([]);
  }

  batch.forEach((page) => {
    currentNode = new GraphNode(page.title);
    nodes.push(currentNode);
  });

  return fetchBatch().then((batch) => {
    return next(batch);
  });
}

Promise.resolve([])
  .then(next)
  .then(() => {
    console.log(nodes.length, nodes.at(-1));
  });

// batchPromise.then(() => {
//   console.log();
//   console.log(nodes.length);
// });

// rl.on("line", (line) => {
//   counter++;

//   if (counter % 100000 === 0) {
//     console.log(`Line ${counter}`);
//   }

//   if (line.startsWith("  ")) {
//     currentNode!.unconnectedEdges.push(line.trim());
//   } else {
//     currentNode = new GraphNode(line);
//     orderedInsert(nodes, currentNode);
//   }
// });

// rl.on("close", () => {
//   console.log("End of file");
//   console.log("Connecting edges...");

//   counter = 0;

//   nodes.forEach((node) => {
//     counter++;

//     if (counter % 10000 === 0) {
//       console.log(`Node ${counter}`);
//     }

//     connectEdges(nodes, node);
//   });
// });
