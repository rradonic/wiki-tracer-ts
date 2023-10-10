import { prisma } from "../../prisma";
import { specialArticle } from "../specialArticle";

export class Page {
  title: string | undefined;
  text: string | undefined;
  links: Array<string> | undefined;

  private static regex = /\[\[(.+?)\]\]/g;

  constructor(title: string | undefined = undefined, links: string[] | undefined = undefined) {
    this.title = title;
    this.links = links;
  }

  processLinks() {
    if (this.text === undefined) {
      throw new Error("Can't process links, text is empty!");
    }

    this.links = [];

    const iterator = this.text.matchAll(Page.regex);
    let result = iterator.next();

    while (!result.done) {
      const title = result.value[1].split("|")[0].trim();

      if (!specialArticle(title)) {
        this.links.push(title);
      }

      result = iterator.next();
    }

    this.text = undefined;
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
}
