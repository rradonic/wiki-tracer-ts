import { prisma } from "../prisma";
import { Link } from "@prisma/client";

import { GraphNode } from "./models/graphNode";
import { BATCH_SIZE, LINK_LOAD_LIMIT } from "./constants";

export class LinkNodeLoader {
  readonly nodes: Map<string, GraphNode>;
  cursor: { id: number } | undefined;
  counter;

  constructor(nodes: Map<string, GraphNode>) {
    this.nodes = nodes;
    this.counter = 0;
  }

  async load() {
    console.log("Loading links");

    const nodes = await this.next([]);

    console.log();

    return nodes;
  }

  private async fetchLinkBatch() {
    const batch = await prisma.link.findMany({
      take: BATCH_SIZE,
      skip: this.cursor ? 1 : 0,
      cursor: this.cursor ?? undefined,
    });

    const last = batch.at(-1);

    if (last) {
      this.cursor = {
        id: last.id,
      };
    }

    return batch;
  }

  private async next(batch: Link[]): Promise<Link[]> {
    this.counter++;

    if ((this.cursor && batch.length === 0) || this.counter > LINK_LOAD_LIMIT) {
      return Promise.resolve([]);
    }

    process.stdout.write(".");

    batch.forEach((link) => {
      const from = this.nodes.get(link.from);
      const to = this.nodes.get(link.to);

      if (from && to) {
        from.addNeighbor(to);
      }
    });

    const nextBatch = await this.fetchLinkBatch();
    return await this.next(nextBatch);
  }
}
