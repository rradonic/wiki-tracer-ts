import { GraphNode } from "./graphNode";

export class GraphEdge {
  neighbor: GraphNode;
  weight: number;

  constructor(neighbor: GraphNode, weight: number) {
    this.neighbor = neighbor;
    this.weight = weight;
  }
}
