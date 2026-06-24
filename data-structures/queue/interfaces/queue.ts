export interface Queue<T> {
  length(): number;
  capacity(): number;
  isEmpty(): boolean;
  peek(): T | undefined;
  enqueue(value: T): void;
  dequeue(): T | undefined;
  clear(): void;
  toArray(): T[];
}
