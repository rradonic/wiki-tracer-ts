import { GraphNode } from "./graphNode";

export function orderedInsert(nodes: Array<GraphNode>, node: GraphNode) {
  let left = 0;
  let right = nodes.length;

  while (left < right) {
    const middle = Math.floor((left + right) / 2);

    if (nodes[middle].name < node.name) {
      left = middle + 1;
    } else if (nodes[middle].name > node.name) {
      right = middle;
    } else {
      // this node is a duplicate, we can throw it away
      return;
    }
  }

  nodes.splice(left, 0, node);
}
