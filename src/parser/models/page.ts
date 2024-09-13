import { knex } from "../../knex";

import { specialArticle } from "../specialArticle";

export class Page {
  title: string;
  links: Array<string>;
  index: number;

  private static regex = /\[\[(.+?)\]\]/g;

  constructor(params: { title: string; text: string; index: number }) {
    this.title = params.title.toLowerCase();
    this.links = Page.extractLinks(params.text);
    this.index = params.index;
  }

  async save() {
    const existingRecord = await knex("pages").where({ title: this.title }).first();

    if (existingRecord?.complete) {
      console.log(`Skipping ${this.title} (${this.index})`);
      return;
    }

    process.stdout.write(`Saving ${this.title} (${this.index})`);

    if (existingRecord) {
      const ids = await knex("links")
        .innerJoin("pages", "pages.id", "links.from")
        .select("links.id");

      console.log(ids);

      // await knex("links").where({ from: this.id }).delete();
    }

    // await prisma.page.upsert({
    //   where: {
    //     title: this.title,
    //   },
    //   update: {},
    //   create: {
    //     title: this.title,
    //   },
    // });

    // const uniqueLinks = [...new Set(this.links)];

    // for (const link of uniqueLinks) {
    //   process.stdout.write(".");

    //   await prisma.link.create({
    //     data: {
    //       from: {
    //         connect: {
    //           title: this.title,
    //         },
    //       },
    //       to: {
    //         connectOrCreate: {
    //           where: {
    //             title: link,
    //           },
    //           create: {
    //             title: link,
    //           },
    //         },
    //       },
    //     },
    //   });
    // }

    // await prisma.page.update({
    //   where: {
    //     title: this.title,
    //   },
    //   data: {
    //     complete: true,
    //   },
    // });

    console.log();
  }

  private static extractLinks(text: string) {
    const links = new Array<string>();

    const iterator = text.matchAll(Page.regex);
    let result = iterator.next();

    while (!result.done) {
      const title = result.value[1].split("|")[0].trim();

      if (!specialArticle(title)) {
        links.push(title.toLowerCase());
      }

      result = iterator.next();
    }

    return links;
  }
}
