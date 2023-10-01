import { GraphNode } from "./models/graphNode";
import { findNode } from "./findNode";

export function connectEdges(nodes: Array<GraphNode>, node: GraphNode) {
  node.unconnectedEdges.forEach((name) => {
    const targetNode = findNode(nodes, name);

    if (targetNode) {
      node.edges.push(targetNode);
    }
  });
