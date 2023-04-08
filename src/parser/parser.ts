import fs from "fs";

import expat from "node-expat";

import { Page } from "./page";
import { ParserElement } from "./parserElement";
import { SimpleStack } from "./simpleStack";
import { specialArticle } from "./specialArticle";

export function createParser(writeStream: fs.WriteStream) {
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

      writeStream.write(`${page.title}\n`);
      console.log(`${counter}: ${page.title}`);

      page.links!.forEach((link) => {
        writeStream.write(`  ${link}\n`);
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
