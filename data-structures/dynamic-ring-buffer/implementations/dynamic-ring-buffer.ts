import { DynamicRingBuffer } from "../interfaces/dynamic-ring-buffer";

export class MyDynamicRingBuffer<T> implements DynamicRingBuffer<T> {
  private readonly initialCapacity: number;

  public constructor(initialCapacity = 4) {
    if (initialCapacity <= 0) {
      throw new Error("initialCapacity must be greater than zero");
    }

    this.initialCapacity = initialCapacity;
  }

  public length(): number {
    throw new Error("TODO: implement length");
  }

  public capacity(): number {
    throw new Error("TODO: implement capacity");
  }

  public isEmpty(): boolean {
    throw new Error("TODO: implement isEmpty");
  }

  public isFull(): boolean {
    throw new Error("TODO: implement isFull");
  }

  public front(): T | undefined {
    throw new Error("TODO: implement front");
  }

  public rear(): T | undefined {
    throw new Error("TODO: implement rear");
  }

  public enqueue(_value: T): boolean {
    throw new Error("TODO: implement enqueue");
  }

  public dequeue(): T | undefined {
    throw new Error("TODO: implement dequeue");
  }

  public clear(): void {
    throw new Error("TODO: implement clear");
  }

  public toArray(): T[] {
    throw new Error("TODO: implement toArray");
  }

  protected getInitialCapacity(): number {
    return this.initialCapacity;
  }
}
