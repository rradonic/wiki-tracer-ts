import { GraphNode } from "./models/graphNode";

const nodeA = new GraphNode("A");
const nodeB = new GraphNode("B");
const nodeC = new GraphNode("C");
const nodeD = new GraphNode("D");

nodeA.addEdge(nodeB);
nodeB.addEdge(nodeC);
nodeC.addEdge(nodeD);
nodeA.addEdge(nodeD);

const nodes = [nodeA];

function dijkstra(nodes: Array<GraphNode>, source: number) {
  console.log("Done!");
}
