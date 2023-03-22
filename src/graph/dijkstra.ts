import { GraphNode } from "./models/graphNode";

const nodeA = new GraphNode("A");
const nodeB = new GraphNode("B");
const nodeC = new GraphNode("C");
const nodeD = new GraphNode("D");
const nodeE = new GraphNode("E");

nodeA.addEdge(nodeB, 6);
nodeA.addEdge(nodeD, 1);

nodeB.addEdge(nodeC, 5);
nodeB.addEdge(nodeD, 2);
nodeB.addEdge(nodeE, 2);

nodeC.addEdge(nodeB, 5);
nodeC.addEdge(nodeE, 5);

nodeD.addEdge(nodeA, 1);
nodeD.addEdge(nodeB, 2);
nodeD.addEdge(nodeE, 1);

nodeE.addEdge(nodeB, 2);
nodeE.addEdge(nodeC, 5);
nodeE.addEdge(nodeD, 1);

// starting node
nodeA.distance = 0;

function dijkstra(source: GraphNode, target: GraphNode) {
  console.log(`Visiting ${source.name}(${source.distance})`);

  source.visited = true;

  const unvisitedEdges = source.unvisitedEdges().sort((a, b) => {
    if (a.weight < b.weight) {
      return -1;
    } else if (a.weight > b.weight) {
      return 1;
    } else {
      return 0;
    }
  });

  unvisitedEdges.forEach((edge) => {
    const newDistance = source.distance + edge.weight;
    process.stdout.write(`Checking ${edge.neighbor.name}, `);

    if (newDistance < edge.neighbor.distance) {
      console.log(`${newDistance} < ${edge.neighbor.distance}, updating.`);
      edge.neighbor.distance = newDistance;
    } else {
      console.log(`${newDistance} >= ${edge.neighbor.distance}, leaving alone.`);
    }
  });

  unvisitedEdges.forEach((edge) => {
    dijkstra(edge.neighbor, target);
  });
}

dijkstra(nodeA, nodeD);
