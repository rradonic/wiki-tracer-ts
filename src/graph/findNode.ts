import { GraphNode } from "./graphNode";

export function findNode(nodes: Array<GraphNode>, name: string) {
  let left = 0;
  let right = nodes.length;

  while (left < right) {
    const middle = Math.floor((left + right) / 2);

    if (nodes[middle].name < name) {
      left = middle + 1;
    } else if (nodes[middle].name > name) {
      right = middle;
    } else {
      // this is the node, return it
      return nodes[middle];
    }
  }

  return;
}
