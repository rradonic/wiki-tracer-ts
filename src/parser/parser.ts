import expat, { ExpatParser } from "node-expat";
import { ReadStream } from "fs";

import { Page } from "./models/page";
import { Attributes } from "./models/attributes";
import { Element } from "./models/element";
import { SimpleStack } from "./models/simpleStack";
import { specialArticle } from "./specialArticle";

export class Parser {
  readonly expat: ExpatParser;
  readonly stack: SimpleStack<Element>;
  readonly pageDataHolder: Partial<Page>;
  readonly readStream: ReadStream;
  counter: number;
  promise: Promise<void>;

  // how many pages have already been parsed and are waiting to be written to the database. need to
  // keep the queue size down so we don't run out of memory.
  queueSize: number;

  constructor(readStream: ReadStream) {
    this.expat = new expat.Parser("UTF-8");
    this.counter = 0;
    this.queueSize = 0;
    this.stack = new SimpleStack<Element>();
    this.pageDataHolder = {};
    this.promise = Promise.resolve();
    this.readStream = readStream;
  }

  parse() {
    this.registerExpatCallbacks();
    this.registerReadStreamCallbacks();
  }

  private registerExpatCallbacks() {
    this.expat.on("startElement", (name: string, attributes: Attributes) => {
      this.stack.push({ name, attributes });
    });

    this.expat.on("endElement", (name: string) => {
      if (name === "title") {
        this.pageDataHolder.title = this.stack.top().content!;
      }

      if (name === "redirect") {
        // inject the redirect as a link so it gets stored
        this.pageDataHolder.text = `[[${this.stack.top().attributes.title}]]`;
      }

      if (name === "text" && !specialArticle(this.pageDataHolder.title!)) {
        this.counter++;
        this.queueSize++;

        this.pageDataHolder.text = this.stack.top().content!;

        const page = new Page(this.pageDataHolder.title!, this.pageDataHolder.text);
        const counterCopy = this.counter;

        // add the save call to the promise chain, the page will get saved once the previous
        // promise completes. TODO: convert this to recursion maybe.
        this.promise = this.promise.then(() => {
          this.queueSize--;

          if (this.queueSize === 0) {
            this.readFromStream();
          }

          return page.save(counterCopy);
        });
      }

      this.stack.pop();
    });

    this.expat.on("text", (text: string) => {
      const top = this.stack.top();

      if (top.content === undefined) {
        top.content = text.trim();
      } else {
        top.content += text.trim();
      }
    });
  }

  private registerReadStreamCallbacks() {
    this.readStream.on("readable", () => {
      if (this.queueSize > 0) {
        return;
      }

      this.readFromStream();
    });
  }

  private readFromStream() {
    let chunk;

    while ((chunk = this.readStream.read()) !== null) {
      this.expat.write(chunk);
    }
  }
}
