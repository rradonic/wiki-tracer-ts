export interface Stack<T> {
  push(item: T): void;
  pop(): T;
}

export class Stack<T> implements Stack<T> {
  #stack: Array<T>;

  constructor() {
    this.#stack = [];
  }

  push(item: T) {
    this.#stack.push(item);
  }

  pop(): T | undefined {
    return this.#stack.pop();
  }

  top(): T | undefined {
    return this.#stack.at(-1);
  }
}
