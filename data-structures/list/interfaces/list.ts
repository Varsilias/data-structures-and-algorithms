export interface List<T> {
  length(): number;
  capacity(): number;
  isEmpty(): boolean;
  get(index: number): T | undefined;
  set(index: number, value: T): void;
  append(value: T): void;
  prepend(value: T): void;
  insert(index: number, value: T): void;
  removeAt(index: number): T | undefined;
  remove(value: T): boolean;
  contains(value: T): boolean;
  indexOf(value: T): number;
  clear(): void;
  toArray(): T[];
}
