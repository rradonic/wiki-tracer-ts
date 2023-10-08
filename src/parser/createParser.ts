import expat from "node-expat";

import { ObservableQueue } from "./models/observableQueue";
import { Page } from "./models/page";
import { ParserElement } from "./models/parserElement";
import { SimpleStack } from "./models/simpleStack";
import { specialArticle } from "./specialArticle";

export function createParser(queue: ObservableQueue<Page>) {
  const parser = new expat.Parser("UTF-8");

  let counter = 0;

  const stack = new SimpleStack<ParserElement>();
  const page = new Page();

  parser.on("startElement", function (name: string) {
    stack.push({ key: name });
  });

  parser.on("endElement", function (name: string) {
    if (name === "title") {
      page.title = stack.top().value;
    }

    if (name === "text" && !specialArticle(page.title!)) {
      counter++;

      page.text = stack.top().value;
      page.processLinks();

      console.log(`${counter}: ${page.title!.toLowerCase()}`);

      queue.push(page);
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
