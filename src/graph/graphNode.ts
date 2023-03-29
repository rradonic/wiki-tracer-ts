export class GraphNode {
  name: string;
  edges: Array<GraphNode>;

  constructor(name: string, edges: Array<GraphNode>) {
    this.name = name;
    this.edges = edges;
  }
}
