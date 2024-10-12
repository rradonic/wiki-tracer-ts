import { PageNodeLoader } from "./pageNodeLoader";
import { LinkNodeLoader } from "./linkNodeLoader";

const pageNodeLoader = new PageNodeLoader();

pageNodeLoader.load().then(() => {
  console.log();

  const linkNodeLoader = new LinkNodeLoader(pageNodeLoader.nodes);
  linkNodeLoader.load();
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
