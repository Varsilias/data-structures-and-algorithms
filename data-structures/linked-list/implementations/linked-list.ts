import { LinkedList } from "../interfaces/linked-list";

export class MyLinkedList<T> implements LinkedList<T> {
  public length(): number {
    return 0;
  }

  public isEmpty(): boolean {
    return this.length() === 0;
  }

  public head(): T | undefined {
    return undefined;
  }

  public tail(): T | undefined {
    return undefined;
  }

  public get(_index: number): T | undefined {
    return undefined;
  }

  public append(_value: T): void {
    throw new Error("TODO: implement append");
  }

  public prepend(_value: T): void {
    throw new Error("TODO: implement prepend");
  }

  public insert(_index: number, _value: T): void {
    throw new Error("TODO: implement insert");
  }

  public removeAt(_index: number): T | undefined {
    throw new Error("TODO: implement removeAt");
  }

  public remove(_value: T): boolean {
    throw new Error("TODO: implement remove");
  }

  public contains(_value: T): boolean {
    return false;
  }

  public indexOf(_value: T): number {
    return -1;
  }

  public reverse(): void {
    throw new Error("TODO: implement reverse");
  }

  public clear(): void {
    throw new Error("TODO: implement clear");
  }

  public toArray(): T[] {
    return [];
  }
}
