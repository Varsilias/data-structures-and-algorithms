export interface HashMap<K, V> {
  length(): number;
  capacity(): number;
  isEmpty(): boolean;
  set(key: K, value: V): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  remove(key: K): boolean;
  keys(): K[];
  values(): V[];
  entries(): Array<[K, V]>;
  clear(): void;
}
