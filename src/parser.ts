import expat from "node-expat";
import fs from "fs";
import { SimpleStack } from "./simpleStack";

interface Stringable {
  toString(): string;
}

interface Element {
  key: string;
  value?: string;
}

const parser = new expat.Parser("UTF-8");
const stack = new SimpleStack<Element>();

let counter = 0;

parser.on("startElement", function (name: string) {
  if (name === "text") {
    counter++;
  }

  stack.push({ key: name });
});

parser.on("endElement", function (name: string) {
  if (name === "text" && counter >= 3) {
    console.log(stack.toJson());
    process.exit();
  }

  stack.pop();
});

parser.on("text", function (text: string) {
  // const top = stack.top();
  // if (top.key === "title") {
  //   console.log(`${counter}: `, text);
  // }
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
