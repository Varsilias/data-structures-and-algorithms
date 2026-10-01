import { HashMap } from "../interfaces/hash-map";

export class MyHashMap<K, V> implements HashMap<K, V> {
  private readonly initialCapacity: number;

  public constructor(initialCapacity = 8) {
    if (initialCapacity <= 0) {
      throw new Error("initialCapacity must be greater than zero");
    }

    this.initialCapacity = initialCapacity;
  }

  public length(): number {
    return 0;
  }

  public capacity(): number {
    return this.initialCapacity;
  }

  public isEmpty(): boolean {
    return this.length() === 0;
  }

  public set(_key: K, _value: V): void {
    throw new Error("TODO: implement set");
  }

  public get(_key: K): V | undefined {
    return undefined;
  }

  public has(_key: K): boolean {
    return false;
  }

  public remove(_key: K): boolean {
    throw new Error("TODO: implement remove");
  }

  public keys(): K[] {
    return [];
  }

  public values(): V[] {
    return [];
  }

  public entries(): Array<[K, V]> {
    return [];
  }

  public clear(): void {
    throw new Error("TODO: implement clear");
  }
}
