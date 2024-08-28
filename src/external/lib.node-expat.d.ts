declare module "node-expat" {
  declare interface Expat {
    Parser: new (string) => ExpatParser;
  }

  export declare interface ExpatParser {
    on: (event: string, callback: (string) => void) => void;
    write: (string) => void;
  }

  const expat: Expat;

  export default expat;
}
