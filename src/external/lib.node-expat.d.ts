declare module "node-expat" {
  import { Attributes } from "./models/attributes";

  declare interface Expat {
    Parser: new (string) => ExpatParser;
  }

  export declare interface ExpatParser {
    on(event: "startElement", callback: (name: string, attributes: Attributes) => void): void;
    on(event: string, callback: (name: string) => void): void;
    write(string): void;
  }

  const expat: Expat;

  export default expat;
}
