export class GraphNode {
  name: string;
  unconnectedEdges: Array<string> = [];
  edges: Array<GraphNode> = [];

  constructor(name: string) {
    this.name = name;
  }

  connectEdges(nodes: Array<GraphNode>) {
    return;
  }
}
