export interface Stack<T> {
  length(): number;
  capacity(): number;
  isEmpty(): boolean;
  peek(): T | undefined;
  push(value: T): void;
  pop(): T | undefined;
  clear(): void;
  toArray(): T[];
}
