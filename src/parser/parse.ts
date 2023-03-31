import expat from "node-expat";
import fs from "fs";

import { Page } from "./page";
import { ParserElement } from "./parserElement";
import { SimpleStack } from "./simpleStack";
import { specialArticle } from "./specialArticle";

interface Stringable {
  toString(): string;
}

const parser = new expat.Parser("UTF-8");
const stack = new SimpleStack<ParserElement>();
const page = new Page();

if (process.argv.length < 3) {
  console.log("Missing input file parameter.");
  process.exit();
}

// for reference, there are 17091708 pages, including redirect pages
let counter = 0;

parser.on("startElement", function (name: string) {
  stack.push({ key: name });
});

parser.on("endElement", function (name: string) {
  if (name === "title") {
    page.title = stack.top().value;
  }

  if (name === "text" && !specialArticle(page.title)) {
    counter++;

    page.text = stack.top().value;
    page.processLinks();

    writeStream.write(`${page.title}\n`);
    console.log(`${counter}: ${page.title}`);

    (page.links ?? []).forEach((link) => {
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

const readStream = fs.createReadStream(process.argv[2], {
  highWaterMark: 1024 * 1024,
});

const writeStream = fs.createWriteStream("data/pages.out");

readStream.on("data", (chunk: Stringable) => {
  parser.write(chunk.toString());
});

readStream.on("end", () => {
  console.log("End of file");
});
