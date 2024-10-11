import { prisma } from "../prisma";
import { Page } from "@prisma/client";

import { GraphNode } from "./models/graphNode";

export class PageLoader {
  readonly nodes;
  cursor: { id: number } | undefined;

  constructor() {
    this.nodes = new Array<GraphNode>();
  }

  async load() {
    const nodes = await Promise.resolve([]);
    await this.next(nodes);

    console.log(this.nodes.length);
  }

  // TODO: try doing this as a generator
  private async fetchPageBatch() {
    const batch = await prisma.page.findMany({
      take: 5000,
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
    if (this.cursor && batch.length === 0) {
      return Promise.resolve([]);
    }

    process.stdout.write(".");

    batch.forEach((page) => {
      this.nodes.push(new GraphNode(page.title));
    });

    const nextBatch = await this.fetchPageBatch();
    return await this.next(nextBatch);
  }
}
