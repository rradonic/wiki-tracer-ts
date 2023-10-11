import expat from "node-expat";

import { Page } from "./models/page";
import { ParserElement } from "./models/parserElement";
import { SimpleStack } from "./models/simpleStack";
import { specialArticle } from "./specialArticle";

export function createParser() {
  const parser = new expat.Parser("UTF-8");

  let counter = 0;

  const stack = new SimpleStack<ParserElement>();
  const pageDataHolder: Partial<Page> = {};
  let promise: PromiseLike<unknown> = Promise.resolve();

  parser.on("startElement", function (name: string) {
    stack.push({ key: name });
  });

  parser.on("endElement", async function (name: string) {
    if (name === "title") {
      pageDataHolder.title = stack.top().value;
    }

    if (name === "text" && !specialArticle(pageDataHolder.title!)) {
      const page = new Page(pageDataHolder.title!, stack.top().value!);

      console.log(`${++counter}: ${page.title.toLowerCase()}`);

      // add the save call to the promise chain, the page will get saved once the previous promise completes
      promise = promise.then(() => {
        return page.save();
      });
    }

    stack.pop();
  });

  parser.on("text", function (text: string) {
    const top = stack.top();

    if (top.value === undefined) {
      top.value = text.trim();
    } else {
      top.value += text.trim();
    }
  });

  return parser;
}
