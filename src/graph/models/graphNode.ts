import { GraphEdge } from "./graphEdge";

export class GraphNode {
  name: string;
  edges: Array<GraphEdge> = [];
  distance = Number.MAX_SAFE_INTEGER;
  previous: GraphNode | null = null;
  visited = false;

  constructor(name: string) {
    this.name = name;
  }

  addEdge(node: GraphNode, weight: number) {
    this.edges.push(new GraphEdge(node, weight));
  }

  unvisitedEdges() {
    return this.edges.filter((edge) => !edge.neighbor.visited);
  }
}
