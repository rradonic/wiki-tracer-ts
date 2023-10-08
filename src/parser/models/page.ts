import prisma from "../../prisma";

import { specialArticle } from "../specialArticle";

export class Page {
  title: string | undefined;
  text: string | undefined;
  links: Array<string> | undefined;

  private regex = /\[\[(.+?)\]\]/g;

  processLinks() {
    if (this.text === undefined) {
      throw new Error("Can't process links, text is empty!");
    }

    this.links = [];

    const iterator = this.text.matchAll(this.regex);
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
    console.log("Saving...");
    return prisma.page.create({
      data: {
        title: this.title!,
      },
    });
  }
}
