import { prisma } from "../prisma";
import { Page } from "@prisma/client";

import { GraphNode } from "./models/graphNode";
import { BATCH_SIZE } from "./constants";

export class PageNodeLoader {
  // using a Map here for fast node lookup, we need it while linking the nodes
  readonly nodes: Map<string, GraphNode>;
  cursor: { id: number } | undefined;
  counter;

  constructor() {
    this.nodes = new Map<string, GraphNode>();
    this.counter = 0;
  }

  async load() {
    console.log("Loading pages");

    const nodes = await this.next([]);

    console.log();

    return nodes;
  }

  // TODO: try doing this as a generator
  private async fetchPageBatch() {
    const batch = await prisma.page.findMany({
      take: BATCH_SIZE,
      skip: this.cursor ? 1 : 0,
      cursor: this.cursor ?? undefined,
      orderBy: {
        title: "asc",
      },
    });

    const last = batch.at(-1);

    if (last) {
      this.cursor = {
        id: last.id,
      };
    }

    return batch;
  }

  private async next(batch: Page[]): Promise<Page[]> {
    this.counter++;

    if (this.cursor && batch.length === 0) {
      return Promise.resolve([]);
    }

    process.stdout.write(".");

    batch.forEach((page) => {
      this.nodes.set(page.title, new GraphNode(page.title));
    });

    const nextBatch = await this.fetchPageBatch();
    return await this.next(nextBatch);
  }
}
