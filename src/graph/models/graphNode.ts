export class GraphNode {
  name: string;
  neighbors: Array<GraphNode> = [];
  previous: GraphNode | null = null;
  visited = false;

  constructor(name: string) {
    this.name = name;
  }

  addNeighbor(node: GraphNode) {
    this.neighbors.push(node);
  }

  unvisitedNeighbors() {
    return this.neighbors.filter((neighbor) => !neighbor.visited);
  }
}
