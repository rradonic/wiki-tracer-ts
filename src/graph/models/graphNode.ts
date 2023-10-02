export class GraphNode {
  name: string;
  edges: Array<GraphNode> = [];
  distance: number = Number.MAX_SAFE_INTEGER;
  previous: GraphNode | null = null;

  // used only when initially loading the wikipedia article graph, these are simply the titles of other articles.
  // `connectEdges` will then actually create the edges between the nodes based on this.
  unconnectedEdges: Array<string> = [];

  constructor(name: string) {
    this.name = name;
  }

  addEdge(node: GraphNode) {
    this.edges.push(node);
  }
}
