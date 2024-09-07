import { prisma } from "../../prisma";
import { specialArticle } from "../specialArticle";

export class Page {
  title: string;
  links: Array<string>;

  private static regex = /\[\[(.+?)\]\]/g;

  constructor(title: string, text: string) {
    this.title = title.toLowerCase();
    this.links = Page.extractLinks(text);
  }

  async save() {
    console.log();
    process.stdout.write(`Saving ${this.title}`);

    await prisma.page.upsert({
      where: {
        title: this.title,
      },
      update: {},
      create: {
        title: this.title,
      },
    });

    const uniqueLinks = [...new Set(this.links)];

    for (const link of uniqueLinks) {
      process.stdout.write(".");

      await prisma.link.create({
        data: {
          from: {
            connect: {
              title: this.title,
            },
          },
          to: {
            connectOrCreate: {
              where: {
                title: link,
              },
              create: {
                title: link,
              },
            },
          },
        },
      });
    }
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
