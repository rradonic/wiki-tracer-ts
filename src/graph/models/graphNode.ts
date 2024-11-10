export class GraphNode {
  title: string;
  neighbors: GraphNode[] = [];
  previous: GraphNode | null = null;
  visited = false;

  constructor(name: string) {
    this.title = name;
  }

  addNeighbor(node: GraphNode) {
    this.neighbors.push(node);
  }

  unvisitedNeighbors() {
    return this.neighbors.filter((neighbor) => !neighbor.visited);
  }
}
