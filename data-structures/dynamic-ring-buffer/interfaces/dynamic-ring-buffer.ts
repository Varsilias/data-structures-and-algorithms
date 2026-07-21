export interface DynamicRingBuffer<T> {
  length(): number;
  capacity(): number;
  isEmpty(): boolean;
  isFull(): boolean;
  front(): T | undefined;
  rear(): T | undefined;
  enqueue(value: T): boolean;
  dequeue(): T | undefined;
  clear(): void;
  toArray(): T[];
}
