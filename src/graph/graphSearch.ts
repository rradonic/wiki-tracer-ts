import { GraphNode } from "./models/graphNode";

function dijkstra(nodes: Array<GraphNode>, source: number) {
  const count = nodes.length;

  const distance = new Array<number>(count);

  for (let i = 0; i < count; i++) {
    visitedVertex[i] = false;
    distance[i] = Number.MAX_SAFE_INTEGER;
  }

  console.log("Done!");
}
