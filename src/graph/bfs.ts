import { GraphNode } from "./models/graphNode";

const node1 = new GraphNode("1");
const node2 = new GraphNode("2");
const node3 = new GraphNode("3");
const node4 = new GraphNode("4");

node1.addNeighbor(node2);
node1.addNeighbor(node3);

node2.addNeighbor(node3);

node3.addNeighbor(node4);

export function bfs(startNode: GraphNode, endNode: GraphNode) {
  console.log("Searching");

  const queue = [startNode];
  startNode.visited = true;

  while (queue.length > 0) {
    console.log(queue.map((page) => page.name));
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

console.log(bfs(node1, node4).map((page) => page.name));
