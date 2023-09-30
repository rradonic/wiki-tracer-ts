import util from "util";

import { Stack } from "../stack";

export class SimpleStack<T> implements Stack<T> {
  private stack: Array<T>;

  constructor() {
    this.stack = [];
  }

  push(item: T): number {
    return this.stack.push(item);
  }

  pop(): T {
    const popped = this.stack.pop();

    if (popped === undefined) {
      throw new Error("Can't pop, the stack is empty!");
    }

    return popped;
  }

  top(): T {
    const top = this.stack.at(-1);

    if (top === undefined) {
      throw new Error("Can't get the top element, the stack is empty!");
    }

    return top;
  }

  [util.inspect.custom]() {
    return this.stack;
  }
}
