import { GraphNode } from "./models/graphNode";
import { findNode } from "./findNode";

export function connectEdges(nodes: Array<GraphNode>, node: GraphNode) {
  node.unconnectedEdges.forEach((name) => {
    // console.log(`Connecting ${node.name} -> ${name}...`);
    const targetNode = findNode(nodes, name);

    if (targetNode) {
      // console.log("  Found.");
      node.edges.push(targetNode);
    } else {
      // console.log("  Not found.");
    }
  });

  // console.log(node);
}
