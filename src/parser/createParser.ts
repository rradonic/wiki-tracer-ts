import fs from "fs";

import expat from "node-expat";

import { Page } from "./models/page";
import { ParserElement } from "./models/parserElement";
import { SimpleStack } from "./models/simpleStack";
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

      writeStream.write(`${page.title!.toLowerCase()}\n`);
      console.log(`${counter}: ${page.title!.toLowerCase()}`);

      page.links!.forEach((link) => {
        // the split('#')[0] is to remove the anchor, if there is one
        writeStream.write(`  ${link.split("#")[0].toLowerCase()}\n`);
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
