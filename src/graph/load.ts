import { PageLoader } from "./pageLoader";

const pageLoader = new PageLoader();
pageLoader.load();

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
