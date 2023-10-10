import { prisma } from "../../prisma";
import { specialArticle } from "../specialArticle";

export class Page {
  title: string;
  links: Array<string>;

  private static regex = /\[\[(.+?)\]\]/g;

  constructor(title: string, text: string) {
    this.title = title;
    this.links = Page.extractLinks(text);
  }

  save() {
    console.log(`Saving ${this.title}...`);

    // const links = this.links.map((link) => {
    //   return {
    //     a: this,
    //     b: link,
    //   };
    // });

    return prisma.page.create({
      data: {
        title: this.title!,
        // linksTo: {
        //   create: links,
        // },
      },
    });
  }

  private static extractLinks(text: string) {
    const links = new Array<string>();

    const iterator = text.matchAll(Page.regex);
    let result = iterator.next();

    while (!result.done) {
      const title = result.value[1].split("|")[0].trim();

      if (!specialArticle(title)) {
        links.push(title);
      }

      result = iterator.next();
    }

    return links;
  }
}
