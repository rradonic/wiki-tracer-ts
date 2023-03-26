import expat from "node-expat";
import fs from "fs";

import { Page } from "./page";
import { ParserElement } from "./parserElement";
import { SimpleStack } from "./simpleStack";

interface Stringable {
  toString(): string;
}

const parser = new expat.Parser("UTF-8");
const stack = new SimpleStack<ParserElement>();
const page = new Page();

let counter = 0;

parser.on("startElement", function (name: string) {
  stack.push({ key: name });
});

parser.on("endElement", function (name: string) {
  if (name === "title") {
    page.title = (stack.top().value as string).toLowerCase();
  }

  if (name === "text") {
    counter++;

    page.text = stack.top().value;
    page.processLinks();

    console.log("Page:", page);

    if (counter >= 2) {
      process.exit();
    }
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

const stream = fs.createReadStream(
  "data/enwiki-20230320-pages-articles-multistream.xml",
  { highWaterMark: 1024 * 1024 }
);

stream.on("data", (chunk: Stringable) => {
  parser.write(chunk.toString());
});

stream.on("end", () => {
  console.log("End of file");
});
