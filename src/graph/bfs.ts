import { GraphNode } from "./models/graphNode";

export function bfs(startNode: GraphNode, endNode: GraphNode) {
  console.log("Searching");

  const queue = [startNode];
  startNode.visited = true;

  while (queue.length > 0) {
    const currentNode = queue.shift()!;

    if (currentNode === endNode) {
      break;
    }

    currentNode.unvisitedNeighbors().forEach((neighbor) => {
      neighbor.visited = true;
      queue.push(neighbor);
      neighbor.previous = currentNode;
    });
  }

  const path = [];

  let node = endNode;

  while (node.previous) {
    path.push(node);
    node = node.previous;
  }

  if (path.length === 0) {
    return [];
  }

  path.push(startNode);

  return path.reverse();
}
