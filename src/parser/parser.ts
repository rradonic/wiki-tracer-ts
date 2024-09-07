import expat, { ExpatParser } from "node-expat";

import { Page } from "./models/page";
import { ParserElement } from "./models/parserElement";
import { SimpleStack } from "./models/simpleStack";
import { specialArticle } from "./specialArticle";

export class Parser {
  readonly expat: ExpatParser;
  readonly stack: SimpleStack<ParserElement>;
  readonly pageDataHolder: Partial<Page>;
  counter: number;
  promise: Promise<void>;

  constructor() {
    this.expat = new expat.Parser("UTF-8");
    this.counter = 0;
    this.stack = new SimpleStack<ParserElement>();
    this.pageDataHolder = {};
    this.promise = Promise.resolve();

    this.expat.on("startElement", (name: string) => {
      this.stack.push({ key: name });
    });

    this.expat.on("endElement", async (name: string) => {
      if (name === "title") {
        this.pageDataHolder.title = this.stack.top().value;
      }

      if (name === "text" && !specialArticle(this.pageDataHolder.title!)) {
        this.counter++;

        const page = new Page(this.pageDataHolder.title!, this.stack.top().value!, this.counter);

        console.log(`${this.counter}: ${page.title}`);

        // add the save call to the promise chain, the page will get saved once the previous promise completes
        this.promise = this.promise.then(() => {
          return page.save();
        });
      }

      this.stack.pop();
    });

    this.expat.on("text", (text: string) => {
      const top = this.stack.top();

      if (top.value === undefined) {
        top.value = text.trim();
      } else {
        top.value += text.trim();
      }
    });
  }
}
