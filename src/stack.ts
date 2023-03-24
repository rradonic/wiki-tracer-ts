interface Stack<T> {
  push(item: T): void;
  pop(): T;
}

class Stack<T> implements Stack<T> {
  stack: Array<T>;

  constructor() {
    this.stack = [];
  }

  push(item: T) {
    this.stack.push(item);
  }

  pop(): T | undefined {
    return this.stack.pop();
  }
}
