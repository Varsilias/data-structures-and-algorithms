import { Stack } from "../interfaces/stack";

export class MyStack<T> implements Stack<T> {
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

  public peek(): T | undefined {
    throw new Error("TODO: implement peek");
  }

  public push(_value: T): void {
    throw new Error("TODO: implement push");
  }

  public pop(): T | undefined {
    throw new Error("TODO: implement pop");
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
