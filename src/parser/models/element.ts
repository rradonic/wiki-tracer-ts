import { Attributes } from "./attributes";

export type Element = {
  name: string;
  attributes: Attributes;
  content?: string;
};
