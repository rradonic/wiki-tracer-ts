import expat from "node-expat";
import fs from "fs";
import { Stack } from "./stack";

interface Stringable {
  toString(): string;
}

const ELEMENT = "title";

const parser = new expat.Parser("UTF-8");
const elementStack = new Stack<string>();

parser.on("startElement", function (name: string) {
  elementStack.push(name);
});

parser.on("endElement", function (name: string) {
  elementStack.pop();
});

parser.on("text", function (text: string) {
  if (elementStack.top() === ELEMENT) {
    console.log(text);
  }
});

parser.on("error", function (error: unknown) {
  console.error("Error: ", error);
});

const stream = fs.createReadStream("data/books.xml", {
  highWaterMark: 1024 * 1024,
});

stream.on("data", (chunk: Stringable) => {
  parser.write(chunk.toString());
});

stream.on("end", () => {
  console.log("End of file");
});

stream.on("error", (err: Error) => {
  console.error("Error: ", err);
});
