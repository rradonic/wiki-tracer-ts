import { prisma } from "../../prisma";
import { specialArticle } from "../specialArticle";

export class Page {
  title: string;
  text: string;

  private static regex = /\[\[(.+?)\]\]/g;

  constructor(title: string, text: string) {
    this.title = title.toLowerCase();
    this.text = text;
  }

  async save(index: number) {
    const existingRecord = await prisma.page.findFirst({
      where: {
        title: this.title,
      },
    });

    if (existingRecord?.complete) {
      console.log(`Skipping ${this.title} (${index}) because it's already complete`);
      return;
    }

    process.stdout.write(`Saving ${this.title} (${index})`);

    if (existingRecord) {
      await prisma.link.deleteMany({
        where: {
          from: existingRecord.title,
        },
      });
    }

    await prisma.page.upsert({
      where: {
        title: this.title,
      },
      update: {},
      create: {
        title: this.title,
      },
    });

    const uniqueLinks = [...new Set(Page.extractLinks(this.text))];

    await prisma.link.createMany({
      data: uniqueLinks.map((link) => {
        return {
          from: this.title,
          to: link,
        };
      }),
    });

    await prisma.page.update({
      where: {
        title: this.title,
      },
      data: {
        complete: true,
      },
    });

    console.log();
  }

  private static extractLinks(text: string) {
    const links: string[] = [];

    const textWithoutCoordinates = text.replace(
      /"coordinates": (.+?)}/gm,
      '"coordinates": <removed>}',
    );

    const iterator = textWithoutCoordinates.matchAll(Page.regex);
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
