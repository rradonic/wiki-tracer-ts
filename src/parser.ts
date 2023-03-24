import expat from "node-expat";
import fs from "fs";

const ELEMENT = "book";

const parser = new expat.Parser("UTF-8");
let inElement = false;

parser.on("startElement", function (name: string) {
  if (name === ELEMENT) {
    inElement = true;
  }
});

parser.on("endElement", function (name: string) {
  if (name === ELEMENT) {
    inElement = false;
  }
});

parser.on("text", function (text: string) {
  if (inElement) {
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
