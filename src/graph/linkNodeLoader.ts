import { prisma } from "../prisma";

import { GraphNode } from "./models/graphNode";
import { BATCH_SIZE, LINK_LOAD_LIMIT } from "./constants";

export class LinkNodeLoader {
  readonly nodes: Map<string, GraphNode>;

  constructor(nodes: Map<string, GraphNode>) {
    this.nodes = nodes;
  }

  async load() {
    console.log("Loading links");

    const nodes = this.nodes.values();

    for (let i = 0; i < Math.min(this.nodes.size, LINK_LOAD_LIMIT); i++) {
      const node = nodes.next().value!;

      if (i % BATCH_SIZE === 0) {
        process.stdout.write(`.`);
      }

      const links = await this.fetchLinks(node);

      links.forEach((link) => {
        const to = this.nodes.get(link.to);

        if (to) {
          node.addEdge(to, 1);
        }
      });
    }

    console.log(".");
  }

  private async fetchLinks(node: GraphNode) {
    const links = await prisma.link.findMany({
      where: {
        from: node.name,
      },
    });

    return links;
  }
}
