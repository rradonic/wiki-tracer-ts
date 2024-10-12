import { prisma } from "../prisma";
import { Link } from "@prisma/client";

import { GraphNode } from "./models/graphNode";
import { findNode } from "./findNode";

export class LinkNodeLoader {
  readonly nodes: GraphNode[];
  counter = 0;

  constructor(nodes: GraphNode[]) {
    this.nodes = nodes;
  }

  async load() {
    console.log("Loading links");

    for (const node of this.nodes) {
      this.counter++;

      process.stdout.write(`${this.counter} ${node.name}`);

      await this.fetchLinks(node);
    }
  }

  private async fetchLinks(node: GraphNode) {
    const batch = await prisma.link.findMany({
      where: {
        from: node.name,
      },
    });

    console.log(` (${batch.length} links)`);
  }
}
