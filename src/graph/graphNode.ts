export class GraphNode {
  name: string;
  edges: Array<GraphNode> = [];

  constructor(name: string) {
    this.name = name;
  }
}
