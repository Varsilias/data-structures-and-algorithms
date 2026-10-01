import { BinaryHeap } from "../interfaces/binary-heap";

export class MyBinaryMinHeap<T> implements BinaryHeap<T> {
  public length(): number {
    return 0;
  }

  public isEmpty(): boolean {
    return this.length() === 0;
  }

  public peek(): T | undefined {
    return undefined;
  }

  public insert(_value: T): void {
    throw new Error("TODO: implement insert");
  }

  public extract(): T | undefined {
    throw new Error("TODO: implement extract");
  }

  public clear(): void {
    throw new Error("TODO: implement clear");
  }

  public toArray(): T[] {
    return [];
  }
}
