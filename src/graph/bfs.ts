import { GraphNode } from "./models/graphNode";

export function bfs(startNode: GraphNode, endNode: GraphNode) {
  console.log("Searching");

  const queue = [startNode];
  startNode.visited = true;

  while (queue.length > 0) {
    const currentNode = queue.shift()!;

    currentNode.unvisitedNeighbors().forEach((neighbor) => {
      neighbor.visited = true;
      queue.push(neighbor);
      neighbor.previous = currentNode;
    });
  }

  console.log();

  const path = [];

  let node = endNode;

  while (node.previous) {
    path.push(node);
    node = node.previous;
  }

  path.push(startNode);

  return path.reverse();
}
