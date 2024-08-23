declare module "node-expat" {
  interface Expat {
    Parser: new (string) => ExpatParser;
  }

  interface ExpatParser {
    on: (event: string, callback: (string) => void) => void;
  }

  const expat: Expat;

  export default expat;
}
