export type Stack<T> = {
  push(item: T): number;
  pop(): T;
  top(): T;
}
