import { GraphEdge } from "./graphEdge";

export class GraphNode {
  name: string;
  edges: Array<GraphEdge> = [];
  distance = Number.MAX_SAFE_INTEGER;
  previous: GraphNode | null = null;
  visited = false;

  // used only when initially loading the wikipedia article graph, these are simply the titles of other articles.
  // `connectEdges` will then actually create the edges between the nodes based on this, and store them in the `edges`
  // field of each node.
  unconnectedEdges: Array<string> = [];

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
