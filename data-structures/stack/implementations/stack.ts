import { Stack } from "../interfaces/stack";

export class MyStack<T> implements Stack<T> {
  private readonly initialCapacity: number;
  private container: Array<T>
  private currentLength: number
  private currentCapacity: number
  private head: number

  public constructor(initialCapacity = 4) {
    if (initialCapacity <= 0) {
      throw new Error("initialCapacity must be greater than zero");
    }

    this.initialCapacity = initialCapacity;
    this.container = new Array(initialCapacity)
    this.currentLength = 0;
    this.head = 0
    this.currentCapacity = initialCapacity
  }

  public length(): number {
    return this.currentLength
  }

  public capacity(): number {
    return this.currentCapacity
  }

  public isEmpty(): boolean {
    return this.length() <= 0;
  }

  public peek(): T | undefined {
    return this.container[this.head-1]
  }

  public push(_value: T): void {
    this.ensureCapacity()
    this.container[this.head] = _value;
    this.head++
    this.currentLength++
  }

  public pop(): T | undefined {
    if(this.isEmpty()) return
    const val = this.container[this.head - 1]
    delete this.container[this.head - 1]
    this.head--
    this.currentLength--

    return val
  }

  public clear(): void {
    this.container = []
    this.currentLength = 0;
    this.head = 0
    this.currentCapacity = this.initialCapacity
  }

  public toArray(): T[] {
    const res: T[] = []

    for(let i = 0; i < this.length(); i++) {
      res.push(this.container[i])
    }

    return res
  }

  protected getInitialCapacity(): number {
    return this.initialCapacity;
  }

  private ensureCapacity() {
    if(this.length() < this.capacity()) return

    const newCapacity = this.currentCapacity * 2;
    const newContainer = new Array(newCapacity)

    for(let i = this.head-1; i >= 0; i--) {
      newContainer[i] = this.container[i]
    }

    this.container = newContainer
    this.currentCapacity = newCapacity


  }
}


