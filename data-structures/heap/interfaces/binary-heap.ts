export interface BinaryHeap<T> {
  length(): number;
  isEmpty(): boolean;
  peek(): T | undefined;
  insert(value: T): void;
  extract(): T | undefined;
  clear(): void;
  toArray(): T[];
}
