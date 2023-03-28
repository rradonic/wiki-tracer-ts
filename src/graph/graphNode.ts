export class GraphNode {
  name: string;
  edges: Array<string>;

  constructor(name: string, edges: Array<string>) {
    this.name = name;
    this.edges = edges;
  }
}
