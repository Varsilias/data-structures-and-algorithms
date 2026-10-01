export interface LinkedList<T> {
  length(): number;
  isEmpty(): boolean;
  head(): T | undefined;
  tail(): T | undefined;
  get(index: number): T | undefined;
  append(value: T): void;
  prepend(value: T): void;
  insert(index: number, value: T): void;
  removeAt(index: number): T | undefined;
  remove(value: T): boolean;
  contains(value: T): boolean;
  indexOf(value: T): number;
  reverse(): void;
  clear(): void;
  toArray(): T[];
}
